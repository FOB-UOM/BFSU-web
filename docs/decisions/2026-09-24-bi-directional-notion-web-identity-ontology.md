---
title: "ADR: Bi-Directional Notion-to-Web Identity and Departmental Ontology"
status: "active"
created: 2026-09-24
updated: 2026-09-24
author: "Naveen"
scribe: "Antigravity"
tags: [adr, ontology, notion, identity, sync, supabase]
---

# ADR: Bi-Directional Notion-to-Web Identity and Departmental Ontology

## Context
The Faculty of Business Students' Union (BFSU) at the University of Moratuwa operates both an active public web application (Next.js 15 + Supabase) and a rich Notion workspace (`Students' Union - FOB @ UOM`). 

Prior to this decision:
1. Executive council members and events were statically hardcoded in JavaScript view components with mock data.
2. Departmental societies were misaligned in name and scope.
3. Notion was treated purely as an internal notebook rather than an operational headless CMS ("mobile carrier").
4. No clear protocol existed for mapping students between their Supabase authentication accounts and their Notion committee/people records.

## Decision

### 1. Academic & Student Society Ontology
We formally adopt the three-pillar academic and student body ontology:
- **Decision Sciences (DS)** $\leftrightarrow$ **Business Analytics** $\leftrightarrow$ **Society of Business Analytics (SOBA)** (`30d3b460dd9e81dcb43bcff420397d32`)
- **Industrial Management (IM)** $\leftrightarrow$ **Financial Services Management (FSM)** $\leftrightarrow$ **FSM Students' Society (FSMSS)** (`30d3b460dd9e81bfa07bf533a61bb294`)
- **Management of Technology (MOT)** $\leftrightarrow$ **Business Process Management (BPM)** $\leftrightarrow$ **MOT Students' Society (BPMSS)**

### 2. Universal Identity Resolution
The canonical master key connecting Supabase `profiles` with Notion `Committee Members` and `People` records is the student's institutional email (`[username].[batch]@uom.lk`).
- Council memberships and society roles are managed by student leaders in Notion.
- The web application queries Notion via cached Next.js ISR (Incremental Static Regeneration).
- When a council member's email matches a registered Supabase profile, the web automatically links their 4-tier profile progression (Micro Avatar $\rightarrow$ Peek Modal $\rightarrow$ Canonical Profile $\rightarrow$ Personal Portfolio Showcase).

### 3. Bi-Directional Synchronization Flow
- **Notion $\rightarrow$ Web (Operational Content)**:
  - Council rosters (`Committee Members`)
  - Event calendars (`Event calendar`)
  - News and announcements (`Updates`)
  - Society documentation & resources
- **Web $\rightarrow$ Notion (Transactional Submissions)**:
  - Student grievance and inquiry forms (`Form`)
  - Room reservation requests (`Union Room`)
  - Verified student profile discovery opt-ins (`People`)

### 4. Data Security Boundary
Confidential internal operations (treasury financial sheets, executive meeting minutes, internal to-dos) remain strictly bounded inside Notion and are never exposed via public API endpoints.

## Consequences

### Positive
- Zero-friction editorial velocity: Non-technical student council executives can update event dates, publish announcements, or edit their profiles in Notion without touching code or opening pull requests.
- No stale mock data: Council rosters and event calendars are pulled live from the official workspace.
- Preserves enterprise web performance: Next.js ISR caches Notion API responses, ensuring sub-second page loads without hitting Notion rate limits.

### Negative / Trade-offs
- Notion S3 file URLs for attachments and headshots expire after 1 hour. We mitigate this using image proxying (`images.weserv.nl`) or server-side edge caching.
- Network dependencies: Requires robust error-fallback handling in `src/lib/notion.js` to ensure the site gracefully falls back to cached data if the Notion API is temporarily unreachable.
