/**
 * Faculty Staff Profiles & Time-Bounded Appointments Data Layer
 * Faculty of Business (FOB), University of Moratuwa
 * 
 * Boundary Architecture:
 * - Unofficial internal operational ledger maintained by BFSU for student governance,
 *   research supervisor lookup, and institutional continuity.
 * - Tracks time-bounded appointments: both by person (career history) and by entity (past leadership).
 * - Implements individual user/profile resolution (`/u/[username]`) for every academic and staff member.
 */

export const facultyStaffProfiles = [
    {
        id: "10000000-0000-0000-0000-000000000001",
        username: "prof-gayithri-kuruppu",
        staffCategory: "academic",
        fullName: "G. N. Kuruppu",
        preferredName: "Gayithri Kuruppu",
        honorific: "Prof. (Ms.)",
        designation: "Professor in Management & Dean of the Faculty of Business",
        primaryDepartmentCode: "DEANERY",
        department: "Faculty of Business",
        email: "dean-fob@uom.lk",
        phone: "+94 11 2640260 (Ext: 6501)",
        officeLocation: "Level 02, Faculty of Business Complex",
        researchInterests: [
            "Strategic Management & Corporate Resilience",
            "Supply Chain Robustness & Risk Engineering",
            "Managerial Economics & Decision Governance",
            "Public Sector Transformation"
        ],
        googleScholarUrl: "https://scholar.google.com",
        researchGateUrl: "https://researchgate.net",
        teachingAreas: ["Strategic Management", "Supply Chain Operations", "Corporate Governance"],
        academicBio: "Appointed as the 4th Dean of the Faculty of Business on September 15, 2026. Renowned researcher in strategic management and supply chain resilience.",
        operationalScope: "Apex academic leadership, Faculty Board Chairperson, and University Senate representative."
    },
    {
        id: "10000000-0000-0000-0000-000000000002",
        username: "dr-sulanie-perera",
        staffCategory: "academic",
        fullName: "Sulanie D. Perera",
        preferredName: "Sulanie Perera",
        honorific: "Dr. (Mrs.)",
        designation: "Senior Lecturer (Grade I) & Head, Department of Decision Sciences",
        primaryDepartmentCode: "DS",
        department: "Department of Decision Sciences",
        email: "head-ds@uom.lk",
        phone: "+94 11 2640270 (Ext: 6702)",
        officeLocation: "Level 02, Faculty of Business Complex",
        researchInterests: [
            "Business Analytics & Data Science",
            "Predictive Modeling & Optimization",
            "Operations Research & Simulation",
            "Machine Learning in Decision Support"
        ],
        googleScholarUrl: "https://scholar.google.com",
        researchGateUrl: "https://researchgate.net",
        teachingAreas: ["Business Analytics", "Operations Research", "Prescriptive Modeling"],
        academicBio: "Head of the Department of Decision Sciences. Leading researcher in mathematical optimization, predictive modeling, and applied machine learning architectures.",
        operationalScope: "Departmental academic administration, Business Analytics specialization directorate, and MBAn postgraduate oversight."
    },
    {
        id: "10000000-0000-0000-0000-000000000003",
        username: "prof-dinesh-samarasinghe",
        staffCategory: "academic",
        fullName: "Dinesh Samarasinghe",
        preferredName: "Dinesh Samarasinghe",
        honorific: "Prof.",
        designation: "Professor & Head, Department of Industrial Management (Immediate Past Dean)",
        primaryDepartmentCode: "IM",
        department: "Department of Industrial Management",
        email: "head-im@uom.lk",
        phone: "+94 11 2650301 (Ext: 5300)",
        officeLocation: "Level 03, Faculty of Business Complex",
        researchInterests: [
            "Quantitative Finance & Market Econometrics",
            "Financial Modeling & Derivatives Valuation",
            "Consumer Behavior & Statistical Market Research",
            "Industrial Investment Portfolios"
        ],
        googleScholarUrl: "https://scholar.google.com",
        researchGateUrl: "https://researchgate.net",
        teachingAreas: ["Financial Econometrics", "Quantitative Finance", "Research Methodology"],
        academicBio: "Immediate Past Dean of the Faculty of Business and current Head of the Department of Industrial Management. Widely published academic in financial econometrics, quantitative capital market dynamics, and consumer economics.",
        operationalScope: "Departmental academic administration, Financial Services Management specialization oversight."
    },
    {
        id: "10000000-0000-0000-0000-000000000004",
        username: "dr-mahinda-senevirathne",
        staffCategory: "academic",
        fullName: "K. M. S. Senevirathne",
        preferredName: "Mahinda Senevirathne",
        honorific: "Dr.",
        designation: "Senior Lecturer & Head, Department of Management of Technology",
        primaryDepartmentCode: "MOT",
        department: "Department of Management of Technology",
        email: "head-mot@uom.lk",
        phone: "+94 11 2650301 (Ext: 5200)",
        officeLocation: "Level 01, Faculty of Business Complex",
        researchInterests: [
            "Enterprise Systems Architecture (SAP / ERP)",
            "Business Process Management & Mining",
            "Digital Transformation & Corporate Innovation",
            "Cloud Solutions Governance"
        ],
        googleScholarUrl: "https://scholar.google.com",
        researchGateUrl: "https://researchgate.net",
        teachingAreas: ["Enterprise Resource Planning (ERP)", "Business Process Engineering", "Technology Strategy"],
        academicBio: "Head of the Department of Management of Technology. Expert in corporate process automation, ERP workflows (SAP S/4HANA), and enterprise technology transformation.",
        operationalScope: "Departmental academic administration, Business Process Management specialization, and MBA in MOT oversight."
    },
    {
        id: "10000000-0000-0000-0000-000000000005",
        username: "pushpa-mallika",
        staffCategory: "non_academic",
        fullName: "G. N. Pushpa Mallika",
        preferredName: "Pushpa Mallika",
        honorific: "Ms.",
        designation: "Assistant Registrar (Faculty Administration)",
        primaryDepartmentCode: "SECRETARIAT",
        department: "Office of the Dean",
        email: "ar-fob@uom.lk",
        phone: "+94 11 2640260 (Ext: 6502)",
        officeLocation: "Dean's Office, Level 02, Faculty of Business Complex",
        researchInterests: [],
        teachingAreas: [],
        operationalScope: "Executive administration of the Dean's Office, official student petitions, examination board documentation, Faculty Board secretarial service, and disciplinary records."
    },
    {
        id: "10000000-0000-0000-0000-000000000006",
        username: "prof-sarath-dassanayake",
        staffCategory: "academic",
        fullName: "M. S. Dassanayake",
        preferredName: "Sarath Dassanayake",
        honorific: "Prof.",
        designation: "Senior Professor in Management of Technology & Former Dean",
        primaryDepartmentCode: "MOT",
        department: "Department of Management of Technology",
        email: "sarathd@uom.lk",
        phone: "+94 11 2650301 (Ext: 5200)",
        officeLocation: "Level 01, Faculty of Business Complex",
        researchInterests: [
            "Technology Commercialization & Innovation Strategy",
            "Small & Medium Enterprise (SME) Industrial Policy",
            "Entrepreneurial Management Ecosystems",
            "International Technology Transfer"
        ],
        googleScholarUrl: "https://scholar.google.com",
        researchGateUrl: "https://researchgate.net",
        teachingAreas: ["Technology Management", "Entrepreneurship", "Industrial Economics"],
        academicBio: "Former Dean of the Faculty of Business and Senior Professor in Management of Technology. Foundational leader in shaping the technological management and entrepreneurship curriculum at University of Moratuwa.",
        operationalScope: "Senior professorial mentorship, PhD research supervisions, and academic faculty advisor."
    },
    {
        id: "10000000-0000-0000-0000-000000000007",
        username: "prof-nd-gunawardena",
        staffCategory: "academic",
        fullName: "N. D. Gunawardena",
        preferredName: "Niranjan Gunawardena",
        honorific: "Prof.",
        designation: "Senior Professor & Founding Dean, Faculty of Business",
        primaryDepartmentCode: "DEANERY",
        department: "Faculty of Business",
        email: "ndg@uom.lk",
        officeLocation: "University of Moratuwa",
        researchInterests: [
            "Construction Project Management",
            "Strategic Infrastructure Development",
            "Higher Education Governance"
        ],
        googleScholarUrl: "https://scholar.google.com",
        academicBio: "Founding Dean of the Faculty of Business (2017 – 2020) and former Vice Chancellor of the University of Moratuwa. Instrumental in establishing the Faculty of Business as the third major faculty of the university.",
        operationalScope: "Foundational deanery governance and institutional leadership emeritus."
    }
];

