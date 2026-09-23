import React from 'react';
import { createProvenanceSlots } from '@intuitui-labs/editorial/provenance';
import { ShieldCheck, Calendar, User, Scale, Clock, Globe } from 'lucide-react';

export const ProvenanceBanner = ({ 
    item, 
    className = "", 
    mapping = {
        title: 'title',
        subtitle: 'brief',
        contentKind: 'label',
        author: 'author',
        publishDate: 'date',
        updatedDate: 'updatedAt',
        license: 'license',
        canonicalUrl: 'canonicalUrl',
    } 
}) => {
    if (!item) return null;

    const slots = createProvenanceSlots(item, mapping, {
        fallbackAuthor: "BFSU Secretariat",
        fallbackLicense: "Official BFSU Gazette / University of Moratuwa",
        kindLabels: {
            "Achievement": "Collegiate Accolade",
            "Urgent Advisory": "Statutory Notice",
            "Feedback": "Student Assembly Consultation",
            "Gathering": "Union Tradition",
            "Sports": "University Championship",
            "Celebration": "Cultural Festival",
        }
    });

    return (
        <aside 
            className={`border border-[#C59B27]/30 bg-[#FAF9F5]/90 dark:bg-[#111622]/90 rounded-2xl p-5 sm:p-6 mb-10 shadow-sm backdrop-blur-sm transition-colors ${className}`}
            aria-label="Editorial provenance and canonical publication record"
        >
            {/* Structured Schema.org JSON-LD output */}
            {slots.schemaJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(slots.schemaJsonLd) }}
                />
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.16em] uppercase text-[#C59B27]">
                    <ShieldCheck size={16} className="text-[#C59B27]" />
                    <span>Verified Union Ledger & Provenance Record</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#C59B27]/15 text-[#C59B27] border border-[#C59B27]/30">
                        {slots.kindBadge.value}
                    </span>
                    {slots.readingTimeText && (
                        <span className="font-mono text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                            <Clock size={11} /> {slots.readingTimeText}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs font-medium text-[var(--text-muted)]">
                {/* Author */}
                <div className="flex items-start gap-2">
                    <User size={14} className="text-[#C59B27] mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">Issuer / Author</span>
                        <span className="text-[var(--text-primary)] font-semibold">{slots.authorBadge.value}</span>
                    </div>
                </div>

                {/* Published & Updated Timestamps */}
                <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-[#C59B27] mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">Chronology</span>
                        <span className="text-[var(--text-primary)] font-semibold">{slots.provenanceSummary}</span>
                    </div>
                </div>

                {/* License & Authority */}
                <div className="flex items-start gap-2">
                    <Scale size={14} className="text-[#C59B27] mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">Governance / Charter</span>
                        <span className="text-[var(--text-primary)] font-semibold">{slots.licenseBadge.value}</span>
                    </div>
                </div>
            </div>

            {slots.canonicalBadge && (
                <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--text-faint)]">Canonical Source:</span>
                    <a 
                        href={slots.canonicalBadge.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#C59B27] hover:underline inline-flex items-center gap-1"
                    >
                        <Globe size={12} /> {slots.canonicalBadge.host}
                    </a>
                </div>
            )}
        </aside>
    );
};
