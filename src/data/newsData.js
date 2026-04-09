import { Trophy, FileText, AlertTriangle, Link as LinkIcon } from 'lucide-react';

export const newsData = [
    {
        id: 1,
        slug: "colours-award-winners-2025",
        title: "Congratulations to the Colours Award winners - 2025!",
        date: "Latest",
        label: "Achievement",
        brief: "May your journey continue to shine with success and inspiration.",
        content: `
            <p>Congratulations to the Colours Award winners - 2025!</p>
            <br/>
            <p>May your journey continue to shine with success and inspiration.</p>
        `,
        image: "/images/colours-2025-1.jpg",
        images: [
            "/images/colours-2025-1.jpg",
            "/images/colours-2025-2.jpg",
            "/images/colours-2025-3.jpg"
        ],
        icon: Trophy
    },
    {
        id: 2,
        slug: "urgent-safety-alert",
        title: "URGENT SAFETY ALERT: ATTEMPTED ROBBERIES",
        date: "Recent",
        label: "Security",
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
        icon: AlertTriangle
    },
    {
        id: 3,
        slug: "student-feedback-form",
        title: "Faculty of Business – Student Feedback Form",
        date: "Notice",
        label: "Feedback",
        brief: "The Business Faculty Students’ Union invites all students to share their feedback, concerns, complaints, and suggestions.",
        content: `
            <p>📢 <strong>Faculty of Business – Student Feedback Form</strong></p>
            <br/>
            <p>The Business Faculty Students’ Union, University of Moratuwa, invites all students to share their feedback, concerns, complaints, and suggestions to help improve the academic and student experience.</p>
            <br/>
            <p>🔗 <strong>Submit your response here:</strong><br/>
            <a href="https://forms.gle/uPNxwgi6P3wp8HAA8" target="_blank" class="text-bfsu-gold hover:underline">https://forms.gle/uPNxwgi6P3wp8HAA8</a></p>
            <br/>
            <p>Your input is valuable and will help us work towards positive improvements.</p>
            <br/>
            <p>Business Faculty Students’ Union<br/>University of Moratuwa</p>
        `,
        image: null,
        icon: LinkIcon
    }
];
