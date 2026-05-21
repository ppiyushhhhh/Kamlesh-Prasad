const fs = require("fs");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const nodemailer = require("nodemailer");
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
const tempDir = path.join(__dirname, "backup-temp");

fs.mkdirSync(backupDir, { recursive: true });
fs.mkdirSync(logsDir, { recursive: true });

const now = new Date();
const dateLabel = now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
const backupName = `server-backup-${dateLabel}.tar.gz`;
const backupPath = path.join(backupDir, backupName);
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
      timeout: 120000,
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
      timeout: 120000,
    }).trim();
  } catch {
    return fallback;
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
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

function copyIfExists(source, destination) {
  if (fs.existsSync(source)) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    runCommand(`sudo cp -a "${source}" "${destination}"`);
    return true;
  }
  return false;
}

function prepareBackupFiles() {
  removeDirIfExists(tempDir);
  fs.mkdirSync(tempDir, { recursive: true });

  const projectDir = PROJECT_DIR || "/home/ubuntu/kamlesh-prasad-executive";

  log("Preparing backup files...");

  // Project backup, excluding heavy/generated/sensitive folders
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
      --exclude automation/.env \
      "${projectDir}/" "${projectBackupPath}/"
  `);

  // Save safe env example only if exists
  if (fs.existsSync(path.join(projectDir, "automation/.env.example"))) {
    fs.copyFileSync(
      path.join(projectDir, "automation/.env.example"),
      path.join(projectBackupPath, "automation/.env.example")
    );
  }

  // Nginx config
  fs.mkdirSync(path.join(tempDir, "nginx"), { recursive: true });
  copyIfExists("/etc/nginx/sites-available", path.join(tempDir, "nginx/sites-available"));
  copyIfExists("/etc/nginx/sites-enabled", path.join(tempDir, "nginx/sites-enabled"));
  copyIfExists("/etc/nginx/nginx.conf", path.join(tempDir, "nginx/nginx.conf"));

  // SSL/Certbot metadata, not private keys
  fs.mkdirSync(path.join(tempDir, "ssl"), { recursive: true });
  copyIfExists("/etc/letsencrypt/renewal", path.join(tempDir, "ssl/renewal"));

  // Cron backup
  fs.mkdirSync(path.join(tempDir, "cron"), { recursive: true });
  runCommandNoThrow(`crontab -l > "${path.join(tempDir, "cron/user-crontab.txt")}"`, "");
  runCommandNoThrow(`sudo crontab -l > "${path.join(tempDir, "cron/root-crontab.txt")}"`, "");

  // System info
  fs.mkdirSync(path.join(tempDir, "system-info"), { recursive: true });
  fs.writeFileSync(
    path.join(tempDir, "system-info/server-info.txt"),
    [
      `Backup Date: ${now.toISOString()}`,
      `Hostname: ${os.hostname()}`,
      `Platform: ${os.type()} ${os.release()}`,
      `CPU Cores: ${os.cpus().length}`,
      `Uptime: ${runCommandNoThrow("uptime -p", "N/A")}`,
      `Disk: ${runCommandNoThrow("df -h /", "N/A")}`,
      `Memory: ${runCommandNoThrow("free -h", "N/A")}`,
      `Nginx Status: ${runCommandNoThrow("systemctl is-active nginx", "N/A")}`,
      `Node Version: ${runCommandNoThrow("node -v", "N/A")}`,
      `NPM Version: ${runCommandNoThrow("npm -v", "N/A")}`,
    ].join("\n\n")
  );

  // Installed packages list
  runCommandNoThrow(`dpkg -l > "${path.join(tempDir, "system-info/installed-packages.txt")}"`, "");

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

  const beforeList = runCommandNoThrow(`find "${backupDir}" -type f -name "server-backup-*.tar.gz" | wc -l`, "0");

  runCommandNoThrow(
    `find "${backupDir}" -type f -name "server-backup-*.tar.gz" -mtime +${retentionDays - 1} -delete`,
    ""
  );

  const afterList = runCommandNoThrow(`find "${backupDir}" -type f -name "server-backup-*.tar.gz" | wc -l`, "0");

  log(`Backup cleanup complete. Before: ${beforeList}, After: ${afterList}`);

  return {
    before: beforeList,
    after: afterList,
    retentionDays,
  };
}

function listCurrentBackups() {
  return runCommandNoThrow(
    `find "${backupDir}" -type f -name "server-backup-*.tar.gz" -printf "%TY-%Tm-%Td %TH:%TM  %s bytes  %f\\n" | sort -r`,
    "No backups found"
  );
}

async function sendBackupEmail({ status, backupSize, cleanupInfo, errorMessage }) {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const subject =
    status === "SUCCESS"
      ? `Backup Success - ${REPORT_BRAND_NAME || "Server"} - ${now.toISOString().slice(0, 10)}`
      : `Backup Failed - ${REPORT_BRAND_NAME || "Server"} - ${now.toISOString().slice(0, 10)}`;

  const backupList = listCurrentBackups();

  const body = `Hello,

Daily server backup report is below.

Status: ${status}
Server: ${os.hostname()}
Backup File: ${status === "SUCCESS" ? backupName : "Not created"}
Backup Size: ${backupSize || "N/A"}
Backup Location: ${backupDir}
Retention Policy: Delete backups older than ${cleanupInfo?.retentionDays || BACKUP_RETENTION_DAYS || 7} days

Cleanup:
Before Cleanup Count: ${cleanupInfo?.before || "N/A"}
After Cleanup Count: ${cleanupInfo?.after || "N/A"}

Current Backups:
${backupList}

${errorMessage ? `Error:\n${errorMessage}\n` : ""}

Time: ${now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Regards,
Automated Backup System`;

  const mailOptions = {
    from: `"${MAIL_FROM_NAME || REPORT_BRAND_NAME || "Backup System"}" <${MAIL_FROM_EMAIL || SMTP_USER}>`,
    to: REPORT_TO_EMAIL,
    subject,
    text: body,
  };

  // Attach backup only if it is small enough. Gmail limit is around 25 MB.
  if (status === "SUCCESS" && fs.existsSync(backupPath)) {
    const sizeMb = fs.statSync(backupPath).size / 1024 / 1024;

    if (sizeMb <= 20) {
      mailOptions.attachments = [
        {
          filename: backupName,
          path: backupPath,
        },
      ];
    }
  }

  await transporter.sendMail(mailOptions);
}

async function main() {
  let cleanupInfo = null;

  try {
    if (!REPORT_TO_EMAIL || !SMTP_USER || !SMTP_PASS) {
      throw new Error("Missing email settings in .env");
    }

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
    log(`Email report sent to ${REPORT_TO_EMAIL}`);
  } catch (error) {
    log(`ERROR: ${error.message}`);

    cleanupInfo = cleanupInfo || cleanupOldBackups();
    removeDirIfExists(tempDir);

    try {
      await sendBackupEmail({
        status: "FAILED",
        backupSize: "N/A",
        cleanupInfo,
        errorMessage: error.message,
      });
      log("Failure email sent.");
    } catch (mailError) {
      log(`Failed to send failure email: ${mailError.message}`);
    }

    process.exit(1);
  }
}

main();
