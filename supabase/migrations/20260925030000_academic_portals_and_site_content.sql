-- ==============================================================================
-- Migration: 20260925030000_academic_portals_and_site_content.sql
-- 
-- Universal Content & Knowledge Architecture (Zero-Hardcoding Core):
-- 1. academic_portals (Moodle, LearnOrg, Webmail, CITES)
-- 2. academic_timetables (Exam and lecture timetables for all cohorts)
-- 3. campus_facilities (Library, Medical centre, Physical Education, Hostel, Canteens)
-- 4. site_announcements (Dynamic status banner ticker, collegiate mission copy)
-- 5. system_capabilities (Complete living capability matrix)
-- 6. Enrich departments with full academic curricula & research specifications
-- 7. Enrich student_societies with workspaces, stats, and initiatives
-- 8. Seed achievements, research papers, news, and events
-- ==============================================================================

-- 1. ACADEMIC PORTALS
CREATE TABLE IF NOT EXISTS public.academic_portals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    tag TEXT NOT NULL,
    title TEXT NOT NULL,
    sub TEXT NOT NULL,
    url TEXT NOT NULL,
    target_url TEXT NOT NULL,
    category TEXT DEFAULT 'E-Learning' NOT NULL,
    auth_type TEXT,
    is_university_wide BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.academic_portals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Academic portals are viewable by everyone" ON public.academic_portals;
CREATE POLICY "Academic portals are viewable by everyone"
ON public.academic_portals FOR SELECT
USING (true);

-- 2. ACADEMIC TIMETABLES & DOCUMENTS
CREATE TABLE IF NOT EXISTS public.academic_timetables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    batch TEXT NOT NULL,
    doc_type TEXT DEFAULT 'PDF Document' NOT NULL,
    category TEXT DEFAULT 'Lectures' NOT NULL,
    file_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.academic_timetables ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Academic timetables are viewable by everyone" ON public.academic_timetables;
CREATE POLICY "Academic timetables are viewable by everyone"
ON public.academic_timetables FOR SELECT
USING (true);

-- 3. CAMPUS FACILITIES & WELFARE CONTACTS
CREATE TABLE IF NOT EXISTS public.campus_facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT,
    phone TEXT,
    email TEXT,
    description TEXT,
    hours TEXT,
    portal_url TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.campus_facilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Campus facilities are viewable by everyone" ON public.campus_facilities;
CREATE POLICY "Campus facilities are viewable by everyone"
ON public.campus_facilities FOR SELECT
USING (true);

-- 4. SITE ANNOUNCEMENTS & TICKER
CREATE TABLE IF NOT EXISTS public.site_announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_term TEXT NOT NULL,
    ticker_text TEXT NOT NULL,
    headline TEXT,
    sub_headline TEXT,
    faculty_brief TEXT,
    union_vision TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.site_announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Site announcements are viewable by everyone" ON public.site_announcements;
CREATE POLICY "Site announcements are viewable by everyone"
ON public.site_announcements FOR SELECT
USING (true);

