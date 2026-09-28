/**
 * Faculty Administration Operational Registry & Leadership Reference
 * Faculty of Business (FOB), University of Moratuwa
 * 
 * Purpose:
 * Centralized reference for active Deanery, Heads of Department (HODs),
 * Dean's Office Secretariat, and Academic Division Directors.
 * 
 * Solves the "Web Stalling" problem: Official university web pages often lag
 * months behind official University Council and Senate appointments.
 * This registry allows the Student Union and student committees to maintain
 * accurate, zero-friction institutional contact points.
 */

export const deanOfficeData = {
    roleCode: "DEAN",
    title: "Dean of the Faculty of Business",
    currentDean: "Prof. (Ms.) G. N. Kuruppu",
    tenureOrder: "4th Dean of the Faculty of Business",
    assumedDate: "September 15, 2026",
    termLabel: "September 2026 – Present",
    officeLocation: "Level 02, Faculty of Business Complex, University of Moratuwa",
    telephone: "+94 11 2640260 / +94 11 2650301 (Ext: 6501)",
    directTelephone: "+94 11 2640260",
    fax: "+94 11 2650365",
    email: "dean-fob@uom.lk",
    portalUrl: "https://uom.lk/business",
    governanceScope: "Apex academic and executive authority of the Faculty of Business, University Senate member, and Chairperson of the Faculty Board.",
    secretariat: {
        assistantRegistrar: "Ms. G. N. Pushpa Mallika",
        role: "Assistant Registrar (Faculty Administration)",
        email: "ar-fob@uom.lk",
        extension: "Ext: 6502",
        contactNotes: "Official faculty petitions, examination postponement inquiries, and disciplinary filings."
    },
    keyResponsibilities: [
        "Chairperson of the Faculty Board & Senate Academic Liaison",
        "Strategic Oversight of Academic Departments & Degree Accreditations",
        "Student Union Liaison & Formal Administrative Petition Review",
        "Undergraduate Examination Board & Degree Conferment Validation"
    ]
};

export const headsOfDepartmentRegistry = {
    DS: {
        code: "DS",
        departmentName: "Department of Decision Sciences",
        headTitle: "Head, Department of Decision Sciences",
        appointeeName: "Dr. (Mrs.) Sulanie D. Perera",
        assumedTerm: "September 2026 – Present",
        email: "head-ds@uom.lk",
        telephone: "+94 11 2640270 (Ext: 6702)",
        officeLocation: "Level 02, Faculty of Business Complex",
        specialization: "Business Analytics"
    },
    IM: {
        code: "IM",
        departmentName: "Department of Industrial Management",
        headTitle: "Head, Department of Industrial Management",
        appointeeName: "Prof. Dinesh Samarasinghe",
        assumedTerm: "September 2026 – Present",
        email: "head-im@uom.lk",
        telephone: "+94 11 2650301 (Ext: 5300)",
        officeLocation: "Level 03, Faculty of Business Complex",
        specialization: "Financial Services Management"
    },
    MOT: {
        code: "MOT",
        departmentName: "Department of Management of Technology",
        headTitle: "Head, Department of Management of Technology",
        appointeeName: "Dr. K. M. S. Senevirathne",
        assumedTerm: "January 2025 – Present",
        email: "head-mot@uom.lk",
        telephone: "+94 11 2650301 (Ext: 5200)",
        officeLocation: "Level 01, Faculty of Business Complex",
        specialization: "Business Process Management"
    }
};

export const academicDivisionsData = [
    {
        code: "UGS",
        name: "Undergraduate Studies Division (UGS)",
        leadRole: "Director, Undergraduate Studies",
        leadName: "Undergraduate Studies Directorate",
        location: "Level 02, Faculty of Business Complex",
        email: "ugs-fob@uom.lk",
        extension: "Ext: 6505",
        portalUrl: "https://uom.lk/business/undergraduate-studies",
        responsibilities: "Semester timetables, modular registration approvals, add/drop windows, GPA performance, and exam eligibility criteria."
    },
    {
        code: "PGS",
        name: "Postgraduate Studies Division",
        leadRole: "Director, Postgraduate Studies",
        leadName: "Postgraduate Studies Directorate",
        location: "Level 02, Faculty of Business Complex",
        email: "pgs-fob@uom.lk",
        portalUrl: "https://uom.lk/business",
        responsibilities: "MBAn, MBA in MOT, and MSc research degree curricula, thesis defenses, and corporate postgraduate diplomas."
    }
];

export const registryOperationalNotice = {
    title: "Operational Administrative Registry",
    description: "Maintained by the Student Union as an active operational reference for students and batch representatives to bridge the latency between University Council appointments and static university web updates.",
    lastVerified: "September 2026",
    status: "Active & Verified against University Council Circulars"
};
