# Business Faculty Students' Union (BFSU) - Web Portal

The official digital portal for the Business Faculty Students' Union (BFSU) at the University of Moratuwa. Built on Next.js 16 (App Router), React 19, Supabase, Tailwind CSS, and editorial typography design tokens.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: 22+ (managed via [mise](https://mise.jdx.dev/))
- **pnpm**: 12.4.2+

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/FOB-UOM/BFSU-web.git
cd BFSU-web

# Install dependencies
pnpm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
```
For detailed setup instructions and scoped multi-account Supabase CLI usage, read [docs/environment-setup.md](docs/environment-setup.md).

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🏛️ Architecture & Key Features

- **Next.js 16 (App Router)**: Hybrid static prerendering with dynamic data caching.
- **Supabase Backend**:
  - `public.profiles`: Student indices, batches, departments, and LinkedIn URLs.
  - `public.news`: Official circulars and dispatches.
  - `public.events`: Assemblies, symposiums, and delegate agendas.
  - `public.event_registrations`: Interactive student & alumni RSVPs with RLS security.
- **Editorial Provenance**: Machine-readable metadata and verification headers via `@intuitui-labs/editorial`.
- **Identity & Authentication**: Supabase Auth with interactive modal (`AuthModal.jsx`), email verification, and OAuth.
- **Typography & Theme System**: Dark/Light mode with curated serif/sans/mono font pairings (`Cinzel`, `Fraunces`, `Plus Jakarta Sans`, `Space Mono`).

---

## 🛠️ Documentation

- [Environment Setup & Supabase Guide](docs/environment-setup.md)
- [Tooling & Maintenance Guide](docs/tooling.md)
- [Schema & Database Migrations](supabase/migrations/)
