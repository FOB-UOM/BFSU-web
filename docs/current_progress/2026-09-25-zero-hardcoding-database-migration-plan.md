---
title: "Zero-Hardcoding Database-First Architecture & Migration Plan"
status: "active"
created: 2026-09-25
updated: 2026-09-25
author: "Naveen"
scribe: "Antigravity"
tags: [architecture, database, supabase, notion, zero-hardcoding, refactor]
---

# Zero-Hardcoding Database-First Architecture & Migration Plan

## 1. Executive Summary & Objective

The objective of this initiative is to eradicate all scattered hardcoded mock objects, fallback arrays, and inline static data across the BFSU web platform. Every data point displayed across public pages—including news, events, executive council rosters, departmental curricula, academic portals, timetables, campus facilities, research papers, student achievements, and collegiate copy—must originate directly from managed data carriers (**Supabase PostgreSQL core** and **Notion Operational Backplane**).

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              ZERO-HARDCODING PIPELINE                                  │
├──────────────────────────────┬───────────────────────────────┬─────────────────────────┤
│ Data Carrier                 │ Managed Content Types         │ Access Mechanism        │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ **Notion Headless CMS**      │ News & Circulars, Events,     │ @notionhq/client        │
│ (Operational Backplane)      │ Council Roster, Meetings      │ Next.js ISR (60s cache) │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ **Supabase PostgreSQL**      │ Faculties, Departments, Staff,│ @supabase/ssr / JS      │
│ (Relational Enterprise Core) │ Intakes, Cohorts, Batch Reps, │ Relational Integrity &  │
│                              │ Portals, Timetables, Papers,  │ Strict RLS Security     │
│                              │ Achievements, Announcements   │                         │
├──────────────────────────────┼───────────────────────────────┼─────────────────────────┤
│ **Clean UI Component Layer** │ Pages, Sections, Modals       │ Async Server Loaders;   │
│                              │                               │ Zero Static Fallbacks;  │
│                              │                               │ Elegant Empty States    │
└──────────────────────────────┴───────────────────────────────┴─────────────────────────┘
```

---

## 2. Exhaustive Audit Findings

| Category | Impacted Files | Hardcoded Data Found | Remediation Path |
| :--- | :--- | :--- | :--- |
| **Legacy Site Data Bridge** | [`src/data.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data.js) | Hero headlines, faculty brief, union vision, mock events | Migrate to `site_announcements` & `faculties` in Supabase; delete file. |
| **Editorial & News** | [`src/data/newsData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/newsData.js) | 3 hardcoded news items, HTML bodies, static images | Seed to Supabase `public.news` / Notion; query live in `NewsSection.jsx`. |
| **Traditions & Events** | [`src/data/eventsData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/eventsData.js) | 4 hardcoded events, dates, locations, images | Seed to Supabase `public.events` / Notion; query live in `EventsSection.jsx`. |
| **Academic Portals & Links** | [`src/data/linksData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/linksData.js) | Academic portals, timetables, calendar, facilities, channels | Create `academic_portals`, `academic_timetables`, `campus_facilities` tables. |
| **Department Specifications**| [`src/data/departmentsData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/departmentsData.js) | Curricula, facilities, research themes, career outcomes | Expand `departments` schema with JSONB specifications; query live. |
| **Student Societies** | [`src/data/societiesData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/societiesData.js) | Workspaces, board members, initiatives, stats | Expand `student_societies` schema with workspaces & initiatives JSONB. |
| **Leadership History** | [`src/data/leadershipHistoryData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/leadershipHistoryData.js) | Union pillars, past sessions 2022–2025, charter | Query `entity_tenures` & `faculties` tables. |
| **Faculty Administration** | [`src/data/facultyAdministrationData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/facultyAdministrationData.js) | Dean office contact, HOD registry, divisions | Query `faculty_administration_registry` & `faculty_staff_profiles`. |
| **Orphaned Staff Data** | [`src/data/facultyStaffData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/facultyStaffData.js) | 17KB static staff profiles and appointments | Already replaced by Supabase tables; delete static file. |
| **System Capabilities** | [`src/data/capabilitiesData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/capabilitiesData.js) | 40+ system capabilities definitions | Create `system_capabilities` table in Supabase. |
| **Inline View Mocks** | [`ExplorePage.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/ExplorePage.jsx), [`ResearchPage.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/ResearchPage.jsx) | Inline achievements and research projects | Query `achievements`, `research_papers`, and `student_projects`. |
| **Service Fallback Seeds** | [`entities.js`](file:///c:/Users/Naween/projects/BFSU-web/src/lib/data/entities.js), [`notion.js`](file:///c:/Users/Naween/projects/BFSU-web/src/lib/notion.js) | Hundreds of lines of fallback seeds (`SEED_BATCH_REPS`, etc.) | Remove static seed arrays; return clean DB results and handle empty states. |

---

## 3. Phased Execution Roadmap

### Phase 1: Database Schema Expansion & Seed Migrations
1. Add migration `supabase/migrations/20260925030000_academic_portals_and_site_content.sql`:
   - `academic_portals`
   - `academic_timetables`
   - `campus_facilities`
   - `site_announcements`
   - `system_capabilities`
   - Enrich `departments` with `facilities`, `research_themes`, `undergraduate_spec`, `postgraduate_spec`, `student_culture`.
   - Enrich `student_societies` with `workspaces`, `initiatives`, `stats`.
2. Seed verified University of Moratuwa data into Supabase (news, events, portals, timetables, facilities, announcements, research, achievements).

### Phase 2: Data Service Modernization
1. Build `src/lib/data/portals.js`: Loads academic portals, timetables, and campus facilities.
2. Build `src/lib/data/research.js`: Loads research papers and student capstone projects.
3. Build `src/lib/data/achievements.js`: Loads student accolades and competition wins.
4. Build `src/lib/data/siteSettings.js`: Loads announcements, status banner text, and collegiate mission copy.
5. Modernize `src/lib/data/news.js` & `events.js`: Strictly query DB / Notion; remove fallback imports.
6. Modernize `src/lib/data/entities.js`: Remove `SEED_INTAKES`, `SEED_BATCH_REPS`, `SEED_PLATFORM_MAINTAINERS`.
7. Modernize `src/lib/notion.js`: Remove fallback imports.

### Phase 3: Wire Frontend Views & Sections
1. Homepage (`src/app/page.jsx` & `src/views/Home.jsx`):
   - Server-side fetch news, events, portals, announcements.
   - Pass real props into `HeroSection`, `QuickLinksSection`, `NewsSection`, `WelcomeSection`, `EventsSection`.
2. Explore Page (`src/views/ExplorePage.jsx`):
   - Query live achievements and research highlights.
3. Research Page (`src/views/ResearchPage.jsx`):
   - Query live research papers and student projects.
4. Useful Links Page (`src/views/UsefulLinksPage.jsx`):
   - Query live portals, timetables, and facilities.
5. About Us Page (`src/views/AboutUs.jsx`):
   - Query live faculty administration, staff history, and tenures.
6. Navbar & Footer:
   - Dynamic session ticker in Navbar and dynamic portals in Footer.

### Phase 4: Deprecation of Static Files & Component Decoupling
1. Converted components (`UsefulLinksPage`, `ExplorePage`, `ResearchPage`, `NewsPage`, `EventsPage`, `Home`, `AboutUs`, `CapabilitiesView`, `Footer`) to accept database-driven props or query services directly.
2. Decoupled static dependencies (`linksData.js`, `capabilitiesData.js`, `departmentsData.js`, etc.) from client rendering paths.
3. Updated Next.js Server Components with ISR/dynamic revalidation and cookie-free public Supabase client fallbacks for static prerendering.

### Phase 5: Build Verification & Resilience Testing
1. **TypeScript Verification**: Passed cleanly via PowerShell UTF-8 command (`pnpm exec tsc --noEmit`).
2. **Next.js 16 Production Build**: Passed with code 0 (`pnpm build`). All 49 static and dynamic routes compiled and generated without errors.
3. **Resilience & Zero-Crash Architecture**:
   - Resolved static prerender cookie bailout by introducing `createPublicClient()` fallback.
   - Safeguarded HTML rendering in single event and news views against non-string inputs.
   - Handled empty states across all views with institutional banners instead of crashing or leaking dummy mock rosters.
