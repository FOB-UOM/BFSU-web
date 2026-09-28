/**
 * Next.js App Router Dynamic Robots Metadata Route
 * Business Faculty Students' Union (BFSU) • University of Moratuwa
 * 
 * Permits legitimate search engine and AI retrieval crawlers while securing private API routes.
 */

export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: 'https://bfsu-uom.lk/sitemap.xml',
    };
}
