/**
 * Institutional Student Societies Data
 * Official departmental societies under the Faculty of Business, University of Moratuwa.
 * 
 * - SOBA: Society of Business Analytics (Department of Decision Sciences)
 * - FSMSS: FSM Students' Society (Department of Industrial Management)
 * - BPMSS: Business Process Management Students' Society (Department of Management of Technology)
 * 
 * Centralized, editable configuration. Supports live Notion sync.
 */

export const departmentalSocieties = [
    {
        id: "soba",
        slug: "soba",
        aliases: ["dss", "decision-sciences", "business-analytics"],
        code: "SOBA",
        name: "Society of Business Analytics",
        departmentName: "Department of Decision Sciences",
        departmentCode: "DS",
        tagline: "Pioneering Business Analytics, Machine Learning & Algorithmic Optimization",
        description: "The official academic student body representing undergraduates in Decision Sciences and Business Analytics at the Faculty of Business, University of Moratuwa. SOBA empowers students with state-of-the-art computational tools, inter-university hackathons, predictive modeling workshops, and data engineering mastery.",
        workspaces: {
            notion: {
                workspaceName: "BFSU / Decision Sciences Hub",
                workspaceUrl: "https://notion.so/bfsu-uom/decision-sciences-society",
                notionPageId: "30d3b460dd9e81dcb43bcff420397d32"
            },
            googleWorkspace: {
                sharedDriveUrl: "https://drive.google.com/drive/folders/1soba-uom-analytics-archive",
                calendarUrl: "https://calendar.google.com"
            },
            repository: {
                githubUrl: "https://github.com/bfsu-uom"
            }
        },
        notion: {
            workspaceName: "BFSU / Decision Sciences Hub",
            workspaceUrl: "https://notion.so/bfsu-uom/decision-sciences-society",
            notionPageId: "30d3b460dd9e81dcb43bcff420397d32",
            description: "The centralized operational and academic workspace for Decision Sciences undergraduates, task teams, and event steering committees.",
            resources: [
                { title: "Hackathon & Datathon Task Tracker", type: "Database", tag: "Projects", provider: "notion" },
                { title: "Business Analytics Curated Learning Path", type: "Knowledge Base", tag: "Academic", provider: "notion" },
                { title: "Machine Learning & Datathon Datasets Vault", type: "Drive Folder", tag: "Resources", provider: "google-drive" },
                { title: "Decision Sciences Algorithmic Starters", type: "Code Repository", tag: "Open Source", provider: "github", url: "https://github.com/bfsu-uom" },
                { title: "Executive Committee Meeting Minutes", type: "Internal", tag: "Secretariat", provider: "notion" }
            ]
        },
        stats: {
            members: "250+ Undergraduates",
            eventsPerYear: "6 Major Symposia & Hackathons",
            notionPages: "45+ Knowledge Repositories"
        },
        executiveBoard: [
            {
                name: "Yasitha Sandakelum",
                role: "President",
                username: "yasitha-sandakelum",
                batch: "Batch '21",
                email: "president.soba@uom.lk",
                headline: "Data Science & Supply Chain Optimization Enthusiast"
            },
            {
                name: "Kosala Madushanka",
                role: "Vice President",
                username: "kosala-madushanka",
                batch: "Batch '22",
                email: "vp.soba@uom.lk",
                headline: "Predictive Analytics & Financial Engineering Researcher"
            },
            {
                name: "Senura Niduk",
                role: "Secretary",
                username: "senura-niduk",
                batch: "Batch '22",
                email: "secretary.soba@uom.lk",
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
        id: "fsmss",
        slug: "fsmss",
        aliases: ["imss", "industrial-management", "fsm"],
        code: "FSMSS",
        name: "FSM Students' Society",
        departmentName: "Department of Industrial Management",
        departmentCode: "IM",
        tagline: "Engineering Financial Systems, Econometrics & High-Stakes Operations",
        description: "The official student body representing undergraduates in Industrial Management and Financial Services Management at the Faculty of Business, University of Moratuwa. FSMSS is dedicated to quantitative finance, risk econometrics, supply chain resilience, and operational excellence.",
        workspaces: {
            notion: {
                workspaceName: "BFSU / FSMSS Operations Hub",
                workspaceUrl: "https://notion.so/bfsu-uom/fsm-students-society",
                notionPageId: "30d3b460dd9e81bfa07bf533a61bb294"
            },
            googleWorkspace: {
                sharedDriveUrl: "https://drive.google.com/drive/folders/1fsmss-financial-models-vault",
                calendarUrl: "https://calendar.google.com"
            }
        },
        notion: {
            workspaceName: "BFSU / FSMSS Operations Hub",
            workspaceUrl: "https://notion.so/bfsu-uom/fsm-students-society",
            notionPageId: "30d3b460dd9e81bfa07bf533a61bb294",
            description: "Collaborative research databases, financial valuation spreadsheets, trading simulation tracks, and semester revision vaults.",
            resources: [
                { title: "Quantitative Finance & Econometrics Compendium", type: "Knowledge Base", tag: "Finance", provider: "notion" },
                { title: "Financial Valuation & DCF Models Vault", type: "Drive Folder", tag: "Finance", provider: "google-drive" },
                { title: "Supply Chain Operations Case Repository", type: "Library", tag: "Operations", provider: "notion" },
                { title: "Financial Trading & Risk Simulation Sandbox", type: "Project Board", tag: "Simulation", provider: "notion" },
                { title: "Industrial Mentorship Matching Desk", type: "Directory", tag: "Mentorship", provider: "notion" }
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
                email: "rajakarunarhmym.22@uom.lk",
                headline: "Quantitative Analyst & Risk Management Fellow"
            },
            {
                name: "Naveen Sandeepa",
                role: "Vice President & Lead Architect",
                username: "naveen-sandeepa",
                batch: "Batch '22",
                email: "kumarasdns.22@uom.lk",
                headline: "Financial Analytics & Platform Engineer"
            },
            {
                name: "Mayuri Lakshani",
                role: "Secretary",
                username: "mayuri-lakshani",
                batch: "Batch '22",
                email: "secretary.fsmss@uom.lk",
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
    },
    {
        id: "bpmss",
        slug: "bpmss",
        aliases: ["motss", "mot", "management-of-technology", "bpm"],
        code: "BPMSS",
        name: "Business Process Management Students' Society (BPMSS)",
        departmentName: "Department of Management of Technology",
        departmentCode: "MOT",
        tagline: "Bridging Cutting-Edge Enterprise Technology, Digital Transformation & Strategy",
        description: "The Business Process Management Students' Society (BPMSS) is the flagship student organisation of the Department of Management of Technology. Dedicated to grooming technology leaders, enterprise architects, and digital product managers.",
        workspaces: {
            notion: {
                workspaceName: "BFSU / BPMSS Strategy Hub",
                workspaceUrl: "https://notion.so/bfsu-uom/bpm-society",
                notionPageId: null
            },
            googleWorkspace: {
                sharedDriveUrl: "https://drive.google.com/drive/folders/1bpmss-technology-case-vault",
                calendarUrl: "https://calendar.google.com"
            }
        },
        notion: {
            workspaceName: "BFSU / BPMSS Strategy Hub",
            workspaceUrl: "https://notion.so/bfsu-uom/bpm-society",
            notionPageId: null,
            description: "The digital nerve centre for industrial technology projects, corporate sponsorship pipelines, and product architecture roadmaps.",
            resources: [
                { title: "Enterprise Technology Industry Directory", type: "Database", tag: "Industry", provider: "notion" },
                { title: "ERP & Digital Product Architecture Archive", type: "Drive Folder", tag: "Curriculum", provider: "google-drive" },
                { title: "Digital Product Architecture Case Studies", type: "Library", tag: "Curriculum", provider: "notion" },
                { title: "Tech Talk & Corporate Webinar Planner", type: "Calendar", tag: "Events", provider: "notion" },
                { title: "Alumni Technology Mentorship Register", type: "Directory", tag: "Alumni", provider: "notion" }
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
                email: "president.bpmss@uom.lk",
                headline: "Enterprise Systems Architect & Digital Strategist"
            },
            {
                name: "Warsha Julige",
                role: "Secretary",
                username: "warsha-julige",
                batch: "Batch '22",
                email: "secretary.bpmss@uom.lk",
                headline: "Technology Innovation Management & Product Operations"
            },
            {
                name: "Poorna Lakshan",
                role: "Vice President",
                username: "poorna-lakshan",
                batch: "Batch '22",
                email: "vp.bpmss@uom.lk",
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