export const facultyStaffAppointments = [
    // Prof. G. N. Kuruppu (Current Dean)
    {
        id: "apt-01",
        staffId: "10000000-0000-0000-0000-000000000001",
        entityCode: "DEANERY",
        roleTitle: "Dean of the Faculty of Business",
        roleType: "dean",
        startDate: "2026-09-15",
        endDate: null,
        termLabel: "September 2026 – Present",
        isCurrent: true,
        notes: "Assumed duties on September 15, 2026 as the 4th Dean of the Faculty of Business.",
        sourceReference: "University Council Appointment Circular"
    },
    // Prof. Dinesh Samarasinghe (3rd Dean, now Head of IM)
    {
        id: "apt-02",
        staffId: "10000000-0000-0000-0000-000000000003",
        entityCode: "DEANERY",
        roleTitle: "Dean of the Faculty of Business",
        roleType: "dean",
        startDate: "2023-01-01",
        endDate: "2026-09-14",
        termLabel: "2023 – September 2026",
        isCurrent: false,
        notes: "Served as Dean of the Faculty of Business prior to assuming Head of Department of Industrial Management.",
        sourceReference: "Council Appointment & Faculty Board Record"
    },
    {
        id: "apt-03",
        staffId: "10000000-0000-0000-0000-000000000003",
        entityCode: "IM",
        roleTitle: "Head, Department of Industrial Management",
        roleType: "hod",
        startDate: "2026-09-15",
        endDate: null,
        termLabel: "September 2026 – Present",
        isCurrent: true,
        notes: "Appointed Head of Industrial Management following the elevation of Prof. Kuruppu to Deanery.",
        sourceReference: "Faculty Board Appointment"
    },
    // Prof. Sarath Dassanayake (2nd Dean)
    {
        id: "apt-04",
        staffId: "10000000-0000-0000-0000-000000000006",
        entityCode: "DEANERY",
        roleTitle: "Dean of the Faculty of Business",
        roleType: "dean",
        startDate: "2020-01-01",
        endDate: "2023-01-01",
        termLabel: "2020 – 2023",
        isCurrent: false,
        notes: "2nd Dean of the Faculty of Business.",
        sourceReference: "University Council Appointment Record"
    },
    // Prof. N. D. Gunawardena (1st Founding Dean)
    {
        id: "apt-05",
        staffId: "10000000-0000-0000-0000-000000000007",
        entityCode: "DEANERY",
        roleTitle: "Dean of the Faculty of Business (Founding Dean)",
        roleType: "dean",
        startDate: "2017-01-01",
        endDate: "2020-01-01",
        termLabel: "2017 – 2020",
        isCurrent: false,
        notes: "Foundational architect and 1st Dean of the Faculty of Business.",
        sourceReference: "University Council Establishment Circular"
    },
    // Dr. Sulanie D. Perera (Head of DS)
    {
        id: "apt-06",
        staffId: "10000000-0000-0000-0000-000000000002",
        entityCode: "DS",
        roleTitle: "Head, Department of Decision Sciences",
        roleType: "hod",
        startDate: "2026-09-15",
        endDate: null,
        termLabel: "September 2026 – Present",
        isCurrent: true,
        notes: "Appointed Head of Decision Sciences on September 15, 2026.",
        sourceReference: "Faculty Board Appointment"
    },
    // Dr. K. M. S. Senevirathne (Head of MOT)
    {
        id: "apt-07",
        staffId: "10000000-0000-0000-0000-000000000004",
        entityCode: "MOT",
        roleTitle: "Head, Department of Management of Technology",
        roleType: "hod",
        startDate: "2025-01-01",
        endDate: null,
        termLabel: "2025 – Present",
        isCurrent: true,
        notes: "Head of Management of Technology overseeing BPM undergraduate and MOT MBA programs.",
        sourceReference: "Faculty Board Appointment"
    },
    // Ms. G. N. Pushpa Mallika (Assistant Registrar)
    {
        id: "apt-08",
        staffId: "10000000-0000-0000-0000-000000000005",
        entityCode: "SECRETARIAT",
        roleTitle: "Assistant Registrar (Faculty Administration)",
        roleType: "administrator",
        startDate: "2024-01-01",
        endDate: null,
        termLabel: "Current",
        isCurrent: true,
        notes: "Secretariat lead for Deanery administrative petitions and examination board filings.",
        sourceReference: "UoM Administrative Establishments"
    }
];

