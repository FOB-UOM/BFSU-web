---
title: "Platform Capability & Feature Inventory Matrix"
status: "active"
created: 2026-09-24
updated: 2026-09-24
author: "Naveen"
scribe: "Antigravity"
tags: [architecture, capabilities, feature-matrix, inventory, roadmap]
---

# Platform Capability & Feature Inventory Matrix

This living matrix serves as the definitive source of truth regarding **what features exist, how they operate, where their code lives, their data carriers, and what remains in the backlog**.

---

## 1. System Inventory Summary

| Domain | Total Features | Live & Functional | In Progress / Hybrid | Backlog / Planned |
| :--- | :---: | :---: | :---: | :---: |
| **1. Governance & Leadership** | 4 | 3 | 1 | 0 |
| **2. Editorial & Circulars** | 4 | 3 | 1 | 0 |
| **3. Traditions & Events** | 4 | 2 | 1 | 1 |
| **4. Departmental Societies** | 4 | 3 | 1 | 0 |
| **5. Student Identity & Profiles** | 5 | 4 | 1 | 0 |
| **6. Alumni & Career Guild** | 4 | 3 | 1 | 0 |
| **7. Welfare & Student Concerns** | 3 | 1 | 1 | 1 |
| **8. Academic & Useful Links** | 3 | 2 | 1 | 0 |
| **9. Platform Engineering** | 3 | 2 | 1 | 0 |

---

## 2. Granular Feature Ledger

