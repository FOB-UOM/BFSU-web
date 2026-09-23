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

## 4. Production Deployment (e.g. Vercel)

When deploying to Vercel or any hosting platform:
1. Navigate to **Project Settings > Environment Variables**.
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
3. **Do NOT** add `SUPABASE_ACCESS_TOKEN` in production (it is strictly a local developer CLI credential).
4. Configure OAuth redirect URLs in the Supabase Dashboard:
   - Go to **Authentication > URL Configuration**.
   - Set **Site URL** to your production domain: `https://bfsu-uom.lk` (or `https://your-preview.vercel.app`).
   - Add to **Redirect URLs**:
     - `http://localhost:3000/auth/callback`
     - `https://bfsu-uom.lk/auth/callback`
     - `https://*.vercel.app/auth/callback`
