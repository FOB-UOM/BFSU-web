-- ==============================================================================
-- Migration: Faculty Staff Profiles & Time-Bounded Appointment History
-- 
-- Establishes:
-- 1. faculty_staff_profiles (Academic & Non-Academic staff, unique username, research interests, scholar links)
-- 2. faculty_staff_appointments (Time-bounded tenures linking persons to entities with history)
-- 3. Operational Reference tags (unofficial internal ledger for student governance)
-- ==============================================================================

-- 1. Faculty Staff Profiles (Academic & Non-Academic)
CREATE TABLE IF NOT EXISTS public.faculty_staff_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    staff_category TEXT NOT NULL CHECK (staff_category IN ('academic', 'non_academic', 'executive_appointment')),
    full_name TEXT NOT NULL,
    preferred_name TEXT,
    honorific TEXT, -- 'Prof.', 'Dr.', 'Ms.', 'Mr.', 'Mrs.'
    designation TEXT NOT NULL, -- 'Professor', 'Senior Lecturer (Grade I)', 'Assistant Registrar', etc.
    primary_department_code TEXT, -- 'DS', 'IM', 'MOT', 'DEANERY', 'UGS', 'SECRETARIAT'
    email TEXT,
    phone TEXT,
    office_location TEXT,
    avatar_url TEXT,
    -- Academic Specific Attributes
    research_interests TEXT[] DEFAULT '{}',
    google_scholar_url TEXT,
    researchgate_url TEXT,
    orcid_id TEXT,
    teaching_areas TEXT[] DEFAULT '{}',
    academic_bio TEXT,
    -- Non-Academic Specific Attributes
    operational_scope TEXT,
    -- Institutional Metadata
    is_operational_reference BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_faculty_staff_profiles_username ON public.faculty_staff_profiles(username);
CREATE INDEX IF NOT EXISTS idx_faculty_staff_profiles_dept ON public.faculty_staff_profiles(primary_department_code);

ALTER TABLE public.faculty_staff_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Faculty staff profiles are viewable by everyone" ON public.faculty_staff_profiles;
CREATE POLICY "Faculty staff profiles are viewable by everyone"
ON public.faculty_staff_profiles FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage faculty staff profiles" ON public.faculty_staff_profiles;
CREATE POLICY "Authenticated users can manage faculty staff profiles"
ON public.faculty_staff_profiles FOR ALL
USING (auth.role() = 'authenticated');

-- 2. Time-Bounded Appointments (Historical Continuity for Persons & Entities)
CREATE TABLE IF NOT EXISTS public.faculty_staff_appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_id UUID NOT NULL REFERENCES public.faculty_staff_profiles(id) ON DELETE CASCADE,
    entity_code TEXT NOT NULL, -- 'DEANERY', 'DS', 'IM', 'MOT', 'UGS', 'PGS', 'SECRETARIAT'
    role_title TEXT NOT NULL, -- 'Dean of the Faculty of Business', 'Head of Department', 'Assistant Registrar'
    role_type TEXT NOT NULL CHECK (role_type IN ('dean', 'hod', 'director', 'academic_advisor', 'administrator', 'counselor', 'board_rep')),
    start_date DATE NOT NULL,
    end_date DATE, -- NULL indicates active appointment
    term_label TEXT NOT NULL, -- e.g. 'September 2026 – Present', '2023 – September 2026'
    is_current BOOLEAN DEFAULT true NOT NULL,
    notes TEXT,
    source_reference TEXT, -- 'Council Appointment Circular / Senate Minute'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_faculty_staff_appointments_staff ON public.faculty_staff_appointments(staff_id);
CREATE INDEX IF NOT EXISTS idx_faculty_staff_appointments_entity ON public.faculty_staff_appointments(entity_code);
CREATE INDEX IF NOT EXISTS idx_faculty_staff_appointments_current ON public.faculty_staff_appointments(is_current);

