/**
 * Centralized Useful Links, Portals & Academic Documents Directory
 * Faculty of Business (FOB), University of Moratuwa
 * 
 * Single source of truth for all academic portals, timetable documents,
 * academic calendars, departmental websites, and campus facilities.
 * Editable by maintainers without modifying any React/JSX components.
 */

export const academicPortals = [
    {
        id: "moodle",
        tag: "DAILY ACADEMIC LMS",
        title: "Moodle UoM (online.uom.lk)",
        sub: "Primary digital instruction environment for daily course modules, lecture slides, assignments, and tutorial submissions.",
        url: "https://online.uom.lk",
        targetUrl: "online.uom.lk",
        category: "E-Learning",
        authType: "UoM LDAP / Central SSO",
        isUniversityWide: true
    },
    {
        id: "learnorg / lms",
        tag: "ADMIN & REGISTRY LMS",
        title: "LearnOrg System (lms.uom.lk)",
        sub: "Official university academic records, semester module enrollments, GPA records, and exam admission clearance.",
        url: "https://lms.uom.lk",
        targetUrl: "lms.uom.lk",
        category: "E-Learning",
        authType: "UoM Central Credentials",
        isUniversityWide: true
    },
    {
        id: "webmail",
        tag: "COMMUNICATIONS & MS 365",
        title: "UoM Webmail & Microsoft 365",
        sub: "Official institutional @uom.lk inbox, Microsoft Office 365 cloud tools, Teams, and institutional OneDrive.",
        url: "https://webmail.uom.lk",
        targetUrl: "webmail.uom.lk",
        category: "Productivity",
        authType: "Microsoft Entra ID (@uom.lk)",
        isUniversityWide: true
    },
    {
        id: "cites-portal",
        tag: "CENTRAL IT",
        title: "CITES Student Portal & Helpdesk",
        sub: "University network credentials, eduroam Wi-Fi configuration, software subscriptions, and IT helpdesk ticketing.",
        url: "https://uom.lk/cites",
        targetUrl: "uom.lk/cites",
        category: "IT Services",
        authType: "UoM Central Helpdesk",
        isUniversityWide: true
    }
];

export const semesterTimetables = [
    {
        id: "exam-sem1-3",
        title: "Exam TimeTable Sem 1, 3 (July 2026 Resumed)",
        batch: "All Batches • Examination Division",
        type: "PDF Document",
        category: "Examinations",
        url: "https://uom.lk/sites/default/files/business/files/Exam%20TimeTable%20Sem%201%2C3%202026%20July%20Resume%20Stduents%20View_0.pdf"
    },
    {
        id: "tt-intake-2022",
        title: "Updated Timetable — Intake 2022 (Semester 08)",
        batch: "Intake 2022 • Level 4",
        type: "PDF Document",
        category: "Lectures",
        url: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202022%20Semester%2008_0.pdf"
    },
    {
        id: "tt-intake-2023",
        title: "Updated Timetable — Intake 2023 (Semester 06)",
        batch: "Intake 2023 • Level 3",
        type: "PDF Document",
        category: "Lectures",
        url: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202023%20Semester%2006_0.pdf"
    },
    {
        id: "tt-intake-2024",
        title: "Updated Timetable — Intake 2024 (Semester 04)",
        batch: "Intake 2024 • Level 2",
        type: "PDF Document",
        category: "Lectures",
        url: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202024%20Semester%2004_0.pdf"
    },
    {
        id: "tt-intake-2025",
        title: "Updated Timetable — Intake 2025 (Semester 02)",
        batch: "Intake 2025 • Level 1",
        type: "PDF Document",
        category: "Lectures",
        url: "https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202025%20Semester%2002_0.pdf"
    },
    {
        id: "sem-deadlines",
        title: "Semester Deadlines Schedule (Intakes 2020–2024)",
        batch: "Academic Registry Division",
        type: "DOCX Schedule",
        category: "Deadlines",
        url: "https://uom.lk/sites/default/files/business/files/Semester%20Deadlines%20Inatke%202020-2024_0.docx"
    }
];

