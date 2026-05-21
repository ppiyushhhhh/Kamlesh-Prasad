const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const {
  REPORT_TO_EMAIL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM_EMAIL,
  MAIL_FROM_NAME,
  REPORT_BRAND_NAME,
  BACKUP_RETENTION_DAYS,
  BACKUP_DIR,
  PROJECT_DIR,
} = process.env;

const backupDir = BACKUP_DIR || path.join(__dirname, "backups");
const logsDir = path.join(__dirname, "logs");
const reportsDir = path.join(__dirname, "backup-reports");
const tempDir = path.join(__dirname, "backup-temp");

fs.mkdirSync(backupDir, { recursive: true });
fs.mkdirSync(logsDir, { recursive: true });
fs.mkdirSync(reportsDir, { recursive: true });

const now = new Date();
const dateLabel = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
const shortDate = now.toISOString().slice(0, 10);

const backupName = `server-backup-${dateLabel}.tar.gz`;
const backupPath = path.join(backupDir, backupName);

const pdfReportName = `backup-report-${shortDate}.pdf`;
const pdfReportPath = path.join(reportsDir, pdfReportName);

const logPath = path.join(logsDir, "backup-server.log");

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logPath, line);
  console.log(message);
}

function runCommand(command, fallback = "") {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 180000,
      shell: "/bin/bash",
    }).trim();
  } catch (error) {
    if (fallback !== "") return fallback;
    throw error;
  }
}

function runCommandNoThrow(command, fallback = "") {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 180000,
      shell: "/bin/bash",
    }).trim();
  } catch {
    return fallback;
  }
}

function validateEnv() {
  const missing = [];

  if (!REPORT_TO_EMAIL) missing.push("REPORT_TO_EMAIL");
  if (!SMTP_HOST) missing.push("SMTP_HOST");
  if (!SMTP_USER) missing.push("SMTP_USER");
  if (!SMTP_PASS) missing.push("SMTP_PASS");

  if (missing.length > 0) {
    throw new Error(`Missing required .env values: ${missing.join(", ")}`);
  }
}