-- 5. SYSTEM CAPABILITIES MATRIX
CREATE TABLE IF NOT EXISTS public.system_capabilities (
    id TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL, -- 'LIVE', 'IN_PROGRESS', 'PLANNED'
    carrier TEXT NOT NULL,
    carrier_key TEXT NOT NULL,
    route TEXT NOT NULL,
    mobile_instructions TEXT,
    what_exists TEXT,
    what_is_missing TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.system_capabilities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "System capabilities are viewable by everyone" ON public.system_capabilities;
CREATE POLICY "System capabilities are viewable by everyone"
ON public.system_capabilities FOR SELECT
USING (true);

-- 6. ENRICH DEPARTMENTS & SOCIETIES
ALTER TABLE public.departments
ADD COLUMN IF NOT EXISTS facilities JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS research_themes TEXT[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS undergraduate_spec JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS postgraduate_spec JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS student_culture JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS aliases TEXT[] DEFAULT '{}'::text[],
ADD COLUMN IF NOT EXISTS specialization_title TEXT,
ADD COLUMN IF NOT EXISTS specialization_badge TEXT,
ADD COLUMN IF NOT EXISTS specialization_summary TEXT,
ADD COLUMN IF NOT EXISTS notion_page_id TEXT;

ALTER TABLE public.student_societies
ADD COLUMN IF NOT EXISTS tagline TEXT,
ADD COLUMN IF NOT EXISTS stats JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS workspaces JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS initiatives JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS aliases TEXT[] DEFAULT '{}'::text[];

-- ==============================================================================
-- SEED DATA INSERTIONS (Zero-Hardcoding Data Carriers)
-- ==============================================================================

-- 1. Seed Academic Portals
INSERT INTO public.academic_portals (code, tag, title, sub, url, target_url, category, auth_type, is_university_wide, display_order)
VALUES
    ('moodle', 'DAILY ACADEMIC LMS', 'Moodle UoM (online.uom.lk)', 'Primary digital instruction environment for daily course modules, lecture slides, assignments, and tutorial submissions.', 'https://online.uom.lk', 'online.uom.lk', 'E-Learning', 'UoM LDAP / Central SSO', true, 1),
    ('learnorg', 'ADMIN & REGISTRY LMS', 'LearnOrg System (lms.uom.lk)', 'Official university academic records, semester module enrollments, GPA records, and exam admission clearance.', 'https://lms.uom.lk', 'lms.uom.lk', 'E-Learning', 'UoM Central Credentials', true, 2),
    ('webmail', 'COMMUNICATIONS & MS 365', 'UoM Webmail & Microsoft 365', 'Official institutional @uom.lk inbox, Microsoft Office 365 cloud tools, Teams, and institutional OneDrive.', 'https://webmail.uom.lk', 'webmail.uom.lk', 'Productivity', 'Microsoft Entra ID (@uom.lk)', true, 3),
    ('cites', 'CENTRAL IT', 'CITES Student Portal & Helpdesk', 'University network credentials, eduroam Wi-Fi configuration, software subscriptions, and IT helpdesk ticketing.', 'https://uom.lk/cites', 'uom.lk/cites', 'IT Services', 'UoM Central Helpdesk', true, 4)
ON CONFLICT (code) DO UPDATE
SET
    tag = EXCLUDED.tag,
    title = EXCLUDED.title,
    sub = EXCLUDED.sub,
    url = EXCLUDED.url,
    target_url = EXCLUDED.target_url,
    category = EXCLUDED.category,
    auth_type = EXCLUDED.auth_type,
    display_order = EXCLUDED.display_order;

-- 2. Seed Academic Timetables
INSERT INTO public.academic_timetables (code, title, batch, doc_type, category, file_url, is_active, display_order)
VALUES
    ('exam-sem1-3', 'Exam TimeTable Sem 1, 3 (Resumed)', 'All Batches • Examination Division', 'PDF Document', 'Examinations', 'https://uom.lk/sites/default/files/business/files/Exam%20TimeTable%20Sem%201%2C3%202026%20July%20Resume%20Stduents%20View_0.pdf', true, 1),
    ('tt-intake-2022', 'Updated Timetable — Intake 2022 (Semester 08)', 'Intake 2022 • Level 4', 'PDF Document', 'Lectures', 'https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202022%20Semester%2008_0.pdf', true, 2),
    ('tt-intake-2023', 'Updated Timetable — Intake 2023 (Semester 06)', 'Intake 2023 • Level 3', 'PDF Document', 'Lectures', 'https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202023%20Semester%2006_0.pdf', true, 3),
    ('tt-intake-2024', 'Updated Timetable — Intake 2024 (Semester 04)', 'Intake 2024 • Level 2', 'PDF Document', 'Lectures', 'https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202024%20Semester%2004_0.pdf', true, 4),
    ('tt-intake-2025', 'Updated Timetable — Intake 2025 (Semester 02)', 'Intake 2025 • Level 1', 'PDF Document', 'Lectures', 'https://uom.lk/sites/default/files/business/files/Updated%20Timetable-%20Intake%202025%20Semester%2002_0.pdf', true, 5)
ON CONFLICT (code) DO UPDATE
SET
    title = EXCLUDED.title,
    batch = EXCLUDED.batch,
    doc_type = EXCLUDED.doc_type,
    category = EXCLUDED.category,
    file_url = EXCLUDED.file_url,
    display_order = EXCLUDED.display_order;

-- 3. Seed Campus Facilities
INSERT INTO public.campus_facilities (code, name, category, location, phone, email, description, hours, portal_url, display_order)
VALUES
    ('library', 'University of Moratuwa Library', 'Research & Study', 'Opposite Civil Engineering Complex', '+94 11 265 0301 (Ext 1500)', 'library@uom.lk', 'Extensive collections of quantitative business books, study carrels, electronic journal databases, and digital e-theses.', 'Weekdays: 8.00 AM – 7.00 PM | Weekends: 8.00 AM – 4.00 PM', 'https://uom.lk/lib', 1),
    ('health', 'University Health Centre', 'Healthcare', 'Near University Gymnasium', '+94 11 265 0301 (Ext 1800)', 'health@uom.lk', 'Free medical clinic, prescription dispensaries, emergency triage, and official medical board certifications.', 'Monday – Friday: 8.30 AM – 4.30 PM', 'https://uom.lk/health', 2),
    ('pe-sports', 'Physical Education & Sports Complex', 'Recreation & Athletics', 'University Sports Pavilion & Grounds', '+94 11 265 0301 (Ext 1900)', 'sports@uom.lk', 'Modern gymnasium, indoor badminton courts, Olympic swimming pool access, floodlit cricket ground, and tennis courts.', 'Daily: 6.00 AM – 8.00 PM', 'https://uom.lk/sports', 3),
    ('hostel', 'Student Accommodation Division', 'Student Housing', 'Hostel Office, Student Village', '+94 11 265 0301 (Ext 1220)', 'hostels@uom.lk', 'Official university residential hostel allocations for eligible undergraduates across Level 1 and final years.', 'Weekdays: 8.30 AM – 4.15 PM', 'https://uom.lk/hostels', 4),
    ('canteen-subsidy', 'Faculty Canteen & Cafeteria', 'Welfare & Dining', 'Faculty of Business Ground Floor / Old Canteen', null, 'welfare.bfsu@uom.lk', 'Affordable student meal options, tea service, and union-monitored price-subsidized lunch menus.', 'Monday – Saturday: 7.00 AM – 6.00 PM', null, 5)
ON CONFLICT (code) DO UPDATE
SET
    name = EXCLUDED.name,
    category = EXCLUDED.category,
    location = EXCLUDED.location,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    description = EXCLUDED.description,
    hours = EXCLUDED.hours,
    portal_url = EXCLUDED.portal_url,
    display_order = EXCLUDED.display_order;

-- 4. Seed Active Site Announcements & Collegiate Copy
INSERT INTO public.site_announcements (session_term, ticker_text, headline, sub_headline, faculty_brief, union_vision, is_active)
VALUES (
    'Academic Year 2026',
    'Semester 1 • Academic Year 2026 • Intake ''22–''25 Lecture Series Active',
    'Leadership, Scholarship & Community.',
    'A vibrant student fellowship connecting undergraduates across Business Analytics, Industrial Management, and Technology with mentorship, campus life, and collective student welfare.',
    'The Faculty of Business, University of Moratuwa is a dynamic academic community dedicated to shaping the next generation of business leaders and innovators. Established in 2017 under the prestigious University of Moratuwa, the faculty focuses on integrating modern technology with management education to meet the evolving needs of the global business environment. Through its Bachelor of Business Science (Hons) programme and specialized fields such as Business Analytics, Financial Services Management, and Business Process Management, the faculty develops strong analytical, managerial, and problem-solving skills in its students.',
    'The Business Faculty Students'' Union represents the students of the Faculty of Business, University of Moratuwa. The union works to support student welfare, encourage leadership, and create opportunities for personal and professional development. It organizes academic programs, networking events, social activities, and community projects that help students build connections and gain real-world experience.',
    true
)
ON CONFLICT DO NOTHING;

-- 5. Enrich Departments
UPDATE public.departments
SET
    aliases = ARRAY['ds', 'business-analytics', 'decision-science'],
    specialization_title = 'Business Analytics',
    specialization_badge = 'Pioneering Flagship',
    specialization_summary = 'Sri Lanka''s first undergraduate specialization in Business Analytics. Bridges predictive analytics, machine learning, optimization, and computing with executive business intelligence.',
    notion_page_id = '30d3b460dd9e81dcb43bcff420397d32',
    research_themes = ARRAY[
        'Predictive Financial & Macroeconomic Modeling',
        'Algorithmic Supply Chain & Network Optimization',
        'Natural Language Processing for Corporate Disclosures',
        'Reinforcement Learning in Dynamic Resource Scheduling'
    ],
    facilities = '[
        {"name": "Advanced Business Analytics Laboratory", "description": "High-performance computational workstations configured for large-scale data science and neural network training."},
        {"name": "Decision Optimization Computing Cluster", "description": "Dedicated node cluster for stochastic modeling, discrete-event simulation, and linear programming algorithms."},
        {"name": "Executive Datathon Arena", "description": "Collaborative sandbox space equipped for inter-university analytics hackathons and research sprints."}
    ]'::jsonb,
    undergraduate_spec = '{
        "degree": "Bachelor of Business Science (BBSc) Honours in Business Analytics",
        "abbreviation": "BBSc Hons (Business Analytics)",
        "duration": "4 Years (Full-Time)",
        "focus": "Predictive Analytics, Machine Learning, Mathematical Optimization, Operations Research & Statistical Computing (Python/R).",
        "curriculumHighlights": [
            "Applied Statistical Inference & Bayesian Computing",
            "Machine Learning & Deep Neural Systems",
            "Operations Research & Linear/Non-Linear Optimization",
            "Big Data Architectures, Cloud Pipelines & SQL/NoSQL",
            "Prescriptive Analytics & Executive Decision Support",
            "Capstone Research Thesis & Corporate Practicum"
        ],
        "careerProspects": [
            "Data Scientist & AI Strategist",
            "Business Intelligence Lead",
            "Operations Research Consultant",
            "Algorithmic Optimization Specialist",
            "Quantitative Risk Analyst"
        ]
    }'::jsonb,
    postgraduate_spec = '{
        "degree": "Master of Business Analytics (MBAn)",
        "abbreviation": "MBAn",
        "url": "https://uom.lk/business/decision-sciences",
        "description": "Advanced postgraduate training in big data architectures, artificial intelligence in business, and executive analytics strategy for working professionals and industry researchers."
    }'::jsonb,
    student_culture = '{
        "culture": "Renowned within the faculty for intense late-night datathon sprints, competitive analytics hackathons, and vibrant peer code review sessions.",
        "peerInitiatives": [
            "Annual Datathon & Inter-University Analytics Challenge",
            "Peer-to-Peer Python, R & SQL Coding Clinics",
            "Senior-Junior Machine Learning Mentorship Circles",
            "Industry Data Leader Fireside Keynotes"
        ],
        "communityQuote": "We transform complex raw data streams into high-conviction strategic decisions for industry leaders."
    }'::jsonb
