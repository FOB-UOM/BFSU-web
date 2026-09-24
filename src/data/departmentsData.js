/**
 * Academic Departments & Degree Specializations Configuration
 * Faculty of Business (FOB), University of Moratuwa
 * 
 * Centralized, editable configuration for academic departments, undergraduate honors degrees,
 * postgraduate master's programs, and official university portal links.
 * Maintainers can edit curriculum, degrees, and links here without altering JSX components.
 */

export const departmentsData = [
    {
        code: "DS",
        name: "Department of Decision Sciences",
        head: "Head, Dept. of Decision Sciences",
        portalUrl: "https://uom.lk/fob/decision-sciences",
        societySlug: "soba",
        societyName: "Society of Business Analytics (SOBA)",
        societyCode: "SOBA",
        specializationBadge: "Pioneering Flagship",
        specializationTitle: "Business Analytics",
        specializationSummary: "Sri Lanka's first undergraduate specialization in Business Analytics. Bridges predictive analytics, machine learning, optimization, and computing with executive business intelligence.",
        undergraduate: {
            degree: "Bachelor of Business Science (BBSc) Honours in Business Analytics",
            abbreviation: "BBSc Hons (Business Analytics)",
            focus: "Predictive Analytics, Machine Learning, Mathematical Optimization, Operations Research & Statistical Computing (Python/R).",
            curriculumHighlights: [
                "BBSc (Hons) in Business Analytics",
                "Master of Business Analytics (MBAn)"
            ]
        },
        postgraduate: {
            degree: "Master of Business Analytics (MBAn)",
            abbreviation: "MBAn",
            url: "https://uom.lk/fob/decision-sciences",
            description: "Advanced postgraduate training in big data architectures, artificial intelligence in business, and executive analytics strategy."
        },
        notionPageId: "30d3b460dd9e81dcb43bcff420397d32"
    },
    {
        code: "IM",
        name: "Department of Industrial Management",
        head: "Head, Dept. of Industrial Management",
        portalUrl: "https://uom.lk/fob/industrial-management",
        societySlug: "fsmss",
        societyName: "FSM Students' Society (FSMSS)",
        societyCode: "FSMSS",
        specializationBadge: "Quantitative Finance",
        specializationTitle: "Financial Services Management",
        specializationSummary: "Combines quantitative finance, algorithmic modeling, fintech, financial econometrics, and risk engineering for global capital markets and banking institutions.",
        undergraduate: {
            degree: "Bachelor of Business Science (BBSc) Honours in Financial Services Management",
            abbreviation: "BBSc Hons (Financial Services)",
            focus: "Quantitative Finance, Fintech, Algorithmic Trading, Financial Econometrics, Actuarial Concepts & Risk Engineering.",
            curriculumHighlights: [
                "BBSc (Hons) in Financial Services",
                "MSc in Project Management / Quant Finance"
            ]
        },
        postgraduate: {
            degree: "MSc in Project Management / Quantitative Finance",
            abbreviation: "MSc (PM / Quant)",
            url: "https://uom.lk/fob/industrial-management",
            description: "Master's level research and advanced professional practice in project stewardship and quantitative financial modeling."
        },
        notionPageId: "30d3b460dd9e81bfa07bf533a61bb294"
    },
    {
        code: "MOT",
        name: "Department of Management of Technology",
        head: "Head, Dept. of Management of Technology",
        portalUrl: "https://uom.lk/fob/management-of-technology",
        societySlug: "motss",
        societyName: "MOT Students' Society (MOTSS)",
        societyCode: "MOTSS",
        specializationBadge: "Enterprise Tech",
        specializationTitle: "Business Process Management",
        specializationSummary: "Focuses on enterprise systems architecture (SAP/ERP), technology commercialization, innovation strategy, and operational process optimization.",
        undergraduate: {
            degree: "Bachelor of Business Science (BBSc) Honours in Business Process Management",
            abbreviation: "BBSc Hons (BPM)",
            focus: "Enterprise Systems Architecture (SAP/ERP), Technology Commercialization, Digital Transformation Strategy & Innovation.",
            curriculumHighlights: [
                "BBSc (Hons) in BPM",
                "MBA in MOT & Supply Chain"
            ]
        },
        postgraduate: {
            degree: "MBA in Management of Technology (MOT) & Supply Chain",
            abbreviation: "MBA (MOT)",
            url: "https://uom.lk/fob/management-of-technology",
            description: "Executive postgraduate degree bridging technological innovation with strategic executive enterprise leadership."
        },
        notionPageId: null
    }
];

export const decennialConfig = {
    title: "Heading Towards 2027: A Decade of Pioneering Analytics",
    milestoneYear: 2027,
    foundedYear: 2017,
    durationText: "10 YRS",
    spanText: "2017 – 2027",
    summary: "Established in 2017, the Faculty of Business at the University of Moratuwa will celebrate its 10th Anniversary in 2027. Ten years of attracting Sri Lanka's highest A/L Commerce rankers and producing quantitative quants transforming global financial markets.",
    portalUrl: "/about#decennial"
};
