# Copilot Instructions for hsifrontend

## Project Overview

- **Frameworks:** React + TypeScript + Vite
- **App Structure:**
  - UI components in `src/components/ui/`
  - Feature modules (e.g., employee, users, data-table) in `src/components/`
  - Pages in `src/pages/`
  - API/service logic in `src/api/` and `src/Services/`
  - Static assets in `public/`

## Data Flow & Architecture

- **DataTables:** Used for listing entities (e.g., tasks, employees, users). Table columns are defined in `columns.tsx` per feature.
- **Service Layer:** API calls and authentication are abstracted in `src/Services/` (e.g., `authService.ts`, `userServices.ts`). Use these for backend communication.
- **State Management:** Local state via React hooks (`useState`, `useEffect`). No global state library detected.
- **Routing:** Each page (e.g., `employee.tsx`, `dashboard.tsx`) is a React component. Navigation is handled via sidebar/header components.

## Developer Workflows

- **Start Dev Server:**
  ```powershell
  npm run dev
  ```
- **Build for Production:**
  ```powershell
  npm run build
  ```
- **Linting:**
  - ESLint config in `eslint.config.js` (TypeScript-aware, React plugins recommended)
  - Run:
    ```powershell
    npm run lint
    ```
- **No explicit test setup found.**

## Project Conventions

- **Component Organization:**
  - UI primitives in `src/components/ui/`
  - Feature-specific components in their own folders (e.g., `employee/`, `datatable/`)
- **Data Fetching:**
  - Use `fetch` for static JSON (e.g., `/public/tasks.json`)
  - Use service files for API endpoints
- **TypeScript:**
  - Prefer strict typing; see `tsconfig.json` and ESLint rules
- **Styling:**
  - Uses Tailwind-like utility classes in JSX

## Integration Points

- **External APIs:**
  - API endpoints defined in `src/api/endpoints.ts`
  - API client logic in `src/api/apiClient.ts`
- **Authentication:**
  - Managed via `authService.ts` and `tokenService.ts`

## Examples

- **Employee Page:**
  - Loads tasks from `/public/tasks.json` and displays in a table (`src/pages/employee.tsx`)
  - Table columns defined in `src/components/employee/columns.tsx`
  - User navigation via `UserNav` component

## Key Files & Directories

- `src/pages/` — Main app pages
- `src/components/` — Feature and UI components
- `src/Services/` — Service layer for API/auth
- `src/api/` — API endpoints and client
- `public/` — Static assets and mock data
- `eslint.config.js`, `tsconfig*.json` — Linting and TypeScript config

---

**For AI agents:**

- Follow existing component/service boundaries
- Use service files for API/auth logic
- Adhere to TypeScript and linting conventions
- Reference feature folders for patterns and examples
- Ask for clarification if workflow or integration details are missing