WHERE code = 'DS';

UPDATE public.departments
SET
    aliases = ARRAY['im', 'financial-services', 'fsm', 'industrial-mgmt'],
    specialization_title = 'Financial Services Management',
    specialization_badge = 'Quantitative Finance',
    specialization_summary = 'Sri Lanka''s leading program in financial engineering, investment banking, actuarial concepts, and econometric analysis.',
    notion_page_id = '30d3b460dd9e81bfa07bf533a61bb294',
    research_themes = ARRAY[
        'High-Frequency Algorithmic Trading & Market Microstructure',
        'Credit Risk & Machine Learning in Banking Stress Tests',
        'Decentralized Finance & Macro-Financial Liquidity Risks',
        'ESG Portfolios & Quantitative Asset Allocation'
    ],
    facilities = '[
        {"name": "Financial Trading & Market Simulation Suite", "description": "Terminal desks equipped with real-time financial market feeds, risk models, and asset valuation software."},
        {"name": "Applied Econometrics Sandbox", "description": "Statistical environment configured for STATA, EViews, and R econometric regressions."}
    ]'::jsonb,
    undergraduate_spec = '{
        "degree": "Bachelor of Business Science (BBSc) Honours in Financial Services Management",
        "abbreviation": "BBSc Hons (FSM)",
        "duration": "4 Years (Full-Time)",
        "focus": "Investment Banking, Quantitative Risk, Financial Econometrics, Portfolio Management & Derivatives.",
        "curriculumHighlights": [
            "Financial Engineering & Structured Products",
            "Quantitative Risk Management & Basel Frameworks",
            "Corporate Finance, Mergers & Acquisitions",
            "Applied Econometric Modeling & Time Series",
            "Actuarial Science Principles & Insurance",
            "Banking Regulation & FinTech Disruption"
        ],
        "careerProspects": [
            "Investment Banker & Equity Research Associate",
            "Financial Risk Manager",
            "Quantitative Trader & Portfolio Analyst",
            "Treasury & Capital Markets Specialist",
            "Corporate Finance Strategist"
        ]
    }'::jsonb,
    postgraduate_spec = '{
        "degree": "Master of Science in Financial Mathematics & Technology",
        "abbreviation": "MSc (FinTech)",
        "url": "https://uom.lk/business/industrial-management",
        "description": "Postgraduate specialization in financial derivatives, computational finance, and automated risk models."
    }'::jsonb,
    student_culture = '{
        "culture": "Passionate about equity valuation, macro-economic debates, and investment portfolio tournaments.",
        "peerInitiatives": [
            "Inter-University Equity Research Championship",
            "Bloomberg & Reuters Terminal Simulation Clinics",
            "CFA Charter Mentorship Circles",
            "Finance Leader Speaker Series"
        ],
        "communityQuote": "We engineer financial systems that combine quantitative precision with macroeconomic stability."
    }'::jsonb
