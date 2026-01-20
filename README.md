# JobVoro - Private Job Application Tracker

<div align="center">

<img src="./public/jobvoro.avif" alt="JobVoro Logo" width="80" height="80">

**Track your job applications privately with peace of mind**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## Overview

**JobVoro** is a modern, privacy-focused job application tracker designed for job seekers who want to stay organized without messy spreadsheets. Built with Next.js 14 and Supabase, JobVoro provides a clean, intuitive interface to manage your entire job search journey from application to offer.

### Why JobVoro?

- **Complete Privacy**: Your data stays private with stealth mode and secure encryption
- **Visual Progress Tracking**: See your job hunt progress at a glance with intuitive dashboards
- **Smart Reminders**: Never miss an important follow-up or interview
- **Organized Notes**: Keep detailed notes, contacts, and insights for every application
- **Timeline Tracking**: Track every step from application to offer
- **100% Free**: Free for individual users with no credit card required

---

##  Features


###  Dashboard
- **Summary Cards**: Quick overview of total applications, interviews, offers, and pending statuses
- **Recent Activity**: Timeline of your latest job application activities
- **Quick Actions**: Fast access to add jobs, create notes, set reminders
- **Reminder Notifications**: Smart notifications for upcoming follow-ups and interviews

###  Job Tracker
- **Comprehensive Job Management**: Add, edit, and delete job applications
- **Status Tracking**: Track applications through multiple stages:
  - Applied
  - Interview
  - Offer
  - Rejected
  - Waiting
- **Rich Details**: Store company name, position, salary, location, application date, job URL, and notes
- **Visual Organization**: Clean table view with filtering and sorting capabilities

###  Notes System
- Create detailed notes for each job application
- Tag notes for easy organization
- Rich text editor support (React Quill)
- Link notes to specific job applications
- Pin important notes for quick access

###  Reminders
- **Smart Reminder Types**:
  - Follow-up
  - Interview Prep
  - Thank You notes
  - Custom reminders
- Set due dates and times
- Mark reminders as completed
- Link reminders to specific jobs
- Dashboard notifications for upcoming reminders

###  Authentication
- Secure authentication powered by Supabase
- User profile management
- Email-based registration and login
- Protected routes and data isolation

###  Settings
- User profile management
- Theme customization (light/dark mode)
- Account settings

---

##  Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Modern icon library
- **[React Hook Form](https://react-hook-form.com/)** - Performant form validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Backend & Database
- **[Supabase](https://supabase.com/)** - PostgreSQL database with real-time capabilities
- **Row Level Security (RLS)** - Database-level security policies
- **PostgreSQL Functions** - Custom database functions for complex operations

### Additional Libraries
- **[date-fns](https://date-fns.org/)** - Date manipulation and formatting
- **[React Quill](https://github.com/zenoamaro/react-quill)** - Rich text editor
- **[Recharts](https://recharts.org/)** - Charting library for data visualization
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[Embla Carousel](https://www.embla-carousel.com/)** - Carousel/slider component

---

##  Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, or **pnpm** package manager
- **Supabase account** (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quietapply-landing.git
   cd quietapply-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your Supabase credentials:
   
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   
   Run the SQL scripts in your Supabase SQL Editor in order:
   
   ```bash
   # Navigate to Supabase Dashboard > SQL Editor
   # Then run these scripts in order:
   
   1. scripts/01-create-tables.sql      # Creates all database tables
   2. scripts/02-enable-rls.sql         # Enables Row Level Security
   3. scripts/03-create-functions.sql   # Creates database functions
   4. scripts/04-create-timeline-table.sql  # Creates timeline table
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

##  Project Structure

```
quietapply-landing/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Dashboard page
│   ├── tracker/             # Job tracker page
│   ├── notes/               # Notes page
│   ├── reminders/           # Reminders page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── _settings/           # Settings page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── dashboard/           # Dashboard components
│   ├── landing/             # Landing page components
│   ├── notes/               # Notes components
│   ├── reminders/           # Reminder components
│   ├── tracker/             # Job tracker components
│   ├── settings/            # Settings components
│   ├── sidebar/             # Sidebar navigation
│   ├── ui/                  # shadcn/ui components
│   ├── auth-provider.tsx    # Authentication context
│   └── theme-provider.tsx   # Theme context
├── hooks/                   # Custom React hooks
│   ├── use-jobs.ts          # Job data hook
│   ├── use-notes.ts         # Notes data hook
│   ├── use-reminders.ts     # Reminders data hook
│   ├── use-profile.ts       # Profile data hook
│   ├── use-toast.ts         # Toast notifications hook
│   └── use-mobile.tsx       # Mobile detection hook
├── lib/                     # Utility libraries
│   ├── supabase.ts          # Supabase client & types
│   └── utils.ts             # Utility functions
├── scripts/                 # Database setup scripts
│   ├── 01-create-tables.sql
│   ├── 02-enable-rls.sql
│   ├── 03-create-functions.sql
│   └── 04-create-timeline-table.sql
├── public/                  # Static assets
├── styles/                  # Global styles
├── .env                     # Environment variables (create this)
├── components.json          # shadcn/ui config
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

<div align="center">


[⬆ Back to Top](#jobvoro---private-job-application-tracker)

</div>
