/**
 * Calendar & Mobile Affordance Action Helper
 * 
 * Provides zero-friction, vendor-neutral calendar and sharing actions
 * tailored to university students' mobile devices (Personal Google Calendar, WhatsApp, iCal).
 */

/**
 * Formats a date into Google Calendar's required UTC string format (YYYYMMDDTHHmmssZ)
 * or Date string (YYYYMMDD) for all-day events.
 */
function formatGoogleCalendarDate(dateInput, isAllDay = true) {
    if (!dateInput) {
        const now = new Date();
        return now.toISOString().replace(/-|:|\.\d\d\d/g, "");
    }

    try {
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) {
            const fallback = new Date();
            return fallback.toISOString().replace(/-|:|\.\d\d\d/g, "");
        }

        if (isAllDay) {
            const year = d.getUTCFullYear();
            const month = String(d.getUTCMonth() + 1).padStart(2, '0');
            const day = String(d.getUTCDate()).padStart(2, '0');
            return `${year}${month}${day}`;
        }

        return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
    } catch {
        const now = new Date();
        return now.toISOString().replace(/-|:|\.\d\d\d/g, "");
    }
}

/**
 * Generates a 1-click "Add to Google Calendar" URL.
 * Works seamlessly on Android and iOS devices with personal Google accounts.
 */
export function generateGoogleCalendarUrl({
    title = "Faculty of Business Event",
    description = "",
    location = "Faculty of Business, University of Moratuwa",
    startDate = null,
    endDate = null,
    url = "https://bfsu.uom.lk"
} = {}) {
    const startStr = formatGoogleCalendarDate(startDate, true);
    // End date should be at least start date or next day
    const endStr = endDate ? formatGoogleCalendarDate(endDate, true) : startStr;
    const datesParam = `${startStr}/${endStr}`;

    const fullDescription = description 
        ? `${description}\n\nOfficial Portal: ${url}`
        : `Organized by Faculty of Business Students' Union (BFSU), University of Moratuwa.\nPortal: ${url}`;

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: title,
        dates: datesParam,
        details: fullDescription,
        location: location,
        sprop: 'website:bfsu.uom.lk'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates a pre-formatted WhatsApp share link for batch & group distribution.
 */
export function generateWhatsAppShareUrl({
    title = "",
    text = "",
    url = ""
} = {}) {
    const message = [
        title ? `*${title.trim()}*` : '',
        text ? text.trim() : '',
        url ? `🔗 ${url.trim()}` : ''
    ].filter(Boolean).join('\n\n');

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}