/**
 * Historical Leadership Continuity: Verified Deans Succession of FOB
 */
export const pastFacultyDeans = [
    {
        order: "4th Dean",
        name: "Prof. (Ms.) G. N. Kuruppu",
        term: "September 15, 2026 – Present",
        isCurrent: true,
        username: "prof-gayithri-kuruppu",
        notableInitiatives: "Current Dean of the Faculty of Business."
    },
    {
        order: "3rd Dean",
        name: "Prof. Dinesh Samarasinghe",
        term: "2023 – September 2026",
        isCurrent: false,
        username: "prof-dinesh-samarasinghe",
        notableInitiatives: "Immediate Past Dean • Current Head of the Department of Industrial Management."
    },
    {
        order: "2nd Dean",
        name: "Prof. Sarath Dassanayake",
        term: "2020 – 2023",
        isCurrent: false,
        username: "prof-sarath-dassanayake",
        notableInitiatives: "Former Dean • Senior Professor in Management of Technology."
    },
    {
        order: "1st Dean (Founding Dean)",
        name: "Prof. N. D. Gunawardena",
        term: "2017 – 2020",
        isCurrent: false,
        username: "prof-nd-gunawardena",
        notableInitiatives: "Foundational architect and 1st Dean of the Faculty of Business."
    }
];