export const academicCalendarConfig = {
    title: "Official Academic Calendar (2025/2026 Academic Year)",
    portalUrl: "https://uom.lk/business/undergraduate-studies/academic-calendar",
    keyDates: [
        { label: "Semester Commencement", date: "August 18, 2025" },
        { label: "Mid-Semester Recess", date: "October 13 – 17, 2025" },
        { label: "End-Semester Examinations", date: "December 08 – 23, 2025" },
        { label: "Vacation & Grade Publication", date: "December 24 – January 11, 2026" }
    ]
};

export const campusFacilities = [
    {
        id: "main-library",
        tag: "RESEARCH & BORROWING",
        title: "University Library Catalog & E-Repository",
        sub: "Access digital research databases, ScienceDirect, Emerald, past examination repositories, and book renewals.",
        url: "https://uom.lk/lib",
        targetUrl: "uom.lk/lib",
        category: "Library"
    },
    {
        id: "medical-center",
        tag: "STUDENT HEALTH",
        title: "University Health Centre & Medical Board",
        sub: "On-campus consultation, emergency triage, prescription dispensaries, and official medical certificate submissions.",
        url: "https://uom.lk/health",
        targetUrl: "uom.lk/health",
        category: "Welfare"
    },
    {
        id: "physical-education",
        tag: "SPORTS & RECREATION",
        title: "Physical Education Division & Gymnasium",
        sub: "Inter-faculty athletics, indoor badminton courts, swimming pool access, and sports equipment reservations.",
        url: "https://uom.lk/physical-education",
        targetUrl: "uom.lk/pe",
        category: "Recreation"
    },
    {
        id: "student-welfare",
        tag: "HOSTELS & BURSARIES",
        title: "Student Welfare Division & Financial Aid",
        sub: "Hostel accommodation, Mahapola higher education scholarships, university bursaries, and canteen coordination.",
        url: "https://uom.lk/welfare",
        targetUrl: "uom.lk/welfare",
        category: "Welfare"
    },
    {
        id: "career-guidance",
        tag: "CAREER PLACEMENTS",
        title: "Career Guidance Unit (CGU)",
        sub: "Industry resume reviews, mock interviews, leadership bootcamps, and annual corporate recruitment fairs.",
        url: "https://uom.lk/cgu",
        targetUrl: "uom.lk/cgu",
        category: "Career"
    }
];

/**
 * Level 0 Central University Institutional Entities
 * Explicitly distinguished from Faculty-level and Department-level bodies.
 */
