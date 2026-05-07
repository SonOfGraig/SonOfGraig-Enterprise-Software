# SonOfGraig — Enterprise Software Platform

Marketing site and platform front-end for [SonOfGraig Digital Solutions](https://sonofgraigdigitalsolutions.com).
Africa's first enterprise AI platform — converting 18 service capabilities into 5 SaaS product clusters.

## Stack

- **Next.js 15** (App Router, TypeScript, React 19)
- **Tailwind CSS 4** + design system tokens in `app/globals.css`
- **Cloud Run** (region: `africa-south1`, project: `gen-lang-client-0731037145`)
- Standalone output, multi-stage Docker build

## Local development

**Prerequisites:** Node.js 20+, npm.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (also runs in Cloud Build)
npm run lint
```

## Deploy

Pushed to `main` → manual `gcloud run deploy` from the project root:

```powershell
$g = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
& $g run deploy sonofgraig-enterprise `
    --source . `
    --project gen-lang-client-0731037145 `
    --region africa-south1 `
    --quiet
```

Cloud Build picks up `Dockerfile` (Next.js standalone, multi-stage, non-root runtime).

Live URL: <https://sonofgraig-enterprise-179668402458.africa-south1.run.app>

## Repository conventions

- Design system source of truth: `systemdesign/` (specs) + `app/globals.css` (live tokens). Never invent tokens or components — extend through the v3 governance process documented in `systemdesign/15-governance.md`.
- Routes live in `app/(public)/` under the public route group.
- Marketing components in `components/marketing/<page>/`.
- Shared UI primitives in `components/ui/`.
- Legacy HTML pages are mounted via `LegacyShell` in `app/(public)/_shared/`.

## Phase status

| Phase | Status |
|---|---|
| Phase A — Wiring & polish (favicon, links, security headers, stubs) | Live |
| Phase B — Product cluster pages | Stubbed; full pages pending |
| Phase C — Supabase + Resend forms | Pending |
| Phase D — Security audit & hardening | Pending |
