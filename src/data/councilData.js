/**
 * Executive Council Schema Definition & Type Reference
 * Faculty of Business Students' Union (BFSU), University of Moratuwa
 * 
 * Note: Real council members are synchronized dynamically from Notion & Supabase via
 * src/lib/services/people.js. No hardcoded or fake stock photos are permitted.
 */

export const councilRoles = [
    { title: "President", priority: 1 },
    { title: "Vice President", priority: 2 },
    { title: "Secretary", priority: 3 },
    { title: "Junior Treasurer", priority: 4 },
    { title: "Editor", priority: 5 },
    { title: "Co-Editor", priority: 6 },
    { title: "Assistant Secretary", priority: 7 },
    { title: "Committee Member", priority: 10 }
];
