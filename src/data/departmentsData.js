/**
 * Academic Departments & Degree Specializations Configuration
 * Faculty of Business (FOB), University of Moratuwa
 * 
 * Boundary Architecture:
 * - Official Department Administration: Governed directly by UoM Senate & Faculty Board.
 *   Verified portal URLs, official heads, and staff rosters point to uom.lk/business.
 * - Student Perspective & Life: Curated by the Student Union (BFSU) and respective
 *   Departmental Student Societies (SOBA, BPMSS, FSMSS).
 */
import { headsOfDepartmentRegistry } from './facultyAdministrationData';

export const departmentsData = [
    {
        code: "DS",
        slug: "decision-sciences",
        aliases: ["ds", "business-analytics", "decision-science"],
        name: "Department of Decision Sciences",
        head: headsOfDepartmentRegistry.DS.headTitle,
        headName: headsOfDepartmentRegistry.DS.appointeeName,
        contactEmail: headsOfDepartmentRegistry.DS.email,
        departmentEmail: "ds@uom.lk",
        officeLocation: headsOfDepartmentRegistry.DS.officeLocation,
        telephone: headsOfDepartmentRegistry.DS.telephone,
        portalUrl: "https://uom.lk/business/decision-sciences",
        staffRosterUrl: "https://uom.lk/business/decision-sciences",
        societySlug: "soba",
        societyName: "Society of Business Analytics (SOBA)",
        societyCode: "SOBA",
        specializationBadge: "Pioneering Flagship",
        specializationTitle: "Business Analytics",
        specializationSummary: "Sri Lanka's first undergraduate specialization in Business Analytics. Bridges predictive analytics, machine learning, optimization, and computing with executive business intelligence.",
        overview: "The Department of Decision Sciences (DS) at the Faculty of Business, University of Moratuwa, is the country's pioneer in quantitative business science and algorithmic decision-making. Established to bridge rigorous mathematical sciences with contemporary data engineering and managerial strategy, the department equips graduates with mathematical modeling, predictive econometrics, machine learning pipelines, and operations research mastery.",
        facilities: [
            { name: "Advanced Business Analytics Laboratory", description: "High-performance computational workstations configured for large-scale data science and neural network training." },
            { name: "Decision Optimization Computing Cluster", description: "Dedicated node cluster for stochastic modeling, discrete-event simulation, and linear programming algorithms." },
            { name: "Executive Datathon Arena", description: "Collaborative sandbox space equipped for inter-university analytics hackathons and research sprints." }
        ],
        researchThemes: [
            "Predictive Financial & Macroeconomic Modeling",
            "Algorithmic Supply Chain & Network Optimization",
            "Natural Language Processing for Corporate Disclosures",
            "Reinforcement Learning in Dynamic Resource Scheduling"
        ],
        undergraduate: {
            degree: "Bachelor of Business Science (BBSc) Honours in Business Analytics",
            abbreviation: "BBSc Hons (Business Analytics)",
            duration: "4 Years (Full-Time)",
            focus: "Predictive Analytics, Machine Learning, Mathematical Optimization, Operations Research & Statistical Computing (Python/R).",
            curriculumHighlights: [
                "Applied Statistical Inference & Bayesian Computing",
                "Machine Learning & Deep Neural Systems",
                "Operations Research & Linear/Non-Linear Optimization",
                "Big Data Architectures, Cloud Pipelines & SQL/NoSQL",
                "Prescriptive Analytics & Executive Decision Support",
                "Capstone Research Thesis & Corporate Practicum"
            ],
            careerProspects: [
                "Data Scientist & AI Strategist",
                "Business Intelligence Lead",
                "Operations Research Consultant",
                "Algorithmic Optimization Specialist",
                "Quantitative Risk Analyst"
            ]
        },
        postgraduate: {
            degree: "Master of Business Analytics (MBAn)",
            abbreviation: "MBAn",
            url: "https://uom.lk/business/decision-sciences",
            description: "Advanced postgraduate training in big data architectures, artificial intelligence in business, and executive analytics strategy for working professionals and industry researchers."
        },
        studentPerspective: {
            culture: "Renowned within the faculty for intense late-night datathon sprints, competitive analytics hackathons, and vibrant peer code review sessions.",
            peerInitiatives: [
                "Annual Datathon & Inter-University Analytics Challenge",
                "Peer-to-Peer Python, R & SQL Coding Clinics",
                "Senior-Junior Machine Learning Mentorship Circles",
                "Industry Data Leader Fireside Keynotes"
            ],
            communityQuote: "We transform complex raw data streams into high-conviction strategic decisions for industry leaders."
        },
        notionPageId: "30d3b460dd9e81dcb43bcff420397d32"
    },
    {
        code: "IM",
        slug: "industrial-management",
        aliases: ["im", "financial-services", "fsm", "industrial-mgmt"],
        name: "Department of Industrial Management",
        head: headsOfDepartmentRegistry.IM.headTitle,
        headName: headsOfDepartmentRegistry.IM.appointeeName,
        contactEmail: headsOfDepartmentRegistry.IM.email,
        departmentEmail: "im@uom.lk",
        officeLocation: headsOfDepartmentRegistry.IM.officeLocation,
        telephone: headsOfDepartmentRegistry.IM.telephone,
        portalUrl: "https://uom.lk/business/industrial-management",
        staffRosterUrl: "https://uom.lk/business/industrial-management",
        societySlug: "fsmss",
        societyName: "FSM Students' Society (FSMSS)",
        societyCode: "FSMSS",
        specializationBadge: "Quantitative Finance",
        specializationTitle: "Financial Services Management",
        specializationSummary: "Combines quantitative finance, algorithmic modeling, fintech, financial econometrics, and risk engineering for global capital markets and banking institutions.",
        overview: "The Department of Industrial Management (IM) prepares undergraduates to lead high-stakes financial institutions, investment funds, multinational supply networks, and fintech innovations. Grounded in quantitative econometrics, actuarial principles, and operations engineering, the department is internationally recognized for grooming financial analysts and operations leaders.",
        facilities: [
            { name: "Financial Simulation & Quantitative Trading Lab", description: "Real-time market feeds and stochastic valuation terminal stations for securities and derivatives modeling." },
            { name: "Industrial Operations Simulation Studio", description: "Process simulation environment modeling manufacturing throughput, lean operations, and inventory queues." },
            { name: "Fintech Research & Sandbox Desk", description: "Development sandbox for blockchain protocols, payment gateway security, and algorithmic retail finance." }
        ],
        researchThemes: [
            "High-Frequency Algorithmic Market Dynamics",
            "Credit Risk Modeling & Macro-Stress Testing",
            "Supply Chain Robustness under Geopolitical Volatility",
            "Fintech Inclusion & Digital Banking Architecture"
        ],
        undergraduate: {
            degree: "Bachelor of Business Science (BBSc) Honours in Financial Services Management",
            abbreviation: "BBSc Hons (Financial Services)",
            duration: "4 Years (Full-Time)",
            focus: "Quantitative Finance, Fintech, Algorithmic Trading, Financial Econometrics, Actuarial Concepts & Risk Engineering.",
            curriculumHighlights: [
                "Stochastic Calculus & Financial Asset Pricing",
                "Advanced Time Series Econometrics & Forecasting",
                "Fintech Infrastructure, Blockchain & RegTech",
                "Portfolio Optimization & Quantitative Trading Strategies",
                "Enterprise Risk Governance & Basel Regulatory Frameworks",
                "Industrial Internship & Applied Financial Research"
            ],
            careerProspects: [
                "Quantitative Financial Analyst (Quant)",
                "Investment Banker & Equity Research Lead",
                "Fintech Product Manager",
                "Chief Risk Officer / Risk Engineer",
                "Actuarial & Treasury Consultant"
            ]
        },
        postgraduate: {
            degree: "MSc in Project Management / Quantitative Finance",
            abbreviation: "MSc (PM / Quant)",
            url: "https://uom.lk/business/industrial-management",
            description: "Master's level research and advanced professional practice in project stewardship and quantitative financial modeling."
        },
        studentPerspective: {
            culture: "Characterized by rigorous market simulation discussions, live portfolio pitch contests, CFA study circles, and deep-dive macro-economic debates.",
            peerInitiatives: [
                "Virtual Equity Portfolio Management Competition",
                "Investment Banking & Quantitative Finance Case Clinics",
                "Fintech & RegTech Student Hackathons",
                "Capital Markets Industry Immersion Trips"
            ],
            communityQuote: "We engineer precision risk algorithms and modern financial systems for global enterprise resilience."
        },
        notionPageId: "30d3b460dd9e81bfa07bf533a61bb294"
    },
    {
        code: "MOT",
        slug: "management-of-technology",
        aliases: ["mot", "business-process-management", "bpm", "technology-management"],
        name: "Department of Management of Technology",
        head: headsOfDepartmentRegistry.MOT.headTitle,
        headName: headsOfDepartmentRegistry.MOT.appointeeName,
        contactEmail: headsOfDepartmentRegistry.MOT.email,
        departmentEmail: "mot@uom.lk",
        officeLocation: headsOfDepartmentRegistry.MOT.officeLocation,
        telephone: headsOfDepartmentRegistry.MOT.telephone,
        portalUrl: "https://uom.lk/business/management-of-technology",
        staffRosterUrl: "https://uom.lk/business/management-of-technology",
        societySlug: "bpmss",
        societyName: "BPM Students' Society (BPMSS)",
        societyCode: "BPMSS",
        specializationBadge: "Enterprise Systems",
        specializationTitle: "Business Process Management",
        specializationSummary: "Focuses on enterprise systems architecture (SAP/ERP), digital transformation, technology strategy, operations management, and corporate process engineering.",
        overview: "The Department of Management of Technology (MOT) is the pioneer in bridging emerging digital engineering with corporate strategy, supply chain management, and enterprise transformation. Undergraduates gain hands-on mastery in enterprise resource planning (ERP), business process re-engineering (BPR), and technological innovation management.",
        facilities: [
            { name: "Enterprise Systems (ERP) Simulation Suite", description: "Dedicated laboratory licensed for SAP S/4HANA workflows, process automation, and corporate supply chain simulation." },
            { name: "Digital Innovation & Design Thinking Studio", description: "Agile ideation workspace equipped with collaborative design thinking tools and UI/UX prototyping environments." },
            { name: "Process Mining & Operations Sandbox", description: "High-throughput environment for automated event-log analysis, bottleneck discovery, and workflow optimization." }
        ],
        researchThemes: [
            "AI-Driven Automated Process Mining & Conformance",
            "Digital Transformation in Emerging Markets",
            "Sustainable Technology Commercialization",
            "Enterprise Architecture Resilience & Cyber-Risk"
        ],
        undergraduate: {
            degree: "Bachelor of Business Science (BBSc) Honours in Business Process Management",
            abbreviation: "BBSc Hons (BPM)",
            duration: "4 Years (Full-Time)",
            focus: "Enterprise Systems (ERP/SAP), Digital Transformation Strategy, Process Mining, Operations Optimization & Technology Innovation.",
            curriculumHighlights: [
                "Enterprise Resource Planning (ERP & SAP S/4HANA)",
                "Business Process Modeling & Automated Mining (BPMN)",
                "Digital Transformation & Corporate Innovation Strategy",
                "Supply Chain Engineering & Global Logistics",
                "Cloud Solutions Architecture & IT Governance",
                "Enterprise Practicum & Real-World Corporate Consultancy"
            ],
            careerProspects: [
                "Enterprise Systems & ERP Consultant (SAP)",
                "Digital Transformation Lead",
                "Business Process Architect",
                "Technology Operations Director",
                "Supply Chain Solutions Consultant"
            ]
        },
        postgraduate: {
            degree: "MBA in Management of Technology (MBA in MOT)",
            abbreviation: "MBA (MOT)",
            url: "https://uom.lk/business/management-of-technology",
            description: "The premier postgraduate degree in Sri Lanka for senior executives, technology entrepreneurs, and engineering leaders."
        },
        studentPerspective: {
            culture: "A dynamic blend of tech startup mindset, enterprise architecture discussions, ERP certification study teams, and industrial innovation symposiums.",
            peerInitiatives: [
                "BPM Tech Summit & Enterprise Innovation Showcase",
                "ERP & SAP Hands-on Peer Bootcamps",
                "Design Thinking & Digital Hackathons",
                "Corporate Process Consulting Clinics"
            ],
            communityQuote: "We architect the digital backbones and operational intelligence that modernize modern enterprises."
        },
        notionPageId: "30d3b460dd9e81dfb7fefc7c10b7194f"
    }
];

export const facultyCharter = {
    facultyName: "Faculty of Business",
    universityName: "University of Moratuwa",
    establishedYear: 2017,
    vision: "To be the leading center of excellence in developing visionary business leaders and tech-driven management pioneers across South Asia.",
    mission: "To foster cutting-edge business intelligence, quantitative finance, and technological innovation through research-led education, industry collaboration, and ethical leadership.",
    divisions: [
        {
            name: "Undergraduate Studies Division (UGS)",
            role: "Academic coordination, semester scheduling, and student academic performance.",
            portalUrl: "https://uom.lk/business/undergraduate-studies"
        },
        {
            name: "Postgraduate Studies Division",
            role: "MBAn, MBA in MOT, and MSc research degree programs for corporate leaders.",
            portalUrl: "https://uom.lk/business"
        }
    ]
};

export const decennialConfig = {
    title: "A Decade of Faculty Legacy",
    summary: "From foundational origins to South Asia's preeminent center for business analytics, technology strategy, and financial engineering.",
    durationText: "10+ Years",
    spanText: "2017 – Present",
    establishedYear: 2017
};
