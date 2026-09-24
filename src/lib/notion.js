import { Client } from '@notionhq/client';
import { newsData as fallbackNews } from '../data/newsData.js';
import { eventsData as fallbackEvents } from '../data/eventsData.js';
import { departmentalSocieties as fallbackSocieties } from '../data/societiesData.js';
import { fallbackCouncil } from '../data/councilData.js';

// Initialize the official Notion SDK client
const notionApiKey = process.env.NOTION_API_KEY;

export const notion = notionApiKey
    ? new Client({ auth: notionApiKey })
    : null;

/**
 * Safe Notion property extractors
 */
export function getPlainText(prop) {
    if (!prop) return '';
    if (prop.type === 'title') {
        return prop.title?.map(t => t.plain_text).join('') || '';
    }
    if (prop.type === 'rich_text') {
        return prop.rich_text?.map(t => t.plain_text).join('') || '';
    }
    return '';
}

export function getSelect(prop) {
    return prop?.select?.name || '';
}

export function getMultiSelect(prop) {
    return prop?.multi_select?.map(s => s.name) || [];
}

export function getDate(prop) {
    return prop?.date?.start || '';
}

export function getCheckbox(prop) {
    return Boolean(prop?.checkbox);
}

export function getFileUrl(prop) {
    if (!prop || !prop.files || prop.files.length === 0) return '';
    const file = prop.files[0];
    return file.file?.url || file.external?.url || '';
}

/**
 * Universal Notion Database Query Engine with Next.js ISR caching
 */
export async function queryNotionDatabase(dbId, body = {}) {
    const apiKey = process.env.NOTION_API_KEY;
    if (!apiKey || !dbId) return null;

    const cleanDbId = dbId.replace(/-/g, '');
    const res = await fetch(`https://api.notion.com/v1/databases/${cleanDbId}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        next: { revalidate: 60 }
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Notion API HTTP ${res.status}: ${errText}`);
    }

    return await res.json();
}

/**
 * 1. Fetch News & Circulars from Notion
 */
export async function fetchNotionNews() {
    const dbId = process.env.NOTION_NEWS_DB_ID;

    if (!dbId) {
        return fallbackNews;
    }

    try {
        const data = await queryNotionDatabase(dbId, {
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });

        if (!data || !data.results || data.results.length === 0) {
            return fallbackNews;
        }

        return data.results.map(page => {
            const props = page.properties;
            const title = getPlainText(props.Title) || getPlainText(props.Name) || 'Faculty Update';
            const slug = getPlainText(props.Slug) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return {
                id: page.id,
                slug,
                title,
                brief: getPlainText(props.Brief) || getPlainText(props.Why) || '',
                label: getSelect(props['Type of Update']) || getSelect(props.Label) || 'Circular',
                date: getDate(props.Date) || new Date().toISOString().split('T')[0],
                author: getPlainText(props.Author) || 'BFSU Secretariat',
                image: getFileUrl(props.Flyer) || page.cover?.file?.url || page.cover?.external?.url || '',
                published: true,
                notionPageId: page.id
            };
        });
    } catch (error) {
        console.warn('[Notion API] fetchNotionNews failed, falling back to cached news:', error.message);
        return fallbackNews;
    }
}

/**
 * 2. Fetch Events & Traditions from Notion
 */
export async function fetchNotionEvents() {
    const dbId = process.env.NOTION_EVENTS_DB_ID;

    if (!dbId) {
        return fallbackEvents;
    }

    try {
        const data = await queryNotionDatabase(dbId, {
            sorts: [
                {
                    property: 'Date',
                    direction: 'ascending',
                },
            ],
        });

        if (!data || !data.results || data.results.length === 0) {
            return fallbackEvents;
        }

        return data.results.map(page => {
            const props = page.properties;
            const title = getPlainText(props.Name) || getPlainText(props.Title) || 'Faculty Event';
            const slug = getPlainText(props.Slug) || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const venue = getPlainText(props.Location) || getPlainText(props.Venue) || 'Faculty of Business, UoM';
            const description = getPlainText(props.Description) || '';
            const category = getSelect(props.Category) || 'Academic';
            const organizer = getSelect(props.Organizer) || getSelect(props.Society) || 'BFSU';
            const image = getFileUrl(props.Cover) || getFileUrl(props.Flyer) || page.cover?.file?.url || page.cover?.external?.url || '';
            const registrationUrl = props.Registration?.url || null;

            // Format nice human-readable date if it's an ISO string
            const rawDate = getDate(props.Date);
            let formattedDate = rawDate;
            if (rawDate && (rawDate.includes('T') || rawDate.includes('-'))) {
                try {
                    formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                } catch {
                    formattedDate = rawDate;
                }
            }

            return {
                id: page.id,
                slug,
                title,
                category,
                label: category,
                society: organizer,
                date: formattedDate || 'Upcoming',
                rawDate: rawDate || '',
                venue,
                location: venue,
                description,
                brief: description || `${category} event organized by ${organizer} at ${venue}.`,
                image,
                registrationOpen: Boolean(registrationUrl) || getCheckbox(props.RegistrationOpen),
                registrationUrl,
                featured: getCheckbox(props.Featured),
                notionPageId: page.id
            };
        });
    } catch (error) {
        console.warn('[Notion API] fetchNotionEvents failed, falling back to cached events:', error.message);
        return fallbackEvents;
    }
}

