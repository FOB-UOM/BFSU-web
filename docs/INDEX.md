---
title: "BFSU Digital Platform Documentation Index & Changelog"
status: "active"
created: 2026-09-24
updated: 2026-09-24
author: "Naveen"
scribe: "Antigravity"
tags: [index, changelog, documentation]
---

# BFSU Digital Platform Documentation Index & Changelog

This document acts as the central directory and chronological ledger for all technical, architectural, and operational documentation for the **Business Faculty Students' Union (BFSU)** web portal, Faculty of Business, University of Moratuwa.

All documentation adheres to the standards defined in [`docs/docs-sop.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/docs-sop.md).

---

## 1. Documentation Index

### Standards & SOPs
* [`docs/docs-sop.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/docs-sop.md): Official standard operating procedure for platform documentation, directory structure, naming conventions, and lifecycle management.

### Architecture & System Design (`docs/architecture/`)
* [`docs/architecture/entity-relationship-domain-model.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/entity-relationship-domain-model.md): Comprehensive institutional domain model, ERD, 4-tier profile progression, and Notion ecosystem architecture.
* [`docs/architecture.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture.md): Technical stack, toolchain, styling tokens, and frontend directory overview.
* [`docs/master-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/master-plan.md): Master architecture, Supabase authentication, database schema, and global expansion roadmap.

### Active Plans & Current Progress (`docs/current_progress/`)
* [`docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md): Granular execution roadmap for ERD migrations, Profile Peek Modals, 3 Departmental Society pages, and Notion Hub widgets.

### Infrastructure, Deployment & Environment (`docs/infra/`)
* [`docs/deployment.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/deployment.md): Vercel edge deployment and Cloudflare DNS setup.
* [`docs/environment-setup.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/environment-setup.md): Local developer environment configuration and dependency orchestration.
* [`docs/tooling.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/tooling.md): Development scripts and command-line tools.

---

## 2. Chronological Changelog

### 2026-09-24
* **Imported Documentation SOP**: Copied and standardized [`docs/docs-sop.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/docs-sop.md) into the repository.
* **Domain Model & ERD Architecture**: Published [`docs/architecture/entity-relationship-domain-model.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/entity-relationship-domain-model.md) defining unified `Person`/`Profile` class, institutional hierarchy (Uni $\rightarrow$ Faculty $\rightarrow$ 3 Departments $\rightarrow$ Union $\rightarrow$ 3 Societies), attribution of all artifacts to `user_id`, 4-tier persona progression, and Notion integrations.
* **Granular Implementation Plan**: Authored [`docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md).
* **Documentation Index**: Created [`docs/INDEX.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/INDEX.md).

### 2026-09-23
* **Migration to Next.js 16 & Supabase Auth**: Configured Supabase GoTrue Auth, OAuth callbacks, database schemas (`public.profiles`, `public.news`, `public.events`), and public delegate profile routing (`/u/[username]`).
* **Design & Theming Engine**: Light/Dark/System theme engine with `@intuitui-labs/editorial` provenance.
