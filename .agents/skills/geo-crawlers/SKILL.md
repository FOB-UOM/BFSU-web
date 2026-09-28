---
name: geo-crawlers
description: Comprehensive playbook for managing AI crawler access, robots.txt, HTTP headers, and CDN/WAF rules for AI search retrieval bots and LLM indexers.
---

# AI Crawler Access & Discovery Playbook

A dedicated operational skill for analyzing, configuring, and verifying website access for AI search retrieval bots (ChatGPT Search, Perplexity, Claude, Gemini) and LLM indexers.

---

## 1. AI Crawler Directory & Access Matrix

### Tier 1: Search & Retrieval Crawlers (HIGH PRIORITY: MUST ALLOW)
These crawlers power active user search queries and answer engines. Blocking them deletes your site from AI answers and citations:

| Bot Name | User-Agent | Primary Operator | Function | Training Impact | Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OAI-SearchBot** | `OAI-SearchBot` | OpenAI | Live search queries in ChatGPT | **No** (Search only) | **ALLOW** |
| **GPTBot** | `GPTBot` | OpenAI | Web browsing, search, context retrieval | Content may be indexed | **ALLOW** |
| **ChatGPT-User** | `ChatGPT-User` | OpenAI | User-requested on-demand URL fetches | **No** (Direct user fetch) | **ALLOW** |
| **ClaudeBot** | `ClaudeBot` | Anthropic | Web search and live citation in Claude | Content retrieval | **ALLOW** |
| **PerplexityBot** | `PerplexityBot` | Perplexity AI | AI search indexing and direct link citations | Direct citations | **ALLOW** |

### Tier 2: Model Training & Extended Crawlers
| Bot Name | User-Agent | Primary Operator | Function | Action |
| :--- | :--- | :--- | :--- | :--- |
| **Google-Extended** | `Google-Extended` | Google | Gemini & Vertex AI model training | **ALLOW** (Does not hurt Search rankings) |
| **Applebot-Extended** | `Applebot-Extended`| Apple | Apple Intelligence & Siri citations | **ALLOW** |
| **Bingbot** | `bingbot` | Microsoft | Powers Bing & underlying ChatGPT search index | **ALLOW** |

---

## 2. Cloudflare & CDN Edge Precautions

CDNs (Cloudflare, Fastly, AWS CloudFront) frequently feature automated "AI Scraper Blocking" toggles.
- **Critical Risk:** Enabling blanket AI bot blocking will silently drop `OAI-SearchBot` and `PerplexityBot` with HTTP 403 Forbidden at the edge, even if `robots.txt` specifies `Allow: /`.
- **Validation Command:**
  Verify bot response directly from the edge network using cURL:
  ```bash
  curl -A "Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://docs.openai.com/bots/overview)" -I https://bfsu-uom.lk/
  ```
  *Expected Result:* `HTTP/2 200` or `HTTP/1.1 200 OK`.

---

## 3. Robots.txt Standard Configuration

The recommended configuration for public institutional entities:

```text
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://bfsu-uom.lk/sitemap.xml
```