WHERE code = 'IM';

UPDATE public.departments
SET
    aliases = ARRAY['mot', 'process-management', 'bpm', 'mgmt-of-tech'],
    specialization_title = 'Business Process Management',
    specialization_badge = 'Enterprise Technology',
    specialization_summary = 'Pioneering enterprise systems, digital transformation architectures, ERP pipelines, and supply chain digitalization.',
    notion_page_id = '30d3b460dd9e81bfa07bf533a61bb294',
    research_themes = ARRAY[
        'Robotic Process Automation in Industrial Supply Chains',
        'Enterprise Resource Planning Lifecycle Integration',
        'Digital Twin Modeling for Smart Manufacturing Facilities',
        'Technology Adoption & Institutional Change Management'
    ],
    facilities = '[
        {"name": "Enterprise Systems & ERP Architecture Lab", "description": "Configured for enterprise resource planning (SAP / Odoo), BPMN 2.0 process modeling, and workflow automation engines."},
        {"name": "Digital Transformation Sandbox", "description": "Hands-on laboratory for cloud workflow orchestrations, robotic process automation (RPA), and enterprise system design."}
    ]'::jsonb,
    undergraduate_spec = '{
        "degree": "Bachelor of Business Science (BBSc) Honours in Business Process Management",
        "abbreviation": "BBSc Hons (BPM)",
        "duration": "4 Years (Full-Time)",
        "focus": "Enterprise Systems, Digital Transformation, Business Process Automation (BPMN), ERP & Supply Chain Management.",
        "curriculumHighlights": [
            "Enterprise Architecture & Information Systems",
            "Business Process Modeling, Simulation & Optimization",
            "Enterprise Resource Planning (ERP) Systems",
            "Technology Strategy & Innovation Management",
            "Supply Chain Analytics & Global Operations",
            "Digital Transformation Practicum"
        ],
        "careerProspects": [
            "Enterprise Systems Architect",
            "Digital Transformation Consultant",
            "ERP Implementation Specialist",
            "Business Process Engineer",
            "Supply Chain & Operations Strategist"
        ]
    }'::jsonb,
    postgraduate_spec = '{
        "degree": "MBA in Management of Technology (MBA in MOT)",
        "abbreviation": "MBA (MOT)",
        "url": "https://uom.lk/business/mot",
        "description": "Sri Lanka''s premier postgraduate program bridging technical mastery with executive board governance."
    }'::jsonb,
    student_culture = '{
        "culture": "Focused on real-world industrial optimization, digital architecture workshops, and enterprise software engineering.",
        "peerInitiatives": [
            "Digital Transformation Industry Case Competitions",
            "ERP & Process Automation Bootcamps",
            "Industrial Field Visits & Lean Manufacturing Sprints",
            "Executive Technology Forum"
        ],
        "communityQuote": "We re-architect business workflows through intelligent automation and enterprise technology."
    }'::jsonb
