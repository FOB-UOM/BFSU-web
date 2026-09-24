/**
 * Institutional Student Societies Data
 * Official departmental societies under the Faculty of Business, University of Moratuwa.
 * Each society connects to its respective academic department and official Notion workspace.
 */

export const departmentalSocieties = [
    {
        id: "dss",
        slug: "decision-sciences",
        code: "DSS",
        name: "Decision Sciences Society",
        departmentName: "Department of Decision Sciences",
        departmentCode: "DS",
        tagline: "Pioneering Business Analytics, Machine Learning & Algorithmic Optimization",
        description: "The official academic student body representing undergraduates in Decision Sciences and Business Analytics at the Faculty of Business, University of Moratuwa. DSS empowers students with state-of-the-art computational tools, inter-university hackathons, predictive modeling workshops, and data engineering mastery.",
        notion: {
            workspaceName: "BFSU / Decision Sciences Hub",
            workspaceUrl: "https://notion.so/bfsu-uom/decision-sciences-society",
            description: "The centralized operational and academic workspace for Decision Sciences undergraduates, task teams, and event steering committees.",
            resources: [
                { title: "Hackathon & Datathon Task Tracker", type: "Database", tag: "Projects" },
                { title: "Business Analytics Curated Learning Path", type: "Knowledge Base", tag: "Academic" },
                { title: "Research Working Group Drafts", type: "Workspace", tag: "Research" },
                { title: "Executive Committee Meeting Minutes", type: "Internal", tag: "Secretariat" }
            ]
        },
        stats: {
            members: "250+ Undergraduates",
            eventsPerYear: "6 Major Symposia & Hackathons",
            notionPages: "45+ Knowledge Repositories"
        },
        executiveBoard: [
            {
                name: "Yasitha Sandakalum",
                role: "President",
                username: "yasitha-sandakalum",
                batch: "Batch '21",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                headline: "Data Science & Supply Chain Optimization Enthusiast"
            },
            {
                name: "Lakshan Kosala",
                role: "Vice President",
                username: "lakshan-kosala",
                batch: "Batch '22",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
                headline: "Predictive Analytics & Financial Engineering Researcher"
            },
            {
                name: "Senura Niduk",
                role: "Secretary",
                username: "senura-niduk",
                batch: "Batch '22",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
                headline: "Operations Research & Enterprise Data Systems"
            }
        ],
        initiatives: [
            {
                title: "DataSphere Inter-University Hackathon",
                type: "Annual Flagship",
                description: "Sri Lanka's leading collegiate algorithmic challenge focused on applying neural networks to macro-financial datasets."
            },
            {
                title: "Bi-Weekly Python & R Analytics Clinics",
                type: "Skill Series",
                description: "Hands-on peer-led laboratory tutorials on statistical learning, scikit-learn, and cloud data pipelines."
            }
        ]
    },
    {
        id: "motss",
        slug: "mot",
        code: "MOTSS",
        name: "Management of Technology Student Society",
        departmentName: "Department of Management of Technology",
        departmentCode: "MOT",
        tagline: "Bridging Cutting-Edge Enterprise Technology, Digital Transformation & Strategy",
        description: "The Management of Technology Student Society (MOTSS) is the flagship student organisation of the Department of Management of Technology. Dedicated to grooming technology leaders, enterprise architects, and digital product managers.",
        notion: {
            workspaceName: "BFSU / MOTSS Strategy Hub",
            workspaceUrl: "https://notion.so/bfsu-uom/mot-society",
            description: "The digital nerve centre for industrial technology projects, corporate sponsorship pipelines, and product architecture roadmaps.",
            resources: [
                { title: "Enterprise Technology Industry Directory", type: "Database", tag: "Industry" },
                { title: "Digital Product Architecture Case Studies", type: "Library", tag: "Curriculum" },
                { title: "Tech Talk & Corporate Webinar Planner", type: "Calendar", tag: "Events" },
                { title: "Alumni Technology Mentorship Register", type: "Directory", tag: "Alumni" }
            ]
        },
        stats: {
            members: "280+ Undergraduates",
            eventsPerYear: "8 Corporate Forums & Visits",
            notionPages: "50+ Strategy Guides"
        },
        executiveBoard: [
            {
                name: "Prageeth Harshana",
                role: "President",
                username: "prageeth-harshana",
                batch: "Batch '21",
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
                headline: "Enterprise Systems Architect & Digital Strategist"
            },
            {
                name: "Warsha Joolige",
                role: "Secretary",
                username: "warsha-joolige",
                batch: "Batch '22",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                headline: "Technology Innovation Management & Product Operations"
            },
            {
                name: "Poorna Lakshan",
                role: "Vice President",
                username: "poorna-lakshan",
                batch: "Batch '22",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
                headline: "Cloud Architectures & Business Process Systems"
            }
        ],
        initiatives: [
            {
                title: "TechInno Annual Industry Symposium",
                type: "Flagship Conference",
                description: "Gathering Fortune 500 tech leaders and Sri Lanka's leading enterprise executives to mentor business technology undergraduates."
            },
            {
                title: "Industrial Plant & Tech Park Immersion",
                type: "Corporate Visit",
                description: "Field visits exposing undergraduates to high-throughput automation plants and enterprise IoT implementations."
            }
        ]
    },
    {
        id: "imss",
        slug: "industrial-management",
        code: "IMSS",
        name: "Industrial Management Student Society",
        departmentName: "Department of Industrial Management",
        departmentCode: "IM",
        tagline: "Engineering Financial Systems, Econometrics & High-Stakes Operations",
        description: "Representing undergraduates in Industrial Management and Financial Services Management at the Faculty of Business, University of Moratuwa. IMSS is dedicated to quantitative finance, risk econometrics, supply chain resilience, and operational excellence.",
        notion: {
            workspaceName: "BFSU / IMSS Operations Hub",
            workspaceUrl: "https://notion.so/bfsu-uom/industrial-management-society",
            description: "Collaborative research databases, financial valuation spreadsheets, trading simulation tracks, and semester revision vaults.",
            resources: [
                { title: "Quantitative Finance & Econometrics Compendium", type: "Knowledge Base", tag: "Finance" },
                { title: "Supply Chain Operations Case Repository", type: "Library", tag: "Operations" },
                { title: "Financial Trading & Risk Simulation Sandbox", type: "Project Board", tag: "Simulation" },
                { title: "Industrial Mentorship Matching Desk", type: "Directory", tag: "Mentorship" }
            ]
        },
        stats: {
            members: "300+ Undergraduates",
            eventsPerYear: "7 Workshops & Case Battles",
            notionPages: "60+ Analytical Sheets"
        },
        executiveBoard: [
            {
                name: "Miyuranga Rajakaruna",
                role: "President",
                username: "miyuranga-rajakaruna",
                batch: "Batch '21",
                avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
                headline: "Quantitative Analyst & Risk Management Fellow"
            },
            {
                name: "Naveen Sandeepa",
                role: "Vice President & Lead Architect",
                username: "naveen-sandeepa",
                batch: "Batch '22",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
                headline: "Financial Analytics & Platform Engineer"
            },
            {
                name: "Mayuri Lakshani",
                role: "Secretary",
                username: "mayuri-lakshani",
                batch: "Batch '22",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
                headline: "Supply Chain Optimization & Econometrics Researcher"
            }
        ],
        initiatives: [
            {
                title: "Capital Markets & Valuation Masterclass",
                type: "Executive Workshop",
                description: "Hands-on DCF valuation and algorithmic asset allocation sessions taught by leading investment banking directors."
            },
            {
                title: "Operations Excellence Case Challenge",
                type: "Competition",
                description: "Real-world supply chain bottleneck resolution simulation with live corporate case studies."
            }
        ]
    }
];

