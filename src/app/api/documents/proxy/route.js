import { NextResponse } from 'next/server';

/**
 * Universal Document Proxy & Streamer Route
 * 
 * Safely streams remote PDFs and document assets into browser iframes and flipbook readers,
 * bypassing restrictive CORS and X-Frame-Options policies while protecting against SSRF.
 */

// Helper to block internal / private network SSRF attacks
function isPrivateOrLocalHost(hostname) {
    const lower = hostname.toLowerCase();
    if (
        lower === 'localhost' ||
        lower === '127.0.0.1' ||
        lower === '::1' ||
        lower.endsWith('.local') ||
        lower.endsWith('.internal')
    ) {
        return true;
    }

    // Check private IP ranges
    const ipv4Match = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (ipv4Match) {
        const [, a, b] = ipv4Match.map(Number);
        if (a === 10) return true; // 10.0.0.0/8
        if (a === 127) return true; // loopback
        if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
        if (a === 192 && b === 168) return true; // 192.168.0.0/16
        if (a === 169 && b === 254) return true; // link-local
    }

    return false;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
        return new NextResponse(
            JSON.stringify({ error: 'Missing required "url" parameter.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(targetUrl);
    } catch {
        return new NextResponse(
            JSON.stringify({ error: 'Invalid URL provided.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return new NextResponse(
            JSON.stringify({ error: 'Only HTTP and HTTPS protocols are supported.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (isPrivateOrLocalHost(parsedUrl.hostname)) {
        return new NextResponse(
            JSON.stringify({ error: 'Access to private or loopback addresses is forbidden.' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const upstreamResponse = await fetch(parsedUrl.toString(), {
            method: 'GET',
            headers: {
                'User-Agent': 'BFSU-UniversalDocumentProxy/1.0 (+https://uom.lk/business)',
                'Accept': 'application/pdf,application/octet-stream,*/*'
            },
            // Cache in edge/CDN for 5 minutes
            next: { revalidate: 300 }
        });

        if (!upstreamResponse.ok) {
            return new NextResponse(
                JSON.stringify({
                    error: `Upstream server responded with status: ${upstreamResponse.status}`
                }),
                { status: upstreamResponse.status, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const contentType = upstreamResponse.headers.get('content-type') || 'application/pdf';
        const contentLength = upstreamResponse.headers.get('content-length');

        const headers = new Headers();
        headers.set('Content-Type', contentType);
        headers.set('Content-Disposition', 'inline');
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
        // Allow framing in our own application
        headers.set('X-Content-Type-Options', 'nosniff');

        if (contentLength) {
            headers.set('Content-Length', contentLength);
        }

        return new NextResponse(upstreamResponse.body, {
            status: 200,
            headers
        });
    } catch (err) {
        console.error('[DocumentProxy] Error streaming document:', err);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to fetch upstream document.', details: err.message }),
            { status: 502, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
