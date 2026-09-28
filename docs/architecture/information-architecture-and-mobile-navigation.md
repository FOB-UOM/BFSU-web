---
title: "Information Architecture, Navigation Taxonomy & Platform Innovation Specification"
status: "active"
created: 2026-09-24
updated: 2026-09-24
author: "Naveen"
scribe: "Antigravity"
tags: [information-architecture, navigation, mega-menus, mobile-ux, degrees, postgraduate, uom, bfsu]
---

# Information Architecture, Navigation Taxonomy & Platform Innovation Specification

## 1. Core Taxonomy: The 3-Pillar Model

The information architecture (IA) for the **Faculty of Business Students' Union (BFSU)** digital platform unifies institutional governance, academic specializations, time-sensitive activities, and community life into **3 primary content pillars** and a dedicated **user action portal**:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 3-PILLAR TAXONOMY                                  │
├─────────────────────────┬──────────────────────────────┬───────────────────────────────┤
│ 1. ABOUT                │ 2. HAPPENINGS (Pulse)        │ 3. PEOPLE & LIFE              │
│ (Identity & Structure)  │ (Time-Sensitive Activity)    │ (Humans, Culture & Memories)  │
├─────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ "Who are we? What do    │ "What is going on right now? │ "Who belongs here? How do we  │
│  we teach, and how are  │  What just happened? What    │  live, celebrate, and where   │
│  we structured?"        │  should I attend?"           │  did our graduates go?"       │
└─────────────────────────┴──────────────────────────────┴───────────────────────────────┘
```

---

## 2. Desktop Navigation Architecture (Mega-Hub System)

On desktop viewports, the navigation header displays 3 structured mega-dropdowns, an instant search palette, and an identity/portal cockpit:

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [BFSU LOGO]      1. About ▾        2. Happenings ▾        3. People & Life ▾     [Cmd+K] [Notion] [👤] │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Pillar 1: `About ▾` (Identity & Academic Structure)

#### A. The Faculty & Milestone
* **Faculty of Business Overview**: History, leadership, dean's office, and faculty vision.
* **Why FOB (Admissions Engine)**:
  - Pioneer of Business Analytics in Sri Lanka.
  - Destination for top G.C.E. Advanced Level Commerce rankers nationwide (highest national Z-score cutoffs).
  - Fusion of Moratuwa engineering analytical rigor with strategic executive management.
* **2027 Decennial Celebration (10 Years)**: Marking a decade (2017–2027) of transformative business analytics and management education.
* **Academic Departments**:
  - *Department of Decision Sciences (DS)*
  - *Department of Industrial Management (IM)*
  - *Department of Management of Technology (MOT)*

#### B. Degree Programs & Specializations
* **Undergraduate Honors Degrees (Bachelor of Business Science - BBSc Hons)**:
  - **Business Analytics (BBSc Hons)** *(Dept. of Decision Sciences)*: Predictive modeling, machine learning, optimization, statistical computing with Python/R, operations research.
  - **Financial Services Management - FSM (BBSc Hons)** *(Dept. of Industrial Management)*: Quantitative finance, fintech, algorithmic trading, financial econometrics, risk engineering.
  - **Business Process Management - BPM (BBSc Hons)** *(Dept. of Management of Technology)*: Enterprise systems (ERP/SAP), technology innovation & entrepreneurship, digital transformation, supply chain management.
* **Postgraduate & Master's Programs (Verified Outbound Links to Official UoM)**:
  - **Master of Business Analytics (MBAn)** $\rightarrow$ [`https://uom.lk/fob/decision-sciences`](https://uom.lk/fob/decision-sciences)
  - **MBA in Management of Technology (MBA in MOT)** $\rightarrow$ [`https://uom.lk/fob/management-of-technology`](https://uom.lk/fob/management-of-technology)
  - **MBA in Supply Chain Management** $\rightarrow$ [`https://uom.lk/fob/management-of-technology`](https://uom.lk/fob/management-of-technology)
  - **MSc in Project Management** $\rightarrow$ [`https://uom.lk/fob/industrial-management`](https://uom.lk/fob/industrial-management)

#### C. Student Governance & Departmental Societies
* **Students' Union (BFSU)**: Elected Executive Council (live dynamic stream from Notion `Committee Members`), union constitution, executive committees.
* **Departmental Student Societies**:
  - **SOBA** — Society of Business Analytics (live from Notion `30d3b460dd9e81dcb43bcff420397d32`).
  - **FSMSS** — FSM Students' Society (live from Notion `30d3b460dd9e81bfa07bf533a61bb294`).
  - **BPMSS** — Business Process Management Students' Society.
* **Platform Capability Matrix**: System feature audit, data carriers, and capability inventory (`/capabilities`).

---

### Pillar 2: `Happenings ▾` (The Temporal Pulse)

#### A. Events & Calendar
* **Upcoming Events**: Live synchronization from Notion `Event calendar` (`2dc3b460dd9e810d87b4c2de080401b5`).
* **Academic Milestones**: Semester orientations (e.g. Batch 25 Orientation), lecture commencements, examination schedules.
* **Traditions & Social Events**: Movie nights, cricket encounters, speaker series, and meet-and-greets.
* **Past Events Archive**: Photographic records, event summaries, and attendance records.

#### B. News & Announcements
* **Official Faculty News**: Press releases, institutional announcements, and academic updates.
* **Union Updates**: Dynamic feed from Notion `Updates` (`2dc3b460dd9e80f69fb6f4f3d60426eb`).
* **Notices & Circulars**: Examination schedules, registry circulars, and union memos.

#### C. Achievements & Accolades
* **National Hackathons & Competitions**: Triumphs in business analytics, case competitions, and data challenges.
* **Undergraduate Hall of Fame**: Outstanding academic and extracurricular performers.
* **Dean's List**: Faculty-wide recognition of semester GPA leadership.

---

### Pillar 3: `People & Life ▾` (Humans, Culture & Memories)

#### A. Current Undergraduates
* **Student Directory**: Roster organized by academic batch (Batch 21, Batch 22, Batch 23, Batch 24, Batch 25) and departmental specialization.
* **Batch Representatives**: Elected batch liaisons and student advocates.
* **"Moratuwa Quant" Verified Talent Showcase**: Publicly searchable directory for corporate recruiters (LSEG, John Keells, Dialog, WSO2, Big 4, top tier banks) with verified skills (Python, R, Machine Learning, PowerBI, SQL, Financial Modeling).

#### B. Alumni Network
* **Global Alumni Map**: Tracking graduates across Silicon Valley, London, Singapore, Australia, and Colombo.
* **Career Trajectories**: Leadership placements in quantitative finance, machine learning engineering, enterprise consulting, and management.
* **Mentorship & Fellowships**: Senior alumni guiding undergraduates on internships and research.

#### C. Student Life, Memories & Campus Hub
* **Campus Moments Gallery**: Rich photographic archives of faculty traditions, cultural nights, sports fixtures, and batch trips (e.g. Hanthana trip).
* **Union Room**: Live room beacon status (Active / In Session / Open), facilities, and booking inquiries.
* **Student Support & Ombudsman**: Anonymous grievance reporting forms and academic appeals.

---

## 3. Top-Bar Utility & Identity Controls

1. **Spotlight Command Palette (`Cmd + K`)**:
   - Universal search dialog allowing instant keyboard jumps across:
     - Council Members (e.g. "Yasitha", "Naveen", "Kosala")
     - Degree Tracks (e.g. "Business Analytics", "FSM", "MBAn")
     - Events (e.g. "Orientation Batch 25", "Uni Starts")
     - Societies ("SOBA", "FSMSS", "BPMSS")
     - System Capabilities (`/capabilities`)
2. **Notion Direct Carrier Pill**:
   - Live workspace connection badge: *"Connected to Notion: Students' Union - FOB @ UOM"*.
   - Direct shortcut into the operational workspace for authorized student leaders.
3. **User Profile / Portal Login**:
   - Authenticated state: Displays micro-avatar, member name, and role badge (`peekable={true}`).
   - Unauthenticated state: "Portal Login" button triggering Google SSO via `@uom.lk`.

---

## 4. Mobile Navigation: App-Style Persistent Bottom Bar

For mobile devices, navigation is grounded in a **5-Tab Persistent Bottom Navigation Bar** in the ergonomic thumb zone, paired with segmented sub-view toggle chips:

```text
┌────────────────────────────────────────────────────────┐
│ [BFSU Logo]                       [Search]  [Menu ☰]   │  <- Mobile Top Utility Bar
├────────────────────────────────────────────────────────┤
│                                                        │
│                    PAGE VIEWPORT                       │
│                                                        │
├────────────────────────────────────────────────────────┤
│   [⌂]        [🏛️]         [⚡]        [👥]       [👤]   │  <- Bottom Tab Bar
│   Home      About      Happenings    People    Profile │
└────────────────────────────────────────────────────────┘
```

### Segmented Sub-View Toggles:
* **Tapping `About`**: Top segmented chip bar toggles `[Faculty | Degrees | Union Council | Societies]`.
* **Tapping `Happenings`**: Top segmented chip bar toggles `[Events | News | Achievements | Notices]`.
* **Tapping `People`**: Top segmented chip bar toggles `[Students | Alumni | Life & Memories]`.

---

## 5. Platform Innovations & High-Impact Features

### 1. The Decennial Time Capsule (2017 $\rightarrow$ 2027)
* **Description**: Interactive scrollytelling timeline celebrating 10 years of the Faculty of Business (2017–2027).
* **Interactive Elements**: Users drag a chronological slider witnessing the faculty founding, launch of the Business Analytics pioneer curriculum, first national hackathon championships, digital workspace evolution, and the 2027 Decennial celebration.

### 2. The "Moratuwa Quant" Interactive Radar Chart
* **Description**: Dynamic visual skill matrix illustrating how a Moratuwa BBSc graduate combines Computer Science (Python, ML, SQL), Quantitative Finance (Econometrics, Risk), Enterprise Architecture (ERP/SAP), and Executive Decision Science.

### 3. Prospective Student "Specialization Finder"
* **Description**: 3-step diagnostic decision tree helping top A/L Commerce students evaluate whether Business Analytics (DS), Financial Services Management (IM), or Business Process Management (MOT) aligns best with their career ambitions.

### 4. Notion-Powered "Undergrad Micro-Gigs & Research Board"
* **Description**: Professors and student founders post research assistantships, paper co-authorships, or hackathon teammate openings into Notion; web renders clean cards with instant "Apply via UoM Email" buttons.

### 5. Campus "Union Room Beacon"
* **Description**: Live ambient status indicator (*"Union Room: Open & Active"* / *"Council in Session"*) powered directly by the Notion `Union Room` database.
