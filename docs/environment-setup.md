# Environment Setup & Supabase Configuration Guide

This document explains how environment variables, authentication, and Supabase database migrations are structured and maintained for the BFSU Web portal.

---

## 1. Quick Setup

1. Copy the example environment file to your local untracked environment:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the required variables in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (e.g. `https://jbbcsxdkboiytqgaceen.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: The public API key from your Supabase Dashboard
   - `SUPABASE_ACCESS_TOKEN` *(optional for dev)*: Your personal access token for isolated CLI operations without clobbering personal logins.

---

## 2. Environment Variables Reference

| Variable | Scope | Description | Where to find |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | Base URL of your Supabase project API | Supabase Dashboard > Project Settings > API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client & Server | Public anonymous/publishable key for browser & SSR requests | Supabase Dashboard > Project Settings > API |
| `SUPABASE_ACCESS_TOKEN` | CLI Only | Personal Access Token to link and push migrations locally | Supabase Account > Access Tokens (`sbp_...`) |

---

## 3. Scoped Supabase CLI Workflow (Avoiding Multi-Account Conflicts)

If you use multiple Supabase accounts across different projects, **never run `supabase login` globally with conflicting personal accounts**. Instead, use directory-scoped tokens:

### A. Linking the project locally
```powershell
# PowerShell (Windows)
$env:SUPABASE_ACCESS_TOKEN="<YOUR_TOKEN>"; pnpm supabase link --project-ref jbbcsxdkboiytqgaceen
```

### B. Applying Database Migrations
Migrations are stored in `supabase/migrations/`. To apply new migrations to your remote project:
```powershell
$env:SUPABASE_ACCESS_TOKEN="<YOUR_TOKEN>"; pnpm supabase db push
```

### C. Generating New Migrations
When adding new tables or columns:
```powershell
pnpm supabase migration new <migration_name>
```
Edit the generated SQL file in `supabase/migrations/`, then run `pnpm supabase db push`.

---

## 4. Scoped Cloudflare Profile Workflow (Wrangler, MCP & DNS)

To prevent conflicts with personal Cloudflare accounts logged into your machine:

1. **Obtain a Scoped API Token:**
   - Go to Cloudflare Dashboard > **My Profile** > **API Tokens**.
   - Create a Custom Token with:
     - `Zone.DNS` (Edit)
     - `Account Settings` (Read)
     - Zone Resources: Include `bfsu-uom.lk`
2. **Add to `.env.local`:**
   ```env
   CLOUDFLARE_API_TOKEN="your_scoped_token"
   CLOUDFLARE_ACCOUNT_ID="your_account_id"
   ```

3. **Isolated 1-Click Login (Safe Directory-Bound Login):**
   Run the dedicated BFSU login assistant:
   ```powershell
   pnpm login:bfsu
   ```
   * **Absolute Safety Guarantee:** This forces Wrangler to store tokens inside `./.wrangler/` and Vercel to store tokens inside `./.vercel/`. Your personal workstation credentials in `AppData` will **never** be touched or overridden.

4. **Execute CLI Operations Without Global Login:**
   - Inspect active DNS records:
     ```powershell
     pnpm dns:status
     ```
   - Automatically correct Vercel origin records (`A` to `76.76.21.21` and `CNAME`):
     ```powershell
     pnpm dns:sync
     ```
   - Run Wrangler commands (Wrangler automatically favors local directory configs):
     ```powershell
     npx wrangler whoami
     ```

5. **Cloudflare MCP Server Configuration:**
   Add to your MCP settings (`claude_desktop_config.json` or Antigravity MCP config):
   ```json
   {
     "mcpServers": {
       "cloudflare-bfsu": {
         "command": "npx",
         "args": ["-y", "@cloudflare/mcp-server-cloudflare", "run", "<CLOUDFLARE_ACCOUNT_ID>"],
         "env": {
           "CLOUDFLARE_API_TOKEN": "<CLOUDFLARE_API_TOKEN>"
         }
       }
     }
   }
   ```

---

## 5. Scoped Vercel Profile Workflow

If your global machine CLI is logged into a personal Vercel account, isolate BFSU by linking this project directly to the organizational scope:

1. **Authenticate to Isolated Directory Config:**
   ```powershell
   pnpm login:vercel
   ```
   This isolates Vercel authentication strictly to `./.vercel/` without touching your personal workstation account.

2. **Deploy from Local Directory:**
   ```powershell
   pnpm deploy:prod
   ```

---

## 6. Git Identity Isolation

Ensure commits in this repository do not use your personal global git author details:
```powershell
pnpm git:profile
```
*(Or manually: `git config --local user.name "BFSU Admin"` and `git config --local user.email "info@bfsu-uom.lk"`)*

---

## 7. Master Scoped Commands Cheatsheet

| Command | Purpose | Underlying Provider |
| :--- | :--- | :--- |
| `pnpm login:bfsu` | Interactive status dashboard & login menu for all services | Cloudflare, Vercel, Supabase, Git |
| `pnpm login:cf` | Authenticate Cloudflare isolated to `./.wrangler/` | Cloudflare |
| `pnpm login:vercel` | Authenticate Vercel isolated to `./.vercel/` | Vercel |
| `pnpm login:supabase` | Verify/link Supabase via `SUPABASE_ACCESS_TOKEN` | Supabase |
| `pnpm git:profile` | Configure local Git author identity | Git |
| `pnpm dns:status` | Check active Cloudflare DNS records via API | Cloudflare |
| `pnpm dns:sync` | Auto-correct DNS records to Vercel origin | Cloudflare |
| `pnpm db:status` | List remote Supabase migrations | Supabase |
| `pnpm db:push` | Push pending local migrations to remote Supabase | Supabase |
| `pnpm db:pull` | Pull remote database schema | Supabase |
| `pnpm deploy:prod` | Deploy directory to Vercel production using `./.vercel` | Vercel |
