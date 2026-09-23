-- Migration: Comprehensive Relational Architecture for BFSU
-- Temporal career history, alumni extensions, union executive terms, student achievements, and profile links

-- 1. Temporal Career History (Allows tracking positions over time across years)
CREATE TABLE IF NOT EXISTS public.career_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    location TEXT,
    start_date DATE NOT NULL,
    end_date DATE, -- NULL signifies current role
    is_current BOOLEAN DEFAULT false NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.career_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Career history is viewable by everyone" 
ON public.career_history FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own career history" 
ON public.career_history FOR ALL 
USING (auth.uid() = profile_id);

-- 2. Union Executive Terms (Links past & present executive board members to profiles)
CREATE TABLE IF NOT EXISTS public.union_executive_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL, -- Fallback display name if profile not registered
    term_year TEXT NOT NULL, -- e.g. "2024/2025", "2023/2024"
    role_title TEXT NOT NULL, -- e.g. "President", "Secretary", "Editor"
    avatar_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.union_executive_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Union executive roles viewable by everyone" 
ON public.union_executive_roles FOR SELECT 
USING (true);

-- 3. Student & Alumni Achievements / Honours
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    recipient_name TEXT NOT NULL,
    title TEXT NOT NULL, -- e.g. "Faculty Colours Award - Badminton 2025"
    category TEXT DEFAULT 'Collegiate' NOT NULL, -- "Sports", "Academic", "Leadership"
    year TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements viewable by everyone" 
ON public.achievements FOR SELECT 
USING (true);

-- 4. Add CV resume link and slug for public profile sharing to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS cv_url TEXT,
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
