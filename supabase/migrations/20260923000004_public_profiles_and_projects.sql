-- Migration: Public profile controls, student project showcases, and research papers schema

-- 1. Add is_public flag and custom username to profiles if not present
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true NOT NULL,
ADD COLUMN IF NOT EXISTS show_email BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS show_student_id BOOLEAN DEFAULT false NOT NULL;

-- 2. Student Projects Showcase (Importable from GitHub or added manually)
CREATE TABLE IF NOT EXISTS public.student_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    github_url TEXT,
    live_url TEXT,
    tags TEXT[] DEFAULT '{}'::text[],
    stars_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Student projects viewable by everyone" 
ON public.student_projects FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own projects" 
ON public.student_projects FOR ALL 
USING (auth.uid() = profile_id);

-- 3. Research Papers & Capstone Showcases
CREATE TABLE IF NOT EXISTS public.research_papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    author_name TEXT NOT NULL,
    title TEXT NOT NULL,
    abstract TEXT NOT NULL,
    journal_or_conf TEXT,
    published_year TEXT NOT NULL,
    paper_url TEXT,
    doi TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.research_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Research papers viewable by everyone" 
ON public.research_papers FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own papers" 
ON public.research_papers FOR ALL 
USING (auth.uid() = profile_id);