WHERE code = 'MOT';

-- 6. Enrich Student Societies
UPDATE public.student_societies
SET
    tagline = 'Pioneering Business Analytics, Machine Learning & Algorithmic Optimization',
    aliases = ARRAY['soba', 'dss', 'decision-sciences', 'business-analytics'],
    stats = '{"members": "250+ Undergraduates", "eventsPerYear": "6 Major Symposia & Hackathons", "notionPages": "45+ Knowledge Repositories"}'::jsonb,
    workspaces = '{
        "notion": {"workspaceName": "BFSU / Decision Sciences Hub", "workspaceUrl": "https://notion.so/bfsu-uom/decision-sciences-society", "notionPageId": "30d3b460dd9e81dcb43bcff420397d32"},
        "googleWorkspace": {"sharedDriveUrl": "https://drive.google.com/drive/folders/1soba-uom-analytics-archive", "calendarUrl": "https://calendar.google.com"},
        "repository": {"githubUrl": "https://github.com/bfsu-uom"}
    }'::jsonb,
    initiatives = '[
        {"title": "DataSphere Inter-University Hackathon", "type": "Annual Flagship", "description": "Sri Lanka''s leading collegiate algorithmic challenge focused on applying neural networks to macro-financial datasets."},
        {"title": "Bi-Weekly Python & R Analytics Clinics", "type": "Skill Series", "description": "Hands-on peer-led laboratory tutorials on statistical learning, scikit-learn, and cloud data pipelines."}
    ]'::jsonb
