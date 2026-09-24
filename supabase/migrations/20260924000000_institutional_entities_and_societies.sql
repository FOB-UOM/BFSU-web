-- ==============================================================================
-- Migration: Institutional Hierarchy, Departmental Societies, Roles & Notion Hubs
-- Establishes:
-- 1. departments (DS, MOT, IM)
-- 2. student_societies (DSS, MOTSS, IMSS) with Notion hub connections
-- 3. institutional_roles (Union & Society executive board appointments)
-- 4. web_maintainers (Platform maintainers and developers)
-- 5. Foreign key bindings to public.profiles(id)
-- ==============================================================================

-- 1. Departments Master Table
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- 'DS', 'MOT', 'IM'
    name TEXT NOT NULL,
    focus_summary TEXT NOT NULL,
    portal_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Departments are viewable by everyone"
ON public.departments FOR SELECT
USING (true);

-- Seed Faculty Departments if not exists
INSERT INTO public.departments (code, name, focus_summary, portal_url)
VALUES
    ('DS', 'Department of Decision Sciences', 'Business Analytics, Applied Machine Learning, Operations Research & Supply Chain Optimization.', 'https://uom.lk/ds'),
    ('MOT', 'Department of Management of Technology', 'Business Process Management, Enterprise Systems Architecture, Technology Strategy & Innovation.', 'https://uom.lk/mot'),
    ('IM', 'Department of Industrial Management', 'Financial Services Management, Econometrics, Quantitative Finance & Financial Engineering.', 'https://uom.lk/im')
ON CONFLICT (code) DO UPDATE 
SET 
    name = EXCLUDED.name,
    focus_summary = EXCLUDED.focus_summary,
    portal_url = EXCLUDED.portal_url;

-- 2. Student Societies Master Table
CREATE TABLE IF NOT EXISTS public.student_societies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    code TEXT UNIQUE NOT NULL, -- 'DSS', 'MOTSS', 'IMSS'
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- 'decision-sciences', 'mot', 'industrial-management'
    description TEXT NOT NULL,
    notion_workspace_url TEXT,
    notion_database_id TEXT,
    logo_url TEXT,
    cover_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.student_societies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Student societies are viewable by everyone"
ON public.student_societies FOR SELECT
USING (true);

-- Seed the 3 Official Departmental Student Societies
INSERT INTO public.student_societies (department_id, code, name, slug, description, notion_workspace_url)
VALUES
    (
        (SELECT id FROM public.departments WHERE code = 'DS'),
        'DSS',
        'Decision Sciences Society',
        'decision-sciences',
        'The premier society representing students of Business Analytics and Decision Sciences, driving data-driven innovation, hackathons, and analytics research.',
        'https://notion.so/bfsu-uom/decision-sciences-society'
    ),
    (
        (SELECT id FROM public.departments WHERE code = 'MOT'),
        'MOTSS',
        'Management of Technology Student Society',
        'mot',
        'Fostering leadership in enterprise technology, digital transformation, and industrial innovation through industry forums and tech symposia.',
        'https://notion.so/bfsu-uom/mot-society'
    ),
    (
        (SELECT id FROM public.departments WHERE code = 'IM'),
        'IMSS',
        'Industrial Management Student Society',
        'industrial-management',
        'Uniting future leaders in quantitative finance, econometrics, and supply chain operations through industrial clinics and alumni networking.',
        'https://notion.so/bfsu-uom/industrial-management-society'
    )
ON CONFLICT (code) DO UPDATE
SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    notion_workspace_url = EXCLUDED.notion_workspace_url;

-- 3. Institutional Roles (Union, Societies, Editorial, Committees)
CREATE TABLE IF NOT EXISTS public.institutional_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    organization_type TEXT NOT NULL, -- 'union', 'society', 'editorial', 'committee'
    society_id UUID REFERENCES public.student_societies(id) ON DELETE CASCADE,
    role_title TEXT NOT NULL, -- 'President', 'Secretary', 'Vice President', etc.
    term_year TEXT NOT NULL, -- e.g. '2025/2026'
    is_current BOOLEAN DEFAULT true NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.institutional_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Institutional roles are viewable by everyone"
ON public.institutional_roles FOR SELECT
USING (true);

CREATE POLICY "Users or Execs can manage roles"
ON public.institutional_roles FOR ALL
USING (auth.uid() = profile_id);

-- 4. Web Maintainers & Engineering Contributors
CREATE TABLE IF NOT EXISTS public.web_maintainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'Lead Platform Architect', 'Frontend Engineer', 'UI/UX Designer', 'Content Editor'
    contribution_summary TEXT,
    active_term TEXT NOT NULL, -- '2025 - Present'
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.web_maintainers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Web maintainers are viewable by everyone"
ON public.web_maintainers FOR SELECT
USING (true);

-- 5. Foreign Key bindings on Events and News
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS hosted_by_society_id UUID REFERENCES public.student_societies(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

ALTER TABLE public.news
ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS society_id UUID REFERENCES public.student_societies(id) ON DELETE SET NULL;

-- 6. Add department_id FK on profiles if not present
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'department_id'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL;
    END IF;
END $$;
