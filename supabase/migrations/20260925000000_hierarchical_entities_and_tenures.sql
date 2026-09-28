-- ==============================================================================
-- Migration: 20260925000000_hierarchical_entities_and_tenures.sql
-- 
-- Formalizes the Complete Institutional Hierarchy & Governance Ontology:
-- 1. universities (University of Moratuwa - Level 0)
-- 2. faculties (Faculty of Business - Level 1)
-- 3. departments (linked to faculties - Level 2)
-- 4. institutional_entities (BFSU Union, SOBA, BPMSS, FSMSS Societies - Level 3)
-- 5. academic_intakes & department_cohorts (Batch 20, 21, 22... x DS/MOT/IM)
-- 6. batch_representatives (2 reps per batch*dept group, time-bounded, extendable)
-- 7. institutional_affiliations (Individual Person -> Uni -> Faculty -> Dept Cohort)
-- 8. entity_tenures (Union & Society elected/appointed offices by session term)
-- 9. entity_milestones (Dynamic timelines, decennial roadmap, historical achievements)
-- 10. Web Attribution Links (News, Events, Achievements, Maintainers)
-- 11. platform_maintainers (Web engineering, design, architecture contributors)
-- ==============================================================================

-- 1. UNIVERSITIES (Level 0 Root)
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- 'UOM'
    name TEXT NOT NULL,
    country TEXT DEFAULT 'Sri Lanka' NOT NULL,
    established_year INTEGER DEFAULT 1972,
    motto TEXT,
    logo_url TEXT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Universities are viewable by everyone" ON public.universities;
CREATE POLICY "Universities are viewable by everyone"
ON public.universities FOR SELECT
USING (true);

-- Seed University of Moratuwa
INSERT INTO public.universities (code, name, established_year, motto, website_url)
VALUES ('UOM', 'University of Moratuwa', 1972, 'Wisdom is the Greatest Wealth', 'https://uom.lk')
ON CONFLICT (code) DO NOTHING;

-- 2. FACULTIES (Level 1)
CREATE TABLE IF NOT EXISTS public.faculties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE RESTRICT,
    code TEXT UNIQUE NOT NULL, -- 'FOB'
    name TEXT NOT NULL,
    established_year INTEGER DEFAULT 2017,
    dean_name TEXT,
    vision_statement TEXT,
    charter_summary TEXT,
    portal_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.faculties ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Faculties are viewable by everyone" ON public.faculties;
CREATE POLICY "Faculties are viewable by everyone"
ON public.faculties FOR SELECT
USING (true);

-- Seed Faculty of Business
INSERT INTO public.faculties (university_id, code, name, established_year, vision_statement, portal_url)
VALUES (
    (SELECT id FROM public.universities WHERE code = 'UOM'),
    'FOB',
    'Faculty of Business',
    2017,
    'To be the pioneering center of excellence in quantitative business analytics, management of technology, and enterprise decision systems in South Asia.',
    'https://uom.lk/business'
)
ON CONFLICT (code) DO NOTHING;

-- 3. DEPARTMENTS (Level 2)
CREATE TABLE IF NOT EXISTS public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- 'DS', 'MOT', 'IM'
    name TEXT NOT NULL,
    focus_summary TEXT NOT NULL,
    portal_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure faculty_id column exists
ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS faculty_id UUID REFERENCES public.faculties(id) ON DELETE SET NULL;

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Departments are viewable by everyone" ON public.departments;
CREATE POLICY "Departments are viewable by everyone"
ON public.departments FOR SELECT
USING (true);

INSERT INTO public.departments (faculty_id, code, name, focus_summary, portal_url)
VALUES
    ((SELECT id FROM public.faculties WHERE code = 'FOB'), 'DS', 'Department of Decision Sciences', 'Business Analytics, Applied Machine Learning, Operations Research & Supply Chain Optimization.', 'https://uom.lk/ds'),
    ((SELECT id FROM public.faculties WHERE code = 'FOB'), 'MOT', 'Department of Management of Technology', 'Business Process Management, Enterprise Systems Architecture, Technology Strategy & Innovation.', 'https://uom.lk/mot'),
    ((SELECT id FROM public.faculties WHERE code = 'FOB'), 'IM', 'Department of Industrial Management', 'Financial Services Management, Econometrics, Quantitative Finance & Financial Engineering.', 'https://uom.lk/im')