ALTER TABLE public.faculty_staff_appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Faculty staff appointments are viewable by everyone" ON public.faculty_staff_appointments;
CREATE POLICY "Faculty staff appointments are viewable by everyone"
ON public.faculty_staff_appointments FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage faculty staff appointments" ON public.faculty_staff_appointments;
CREATE POLICY "Authenticated users can manage faculty staff appointments"
ON public.faculty_staff_appointments FOR ALL
USING (auth.role() = 'authenticated');

-- 3. Seed Verified Staff Profiles (Deanery, HODs, Administration, Senior Academics)
INSERT INTO public.faculty_staff_profiles (
    id, username, staff_category, full_name, preferred_name, honorific, designation, primary_department_code, 
    email, phone, office_location, research_interests, google_scholar_url, researchgate_url, teaching_areas, academic_bio, operational_scope
)
VALUES
    (
        '10000000-0000-0000-0000-000000000001',
        'prof-gayithri-kuruppu',
        'academic',
        'G. N. Kuruppu',
        'Gayithri Kuruppu',
        'Prof. (Ms.)',
        'Professor in Management & Dean of the Faculty of Business',
        'DEANERY',
        'dean-fob@uom.lk',
        '+94 11 2640260 (Ext: 6501)',
        'Level 02, Faculty of Business Complex',
        ARRAY['Strategic Management & Corporate Resilience', 'Supply Chain Robustness', 'Managerial Economics', 'Decision Governance'],
        'https://scholar.google.com/citations?user=uom_kuruppu',
        'https://researchgate.net',
        ARRAY['Strategic Management', 'Supply Chain Operations', 'Corporate Governance'],
        'Appointed as the 4th Dean of the Faculty of Business on September 15, 2026. Formerly Head of the Department of Industrial Management.',
        'Apex academic leadership, Faculty Board Chairperson, and University Senate representative.'
    ),
    (
        '10000000-0000-0000-0000-000000000002',
        'dr-sulanie-perera',
        'academic',
        'Sulanie D. Perera',
        'Sulanie Perera',
        'Dr. (Mrs.)',
        'Senior Lecturer (Grade I) & Head, Department of Decision Sciences',
        'DS',
        'head-ds@uom.lk',
        '+94 11 2640270 (Ext: 6702)',
        'Level 02, Faculty of Business Complex',
        ARRAY['Business Analytics & Data Science', 'Predictive Modeling & Optimization', 'Operations Research', 'Machine Learning in Business'],
        'https://scholar.google.com/citations?user=uom_perera_s',
        'https://researchgate.net',
        ARRAY['Business Analytics', 'Operations Research', 'Prescriptive Modeling'],
        'Head of the Department of Decision Sciences. Leading researcher in mathematical optimization, predictive modeling, and applied machine learning architectures.',
        'Departmental academic administration, Business Analytics specialization directorate, and MBAn postgraduate oversight.'
    ),
    (
        '10000000-0000-0000-0000-000000000003',
        'prof-dinesh-samarasinghe',
        'academic',
        'Dinesh Samarasinghe',
        'Dinesh Samarasinghe',
        'Prof.',
        'Professor & Head, Department of Industrial Management (Immediate Past Dean)',
        'IM',
        'head-im@uom.lk',
        '+94 11 2650301 (Ext: 5300)',
        'Level 03, Faculty of Business Complex',
        ARRAY['Quantitative Finance & Market Econometrics', 'Financial Modeling & Derivatives Valuation', 'Consumer Behavioral Modeling', 'Market Microstructure'],
        'https://scholar.google.com/citations?user=uom_samarasinghe',
        'https://researchgate.net',
        ARRAY['Financial Econometrics', 'Quantitative Finance', 'Research Methodology'],
        'Immediate Past Dean of the Faculty of Business and current Head of the Department of Industrial Management. Widely published academic in econometric modeling and quantitative capital market dynamics.',
        'Departmental academic administration, Financial Services Management specialization oversight.'
    ),
    (
        '10000000-0000-0000-0000-000000000004',
        'dr-mahinda-senevirathne',
        'academic',
        'K. M. S. Senevirathne',
        'Mahinda Senevirathne',
        'Dr.',
        'Senior Lecturer & Head, Department of Management of Technology',
        'MOT',
        'head-mot@uom.lk',
        '+94 11 2650301 (Ext: 5200)',
        'Level 01, Faculty of Business Complex',
        ARRAY['Enterprise Systems Architecture (SAP / ERP)', 'Business Process Management & Mining', 'Digital Transformation', 'Cloud Solutions Governance'],
        'https://scholar.google.com/citations?user=uom_senevirathne',
        'https://researchgate.net',
        ARRAY['Enterprise Resource Planning (ERP)', 'Business Process Engineering', 'Technology Strategy'],
        'Head of the Department of Management of Technology. Expert in corporate process automation, ERP workflows (SAP S/4HANA), and enterprise technology transformation.',
        'Departmental academic administration, Business Process Management specialization, and MBA in MOT oversight.'
    ),
    (
        '10000000-0000-0000-0000-000000000005',
        'pushpa-mallika',
        'non_academic',
        'G. N. Pushpa Mallika',
        'Pushpa Mallika',
        'Ms.',
        'Assistant Registrar (Faculty Administration)',
        'SECRETARIAT',
        'ar-fob@uom.lk',
        '+94 11 2640260 (Ext: 6502)',
        'Dean''s Office, Level 02, Faculty of Business Complex',
        '{}',
        NULL,
        NULL,
        '{}',
        NULL,
        'Executive administration of the Dean''s Office, official student petitions, examination board documentation, Faculty Board secretarial service, and disciplinary records.'
    ),
    (
        '10000000-0000-0000-0000-000000000006',
        'prof-sarath-dassanayake',
        'academic',
        'M. S. Dassanayake',
        'Sarath Dassanayake',
        'Prof.',
        'Senior Professor in Management of Technology & Former Dean',
        'MOT',
        'sarathd@uom.lk',
        '+94 11 2650301 (Ext: 5200)',
        'Level 01, Faculty of Business Complex',
        ARRAY['Technology Commercialization & Innovation Strategy', 'Small & Medium Enterprise (SME) Industrial Policy', 'Entrepreneurial Management Ecosystems', 'International Technology Transfer'],
        'https://scholar.google.com',
        'https://researchgate.net',
        ARRAY['Technology Management', 'Entrepreneurship', 'Industrial Economics'],
        'Former Dean of the Faculty of Business (2020 – 2023) and Senior Professor in Management of Technology. Foundational leader in shaping the technological management and entrepreneurship curriculum at University of Moratuwa.',
        'Senior professorial mentorship, PhD research supervisions, and academic faculty advisor.'
    ),
    (
        '10000000-0000-0000-0000-000000000007',
        'prof-nd-gunawardena',
        'academic',
        'N. D. Gunawardena',
        'Niranjan Gunawardena',
        'Prof.',
        'Senior Professor & Founding Dean, Faculty of Business',
        'DEANERY',
        'ndg@uom.lk',
        NULL,
        'University of Moratuwa',
        ARRAY['Construction Project Management', 'Strategic Infrastructure Development', 'Higher Education Governance'],
        'https://scholar.google.com',
        NULL,
        ARRAY['Construction Management', 'Infrastructure Governance'],
        'Founding Dean of the Faculty of Business (2017 – 2020) and former Vice Chancellor of the University of Moratuwa. Instrumental in establishing the Faculty of Business as the third major faculty of the university.',
        'Foundational deanery governance and institutional leadership emeritus.'
    )
