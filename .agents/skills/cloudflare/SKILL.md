---
name: cloudflare
description: Modern engineering playbook for managing Cloudflare DNS, Vercel/external origin binding, SSL/TLS, edge caching, Email Routing, Wrangler CLI multi-account profiling, and Cloudflare MCP.
---

# Cloudflare Modern Engineering Playbook

A vendor-agnostic, modern engineering skill for architecting, configuring, and operating services on the Cloudflare global network. Use this guide to configure DNS, integrate external hosting origins (Vercel, AWS, Netlify), resolve edge error codes, configure Cloudflare MCP, and manage multi-account developer environments without credential collisions.

---

## 1. Domain & DNS Origin Binding Architecture

When routing traffic through Cloudflare to external hosting platforms (e.g., Vercel, AWS S3/CloudFront, Fly.io):

### A. Core Record Conventions
| Record Type | Host | Recommended Value | Cloudflare Proxy | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (Apex) | Origin IPv4 (e.g., `76.76.21.21` for Vercel) | Proxied (Orange) or DNS Only (Grey) | Maps root domain to external host. |
| **CNAME** | Subdomain / `www` | Origin CNAME (e.g., `cname.vercel-dns.com`) | Proxied (Orange) or DNS Only (Grey) | Canonical mapping for subdomains. |
| **AAAA** | Optional IPv6 | Origin IPv6 | Proxied / DNS Only | Direct IPv6 ingress if origin provides fixed IPv6. |

### B. SSL/TLS Mode Matrix
To prevent redirect loops (`ERR_TOO_MANY_REDIRECTS`) or 52x edge errors:
- **Full (Strict):** Recommended for modern origins that possess valid, trusted SSL certificates (e.g., Let's Encrypt / Vercel auto-issued). Cloudflare validates the origin certificate before proxying.
- **Full:** Encrypts connection between Cloudflare and origin without verifying certificate authenticity (useful for self-signed origin certs).
- **Flexible:** *Deprecated / Insecure.* Causes infinite redirect loops if the origin enforces HTTPS redirects.

---

## 2. Diagnostics & Edge Error Playbooks

### Error 1000: "DNS points to prohibited IP"
- **Root Cause:** An `A` or `AAAA` record in Cloudflare DNS resolves to an IP address owned by Cloudflare's own edge network (e.g., `104.16.0.0/12`, `172.64.0.0/13`, `1.1.1.1`), or an unroutable loopback/bogon IP (`127.0.0.1`, `0.0.0.0`). When Cloudflare attempts to forward the incoming request to the origin, it detects itself as the destination, generating an infinite routing cycle.
- **Diagnostic Step:**
  ```powershell
  Resolve-DnsName -Name <domain> -Type A -Server 8.8.8.8
  ```
- **Remediation:**
  1. Open the Cloudflare Dashboard > **DNS** > **Records**.
  2. Inspect the origin IP of the failing record.
  3. Replace the Cloudflare IP with the actual server/host Anycast IP provided by your hosting provider.
  4. Ensure the registrar nameservers match the exact pair assigned to the active Cloudflare zone.

### Error 1001: "DNS resolution error"
- **Cause:** Domain points to Cloudflare nameservers, but no active zone exists for that hostname in the account, or DNS queries cannot locate the host record.

### Error 521 / 522: "Web Server Is Down" / "Connection Timed Out"
- **Cause:** Cloudflare edge proxies cannot establish a TCP handshake on port 80/443 with the origin IP. Verify origin firewall allows Cloudflare IP ranges.

---

## 3. Multi-Account Developer Environments (Personal vs Organization)

Developers often manage personal side-projects alongside client or organizational infrastructure on the same workstation. Avoid overriding global credentials by adopting directory-scoped authentication.

### Credential Resolution Hierarchy
```
Project Directory (.env.local / Environment variables)
  └── Highest precedence: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID
User Global Config (~/.wrangler/config/default.toml)
  └── Fallback: wrangler login (Interactive OAuth session)
```

### Setup Workflows

#### 1. Global Setup (Personal Profile)
For personal repos, use the default interactive OAuth login:
```bash
npx wrangler login
npx wrangler whoami
```

#### 2. Project-Scoped Setup (Organization / Client Profile)
For organizational codebases, create a scoped API token in the organization's Cloudflare Dashboard:
- Required Permissions: `Zone.DNS` (Edit), `Account Settings` (Read).
- Add to the project's local environment file (`.env.local` or `.mise.local.toml`, ensuring it is gitignored):
  ```env
  CLOUDFLARE_API_TOKEN="cf_api_..."
  CLOUDFLARE_ACCOUNT_ID="your_account_hash"
  ```
- Wrangler and SDK tools in that folder automatically pick up the token without affecting your global personal session.

---

## 4. Cloudflare Model Context Protocol (MCP) Integration

The official Cloudflare MCP server package (`@cloudflare/mcp-server-cloudflare`) enables AI agents to query analytics, inspect DNS zones, and orchestrate serverless resources securely.

### Configuration Template (`mcpServers`)
Add to your local MCP client configuration file:

```json
{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": [
        "-y",
        "@cloudflare/mcp-server-cloudflare",
        "run",
        "<CLOUDFLARE_ACCOUNT_ID>"
      ],
      "env": {
        "CLOUDFLARE_API_TOKEN": "<CLOUDFLARE_API_TOKEN>"
      }
    }
  }
}
```

### Best Practices for Token Security:
- Avoid granting global super-administrator tokens to MCP servers.
- Use granular API tokens restricted to specific zones and required capabilities (e.g., DNS read/edit, Worker deployment).
