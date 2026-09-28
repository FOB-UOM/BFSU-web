/**
 * Verified Historical Leadership Constants
 * Safe for both Client Components and Server Components (no server-only dependencies)
 */

export const verifiedFacultyDeans = [
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

export { verifiedFacultyDeans as pastFacultyDeans };
