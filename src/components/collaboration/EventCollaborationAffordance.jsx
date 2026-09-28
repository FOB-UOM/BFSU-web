'use client';

import React, { useState } from 'react';
import { Calendar, Share2, Copy, Check, ExternalLink } from 'lucide-react';
import { generateGoogleCalendarUrl, generateWhatsAppShareUrl } from '../../lib/collaboration/calendarHelper';
import { buildOutlookCalendarAddToCalendarUrl } from '../../lib/collaboration/microsoftAdapter';

/**
 * EventCollaborationAffordance
 * 
 * Provides zero-friction, vendor-neutral calendar and sharing affordances
 * for university students without requiring logins or institutional barriers.
 */
export const EventCollaborationAffordance = ({
    eventTitle = '',
    eventDate = '',
    eventLocation = '',
    eventDescription = '',
    eventSlug = '',
    className = ''
}) => {
    const [copied, setCopied] = useState(false);

    // Compute live event URL (fallback to current location or canonical BFSU URL)
    const eventUrl = typeof window !== 'undefined' 
        ? window.location.href 
        : `https://bfsu.uom.lk/events/${eventSlug}`;

    // Generate zero-friction Google Calendar URL
    const googleCalendarUrl = generateGoogleCalendarUrl({
        title: eventTitle || "Faculty of Business Event",
        description: eventDescription || "Faculty of Business Students' Union (BFSU) Collegiate Event",
        location: eventLocation || "Faculty of Business, University of Moratuwa",
        startDate: eventDate,
        endDate: eventDate,
        url: eventUrl
    });

    // Generate zero-friction Outlook Calendar URL
    const outlookCalendarUrl = buildOutlookCalendarAddToCalendarUrl({
        title: eventTitle || "Faculty of Business Event",
        description: eventDescription || "Faculty of Business Students' Union (BFSU) Collegiate Event",
        location: eventLocation || "Faculty of Business, University of Moratuwa",
        startDate: eventDate,
        endDate: eventDate
    });

    // Generate zero-friction WhatsApp share link
    const whatsappShareUrl = generateWhatsAppShareUrl({
        title: eventTitle,
        text: `📅 ${eventTitle}\n📍 ${eventLocation || 'University of Moratuwa'}\n🗓️ ${eventDate || 'Upcoming'}`,
        url: eventUrl
    });

    const handleCopy = async () => {
        try {
            if (navigator?.clipboard) {
                await navigator.clipboard.writeText(eventUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch {
            // Fallback
        }
    };

    return (
        <div className={`p-4 sm:p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] backdrop-blur-sm transition-all ${className}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#C59B27] block mb-1">
                        Zero-Friction Affordances
                    </span>
                    <h4 className="text-sm font-bold text-[var(--text-primary)]">
                        Sync with Personal Apps & Batch Groups
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        Add directly to Google or Outlook Calendar, or forward notice to batch chats with one click.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
                    {/* Add to Google Calendar */}
                    <a
                        href={googleCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[#4285F4] hover:text-[#4285F4] shadow-xs transition-colors"
                        title="Add to Google Calendar on your phone or desktop"
                    >
                        <Calendar size={14} className="text-[#4285F4]" />
                        <span>Google</span>
                        <ExternalLink size={10} className="opacity-60" />
                    </a>

                    {/* Add to Outlook Calendar */}
                    <a
                        href={outlookCalendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[#0078D4] hover:text-[#0078D4] shadow-xs transition-colors"
                        title="Add to Microsoft Outlook Calendar"
                    >
                        <Calendar size={14} className="text-[#0078D4]" />
                        <span>Outlook</span>
                        <ExternalLink size={10} className="opacity-60" />
                    </a>

                    {/* Share to WhatsApp */}
                    <a
                        href={whatsappShareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[#25D366] hover:text-[#25D366] shadow-xs transition-colors"
                        title="Share event notice directly to WhatsApp batch chat"
                    >
                        <Share2 size={14} className="text-[#25D366]" />
                        <span>WhatsApp</span>
                        <ExternalLink size={10} className="opacity-60" />
                    </a>

                    {/* Copy Link Button */}
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--gold)] hover:text-[var(--gold)] shadow-xs transition-colors"
                        title="Copy event link to clipboard"
                    >
                        {copied ? (
                            <>
                                <Check size={14} className="text-[#10B981]" />
                                <span className="text-[#10B981]">Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span>Copy Link</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
