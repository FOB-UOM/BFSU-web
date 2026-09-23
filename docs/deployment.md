# Deployment & DNS Guide: BFSU-web

This guide documents the production deployment pipeline, domain configuration, and email routing setup for **`bfsu-uom.lk`**.

---

## 1. Production Hosting (Vercel)

The frontend is deployed on **Vercel**:
- **Framework Preset:** Next.js
- **Build Command:** `pnpm build`
- **Output Directory:** Default (`.next`)
- **Package Manager:** `pnpm` (auto-detected from `packageManager` field in `package.json` and `pnpm-lock.yaml`)

Every commit pushed to the `main` branch automatically triggers a production deployment. Pull Requests receive isolated Preview Deployments.

---

## 2. DNS & Nameserver Configuration

The root domain `bfsu-uom.lk` is delegated to **Cloudflare** for DNS, DDoS protection, edge caching, and SSL:

- **Nameserver 1:** `west.ns.cloudflare.com`
- **Nameserver 2:** `gene.ns.cloudflare.com`

---

## 3. Email Routing (`bfsu-uom.lk`)

Emails sent to the official domain are forwarded through Cloudflare Email Routing:

### Active Routing Rules:
- **`info@bfsu-uom.lk`** ➔ forwards to `bfsu.uom@gmail.com`
- **`*@bfsu-uom.lk` (Catch-all)** ➔ forwards to `bfsu.uom@gmail.com`

### Required DNS Records in Cloudflare:
- **MX Records:**
  - `route1.mx.cloudflare.net` (Priority 10)
  - `route2.mx.cloudflare.net` (Priority 78)
  - `route3.mx.cloudflare.net` (Priority 42)
- **SPF TXT Record:**
  - Name: `bfsu-uom.lk`
  - Value: `"v=spf1 include:_spf.mx.cloudflare.net ~all"`
- **DKIM TXT Record:**
  - Name: `cf2024-1._domainkey.bfsu-uom.lk`
