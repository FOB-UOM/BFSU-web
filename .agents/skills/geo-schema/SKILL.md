---
name: geo-schema
description: Playbook for auditing, implementing, and validating Schema.org JSON-LD structured data for entity clarity, knowledge graph inclusion, and rich search results.
---

# GEO Schema & Structured Data Playbook

A practical guide for implementing high-fidelity Schema.org JSON-LD structured data. Structured data disambiguates entity relationships (parent organizations, leadership, official contact points, locations) for search engines and language models.

---

## 1. Schema Hierarchy for University Student Organizations

```
Organization (BFSU, University of Moratuwa)
 ├── parentOrganization: EducationalOrganization (Faculty of Business, University of Moratuwa)
 ├── address: PostalAddress (Katubedda, Moratuwa, LK)
 ├── contactPoint: ContactPoint (Student Support & Welfare)
 ├── sameAs: [LinkedIn, Facebook, YouTube]
 └── member / alumni: Person (Office Bearers)
```

---

## 2. Core Schema Templates

### A. Organization Schema (`Organization`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Business Faculty Students' Union, University of Moratuwa",
  "alternateName": ["BFSU", "BFSU UoM", "Business Faculty Students' Union"],
  "url": "https://bfsu-uom.lk",
  "logo": "https://bfsu-uom.lk/images/logo.png",
  "parentOrganization": {
    "@type": "EducationalOrganization",
    "name": "Faculty of Business, University of Moratuwa",
    "url": "https://uom.lk/business"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Students' Union Room, Level 01, Faculty of Business",
    "addressLocality": "Katubedda, Moratuwa",
    "addressRegion": "Western Province",
    "postalCode": "10400",
    "addressCountry": "LK"
  },
  "email": "bfsu@uom.lk",
  "sameAs": [
    "https://www.linkedin.com/company/bfsu-uom",
    "https://facebook.com/bfsu.uom",
    "https://youtube.com/@bfsu_uom"
  ]
}
```

### B. News / Circular Schema (`NewsArticle`)
```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "<Title>",
  "description": "<Brief>",
  "image": ["<Image URL>"],
  "datePublished": "<ISO8601 Date>",
  "dateModified": "<ISO8601 Date>",
  "author": {
    "@type": "Organization",
    "name": "Business Faculty Students' Union, University of Moratuwa"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Business Faculty Students' Union, University of Moratuwa",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bfsu-uom.lk/images/logo.png"
    }
  }
}
```

### C. Event Schema (`Event`)
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "<Event Name>",
  "description": "<Brief>",
  "startDate": "<ISO8601 Date>",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "<Location Name>",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Katubedda, Moratuwa",
      "addressCountry": "LK"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Business Faculty Students' Union, University of Moratuwa",
    "url": "https://bfsu-uom.lk"
  }
}
```
