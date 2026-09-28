/**
 * Canonical Schema.org JSON-LD Structured Data Builder
 * Business Faculty Students' Union (BFSU) • University of Moratuwa, Sri Lanka
 * 
 * Complies with Schema.org specifications and Google Search Central guidelines.
 * Disambiguates BFSU from external international institutions and embeds geographic locality signals.
 */

const BASE_URL = 'https://bfsu-uom.lk';

export const CANONICAL_ENTITY = {
    name: "Business Faculty Students' Union, University of Moratuwa",
    alternateName: ["BFSU", "BFSU UoM", "Business Faculty Students' Union"],
    description: "The constitutional student union of the Faculty of Business, University of Moratuwa, Sri Lanka. Supporting student welfare, academic representation, leadership, and professional development.",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    email: "bfsu@uom.lk",
    telephone: "+94 11 265 0301",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Students' Union Room, Level 01, Faculty of Business",
        addressLocality: "Katubedda, Moratuwa",
        addressRegion: "Western Province",
        postalCode: "10400",
        addressCountry: "LK"
    },
    parentOrganization: {
        "@type": "EducationalOrganization",
        name: "Faculty of Business, University of Moratuwa",
        url: "https://uom.lk/business",
        parentOrganization: {
            "@type": "CollegeOrUniversity",
            name: "University of Moratuwa",
            url: "https://uom.lk"
        }
    },
    sameAs: [
        "https://www.linkedin.com/company/bfsu-uom",
        "https://facebook.com/bfsu.uom",
        "https://youtube.com/@bfsu_uom"
    ]
};

/**
 * Global Organization Structured Data
 */
export function getOrganizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: CANONICAL_ENTITY.name,
        alternateName: CANONICAL_ENTITY.alternateName,
        url: CANONICAL_ENTITY.url,
        logo: {
            "@type": "ImageObject",
            url: CANONICAL_ENTITY.logo,
            width: 512,
            height: 512,
            caption: "Business Faculty Students' Union (BFSU) Crest"
        },
        description: CANONICAL_ENTITY.description,
        email: CANONICAL_ENTITY.email,
        telephone: CANONICAL_ENTITY.telephone,
        address: CANONICAL_ENTITY.address,
        parentOrganization: CANONICAL_ENTITY.parentOrganization,
        sameAs: CANONICAL_ENTITY.sameAs,
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: CANONICAL_ENTITY.telephone,
                email: CANONICAL_ENTITY.email,
                contactType: "student support",
                areaServed: "LK",
                availableLanguage: ["English", "Sinhala", "Tamil"]
            }
        ]
    };
}

/**
 * Root WebSite Structured Data with Search & Publisher Reference
 */
export function getWebsiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Business Faculty Students' Union | University of Moratuwa",
        alternateName: "BFSU UoM Portal",
        description: CANONICAL_ENTITY.description,
        publisher: {
            "@id": `${BASE_URL}/#organization`
        },
        inLanguage: "en-LK"
    };
}

/**
 * News Article Structured Data
 */
export function getNewsArticleJsonLd(newsItem) {
    if (!newsItem) return null;

    const publishedDate = newsItem.created_at || newsItem.date || new Date().toISOString();
    const modifiedDate = newsItem.updated_at || publishedDate;
    const imageUrl = newsItem.image || CANONICAL_ENTITY.logo;

    return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "@id": `${BASE_URL}/news/${newsItem.slug}#article`,
        headline: newsItem.title,
        description: newsItem.brief || newsItem.title,
        url: `${BASE_URL}/news/${newsItem.slug}`,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        inLanguage: "en-LK",
        image: [imageUrl],
        author: {
            "@type": "Organization",
            name: newsItem.author || CANONICAL_ENTITY.name,
            url: BASE_URL
        },
        publisher: {
            "@id": `${BASE_URL}/#organization`
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/news/${newsItem.slug}`
        }
    };
}

/**
 * Collegiate Event Structured Data
 */
export function getEventJsonLd(eventItem) {
    if (!eventItem) return null;

    const eventDate = eventItem.date || new Date().toISOString();
    const imageUrl = eventItem.image || CANONICAL_ENTITY.logo;

    return {
        "@context": "https://schema.org",
        "@type": "Event",
        "@id": `${BASE_URL}/events/${eventItem.slug}#event`,
        name: eventItem.title,
        description: eventItem.brief || eventItem.title,
        url: `${BASE_URL}/events/${eventItem.slug}`,
        startDate: eventDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        image: [imageUrl],
        location: {
            "@type": "Place",
            name: eventItem.location || "Faculty of Business, University of Moratuwa",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Katubedda, Moratuwa",
                addressCountry: "LK"
            }
        },
        organizer: {
            "@id": `${BASE_URL}/#organization`
        }
    };
}

/**
 * About Page & Leadership Council Structured Data
 */
export function getAboutPageJsonLd(councilMembers = []) {
    const peopleSchema = (councilMembers || []).map((member, idx) => ({
        "@type": "Person",
        name: member.name,
        jobTitle: member.role || member.position,
        worksFor: {
            "@id": `${BASE_URL}/#organization`
        },
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "University of Moratuwa"
        }
    }));

    return {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${BASE_URL}/about#about`,
        name: "About the Business Faculty Students' Union (BFSU), University of Moratuwa",
        description: "Institutional mandate, constitution, executive council, and history of the Business Faculty Students' Union, Faculty of Business, University of Moratuwa, Sri Lanka.",
        url: `${BASE_URL}/about`,
        mainEntity: {
            "@id": `${BASE_URL}/#organization`
        },
        inLanguage: "en-LK",
        mentions: peopleSchema.slice(0, 15) // Top council bearers
    };
}
