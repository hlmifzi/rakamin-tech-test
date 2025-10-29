# Hiring Platform

Deployed URL: https://rekaman-tech-test-web.vercel.app/
storybook URL: https://storybook-hiring-platform.vercel.app/

Credentials for Login
- Recruiter: `recruiter@gmail.com` / `123456`
- Candidate: `candidate@gmail.com` / `123456`

GitHub Repository: https://github.com/HLMIFZI/hiring-platform

## Project Overview
- A simple hiring platform with candidate job listing, application form, and admin job management.
- Supports mock authentication and role-based navigation between candidate and admin experiences.

## Tech Stack Used
- storybook design system: https://storybook-design-system.vercel.app/
- Next.js 16, React 19, TypeScript
- Tailwind CSS, SCSS Modules
- pnpm, Turborepo workspace
- Framer Motion (animations), Zustand (state), React Hook Form

## How to Run Locally
- Prerequisite: Node.js 18+, pnpm
- Install dependencies: `pnpm install`
- Start web app:
  - Option A: `cd apps/web && pnpm dev`
  - Option B (workspace filter): `pnpm --filter web dev`
  - Option C (monorepo): `pnpm dev` => WILL START ALL APPS IN THE WORKSPACE 
- Open: `http://localhost:3000`

## Credential Details
- Candidate: `candidate@gmail.com` / `123456`
- Admin: `recruiter@gmail.com` / `123456`

## Key Features Implemented
- Candidate job list with slug-driven selection and detail panel.
- “Apply” flow redirects to auth when not logged in, then to `candidate/apply/<jobID>`.
- Admin job list, basic search, and manage candidates by job.
- Server-side cookie `role` with API route login and redirects.

## Optional Enhancements You Added
- Dynamic `candidate/job-list` page (`revalidate = 0`, `dynamic = "force-dynamic"`).
- URL-synchronized highlighting and remount to ensure right panel updates.
- Skeleton and motion enhancements for smoother UX.

## Design or Logic Assumptions
- Mock authentication only; credentials are hardcoded for demo.
- Cookie name `role` determines access and redirect behavior.
- When `jobID` query is present at auth, candidate role redirects to apply page after login.

## Known Limitations
- No production-ready auth (no hashing, no database users).
- Cookie security flags not enforced in dev.
- Admin and candidate permissions are minimal and for demo purposes only.