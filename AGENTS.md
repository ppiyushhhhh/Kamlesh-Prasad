# AGENTS.md

## Purpose
This file provides guidance for coding agents working in this repository.

## Repository Overview
- Frontend: React + Vite + TypeScript (root project)
- Automation scripts: Node.js CommonJS scripts in `automation/`
- CI/CD: GitHub Actions workflow at `.github/workflows/deploy.yml` deploys `dist/` to EC2 on push to `main`

## Key Directories
- `src/`: application source code
- `public/`: static assets
- `automation/`: reporting, backup, and alert scripts
- `.github/workflows/`: CI/CD workflow definitions

## Setup
### Root project
```bash
npm install
```

### Automation scripts
```bash
cd automation
npm install
```

## Common Commands (root)
```bash
npm run dev
npm run build
npm run lint
npm run test
```

## Change Guidance
- Keep changes scoped and minimal.
- Prefer existing project patterns and dependencies.
- Do not commit secrets or `.env` values.
- When touching deployment behavior, verify `.github/workflows/deploy.yml` assumptions remain valid.

## Validation Guidance
- For frontend changes, run:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
- For `automation/` changes, run impacted script(s) directly (there is no real test suite configured there).

