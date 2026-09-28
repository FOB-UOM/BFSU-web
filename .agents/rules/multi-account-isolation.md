# Rule: Multi-Account Directory Scoping & Skill Cleanliness

## 1. Skill Cleanliness & Generalization
- Never hardcode repository-specific domain names, email addresses, personal identifiers, or project credentials inside any `.agents/skills/*/SKILL.md` file.
- Skills must remain pristine, modern (2026+), vendor-standard, and universally reusable across projects.
- Store project-specific records, nameservers, and configuration details strictly in `docs/` and untracked `.env.local`.

## 2. Directory-Scoped Tooling Invariant
When configuring CLI tools (Wrangler, Vercel, Supabase, Git) for organizational or client codebases:
- Never overwrite the developer's global workstation credentials (`AppData\Roaming`).
- Redirect Cloudflare config to `./.wrangler` via `WRANGLER_HOME`.
- Redirect Vercel config to `./.vercel` via `--global-config ./.vercel`.
- Wrap Supabase CLI commands to read `SUPABASE_ACCESS_TOKEN` from `.env.local`.
- Verify `.gitignore` contains `./.wrangler/`, `./.vercel/`, and `*.local`.
- Set repository-local Git author identity (`git config --local user.*`).
- When providing login assistants, provide dedicated single-service subcommands alongside sequential options.