ON CONFLICT (id) DO UPDATE
SET
    username = EXCLUDED.username,
    full_name = EXCLUDED.full_name,
    honorific = EXCLUDED.honorific,
    designation = EXCLUDED.designation,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    office_location = EXCLUDED.office_location,
    research_interests = EXCLUDED.research_interests,
    updated_at = timezone('utc'::text, now());

-- 4. Seed Time-Bounded Appointments (Demonstrating Person & Entity Historical Continuity)
INSERT INTO public.faculty_staff_appointments (
    staff_id, entity_code, role_title, role_type, start_date, end_date, term_label, is_current, notes, source_reference
)
VALUES
    -- 4th Dean: Prof. G. N. Kuruppu (Shows past Head of IM, then Dean of FOB!)
    (
        '10000000-0000-0000-0000-000000000001',
        'IM',
        'Head, Department of Industrial Management',
        'hod',
        '2023-01-01',
        '2026-09-14',
        '2023 – September 2026',
        false,
        'Served as Head of Department of Industrial Management prior to Council appointment as Dean.',
        'Council Appointment & Senate Minute'
    ),
    (
        '10000000-0000-0000-0000-000000000001',
        'DEANERY',
        'Dean of the Faculty of Business',
        'dean',
        '2026-09-15',
        NULL,
        'September 2026 – Present',
        true,
        'Assumed duties on September 15, 2026 as the 4th Dean of the Faculty of Business.',
        'University Council Appointment Circular'
    ),
    -- 3rd Dean: Prof. Dinesh Samarasinghe (Dean 2023–2026, then Head of IM!)
    (
        '10000000-0000-0000-0000-000000000003',
        'DEANERY',
        'Dean of the Faculty of Business',
        'dean',
        '2023-01-01',
        '2026-09-14',
        '2023 – September 2026',
        false,
        'Served as the 3rd Dean of the Faculty of Business prior to assuming Head of Department of Industrial Management.',
        'Council Appointment & Faculty Board Record'
    ),
    (
        '10000000-0000-0000-0000-000000000003',
        'IM',
        'Head, Department of Industrial Management',
        'hod',
        '2026-09-15',
        NULL,
        'September 2026 – Present',
        true,
        'Appointed Head of Industrial Management following the elevation of Prof. Kuruppu to Deanery.',
        'Faculty Board Appointment'
    ),
    -- 2nd Dean: Prof. Sarath Dassanayake (Dean 2020–2023)
    (
        '10000000-0000-0000-0000-000000000006',
        'DEANERY',
        'Dean of the Faculty of Business',
        'dean',
        '2020-01-01',
        '2023-01-01',
        '2020 – 2023',
        false,
        '2nd Dean of the Faculty of Business. Senior Professor in Management of Technology.',
        'University Council Appointment Record'
    ),
    -- 1st Dean: Prof. N. D. Gunawardena (Founding Dean 2017–2020)
    (
        '10000000-0000-0000-0000-000000000007',
        'DEANERY',
        'Dean of the Faculty of Business (Founding Dean)',
        'dean',
        '2017-01-01',
        '2020-01-01',
        '2017 – 2020',
        false,
        'Foundational architect and 1st Dean of the Faculty of Business. Former Vice Chancellor of UoM.',
        'University Council Establishment Circular'
    ),
    -- Dr. Sulanie D. Perera (Head of DS)
    (
        '10000000-0000-0000-0000-000000000002',
        'DS',
        'Head, Department of Decision Sciences',
        'hod',
        '2026-09-15',
        NULL,
        'September 2026 – Present',
        true,
        'Appointed Head of Decision Sciences on September 15, 2026.',
        'Faculty Board Appointment'
    ),
    -- Dr. K. M. S. Senevirathne (Head of MOT)
    (
        '10000000-0000-0000-0000-000000000004',
        'MOT',
        'Head, Department of Management of Technology',
        'hod',
        '2025-01-01',
        NULL,
        '2025 – Present',
        true,
        'Head of Management of Technology overseeing BPM undergraduate and MOT MBA programs.',
        'Faculty Board Appointment'
    ),
    -- Ms. G. N. Pushpa Mallika (Assistant Registrar)
    (
        '10000000-0000-0000-0000-000000000005',
        'SECRETARIAT',
        'Assistant Registrar (Faculty Administration)',
        'administrator',
        '2024-01-01',
        NULL,
        'Current',
        true,
        'Secretariat lead for Deanery administrative petitions and examination board filings.',
        'UoM Administrative Establishments'
    );
