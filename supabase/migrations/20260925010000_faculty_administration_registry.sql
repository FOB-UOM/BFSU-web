-- ==============================================================================
-- Migration: Faculty Administration & Leadership Operational Registry
-- Resolves the "Web Stalling" latency where university website updates lag
-- behind official Council & Senate appointments (e.g. Dean, HODs, Assistant Registrar).
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.faculty_administration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_code TEXT UNIQUE NOT NULL, -- 'DEAN', 'HOD_DS', 'HOD_IM', 'HOD_MOT', 'AR_DEAN_OFFICE', 'DIRECTOR_UGS', 'DIRECTOR_PGS'
    role_title TEXT NOT NULL,
    appointee_name TEXT NOT NULL,
    unit_name TEXT NOT NULL,
    office_location TEXT,
    email TEXT,
    phone TEXT,
    assumed_date DATE,
    term_label TEXT NOT NULL DEFAULT 'Current',
    is_current BOOLEAN DEFAULT true NOT NULL,
    source_reference TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.faculty_administration_registry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Faculty administration registry is viewable by everyone"
ON public.faculty_administration_registry FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can manage registry"
ON public.faculty_administration_registry FOR ALL
USING (auth.role() = 'authenticated');

-- Seed Current Leadership Appointments (as of September 2026)
INSERT INTO public.faculty_administration_registry (
    role_code, 
    role_title, 
    appointee_name, 
    unit_name, 
    office_location, 
    email, 
    phone, 
    assumed_date, 
    term_label, 
    source_reference, 
    notes
)
VALUES
    (
        'DEAN',
        'Dean of the Faculty of Business',
        'Prof. (Ms.) G. N. Kuruppu',
        'Office of the Dean, Faculty of Business',
        'Level 02, Faculty of Business Complex, University of Moratuwa',
        'dean-fob@uom.lk',
        '+94 11 2640260 / +94 11 2650301 (Ext: 6501)',
        '2026-09-15',
        '2026 – Present',
        'University Council Appointment Circular',
        'Assumed duties on September 15, 2026 as the 4th Dean of the Faculty of Business.'
    ),
    (
        'HOD_DS',
        'Head, Department of Decision Sciences',
        'Dr. (Mrs.) Sulanie D. Perera',
        'Department of Decision Sciences',
        'Level 02, Faculty of Business Complex, University of Moratuwa',
        'head-ds@uom.lk',
        '+94 11 2640270 (Ext: 6702)',
        '2026-09-15',
        '2026 – Present',
        'Faculty Board & Senate Appointment',
        'Leading Business Analytics undergraduate and MBAn postgraduate programs.'
    ),
    (
        'HOD_IM',
        'Head, Department of Industrial Management',
        'Prof. Dinesh Samarasinghe',
        'Department of Industrial Management',
        'Level 03, Faculty of Business Complex, University of Moratuwa',
        'head-im@uom.lk',
        '+94 11 2650301 (Ext: 5300)',
        '2026-09-15',
        '2026 – Present',
        'Faculty Board & Senate Appointment',
        'Overseeing Financial Services Management and Quantitative Finance vertical.'
    ),
    (
        'HOD_MOT',
        'Head, Department of Management of Technology',
        'Dr. K. M. S. Senevirathne',
        'Department of Management of Technology',
        'Level 01, Faculty of Business Complex, University of Moratuwa',
        'head-mot@uom.lk',
        '+94 11 2650301 (Ext: 5200)',
        '2025-01-01',
        '2025 – Present',
        'Faculty Board & Senate Appointment',
        'Overseeing Business Process Management, ERP / SAP simulation, and MBA in MOT.'
    ),
    (
        'AR_DEAN_OFFICE',
        'Assistant Registrar (Faculty Administration)',
        'Ms. G. N. Pushpa Mallika',
        'Dean''s Office Secretariat',
        'Level 02, Faculty of Business Complex, University of Moratuwa',
        'ar-fob@uom.lk',
        '+94 11 2640260 (Ext: 6502)',
        '2024-01-01',
        'Current',
        'UoM Administrative Establishments',
        'Direct faculty administrative inquiries, examination board filings, and official petitions.'
    ),
    (
        'DIRECTOR_UGS',
        'Director, Undergraduate Studies Division (UGS)',
        'Undergraduate Studies Directorate',
        'Undergraduate Studies Division (UGS)',
        'Level 02, Faculty of Business Complex, University of Moratuwa',
        'ugs-fob@uom.lk',
        '+94 11 2640260 (Ext: 6505)',
        '2025-01-01',
        'Current',
        'Faculty Board Mandate',
        'Academic timetabling, examination eligibility, and semester performance bylaws.'
    )
ON CONFLICT (role_code) DO UPDATE
SET
    role_title = EXCLUDED.role_title,
    appointee_name = EXCLUDED.appointee_name,
    unit_name = EXCLUDED.unit_name,
    office_location = EXCLUDED.office_location,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    assumed_date = EXCLUDED.assumed_date,
    term_label = EXCLUDED.term_label,
    source_reference = EXCLUDED.source_reference,
    notes = EXCLUDED.notes,
    updated_at = timezone('utc'::text, now());
