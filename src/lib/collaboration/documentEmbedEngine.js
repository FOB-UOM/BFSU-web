/**
 * Universal Document Embed Engine
 * 
 * Polymorphic URL and format resolver for:
 * - PDF (Native, Google Docs Viewer, or Flipbook mode)
 * - Microsoft Word (.docx, .doc via Office Online Viewer)
 * - Microsoft Excel (.xlsx, .xls via Office Online Viewer or Sheet Viewer)
 * - Microsoft PowerPoint (.pptx, .ppt via Office Online Viewer)
 * - Google Docs, Sheets, Slides, and Google Drive files
 * - Cloudflare / Supabase Storage raw document URLs
 */

import { extractGoogleDriveId } from './googleAdapter';
import { isMicrosoftOfficeDocument, buildOfficeOnlineViewerUrl } from './microsoftAdapter';

/**
 * Detect the exact format and provider of a document URL
 */
export function detectDocumentInfo(url) {
    if (!url || typeof url !== 'string') {
        return { format: 'unknown', provider: 'unknown', isEmbeddable: false };
    }

    const cleanUrl = url.trim().toLowerCase().split('?')[0];

    // 1. Google Workspace Formats
    if (url.includes('docs.google.com/document')) {
        return { format: 'google_doc', provider: 'google', isEmbeddable: true, label: 'Google Document' };
    }
    if (url.includes('docs.google.com/spreadsheets')) {
        return { format: 'google_sheet', provider: 'google', isEmbeddable: true, label: 'Google Sheet' };
    }
    if (url.includes('docs.google.com/presentation')) {
        return { format: 'google_slide', provider: 'google', isEmbeddable: true, label: 'Google Slide' };
    }
    if (url.includes('drive.google.com')) {
        return { format: 'google_drive', provider: 'google', isEmbeddable: true, label: 'Google Drive File' };
    }

    // 2. Microsoft Office Formats
    if (cleanUrl.endsWith('.docx') || cleanUrl.endsWith('.doc')) {
        return { format: 'word', provider: 'microsoft', isEmbeddable: true, label: 'Microsoft Word' };
    }
    if (cleanUrl.endsWith('.xlsx') || cleanUrl.endsWith('.xls') || cleanUrl.endsWith('.csv')) {
        return { format: 'excel', provider: 'microsoft', isEmbeddable: true, label: 'Microsoft Excel' };
    }
    if (cleanUrl.endsWith('.pptx') || cleanUrl.endsWith('.ppt')) {
        return { format: 'powerpoint', provider: 'microsoft', isEmbeddable: true, label: 'Microsoft PowerPoint' };
    }
    if (url.includes('sharepoint.com') || url.includes('1drv.ms') || url.includes('onedrive.live.com')) {
        return { format: 'office_doc', provider: 'microsoft', isEmbeddable: true, label: 'OneDrive / SharePoint Document' };
    }

    // 3. PDF Format
    if (cleanUrl.endsWith('.pdf') || url.includes('.pdf?')) {
        return { format: 'pdf', provider: 'direct', isEmbeddable: true, label: 'PDF Document' };
    }

    // 4. Fallback Web Document
    return { format: 'web_resource', provider: 'generic', isEmbeddable: true, label: 'Web Resource' };
}

/**
 * Generate the optimal embed URL for any document format across all devices
 */
export function resolveDocumentEmbedUrl(url, options = {}) {
    if (!url) return '';
    const { format } = detectDocumentInfo(url);

    // 1. Google Drive / Docs / Sheets / Slides
    if (format === 'google_doc') {
        const docMatch = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
        if (docMatch) return `https://docs.google.com/document/d/${docMatch[1]}/preview`;
    }
    if (format === 'google_sheet') {
        const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
        if (sheetMatch) return `https://docs.google.com/spreadsheets/d/${sheetMatch[1]}/preview?widget=true&headers=false`;
    }
    if (format === 'google_slide') {
        const slideMatch = url.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
        if (slideMatch) return `https://docs.google.com/presentation/d/${slideMatch[1]}/preview?start=false&loop=false&delayms=3000`;
    }
    if (format === 'google_drive') {
        const driveId = extractGoogleDriveId(url);
        if (driveId) return `https://drive.google.com/file/d/${driveId}/preview`;
    }

    // 2. Microsoft Office Documents (.docx, .xlsx, .pptx)
    if (format === 'word' || format === 'excel' || format === 'powerpoint') {
        return buildOfficeOnlineViewerUrl(url);
    }

    // 3. PDF Documents
    if (format === 'pdf') {
        if (options.useInternalProxy) {
            return buildInternalProxyUrl(url);
        }
        if (options.useGoogleViewerFallback) {
            return buildGoogleDocsViewerUrl(url);
        }
        return url;
    }

    // 4. Default / Direct
    if (options.useInternalProxy) {
        return buildInternalProxyUrl(url);
    }
    return url;
}

/**
 * Build URL for server-side streaming proxy (bypasses CORS & X-Frame-Options)
 */
export function buildInternalProxyUrl(url) {
    if (!url) return '';
    return `/api/documents/proxy?url=${encodeURIComponent(url)}`;
}

/**
 * Build URL for Google Docs Viewer cloud fallback
 */
export function buildGoogleDocsViewerUrl(url) {
    if (!url) return '';
    return `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
}

