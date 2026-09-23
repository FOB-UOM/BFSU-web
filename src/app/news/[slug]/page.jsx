import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '../../../components/ui/Container';
import { Typography } from '../../../components/ui/Typography';
import { getNews, getNewsBySlug } from '../../../lib/data/news';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { ProvenanceBanner } from '../../../components/ProvenanceBanner';

export async function generateStaticParams() {
    const items = await getNews();
    return items.map((item) => ({
        slug: item.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const newsItem = await getNewsBySlug(slug);

    if (!newsItem) {
        return {
            title: "Notice Not Found",
        };
    }

    return {
        title: newsItem.title,
        description: newsItem.brief || "Official circular from the Business Faculty Students' Union.",
        openGraph: {
            title: newsItem.title,
            description: newsItem.brief || "Official circular from the Business Faculty Students' Union.",
            images: newsItem.image ? [{ url: newsItem.image }] : ["/images/logo.png"],
        },
    };
}

export default async function SingleNews({ params }) {
    const { slug } = await params;
    const newsItem = await getNewsBySlug(slug);

    if (!newsItem) {
        notFound();
    }

    return (
        <main className="flex-grow pt-32 pb-24 relative transition-colors duration-500">
            <Container className="max-w-4xl relative z-10">
                <div className="mb-10">
                    <Link href="/news" className="inline-flex items-center gap-2 text-gray-500 hover:text-bfsu-gold transition-colors mb-8 text-xs font-bold uppercase tracking-wider">
                        <ArrowLeft size={15} /> Back to Notices
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-5">
                        <span className="bg-bfsu-gold/20 text-bfsu-primary dark:text-bfsu-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-bfsu-gold/30">
                            {newsItem.label}
                        </span>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                            <Calendar size={13} className="text-bfsu-gold" />
                            <span>{newsItem.date}</span>
                        </div>
                        {newsItem.author && (
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                                <User size={13} className="text-bfsu-gold" />
                                <span>{newsItem.author}</span>
                            </div>
                        )}
                    </div>
                    <Typography variant="h1" className="!text-3xl sm:!text-4xl md:!text-5xl mb-6 leading-tight">
                        {newsItem.title}
                    </Typography>
                </div>

                {newsItem.images && newsItem.images.length > 0 ? (
                    <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-5">
                        {newsItem.images.map((imgSrc, idx) => (
                            <div key={idx} className="rounded-2xl overflow-hidden shadow-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                                <img src={imgSrc} alt={`${newsItem.title} - View ${idx + 1}`} className="w-full h-auto object-cover aspect-auto" />
                            </div>
                        ))}
                    </div>
                ) : newsItem.image && (
                    <div className="mb-14 rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10">
                        <img src={newsItem.image} alt={newsItem.title} className="w-full h-auto max-h-[550px] object-cover" />
                    </div>
                )}

                <ProvenanceBanner item={newsItem} />

                <article className="p-8 sm:p-10 rounded-3xl glass-card border border-black/10 dark:border-white/10 shadow-sm leading-relaxed text-gray-700 dark:text-gray-300 text-base sm:text-lg [&>p]:mb-4">
                    <div
                        dangerouslySetInnerHTML={{ __html: newsItem.content }}
                    />
                </article>
            </Container>
        </main>
    );
}