WHERE code = 'DSS';

UPDATE public.student_societies
SET
    tagline = 'Quantitative Finance, Econometrics & Capital Markets Leadership',
    aliases = ARRAY['fsmss', 'imss', 'industrial-management', 'fsm'],
    stats = '{"members": "220+ Undergraduates", "eventsPerYear": "5 Financial Summits & Workshops", "notionPages": "38+ Research Desks"}'::jsonb,
    workspaces = '{
        "notion": {"workspaceName": "BFSU / FSM Hub", "workspaceUrl": "https://notion.so/bfsu-uom/industrial-management-society", "notionPageId": "30d3b460dd9e81bfa07bf533a61bb294"},
        "googleWorkspace": {"sharedDriveUrl": "https://drive.google.com/drive/folders/1fsmss-uom-finance-archive", "calendarUrl": "https://calendar.google.com"},
        "repository": {"githubUrl": "https://github.com/bfsu-uom"}
    }'::jsonb,
    initiatives = '[
        {"title": "National Inter-University Stock Pitch Competition", "type": "Annual Flagship", "description": "Rigorous equity valuation competition judged by chartered financial analysts and managing directors."},
        {"title": "Capital Markets & Derivatives Practicum", "type": "Workshop Series", "description": "Intensive masterclasses on interest rate modeling, yield curves, and banking liquidity frameworks."}
    ]'::jsonb
WHERE code = 'IMSS';

