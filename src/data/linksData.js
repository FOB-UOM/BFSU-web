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
        tag: "DAILY ACADEMIC",
        title: "Moodle UoM Portal",
        sub: "Course modules, lecture notes, tutorial uploads, and assignment submissions.",
        url: "https://online.uom.lk",
        targetUrl: "online.uom.lk",
        category: "E-Learning"
    },
    {
        id: "faculty-lms",
        tag: "FACULTY LMS",
        title: "Faculty LMS (lms.uom.lk)",
        sub: "Official university learning management system, semester course enrolments, and assessment tracking.",
        url: "https://lms.uom.lk",
        targetUrl: "lms.uom.lk",
        category: "E-Learning"
    },
    {
        id: "cites-portal",
        tag: "CENTRAL IT",
        title: "CITES Student Portal",
        sub: "University email administration, network credentials, and campus Wi-Fi access management.",
        url: "https://uom.lk/cites",
        targetUrl: "uom.lk/cites",
        category: "IT Services"
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
        id: "career-guidance",
        tag: "CAREER PLACEMENTS",
        title: "Career Guidance Unit (CGU)",
        sub: "Industry resume reviews, mock interviews, leadership bootcamps, and annual corporate recruitment fairs.",
        url: "https://uom.lk/cgu",
        targetUrl: "uom.lk/cgu",
        category: "Career"
    }
];

export const facultySocialLinks = [
    {
        platform: "LinkedIn",
        name: "Business Faculty Students' Union",
        url: "https://www.linkedin.com/company/bfsu-uom",
        handle: "bfsu-uom"
    },
    {
        platform: "Facebook",
        name: "BFSU Official Community",
        url: "https://facebook.com/bfsu.uom",
        handle: "bfsu.uom"
    },
    {
        platform: "YouTube",
        name: "BFSU Media Unit",
        url: "https://youtube.com/@bfsu_uom",
        handle: "@bfsu_uom"
    }
];

export const unionContactChannels = {
    email: "bfsu@uom.lk",
    hotline: "+94 11 265 0301",
    officeLocation: "Students' Union Room, Level 01, Faculty of Business, University of Moratuwa",
    welfareFormUrl: "/explore#room",
    feedbackFormUrl: "https://notion.so/bfsu-uom/feedback",
    administrationPortalUrl: "https://uom.lk/business"
};
