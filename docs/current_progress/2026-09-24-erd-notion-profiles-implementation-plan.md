---
title: "Granular Implementation Plan: Unified ERD, Notion Integrations, Societies & 4-Tier Public Profiles"
status: "active"
created: 2026-09-24
updated: 2026-09-24
author: "Naveen"
scribe: "Antigravity"
tags: [implementation, supabase, erd, notion, societies, profile-peek, nextjs]
---

# Granular Implementation Plan: Unified ERD, Notion Integrations, Societies & 4-Tier Public Profiles

## 1. Overview & Objectives

This implementation plan details the tactical execution steps to realize the **Unified Institutional Domain Model** specified in [`/docs/architecture/entity-relationship-domain-model.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/architecture/entity-relationship-domain-model.md).

### Core Deliverables:
1. **Database Schema Migration (`20260924000000_institutional_entities_and_societies.sql`)**:
   - `departments` master table.
   - `student_societies` master table (3 departmental societies).
   - `institutional_roles` linking users to union, societies, editorial, or web maintainers.
   - `web_maintainers` honoring student developers and architects.
   - Foreign key bindings on `events` and `news` to `profiles(id)` and `student_societies(id)`.
2. **Interactive 4-Tier Profile System**:
   - **Tier 1**: Resilient `UserAvatar.jsx` with peek-trigger capability.
   - **Tier 2**: `ProfilePeekModal.jsx` — instant lightweight popover/modal to peek into any user's profile from an avatar, card, or mention.
   - **Tier 3**: Canonical `/u/[username]` public profile page, integrating institutional roles, society affiliations, authored items, organized events, and web maintainer badges.
   - **Tier 4**: Optional portfolio showcase integration on profile pages.
3. **Dedicated Departmental Student Society Pages (`/societies/[slug]`)**:
   - Pages for Decision Sciences Society (`decision-sciences`), Management of Technology Society (`mot`), and Industrial Management Society (`industrial-management`).
   - Integrated Notion Hub widget for each society.
   - Society leadership board with interactive peek modals.
4. **Union & Society Notion Hub Connector**:
   - Official Notion workspace links, embedded public resource databases, and operational hub references.

---

## 2. Phase-by-Phase Execution Roadmap

```text
Phase 1: Database & Relational Modeling (Supabase SQL)
  ├── 1.1 Create migration 20260924000000_institutional_entities_and_societies.sql
  ├── 1.2 Seed departments (DS, MOT, IM)
  ├── 1.3 Seed 3 student societies with Notion URLs & descriptions
  └── 1.4 Establish RLS policies and indexes

Phase 2: Tier 1 & Tier 2 Persona Components
  ├── 2.1 Build ProfilePeekModal.jsx (Overlay / Popover with quick stats & actions)
  ├── 2.2 Wire UserAvatar.jsx to optionally trigger ProfilePeekModal
  └── 2.3 Provide ProfilePeekProvider or direct modal invocation hook

Phase 3: 3 Departmental Society Pages & Notion Integration
  ├── 3.1 Create society configuration & mock fallback dataset in src/data/societiesData.js
  ├── 3.2 Build dynamic Next.js App Router route: src/app/societies/[slug]/page.jsx
  ├── 3.3 Implement NotionHubWidget.jsx with resource cards, embed view, & external launch
  └── 3.4 Update Navbar / Explore navigation to link to departmental societies

Phase 4: Tier 3 & Tier 4 Public Profile Enrichment (/u/[username])
  ├── 4.1 Update src/app/u/[username]/page.jsx to fetch institutional roles & society posts
  ├── 4.2 Add Web Platform Maintainer badge and credits
  ├── 4.3 Add Personal Portfolio showcase / external link section
  └── 4.4 Test profile peek-to-full transition

Phase 5: Quality Assurance & Docs Verification
  ├── 5.1 Run TypeScript/JSX diagnostics
  ├── 5.2 Validate responsive views (desktop & mobile)
  └── 5.3 Update docs/INDEX.md to track new docs
```

---

## 3. Detailed Technical Specifications

### Phase 1: Database Schema & Migration

File: `supabase/migrations/20260924000000_institutional_entities_and_societies.sql`

```sql
-- 1. Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- 'DS', 'MOT', 'IM'
    name TEXT NOT NULL,
    focus_summary TEXT NOT NULL,
    portal_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Student Societies Table
CREATE TABLE IF NOT EXISTS public.student_societies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    code TEXT UNIQUE NOT NULL, -- 'DSS', 'MOTSS', 'IMSS'
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- 'decision-sciences', 'mot', 'industrial-management'
    description TEXT NOT NULL,
    notion_workspace_url TEXT,
    notion_database_id TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Institutional Roles (Union, Societies, Editorial, Web Dev)
CREATE TABLE IF NOT EXISTS public.institutional_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_type TEXT NOT NULL, -- 'union', 'society', 'editorial', 'web_team'
    society_id UUID REFERENCES public.student_societies(id) ON DELETE CASCADE,
    role_title TEXT NOT NULL, -- 'President', 'Secretary', 'Vice President', etc.
    term_year TEXT NOT NULL, -- '2025/2026'
    is_current BOOLEAN DEFAULT true NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Web Maintainers & Engineering Contributors
CREATE TABLE IF NOT EXISTS public.web_maintainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'Lead Platform Architect', 'Frontend Engineer', etc.
    contribution_summary TEXT,
    active_term TEXT NOT NULL, -- '2025 - Present'
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
```

### Phase 2: Tier 2 Profile Peek Modal Specification

Component: `src/components/ProfilePeekModal.jsx`
* **Trigger**: Click or tap on any `UserAvatar` or author/organizer/alumni card with `peekable={true}`.
* **Layout**:
  - Modal overlay with frosted backdrop blur (`backdrop-blur-md bg-black/60`).
  - High-impact identity header with banner gradient, `UserAvatar` (lg), verified checkmark, and student/alumni status badge.
  - Academic metadata: Faculty of Business, Department tag, Batch indicator.
  - Institutional positions: Union Council badges, Society Executive badges, or Web Maintainer recognition.
  - Bio / Headline snippet.
  - Social quick links (LinkedIn, GitHub, Portfolio).
  - Primary CTA: `"View Full Public Profile"` linking to `/u/[username]`.

### Phase 3: Departmental Societies & Notion Hub Specification

Route: `src/app/societies/[slug]/page.jsx`
Data Source: `src/data/societiesData.js` (with live Supabase fallback)
* **Societies Covered**:
  1. **Decision Sciences Society (DSS)** (`/societies/decision-sciences`)
     - Dept: Department of Decision Sciences
     - Focus: Operations Research, Big Data & Business Analytics
     - Notion Hub: Collaborative data science projects & event planning
  2. **Management of Technology Student Society (MOTSS)** (`/societies/mot`)
     - Dept: Department of Management of Technology
     - Focus: Technology Strategy, Enterprise Architecture & Innovation
     - Notion Hub: Industry tech visits, corporate connections & workshops
  3. **Industrial Management Student Society (IMSS)** (`/societies/industrial-management`)
     - Dept: Department of Industrial Management
     - Focus: Financial Services, Econometrics & Supply Chain Management
     - Notion Hub: Quant finance workshops & mentorship clinics
* **Notion Hub Widget (`src/components/NotionHubWidget.jsx`)**:
  - Verified badge with Notion icon.
  - Direct deep link to the Notion workspace.
  - Embedded resource cards (e.g. "Meeting Minutes & Agendas", "Event Task Boards", "Academic Study Materials").

### Phase 4: Full Public Profile (`/u/[username]`) Enhancement

File: `src/app/u/[username]/page.jsx`
* Enrich with:
  - **Affiliations section**: Displays Union council post or Society board roles.
  - **Web Maintainer badge**: Highlighted recognition if the student contributes to the portal.
  - **Authored items**: Circulars and articles written by the user.
  - **Portfolio Showcase**: Interactive card or button displaying their personal portfolio website with preview.

---

## 4. Verification & Testing Checklist

- [ ] Supabase migration script runs without syntax errors.
- [ ] `UserAvatar` displays fallback safely and triggers peek modal on click when configured.
- [ ] `ProfilePeekModal` renders smoothly with no hydration mismatch or layout shifts.
- [ ] Navigation from Peek Modal to `/u/[username]` works cleanly.
- [ ] `/societies/[slug]` renders the correct society details, department link, and Notion Hub widget.
- [ ] Responsive testing across mobile and desktop breakpoints.
- [ ] Documentation updated in `docs/INDEX.md`.
