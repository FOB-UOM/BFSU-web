/**
 * Unbreakable Official Link & Channel Constants
 * Business Faculty Students' Union (BFSU) • University of Moratuwa
 * 
 * All exports are recursively deep-frozen using Object.freeze to guarantee
 * runtime immutability against prototype tampering, malicious overrides, or memory poisoning.
 */

import { deepFreeze } from '../security/safeLinks.js';

/**
 * Official BFSU Social Media Profiles
 * Strictly immutable and pre-validated.
 */
export const OFFICIAL_SOCIAL_LINKS = deepFreeze({
    LINKEDIN: {
        platform: 'LinkedIn',
        name: "Business Faculty Students' Union",
        url: 'https://www.linkedin.com/company/business-faculty-students-union-university-of-moratuwa/',
        handle: 'business-faculty-students-union-university-of-moratuwa',
        verified: true
    },
    FACEBOOK: {
        platform: 'Facebook',
        name: 'BFSU Official Community',
        url: 'https://www.facebook.com/BfacMora',
        handle: 'BfacMora',
        verified: true
    },
    YOUTUBE: {
        platform: 'YouTube',
        name: 'Faculty of Business • Media Unit',
        url: 'https://youtube.com/@facultyofbusinessuom',
        handle: '@facultyofbusinessuom',
        verified: true
    }
});

/**
 * Array export for simple iteration in UI components (e.g. Footer, Navbar).
 */
export const OFFICIAL_FACULTY_SOCIAL_LINKS = deepFreeze([
    OFFICIAL_SOCIAL_LINKS.LINKEDIN,
    OFFICIAL_SOCIAL_LINKS.FACEBOOK,
    OFFICIAL_SOCIAL_LINKS.YOUTUBE
]);

/**
 * Core University of Moratuwa & Faculty of Business Academic Portals
 */
export const OFFICIAL_ACADEMIC_PORTALS = deepFreeze([
    {
        id: 'moodle',
        tag: 'DAILY ACADEMIC LMS',
        title: 'Moodle UoM (online.uom.lk)',
        sub: 'Primary digital instruction environment for daily course modules, lecture slides, assignments, and tutorial submissions.',
        url: 'https://online.uom.lk',
        targetUrl: 'online.uom.lk',
        category: 'E-Learning',
        authType: 'UoM LDAP / Central SSO',
        isUniversityWide: true
    },
    {
        id: 'learnorg',
        tag: 'ADMIN & REGISTRY LMS',
        title: 'LearnOrg System (lms.uom.lk)',
        sub: 'Official university academic records, semester module enrollments, GPA records, and exam admission clearance.',
        url: 'https://lms.uom.lk',
        targetUrl: 'lms.uom.lk',
        category: 'E-Learning',
        authType: 'UoM Central Credentials',
        isUniversityWide: true
    },
    {
        id: 'webmail',
        tag: 'COMMUNICATIONS & MS 365',
        title: 'UoM Webmail & Microsoft 365',
        sub: 'Official institutional @uom.lk inbox, Microsoft Office 365 cloud tools, Teams, and institutional OneDrive.',
        url: 'https://webmail.uom.lk',
        targetUrl: 'webmail.uom.lk',
        category: 'Productivity',
        authType: 'Microsoft Entra ID (@uom.lk)',
        isUniversityWide: true
    },
    {
        id: 'cites-portal',
        tag: 'CENTRAL IT',
        title: 'CITES Student Portal & Helpdesk',
        sub: 'University network credentials, eduroam Wi-Fi configuration, software subscriptions, and IT helpdesk ticketing.',
        url: 'https://uom.lk/cites',
        targetUrl: 'uom.lk/cites',
        category: 'IT Services',
        authType: 'UoM Central Helpdesk',
        isUniversityWide: true
    }
]);

/**
 * Direct shortcut portals for rapid navigation (e.g. Footer, QuickLinks).
 */
export const OFFICIAL_DIRECT_PORTALS = deepFreeze([
    { id: 'moodle', title: 'Moodle UoM (online.uom.lk)', url: 'https://online.uom.lk' },
    { id: 'learnorg', title: 'LearnOrg System (lms.uom.lk)', url: 'https://lms.uom.lk' },
    { id: 'webmail', title: 'UoM Webmail & 365', url: 'https://webmail.uom.lk' },
    { id: 'cites', title: 'CITES Student Portal', url: 'https://uom.lk/cites' }
]);

/**
 * Official Union Contact & Welfare Points of Presence
 */
export const OFFICIAL_UNION_CHANNELS = deepFreeze({
    email: 'bfsu@uom.lk',
    hotline: '+94 11 265 0301',
    officeLocation: "Students' Union Room, Level 01, Faculty of Business, University of Moratuwa",
    welfareFormUrl: '/explore#room',
    feedbackFormUrl: 'https://notion.so/bfsu-uom/feedback',
    administrationPortalUrl: 'https://uom.lk/business'
});
