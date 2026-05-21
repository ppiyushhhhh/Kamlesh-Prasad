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

function truncate(value, max = 70) {
  const text = String(value || "Not available");
  return text.length > max ? text.slice(0, max - 3) + "..." : text;
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
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Daily-Report-Bot",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
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
    "df -h / | tail -1 | awk '{print \"Total \"$2\" | Used \"$3\" | Free \"$4\" | \"$5}'"
  );

  const memoryUsage = runCommand(
    "free -h | awk '/Mem:/ {print \"Total \"$2\" | Used \"$3\" | Free \"$4}'"
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
          `echo | openssl s_client -servername ${hostnameFromUrl} -connect ${hostnameFromUrl}:443 2>/dev/null | openssl x509 -noout -enddate | sed 's/notAfter=//'`,
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

  if (website.status !== "UP") score -= 35;
  if (metrics.nginxStatus !== "active") score -= 30;
  if (metrics.diskPercent >= 80) score -= 15;
  if (metrics.memoryPercent >= 80) score -= 15;
  if (website.responseTimeMs > 2000) score -= 5;

  return Math.max(score, 0);
}

function getOverallStatus(website, metrics) {
  if (website.status === "UP" && metrics.nginxStatus === "active") {
    return "HEALTHY";
  }

  if (website.status === "ISSUE" || metrics.nginxStatus !== "active") {
    return "ATTENTION REQUIRED";
  }

  return "CRITICAL";
}

function statusColor(status) {
  if (["UP", "active", "HEALTHY", "enabled"].includes(status)) return "#15803d";
  if (["ISSUE", "ATTENTION REQUIRED"].includes(status)) return "#b45309";
  return "#b91c1c";
}

function drawText(doc, text, x, y, options = {}) {
  doc
    .fillColor(options.color || "#111827")
    .font(options.bold ? "Helvetica-Bold" : "Helvetica")
    .fontSize(options.size || 9)
    .text(String(text), x, y, {
      width: options.width || 100,
      align: options.align || "left",
      lineBreak: options.lineBreak !== false,
    });
}

function drawCard(doc, x, y, w, h, title, value, color = "#111827") {
  doc.roundedRect(x, y, w, h, 8).fillAndStroke("#ffffff", "#e5e7eb");

  drawText(doc, title.toUpperCase(), x + 12, y + 12, {
    size: 7,
    bold: true,
    color: "#6b7280",
    width: w - 24,
  });

  drawText(doc, value, x + 12, y + 30, {
    size: 14,
    bold: true,
    color,
    width: w - 24,
  });
}

function drawSectionTitle(doc, title, x, y) {
  drawText(doc, title, x, y, {
    size: 12,
    bold: true,
    color: "#111827",
    width: 500,
  });

  doc.moveTo(x, y + 17).lineTo(x + 515, y + 17).strokeColor("#e5e7eb").stroke();
}

function drawKV(doc, label, value, x, y, width = 235) {
  drawText(doc, label.toUpperCase(), x, y, {
    size: 7,
    bold: true,
    color: "#6b7280",
    width,
  });

  drawText(doc, truncate(value, 85), x, y + 12, {
    size: 8.5,
    color: "#111827",
    width,
  });
}

function drawProgress(doc, x, y, width, percent, label) {
  const safePercent = Math.max(0, Math.min(100, Number(percent || 0)));
  let color = "#15803d";

  if (safePercent >= 70) color = "#b45309";
  if (safePercent >= 85) color = "#b91c1c";

  drawText(doc, `${label}: ${safePercent}%`, x, y, {
    size: 8,
    bold: true,
    width,
  });

  doc.roundedRect(x, y + 14, width, 8, 4).fill("#e5e7eb");
  doc.roundedRect(x, y + 14, (width * safePercent) / 100, 8, 4).fill(color);
}

