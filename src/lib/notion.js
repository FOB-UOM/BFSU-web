import { Client } from '@notionhq/client';

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
        return [];
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
            return [];
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
        console.warn('[Notion API] fetchNotionNews error:', error.message);
        return [];
    }
}

/**
 * 2. Fetch Events & Traditions from Notion
 */
export async function fetchNotionEvents() {
    const dbId = process.env.NOTION_EVENTS_DB_ID;

    if (!dbId) {
        return [];
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
            return [];
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
        console.warn('[Notion API] fetchNotionEvents error:', error.message);
        return [];
    }
}

/**
 * 2.5 Fetch Executive Council & Committee Members from Notion & DB Sync
 * Returns ONLY real synced profiles without any fake fallbacks.
 */
export async function fetchNotionCouncil() {
    try {
        const { fetchSyncedCouncilMembers } = await import('./services/people.js');
        return await fetchSyncedCouncilMembers();
    } catch (error) {
        console.warn('[Notion API] fetchNotionCouncil sync error:', error.message);
        return [];
    }
}

/**
 * 3. Fetch Departmental Societies from Notion
 */
export async function fetchNotionSocieties() {
    const dbId = process.env.NOTION_SOCIETIES_DB_ID;

    if (!dbId) {
        return [];
    }

    try {
        const response = await queryNotionDatabase(dbId);

        if (!response || !response.results || response.results.length === 0) {
            return [];
        }

        return response.results.map((page) => {
            const props = page.properties;
            const name = getPlainText(props.SocietyName) || 'Student Society';
            const slug = getPlainText(props.Slug) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            return {
                id: page.id,
                name,
                slug,
                tagline: getPlainText(props.Tagline) || '',
                notion: {
                    workspaceUrl: props.NotionWorkspaceURL?.url || ''
                }
            };
        });
    } catch (error) {
        console.warn('[Notion API] fetchNotionSocieties error:', error.message);
        return [];
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
