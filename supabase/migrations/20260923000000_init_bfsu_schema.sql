-- ==============================================================================
-- BFSU-UOM: Complete Initial Schema, Security Policies & Seed Data
-- ==============================================================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('student', 'alumni', 'union_exec', 'faculty_staff', 'admin');
CREATE TYPE registration_status AS ENUM ('registered', 'confirmed', 'attended', 'cancelled');

-- 2. Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'student'::user_role NOT NULL,
    student_id TEXT, -- e.g. "224001A"
    department TEXT, -- e.g. "Department of Decision Sciences"
    batch TEXT,      -- e.g. "Batch '22"
    linkedin_url TEXT,
    avatar_url TEXT,
    is_verified BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 3. Automatic Profile Creation on Supabase Auth Signup Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
        COALESCE(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
        'student'::user_role
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. News & Notices Table
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    brief TEXT NOT NULL,
    content TEXT NOT NULL,
    label TEXT DEFAULT 'Circular' NOT NULL,
    author TEXT DEFAULT 'BFSU Secretariat' NOT NULL,
    date TEXT NOT NULL, -- e.g. "2026-04-01"
    image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for News
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published news are viewable by anyone" 
ON public.news FOR SELECT 
USING (published = true);

CREATE POLICY "Union executives and admins can manage news" 
ON public.news FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('union_exec', 'admin')
    )
);

-- 5. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    brief TEXT NOT NULL,
    content TEXT NOT NULL,
    label TEXT DEFAULT 'Gathering' NOT NULL,
    date TEXT NOT NULL,
    location TEXT NOT NULL,
    image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    organizer TEXT DEFAULT 'BFSU Secretariat' NOT NULL,
    max_capacity INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published events are viewable by anyone" 
ON public.events FOR SELECT 
USING (published = true);

CREATE POLICY "Union executives and admins can manage events" 
ON public.events FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('union_exec', 'admin')
    )
);

-- 6. Event Registrations Table (Students RSVPing for Events)
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status registration_status DEFAULT 'registered'::registration_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(event_id, user_id)
);

-- Enable RLS for Event Registrations
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own registrations" 
ON public.event_registrations FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can register themselves for events" 
ON public.event_registrations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Union executives can view all event registrations" 
ON public.event_registrations FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE profiles.id = auth.uid() 
        AND profiles.role IN ('union_exec', 'admin')
    )
);

-- ==============================================================================
-- 7. SEED DATA: Migrate existing hardcoded news into DB
-- ==============================================================================
INSERT INTO public.news (slug, title, brief, content, label, author, date, image, images)
VALUES 
(
    'colours-award-winners-2025',
    'Congratulations to the Colours Award winners - 2025!',
    'May your journey continue to shine with success and inspiration as you bring pride and honor to the Faculty of Business.',
    '<p>Congratulations to the Colours Award winners - 2025!</p><br/><p>May your journey continue to shine with success and inspiration as you bring pride and honor to the Faculty of Business, University of Moratuwa.</p>',
    'Achievement',
    'BFSU Editorial Board',
    '2026-04-01',
    '/images/colours-2025-1.jpg',
    '["/images/colours-2025-1.jpg", "/images/colours-2025-2.jpg", "/images/colours-2025-3.jpg"]'::jsonb
),
(
    'urgent-safety-alert',
    'URGENT SAFETY ALERT',
    'Important safety guidelines and security protocol updates issued for all undergraduates and campus premises.',
    '<p>Important safety guidelines and security protocol updates issued for all undergraduates and campus premises.</p><br/><p>Please ensure you adhere strictly to university safety standards and report any unusual incidents to security personnel immediately.</p>',
    'Urgent Advisory',
    'Security Division',
    '2026-03-28',
    NULL,
    '[]'::jsonb
),
(
    'student-feedback-form',
    'Student Feedback Form for Ongoing Semester',
    'Voice your thoughts and help improve the academic and faculty experience for everyone.',
    '<p>Voice your thoughts and help improve the academic and faculty experience for everyone.</p><br/><p>The Business Faculty Students Union is collecting constructive feedback regarding lecture pacing, facility access, and student welfare for the ongoing term.</p>',
    'Feedback',
    'Union Council',
    '2026-03-15',
    NULL,
    '[]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 8. SEED DATA: Migrate existing hardcoded events into DB
-- ==============================================================================
INSERT INTO public.events (slug, title, brief, content, label, date, location, image, images, organizer)
VALUES 
(
    'hanthana-trip-batch-24',
    'Hanthana Batch Trip – Batch 24',
    'An unforgettable journey through the mist and trails of Hanthana, strengthening batch camaraderie.',
    '<p>An unforgettable journey through the mist and trails of Hanthana, strengthening batch camaraderie and creating timeless collegiate memories for Batch 24.</p>',
    'Gathering',
    '2026-03-10',
    'Hanthana Mountain Range, Kandy',
    '/images/hanthana-trip.jpg',
    '["/images/hanthana-trip.jpg"]'::jsonb,
    'Batch 24 Committee'
),
(
    'sarasavi-panhida-2025',
    'Sarasawi Panhida 2025',
    'A cultural and literary night celebrating linguistic artistry, poetry, and musical performances.',
    '<p>A cultural and literary night celebrating linguistic artistry, poetry, and musical performances by students and esteemed university faculty.</p>',
    'Celebration',
    '2026-04-18',
    'Civil Auditorium, UoM',
    '/images/colours-2025-2.jpg',
    '["/images/colours-2025-2.jpg"]'::jsonb,
    'Cultural Subcommittee'
),
(
    'bfsu-cricket-match-2025',
    'Annual Business Faculty Cricket Encounter 2025',
    'Inter-departmental cricket tournament fostering athletic excellence and faculty spirit.',
    '<p>Inter-departmental cricket tournament fostering athletic excellence, healthy rivalry, and faculty spirit across DS, MOT, and IM departments.</p>',
    'Sports',
    '2026-05-02',
    'University Grounds, Moratuwa',
    '/images/colours-2025-1.jpg',
    '["/images/colours-2025-1.jpg"]'::jsonb,
    'Sports Subcommittee'
)
ON CONFLICT (slug) DO NOTHING;
