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
* [`docs/architecture/information-architecture-and-mobile-navigation.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/information-architecture-and-mobile-navigation.md): Restructuring of desktop mega-hubs, app-style mobile bottom navigation, postgraduate master mappings, and wild innovations.
* [`docs/architecture/notion-operational-backplane-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/notion-operational-backplane-plan.md): Specification for enriched Notion databases (`Committee Members`, `Event calendar`, `Updates`), CLI evolution, and non-blocking defensive fallbacks.
* [`docs/architecture/bi-directional-sync-engine-specification.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/bi-directional-sync-engine-specification.md): Two-way sync architecture, institutional email identity resolution, forward/reverse pipelines, and error tolerance.
* [`docs/architecture/hybrid-notion-web-enterprise-specification.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/hybrid-notion-web-enterprise-specification.md): Master business analyst & solution architecture specification detailing the hybrid Notion-Web enterprise architecture, academic ontology, bi-directional sync, Ivy-League benchmarking, and 2027 decennial vision.
* [`docs/architecture/notion-master-operating-system.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/notion-master-operating-system.md): The 9-database Notion master operating system blueprint, mobile carrier design, and edge synchronization engine.
* [`docs/architecture/system-capability-matrix.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/system-capability-matrix.md): Exhaustive platform capability inventory, live routes, data carriers, mobile update guides, and backlog ledger.
* [`docs/architecture/entity-relationship-domain-model.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/entity-relationship-domain-model.md): Comprehensive institutional domain model, ERD, 4-tier profile progression, and Notion ecosystem architecture.
* [`docs/architecture.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture.md): Technical stack, toolchain, styling tokens, and frontend directory overview.
* [`docs/master-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/master-plan.md): Master architecture, Supabase authentication, database schema, and global expansion roadmap.

### Architecture Decision Records (`docs/decisions/`)
* [`docs/decisions/2026-09-24-bi-directional-notion-web-identity-ontology.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/decisions/2026-09-24-bi-directional-notion-web-identity-ontology.md): Architecture Decision Record for the bi-directional Notion-to-Web identity resolution and departmental student society ontology.

### Active Plans & Current Progress (`docs/current_progress/`)
* [`docs/current_progress/web-platform-refactor-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/current_progress/web-platform-refactor-plan.md): 7-phase granular execution roadmap for web refactor, dynamic council rendering, mobile bottom tabs, and bi-directional forms.
* [`docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md): Granular execution roadmap for ERD migrations, Profile Peek Modals, 3 Departmental Society pages, and Notion Hub widgets.

### Infrastructure, Deployment & Environment (`docs/infra/`)
* [`docs/deployment.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/deployment.md): Vercel edge deployment and Cloudflare DNS setup.
* [`docs/environment-setup.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/environment-setup.md): Local developer environment configuration and dependency orchestration.
* [`docs/tooling.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/tooling.md): Development scripts and command-line tools.

---

## 2. Chronological Changelog

### 2026-09-24
* **Modular Architecture Plans**: Formulated dedicated specifications for Information Architecture & Mobile Navigation ([`docs/architecture/information-architecture-and-mobile-navigation.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/information-architecture-and-mobile-navigation.md)), Notion Operational Backplane & Schema Resilience ([`docs/architecture/notion-operational-backplane-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/notion-operational-backplane-plan.md)), Bi-Directional Sync Engine ([`docs/architecture/bi-directional-sync-engine-specification.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/bi-directional-sync-engine-specification.md)), and Web Platform Refactor Plan ([`docs/current_progress/web-platform-refactor-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/current_progress/web-platform-refactor-plan.md)).
* **Live Notion Schema Evolution via CLI**: Upgraded live `Committee Members` database (`2dc3b460dd9e80479654c034a9412f40`) with `Email`, `Department`, `Batch`, `Avatar`, `Bio`, `LinkedIn`, `Priority`, `Term`, `Active` properties; upgraded `Event calendar` database (`2dc3b460dd9e810d87b4c2de080401b5`) with `Category`, `Organizer`, `Description`, `Cover`, `Registration`, `Featured`.
* **SOBA Standard Alignment**: Standardized Society of Business Analytics abbreviation to **SOBA**.
* **Hybrid Enterprise Architecture & ADR**: Formulated [`docs/architecture/hybrid-notion-web-enterprise-specification.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/hybrid-notion-web-enterprise-specification.md) and [`docs/decisions/2026-09-24-bi-directional-notion-web-identity-ontology.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/decisions/2026-09-24-bi-directional-notion-web-identity-ontology.md) aligning academic departments (DS, IM, MOT), specializations (Business Analytics, FSM, BPM), student societies, bi-directional sync, Ivy-League benchmark strategy, and the 2027 Decennial Milestone.
* **Notion Master Operating System & Capability Matrix**: Authored [`docs/architecture/notion-master-operating-system.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/notion-master-operating-system.md) (9-database Notion backplane) and [`docs/architecture/system-capability-matrix.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/system-capability-matrix.md) (exhaustive feature inventory and mobile update guides).
* **Interactive Capability Cockpit**: Built interactive `/capabilities` route with domain filtering, search, and live route tests.
* **Imported Documentation SOP**: Copied and standardized [`docs/docs-sop.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/docs-sop.md) into the repository.
* **Domain Model & ERD Architecture**: Published [`docs/architecture/entity-relationship-domain-model.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/entity-relationship-domain-model.md) defining unified `Person`/`Profile` class, institutional hierarchy (Uni $\rightarrow$ Faculty $\rightarrow$ 3 Departments $\rightarrow$ Union $\rightarrow$ 3 Societies), attribution of all artifacts to `user_id`, 4-tier persona progression, and Notion integrations.
* **Granular Implementation Plan**: Authored [`docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/current_progress/2026-09-24-erd-notion-profiles-implementation-plan.md).
* **Documentation Index**: Created [`docs/INDEX.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/INDEX.md).

### 2026-09-23
* **Migration to Next.js 16 & Supabase Auth**: Configured Supabase GoTrue Auth, OAuth callbacks, database schemas (`public.profiles`, `public.news`, `public.events`), and public delegate profile routing (`/u/[username]`).
* **Design & Theming Engine**: Light/Dark/System theme engine with `@intuitui-labs/editorial` provenance.
