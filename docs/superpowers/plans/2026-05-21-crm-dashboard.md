# CRM Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal CRM app with backend login, dashboard, light/dark mode, and hardcoded stagnating opportunities.

**Architecture:** Add a backend auth endpoint, replace the simple table app with a feature-based React structure, and keep opportunity mock data isolated for later API migration. Use CSS variables for theme tokens and small shared UI primitives for icons and layout.

**Tech Stack:** React 18, TypeScript, Vite, Express, plain CSS.

---

### Task 1: Backend Login Endpoint

**Files:**
- Modify: `backend/src/index.ts`

- [x] Add JSON login route at `/api/auth/login` with demo credentials.
- [x] Return a small user object and demo token.
- [x] Return 401 for invalid credentials.

### Task 2: Frontend Structure

**Files:**
- Create: `frontend/src/app/App.tsx`
- Create: `frontend/src/app/App.css`
- Create: `frontend/src/components/layout/AppShell.tsx`
- Create: `frontend/src/components/layout/AppShell.css`
- Create: `frontend/src/components/ui/Icon.tsx`
- Create: `frontend/src/features/auth/LoginPage.tsx`
- Create: `frontend/src/features/auth/LoginPage.css`
- Create: `frontend/src/features/dashboard/DashboardPage.tsx`
- Create: `frontend/src/features/dashboard/DashboardPage.css`
- Create: `frontend/src/features/opportunities/OpportunityBoard.tsx`
- Create: `frontend/src/features/opportunities/OpportunityBoard.css`
- Create: `frontend/src/features/opportunities/mockOpportunities.ts`
- Create: `frontend/src/features/opportunities/types.ts`
- Create: `frontend/src/hooks/useTheme.ts`
- Create: `frontend/src/services/authService.ts`
- Modify: `frontend/src/main.tsx`
- Modify: `frontend/src/index.css`

- [x] Replace the old table-first UI with a small routed-by-state app.
- [x] Keep auth state in the root component.
- [x] Keep hardcoded opportunity data in its own module.
- [x] Support light and dark mode with persistent localStorage preference.

### Task 3: Verification

**Files:**
- No new files.

- [x] Run `npm run build`.
- [x] Start the dev server and inspect the UI in browser.
