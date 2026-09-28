-- ==============================================================================
-- Migration: Vendor-Neutral Hexagonal Collaboration Engine
-- 
-- Eliminates proprietary vendor lock-in (Notion vs Google Workspace) by establishing:
-- 1. Multi-provider columns on institutional_entities (Google Drive, Calendar, Forms, GitHub, Notion)
-- 2. collaboration_resources relational table for zero-friction student access
-- 3. Pre-seeded multi-suite resources for BFSU, SOBA, BPMSS, FSMSS, and Central UoM utilities
-- ==============================================================================

-- 1. Add Vendor-Neutral Collaboration Workspace Fields to institutional_entities
ALTER TABLE public.institutional_entities
ADD COLUMN IF NOT EXISTS google_drive_url TEXT,
ADD COLUMN IF NOT EXISTS google_calendar_id TEXT,
ADD COLUMN IF NOT EXISTS google_form_url TEXT,
ADD COLUMN IF NOT EXISTS github_org_url TEXT,
ADD COLUMN IF NOT EXISTS preferred_suite TEXT DEFAULT 'hybrid' CHECK (preferred_suite IN ('hybrid', 'google_first', 'notion_first', 'open_web'));

-- Update existing entities with verified multi-provider endpoints
UPDATE public.institutional_entities
SET 
    google_drive_url = 'https://drive.google.com/drive/folders/uom-bfsu-student-resources',
    google_calendar_id = 'bfsu.uom.events@gmail.com',
    google_form_url = 'https://forms.gle/bfsu-uom-inquiries',
    github_org_url = 'https://github.com/FOB-UOM',
    preferred_suite = 'hybrid'
WHERE code = 'BFSU';

UPDATE public.institutional_entities
SET 
    google_drive_url = 'https://drive.google.com/drive/folders/uom-soba-analytics-repo',
    google_calendar_id = 'soba.ds.uom@gmail.com',
    google_form_url = 'https://forms.gle/soba-ds-membership',
    github_org_url = 'https://github.com/FOB-UOM/soba-analytics',
    preferred_suite = 'hybrid'
WHERE code = 'SOBA';

UPDATE public.institutional_entities
SET 
    google_drive_url = 'https://drive.google.com/drive/folders/uom-bpmss-tech-systems',
    google_calendar_id = 'bpmss.mot.uom@gmail.com',
    google_form_url = 'https://forms.gle/bpmss-membership',
    preferred_suite = 'hybrid'
WHERE code = 'BPMSS';

UPDATE public.institutional_entities
SET 
    google_drive_url = 'https://drive.google.com/drive/folders/uom-fsmss-financial-econometrics',
    google_calendar_id = 'fsmss.im.uom@gmail.com',
    google_form_url = 'https://forms.gle/fsmss-clinic-registration',
    preferred_suite = 'hybrid'
WHERE code = 'FSMSS';

-- 2. Dedicated Multi-Provider Collaboration Resources Table
CREATE TABLE IF NOT EXISTS public.collaboration_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID REFERENCES public.institutional_entities(id) ON DELETE CASCADE,
    entity_code TEXT NOT NULL, -- 'BFSU', 'SOBA', 'BPMSS', 'FSMSS', 'CENTRAL_UOM'
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL CHECK (category IN ('academic', 'projects', 'secretariat', 'research', 'multimedia', 'general')),
    provider TEXT NOT NULL CHECK (provider IN ('google_drive', 'google_docs', 'google_calendar', 'google_forms', 'notion', 'github', 'native_web')),
    access_level TEXT NOT NULL CHECK (access_level IN ('public', 'institutional_uom', 'committee_restricted')),
    url TEXT NOT NULL,
    action_type TEXT NOT NULL CHECK (action_type IN ('open_link', 'add_calendar', 'download', 'embed')),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_collab_resources_entity ON public.collaboration_resources(entity_code);
CREATE INDEX IF NOT EXISTS idx_collab_resources_category ON public.collaboration_resources(category);
CREATE INDEX IF NOT EXISTS idx_collab_resources_provider ON public.collaboration_resources(provider);

