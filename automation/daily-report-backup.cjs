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
  SITE_URL,
  REPORT_BRAND_NAME,
} = process.env;

const reportsDir = path.join(__dirname, "reports");
const logsDir = path.join(__dirname, "logs");

fs.mkdirSync(reportsDir, { recursive: true });
fs.mkdirSync(logsDir, { recursive: true });

const now = new Date();
const dateLabel = now.toISOString().slice(0, 10);
const reportPath = path.join(reportsDir, `daily-report-${dateLabel}.pdf`);
const logPath = path.join(logsDir, "daily-report.log");

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logPath, line);
  console.log(message);
}

function runCommand(command, fallback = "Not available") {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 15000,
    }).trim();
  } catch {
    return fallback;
  }
}

function extractPercent(value) {
  const match = String(value).match(/(\d+)%/);
  return match ? Number(match[1]) : 0;
}

function parseMemoryPercent() {
  try {
    const output = execSync("free -m | awk '/Mem:/ {print $2, $3}'", {
      encoding: "utf8",
    }).trim();

    const [total, used] = output.split(/\s+/).map(Number);
    if (!total || !used) return 0;

    return Math.round((used / total) * 100);
  } catch {
    return 0;
  }
}

async function checkWebsite(url) {
  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    return {
      status: response.ok ? "UP" : "ISSUE",
      statusCode: response.status,
      responseTimeMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      status: "DOWN",
      statusCode: "N/A",
      responseTimeMs: Date.now() - startedAt,
      error: error.message,
    };
  }
}

function getSystemMetrics() {
  let hostnameFromUrl = "unknown";

  try {
    hostnameFromUrl = new URL(SITE_URL).hostname;
  } catch {
    hostnameFromUrl = "unknown";
  }

  const diskUsage = runCommand(
    "df -h / | tail -1 | awk '{print \"Total: \"$2\", Used: \"$3\", Free: \"$4\", Use%: \"$5}'"
  );

  const memoryUsage = runCommand(
    "free -h | awk '/Mem:/ {print \"Total: \"$2\", Used: \"$3\", Free: \"$4}'"
  );

  const uptime = runCommand("uptime -p");
  const nginxStatus = runCommand("systemctl is-active nginx", "unknown");
  const nginxEnabled = runCommand("systemctl is-enabled nginx", "unknown");
  const serverIp = runCommand("curl -s ifconfig.me", "Not available");
  const lastDeploy = runCommand(
    "cd .. && git log -1 --pretty=format:'%h - %s - %ci'",
    "Git data not available"
  );

  const sslExpiry =
    hostnameFromUrl !== "unknown"
      ? runCommand(
          `echo | openssl s_client -servername ${hostnameFromUrl} -connect ${hostnameFromUrl}:443 2>/dev/null | openssl x509 -noout -enddate`,
          "SSL check not available"
        )
      : "SSL check not available";

  return {
    hostname: os.hostname(),
    platform: `${os.type()} ${os.release()}`,
    cpuCores: os.cpus().length,
    diskUsage,
    diskPercent: extractPercent(diskUsage),
    memoryUsage,
    memoryPercent: parseMemoryPercent(),
    uptime,
    nginxStatus,
    nginxEnabled,
    serverIp,
    lastDeploy,
    sslExpiry,
  };
}

function getHealthScore(website, metrics) {
  let score = 100;

  if (website.status !== "UP") score -= 40;
  if (metrics.nginxStatus !== "active") score -= 30;
  if (metrics.diskPercent >= 80) score -= 15;
  if (metrics.memoryPercent >= 80) score -= 15;
  if (website.responseTimeMs > 2000) score -= 10;

  return Math.max(score, 0);
}

function statusColor(status) {
  if (status === "UP" || status === "active" || status === "HEALTHY") {
    return "#16a34a";
  }

  if (status === "ISSUE" || status === "ATTENTION REQUIRED") {
    return "#f59e0b";
  }

  return "#dc2626";
}

