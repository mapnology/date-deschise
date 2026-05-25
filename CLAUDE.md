# caen-web

Frontend web application for the CAEN data project. Built with React 19, Vite 8, Tailwind CSS v4, and TypeScript 6.

## Build & Development Commands
- **Start local dev server:** `npm run dev`
- **Build production bundle:** `npm run build`
- **Preview production build locally:** `npm run preview`
- **Run linter / code quality check:** `npm run lint`

## Architecture & Code Style
- **Language:** TypeScript only — no plain `.js` source files.
- **Components:** Use functional components with React Hooks. Prefer small, reusable, presentation-focused components.
- **Routing:** React Router v7. Pages live in `src/pages/` and are registered as routes in `App.tsx`.
- **Styling:** Use Tailwind CSS v4 utility classes exclusively. No config file (`tailwind.config.*`) — v4 uses CSS-first config via `@import "tailwindcss"`. Avoid writing raw CSS or using external UI component libraries unless explicitly requested.
- **Data Fetching:** All data is pulled via API requests from `https://caen-api.ro`. Keep API service logic isolated in `src/services/caenApi.ts`.
- **State Management:** Use standard React state (`useState`, `useContext`) for local/global UI state. Keep state close to where it is used.

## Hard Rules & Constraints
- **Scope:** You are inside the frontend repository. Do NOT attempt to run Python, FastAPI, or backend-related commands here.
- **Dependencies:** Do not install any external npm packages without asking the user first.
- **Environment:** Always use Vite's `import.meta.env` for environment variables. The API base URL is `import.meta.env.VITE_API_BASE_URL` (defined in `.env`). Do not hardcode production API endpoints directly into components or services.