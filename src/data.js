/**
 * Legacy Site Data Bridge
 * Re-exports and binds to centralized data modules (departmentsData, linksData).
 */

import { departmentsData } from './data/departmentsData';
import { academicPortals, facultySocialLinks } from './data/linksData';

export const siteData = {
    hero: {
        headline: "Transforming business through innovation",
        subHeadline: "The Business Faculty Students’ Union represents the students of the Faculty of Business, University of Moratuwa. The union works to support student welfare, encourage leadership, and create opportunities for personal and professional development."
    },
    facultyBrief: {
        description: "The Faculty of Business, University of Moratuwa is a dynamic academic community dedicated to shaping the next generation of business leaders and innovators. Established in 2017 under the prestigious University of Moratuwa, the faculty focuses on integrating modern technology with management education to meet the evolving needs of the global business environment. Through its Bachelor of Business Science (Hons) programme and specialized fields such as Business Analytics, Financial Services Management, and Business Process Management, the faculty develops strong analytical, managerial, and problem-solving skills in its students. With industry-oriented curricula, research, and collaboration with the corporate sector, the Faculty of Business is committed to producing highly skilled, industry-ready graduates capable of driving innovation and creating value in modern organizations."
    },
    about: {
        union: {
            title: "The Union",
            description: "The Business Faculty Students’ Union represents the students of the Faculty of Business, University of Moratuwa. The union works to support student welfare, encourage leadership, and create opportunities for personal and professional development. It organizes academic programs, networking events, social activities, and community projects that help students build connections and gain real-world experience. The union also acts as a bridge between students and the faculty, ensuring that student voices are heard and their needs are addressed."
        },
        faculty: {
            title: "The Faculty",
            description: "Offering the premier Bachelor of Business Science (Hons) program with specialized fields including Business Analytics, Financial Services Management, and Business Process Management."
        }
    },
    events: [
        {
            id: 1,
            title: "Sarasawi Panhida 2025",
            date: "Upcoming",
            location: "UoM Premises",
            icon: "Calendar"
        },
        {
            id: 2,
            title: "Iced Coffee Dansala 2025",
            date: "Upcoming",
            location: "Faculty of Business",
            icon: "Coffee"
        },
        {
            id: 3,
            title: "Hanthana Batch Trip – 24",
            date: "Completed",
            location: "Hanthana Mountain Range",
            icon: "MapPin"
        },
        {
            id: 4,
            title: "New Year Festival, Kodu Heena, and Abimanthra",
            date: "Upcoming",
            location: "University Ground",
            icon: "PartyPopper"
        }
    ],
    links: {
        resources: academicPortals.map(p => ({ name: p.title, url: p.url })),
        social: facultySocialLinks.map(s => ({ name: `BFSU ${s.platform}`, url: s.url }))
    }
};
