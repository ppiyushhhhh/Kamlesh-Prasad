const nodemailer = require("nodemailer");
const path = require("path");
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
} = process.env;

async function main() {
  if (!REPORT_TO_EMAIL || !SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing required SMTP values in .env file");
  }

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

  await transporter.sendMail({
    from: `"${MAIL_FROM_NAME || REPORT_BRAND_NAME || "Test Mail"}" <${MAIL_FROM_EMAIL || SMTP_USER}>`,
    to: REPORT_TO_EMAIL,
    subject: "Test Mail - Kamlesh Prasad Portfolio Automation",
    text: `Hello,

This is a test email from Kamlesh Prasad Portfolio automation.

If you received this email, SMTP mail sending is working correctly.

Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Regards,
Automated Report System`,
  });

  console.log(`Test email sent successfully to ${REPORT_TO_EMAIL}`);
}

main().catch((error) => {
  console.error("Email test failed:");
  console.error(error.message);
  process.exit(1);
});
