---
name: search-visibility
description: Engineering playbook for search engine optimization (SEO), Generative Engine Optimization (GEO), AI citation maximization, and entity disambiguation for the Business Faculty Students' Union (BFSU), University of Moratuwa.
---

# BFSU Search Visibility & Generative Engine Optimization (GEO) Playbook

A dedicated engineering and content skill for maximizing search discoverability, AI assistant citations (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews), and agent-readiness for the **Business Faculty Students' Union (BFSU), University of Moratuwa**.

---

## 1. The Three Foundations of AI-Era Discoverability

In 2026, web visibility spans three distinct technical and architectural layers:
1. **Retrievability:** Machine crawlers and AI bots can reach, fetch, parse, and index server-rendered content without JavaScript execution barriers or redirect hops.
2. **Selectability:** When retrieved, your content is the most authoritative, primary-source, and entity-unambiguous answer to a query.
3. **Actionability:** Autonomous web agents can navigate forms, inspect semantic DOM trees, extract office hours, contacts, and event dates without modal traps.

---

## 2. Entity Disambiguation Strategy

### The Core Problem
The acronym **"BFSU"** has intense global collisions:
- Beijing Foreign Studies University (China)
- Banking and Financial Services Union (Singapore)

### The Mandatory Naming Protocol
- **Primary Canonical Name:** `Business Faculty Students' Union, University of Moratuwa`
- **Short Name Usage:** Use `"BFSU"` only *after* or *alongside* the full name (e.g., `Business Faculty Students' Union (BFSU), University of Moratuwa`).
- **Never publish titles or descriptions where "BFSU" stands alone without "Moratuwa" or "Faculty of Business".**

### Entity Sheet Reference
| Property | Canonical Specification |
| :--- | :--- |
| **Full Legal / Constitutional Name** | Business Faculty Students' Union, University of Moratuwa |
| **Short / Acronym** | BFSU (always paired with UoM or Moratuwa) |
| **Parent Entity** | Faculty of Business, University of Moratuwa |
| **Legal Basis** | Established under the Universities Act No. 16 of 1978 (Sri Lanka) |
| **Official Domain** | `https://bfsu-uom.lk` |
| **Physical Campus** | Students' Union Room, Level 01, Faculty of Business, University of Moratuwa, Katubedda, Moratuwa, 10400, Sri Lanka |
| **Official Email** | `bfsu@uom.lk` |
| **Official Socials** | LinkedIn (`/company/bfsu-uom`), Facebook (`/bfsu.uom`), YouTube (`/@bfsu_uom`) |

---

## 3. Location Signals (Sri Lanka & Moratuwa)

Location is an interconnected web of corroborating signals:
1. **Domain:** The `.lk` top-level domain (`bfsu-uom.lk`) establishes immediate geographic authority.
2. **Title & Heading Geometry:** Prominently feature "Moratuwa, Sri Lanka" across page titles, meta descriptions, footer addresses, and About pages.
3. **Structured Postal Address:** Every root JSON-LD schema must include:
   ```json
   "address": {
     "@type": "PostalAddress",
     "streetAddress": "Students' Union Room, Level 01, Faculty of Business",
     "addressLocality": "Katubedda, Moratuwa",
     "addressRegion": "Western Province",
     "postalCode": "10400",
     "addressCountry": "LK"
   }
   ```
4. **Language Tagging:** Set `<html lang="en">` or `en-LK`. Never use IP-based dynamic redirects that hide content from global search bots.

---

## 4. Technical Blueprint for Next.js

### Rendering & Hydration
- Deliver all public pages (`/`, `/about`, `/explore`, `/news`, `/events`, `/links`, `/alumni`, `/research`) via **Static Site Generation (SSG)** or **Incremental Static Regeneration (ISR)**.
- Public text, announcements, notices, and council member profiles must be present in the initial server-rendered HTML.
- Client components (`'use client'`) must only be used for interactive controls, stateful modals, and analytics.

### Metadata Rules (`layout.jsx` / `page.jsx`)
- Set explicit `metadataBase`: `new URL('https://bfsu-uom.lk')`.
- Define canonical URLs using `alternates: { canonical: '...' }`.
- Provide localized OpenGraph and Twitter cards with 1200x630 imagery and entity titles.

### Robots & Crawlers (`src/app/robots.js`)
- Grant open access to all legitimate search and AI retrieval crawlers.
- Disallow private administrative endpoints (`/admin/`, `/api/`).
- Point directly to the canonical sitemap (`https://bfsu-uom.lk/sitemap.xml`).

```javascript
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://bfsu-uom.lk/sitemap.xml',
  };
}
```

### Structured Data (JSON-LD)
- Inject valid, server-rendered `<script type="application/ld+json">` schemas into the DOM.
- Core schema types:
  - `Organization` & `WebSite` on root layout and homepage.
  - `Person` for executive council members on `/about`.
  - `NewsArticle` for all circulars on `/news/[slug]`.
  - `Event` for all assemblies and competitions on `/events/[slug]`.
  - `BreadcrumbList` on deep interior pages.

---

## 5. Non-Commodity Content & Citability

AI models summarize commodity advice but quote primary-source records. BFSU's competitive advantage is unique institutional data:
- **Constitutional Charter & Mandates:** The foundational articles governing student welfare.
- **Council Dispatches & Minutes:** Primary notices from the Executive Council.
- **Academic Circulars & Examination Notices:** Direct university directives.
- **Direct Student Answers:** Concise, fact-dense answers to common student inquiries ("Who represents Faculty of Business students?", "How to submit a welfare request?").

---

## 6. Audit & Measurement Protocol

Run regular prompt panel testing across ChatGPT, Claude, Perplexity, and Gemini:
1. *"What is the Business Faculty Students' Union at University of Moratuwa?"*
2. *"Who are the current office bearers of BFSU UoM?"*
3. *"Where is the BFSU office located at University of Moratuwa?"*
4. *"How can students contact the Business Faculty Students' Union Moratuwa?"*

Verify that the models:
- Name the union accurately without confusing it with Beijing Foreign Studies University.
- Attribute information directly to `https://bfsu-uom.lk`.
- Accurately quote official emails and office locations.
