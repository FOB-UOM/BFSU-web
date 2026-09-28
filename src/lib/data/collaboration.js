import { createClient } from '../supabase/server';

/**
 * Database Service: Vendor-Neutral Collaboration Hub
 * Retrieves multi-provider resources (Google Drive, Notion, Calendar, GitHub)
 * directly from PostgreSQL/Supabase.
 */

export async function getCollaborationHub(entityCode) {
    if (!entityCode) return null;
    const supabase = await createClient();
    if (!supabase) return null;

    const normalizedCode = entityCode.toUpperCase();

    // 1. Fetch entity configuration
    const { data: entity, error: entityError } = await supabase
        .from('institutional_entities')
        .select('*')
        .or(`code.eq.${normalizedCode},slug.eq.${entityCode.toLowerCase()}`)
        .maybeSingle();

    if (entityError || !entity) {
        return null;
    }

    // 2. Fetch associated collaboration resources
    const { data: resources, error: resError } = await supabase
        .from('collaboration_resources')
        .select('*')
        .eq('entity_code', entity.code)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    const resourceList = resError || !resources ? [] : resources;

    return {
        entity: {
            id: entity.id,
            code: entity.code,
            name: entity.name,
            slug: entity.slug,
            description: entity.description,
            preferredSuite: entity.preferred_suite || 'hybrid'
        },
        workspaces: {
            notion: {
                workspaceUrl: entity.notion_workspace_url,
                databaseId: entity.notion_database_id
            },
            googleWorkspace: {
                sharedDriveUrl: entity.google_drive_url,
                calendarId: entity.google_calendar_id,
                membershipFormUrl: entity.google_form_url
            },
            repository: {
                githubUrl: entity.github_org_url
            }
        },
        resources: resourceList.map(r => ({
            id: r.id,
            title: r.title,
            description: r.description,
            category: r.category,
            provider: r.provider,
            accessLevel: r.access_level,
            url: r.url,
            actionType: r.action_type
        }))
    };
}
