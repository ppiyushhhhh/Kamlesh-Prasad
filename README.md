# 🚀 DevOps Infrastructure & CI/CD Deployment Project

<div align="center">

[![AWS EC2](https://img.shields.io/badge/AWS-EC2-FF9900?logo=amazonaws&logoColor=white)](https://aws.amazon.com/ec2/)
[![Ubuntu](https://img.shields.io/badge/OS-Ubuntu-E95420?logo=ubuntu&logoColor=white)](https://ubuntu.com/)
[![Nginx](https://img.shields.io/badge/Web%20Server-Nginx-009639?logo=nginx&logoColor=white)](https://nginx.org/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

**A complete production-ready DevOps infrastructure demonstrating automated deployment, monitoring, and infrastructure management**

[Live Website](http://kamleshprasad.xyz) • [GitHub Actions](https://github.com) • [Documentation](#documentation)

</div>

---

## 📋 Overview

This project demonstrates a **complete DevOps workflow** for deploying and operating a production-ready React application on AWS EC2. It showcases real-world practices including automated CI/CD deployment, infrastructure monitoring, automated backups, email alerts, and comprehensive health reporting.

### ✨ Key Highlights

- ✅ **Fully Automated CI/CD** with GitHub Actions
- ✅ **AWS EC2 Hosting** on Ubuntu server
- ✅ **Nginx Web Server** configuration
- ✅ **React + Vite** production deployment
- ✅ **Custom Domain** with Cloudflare DNS
- ✅ **Professional Email Infrastructure** (SPF, DKIM, DMARC)
- ✅ **Daily Health Reports** as PDF emails
- ✅ **Automated Server Backups** with retention policy
- ✅ **Infrastructure Alerts** every 5 minutes
- ✅ **Server Monitoring** and logging

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        DEPLOYMENT FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Developer      GitHub          GitHub Actions        AWS EC2    │
│  Repository  →  Repository   →  CI/CD Pipeline   →   Server     │
│                                                            ↓      │
│                                                      React Build  │
│                                                            ↓      │
│                                                        Nginx      │
│                                                            ↓      │
│                                                      Live Website │
│                                                   (kamleshprasad) │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     EMAIL & NOTIFICATION FLOW                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Daily Reports     Daily Backups      Infrastructure Alerts      │
│       ↓                  ↓                     ↓                  │
│    PDF Gen         Backup Gen            Status Check            │
│       ↓                  ↓                     ↓                  │
│   Gmail SMTP       Gmail SMTP            Gmail SMTP              │
│       ↓                  ↓                     ↓                  │
│    Inbox           Inbox                   Inbox                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Live Demo

| Component | URL |
|-----------|-----|
| **Website** | [kamleshprasad.xyz](http://kamleshprasad.xyz) |
| **Direct IP** | [13.203.154.124](http://13.203.154.124) |

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Version Control** | Git & GitHub | Source code management |
| **CI/CD** | GitHub Actions | Automated deployment |
| **Cloud** | AWS EC2 | Server hosting |
| **OS** | Ubuntu | Server operating system |
| **Web Server** | Nginx | HTTP server & reverse proxy |
| **Frontend** | React + Vite | Modern web application |
| **Runtime** | Node.js | JavaScript runtime |
| **DNS** | Cloudflare | Domain management |
| **Email** | Gmail SMTP | Automated notifications |
| **Automation** | Node.js Scripts | Cron-based automation |
| **Reporting** | PDFKit | PDF generation |
| **Scheduling** | Cron | Task scheduling |

---

## 📦 Prerequisites

- AWS EC2 instance (Ubuntu 20.04+)
- GitHub repository with GitHub Actions enabled
- Node.js 16+ and npm
- Nginx web server
- Cloudflare account (optional, for DNS)
- Gmail account with app password
- SSH key pair for secure deployment

---

## 🔧 Quick Start

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js and npm
sudo apt install nodejs npm -y

# Install Nginx
sudo apt install nginx -y

# Set timezone
sudo timedatectl set-timezone Asia/Kolkata
```

### 2. Clone Repository

```bash
cd /home/ubuntu
git clone <your-repo-url>
cd kamlesh-prasad-executive
```

### 3. Build Application

```bash
# Install dependencies
npm install

# Build React application
npm run build

# Output is in dist/ directory
```

### 4. Deploy to Nginx

```bash
# Copy build files to Nginx root
sudo cp -r dist/* /var/www/html/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 5. Setup Automation

```bash
cd automation

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your settings
nano .env

# Test email sending
node test-mail.cjs
```

### 6. Configure GitHub Actions

1. Generate SSH key pair:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions"
   ```

2. Add public key to server:
   ```bash
   cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys
   ```

3. Add private key to GitHub Secrets as `EC2_SSH_KEY`

4. Update GitHub Actions workflow with your server details

---

## 📁 Project Structure

```
kamlesh-prasad-executive/
├── src/                          # React source code
├── dist/                         # Production build (Nginx serves this)
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD pipeline
├── automation/                   # Server automation scripts
│   ├── daily-report.cjs         # Daily health report PDF
│   ├── backup-server.cjs        # Daily backup automation
│   ├── alert-monitor.cjs        # Infrastructure alert monitoring
│   ├── test-mail.cjs            # Email test script
│   ├── .env                     # Environment variables (git-ignored)
│   ├── .env.example             # Example configuration
│   ├── logs/                    # Cron job logs
│   ├── backups/                 # Backup archives
│   ├── backup-reports/          # Backup PDF reports
│   └── reports/                 # Health report PDFs
├── public/                       # Static assets
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔄 CI/CD Deployment Pipeline

### Workflow Trigger
Automatically triggered on every push to main/master branch.

### Deployment Steps

1. **Trigger** → Developer pushes code to GitHub
2. **Connect** → GitHub Actions SSH into EC2 server
3. **Pull** → Latest code fetched from repository
4. **Build** → React application built using Vite
5. **Deploy** → Production files copied to Nginx directory
6. **Verify** → Website automatically becomes live

### GitHub Secrets Required

```
EC2_SSH_KEY         # SSH private key for secure connection
EC2_HOST            # Server IP or domain
EC2_USER            # SSH username (usually 'ubuntu')
EC2_PORT            # SSH port (default 22)
```

---

## ⚙️ Automation System

### Daily Website Health Report

**Schedule:** 7:00 PM IST (daily)  
**Output:** PDF email report

**Includes:**
- Website URL & HTTP status
- Website response time
- Server hostname, IP, platform
- CPU cores & server uptime
- Disk and memory usage
- Nginx service status
- SSL certificate expiry
- Latest Git commit
- Overall health status

```bash
# Cron job
0 19 * * * cd /home/ubuntu/kamlesh-prasad-executive/automation && /usr/bin/node daily-report.cjs >> logs/cron.log 2>&1
```

### Daily Server Backup

**Schedule:** 7:30 PM IST (daily)  
**Output:** Compressed tar.gz backup + PDF report

**Backed Up:**
- Project source files
- Automation scripts
- Nginx configurations
- Certbot renewal config
- System information

**Excluded (for security):**
- node_modules/
- dist/
- .git/
- automation/.env
- Logs and previous backups

**Retention Policy:** Latest 7 days only (automatic cleanup)

```bash
# Cron job
30 19 * * * cd /home/ubuntu/kamlesh-prasad-executive/automation && /usr/bin/node backup-server.cjs >> logs/backup-cron.log 2>&1
```

### Infrastructure Alert Monitoring

**Schedule:** Every 5 minutes (24/7 monitoring)  
**Output:** Email alerts (only when issues detected)

**Monitored Conditions:**
- ⚠️ Website is down
- ⚠️ Website HTTP status code errors
- ⚠️ Nginx service not running
- ⚠️ Disk usage > 80%
- ⚠️ Memory usage > 85%
- ⚠️ SSL certificate expires within 15 days

**Smart Features:**
- Cooldown logic to prevent spam
- Immediate notification of issues
- Automatic recovery detection

```bash
# Cron job
*/5 * * * * cd /home/ubuntu/kamlesh-prasad-executive/automation && /usr/bin/node alert-monitor.cjs >> logs/alert-cron.log 2>&1
```

### Email Test

Verify SMTP configuration before running production automations:

```bash
cd automation
node test-mail.cjs
```

---

## 📧 Email Infrastructure Setup

### Cloudflare Email Routing

Forward domain emails to Gmail:

```
admin@kamleshprasad.xyz        → Gmail inbox
contact@kamleshprasad.xyz      → Gmail inbox
```

### Gmail SMTP Configuration

**File:** `automation/.env`

```env
REPORT_TO_EMAIL=your-email@gmail.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password          # NOT your Gmail password!

MAIL_FROM_EMAIL=admin@yourdomain.xyz
MAIL_FROM_NAME=Your Portfolio Name
```

⚠️ **Important:** Use Gmail App Password, not your regular Gmail password.

### Email Authentication Records

**SPF Record:**
```
v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all
```

**DKIM:** Configured via Cloudflare/DNS provider

**DMARC Record:**
```
v=DMARC1; p=quarantine; rua=mailto:admin@yourdomain.xyz
```

---

## 🔐 Security Configuration

### Environment Variables

Create `.env` file (never commit to GitHub):

```env
# Email Configuration
REPORT_TO_EMAIL=your-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM_EMAIL=admin@yourdomain.xyz
MAIL_FROM_NAME=Your Portfolio Name

# Site Configuration
SITE_URL=https://yourdomain.xyz
REPORT_BRAND_NAME=Your Portfolio Name

# Alert Thresholds
DISK_ALERT_PERCENT=80
MEMORY_ALERT_PERCENT=85
SSL_ALERT_DAYS=15

# Backup Configuration
BACKUP_RETENTION_DAYS=7
BACKUP_DIR=/home/ubuntu/kamlesh-prasad-executive/automation/backups
PROJECT_DIR=/home/ubuntu/kamlesh-prasad-executive
```

### .gitignore Entries

```gitignore
# Automation secrets and generated files
automation/.env
automation/logs/
automation/backups/
automation/backup-temp/
automation/backup-reports/
automation/state/
automation/node_modules/

# Build and dependencies
node_modules/
dist/
```

### Security Best Practices

✅ Never commit `.env` file  
✅ Use GitHub Secrets for sensitive values  
✅ Use Gmail App Passwords (not regular passwords)  
✅ Restrict SSH key permissions: `chmod 600`  
✅ Use SSH keys for GitHub Actions authentication  
✅ Keep backup files in secure directory  
✅ Regularly review access logs  

---

## 📊 Monitoring & Commands Reference

### Check Nginx Status

```bash
# Check if Nginx is running
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Test Nginx configuration
sudo nginx -t

# View Nginx error logs
sudo tail -50 /var/log/nginx/error.log

# View Nginx access logs
sudo tail -50 /var/log/nginx/access.log
```

### Check Website Health

```bash
# Quick HTTP status check
curl -I http://yourdomain.xyz

# Detailed response check
curl -v http://yourdomain.xyz

# Response time check
time curl http://yourdomain.xyz
```

### View Automation Logs

```bash
cd /home/ubuntu/kamlesh-prasad-executive/automation

# Daily report logs
tail -100 logs/cron.log

# Backup logs
tail -100 logs/backup-cron.log

# Alert monitor logs
tail -100 logs/alert-cron.log
```

### Manage Cron Jobs

```bash
# View all cron jobs
crontab -l

# Edit cron jobs
crontab -e

# View cron job logs
journalctl -u cron
```

### Check Backups

```bash
# List backup files
ls -lh /home/ubuntu/kamlesh-prasad-executive/automation/backups

# Check backup size
du -sh /home/ubuntu/kamlesh-prasad-executive/automation/backups

# List backup reports
ls -lh /home/ubuntu/kamlesh-prasad-executive/automation/backup-reports
```

### Server Information

```bash
# Check server uptime
uptime

# Check disk usage
df -h

# Check memory usage
free -h

# Check CPU cores
nproc

# Check hostname
hostname

# Check IP address
hostname -I
```

---

## 🌐 Domain & DNS Configuration

### Domain Used
```
kamleshprasad.xyz
```

### DNS Records (Cloudflare)

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | kamleshprasad.xyz | 13.203.154.124 | Root domain to EC2 |
| CNAME | www | kamleshprasad.xyz | www subdomain redirect |

### Update DNS Records

1. Log into Cloudflare dashboard
2. Select your domain
3. Go to DNS Records
4. Add/Update A record pointing to your EC2 IP
5. Add CNAME for www subdomain
6. Wait for DNS propagation (usually 5-30 minutes)

---

## 📈 Automation Schedule Summary

| Task | Schedule | Output |
|------|----------|--------|
| **Website Health Report** | 7:00 PM IST | PDF email |
| **Server Backup** | 7:30 PM IST | Compressed archive |
| **Backup Report** | 7:30 PM IST | PDF email |
| **Alert Monitor** | Every 5 min | Email (if issue) |
| **Test Email** | Manual | SMTP verification |

---

## 🔄 Deployment Workflow

### Manual Deployment (if needed)

```bash
# SSH into server
ssh -i your-key.pem ubuntu@13.203.154.124

# Navigate to project
cd /home/ubuntu/kamlesh-prasad-executive

# Pull latest code
git pull origin main

# Install dependencies (if needed)
npm install

# Build application
npm run build

# Copy to Nginx
sudo cp -r dist/* /var/www/html/

# Restart Nginx
sudo systemctl restart nginx
```

### Automated Deployment

Simply push to GitHub:

```bash
git add .
git commit -m "Your message"
git push origin main
```

GitHub Actions will automatically deploy!

---

## 🎯 Future Improvements

- 🔒 HTTPS/SSL certificates with auto-renewal
- 🐳 Docker-based deployment
- 📊 Prometheus & Grafana monitoring dashboard
- 📝 Centralized logging system
- 🔄 Automated backup restore functionality
- ✅ Backup integrity verification
- 📋 Monthly executive infrastructure reports
- 🔔 Deployment success/failure notifications
- 🛡️ Security vulnerability scan reports
- 🚀 Auto-healing for failed services

---

## 📚 Documentation

For detailed documentation on specific components:

- [CI/CD Pipeline Details](#cicd-deployment-pipeline)
- [Automation Configuration](#automation-system)
- [Email Setup](#email-infrastructure-setup)
- [Security Best Practices](#security-configuration)
- [Troubleshooting](#monitoring--commands-reference)

---

## 💡 Key Learnings & Skills Demonstrated

### DevOps & Infrastructure
- AWS EC2 instance management
- Ubuntu server administration
- Nginx web server configuration
- SSL/TLS certificate management
- Linux system administration

### CI/CD & Automation
- GitHub Actions workflow automation
- SSH-based secure deployment
- Automated testing and building
- Cron job scheduling
- Node.js automation scripting

### Cloud & DNS
- Cloudflare DNS management
- Email routing configuration
- SPF, DKIM, DMARC authentication
- Domain email setup

### Monitoring & Alerts
- Infrastructure health monitoring
- Automated alert systems
- PDF report generation
- Server backup management
- Log aggregation

### Development
- React + Vite production deployment
- Git version control workflow
- Package management (npm)
- Full-stack deployment practices

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Piyush Prasad**  
DevOps & Cloud Enthusiast

- **Website:** [kamleshprasad.xyz](http://kamleshprasad.xyz)
- **Email:** admin@kamleshprasad.xyz

---

## 🙏 Acknowledgments

- AWS for reliable cloud infrastructure
- Cloudflare for DNS and email routing services
- GitHub for version control and CI/CD platform
- The open-source community for amazing tools

---

<div align="center">

**⭐ If you found this helpful, please consider giving it a star!**

[Report Issue](../../issues) • [Request Feature](../../issues) • [Discussions](../../discussions)

</div>