/**
 * Helper: Retrieve all staff profiles for a given department / entity code
 * Enriched with active and historical time-bounded appointments.
 */
export function getStaffByDepartmentCode(deptCode) {
    const code = deptCode?.toUpperCase();
    return facultyStaffProfiles
        .filter(p => p.primaryDepartmentCode?.toUpperCase() === code)
        .map(staff => {
            const appointments = facultyStaffAppointments.filter(a => a.staffId === staff.id);
            const currentAppointment = appointments.find(a => a.isCurrent);
            const pastAppointments = appointments.filter(a => !a.isCurrent);
            return {
                ...staff,
                currentAppointment,
                pastAppointments,
                allAppointments: appointments
            };
        });
}

/**
 * Helper: Retrieve staff profile by username or id
 */
export function getStaffByUsername(username) {
    if (!username) return null;
    const lower = username.toLowerCase();
    const staff = facultyStaffProfiles.find(
        p => p.username?.toLowerCase() === lower || p.id.toLowerCase() === lower
    );
    if (!staff) return null;

    const appointments = facultyStaffAppointments
        .filter(a => a.staffId === staff.id)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

    return {
        ...staff,
        currentAppointment: appointments.find(a => a.isCurrent),
        pastAppointments: appointments.filter(a => !a.isCurrent),
        allAppointments: appointments
    };
}

/**
 * Helper: Retrieve a complete timeline of appointments for an individual person
 */
export function getPersonAppointmentHistory(staffId) {
    const staff = facultyStaffProfiles.find(p => p.id === staffId);
    if (!staff) return null;
    const appointments = facultyStaffAppointments
        .filter(a => a.staffId === staffId)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    return {
        ...staff,
        appointments
    };
}

/**
 * Helper: Retrieve all historical appointees for an entity (e.g. all past HODs or Deans)
 */
export function getEntityAppointmentHistory(entityCode) {
    const code = entityCode?.toUpperCase();
    return facultyStaffAppointments
        .filter(a => a.entityCode?.toUpperCase() === code)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .map(apt => {
            const staff = facultyStaffProfiles.find(p => p.id === apt.staffId);
            return {
                ...apt,
                staff
            };
        });
}
