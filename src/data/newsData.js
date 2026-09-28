import { Trophy, AlertTriangle, Link as LinkIcon } from 'lucide-react';

const rawArticles = [
    {
        id: 1,
        slug: "colours-award-winners-2025",
        title: "Congratulations to the Colours Award winners - 2025!",
        description: "May your journey continue to shine with success and inspiration.",
        date: "2026-04-01",
        label: "Achievement",
        author: "BFSU Editorial Board",
        brief: "May your journey continue to shine with success and inspiration.",
        content: `
            <p>Congratulations to the Colours Award winners - 2025!</p>
            <br/>
            <p>May your journey continue to shine with success and inspiration as you bring pride and honor to the Faculty of Business, University of Moratuwa.</p>
        `,
        image: "/images/colours-2025-1.jpg",
        images: [
            "/images/colours-2025-1.jpg",
            "/images/colours-2025-2.jpg",
            "/images/colours-2025-3.jpg"
        ],
        icon: Trophy,
        kind: "article",
        language: "en"
    },
    {
        id: 2,
        slug: "urgent-safety-alert",
        title: "URGENT SAFETY ALERT: ATTEMPTED ROBBERIES",
        description: "Please be extremely careful. Security notice regarding safety around boarding places.",
        date: "2026-03-12",
        label: "Security",
        author: "BFSU Security & Welfare",
        brief: "Please be extremely careful. There have been incident (2026.03.12) of armed robbers targeting students.",
        content: `
            <p>🚨 <strong>URGENT SAFETY ALERT: ATTEMPTED ROBBERIES</strong> 🚨</p>
            <br/>
            <p>Please be extremely careful. There have been incident (2026.03.12) of armed robbers targeting students heading back to their boarding places.</p>
            <br/>
            <p>⚠️ <strong>1. PLEASE ENSURE YOUR SAFETY & DO NOT WALK ALONE.</strong></p>
            <br/>
            <p>⚠️ <strong>2. THEFTS IN THE LIBRARY:</strong></p>
            <p>We have also received reports of money being stolen inside the university library.</p>
            <p>Please DO NOT leave your wallets, phones, or important belongings unattended in common areas or on desks, even for a short break. Always keep them with you.</p>
            <br/>
            <p>📢 Union has officially informed all university administration and Police stations, urging them to immediately address this and increase security in the area.</p>
            <br/>
            <p><em>-MSU-</em></p>
        `,
        image: null,
        icon: AlertTriangle,
        kind: "article",
        language: "en"
    },
    {
        id: 3,
        slug: "student-feedback-form",
        title: "Faculty of Business – Student Feedback Form",
        description: "The Business Faculty Students' Union invites all students to share their feedback, concerns, and suggestions.",
        date: "2026-03-01",
        label: "Feedback",
        author: "BFSU Academic & Welfare",
        entityCode: "BFSU",
        brief: "The Business Faculty Students' Union invites all students to share their feedback, concerns, complaints, and suggestions.",
        content: `
            <p>📢 <strong>Faculty of Business – Student Feedback Form</strong></p>
            <br/>
            <p>The Business Faculty Students’ Union, University of Moratuwa, invites all students to share their feedback, concerns, complaints, and suggestions to help improve the academic and student experience.</p>
            <br/>
            <p>🔗 <strong>Submit your response here:</strong><br/>
            <a href="https://forms.gle/uPNxwgi6P3wp8HAA8" target="_blank" class="text-bfsu-gold font-bold hover:underline">https://forms.gle/uPNxwgi6P3wp8HAA8</a></p>
            <br/>
            <p>Your input is valuable and will help us work towards positive improvements.</p>
            <br/>
            <p>Business Faculty Students’ Union<br/>University of Moratuwa</p>
        `,
        image: null,
        icon: LinkIcon,
        kind: "article",
        language: "en"
    },
    {
        id: 4,
        slug: "hybrid-platform-operational-release",
        title: "Deployment of Unified BFSU Hybrid Operating System & Governance Ledger",
        description: "Official release notes for the Faculty digital infrastructure connecting live Notion databases, Supabase verified profiles, and democratic batch representation.",
        date: "2026-09-25",
        label: "Technology",
        author: "Naveen Sandeepa",
        authorUsername: "naveen-sandeepa",
        authorRole: "Lead Systems Architect & Core Developer",
        cohortCode: "B22-DS",
        entityCode: "BFSU",
        brief: "Architecture dispatch detailing the multi-tier institutional hierarchy, batch representative registers, and zero-mock live profile synchronization.",
        content: `
            <p>🚀 <strong>Deployment of Unified BFSU Hybrid Operating System</strong></p>
            <br/>
            <p>The Business Faculty Students' Union announces the deployment of its unified digital backplane, engineered to connect statutory governance with live data backplanes.</p>
            <br/>
            <p><strong>Core Architectural Milestones:</strong></p>
            <ul>
                <li><strong>Institutional Hierarchy:</strong> Formalized University (Level 0), Faculty of Business (Level 1), 3 Academic Departments (Level 2), and Societies SOBA, BPMSS, FSMSS (Level 3).</li>
                <li><strong>Democratic Cohort Representation:</strong> Integrated 2 elected Batch Representatives for each (Batch x Department) cohort with time-bounded tenure ledgers.</li>
                <li><strong>Universal Identity:</strong> Autonomous student profiles with LinkedIn OAuth sync and zero-mock fallbacks.</li>
            </ul>
        `,
        image: null,
        icon: LinkIcon,
        kind: "article",
        language: "en"
    }
];

export const newsData = rawArticles;