UPDATE public.student_societies
SET
    tagline = 'Enterprise Systems, Process Automation & Technology Innovation',
    aliases = ARRAY['bpmss', 'mot', 'management-of-technology'],
    stats = '{"members": "230+ Undergraduates", "eventsPerYear": "5 Enterprise Symposia", "notionPages": "40+ Project Repositories"}'::jsonb,
    workspaces = '{
        "notion": {"workspaceName": "BFSU / BPMSS Hub", "workspaceUrl": "https://notion.so/bfsu-uom/bpm-society", "notionPageId": "30d3b460dd9e81bfa07bf533a61bb294"},
        "googleWorkspace": {"sharedDriveUrl": "https://drive.google.com/drive/folders/1bpmss-uom-enterprise-archive", "calendarUrl": "https://calendar.google.com"},
        "repository": {"githubUrl": "https://github.com/bfsu-uom"}
    }'::jsonb,
    initiatives = '[
        {"title": "Enterprise Process Automation Challenge", "type": "Annual Flagship", "description": "Engineering end-to-end robotic automation pipelines for complex commercial logistics workflows."},
        {"title": "SAP & ERP Architecture Masterclass", "type": "Technical Track", "description": "Hands-on guided walkthroughs of enterprise supply chain integration and relational database schemas."}
    ]'::jsonb
WHERE code = 'BPMSS';

-- 7. Seed Student & Alumni Achievements (Zero Hardcoding for ExplorePage)
INSERT INTO public.achievements (recipient_name, title, category, year, description)
VALUES
    ('Team Optima (K. Perera, S. De Silva, T. Rathnayake)', 'Champions — National Inter-University Quant Analytics Hackathon 2025', 'Academic', '2025', 'First place amongst 24 national university teams for developing a real-time stochastic dynamic routing algorithm for emergency Colombo supply lines.'),
    ('Equity Research Delegation (D. Perera, M. Fernando, R. Jayawardena)', 'Global Runners-Up — CFA Institute Research Challenge South Asia', 'Finance', '2026', 'Authored a 40-page institutional equity valuation and ESG compliance report on renewable energy utilities, qualifying for the Asia-Pacific finals.'),
    ('V. Samarasinghe (Level 3 BPM)', 'Gold Medal — Sri Lanka University Games (SLUG) Athletics Championship', 'Sports', '2025', 'Broke the university games record in the 400m hurdles, representing the Faculty of Business contingent with exceptional athletic distinction.')
ON CONFLICT DO NOTHING;

-- 8. Seed Research Papers (Zero Hardcoding for ResearchPage)
INSERT INTO public.research_papers (author_name, title, abstract, journal_or_conf, published_year, paper_url)
VALUES
    ('Batch ''21 Analytics Cohort (Supervisor: Prof. Decision Sciences)', 'Predictive Modeling of Colombo Port Container Congestion', 'A machine learning and stochastic queueing model to predict quay crane waiting times and yard utilization during monsoon transshipment surges.', 'DL UoM Research Archive', '2025', 'http://dl.lib.mrt.ac.lk/'),
    ('Batch ''21 Finance Scholars (Supervisor: Senior Lecturer, Dept of FSM)', 'Decentralized Liquidity Risks in Sri Lankan Microfinance Institutions', 'Econometric analysis evaluating interest rate sensitivity, rural credit delinquency patterns, and capital adequacy ratios under macroeconomic restructuring.', 'DL UoM Research Archive', '2025', 'http://dl.lib.mrt.ac.lk/'),
    ('Batch ''22 Enterprise Systems Group (Supervisor: Senior Lecturer, Dept of IM)', 'Robotic Process Automation in Apparel ERP Export Compliance', 'Architecting end-to-end automated documentation pipelines for GSP+ trade compliance across multi-facility apparel exporters in Sri Lanka.', 'DL UoM Research Archive', '2026', 'http://dl.lib.mrt.ac.lk/'),
    ('Batch ''22 NLP Research Group (Supervisor: Visiting Fellow, AI & Analytics)', 'High-Frequency Consumer Sentiment Index from Sinhala/Tamil Social Data', 'Transformer-based multilingual sentiment evaluation monitoring FMCG retail price elasticities and inflation perception in real-time.', 'DL UoM Research Archive', '2026', 'http://dl.lib.mrt.ac.lk/')
ON CONFLICT DO NOTHING;