function createPdfReport({ website, metrics }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
      autoFirstPage: true,
      info: {
        Title: "Daily Website and Server Report",
        Author: REPORT_BRAND_NAME || "Automated Report System",
      },
    });

    const stream = fs.createWriteStream(reportPath);
    doc.pipe(stream);

    const pageWidth = doc.page.width;
    const left = 40;

    const healthScore = getHealthScore(website, metrics);
    const overallStatus = getOverallStatus(website, metrics);

    // Background
    doc.rect(0, 0, pageWidth, doc.page.height).fill("#f8fafc");

    // Header
    doc.rect(0, 0, pageWidth, 92).fill("#111827");

    drawText(doc, REPORT_BRAND_NAME || "Daily Website Report", left, 24, {
      size: 20,
      bold: true,
      color: "#ffffff",
      width: 350,
    });

    drawText(doc, "Automated Daily Infrastructure Health Report", left, 52, {
      size: 9,
      color: "#d1d5db",
      width: 350,
    });

    drawText(
      doc,
      now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }),
      left,
      68,
      {
        size: 8,
        color: "#d1d5db",
        width: 350,
      }
    );

    doc
      .roundedRect(405, 28, 145, 32, 16)
      .fill(statusColor(overallStatus));

    drawText(doc, overallStatus, 405, 39, {
      size: 8.5,
      bold: true,
      color: "#ffffff",
      width: 145,
      align: "center",
    });

    // Top Cards
    let y = 115;

    drawCard(
      doc,
      left,
      y,
      122,
      64,
      "Health Score",
      `${healthScore}/100`,
      statusColor(overallStatus)
    );

    drawCard(
      doc,
      left + 132,
      y,
      122,
      64,
      "Website",
      `${website.status} (${website.statusCode})`,
      statusColor(website.status)
    );

    drawCard(
      doc,
      left + 264,
      y,
      122,
      64,
      "Response",
      `${website.responseTimeMs} ms`,
      "#111827"
    );

    drawCard(
      doc,
      left + 396,
      y,
      122,
      64,
      "Nginx",
      metrics.nginxStatus,
      statusColor(metrics.nginxStatus)
    );

    // Website Health
    y = 205;
    drawSectionTitle(doc, "Website Health", left, y);

    y += 30;
    doc.roundedRect(left, y, 515, 70, 8).fillAndStroke("#ffffff", "#e5e7eb");

    drawKV(doc, "Website URL", SITE_URL, left + 16, y + 14, 300);
    drawKV(doc, "HTTP Status", website.statusCode, left + 340, y + 14, 70);
    drawKV(doc, "Status", website.status, left + 430, y + 14, 70);
    drawKV(doc, "Response Time", `${website.responseTimeMs} ms`, left + 16, y + 43, 130);

    if (website.error) {
      drawKV(doc, "Error", website.error, left + 165, y + 43, 330);
    } else {
      drawKV(doc, "Check Result", "Website request completed", left + 165, y + 43, 330);
    }

    // Server Health
    y = 305;
    drawSectionTitle(doc, "Server Health", left, y);

    y += 30;
    doc.roundedRect(left, y, 515, 92, 8).fillAndStroke("#ffffff", "#e5e7eb");

    drawKV(doc, "Hostname", metrics.hostname, left + 16, y + 14, 235);
    drawKV(doc, "Server IP", metrics.serverIp, left + 270, y + 14, 220);
    drawKV(doc, "Platform", metrics.platform, left + 16, y + 43, 235);
    drawKV(doc, "CPU Cores", metrics.cpuCores, left + 270, y + 43, 220);
    drawKV(doc, "Uptime", metrics.uptime, left + 16, y + 70, 475);

    // Resource Usage
    y = 430;
    drawSectionTitle(doc, "Resource Usage", left, y);

    y += 30;
    doc.roundedRect(left, y, 515, 85, 8).fillAndStroke("#ffffff", "#e5e7eb");

    drawProgress(doc, left + 16, y + 20, 220, metrics.diskPercent, "Disk Usage");
    drawProgress(doc, left + 275, y + 20, 220, metrics.memoryPercent, "Memory Usage");

    drawText(doc, truncate(metrics.diskUsage, 55), left + 16, y + 52, {
      size: 7.5,
      color: "#4b5563",
      width: 220,
    });

    drawText(doc, truncate(metrics.memoryUsage, 55), left + 275, y + 52, {
      size: 7.5,
      color: "#4b5563",
      width: 220,
    });

    // Service and Deployment
    y = 548;
    drawSectionTitle(doc, "Service and Deployment", left, y);

    y += 30;
    doc.roundedRect(left, y, 515, 118, 8).fillAndStroke("#ffffff", "#e5e7eb");

    drawKV(doc, "Nginx Active", metrics.nginxStatus, left + 16, y + 14, 145);
    drawKV(doc, "Nginx Boot Status", metrics.nginxEnabled, left + 185, y + 14, 145);
    drawKV(doc, "SSL Expiry", metrics.sslExpiry, left + 354, y + 14, 145);

    drawKV(doc, "Latest Git Commit", metrics.lastDeploy, left + 16, y + 50, 480);

    const recommendation =
      overallStatus === "HEALTHY"
        ? "No immediate action required. Continue daily monitoring."
        : "Review website HTTP status, Nginx, SSL, and server resource usage.";

    drawKV(doc, "Recommendation", recommendation, left + 16, y + 84, 480);

    // Footer
    drawText(
      doc,
      "Generated automatically by Daily Server Monitoring Job | One-page executive summary",
      left,
      790,
      {
        size: 7,
        color: "#6b7280",
        width: 515,
        align: "center",
      }
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

Your daily one-page website and server health report is attached in PDF format.

Website: ${SITE_URL}
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
