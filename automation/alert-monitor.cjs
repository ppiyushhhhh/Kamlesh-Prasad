const fs = require("fs");
const path = require("path");
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
  SITE_URL,
  REPORT_BRAND_NAME,
  DISK_ALERT_PERCENT,
  MEMORY_ALERT_PERCENT,
  SSL_ALERT_DAYS,
} = process.env;

const logsDir = path.join(__dirname, "logs");
const stateDir = path.join(__dirname, "state");

fs.mkdirSync(logsDir, { recursive: true });
fs.mkdirSync(stateDir, { recursive: true });

const logPath = path.join(logsDir, "alert-monitor.log");
const statePath = path.join(stateDir, "alert-state.json");

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
      timeout: 15000,
    }).trim();
  } catch {
    return fallback;
  }
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync(statePath, "utf8"));
  } catch {
    return {};
  }
}

function writeState(state) {
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
}

function shouldSendAlert(key, cooldownMinutes = 60) {
  const state = readState();
  const lastSent = state[key] ? new Date(state[key]).getTime() : 0;
  const now = Date.now();
  const cooldownMs = cooldownMinutes * 60 * 1000;

  if (now - lastSent > cooldownMs) {
    state[key] = new Date().toISOString();
    writeState(state);
    return true;
  }

  return false;
}

async function sendAlertEmail({ subject, message }) {
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
    from: `"${MAIL_FROM_NAME || REPORT_BRAND_NAME || "Server Alert"}" <${MAIL_FROM_EMAIL || SMTP_USER}>`,
    to: REPORT_TO_EMAIL,
    subject,
    text: message,
  });
}

async function checkWebsite() {
  const startedAt = Date.now();

  try {
    const response = await fetch(SITE_URL, {
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
      ok: response.ok,
      statusCode: response.status,
      responseTimeMs: Date.now() - startedAt,
    };
  } catch (error) {
    return {
      ok: false,
      statusCode: "N/A",
      responseTimeMs: Date.now() - startedAt,
      error: error.message,
    };
  }
}

function getDiskPercent() {
  const output = runCommand("df / | tail -1 | awk '{print $5}'", "0%");
  return Number(output.replace("%", "")) || 0;
}

function getMemoryPercent() {
  const output = runCommand("free -m | awk '/Mem:/ {printf \"%.0f\", $3/$2 * 100}'", "0");
  return Number(output) || 0;
}

function getNginxStatus() {
  return runCommand("systemctl is-active nginx", "unknown");
}

function getSslDaysRemaining() {
  let hostname = "unknown";

  try {
    hostname = new URL(SITE_URL).hostname;
  } catch {
    return null;
  }

  const endDateRaw = runCommand(
    `echo | openssl s_client -servername ${hostname} -connect ${hostname}:443 2>/dev/null | openssl x509 -noout -enddate | sed 's/notAfter=//'`,
    ""
  );

  if (!endDateRaw) return null;

  const expiryDate = new Date(endDateRaw);
  if (Number.isNaN(expiryDate.getTime())) return null;

  const daysRemaining = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return daysRemaining;
}

async function main() {
  try {
    if (!REPORT_TO_EMAIL || !SMTP_USER || !SMTP_PASS || !SITE_URL) {
      throw new Error("Missing required values in .env");
    }

    const checks = [];

    const website = await checkWebsite();
    if (!website.ok) {
      checks.push({
        key: "website_down",
        cooldown: 30,
        subject: `ALERT: Website Issue - ${REPORT_BRAND_NAME}`,
        message: `Website issue detected.

Website: ${SITE_URL}
HTTP Status: ${website.statusCode}
Response Time: ${website.responseTimeMs} ms
Error: ${website.error || "Request completed but returned non-success status"}

Please check Nginx, DNS, SSL, Cloudflare, or application hosting.

Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
`,
      });
    }

    const nginxStatus = getNginxStatus();
    if (nginxStatus !== "active") {
      checks.push({
        key: "nginx_down",
        cooldown: 30,
        subject: `ALERT: Nginx Service Down - ${REPORT_BRAND_NAME}`,
        message: `Nginx service is not active.

Current Status: ${nginxStatus}

Suggested commands:
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx

Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
`,
      });
    }

    const diskPercent = getDiskPercent();
    const diskLimit = Number(DISK_ALERT_PERCENT || 80);

    if (diskPercent >= diskLimit) {
      checks.push({
        key: "disk_high",
        cooldown: 120,
        subject: `ALERT: High Disk Usage ${diskPercent}% - ${REPORT_BRAND_NAME}`,
        message: `High disk usage detected.

Current Disk Usage: ${diskPercent}%
Alert Limit: ${diskLimit}%

Suggested commands:
df -h
du -sh /var/log/* 2>/dev/null | sort -h
sudo journalctl --vacuum-time=7d

Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
`,
      });
    }

    const memoryPercent = getMemoryPercent();
    const memoryLimit = Number(MEMORY_ALERT_PERCENT || 85);

    if (memoryPercent >= memoryLimit) {
      checks.push({
        key: "memory_high",
        cooldown: 120,
        subject: `ALERT: High Memory Usage ${memoryPercent}% - ${REPORT_BRAND_NAME}`,
        message: `High memory usage detected.

Current Memory Usage: ${memoryPercent}%
Alert Limit: ${memoryLimit}%

Suggested commands:
free -h
top
ps aux --sort=-%mem | head -10

Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
`,
      });
    }

    const sslDaysRemaining = getSslDaysRemaining();
    const sslLimit = Number(SSL_ALERT_DAYS || 15);

    if (sslDaysRemaining !== null && sslDaysRemaining <= sslLimit) {
      checks.push({
        key: "ssl_expiring",
        cooldown: 1440,
        subject: `ALERT: SSL Expiring in ${sslDaysRemaining} Days - ${REPORT_BRAND_NAME}`,
        message: `SSL certificate expiry warning.

Website: ${SITE_URL}
Days Remaining: ${sslDaysRemaining}
Alert Limit: ${sslLimit} days

Suggested command:
sudo certbot renew --dry-run

Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
`,
      });
    }

    if (checks.length === 0) {
      log("All alert checks passed. No email sent.");
      return;
    }

    for (const alert of checks) {
      if (shouldSendAlert(alert.key, alert.cooldown)) {
        await sendAlertEmail({
          subject: alert.subject,
          message: alert.message,
        });

        log(`Alert email sent: ${alert.key}`);
      } else {
        log(`Alert skipped due to cooldown: ${alert.key}`);
      }
    }
  } catch (error) {
    log(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

main();
