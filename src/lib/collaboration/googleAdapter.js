/**
 * Google Workspace Hexagonal Secondary Adapter
 * Provides programmatic integration for:
 * - Google Drive (Shared Drives, folder preview, direct download, file metadata)
 * - Google Calendar (Add-to-Calendar URLs, Webcal ICS sync feeds)
 * - Google Forms (Prefilled responses, embed URLs)
 */

/**
 * Extract Google Drive file/folder ID from a variety of Google Drive URL formats
 */
export function extractGoogleDriveId(url) {
    if (!url || typeof url !== 'string') return null;
    
    // Pattern 1: /folders/ID or /file/d/ID
    const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch) return folderMatch[1];

    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) return fileMatch[1];

    // Pattern 2: ?id=ID
    const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) return idMatch[1];

    // If string is already an ID (alphanumeric with dashes/underscores)
    if (/^[a-zA-Z0-9_-]{25,}$/.test(url.trim())) {
        return url.trim();
    }

    return null;
}

/**
 * Generate a direct inline preview URL for a Google Drive file (embeddable in iframe or modal)
 */
export function buildGoogleDrivePreviewUrl(fileOrUrl) {
    const id = extractGoogleDriveId(fileOrUrl) || fileOrUrl;
    return `https://drive.google.com/file/d/${id}/preview`;
}

/**
 * Generate a direct download URL for a Google Drive file
 */
export function buildGoogleDriveDownloadUrl(fileOrUrl) {
    const id = extractGoogleDriveId(fileOrUrl) || fileOrUrl;
    return `https://drive.google.com/uc?export=download&id=${id}`;
}

/**
 * Generate an image thumbnail URL from Google Drive with customizable size
 */
export function buildGoogleDriveThumbnailUrl(fileOrUrl, size = 'w800') {
    const id = extractGoogleDriveId(fileOrUrl) || fileOrUrl;
    return `https://drive.google.com/thumbnail?id=${id}&sz=${size}`;
}

/**
 * Generate a one-click "Add to Google Calendar" link
 * @param {Object} event { title, description, location, startDate, endDate }
 */
export function buildGoogleCalendarAddToCalendarUrl(event) {
    if (!event || !event.title) return '';

    const formatGCalDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '';
        return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
    };

    const start = formatGCalDate(event.startDate || event.start_date || new Date().toISOString());
    const end = formatGCalDate(event.endDate || event.end_date || event.startDate || event.start_date);

    const datesParam = start && end ? `${start}/${end}` : '';

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        details: event.description || '',
        location: event.location || 'Faculty of Business, University of Moratuwa',
        ...(datesParam ? { dates: datesParam } : {})
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate a Webcal sync feed URL for Google Calendar
 */
export function buildGoogleCalendarWebcalUrl(calendarId) {
    if (!calendarId) return '';
    const cleanId = calendarId.replace(/^webcal:\/\//, '').replace(/^https?:\/\//, '');
    return `webcal://calendar.google.com/calendar/ical/${encodeURIComponent(cleanId)}/public/basic.ics`;
}

/**
 * Programmatic Google Drive API v3: Fetch file listing from a public/shared folder
 * Requires GOOGLE_API_KEY environment variable if querying programmatically via REST
 */
export async function fetchPublicDriveFolderFiles(folderId, apiKey = process.env.GOOGLE_API_KEY) {
    if (!folderId || !apiKey) return [];

    try {
        const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
        const fields = encodeURIComponent('files(id, name, mimeType, webViewLink, webContentLink, iconLink, size, modifiedTime)');
        const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&key=${apiKey}`;

        const res = await fetch(url, { next: { revalidate: 300 } });
        if (!res.ok) return [];

        const data = await res.json();
        return data.files || [];
    } catch (err) {
        console.warn('[GoogleAdapter] Failed to query Drive folder:', err);
        return [];
    }
}
