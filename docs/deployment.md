# Deployment & DNS Guide: BFSU-web

This guide documents the production deployment pipeline, domain configuration, and email routing setup for **`bfsu-uom.lk`**.

---

## 1. Production Hosting (Vercel)

The frontend is deployed on **Vercel** under the dedicated organization team:
- **Organization Team:** `BFSU` (`team_8qL6spF4ttTSwNI299aADDye`)
- **Project Name:** `bfsu-web` (`prj_f5yX1W5uELb7s2JUpd9Tcmkvm6mh`)
- **Framework Preset:** Next.js
- **Build Command:** `pnpm build`
- **Output Directory:** Default (`.next`)
- **Package Manager:** `pnpm` (`12.4.2`)
- **Production URL:** [`https://bfsu-uom.lk`](https://bfsu-uom.lk) (Aliased)
- **Vercel Edge URL:** `https://bfsu-eoprb33ok-bfsu.vercel.app`

### Deployment Workflow:
- **Manual CLI Deploy:** `pnpm deploy:prod` (uses scoped local `.vercel/` configuration)
- **Automated Git CI/CD:** When GitHub repo `FOB-UOM/BFSU-web` is connected in Vercel settings, every commit pushed to `main` triggers a production deployment.

---

## 2. DNS & Nameserver Configuration

The root domain `bfsu-uom.lk` is delegated to **Cloudflare** for DNS, DDoS protection, edge caching, and SSL:
- **Cloudflare Account ID:** `a8b78cbc41ad1de1c003d19706c4c9ea` (`Bfsu.uom@gmail.com's Account`)
- **Cloudflare Zone ID:** `bdeba6b6d8e7a8cc19d62aed4bc31e9c`
- **Active Nameservers (at LK Domain Registry):**
  - `ashton.ns.cloudflare.com`
  - `naomi.ns.cloudflare.com`

### Active Production Web DNS Records:
| Record Type | Name / Host | Target Value | Proxy Status | Description |
|-------------|-------------|--------------|--------------|-------------|
| `A` | `@` (`bfsu-uom.lk`) | `76.76.21.21` | DNS Only / Proxied | Points apex domain to Vercel origin |
| `CNAME` | `www` | `cname.vercel-dns.com` | DNS Only / Proxied | Points `www` subdomain to Vercel |

> [!NOTE]
> **Error 1000 Resolution:** Previously, four prohibited `AAAA` records pointed to Cloudflare's own internal edge IPv6 addresses without an `A` record for Vercel, triggering Error 1000. These were purged and replaced with the Vercel `A` record (`76.76.21.21`) and `www` `CNAME` (`cname.vercel-dns.com`).

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
