---
title: "Web Platform Refactor & Implementation Execution Plan"
status: "active"
created: 2026-09-24
updated: 2026-09-24
author: "Naveen"
scribe: "Antigravity"
tags: [implementation, plan, frontend, nextjs, navigation, mobile]
---

# Web Platform Refactor & Implementation Execution Plan

## 1. Overview & Phasing Roadmap

This execution plan guides the refactoring of the public web frontend to align with the **BFSU Hybrid Enterprise Architecture**, the **Information Architecture Specification**, and the **Notion Operational Backplane**.

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               PHASED EXECUTION TIMELINE                                │
├──────────────┬───────────────────────────────┬─────────────────────────────────────────┤
│ Phase        │ Target Area                   │ Deliverables                            │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ **Phase 1**  │ Navigation & Layout           │ Restructure Desktop Mega-Hubs +         │
│              │                               │ Mobile Bottom Tab Bar                   │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ **Phase 2**  │ Executive Council (`/about`)  │ Fetch live from Notion `Committee       │
│              │                               │ Members` with defensive fallbacks       │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ **Phase 3**  │ Event Calendar (`/events`)    │ Fetch live from Notion `Event calendar` │
│              │                               │ with categorized chips & countdowns     │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ **Phase 4**  │ Society Hubs (`/societies/*`) │ Dynamic pages for SOBA, FSMSS, MOTSS    │
│              │                               │ with live Notion block rendering        │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ **Phase 5**  │ Academics & Admissions        │ `/admissions/why-fob` hub & outbound    │
│              │                               │ Master's degree links (UoM official)    │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ **Phase 6**  │ Decennial 2027 Milestone      │ 10-Year Anniversary timeline & ticker   │
├──────────────┼───────────────────────────────┼─────────────────────────────────────────┤
│ **Phase 7**  │ Bi-Directional Forms          │ Web-to-Notion submissions (`/contact`)  │
└──────────────┴───────────────────────────────┴─────────────────────────────────────────┘
```

---

## 2. Granular Task Breakdown

### Phase 1: Navigation & Layout Restructure
- [ ] Refactor [`src/components/Navbar.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/components/Navbar.jsx):
  - Group links into 3 Desktop Dropdown Hubs:
    1. *Academics & Faculty* (Degrees, Master's links, Admissions)
    2. *Campus & Student Life* (Union Council, SOBA, FSMSS, MOTSS, Events)
    3. *Community & Impact* (Alumni, Quant Talent, News, Decennial)
  - Add quick action pill for Notion Hub and Capabilities Matrix.
- [ ] Create `src/components/MobileBottomNav.jsx`:
  - Persistent bottom tab bar with 5 destinations: `Home`, `Academics`, `Societies`, `Events`, `Profile`.
  - Floating action sheet for secondary options.
- [ ] Embed `MobileBottomNav` in [`src/app/layout.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/layout.jsx).

### Phase 2: Live Notion Council Integration
- [ ] Enhance `fetchNotionCouncil()` in [`src/lib/notion.js`](file:///c:/Users/Naween/projects/BFSU-web/src/lib/notion.js):
  - Query database `2dc3b460dd9e80479654c034a9412f40`.
  - Parse `Member Name`, `Role`, `Email`, `Department`, `Batch`, `Priority`, `Avatar`, `LinkedIn`, `Bio`.
  - Sort by `Priority` ascending (1=President, 2=VP, etc.).
- [ ] Update [`src/views/AboutUs.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AboutUs.jsx):
  - Replace hardcoded mock names with dynamic council stream.
  - Implement full defensive fallback: if Notion API fails, render cached roster with zero UI degradation.
  - Enable `peekable={true}` on all council avatars linking to `ProfilePeekModal`.

### Phase 3: Live Notion Events Integration
- [ ] Enhance `fetchNotionEvents()` in [`src/lib/notion.js`](file:///c:/Users/Naween/projects/BFSU-web/src/lib/notion.js):
  - Query database `2dc3b460dd9e810d87b4c2de080401b5`.
  - Parse `Name`, `Date`, `Location`, `Category`, `Organizer`, `Description`, `Cover`, `Registration`.
- [ ] Update `src/app/events/page.jsx`:
  - Render upcoming vs past events with live Notion date timestamps.
  - Add filter pills: `All`, `BFSU`, `SOBA`, `FSMSS`, `MOTSS`.

### Phase 4: Dynamic Society Hubs (`/societies/[slug]`)
- [ ] Update [`src/app/societies/[slug]/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/societies/[slug]/page.jsx):
  - Support canonical slugs:
    - `/societies/soba` (Society of Business Analytics)
    - `/societies/fsmss` (FSM Students' Society)
    - `/societies/motss` (MOT Students' Society)
    - Aliases: `/societies/dss` $\rightarrow$ SOBA, `/societies/industrial-management` $\rightarrow$ FSMSS, `/societies/mot` $\rightarrow$ MOTSS.
  - Pull live markdown/blocks from Notion society pages (`30d3b460dd9e81dcb43bcff420397d32`, `30d3b460dd9e81bfa07bf533a61bb294`).

### Phase 5: Academics & Admissions Flagship Hub
- [ ] Create `src/app/admissions/why-fob/page.jsx`:
  - Showcase Sri Lanka's pioneer in Business Analytics.
  - Display national A/L Commerce cutoff benchmarks.
  - Interactive "Which Degree Track Fits You?" diagnostic widget.
  - Outbound verified links to official UoM portal for Master's programs (`MBAn`, `MBA in MOT`, `MSc in Project Management`).

### Phase 6: Decennial 2027 Milestone
- [ ] Create `src/app/10-years/page.jsx` or interactive homepage carousel:
  - 10-year countdown ticker (2017–2027).
  - Milestone timeline showcasing faculty founding, student union achievements, and corporate partnerships.

### Phase 7: Bi-Directional Web-to-Notion Forms
- [ ] Create API route `src/app/api/notion/submit/route.js`:
  - Accepts grievance reports, inquiries, and room reservation requests.
  - Calls Notion Client API to insert rows directly into `Form` or `Union Room` databases.
  - Displays instant toast confirmation to the student.