ON CONFLICT (code) DO UPDATE 
SET 
    faculty_id = EXCLUDED.faculty_id,
    name = EXCLUDED.name,
    focus_summary = EXCLUDED.focus_summary,
    portal_url = EXCLUDED.portal_url;

-- 4. INSTITUTIONAL ENTITIES (Level 3: Unions, Societies & Editorial Boards)
CREATE TABLE IF NOT EXISTS public.institutional_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL, -- 'central_union', 'faculty_union', 'departmental_society', 'editorial_board'
    faculty_id UUID REFERENCES public.faculties(id) ON DELETE CASCADE,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    code TEXT UNIQUE NOT NULL, -- 'BFSU', 'SOBA', 'BPMSS', 'FSMSS'
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    established_year INTEGER,
    notion_workspace_url TEXT,
    notion_database_id TEXT,
    logo_url TEXT,
    banner_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.institutional_entities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Institutional entities are viewable by everyone" ON public.institutional_entities;
CREATE POLICY "Institutional entities are viewable by everyone"
ON public.institutional_entities FOR SELECT
USING (true);

-- Seed BFSU and Departmental Societies (SOBA, BPMSS, FSMSS)
INSERT INTO public.institutional_entities (
    entity_type, faculty_id, department_id, code, name, slug, description, established_year, notion_workspace_url
)
VALUES
    (
        'faculty_union',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        NULL,
        'BFSU',
        'Business Faculty Students'' Union',
        'bfsu',
        'The apex statutory student governing council of the Faculty of Business, University of Moratuwa.',
        2017,
        'https://notion.so/bfsu-uom'
    ),
    (
        'departmental_society',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        (SELECT id FROM public.departments WHERE code = 'DS'),
        'SOBA',
        'Society of Business Analytics',
        'soba',
        'The official student society for Business Analytics and Decision Sciences.',
        2018,
        'https://notion.so/bfsu-uom/soba'
    ),
    (
        'departmental_society',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        (SELECT id FROM public.departments WHERE code = 'MOT'),
        'BPMSS',
        'Business Process Management Students'' Society',
        'bpmss',
        'The official student society representing Technology Management and Enterprise Business Process Systems.',
        2018,
        'https://notion.so/bfsu-uom/bpmss'
    ),
    (
        'departmental_society',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        (SELECT id FROM public.departments WHERE code = 'IM'),
        'FSMSS',
        'Financial & Service Management Student Society',
        'fsmss',
        'The official student society for Financial Services, Econometrics, and Quantitative Operations.',
        2018,
        'https://notion.so/bfsu-uom/fsmss'
    )
ON CONFLICT (code) DO UPDATE
SET
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    description = EXCLUDED.description,
    notion_workspace_url = EXCLUDED.notion_workspace_url;

-- 5. ACADEMIC INTAKES & DEPARTMENT COHORTS (Batch x Department Groups)
CREATE TABLE IF NOT EXISTS public.academic_intakes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    faculty_id UUID NOT NULL REFERENCES public.faculties(id) ON DELETE CASCADE,
    batch_name TEXT UNIQUE NOT NULL, -- 'Batch 20', 'Batch 21', 'Batch 22', 'Batch 23'
    enrollment_year INTEGER NOT NULL, -- 2020, 2021, 2022, 2023
    expected_graduation_year INTEGER NOT NULL,
    is_graduated BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.academic_intakes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Intakes are viewable by everyone" ON public.academic_intakes;
CREATE POLICY "Intakes are viewable by everyone"
ON public.academic_intakes FOR SELECT
USING (true);

-- Seed FOB Intakes
INSERT INTO public.academic_intakes (faculty_id, batch_name, enrollment_year, expected_graduation_year, is_graduated)
VALUES
    ((SELECT id FROM public.faculties WHERE code = 'FOB'), 'Batch 20', 2020, 2024, true),
    ((SELECT id FROM public.faculties WHERE code = 'FOB'), 'Batch 21', 2021, 2025, true),
    ((SELECT id FROM public.faculties WHERE code = 'FOB'), 'Batch 22', 2022, 2026, false),
    ((SELECT id FROM public.faculties WHERE code = 'FOB'), 'Batch 23', 2023, 2027, false)
