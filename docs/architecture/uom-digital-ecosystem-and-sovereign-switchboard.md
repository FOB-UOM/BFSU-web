---
title: "UoM Digital Ecosystem & The Sovereign Switchboard Doctrine"
status: "active"
created: 2026-09-25
updated: 2026-09-25
author: "Naveen"
scribe: "Antigravity"
tags: [architecture, ecosystem, uom-it, moodle, learnorg, microsoft-365, google-workspace, notion, sovereign-switchboard, hexagonal]
---

# UoM Digital Ecosystem & The Sovereign Switchboard Doctrine

## 1. Executive Summary & The Problem of Identity Overlap

In developing the **Faculty of Business Students' Union (BFSU)** web platform, early technical specifications fell into a common higher-education trap: assuming an organization's internal choice of tool (e.g., Notion) should define the public digital interface.

In reality, an undergraduate at the Faculty of Business, University of Moratuwa (UoM) lives across **four concurrent, non-overlapping technological realms**:
1. **Institutional IT (Official & Mandatory)**: Governed by university policy, centered on Microsoft 365, Moodle, and LearnOrg.
2. **Personal Consumer Cloud (Mobile-Native & Frictionless)**: Centered on personal Google accounts (Android/iOS), WhatsApp, and personal OneDrive on laptops.
3. **Committee Operations (Agile & Trend-Dependent)**: Student union and society boards shifting between Notion, Google Sheets, GitHub, and drive shares.
4. **The Sovereign Switchboard (BFSU Web)**: The neutral, un-walled gateway owned by the student body that connects all three realms without locking into any single technology vendor.

This document establishes the official architectural doctrine for how BFSU Web relates to UoM institutional systems, consumer clouds, and collaborative work suites.

---

## 2. Demystifying the UoM Institutional System Matrix

Within the University of Moratuwa, terminology around portals frequently causes confusion even among undergraduates. The table below codifies the institutional system landscape:

| Official Portal Name | Domain / Hostname | Student Slang / Shorthand | Primary Purpose & Authority | Authentication & Identity | Friction Level on Mobile |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Academic Moodle** | `online.uom.lk` | *"Moodle"* | **Daily Academic Learning**: Course materials, lecture slide decks, tutorial submissions, continuous assessments (CAs), forum quizzes. | Centralized UoM LDAP / Active Directory credentials. | **Medium**: Requires desktop browser or Moodle mobile app with periodic re-authentication. |
| **LearnOrg System** | `lms.uom.lk` *(Historically labelled LMS)* | *"LMS"* or *"LearnOrg"* | **Official Records & Administrative Registry**: Semester module registration, add/drop periods, GPA tracking, exam admission cards, official results, password resets. | Centralized UoM LDAP / Active Directory credentials. | **High**: Session-based timeout, desktop-optimized tabular interfaces. |
| **UoM Webmail & MS 365** | `webmail.uom.lk`<br>`portal.office.com` | *"Webmail"* / *"Office 365"* | **Official Communications & Software**: Institutional `@uom.lk` inbox, official notices from Dean/Registrar, licensed MS Office desktop apps, Teams, and institutional OneDrive. | Microsoft Entra ID (Azure AD) via UoM Helpdesk license. | **Medium**: Often requires corporate authenticator/MFA; separated from personal phone inboxes. |
| **CITES IT Portal & Helpdesk** | `uom.lk/cites`<br>`helpdesk.uom.lk` | *"CITES"* / *"Helpdesk"* | **IT Infrastructure**: Wi-Fi onboarding (eduroam), network credentials, specialized software subscription requests. | Centralized UoM Helpdesk credentials. | **Administrative Only**. |
| **Undergraduate Studies Division (UGS)** | `uom.lk/business/undergraduate-studies` | *"UGS Portal"* | **Faculty Administration**: Official semester lecture timetables, exam schedules, academic calendar notices. | Public Web (PDF downloads). | **Low**: PDF downloads, but unindexed. |

> [!IMPORTANT]
> **Moodle (`online.uom.lk`) vs. LMS / LearnOrg (`lms.uom.lk`)**:
> While `lms.uom.lk` carries the acronym "LMS" in its URL, students and faculty use it primarily as **LearnOrg** for enrollment and examination records. Daily active course teaching and assignment submissions occur on **Moodle** (`online.uom.lk`). The BFSU Web directory must explicitly distinguish these two to prevent student misdirection.

---

## 3. The 4-Realm Ecosystem Model

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  REALM 1: INSTITUTIONAL BACKBONE (University of Moratuwa / Official Authority)         │
│  • Moodle (online.uom.lk)          • LearnOrg (lms.uom.lk)                             │
│  • UoM Webmail (webmail.uom.lk)     • Microsoft 365 Student Suite & OneDrive (@uom.lk)  │
│  • CITES Helpdesk (helpdesk.uom.lk) • UGS Timetable Portal                             │
│  ► Authority: Legally binding, grade-granting, official administration.                │
└────────────────────────────────────────────┬───────────────────────────────────────────┘
                                             │
┌────────────────────────────────────────────▼───────────────────────────────────────────┐
│  REALM 2: PERSONAL CONSUMER MOBILE CLOUD (Zero-Friction Student Life)                  │
│  • Personal Google Accounts (Permanent, pre-authenticated on Android & iOS devices)    │
│  • Google Calendar (Personal timetable, reminders, exam alerts on phone lockscreens)   │
│  • WhatsApp Community (Batch groups, club chats, immediate announcement virality)      │
│  • Personal OneDrive / Google Drive (Personal assignment backups and laptop storage)   │
│  ► Authority: Instant student attention, zero login friction, everyday reality.        │
└────────────────────────────────────────────┬───────────────────────────────────────────┘
                                             │