### Domain 1: Governance & Executive Leadership
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Elected Union Officials Card** | **LIVE** | `/about#council`<br>[`AboutUs.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AboutUs.jsx) | `NOTION_COUNCIL_DB`<br>(Fallback: `AboutUs.jsx`) | Edit delegate name, role, department, or upload new mobile photo to `Avatar` property. | Connect direct live sync route handler to Notion API. |
| **Committee Representatives Roster** | **LIVE** | `/about#council`<br>[`AboutUs.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AboutUs.jsx) | `NOTION_COUNCIL_DB` | Add committee member name and assign sub-committee tag (`Welfare`, `Finance`, `Media`). | Render avatars and interactive peek modals for representatives. |
| **Historical Presidential Continuity** | **LIVE** | `/about#past-leadership`<br>[`AboutUs.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AboutUs.jsx) | Static Archives | Add historical session row with president, secretary, and key reform initiatives. | Connect to Notion historical database. |
| **Statutory Mandate & Constitution** | **LIVE** | `/about#mandate`<br>[`AboutUs.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AboutUs.jsx) | Static / Notion Links | Upload ratified constitution PDF to Notion files property. | Add searchable PDF viewer modal. |

---

### Domain 2: Editorial, Circulars & News
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Circulars & News Feed** | **LIVE** | `/news`<br>[`news/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/news/page.jsx) | `NOTION_NEWS_DB`<br>Supabase `public.news` | Create page in Notion News DB, set title, label (`Circular`), brief, date, check `Published`. | Wire `@notionhq/client` live feed resolver. |
| **Full Article Reader** | **LIVE** | `/news/[slug]`<br>[`news/[slug]/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/news/%5Bslug%5D/page.jsx) | Notion Page Blocks | Write content directly in Notion using headers, quotes, images, callout blocks. | Rich Notion blocks to React renderer (`notion-to-md`). |
| **Author Attribution to Profile** | **LIVE** | `/news/[slug]` | `profiles(id)` | Select Council author relation in Notion. | Direct link to author's `/u/[username]`. |
| **Official Circular Verification Seal** | **IN PROGRESS** | `/news` | `@intuitui-labs/editorial` | Automated metadata seal attached to executive circulars. | Add digital signature verification tag. |

---

### Domain 3: Traditions, Events & Assemblies
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Events Feed & Traditions** | **LIVE** | `/events`<br>[`events/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/events/page.jsx) | `NOTION_EVENTS_DB`<br>Supabase `public.events` | Add event row in Notion, set date, venue, category, and upload flyer from phone camera. | Connect real-time Notion revalidation webhook. |
| **Event Details & Program Schedule** | **LIVE** | `/events/[slug]`<br>[`events/[slug]/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/events/%5Bslug%5D/page.jsx) | Notion Blocks / Sub-pages | Build event agenda table and rules inside the Notion event page. | Notion table block rendering. |
| **Student RSVP & Attendance Pass** | **HYBRID** | `/events/[slug]` | Supabase `event_registrations` | Check `RegistrationOpen` in Notion to activate RSVP button on portal. | Generate Apple Wallet / Google Wallet pass file. |
| **Event Photo Gallery & Media Vault** | **PLANNED** | `/events/[slug]#gallery` | Cloudflare R2 / Notion Media | Drop event photos into Notion gallery property. | High-speed CDN thumbnail carousel. |

---

### Domain 4: 3 Departmental Student Societies
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Dedicated Society Pages (DSS, BPMSS, IMSS)** | **LIVE** | `/societies/[slug]`<br>[`societies/[slug]/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/societies/%5Bslug%5D/page.jsx) | `NOTION_SOCIETIES_DB`<br>[`societiesData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/societiesData.js) | Maintained via Notion database or resilient local config in `societiesData.js`. | Connect live multi-provider feed. |
| **Multi-Cloud Collaboration Hub & Knowledge Desk** | **LIVE** | `/societies/[slug]`<br>[`NotionHubWidget.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/components/NotionHubWidget.jsx) | Multi-Cloud Hub (Google Drive, Notion, GitHub) | Societies link their active workspaces (Google Drive for datasets/photos, Notion for wiki/tasks, GitHub for code). | Evolve to `UniversalCollaborationHub.jsx`. |
| **Peekable Society Executive Avatars** | **LIVE** | `/societies/[slug]` | [`UserAvatar.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/components/UserAvatar.jsx)<br>[`ProfilePeekModal.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/components/ProfilePeekModal.jsx) | Clicking any society official triggers instant profile peek. | Complete — fully responsive. |
| **Departmental Society Cross-Navigation** | **LIVE** | `/about#departments`<br>[`AboutUs.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AboutUs.jsx) | Static Routes | Links between DS, MOT, and IM portals and society pages. | Complete. |

---

### Domain 5: Student Identity & The 4-Tier Public Persona
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Tier 1: Micro / Inline Avatar** | **LIVE** | Across all cards & feeds<br>[`UserAvatar.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/components/UserAvatar.jsx) | Supabase `profiles`<br>Notion Avatars | Resilient fallback proxy, initials, verified badges. | Complete. |
| **Tier 2: Profile Peek Modal** | **LIVE** | Global overlay<br>[`ProfilePeekModal.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/components/ProfilePeekModal.jsx) | Global [`ProfilePeekContext`](file:///c:/Users/Naween/projects/BFSU-web/src/context/ProfilePeekContext.jsx) | Instant preview modal showing name, batch, department, role, social links, and bio. | Complete. |
| **Tier 3: Full Canonical Public Profile** | **LIVE** | `/u/[username]`<br>[`u/[username]/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/u/%5Busername%5D/page.jsx) | Supabase `profiles`, `career_history`, `student_projects` | Self-managed via `/profile` or verified Council roster. | Connect authored circulars list. |
| **Tier 4: Personal External Portfolio** | **LIVE** | `/u/[username]`<br>[`u/[username]/page.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/app/u/%5Busername%5D/page.jsx) | Supabase `portfolio_url` | Add personal portfolio link in profile settings. | Embedded interactive portfolio preview iframe. |
| **Cryptographic QR Delegate Pass** | **LIVE** | `/u/[username]` | Client-side QR SVG (`qrcode.react`) | Scannable institutional identity card pass. | Offline digital wallet export. |

---

### Domain 6: Alumni & Career Guild
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Alumni Directory & Search** | **LIVE** | `/alumni`<br>[`AlumniPage.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AlumniPage.jsx) | Supabase `profiles` where `role = 'alumni'` | Direct student/alumni registration or verified admin invite. | Connect Notion alumni mentor database. |
| **Batch & Department Directory Filters** | **LIVE** | `/alumni`<br>[`AlumniPage.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AlumniPage.jsx) | Client-side state | Filter delegates by Batch '18, '19, '20, '21, '22 and 3 Departments. | Complete. |
| **Peekable Alumni Cards & Direct Profiles** | **LIVE** | `/alumni`<br>[`AlumniPage.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AlumniPage.jsx) | [`ProfilePeekModal.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/components/ProfilePeekModal.jsx) | Click "Peek" for quick modal or "Profile" for canonical public page. | Complete. |
| **Peer Batch Outreach / Invite Generator** | **LIVE** | `/alumni`<br>[`AlumniPage.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/AlumniPage.jsx) | Client-side Generator | Generate personalized WhatsApp/LinkedIn invitation messages with custom links. | Short URL generator. |

---

### Domain 7: Student Welfare & Facility Concerns
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Anonymous Student Welfare Tracker** | **HYBRID** | `/about#union-notion`<br>[Notion Welfare Desk](https://notion.so/bfsu-uom/welfare-desk) | `NOTION_WELFARE_DB` | Student executive logs welfare ticket, updates resolution status in Notion. | Direct public ticket submission form on portal. |
| **Canteen Subsidy & Lab 111 Tracker** | **HYBRID** | `/about#union-notion` | `NOTION_WELFARE_DB` | Record facility issues and track administration correspondence. | Dedicated public status board component. |
| **Emergency Welfare Contacts Bar** | **PLANNED** | `/welfare` | Static / Notion | Maintain hospital, student counselor, and proctor hotline numbers. | Add dedicated `/welfare` view. |

---

### Domain 8: Academic Resources & Useful Links
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Faculty Academic Portals (Moodle, LearnOrg, Webmail)** | **LIVE** | `/links`<br>[`UsefulLinksPage.jsx`](file:///c:/Users/Naween/projects/BFSU-web/src/views/UsefulLinksPage.jsx) | [`linksData.js`](file:///c:/Users/Naween/projects/BFSU-web/src/data/linksData.js)<br>Optional Notion DB | Distinguishes Moodle (`online.uom.lk` for coursework), LearnOrg (`lms.uom.lk` for records/reg), and Webmail (`webmail.uom.lk`). | Add quick status indicators. |
| **Faculty Departments Overview** | **LIVE** | `/links`, `/about` | Static / Notion | Department links and descriptions. | Complete. |
| **Official Downloads & Bylaws Vault** | **IN PROGRESS** | `/links` | Multi-Cloud (Drive / MS OneDrive / Notion) | Upload ratified union bylaws, forms, letters to Drive, OneDrive, or Notion. | One-click direct PDF downloads. |

---

### Domain 9: Platform Engineering & Documentation
| Feature | Status | Live Route / Component | Primary Carrier | Operational Carrier & Workflow | Gaps / Next Steps |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **Web Platform Maintainer Recognition** | **LIVE** | `/u/[username]`, `/about`<br>Supabase `web_maintainers` | Supabase / Notion Maintainers | Assign maintainer credits in database. | Maintainer Hall of Fame section. |
| **Polymath Platform Documentation SOP** | **LIVE** | [`docs/docs-sop.md`](file:///c:/Users/Naween/projects/BFSU-web/docs/docs-sop.md) | Markdown SOP | Standardized folder structure and naming convention. | Complete. |
| **Interactive Capability & Feature Matrix** | **IN PROGRESS** | `/capabilities` / HUD | React Component / Docs | Interactive visual matrix of what exists vs what is missing. | Build `/capabilities` page and HUD drawer. |