function getFileSize(filePath) {
  try {
    const bytes = fs.statSync(filePath).size;
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(2)} MB`;
  } catch {
    return "Unknown";
  }
}

function removeDirIfExists(dirPath) {
  if (fs.existsSync(dirPath)) {
    runCommandNoThrow(`sudo rm -rf "${dirPath}"`, "");
  }
}

function copyIfExists(source, destination) {
  if (fs.existsSync(source)) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    runCommandNoThrow(`sudo cp -a "${source}" "${destination}"`, "");
    runCommandNoThrow(
      `sudo chown -R ${process.getuid()}:${process.getgid()} "${destination}"`,
      ""
    );
    return true;
  }

  return false;
}

function prepareBackupFiles() {
  removeDirIfExists(tempDir);
  fs.mkdirSync(tempDir, { recursive: true });

  const projectDir = PROJECT_DIR || "/home/ubuntu/kamlesh-prasad-executive";

  log("Preparing backup files...");

  const projectBackupPath = path.join(tempDir, "project");
  fs.mkdirSync(projectBackupPath, { recursive: true });

  runCommand(`
    rsync -a \
      --exclude node_modules \
      --exclude dist \
      --exclude .git \
      --exclude automation/backups \
      --exclude automation/logs \
      --exclude automation/state \
      --exclude automation/backup-temp \
      --exclude automation/backup-reports \
      --exclude automation/.env \
      "${projectDir}/" "${projectBackupPath}/"
  `);

  if (fs.existsSync(path.join(projectDir, "automation/.env.example"))) {
    fs.mkdirSync(path.join(projectBackupPath, "automation"), {
      recursive: true,
    });

    fs.copyFileSync(
      path.join(projectDir, "automation/.env.example"),
      path.join(projectBackupPath, "automation/.env.example")
    );
  }

  fs.mkdirSync(path.join(tempDir, "nginx"), { recursive: true });

  copyIfExists(
    "/etc/nginx/sites-available",
    path.join(tempDir, "nginx/sites-available")
  );

  copyIfExists(
    "/etc/nginx/sites-enabled",
    path.join(tempDir, "nginx/sites-enabled")
  );

  copyIfExists("/etc/nginx/nginx.conf", path.join(tempDir, "nginx/nginx.conf"));

  fs.mkdirSync(path.join(tempDir, "ssl"), { recursive: true });
  copyIfExists("/etc/letsencrypt/renewal", path.join(tempDir, "ssl/renewal"));

  fs.mkdirSync(path.join(tempDir, "cron"), { recursive: true });

  runCommandNoThrow(
    `crontab -l > "${path.join(tempDir, "cron/user-crontab.txt")}"`,
    ""
  );

  runCommandNoThrow(
    `sudo crontab -l > "${path.join(tempDir, "cron/root-crontab.txt")}"`,
    ""
  );

  fs.mkdirSync(path.join(tempDir, "system-info"), { recursive: true });

  fs.writeFileSync(
    path.join(tempDir, "system-info/server-info.txt"),
    [
      `Backup Date: ${now.toISOString()}`,
      `Hostname: ${os.hostname()}`,
      `Platform: ${os.type()} ${os.release()}`,
      `CPU Cores: ${os.cpus().length}`,
      `Uptime: ${runCommandNoThrow("uptime -p", "N/A")}`,
      "",
      "Disk:",
      runCommandNoThrow("df -h /", "N/A"),
      "",
      "Memory:",
      runCommandNoThrow("free -h", "N/A"),
      "",
      `Nginx Status: ${runCommandNoThrow("systemctl is-active nginx", "N/A")}`,
      `Nginx Enabled: ${runCommandNoThrow("systemctl is-enabled nginx", "N/A")}`,
      `Node Version: ${runCommandNoThrow("node -v", "N/A")}`,
      `NPM Version: ${runCommandNoThrow("npm -v", "N/A")}`,
      "",
      "Latest Git Commit:",
      runCommandNoThrow(
        `cd "${projectDir}" && git log -1 --pretty=format:'%h - %s - %ci'`,
        "Git data not available"
      ),
    ].join("\n")
  );

  runCommandNoThrow(
    `dpkg -l > "${path.join(tempDir, "system-info/installed-packages.txt")}"`,
    ""
  );

  runCommandNoThrow(
    `sudo chown -R ${process.getuid()}:${process.getgid()} "${tempDir}"`,
    ""
  );

  log("Backup files prepared.");
}

function createArchive() {
  log("Creating compressed backup archive...");

  runCommand(`
    cd "${tempDir}" &&
    tar -czf "${backupPath}" .
  `);

  log(`Backup archive created: ${backupPath}`);
}

function cleanupOldBackups() {
  const retentionDays = Number(BACKUP_RETENTION_DAYS || 7);

  log(`Deleting backups older than ${retentionDays} days...`);

  const beforeCount = runCommandNoThrow(
    `find "${backupDir}" -type f -name "server-backup-*.tar.gz" | wc -l`,
    "0"
  );

  runCommandNoThrow(
    `find "${backupDir}" -type f -name "server-backup-*.tar.gz" -mtime +${
      retentionDays - 1
    } -delete`,
    ""
  );

  const afterCount = runCommandNoThrow(
    `find "${backupDir}" -type f -name "server-backup-*.tar.gz" | wc -l`,
    "0"
  );

  log(`Backup cleanup complete. Before: ${beforeCount}, After: ${afterCount}`);

  return {
    before: beforeCount,
    after: afterCount,
    retentionDays,
  };
}

function listCurrentBackups() {
  return runCommandNoThrow(
    `find "${backupDir}" -type f -name "server-backup-*.tar.gz" -printf "%TY-%Tm-%Td %TH:%TM  %s bytes  %f\\n" | sort -r`,
    "No backups found"
  );
}

function drawKV(doc, label, value, x, y, width = 470) {
  doc
    .fillColor("#6b7280")
    .font("Helvetica-Bold")
    .fontSize(8)
    .text(label.toUpperCase(), x, y, { width });

  doc
    .fillColor("#111827")
    .font("Helvetica")
    .fontSize(10)
    .text(String(value || "N/A"), x, y + 12, {
      width,
      lineGap: 2,
    });
}

function createBackupPdfReport({
  status,
  backupSize,
  cleanupInfo,
  errorMessage,
}) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      info: {
        Title: "Daily Backup Report",
        Author: REPORT_BRAND_NAME || "Automated Backup System",
      },
    });

    const stream = fs.createWriteStream(pdfReportPath);
    doc.pipe(stream);

    const backupList = listCurrentBackups();
    const statusColor = status === "SUCCESS" ? "#15803d" : "#b91c1c";

    doc.rect(0, 0, doc.page.width, 95).fill("#111827");

    doc
      .fillColor("#ffffff")
      .font("Helvetica-Bold")
      .fontSize(21)
      .text(REPORT_BRAND_NAME || "Server Backup Report", 40, 28);

    doc
      .fillColor("#d1d5db")
      .font("Helvetica")
      .fontSize(10)
      .text("Automated Daily Backup Summary", 40, 57);

    doc.roundedRect(420, 33, 120, 28, 14).fill(statusColor);

    doc
      .fillColor("#ffffff")
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(status, 420, 43, {
        width: 120,
        align: "center",
      });

    let y = 120;

    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Backup Summary", 40, y);

    y += 30;

    doc.roundedRect(40, y, 515, 150, 8).fillAndStroke("#ffffff", "#e5e7eb");

    drawKV(doc, "Status", status, 60, y + 18, 220);
    drawKV(doc, "Server", os.hostname(), 310, y + 18, 220);
    drawKV(
      doc,
      "Backup File",
      status === "SUCCESS" ? backupName : "Not created",
      60,
      y + 55,
      470
    );
    drawKV(doc, "Backup Size", backupSize || "N/A", 60, y + 92, 220);
    drawKV(doc, "Backup Location", backupDir, 310, y + 92, 220);

    y += 180;

    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Retention and Cleanup", 40, y);

    y += 30;

    doc.roundedRect(40, y, 515, 115, 8).fillAndStroke("#ffffff", "#e5e7eb");

    drawKV(
      doc,
      "Retention Policy",
      `Delete backups older than ${
        cleanupInfo?.retentionDays || BACKUP_RETENTION_DAYS || 7
      } days`,
      60,
      y + 18,
      470
    );

    drawKV(
      doc,
      "Before Cleanup Count",
      cleanupInfo?.before || "N/A",
      60,
      y + 58,
      220
    );

    drawKV(
      doc,
      "After Cleanup Count",
      cleanupInfo?.after || "N/A",
      310,
      y + 58,
      220
    );

    y += 145;

    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Current Backups", 40, y);

    y += 30;

    doc.roundedRect(40, y, 515, 145, 8).fillAndStroke("#ffffff", "#e5e7eb");

    doc
      .fillColor("#111827")
      .font("Courier")
      .fontSize(8)
      .text(backupList, 60, y + 18, {
        width: 475,
        height: 105,
        lineGap: 2,
      });

    y += 175;

    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Attachment Note", 40, y);

    y += 30;

    doc.roundedRect(40, y, 515, 82, 8).fillAndStroke("#ffffff", "#e5e7eb");

    drawKV(
      doc,
      "Backup Archive Attachment",
      "The .tar.gz backup archive is not attached because Gmail may block server backup files. The backup is stored safely on the server.",
      60,
      y + 18,
      470
    );

    if (errorMessage) {
      doc.addPage();

      doc
        .fillColor("#b91c1c")
        .font("Helvetica-Bold")
        .fontSize(15)
        .text("Error Details", 40, 50);

      doc
        .fillColor("#111827")
        .font("Courier")
        .fontSize(9)
        .text(errorMessage, 40, 85, {
          width: 515,
          lineGap: 3,
        });
    }

    doc
      .fillColor("#6b7280")
      .font("Helvetica")
      .fontSize(8)
      .text(
        `Generated at ${now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}`,
        40,
        800,
        {
          width: 515,
          align: "center",
        }
      );

    doc.end();

    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function sendBackupEmail({
  status,
  backupSize,
  cleanupInfo,
  errorMessage,
}) {
  log("Preparing backup PDF report...");

  await createBackupPdfReport({
    status,
    backupSize,
    cleanupInfo,
    errorMessage,
  });

  log(`Backup PDF report created: ${pdfReportPath}`);

  log("Preparing backup email...");

  validateEnv();

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.verify();
  log("SMTP verified successfully for backup email.");

  const subject =
    status === "SUCCESS"
      ? `Backup Success - ${REPORT_BRAND_NAME || "Server"} - ${shortDate}`
      : `Backup Failed - ${REPORT_BRAND_NAME || "Server"} - ${shortDate}`;

  const body = `Hello,

Your daily server backup report is attached in PDF format.

Status: ${status}
Backup File: ${status === "SUCCESS" ? backupName : "Not created"}
Backup Size: ${backupSize || "N/A"}
Backup Location: ${backupDir}

Note:
The backup archive is stored on the server and is not attached to this email because Gmail may block .tar.gz server backup files.

Time: ${now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Regards,
Automated Backup System`;

  const mailOptions = {
    from: `"${MAIL_FROM_NAME || REPORT_BRAND_NAME || "Backup System"}" <${
      MAIL_FROM_EMAIL || SMTP_USER
    }>`,
    to: REPORT_TO_EMAIL,
    subject,
    text: body,
    attachments: [
      {
        filename: pdfReportName,
        path: pdfReportPath,
      },
    ],
  };

  const result = await transporter.sendMail(mailOptions);

  log(`Backup report email sent successfully to ${REPORT_TO_EMAIL}`);
  log(`Email message ID: ${result.messageId}`);
}

async function main() {
  let cleanupInfo = null;

  try {
    validateEnv();

    log("Starting daily server backup...");

    prepareBackupFiles();
    createArchive();

    const backupSize = getFileSize(backupPath);

    cleanupInfo = cleanupOldBackups();

    removeDirIfExists(tempDir);

    await sendBackupEmail({
      status: "SUCCESS",
      backupSize,
      cleanupInfo,
    });

    log(`Backup completed successfully. Size: ${backupSize}`);
    log(`PDF report email sent to ${REPORT_TO_EMAIL}`);
  } catch (error) {
    log(`ERROR: ${error.message}`);

    try {
      cleanupInfo = cleanupInfo || cleanupOldBackups();
    } catch (cleanupError) {
      log(`Cleanup failed after error: ${cleanupError.message}`);
    }

    removeDirIfExists(tempDir);

    try {
      await sendBackupEmail({
        status: "FAILED",
        backupSize: "N/A",
        cleanupInfo,
        errorMessage: error.message,
      });

      log("Failure PDF email sent.");
    } catch (mailError) {
      log(`Failed to send failure email: ${mailError.message}`);
    }

    process.exit(1);
  }
}

main();