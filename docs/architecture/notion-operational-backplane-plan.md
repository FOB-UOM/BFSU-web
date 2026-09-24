---
title: "Notion Operational Backplane Architecture & Schema Resilience Specification"
status: "active"
created: 2026-09-24
updated: 2026-09-24
author: "Naveen"
scribe: "Antigravity"
tags: [notion, cms, schema, resilience, backplane, headless]
---

# Notion Operational Backplane Architecture & Schema Resilience Specification

## 1. Role of Notion as the Sovereign Operational Carrier

In this architecture, **Notion is the operating backplane**. Non-technical student union executives, department representatives, and society leads use Notion as their daily workspace. 

### Why Notion Over a Traditional Headless CMS?
- **Zero Training Required**: Student leaders already organize their lives, meeting minutes, and tasks in Notion.
- **Collaborative Real-Time Editing**: Multi-user concurrent document writing, comments, and task assignment.
- **No Developer Bottlenecks**: Adding an orientation event, changing a council member's bio, or publishing a new society article does not require Git commits, PR reviews, or Vercel rebuilds.

---

## 2. Enriched Live Database Schemas (Configured via Notion CLI)

Using `@4ier/notion-cli`, the live databases in the workspace (`Students' Union - FOB @ UOM`) have been successfully enhanced with standardized properties:

### A. `Committee Members` (`2dc3b460dd9e80479654c034a9412f40`)

| Property Name | Notion Type | Purpose & Web Mapping | Required? | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `Member Name` | `title` | Full name of the council officer | **Yes** | Displays "Council Member" if empty |
| `Role` | `multi_select` | Official title (President, VP, Secretary...) | **Yes** | Defaults to "Executive Member" |
| `Email` | `email` | UoM email (`kumarasdns.22@uom.lk`) | No | If absent, profile peek button is disabled |
| `Contact Info` | `rich_text` | Legacy phone/email block | No | Rendered as secondary contact info |
| `Department` | `select` | DS, IM, MOT, or General | No | Displays faculty-wide general badge |
| `Batch` | `select` | Batch 21, Batch 22, Batch 23, Batch 24, Batch 25 | No | Omitted from card if not specified |
| `Avatar` | `files` | High-res executive headshot | No | **Fallback to UI Avatar / Initials generator** |
| `Bio` | `rich_text` | Manifesto or personal bio statement | No | Collapses bio section gracefully |
| `LinkedIn` | `url` | LinkedIn profile URL | No | LinkedIn icon is hidden if absent |
| `Priority` | `number` | Ordering weight (1=President, 2=VP, 3=Secretary...) | No | Defaults to `999` (appended at bottom) |
| `Term` | `select` | Academic term (e.g. `2025/2026`) | No | Defaults to current active term |
| `Active` | `checkbox` | Visibility toggle | No | Defaults to `true` |

### B. `Event calendar` (`2dc3b460dd9e810d87b4c2de080401b5`)

| Property Name | Notion Type | Purpose & Web Mapping | Required? | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `Name` | `title` | Event title | **Yes** | Displays "Upcoming Faculty Event" |
| `Date` | `date` | Start timestamp (and optional end time) | **Yes** | Shows "Date TBD" if absent |
| `Location` | `rich_text` | Venue (Auditorium 2, Virtual, etc.) | No | Defaults to "University of Moratuwa" |
| `Category` | `select` | Academic, Career, Social, Hackathon, Orientation | No | Defaults to "Faculty Event" |
| `Organizer` | `select` | BFSU, SOBA, FSMSS, MOTSS | No | Defaults to "BFSU" |
| `Description` | `rich_text` | Event summary and expectations | No | Truncates to title or placeholder |
| `Cover` | `files` | Event banner or poster | No | **Fallback to gradient category banner** |
| `Registration` | `url` | RSVP / registration form link | No | "RSVP" button changes to "Details" |
| `Featured` | `checkbox` | Pins event to homepage hero marquee | No | Defaults to `false` |

### C. `Updates` (`2dc3b460dd9e80f69fb6f4f3d60426eb`)

| Property Name | Notion Type | Purpose & Web Mapping | Required? | Fallback Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `Name` | `title` | Article or announcement title | **Yes** | Displays headline |
| `Why` | `rich_text` | Context / summary / body content | No | Shows snippet |
| `Type of Update`| `select` | Normal, High Priority, Urgent | No | Defaults to `Normal` |
| `Date` | `date` | Published timestamp | No | Defaults to page `created_time` |

---

## 3. Schema Resilience & Non-Blocking Design Principles

A core tenet of this architecture is that **no web component will ever crash or break because a Notion property is missing, null, or improperly formatted**.

### Principle 1: The "Never-Crash" Defensive Adapter
The data client in `src/lib/notion.js` sanitizes all Notion API responses into clean, normalized JSON structures before exposing them to React components:

```javascript
// Example defensive parsing for Council Member
function sanitizeCouncilMember(page) {
  const props = page.properties || {};
  return {
    id: page.id,
    name: extractPlainText(props['Member Name']) || 'Council Member',
    roles: props['Role']?.multi_select?.map(r => r.name) || ['Executive Member'],
    email: props['Email']?.email || extractEmailFromText(props['Contact Info']) || null,
    avatar: extractFileUrl(props['Avatar']) || null, // Will use weserv or Initials fallback
    bio: extractPlainText(props['Bio']) || '',
    linkedin: props['LinkedIn']?.url || null,
    priority: props['Priority']?.number ?? 999,
    term: props['Term']?.select?.name || '2025/2026',
    isActive: props['Active']?.checkbox ?? true,
    department: props['Department']?.select?.name || 'General'
  };
}
```

### Principle 2: S3 Attachment URL Expiration Mitigation
- Notion-hosted files (e.g. photos uploaded directly into Notion) expire after **1 hour** due to AWS S3 signed URL expiration.
- **Solution**: The web platform proxies all external media URLs through an image proxy engine (`images.weserv.nl` or Next.js edge rewrite), preventing broken image icons when cached responses exceed 60 minutes.

### Principle 3: Tiered Caching & Fallback Tier
1. **Tier 1 (Memory Cache)**: In-memory cache with Next.js ISR `revalidate: 60` seconds.
2. **Tier 2 (Stale-While-Revalidate)**: If the Notion API returns a 429 (Rate Limit) or 500 error, the previous cached response is served seamlessly.
3. **Tier 3 (Seed Fallback)**: If Notion is completely unreachable on a cold boot, statically bundled seed data ensures the website still renders flawlessly without downtime.
