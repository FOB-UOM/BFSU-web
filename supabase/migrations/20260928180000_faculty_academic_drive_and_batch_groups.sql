-- ==============================================================================
-- Migration: 20260928180000_faculty_academic_drive_and_batch_groups.sql
-- 
-- 1. Sets verified Faculty of Business Master Academic Drive URL in institutional_entities & collaboration_resources
-- 2. Adds Batch-level Google Group & Drive columns to academic_intakes (with seed data)
-- 3. Adds personal_email and institutional_email columns to public.profiles for Google Group synchronization
-- ==============================================================================

-- 1. Update Faculty Master Academic Drive in institutional_entities for BFSU
UPDATE public.institutional_entities
SET google_drive_url = 'https://drive.google.com/drive/folders/1jslodTgZhPFqyp3zm9SDQXgKN6VOttMh?usp=drive_link'
WHERE code = 'BFSU';

-- 2. Upsert Master Academic Drive in collaboration_resources
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.collaboration_resources 
        WHERE entity_code = 'BFSU' AND category = 'academic' AND provider = 'google_drive'
    ) THEN
        UPDATE public.collaboration_resources
        SET 
            title = 'Faculty Master Academic & Past Papers Drive',
            description = 'Protected faculty-wide academic repository containing past papers, lecture slides, and tutorial material across all departments (DS, MOT, IM) and batches (20–24). Access is restricted to verified students via Batch Google Groups.',
            url = 'https://drive.google.com/drive/folders/1jslodTgZhPFqyp3zm9SDQXgKN6VOttMh?usp=drive_link',
            access_level = 'institutional_uom',
            action_type = 'open_link',
            is_active = true
        WHERE entity_code = 'BFSU' AND category = 'academic' AND provider = 'google_drive';
    ELSE
        INSERT INTO public.collaboration_resources (
            entity_code, title, description, category, provider, access_level, url, action_type, display_order, is_active
        ) VALUES (
            'BFSU',
            'Faculty Master Academic & Past Papers Drive',
            'Protected faculty-wide academic repository containing past papers, lecture slides, and tutorial material across all departments (DS, MOT, IM) and batches (20–24). Access is restricted to verified students via Batch Google Groups.',
            'academic',
            'google_drive',
            'institutional_uom',
            'https://drive.google.com/drive/folders/1jslodTgZhPFqyp3zm9SDQXgKN6VOttMh?usp=drive_link',
            'open_link',
            1,
            true
        );
    END IF;
END $$;

-- 3. Add Google Group & Drive columns to academic_intakes
ALTER TABLE public.academic_intakes
ADD COLUMN IF NOT EXISTS google_group_email TEXT,
ADD COLUMN IF NOT EXISTS google_group_join_url TEXT,
ADD COLUMN IF NOT EXISTS academic_drive_url TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Update academic_intakes with standard FOB naming conventions and the master academic drive
UPDATE public.academic_intakes
SET 
    academic_drive_url = 'https://drive.google.com/drive/folders/1jslodTgZhPFqyp3zm9SDQXgKN6VOttMh?usp=drive_link',
    notes = 'Contains semester folders and departmental specialization subfolders (DS, MOT, IM).'
WHERE academic_drive_url IS NULL;

UPDATE public.academic_intakes
SET 
    google_group_email = 'fob-batch22@googlegroups.com',
    google_group_join_url = 'https://groups.google.com/g/fob-batch22'
WHERE batch_name = 'Batch 22' AND google_group_email IS NULL;

UPDATE public.academic_intakes
SET 
    google_group_email = 'fob-batch23@googlegroups.com',
    google_group_join_url = 'https://groups.google.com/g/fob-batch23'
WHERE batch_name = 'Batch 23' AND google_group_email IS NULL;

-- Ensure Batch 24 is present
INSERT INTO public.academic_intakes (faculty_id, batch_name, enrollment_year, expected_graduation_year, is_graduated, google_group_email, google_group_join_url, academic_drive_url)
VALUES (
    (SELECT id FROM public.faculties WHERE code = 'FOB'),
    'Batch 24',
    2024,
    2028,
    false,
    'fob-batch24@googlegroups.com',
    'https://groups.google.com/g/fob-batch24',
    'https://drive.google.com/drive/folders/1jslodTgZhPFqyp3zm9SDQXgKN6VOttMh?usp=drive_link'
)
ON CONFLICT (batch_name) DO UPDATE
SET 
    academic_drive_url = EXCLUDED.academic_drive_url,
    google_group_email = COALESCE(public.academic_intakes.google_group_email, EXCLUDED.google_group_email),
    google_group_join_url = COALESCE(public.academic_intakes.google_group_join_url, EXCLUDED.google_group_join_url);

-- 4. Add identity synchronization fields to public.profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS personal_email TEXT,
ADD COLUMN IF NOT EXISTS institutional_email TEXT;
