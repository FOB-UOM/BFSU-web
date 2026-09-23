# Architecture & Technical Overview: BFSU-web

The Business Faculty Students' Union (BFSU) web platform is the central digital hub for the Faculty of Business at the University of Moratuwa.

---

## 1. Toolchain & Environment

- **Version Orchestration:** Managed via [`mise`](https://mise.jdx.dev) (`.mise.toml`)
  - Node.js LTS: `v22`
  - Package Manager: `pnpm v12.4.2`
- **Lockfile Policy:** `pnpm-lock.yaml` is the single source of truth. Do not commit `package-lock.json` or `yarn.lock`.

---

## 2. Technology Stack

- **Framework:** Next.js (App Router)
- **Language:** JavaScript / React (React 19)
- **Styling:** Tailwind CSS with an intentional custom editorial design palette:
  - Custom font family: *Plus Jakarta Sans*, *Cinzel* (monumental), and *Fraunces* (serif)
  - Semantic theme tokens: `--bg-page`, `--bg-surface`, `--text-primary`, `--border`, `--border-strong`
  - Dark & Light mode support powered by CSS variables and `next-themes` / `ThemeContext`
- **Icons:** `lucide-react`
- **Hosting Target:** Vercel (Frontend & Edge CDN)
- **Domain & DNS:** Cloudflare (`bfsu-uom.lk`)

---

## 3. Directory Structure

```text
BFSU-web/
├── docs/                 # Engineering, onboarding & deployment guides
├── public/               # Static assets, logos, favicon, robots.txt, sitemap.xml
├── src/
│   ├── app/              # Next.js App Router (pages, layouts, metadata)
│   ├── components/       # Reusable UI components (Navbar, Footer, Backgrounds, Cards)
│   ├── context/          # React contexts (Theme, Typography)
│   ├── data/             # Content files & data structures (site content, news, events)
│   ├── pages/            # Legacy page views (being migrated to app/)
│   └── sections/         # Composable section components (Hero, About, Events, News)
├── .mise.toml            # Developer toolchain configuration
├── pnpm-lock.yaml        # Pnpm dependency lockfile
├── tailwind.config.js    # Tailwind styling tokens & theme extensions
└── next.config.mjs       # Next.js configuration
```