export const unionNotionConfig = {
    workspaceName: "Business Faculty Students' Union (BFSU) Official Workspace",
    workspaceUrl: "https://notion.so/bfsu-uom/union-hq",
    description: "The master organizational Notion hub for the BFSU Executive Council, general student welfare cases, faculty-wide events, and editorial press releases.",
    sections: [
        {
            title: "BFSU Secretariat & Executive Council",
            notionPage: "https://notion.so/bfsu-uom/secretariat",
            tag: "Governance",
            summary: "Constitutional records, council meeting minutes, and official circular dispatch pipeline."
        },
        {
            title: "Annual Faculty Event Planning (Wasath Hiru & AGERA)",
            notionPage: "https://notion.so/bfsu-uom/events-calendar",
            tag: "Logistics",
            summary: "Event sub-committee budgets, stage coordination, and vendor checklists."
        },
        {
            title: "Student Welfare & Anonymous Feedback Tracker",
            notionPage: "https://notion.so/bfsu-uom/welfare-desk",
            tag: "Welfare",
            summary: "Real-time dispatch system routing student concerns to the Deanery and Student Affairs."
        },
        {
            title: "Editorial & Digital Platform Maintainers Desk",
            notionPage: "https://notion.so/bfsu-uom/web-maintainers",
            tag: "Engineering",
            summary: "Sprint board, UI design system notes, and technical documentation repository."
        }
    ]
};
