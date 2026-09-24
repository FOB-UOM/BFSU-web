/**
 * Alumni Fellowship, Mentorship & Directory Spotlights Configuration
 * Faculty of Business (FOB), University of Moratuwa
 * 
 * Centralized data store for alumni pillars, verified spotlights, and career pathways.
 */

export const alumniPillars = [
    {
        id: "mentorship",
        title: "Alumni Mentorship & Practicum",
        description: "Direct mentorship pairings connecting senior undergraduates with graduates across corporate banking, management consultancies, and tech enterprises.",
        iconName: "GraduationCap"
    },
    {
        id: "dispatch",
        title: "Placement Dispatch",
        description: "Exclusive internship notifications, graduate management trainee pipelines, and recruitment calls directly from alumni employers.",
        iconName: "Briefcase"
    },
    {
        id: "fellowship",
        title: "Global Chapter & Fellowship",
        description: "Reconnecting graduates across Sri Lanka, the UK, Australia, Singapore, and global financial hubs to maintain faculty fellowship.",
        iconName: "Network"
    }
];

export const fallbackAlumniSpotlights = [
    {
        id: "sp-1",
        full_name: "Kavindu Wickramasinghe",
        batch: "Batch '21",
        department: "Department of Decision Sciences",
        graduation_year: "2021",
        current_position: "Lead Quant Analyst",
        current_company: "London Stock Exchange Group",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
        bio: "Predictive Modeling of Port Container Congestion via Stochastic Queueing",
        role: "alumni",
        is_verified: true,
        linkedin_url: "https://linkedin.com",
        is_mentor_volunteer: true,
    },
    {
        id: "sp-2",
        full_name: "Dinithi Perera",
        batch: "Batch '20",
        department: "Department of Management of Technology",
        graduation_year: "2020",
        current_position: "Risk & Liquidity Consultant",
        current_company: "Deloitte South Asia",
        avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
        bio: "Decentralized Liquidity Risks in Microfinance Lending Facilities",
        role: "alumni",
        is_verified: true,
        linkedin_url: "https://linkedin.com",
        is_mentor_volunteer: true,
    },
    {
        id: "sp-3",
        full_name: "Senura Ranatunga",
        batch: "Batch '22",
        department: "Department of Industrial Management",
        graduation_year: "2022",
        current_position: "Enterprise Systems Architect",
        current_company: "MAS Holdings",
        avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
        bio: "Robotic Process Automation in Multi-Facility Apparel ERP Export Compliance",
        role: "alumni",
        is_verified: true,
        linkedin_url: "https://linkedin.com",
        is_mentor_volunteer: false,
    }
];