-- 9. Seed News & Notices (Zero Hardcoding for NewsSection & NewsPage)
INSERT INTO public.news (slug, title, brief, content, label, author, date, image, published)
VALUES
    ('colours-award-winners-2025', 'Congratulations to the Colours Award winners - 2025!', 'May your journey continue to shine with success and inspiration as you bring pride to the Faculty of Business.', '<p>Congratulations to the Colours Award winners - 2025!</p><br/><p>May your journey continue to shine with success and inspiration as you bring pride and honor to the Faculty of Business, University of Moratuwa.</p>', 'Achievement', 'BFSU Editorial Board', '2026-04-01', '/images/colours-2025-1.jpg', true),
    ('urgent-safety-alert', 'URGENT SAFETY ALERT: ATTEMPTED ROBBERIES', 'Please be extremely careful. Security notice regarding safety around boarding places and common campus areas.', '<p>🚨 <strong>URGENT SAFETY ALERT: ATTEMPTED ROBBERIES</strong> 🚨</p><br/><p>Please be extremely careful. There have been incident (2026.03.12) of armed robbers targeting students heading back to their boarding places.</p><br/><p>⚠️ <strong>1. PLEASE ENSURE YOUR SAFETY & DO NOT WALK ALONE.</strong></p><br/><p>⚠️ <strong>2. THEFTS IN THE LIBRARY:</strong></p><p>We have also received reports of money being stolen inside the university library. Please keep belongings with you.</p>', 'Security', 'BFSU Security & Welfare', '2026-03-12', null, true),
    ('student-feedback-form', 'Faculty of Business – Student Feedback Form', 'Confidential submission desk for academic feedback, lecture accommodation issues, and student facility requests.', '<p>Official feedback channel directly reviewed by the Student Union Welfare Committee and Dean''s Office.</p>', 'Welfare', 'BFSU Secretariat', '2026-02-28', null, true)
ON CONFLICT (slug) DO UPDATE
SET
    title = EXCLUDED.title,
    brief = EXCLUDED.brief,
    content = EXCLUDED.content,
    label = EXCLUDED.label,
    author = EXCLUDED.author,
    date = EXCLUDED.date,
    image = EXCLUDED.image,
    published = EXCLUDED.published;

-- 10. Seed Events & Assemblies (Zero Hardcoding for EventsSection & EventsPage)
INSERT INTO public.events (slug, title, brief, content, label, date, location, image, published)
VALUES
    ('colours-2025-ceremony', 'Colours Award Ceremony 2025', 'Celebrating collegiate sporting triumphs and honoring student athletes of the Faculty of Business.', 'Annual colours awarding ceremony celebrating excellence across track, field, badminton, cricket, and swimming.', 'Tradition', '2026-04-10', 'Civil Auditorium, UoM Premises', '/images/colours-2025-1.jpg', true),
    ('sarasawi-panhida-2025', 'Sarasawi Panhida 2025', 'The signature aesthetic evening of classical poetry, acoustic symphony, and creative writing.', 'Annual aesthetic gathering uniting students and academic faculty in celebration of Sinhala and English literature and acoustic performance.', 'Tradition', '2026-05-18', 'James George Hall, University of Moratuwa', '/images/colours-2025-2.jpg', true),
    ('hanthana-batch-trip-24', 'Hanthana Mountain Expedition – Batch ''24', 'Annual cohort expedition through the Hanthana mountain range fostering unity and environmental consciousness.', 'A landmark collective hike building fellowship across all three departments of the newest undergraduate intake.', 'Expedition', '2026-06-20', 'Hanthana Mountain Range, Kandy', '/images/hanthana-trip.jpg', true),
    ('iced-coffee-dansala', 'Poson Iced Coffee Dansala 2025', 'Annual community service project serving thousands of pilgrims and university staff.', 'Organized by the Business Faculty Students'' Union Welfare Committee with student volunteers.', 'Welfare', '2026-06-24', 'Faculty of Business Forecourt', null, true)
ON CONFLICT (slug) DO UPDATE
SET
    title = EXCLUDED.title,
    brief = EXCLUDED.brief,
    content = EXCLUDED.content,
    label = EXCLUDED.label,
    date = EXCLUDED.date,
    location = EXCLUDED.location,
    image = EXCLUDED.image,
    published = EXCLUDED.published;