ALTER TABLE public.collaboration_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Collaboration resources are viewable by everyone" ON public.collaboration_resources;
CREATE POLICY "Collaboration resources are viewable by everyone"
ON public.collaboration_resources FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage collaboration resources" ON public.collaboration_resources;
CREATE POLICY "Authenticated users can manage collaboration resources"
ON public.collaboration_resources FOR ALL
USING (auth.role() = 'authenticated');

-- 3. Seed Verified Collaboration Resources (Decoupled Multi-Provider Arsenal)
INSERT INTO public.collaboration_resources (
    entity_code, title, description, category, provider, access_level, url, action_type, display_order
)
VALUES
    -- BFSU Union Central Resources
    (
        'BFSU',
        'Academic Bylaws & Student Guidance Drive',
        'Comprehensive repository of faculty bylaws, curriculum structures, and exam regulations accessible via @uom.lk accounts with zero Notion friction.',
        'academic',
        'google_drive',
        'institutional_uom',
        'https://drive.google.com/drive/folders/uom-bfsu-student-resources',
        'open_link',
        1
    ),
    (
        'BFSU',
        'Union Executive Operating System',
        'Relational Notion workspace for internal executive committees, minute archives, and project trackers.',
        'secretariat',
        'notion',
        'committee_restricted',
        'https://notion.so/bfsu-uom',
        'open_link',
        2
    ),
    (
        'BFSU',
        'Faculty Master Academic & Events Calendar',
        'Direct Google Calendar feed: synchronize lecture schedules, union deadlines, and guest lectures to your mobile device.',
        'general',
        'google_calendar',
        'public',
        'https://calendar.google.com/calendar/u/0/r?cid=bfsu.uom.events@gmail.com',
        'add_calendar',
        3
    ),
    (
        'BFSU',
        'Open Source Web Platform Repository',
        'Public GitHub codebase of the BFSU platform and student technical initiatives under MIT license.',
        'projects',
        'github',
        'public',
        'https://github.com/FOB-UOM/BFSU-web',
        'open_link',
        4
    ),

    -- SOBA (Decision Sciences) Resources
    (
        'SOBA',
        'Business Analytics Dataset Archive & Code Notebooks',
        'Curated open-access datasets, Python/R starter templates, and optimization case studies for Decision Sciences students.',
        'research',
        'google_drive',
        'public',
        'https://drive.google.com/drive/folders/uom-soba-analytics-repo',
        'open_link',
        1
    ),
    (
        'SOBA',
        'Analytics Hackathon & Workshop Workspace',
        'Notion relational database for Datathon team registrations, leaderboard scoring, and problem statements.',
        'projects',
        'notion',
        'public',
        'https://notion.so/bfsu-uom/soba',
        'open_link',
        2
    ),

    -- BPMSS (Management of Technology) Resources
    (
        'BPMSS',
        'Enterprise Systems & SAP Case Repository',
        'Digital transformation case studies, ERP workflow diagrams, and BPMN 2.0 specifications on Google Drive.',
        'academic',
        'google_drive',
        'institutional_uom',
        'https://drive.google.com/drive/folders/uom-bpmss-tech-systems',
        'open_link',
        1
    ),
    (
        'BPMSS',
        'Annual Tech Symposium Steering Desk',
        'Collaborative Notion workspace for corporate partner coordination, stage production, and tech keynote archives.',
        'projects',
        'notion',
        'committee_restricted',
        'https://notion.so/bfsu-uom/bpmss',
        'open_link',
        2
    ),

    -- FSMSS (Industrial Management) Resources
    (
        'FSMSS',
        'Quantitative Finance & Financial Modeling Toolkits',
        'Financial statement analysis templates, discounted cash flow (DCF) models, and econometric datasets on Google Drive.',
        'academic',
        'google_drive',
        'institutional_uom',
        'https://drive.google.com/drive/folders/uom-fsmss-financial-econometrics',
        'open_link',
        1
    ),
    (
        'FSMSS',
        'Industrial Management Clinic & Advisory Workspace',
        'Notion hub for SME consulting clinics, factory tour logistics, and alumni mentorship matchmaking.',
        'secretariat',
        'notion',
        'public',
        'https://notion.so/bfsu-uom/fsmss',
        'open_link',
        2
    );
