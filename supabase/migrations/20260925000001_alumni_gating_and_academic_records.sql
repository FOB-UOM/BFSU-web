-- ==============================================================================
-- Migration: 20260925000001_alumni_gating_and_academic_records.sql
-- 
-- 1. Alumni Gating, Consent & Verification Controls
-- 2. Academic Distinctions & Dean's List Honor Ledger
-- 3. Accredited Module Competencies (Publicly Safe, No Raw Marks/GPAs)
-- 4. Student Sovereignty & Privacy Toggles
-- ==============================================================================

-- 1. Alumni Ingress & Privacy Columns on public.profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS alumni_status TEXT DEFAULT 'eligible',
ADD COLUMN IF NOT EXISTS directory_opt_in BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_source TEXT,
ADD COLUMN IF NOT EXISTS alumni_dues_valid_until DATE,
ADD COLUMN IF NOT EXISTS show_deans_list BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS show_degree_class BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS show_modules_taken BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS academic_records_visibility TEXT DEFAULT 'public';

-- 2. Academic Distinctions & Dean's List Table
CREATE TABLE IF NOT EXISTS public.academic_distinctions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    distinction_type TEXT NOT NULL, -- 'deans_list', 'academic_excellence_award', 'gold_medal', 'colours_award'
    title TEXT NOT NULL, -- e.g. "Dean's List Distinction"
    academic_year TEXT NOT NULL, -- e.g. "2023/2024"
    semester TEXT, -- e.g. "Semester 4", "Semester 5"
    issuing_authority TEXT DEFAULT 'Faculty of Business, University of Moratuwa' NOT NULL,
    awarded_date DATE,
    is_verified BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.academic_distinctions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Academic distinctions are viewable by everyone" ON public.academic_distinctions;
CREATE POLICY "Academic distinctions are viewable by everyone"
ON public.academic_distinctions FOR SELECT
USING (true);

-- 3. Module Competencies Table (Competency proof without confidential grades)
CREATE TABLE IF NOT EXISTS public.module_competencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_code TEXT, -- e.g. 'MN 3020'
    module_name TEXT NOT NULL, -- e.g. 'Machine Learning for Business Applications'
    competency_domain TEXT, -- 'Analytics & AI', 'Quantitative Finance', 'Enterprise Architecture'
    is_verified BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (profile_id, module_name)
);

ALTER TABLE public.module_competencies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Module competencies are viewable by everyone" ON public.module_competencies;
CREATE POLICY "Module competencies are viewable by everyone"
ON public.module_competencies FOR SELECT
USING (true);