┌────────────────────────────────────────────▼───────────────────────────────────────────┐
│  REALM 3: AGILE COLLABORATIVE SPACES (Student Union & Society Workspaces)              │
│  • Notion Teamspaces (Executive council task boards, relational databases, rich wikis) │
│  • Google Drive & Sheets (Hackathon budgets, registration sheets, raw event photos)   │
│  • GitHub Repositories (Decision Sciences / Business Analytics open-source & code)     │
│  • Future Tooling (Discord, Linear, Airtable, or new platforms adopted by future boards)│
│  ► Authority: Dynamic, committee-driven, subject to annual leadership rotation.        │
└────────────────────────────────────────────┬───────────────────────────────────────────┘
                                             │
┌────────────────────────────────────────────▼───────────────────────────────────────────┐
│  REALM 4: THE SOVEREIGN SWITCHBOARD (BFSU Web Platform)                                │
│  Next.js 15 + Supabase + Hexagonal Ports & Adapters                                    │
│  • Neutral, independent front door owned permanently by the Student Union.             │
│  • Decouples presentation from any single cloud or identity vendor.                    │
│  • Aggregates Realms 1, 2, and 3 into an Ivy-League, zero-friction experience.         │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Multi-Cloud Storage & File Matrix

Students and committees store digital assets across multiple providers depending on friction, capacity, and privacy:

| Cloud Storage Tier | Typical Account | Capacity & Access | Best-Fit Content in BFSU Context |
| :--- | :--- | :--- | :--- |
| **Personal Google Drive** | `*@gmail.com` | Pre-authenticated on smartphones; 15GB free. | Sharing links in WhatsApp, quick collaboration drafts between student pairs. |
| **Institutional MS OneDrive** | `*@uom.lk` | High institutional storage tier (MS 365). | Heavy academic archives, official research datasets, departmental capstones. |
| **Personal MS OneDrive** | `*@outlook.com` | Standard Windows laptop integration. | Personal coursework synced directly from Windows File Explorer. |
| **Notion Internal Workspace** | Teamspace | Relational block database; free/education plan. | Executive council meeting minutes, task roadmaps, structured knowledge indexes. |
| **GitHub Organization** | `github.com/bfsu-uom` | Git version control; unlimited public repos. | Algorithmic code, hackathon starter packs (SOBA / Decision Sciences). |

---

## 5. The Sovereign Switchboard Doctrine (Hexagonal Architecture)

To ensure BFSU Web remains robust against changing vendor relationships (e.g., Notion changing pricing, Google altering smart canvas, or Microsoft modifying campus licensing), the platform adheres to three core design rules:

### Rule 1: The Public Interface is Identity-Agnostic
* Any undergraduate or public visitor can browse circulars, society profiles, academic calendars, and departmental databases **without logging into Microsoft, Google, or Notion**.
* Data is fetched server-side (ISR) and rendered natively in high-speed, responsive HTML/CSS.

### Rule 2: Primary Driving Ports vs. Secondary Driven Adapters
* The application domain defines vendor-neutral models (`Resource`, `Event`, `SocietyHub`, `AcademicLink`).
* Adapters translate external data sources into domain models:
  * `NotionAdapter`: Pulls rich text blocks and database rows.
  * `GoogleCalendarAdapter`: Generates instant RFC-5545 deep-links for personal calendars.
  * `MicrosoftPortalAdapter`: Normalizes links to Moodle (`online.uom.lk`), LearnOrg (`lms.uom.lk`), and Webmail (`webmail.uom.lk`).
  * `LocalResilienceAdapter`: Instant static fallback when any external API is down.

### Rule 3: Mobile Affordance Optimization
* When an event has a date, the platform offers an **"Add to Google Calendar"** action (because students keep personal schedules on their phones).
* When a student wants to share a notice, the platform provides a **1-click WhatsApp share string** (formatted with title, date, and clean canonical link).
* When a student clicks an academic portal, badges clearly signal whether it requires **`UoM Official SSO`** (e.g. Moodle, LearnOrg) or is **`Public Open`** (e.g. PDF timetables).

---

## 6. Implementation Revisions

1. **`src/data/linksData.js`**:
   - Re-label `online.uom.lk` to **"Moodle UoM (Academic LMS)"** with emphasis on daily coursework, lectures, and assignments.
   - Re-label `lms.uom.lk` to **"LearnOrg Portal (Academic Records & Registration)"** with clear focus on enrollments and results.
   - Add **"UoM Webmail & Microsoft 365"** (`webmail.uom.lk`) to provide direct access to institutional email and Office 365 services.
2. **`docs/architecture/system-capability-matrix.md`**:
   - Rename column `"How to Update via Notion Mobile"` to `"Operational Carrier & Workflow"`.
   - Update Domain 4 (Societies) and Domain 8 (Academic Links) to reflect the multi-realm reality.
3. **`NotionHubWidget.jsx` $\rightarrow$ `UniversalCollaborationHub.jsx`**:
   - Evolve the component into a multi-cloud hub displaying Notion, Google Drive, Moodle, and GitHub resources with appropriate icons and badges.
