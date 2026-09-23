# BFSU-web: Master Architecture, Authentication & Expansion Roadmap

This document serves as the permanent architectural plan and implementation ledger for the **Business Faculty Students' Union (BFSU)** digital portal, Faculty of Business, University of Moratuwa.

---

## 1. System Architecture

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        BFSU Digital Ecosystem                          │
├────────────────────────────────┬───────────────────────────────────────┤
│ Frontend (Next.js 16 App Router)│ Backend & Identity (Supabase)         │
│ • React 19.3                   │ • PostgreSQL (RLS Protected)          │
│ • Turbopack + Static Generation │ • GoTrue Auth (LinkedIn + Google + OTP)│
│ • Tailwind CSS + Editorial Tokens│ • Storage Buckets (Flyers, Notices)   │
│ • @intuitui-labs/editorial     │ • Automated Profile Trigger           │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

## 2. Authentication & User Profile Implementation

### What was built:
1. **`AuthProvider` (`src/context/AuthContext.jsx`)**:
   - Manages real-time Supabase auth state (`user`, `profile`, `loading`).
   - Global modal controller (`openAuthModal('login' | 'register')`).
   - Auto-synchronizes with `public.profiles`.
2. **`AuthModal` (`src/components/AuthModal.jsx`)**:
   - **LinkedIn OAuth (`linkedin_oidc`)**: Designed specifically for alumni verification and graduate network connection.
   - **Google OAuth (`google`)**: For current undergraduates with university Google credentials.
   - **Direct Email/Password**: For student account creation with `student_id` (Index Number) and `full_name`.
3. **OAuth Callback Handler (`src/app/auth/callback/route.js`)**:
   - Next.js Route Handler exchanging the temporary auth code for a secure HTTP-only session cookie.
4. **Desktop & Mobile Navbar Integration**:
   - Displays live user profile badge with avatar and sign-out button when logged in.
   - Launches the modal via `"Portal Login"` button when logged out.

---

## 3. Database Schema & Migration

File: [`supabase/migrations/20260923000000_init_bfsu_schema.sql`](file:///c:/Users/Naween/projects/BFSU-web/supabase/migrations/20260923000000_init_bfsu_schema.sql)

### Tables:
| Table | Description | Access Policy (RLS) |
| :--- | :--- | :--- |
| **`profiles`** | Student/Alumni identities, Index numbers, Department, Batch, LinkedIn URLs | Public read; User can update own record |
| **`news`** | Notices, circulars, and executive announcements | Public read for `published=true`; Union execs write |
| **`events`** | Assemblies, traditions, and sports encounters | Public read for `published=true`; Union execs write |
| **`event_registrations`** | Student RSVP passes and attendance | User registers themselves; Execs view attendance |

---

## 4. How to Apply the Migration to Your Live Database

In your Supabase project:
1. Open the [Supabase SQL Editor](https://supabase.com/dashboard/project/jbbcsxdkboiytqgaceen/sql/new).
2. Paste the contents of `supabase/migrations/20260923000000_init_bfsu_schema.sql`.
3. Click **Run**. All tables and seed data will be created instantly.

---

## 5. Strategic Global Expansion Roadmap

| Phase | Milestone | Key Features |
| :--- | :--- | :--- |
| **Phase 1 (Complete)** | **Framework & Data Layer** | Next.js 16 App Router, pnpm 12, `@intuitui-labs/editorial` provenance, Supabase clients & AuthModal. |
| **Phase 2 (Immediate)** | **Interactive Student Experience** | Event RSVP buttons on `/events/[slug]`, Alumni directory filters, dynamic notices query. |
| **Phase 3 (Next)** | **Secretariat Admin CMS** | Protected `/admin` dashboard for union executives to publish circulars and download event attendance CSVs without writing code. |
| **Phase 4 (Global Vision)** | **Alumni Career Guild** | Mentorship matching, job referral dispatch, student anonymous welfare ticket tracker. |