/**
 * 2.5 Fetch Executive Council & Committee Members from Notion
 */
export async function fetchNotionCouncil() {
    const dbId = process.env.NOTION_COUNCIL_DB_ID;



    if (!dbId) {
        return fallbackCouncil;
    }

    try {
        const response = await queryNotionDatabase(dbId);

        if (!response || !response.results || response.results.length === 0) {
            return fallbackCouncil;
        }

        const rolePriorityMap = {
            'President': 1,
            'Vice President': 2,
            'Secretary': 3,
            'Junior Treasurer': 4,
            'Junior Teasurer': 4,
            'Editor': 5,
            'Co-Editor': 6,
            'Assistant Secretary': 7,
            'Committee Member': 10
        };

        const members = response.results.map((page, idx) => {
            const props = page.properties;
            const name = getPlainText(props['Member Name']) || 'Council Officer';
            const roles = getMultiSelect(props.Role);
            const primaryRole = roles[0] || 'Executive Member';
            const contactText = getPlainText(props['Contact Info']);
            
            // Extract email from Email property or from Contact Info text
            let email = props.Email?.email || null;
            if (!email && contactText) {
                const match = contactText.match(/[\w.-]+@[\w.-]+\.\w+/);
                if (match) email = match[0];
            }

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

            const avatarFile = getFileUrl(props.Avatar);

            return {
                id: page.id,
                name,
                role: primaryRole,
                roles: roles.length > 0 ? roles : [primaryRole],
                email: email || '',
                phone: phone || '',
                department: getSelect(props.Department) || 'General',
                batch: getSelect(props.Batch) || 'Batch 22',
                term: getSelect(props.Term) || '2025/2026',
                bio: getPlainText(props.Bio) || `${primaryRole} of the Faculty of Business Students' Union (BFSU).`,
                linkedin: props.LinkedIn?.url || null,
                priority: computedPriority,
                image: avatarFile || fallbackCouncil[idx]?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
                notionPageId: page.id
            };
        });

        // Sort by priority ascending (1 = President, 2 = VP, etc.)
        return members.sort((a, b) => a.priority - b.priority);
    } catch (error) {
        console.warn('[Notion API] fetchNotionCouncil failed, falling back to cached council:', error.message);
        return fallbackCouncil;
    }
}

/**
 * 3. Fetch Departmental Societies from Notion
 */
export async function fetchNotionSocieties() {
    const dbId = process.env.NOTION_SOCIETIES_DB_ID;

    if (!dbId) {
        return fallbackSocieties;
    }

    try {
        const response = await queryNotionDatabase(dbId);

        if (!response || !response.results || response.results.length === 0) {
            return fallbackSocieties;
        }

        return response.results.map((page, idx) => {
            const props = page.properties;
            const name = getPlainText(props.SocietyName) || fallbackSocieties[idx]?.name;
            const slug = getPlainText(props.Slug) || fallbackSocieties[idx]?.slug;

            return {
                ...fallbackSocieties[idx],
                name,
                slug,
                tagline: getPlainText(props.Tagline) || fallbackSocieties[idx]?.tagline,
                notion: {
                    ...fallbackSocieties[idx]?.notion,
                    workspaceUrl: props.NotionWorkspaceURL?.url || fallbackSocieties[idx]?.notion?.workspaceUrl
                }
            };
        });
    } catch (error) {
        console.warn('[Notion API] fetchNotionSocieties failed, falling back:', error.message);
        return fallbackSocieties;
    }
}

/**
 * Connection Health Check utility
 */
export async function checkNotionConnection() {
    if (!notionApiKey) {
        return {
            connected: false,
            reason: 'NOTION_API_KEY environment variable is not configured.'
        };
    }

    try {
        const user = await notion.users.me({});
        return {
            connected: true,
            botName: user.name,
            workspace: user.bot?.owner?.workspace ? 'Student Org Workspace' : 'Connected Workspace'
        };
    } catch (error) {
        return {
            connected: false,
            reason: error.message
        };
    }
}
