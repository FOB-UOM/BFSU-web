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

export const metadata = {
    title: {
        default: "Faculty of Business Students' Union | University of Moratuwa",
        template: "%s | BFSU UoM"
    },
    description: "Official digital portal of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa. Supporting student welfare, leadership, and professional development.",
    keywords: ["BFSU", "University of Moratuwa", "Faculty of Business", "Business Faculty Students Union", "UoM", "Sri Lanka"],
    authors: [{ name: "BFSU Secretariat" }],
    creator: "Faculty of Business Students' Union",
    metadataBase: new URL("https://bfsu-uom.lk"),
    icons: {
        icon: "/images/logo.png",
        apple: "/images/logo.png",
    },
    openGraph: {
        title: "Faculty of Business Students' Union | University of Moratuwa",
        description: "Official digital portal of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa.",
        url: "https://bfsu-uom.lk",
        siteName: "BFSU UoM",
        images: [
            {
                url: "/images/logo.png",
                width: 512,
                height: 512,
                alt: "BFSU Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Faculty of Business Students' Union | University of Moratuwa",
        description: "Official digital portal of the Business Faculty Students' Union (BFSU), Faculty of Business, University of Moratuwa.",
        images: ["/images/logo.png"],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&display=swap"
                    rel="stylesheet"
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
