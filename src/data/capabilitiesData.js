/**
 * BFSU Digital Platform - Complete Capability & Feature Inventory Dataset
 * Exhaustive catalog of what exists, its data carrier, mobile update instructions, and gaps.
 */

export const systemCapabilities = [
    // 1. Governance & Leadership
    {
        id: "gov-officials",
        domain: "Governance",
        name: "Elected Union Officials Roster",
        description: "President, Secretary, Vice President, Editor, Junior Treasurer leadership cards with roles, departments, avatars, and profile links.",
        status: "LIVE",
        carrier: "Notion & Static",
        carrierKey: "NOTION_COUNCIL_DB",
        route: "/about#council",
        mobileInstructions: "Open BFSU Notion Workspace on phone > Council Database > Edit row or upload new photo to 'Avatar' property.",
        whatExists: "Full leadership card grid, role designations, department affiliations, and interactive peek modals.",
        whatIsMissing: "Real-time edge revalidation webhook from Notion."
    },
    {
        id: "gov-reps",
        domain: "Governance",
        name: "Committee Representatives Roster",
        description: "Official representative badges for general council and sub-committee delegates.",
        status: "LIVE",
        carrier: "Notion & Static",
        carrierKey: "NOTION_COUNCIL_DB",
        route: "/about#council",
        mobileInstructions: "Add new delegate row in Notion Council DB with 'Committee Representative' tag.",
        whatExists: "Interactive badge roster under council section.",
        whatIsMissing: "Individual committee assignment tags (Welfare, Finance, Sponsorship)."
    },
    {
        id: "gov-history",
        domain: "Governance",
        name: "Historical Presidential Continuity",
        description: "Chronological registry of past union leadership, key policy reforms, and alumni progression.",
        status: "LIVE",
        carrier: "Static Archives",
        carrierKey: "Historical Archive",
        route: "/about#past-leadership",
        mobileInstructions: "Add past presidential term row with president, secretary, and reform summary.",
        whatExists: "Past leadership registry with presidential initiatives and current alumni career milestones.",
        whatIsMissing: "Direct relation to alumni profile entries."
    },
    {
        id: "gov-mandate",
        domain: "Governance",
        name: "Statutory Mandate & Constitution",
        description: "Faculty of Business student charter, union mandate, and governance framework.",
        status: "LIVE",
        carrier: "Static & Notion",
        carrierKey: "NOTION_LINKS_DB",
        route: "/about#mandate",
        mobileInstructions: "Upload ratified constitution amendments to Notion document files.",
        whatExists: "Complete statutory mandate section.",
        whatIsMissing: "Embedded PDF document viewer modal."
    },

    // 2. Editorial & News
    {
        id: "edit-feed",
        domain: "Editorial",
        name: "Official Circulars & News Feed",
        description: "Chronological dispatch stream for gazettes, executive circulars, examination advisories, and press releases.",
        status: "LIVE",
        carrier: "Notion & Supabase",
        carrierKey: "NOTION_NEWS_DB",
        route: "/news",
        mobileInstructions: "From phone, tap 'New Page' in Notion News DB, add title, label, brief synopsis, flyer, and check 'Published'.",
        whatExists: "Filterable circular feed, search, labels, and image previews.",
        whatIsMissing: "Automated Notion webhook ping on new publication."
    },
    {
        id: "edit-reader",
        domain: "Editorial",
        name: "Full Article & Circular Reader",
        description: "Clean reader view for circulars with typography provenance, images, author attribution, and share links.",
        status: "LIVE",
        carrier: "Notion Blocks & Supabase",
        carrierKey: "NOTION_NEWS_DB",
        route: "/news/[slug]",
        mobileInstructions: "Type paragraphs, insert callout boxes, and upload flyer directly within Notion page body.",
        whatExists: "Full responsive reader view with metadata provenance.",
        whatIsMissing: "Notion block parser for nested toggle lists and audio notes."
    },

    // 3. Traditions & Events
    {
        id: "event-traditions",
        domain: "Events",
        name: "Traditions & Assemblies Feed",
        description: "Showcase for Wasath Hiru, AGERA sports encounter, Dean's assembly, and career workshops.",
        status: "LIVE",
        carrier: "Notion & Supabase",
        carrierKey: "NOTION_EVENTS_DB",
        route: "/events",
        mobileInstructions: "Create event page in Notion Events DB, select Category, date, venue, and upload poster from camera roll.",
        whatExists: "Event cards with date countdowns, venues, category tags, and detail routes.",
        whatIsMissing: "Live countdown timer component on upcoming event cards."
    },
    {
        id: "event-rsvp",
        domain: "Events",
        name: "Student RSVP & Pass Generator",
        description: "Digital RSVP registration for assemblies with verified attendee pass tracking.",
        status: "IN_PROGRESS",
        carrier: "Supabase & Notion",
        carrierKey: "event_registrations",
        route: "/events/[slug]",
        mobileInstructions: "Toggle 'RegistrationOpen: Yes' in Notion event row to activate pass generator.",
        whatExists: "Database schema and pass button states.",
        whatIsMissing: "Apple Wallet / Google Wallet pass file download."
    },

    // 4. Departmental Societies
    {
        id: "soc-dss",
        domain: "Societies",
        name: "Decision Sciences Society (DSS) Portal",
        description: "Official portal space for Decision Sciences & Business Analytics undergraduates with Notion Hub.",
        status: "LIVE",
        carrier: "Notion & Next.js",
        carrierKey: "NOTION_SOCIETIES_DB",
        route: "/societies/decision-sciences",
        mobileInstructions: "Edit DSS executive board, datathon schedules, and learning path links in DSS Notion workspace.",
        whatExists: "Complete society page with executive board, flagship hackathons, and Notion Hub widget.",
        whatIsMissing: "Live Notion database sync for student datathon submission tracker."
    },
    {
        id: "soc-bpmss",
        domain: "Societies",
        name: "Business Process Management Society (BPMSS)",
        description: "Official space for enterprise tech, process optimization, and tech symposia with Notion Hub.",
        status: "LIVE",
        carrier: "Notion & Next.js",
        carrierKey: "NOTION_SOCIETIES_DB",
        route: "/societies/bpmss",
        mobileInstructions: "Update industry visits, tech talk topics, and corporate partner links in BPMSS Notion space.",
        whatExists: "Complete society page with executive board, corporate forum initiatives, and Notion widget.",
        whatIsMissing: "Alumni technology directory live filter."
    },
    {
        id: "soc-imss",
        domain: "Societies",
        name: "Industrial Management Society (IMSS)",
        description: "Official space for quantitative finance, econometrics, and supply chain operations with Notion Hub.",
        status: "LIVE",
        carrier: "Notion & Next.js",
        carrierKey: "NOTION_SOCIETIES_DB",
        route: "/societies/industrial-management",
        mobileInstructions: "Add quant finance guides, trading sandbox cases, and mentorship slots in IMSS Notion hub.",
        whatExists: "Complete society page with executive board, valuation masterclasses, and Notion widget.",
        whatIsMissing: "Financial simulation leaderboard embed."
    },

    // 5. Student Identity & 4-Tier Public Persona
    {
        id: "ident-tier1",
        domain: "Identity",
        name: "Tier 1: Micro / Inline Avatar",
        description: "Resilient avatar component with fallback initials, proxy loader, and verified badge.",
        status: "LIVE",
        carrier: "Supabase & Notion",
        carrierKey: "UserAvatar.jsx",
        route: "Everywhere",
        mobileInstructions: "Upload square headshot to profile settings or Notion council record.",
        whatExists: "CORS/Weserv proxy resilience, verified shield badge, click-to-peek trigger.",
        whatIsMissing: "Animated border on active election candidates."
    },
    {
        id: "ident-tier2",
        domain: "Identity",
        name: "Tier 2: Profile Peek Modal",
        description: "Instant lightweight popover dialog showing quick credentials, badges, and bio without leaving current page.",
        status: "LIVE",
        carrier: "Global Context",
        carrierKey: "ProfilePeekModal.jsx",
        route: "Global Overlay",
        mobileInstructions: "Triggered instantly by clicking any peekable avatar or delegate name.",
        whatExists: "Frosted glass card, batch/dept tags, social links, role badges, CTA to full profile.",
        whatIsMissing: "Key achievement badge chips in peek view."
    },
    {
        id: "ident-tier3",
        domain: "Identity",
        name: "Tier 3: Canonical Public Profile",
        description: "Institutional public record hosted under /u/[username] with verified delegate status.",
        status: "LIVE",
        carrier: "Supabase & Next.js",
        carrierKey: "profiles & career_history",
        route: "/u/[username]",
        mobileInstructions: "Update bio, industry, and career milestones from mobile `/profile` view.",
        whatExists: "Scannable QR pass, career progression timeline, faculty colours, society hub link.",
        whatIsMissing: "List of authored news circulars by this delegate."
    },
    {
        id: "ident-tier4",
        domain: "Identity",
        name: "Tier 4: Personal Portfolio Showcase",
        description: "External personal portfolio and project showcase anchored by institutional BFSU trust badge.",
        status: "LIVE",
        carrier: "Supabase",
        carrierKey: "portfolio_url",
        route: "/u/[username]",
        mobileInstructions: "Enter personal website or portfolio URL in `/profile` settings.",
        whatExists: "Dedicated Tier 4 showcase card with direct verification anchor.",
        whatIsMissing: "Interactive live iframe website preview toggle."
    },

    // 6. Alumni & Career Guild
    {
        id: "alumni-dir",
        domain: "Alumni",
        name: "Verified Alumni Directory",
        description: "Searchable network of graduates across corporate consulting, finance, tech, and research.",
        status: "LIVE",
        carrier: "Supabase",
        carrierKey: "profiles (role=alumni)",
        route: "/alumni",
        mobileInstructions: "Alumni sign in via LinkedIn OAuth to auto-verify graduate status.",
        whatExists: "Batch & department multi-filters, quick peek buttons, direct profile links.",
        whatIsMissing: "Job dispatch & referral board for undergraduates."
    },
    {
        id: "alumni-invite",
        domain: "Alumni",
        name: "Batch Outreach Invite Generator",
        description: "One-click tool generating customized WhatsApp & LinkedIn invite links for batch WhatsApp groups.",
        status: "LIVE",
        carrier: "Client Generator",
        carrierKey: "AlumniPage.jsx",
        route: "/alumni",
        mobileInstructions: "Select target batch and department from phone, tap 'Copy Link' or 'Share WhatsApp'.",
        whatExists: "Complete modal generator with batch parameter presets.",
        whatIsMissing: "Short-URL tracking counter for invite clicks."
    },

    // 7. Welfare & Student Concerns
    {
        id: "welfare-tracker",
        domain: "Welfare",
        name: "Student Welfare & Grievance Desk",
        description: "Tracking canteen subsidies, examination welfare, and facility maintenance issues (e.g. Lab 111).",
        status: "IN_PROGRESS",
        carrier: "Notion Hub",
        carrierKey: "NOTION_WELFARE_DB",
        route: "/about#union-notion",
        mobileInstructions: "Log new student welfare tickets in Notion Welfare database from phone.",
        whatExists: "Notion Hub workspace integration and links.",
        whatIsMissing: "Anonymous public ticket submission form on portal."
    },

    // 8. Academic Resources & Useful Links
    {
        id: "links-portal",
        domain: "Resources",
        name: "Academic Portals & Faculty Directory",
        description: "Centralized launchpad for LMS, examination portals, department faculty pages, and university services.",
        status: "LIVE",
        carrier: "Static & Notion",
        carrierKey: "UsefulLinksPage.jsx",
        route: "/links",
        mobileInstructions: "Add new bookmark or portal link in Notion Links database.",
        whatExists: "Categorized link directory, department portal links, library access.",
        whatIsMissing: "Past examination paper vault with direct downloads."
    },

    // 9. Platform Engineering & Architecture
    {
        id: "eng-sop",
        domain: "Engineering",
        name: "Polymath Documentation SOP & Ledgers",
        description: "Institutional engineering playbooks, ERD specifications, and architectural blueprints.",
        status: "LIVE",
        carrier: "Git & Markdown",
        carrierKey: "docs/docs-sop.md",
        route: "/docs",
        mobileInstructions: "Read through Notion Web Maintainers board or GitHub repository.",
        whatExists: "Official docs-sop.md, master INDEX.md, entity relationship domain model, implementation plan.",
        whatIsMissing: "Automated linting for doc YAML frontmatter."
    },
    {
        id: "eng-matrix",
        domain: "Engineering",
        name: "Live System Capability & Feature Matrix",
        description: "Interactive visual cockpit displaying all platform features, live routes, carriers, and gaps.",
        status: "LIVE",
        carrier: "Interactive Cockpit",
        carrierKey: "capabilitiesData.js",
        route: "/capabilities",
        mobileInstructions: "Access `/capabilities` on phone to inspect what is implemented vs missing.",
        whatExists: "Full interactive capability matrix with domain filters and mobile update guides.",
        whatIsMissing: "Live automated health check ping for external APIs."
    }
];