function drawRoundedCard(doc, x, y, width, height, fill = "#ffffff") {
  doc
    .roundedRect(x, y, width, height, 10)
    .fillAndStroke(fill, "#e5e7eb");
}

function drawStatusBadge(doc, x, y, text, color) {
  doc
    .roundedRect(x, y, 95, 24, 12)
    .fill(color);

  doc
    .fillColor("#ffffff")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(text, x, y + 7, {
      width: 95,
      align: "center",
    });

  doc.fillColor("#111827").font("Helvetica");
}

function drawProgressBar(doc, x, y, width, percent, label) {
  const height = 10;
  const filledWidth = Math.max(0, Math.min(width, (width * percent) / 100));

  let barColor = "#16a34a";
  if (percent >= 70) barColor = "#f59e0b";
  if (percent >= 85) barColor = "#dc2626";

  doc
    .fillColor("#374151")
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`${label}: ${percent}%`, x, y - 16);

  doc
    .roundedRect(x, y, width, height, 5)
    .fill("#e5e7eb");

  doc
    .roundedRect(x, y, filledWidth, height, 5)
    .fill(barColor);

  doc.fillColor("#111827").font("Helvetica");
}

function addKeyValue(doc, label, value, x, y, width = 480) {
  doc
    .fillColor("#6b7280")
    .fontSize(9)
    .font("Helvetica-Bold")
    .text(label.toUpperCase(), x, y);

  doc
    .fillColor("#111827")
    .fontSize(11)
    .font("Helvetica")
    .text(String(value), x, y + 14, {
      width,
      lineGap: 2,
    });
}

