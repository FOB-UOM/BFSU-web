/**
 * Microsoft 365 Hexagonal Secondary Adapter
 * Provides programmatic integration for:
 * - Office Online Viewer (Word .docx, Excel .xlsx, PowerPoint .pptx instant web preview without downloading)
 * - Outlook Calendar (Add-to-Outlook web links, ICS exports)
 * - Microsoft Teams (Channel deep links, meeting join URLs)
 * - OneDrive & SharePoint (Direct download & preview builders, Microsoft Graph REST helpers)
 */

/**
 * Check if a URL or filename points to a Microsoft Office document
 */
export function isMicrosoftOfficeDocument(urlOrFilename) {
    if (!urlOrFilename || typeof urlOrFilename !== 'string') return false;
    const lower = urlOrFilename.toLowerCase().split('?')[0];
    return (
        lower.endsWith('.doc') ||
        lower.endsWith('.docx') ||
        lower.endsWith('.xls') ||
        lower.endsWith('.xlsx') ||
        lower.endsWith('.ppt') ||
        lower.endsWith('.pptx')
    );
}

/**
 * Generate an official Microsoft Office Online Viewer URL
 * Allows users to view Word, Excel, and PowerPoint documents directly in browser without downloading.
 */
export function buildOfficeOnlineViewerUrl(documentUrl) {
    if (!documentUrl) return '';
    return `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(documentUrl)}`;
}

/**
 * Generate a one-click "Add to Outlook Calendar" web deep link
 * @param {Object} event { title, description, location, startDate, endDate }
 */
export function buildOutlookCalendarAddToCalendarUrl(event) {
    if (!event || !event.title) return '';

    const formatOutlookDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        return d.toISOString();
    };

    const start = formatOutlookDate(event.startDate || event.start_date || new Date().toISOString());
    const end = formatOutlookDate(event.endDate || event.end_date || event.startDate || event.start_date);

    const params = new URLSearchParams({
        path: '/calendar/action/compose',
        rru: 'addevent',
        subject: event.title,
        body: event.description || '',
        location: event.location || 'Faculty of Business, University of Moratuwa',
        ...(start ? { startdt: start } : {}),
        ...(end ? { enddt: end } : {})
    });

    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/**
 * Generate Microsoft Teams Deep Links (join meeting, chat, or channel)
 */
export function buildTeamsDeepLink(meetingUrlOrChannelId, type = 'meeting') {
    if (!meetingUrlOrChannelId) return '';
    if (type === 'meeting' && meetingUrlOrChannelId.includes('teams.microsoft.com')) {
        return meetingUrlOrChannelId;
    }
    return `msteams://teams.microsoft.com/l/meetup-join/${encodeURIComponent(meetingUrlOrChannelId)}`;
}

/**
 * Transform a SharePoint / OneDrive sharing link into a direct download link
 */
export function buildOneDriveDirectDownloadUrl(shareUrl) {
    if (!shareUrl || typeof shareUrl !== 'string') return '';
    // OneDrive/SharePoint 1drv.ms links can be converted with download=1
    if (shareUrl.includes('sharepoint.com') || shareUrl.includes('1drv.ms')) {
        const url = new URL(shareUrl);
        url.searchParams.set('download', '1');
        return url.toString();
    }
    return shareUrl;
}

/**
 * Programmatic Microsoft Graph API: Query files in a SharePoint / OneDrive drive
 * Supports server-to-server Graph API calls when Azure AD App Registration is configured.
 */
export async function fetchMicrosoftGraphDriveItems(driveId, accessToken = process.env.MS_GRAPH_ACCESS_TOKEN) {
    if (!driveId || !accessToken) return [];

    try {
        const url = `https://graph.microsoft.com/v1.0/drives/${driveId}/root/children`;
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            },
            next: { revalidate: 300 }
        });

        if (!res.ok) return [];
        const data = await res.json();
        return data.value || [];
    } catch (err) {
        console.warn('[MicrosoftAdapter] Failed to query Graph API drive:', err);
        return [];
    }
}