ON CONFLICT (batch_name) DO NOTHING;

-- Department Cohorts: (Batch x Department Group)
CREATE TABLE IF NOT EXISTS public.department_cohorts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intake_id UUID NOT NULL REFERENCES public.academic_intakes(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES public.departments(id) ON DELETE CASCADE,
    cohort_code TEXT UNIQUE NOT NULL, -- 'B22-DS', 'B22-MOT', 'B22-IM'
    cohort_name TEXT NOT NULL, -- 'Batch 22 Decision Sciences'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.department_cohorts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Department cohorts are viewable by everyone" ON public.department_cohorts;
CREATE POLICY "Department cohorts are viewable by everyone"
ON public.department_cohorts FOR SELECT
USING (true);

-- Seed Cohorts for Batch 22 and Batch 23
INSERT INTO public.department_cohorts (intake_id, department_id, cohort_code, cohort_name)
SELECT 
    i.id, d.id, 
    CONCAT(REPLACE(i.batch_name, 'atch ', ''), '-', d.code),
    CONCAT(i.batch_name, ' ', d.name)
FROM public.academic_intakes i
CROSS JOIN public.departments d
WHERE i.batch_name IN ('Batch 22', 'Batch 23')
ON CONFLICT (cohort_code) DO NOTHING;

-- 6. BATCH REPRESENTATIVES (2 per cohort, time-bounded, extendable/reducible)
CREATE TABLE IF NOT EXISTS public.batch_representatives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cohort_id UUID NOT NULL REFERENCES public.department_cohorts(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    academic_year_term TEXT NOT NULL, -- '2024/2025', '2025/2026'
    is_current BOOLEAN DEFAULT true NOT NULL,
    term_start DATE,
    term_end DATE, -- Can be extended or reduced based on senate calendar
    rep_number INTEGER DEFAULT 1 NOT NULL, -- 1 or 2 (typically 2 reps per cohort)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (cohort_id, profile_id, academic_year_term)
);

ALTER TABLE public.batch_representatives ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Batch representatives are viewable by everyone" ON public.batch_representatives;
CREATE POLICY "Batch representatives are viewable by everyone"
ON public.batch_representatives FOR SELECT
USING (true);

-- 7. INSTITUTIONAL AFFILIATIONS (Person -> Uni -> Faculty -> Dept Cohort)
CREATE TABLE IF NOT EXISTS public.institutional_affiliations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    university_id UUID NOT NULL REFERENCES public.universities(id) ON DELETE RESTRICT,
    faculty_id UUID NOT NULL REFERENCES public.faculties(id) ON DELETE RESTRICT,
    department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
    cohort_id UUID REFERENCES public.department_cohorts(id) ON DELETE SET NULL,
    affiliation_type TEXT NOT NULL, -- 'undergraduate', 'postgraduate', 'alumni', 'academic_staff', 'admin_staff', 'external'
    batch TEXT, -- 'Batch 22'
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.institutional_affiliations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Affiliations are viewable by everyone" ON public.institutional_affiliations;
CREATE POLICY "Affiliations are viewable by everyone"
ON public.institutional_affiliations FOR SELECT
USING (true);

-- 8. TIME-BOUNDED ENTITY TENURES (Union & Society Elected/Appointed Offices)
CREATE TABLE IF NOT EXISTS public.entity_tenures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID NOT NULL REFERENCES public.institutional_entities(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_title TEXT NOT NULL, -- 'President', 'Vice President', 'Secretary', 'Junior Treasurer', 'Editor', 'Committee Member'
    appointment_type TEXT DEFAULT 'elected' NOT NULL, -- 'elected', 'appointed', 'ex-officio', 'staff_advisor'
    session_term TEXT NOT NULL, -- '2025/2026', '2024/2025', '2023/2024'
    priority_order INTEGER DEFAULT 10 NOT NULL, -- 1=President, 2=VP, 3=Sec...
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN DEFAULT true NOT NULL,
    key_initiative_summary TEXT, -- Initiatives achieved during this leadership tenure
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.entity_tenures ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tenures are viewable by everyone" ON public.entity_tenures;
CREATE POLICY "Tenures are viewable by everyone"
ON public.entity_tenures FOR SELECT
USING (true);

-- 9. DYNAMIC ENTITY MILESTONES & TIMELINES (Zero Hardcoding)
CREATE TABLE IF NOT EXISTS public.entity_milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL, -- 'university', 'faculty', 'institutional_entity'
    entity_id UUID NOT NULL, -- references universities(id), faculties(id), or institutional_entities(id)
    year INTEGER NOT NULL,
    date_display TEXT, -- 'January 2017', 'Decennial 2027'
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT, -- 'foundation', 'curriculum', 'governance', 'championship'
    media_url TEXT,
    order_index INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.entity_milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Milestones are viewable by everyone" ON public.entity_milestones;
CREATE POLICY "Milestones are viewable by everyone"
ON public.entity_milestones FOR SELECT
USING (true);

-- Seed FOB Milestones & Decennial
INSERT INTO public.entity_milestones (entity_type, entity_id, year, date_display, title, summary, category, order_index)
VALUES
    (
        'faculty',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        2017,
        '2017',
        'Faculty Foundation Charter',
        'Establishment of the Faculty of Business at the University of Moratuwa as Sri Lanka''s pioneer in quantitative business analytics.',
        'foundation',
        1
    ),
    (
        'faculty',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        2020,
        '2020',
        'First Convocation & Graduate Dispatch',
        'Inaugural graduating cohort awarded BSc Honours degrees with 100% graduate employment in enterprise tech and corporate banking.',
        'curriculum',
        2
    ),
    (
        'faculty',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        2025,
        '2025',
        'Central Enterprise Operations & Digital Platform',
        'Deployment of the unified BFSU hybrid operational platform integrating student governance with live data backplanes.',
        'governance',
        3
    ),
    (
        'faculty',
        (SELECT id FROM public.faculties WHERE code = 'FOB'),
        2027,
        '2027',
        'Decennial Milestone (10 Years)',
        'Celebration of 10 years of institutional leadership, academic breakthroughs, and global alumni leadership.',
        'foundation',
        4
    );

-- 10. ARTIFACT ATTRIBUTION EXTENSIONS (News, Events, Achievements, Maintainers)
-- Links artifacts to specific individuals, groups, or entities
ALTER TABLE public.events
ADD COLUMN IF NOT EXISTS hosted_by_entity_id UUID REFERENCES public.institutional_entities(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

ALTER TABLE public.news
ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS author_name TEXT DEFAULT 'BFSU Secretariat',
ADD COLUMN IF NOT EXISTS entity_id UUID REFERENCES public.institutional_entities(id) ON DELETE SET NULL;

ALTER TABLE public.achievements
ADD COLUMN IF NOT EXISTS entity_id UUID REFERENCES public.institutional_entities(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS cohort_id UUID REFERENCES public.department_cohorts(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS recipient_profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 11. WEB PLATFORM MAINTAINERS & TECH SECRETARIAT
CREATE TABLE IF NOT EXISTS public.platform_maintainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_title TEXT NOT NULL, -- 'Lead Systems Architect', 'Frontend Engineer', 'UI/UX Designer', 'Notion Ops Lead'
    domain_specialty TEXT, -- 'Hybrid Notion-Supabase Backplane', 'Design System & Motion'
    session_term TEXT NOT NULL, -- '2024/2025', '2025/2026'
    is_active BOOLEAN DEFAULT true NOT NULL,
    priority_order INTEGER DEFAULT 1 NOT NULL,
    contributions_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (profile_id, session_term, role_title)
);

ALTER TABLE public.platform_maintainers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Platform maintainers are viewable by everyone" ON public.platform_maintainers;
CREATE POLICY "Platform maintainers are viewable by everyone"
ON public.platform_maintainers FOR SELECT
USING (true);