export const centralUniversityEntities = [
    {
        code: "CITES",
        name: "Center for Information Technology & Emerging Services",
        level: "university",
        scope: "All Faculties & Staff",
        primaryUrl: "https://uom.lk/cites",
        keyRoles: [
            { role: "Director CITES", responsibility: "University network backbone, campus fiber & eduroam" },
            { role: "Systems Administrator", responsibility: "LearnOrg LMS, server maintenance & Microsoft 365 licensing" },
            { role: "IT Helpdesk Lead", responsibility: "Student ticket resolution, email recovery & Wi-Fi support" }
        ],
        touchpoints: [
            { title: "CITES Student Portal", url: "https://uom.lk/cites" },
            { title: "Helpdesk Ticket System", url: "https://helpdesk.uom.lk" },
            { title: "UoM IT Setup Wiki", url: "https://wiki.uom.lk" }
        ]
    },
    {
        code: "LIBRARY",
        name: "University of Moratuwa Main Library",
        level: "university",
        scope: "All Undergraduate & Postgraduate Researchers",
        primaryUrl: "https://uom.lk/lib",
        keyRoles: [
            { role: "Librarian", responsibility: "Acquisitions, inter-library exchange & digital archive policy" },
            { role: "Senior Assistant Librarian (Reader Services)", responsibility: "Book borrowing, fine appeals & study cubicle access" },
            { role: "Digital Repository Officer", responsibility: "Past exam papers, thesis repository & journal access (Emerald, ScienceDirect)" }
        ],
        touchpoints: [
            { title: "Online Public Access Catalog (OPAC)", url: "https://uom.lk/lib" },
            { title: "Past Examination Papers Vault", url: "https://uom.lk/lib/past-papers" }
        ]
    },
    {
        code: "HEALTH",
        name: "University Health Centre & Medical Board",
        level: "university",
        scope: "All Students & Staff",
        primaryUrl: "https://uom.lk/health",
        keyRoles: [
            { role: "Chief Medical Officer (CMO)", responsibility: "Emergency outpatient care, preventative health & hospital transfers" },
            { role: "University Medical Board", responsibility: "Validating medical certificates for missed examinations and continuous assessments" },
            { role: "Pharmacist", responsibility: "Prescription fulfillment and first-aid supplies" }
        ],
        touchpoints: [
            { title: "Medical Center Consultation Desk", url: "https://uom.lk/health" },
            { title: "Medical Leave Submission Guide", url: "https://uom.lk/health/medical-guidelines" }
        ]
    },
    {
        code: "WELFARE",
        name: "Student Welfare Division & Proctorial Board",
        level: "university",
        scope: "Student Well-being, Accommodations & Safety",
        primaryUrl: "https://uom.lk/welfare",
        keyRoles: [
            { role: "Senior Student Counselor", responsibility: "Confidential academic stress counseling, dispute mediation & wellbeing" },
            { role: "Proctor", responsibility: "Campus discipline, code of conduct enforcement & security liaison" },
            { role: "Senior Assistant Registrar (Student Welfare)", responsibility: "Hostel hall allocations, Mahapola scholarships & canteen subsidies" }
        ],
        touchpoints: [
            { title: "Student Welfare Division Portal", url: "https://uom.lk/welfare" },
            { title: "Hostel Allocation Noticeboard", url: "https://uom.lk/welfare/hostels" },
            { title: "Mahapola / Bursary Verification Desk", url: "https://uom.lk/welfare/scholarships" }
        ]
    },
    {
        code: "PE",
        name: "Physical Education Division & Sports Council",
        level: "university",
        scope: "University Sports & Fitness",
        primaryUrl: "https://uom.lk/physical-education",
        keyRoles: [
            { role: "Director of Physical Education", responsibility: "Inter-university games, faculty tournaments & facility governance" },
            { role: "Gymnasium & Pool Custodian", responsibility: "Fitness center memberships, equipment loans & court reservations" },
            { role: "Faculty Sports Captains", responsibility: "Faculty of Business team selection & training schedules" }
        ],
        touchpoints: [
            { title: "Physical Education Portal", url: "https://uom.lk/physical-education" }
        ]
    },
    {
        code: "CGU",
        name: "Career Guidance Unit (CGU)",
        level: "university",
        scope: "Professional Development & Industry Placement",
        primaryUrl: "https://uom.lk/cgu",
        keyRoles: [
            { role: "Director CGU", responsibility: "National corporate partnerships & graduate employability frameworks" },
            { role: "Career Advisor", responsibility: "CV polishing, mock technical interviews & soft skill workshops" },
            { role: "Faculty Industry Liaison", responsibility: "Faculty of Business annual internship matchmaking" }
        ],
        touchpoints: [
            { title: "CGU Career Fair Portal", url: "https://uom.lk/cgu" }
        ]
    }
];

import { 
    OFFICIAL_FACULTY_SOCIAL_LINKS, 
    OFFICIAL_UNION_CHANNELS,
    OFFICIAL_SOCIAL_LINKS,
    OFFICIAL_ACADEMIC_PORTALS,
    OFFICIAL_DIRECT_PORTALS
} from '../lib/constants/links';

export {
    OFFICIAL_FACULTY_SOCIAL_LINKS,
    OFFICIAL_UNION_CHANNELS,
    OFFICIAL_SOCIAL_LINKS,
    OFFICIAL_ACADEMIC_PORTALS,
    OFFICIAL_DIRECT_PORTALS
};

/**
 * Backwards-compatible immutable exports
 */
export const facultySocialLinks = OFFICIAL_FACULTY_SOCIAL_LINKS;
export const unionContactChannels = OFFICIAL_UNION_CHANNELS;

