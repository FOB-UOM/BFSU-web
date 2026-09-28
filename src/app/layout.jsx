import '../index.css';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { ScrollToAnchor } from '../components/ScrollToAnchor';
import { BackgroundCanvas } from '../components/BackgroundCanvas';
import { GridBackground } from '../components/GridBackground';
import { AuthModal } from '../components/AuthModal';
import { ProfilePeekProvider } from '../context/ProfilePeekContext';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '../lib/seo/schema';

export const metadata = {
    title: {
        default: "Business Faculty Students' Union | University of Moratuwa, Sri Lanka",
        template: "%s | Business Faculty Students' Union, University of Moratuwa"
    },
    description: "Official digital portal of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa, Katubedda, Moratuwa, Sri Lanka. Supporting student welfare, academic representation, and leadership.",
    keywords: [
        "Business Faculty Students' Union",
        "BFSU",
        "BFSU UoM",
        "University of Moratuwa",
        "Faculty of Business",
        "Katubedda",
        "Moratuwa",
        "Sri Lanka",
        "Student Union Sri Lanka"
    ],
    authors: [{ name: "BFSU Secretariat" }],
    creator: "Business Faculty Students' Union, University of Moratuwa",
    metadataBase: new URL("https://bfsu-uom.lk"),
    alternates: {
        canonical: "https://bfsu-uom.lk",
    },
    icons: {
        icon: "/images/logo.png",
        apple: "/images/logo.png",
    },
    openGraph: {
        title: "Business Faculty Students' Union | University of Moratuwa, Sri Lanka",
        description: "Official digital portal of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa, Katubedda, Moratuwa, Sri Lanka.",
        url: "https://bfsu-uom.lk",
        siteName: "Business Faculty Students' Union, University of Moratuwa",
        images: [
            {
                url: "/images/logo.png",
                width: 512,
                height: 512,
                alt: "Business Faculty Students' Union Crest",
            },
        ],
        locale: "en_LK",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Business Faculty Students' Union | University of Moratuwa, Sri Lanka",
        description: "Official digital portal of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa, Katubedda, Moratuwa, Sri Lanka.",
        images: ["/images/logo.png"],
    },
};

export default function RootLayout({ children }) {
    const orgJsonLd = getOrganizationJsonLd();
    const websiteJsonLd = getWebsiteJsonLd();

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&display=swap"
                    rel="stylesheet"
                />
                {/* Canonical Schema.org JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
            </head>
            <body className="antialiased selection:bg-[#C59B27]/25 selection:text-[#0F141E]">
                <ThemeProvider>
                    <AuthProvider>
                        <ProfilePeekProvider>
                            <ScrollToAnchor />

                            {/* Fixed background layers — always behind content */}
                            <GridBackground />
                            <BackgroundCanvas />

                            {/* Main scrollable surface */}
                            <div
                                className="relative min-h-screen flex flex-col font-sans w-full overflow-x-hidden pb-16 lg:pb-0"
                                style={{ zIndex: 10 }}
                            >
                                <Navbar />
                                <div className="flex-grow w-full">
                                    {children}
                                </div>
                                <Footer />
                                <MobileBottomNav />
                            </div>

                            {/* Global Authentication Modal */}
                            <AuthModal />
                        </ProfilePeekProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
