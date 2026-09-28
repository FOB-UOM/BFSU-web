import { queryNotionDatabase, getPlainText, getFileUrl, getMultiSelect, getSelect } from '../notion.js';
import { createClient } from '../supabase/client.js';

/**
 * Universal People & Profile Synchronization Service
 * 
 * Sources:
 * 1. Notion Council Database (NOTION_COUNCIL_DB_ID)
 * 2. Notion People Directory (NOTION_PEOPLE_DB_ID)
 * 3. Supabase Registered Profiles (profiles table)
 * 
 * Guarantees:
 * - NO fake stock photos or Unsplash mock profiles.
 * - Prioritizes verified user avatars from LinkedIn OAuth, Supabase upload, or Notion person avatars.
 * - Falls back gracefully to authentic name monograms with adjustable UI sizing.
 */

export async function fetchSyncedCouncilMembers() {
    const councilDbId = process.env.NOTION_COUNCIL_DB_ID;
    const peopleDbId = process.env.NOTION_PEOPLE_DB_ID;

    const supabase = createClient();

    // Concurrently fetch Notion Council, Notion People, and Supabase Profiles
    const [councilRes, peopleRes, dbProfilesRes] = await Promise.allSettled([
        councilDbId ? queryNotionDatabase(councilDbId) : Promise.resolve(null),
        peopleDbId ? queryNotionDatabase(peopleDbId) : Promise.resolve(null),
        supabase.from('profiles').select('*')
    ]);

    const councilResults = councilRes.status === 'fulfilled' ? councilRes.value?.results || [] : [];
    const peopleResults = peopleRes.status === 'fulfilled' ? peopleRes.value?.results || [] : [];
    const dbProfiles = dbProfilesRes.status === 'fulfilled' ? dbProfilesRes.value?.data || [] : [];

    // Build lookup maps for Notion People (by email and normalized name)
    const notionPeopleMap = new Map();
    for (const item of peopleResults) {
        const name = getPlainText(item.properties?.Name)?.trim().toLowerCase();
        const personObj = item.properties?.Person?.people?.[0];
        const email = personObj?.person?.email?.trim().toLowerCase();
        const avatarUrl = personObj?.avatar_url;

        const info = { name, email, avatarUrl };
        if (email) notionPeopleMap.set(email, info);
        if (name) notionPeopleMap.set(name, info);
    }

    // Role priority ranking for official BFSU governance hierarchy
    const rolePriorityMap = {
        'President': 1,
        'Vice President': 2,
        'Secretary': 3,
        'Junior Treasurer': 4,
        'Editor': 5,
        'Co-Editor': 6,
        'Assistant Secretary': 7,
        'Committee Member': 10
    };

    // If we have live Notion council records, process and enrich them
    if (councilResults.length > 0) {
        const enrichedMembers = councilResults.map((page, idx) => {
            const props = page.properties;
            const name = getPlainText(props['Member Name']) || 'Council Officer';
            const roles = getMultiSelect(props.Role);
            const primaryRole = roles[0] || 'Executive Member';
            const contactText = getPlainText(props['Contact Info']);

            // Extract email
            let email = props.Email?.email || null;
            if (!email && contactText) {
                const match = contactText.match(/[\w.-]+@[\w.-]+\.\w+/);
                if (match) email = match[0];
            }
            const normalizedEmail = email ? email.trim().toLowerCase() : null;
            const normalizedName = name.trim().toLowerCase();

            // Extract phone
            let phone = null;
            if (contactText) {
                const phoneMatch = contactText.match(/(?:Phone:\s*)([0-9+() -]+)/i);
                if (phoneMatch) phone = phoneMatch[1].trim();
            }

            const priorityVal = props.Priority?.number;
            const computedPriority = priorityVal !== undefined && priorityVal !== null
                ? priorityVal
                : (rolePriorityMap[primaryRole] ?? (20 + idx));

            // Cross-reference with Supabase DB profiles
            const dbMatch = dbProfiles.find(p => {
                if (normalizedEmail && p.email && p.email.toLowerCase() === normalizedEmail) return true;
                if (p.full_name && p.full_name.toLowerCase().includes(normalizedName)) return true;
                if (p.username && normalizedName.includes(p.username.toLowerCase())) return true;
                return false;
            });

            // Cross-reference with Notion People
            const notionMatch = (normalizedEmail && notionPeopleMap.get(normalizedEmail)) 
                || notionPeopleMap.get(normalizedName);

            // Robust avatar selection hierarchy:
            // 1. Supabase uploaded / LinkedIn avatar
            // 2. Notion direct file attachment on the card
            // 3. Notion user profile avatar
            // 4. Null (graceful UI initials fallback - NO fake stock photos!)
            const uploadedFile = getFileUrl(props.Avatar);
            const avatarUrl = dbMatch?.avatar_url 
                || (uploadedFile && uploadedFile.startsWith('http') ? uploadedFile : null)
                || notionMatch?.avatarUrl 
                || null;

            const username = dbMatch?.username 
                || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return {
                id: dbMatch?.id || page.id,
                notionPageId: page.id,
                name: dbMatch?.full_name || name,
                username,
                role: primaryRole,
                roles: roles.length > 0 ? roles : [primaryRole],
                email: email || dbMatch?.email || '',
                phone: phone || '',
                department: getSelect(props.Department) || dbMatch?.department || 'Faculty of Business',
                batch: getSelect(props.Batch) || dbMatch?.batch || 'Batch 22',
                term: getSelect(props.Term) || '2025/2026',
                bio: getPlainText(props.Bio) || dbMatch?.bio || `${primaryRole} of the Business Faculty Students' Union (BFSU).`,
                linkedin: props.LinkedIn?.url || dbMatch?.linkedin_url || null,
                github: dbMatch?.github_url || null,
                priority: computedPriority,
                avatar: avatarUrl,
                image: avatarUrl,
                is_verified: true,
                dbProfile: dbMatch || null
            };
        });

        return enrichedMembers.sort((a, b) => a.priority - b.priority);
    }

    // Fallback: If Notion is unavailable, query Supabase DB profiles
    if (dbProfiles.length > 0) {
        const councilProfiles = dbProfiles.filter(p => 
            p.role === 'union_exec' || 
            p.is_council || 
            (p.role_title && p.role_title.toLowerCase().includes('council'))
        );

        if (councilProfiles.length > 0) {
            return councilProfiles.map((p, idx) => ({
                id: p.id,
                name: p.full_name,
                username: p.username || p.full_name?.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                role: p.role_title || 'Council Officer',
                roles: [p.role_title || 'Council Officer'],
                email: p.email || '',
                department: p.department || 'Faculty of Business',
                batch: p.batch || '',
                bio: p.bio || '',
                linkedin: p.linkedin_url || null,
                github: p.github_url || null,
                priority: idx + 1,
                avatar: p.avatar_url || null,
                image: p.avatar_url || null,
                is_verified: true,
                dbProfile: p
            }));
        }
    }

    // If no real profiles exist, return empty array (NO FAKE FALLBACKS)
    return [];
}