function createPdfReport({ website, metrics }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      info: {
        Title: "Daily Website and Server Report",
        Author: REPORT_BRAND_NAME || "Automated Report System",
      },
    });

    const stream = fs.createWriteStream(reportPath);
    doc.pipe(stream);

    const pageWidth = doc.page.width;
    const margin = 40;

    const healthScore = getHealthScore(website, metrics);
    const overallStatus =
      website.status === "UP" && metrics.nginxStatus === "active"
        ? "HEALTHY"
        : "ATTENTION REQUIRED";

    // Header
    doc.rect(0, 0, pageWidth, 118).fill("#111827");

    doc
      .fillColor("#ffffff")
      .font("Helvetica-Bold")
      .fontSize(22)
      .text(REPORT_BRAND_NAME || "Daily Website Report", margin, 30);

    doc
      .fillColor("#d1d5db")
      .font("Helvetica")
      .fontSize(10)
      .text("Automated Daily Infrastructure Health Report", margin, 60);

    doc
      .fillColor("#d1d5db")
      .fontSize(9)
      .text(
        now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "short",
        }),
        margin,
        82
      );

    drawStatusBadge(doc, pageWidth - 155, 40, overallStatus, statusColor(overallStatus));

    // Summary cards
    let y = 145;

    drawRoundedCard(doc, margin, y, 155, 90, "#f9fafb");
    addKeyValue(doc, "Health Score", `${healthScore}/100`, margin + 18, y + 20, 120);
    doc
      .fillColor(statusColor(overallStatus))
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(overallStatus, margin + 18, y + 55, { width: 120 });

    drawRoundedCard(doc, margin + 175, y, 155, 90, "#f9fafb");
    addKeyValue(doc, "Website Status", website.status, margin + 193, y + 20, 120);
    doc
      .fillColor(statusColor(website.status))
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(String(website.statusCode), margin + 193, y + 55, { width: 120 });

    drawRoundedCard(doc, margin + 350, y, 155, 90, "#f9fafb");
    addKeyValue(doc, "Response Time", `${website.responseTimeMs} ms`, margin + 368, y + 20, 120);
    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(metrics.nginxStatus, margin + 368, y + 55, { width: 120 });

    y += 120;

    // Website section
    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Website Health", margin, y);

    y += 28;

    drawRoundedCard(doc, margin, y, 505, 110, "#ffffff");

    addKeyValue(doc, "Website URL", SITE_URL, margin + 20, y + 18, 460);
    addKeyValue(doc, "HTTP Status Code", website.statusCode, margin + 20, y + 58, 150);
    addKeyValue(doc, "Response Time", `${website.responseTimeMs} ms`, margin + 200, y + 58, 150);
    addKeyValue(doc, "Website Status", website.status, margin + 360, y + 58, 120);

    if (website.error) {
      addKeyValue(doc, "Error", website.error, margin + 20, y + 88, 460);
    }

    y += 140;

    // Server section
    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Server Health", margin, y);

    y += 28;

    drawRoundedCard(doc, margin, y, 505, 145, "#ffffff");

    addKeyValue(doc, "Hostname", metrics.hostname, margin + 20, y + 18, 210);
    addKeyValue(doc, "Server IP", metrics.serverIp, margin + 270, y + 18, 210);
    addKeyValue(doc, "Platform", metrics.platform, margin + 20, y + 60, 210);
    addKeyValue(doc, "CPU Cores", metrics.cpuCores, margin + 270, y + 60, 210);
    addKeyValue(doc, "Uptime", metrics.uptime, margin + 20, y + 102, 460);

    y += 175;

    // Resource section
    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Resource Usage", margin, y);

    y += 28;

    drawRoundedCard(doc, margin, y, 505, 115, "#ffffff");

    drawProgressBar(doc, margin + 20, y + 42, 210, metrics.diskPercent, "Disk Usage");
    drawProgressBar(doc, margin + 270, y + 42, 210, metrics.memoryPercent, "Memory Usage");

    doc
      .fillColor("#4b5563")
      .font("Helvetica")
      .fontSize(9)
      .text(metrics.diskUsage, margin + 20, y + 70, { width: 210 });

    doc
      .fillColor("#4b5563")
      .font("Helvetica")
      .fontSize(9)
      .text(metrics.memoryUsage, margin + 270, y + 70, { width: 210 });

    y += 145;

    // Nginx and deployment
    doc
      .fillColor("#111827")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Service and Deployment", margin, y);

    y += 28;

    drawRoundedCard(doc, margin, y, 505, 135, "#ffffff");

    addKeyValue(doc, "Nginx Active Status", metrics.nginxStatus, margin + 20, y + 18, 210);
    addKeyValue(doc, "Nginx Enabled On Boot", metrics.nginxEnabled, margin + 270, y + 18, 210);
    addKeyValue(doc, "Latest Git Commit", metrics.lastDeploy, margin + 20, y + 60, 460);
    addKeyValue(doc, "SSL Certificate", metrics.sslExpiry, margin + 20, y + 100, 460);

    // Footer
    doc
      .fillColor("#9ca3af")
      .fontSize(8)
      .font("Helvetica")
      .text(
        "This report was generated automatically by the daily server monitoring job.",
        margin,
        795,
        { width: 505, align: "center" }
      );

    doc.end();

    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${REPORT_BRAND_NAME || "Daily Report"}" <${SMTP_USER}>`,
    to: REPORT_TO_EMAIL,
    subject: `Daily PDF Report - ${REPORT_BRAND_NAME || "Website"} - ${dateLabel}`,
    text: `Hello,

Your daily website and server health report is attached in PDF format.

Website: ${SITE_URL}
Overall Status: Generated successfully
Date: ${now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Regards,
Automated Report System`,
    attachments: [
      {
        filename: path.basename(reportPath),
        path: reportPath,
      },
    ],
  });
}

async function main() {
  try {
    if (!REPORT_TO_EMAIL || !SMTP_USER || !SMTP_PASS || !SITE_URL) {
      throw new Error("Missing required values in automation/.env");
    }

    log("Starting daily report generation...");

    const website = await checkWebsite(SITE_URL);
    const metrics = getSystemMetrics();

    await createPdfReport({ website, metrics });
    log(`PDF report created: ${reportPath}`);

    await sendEmail();
    log(`Email sent successfully to ${REPORT_TO_EMAIL}`);

    log("Daily report completed successfully.");
  } catch (error) {
    log(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

main();
