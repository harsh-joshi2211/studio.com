# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Studio Booking Application** - a web platform for discovering and booking creative studios (recording rooms, photo stages, podcast studios, etc.). It's a modern React application with a polished UI featuring animations, dark/light theme support, and interactive booking features.

**Tech Stack:**
- React 18 + TypeScript
- Vite (build tool, dev server)
- Tailwind CSS (styling with CSS variables for theming)
- React Router v6 (routing)
- TanStack React Query (server state management)
- shadcn/ui + Radix UI (component primitives)
- Framer Motion (animations)
- Vitest + Testing Library (unit tests)
- Playwright (E2E tests)

**Backend:** Separate Python backend running on `http://localhost:8000` with API proxy configured in Vite.

## Development Commands

### Core Commands
- `npm run dev` - Start development server at `http://localhost:8080`
- `npm run build` - Production build (outputs to `dist/`)
- `npm run build:dev` - Development build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint across the codebase

### Testing
- `npm test` or `npm run test` - Run all tests once (Vitest)
- `npm run test:watch` - Run tests in watch mode

### E2E Testing (Playwright)
- `npx playwright test` - Run E2E tests
- `npx playwright test --ui` - Interactive test runner

## Architecture & Structure

```
src/
├── App.tsx                 # Root component with providers (React Query, Router, Toasters)
├── main.tsx               # Entry point
├── index.css              # Global styles, CSS variable definitions for theming
├── pages/                 # Route components
│   ├── Index.tsx          # Homepage with studio listings, search, filters
│   ├── StudioDetail.tsx  # Individual studio view with booking calendar
│   └── NotFound.tsx      # 404 page
├── components/            # Feature & shared components
│   ├── BookingCalendar.tsx   # Interactive date picker for bookings
│   ├── MagneticButton.tsx   //Button with magnetic hover effect (Framer Motion)
│   ├── Navbar.tsx           # Navigation bar with theme toggle
│   ├── QuickLookDrawer.tsx  # Slide-out drawer for quick studio preview
│   ├── SearchBar.tsx        # Studio search input
│   ├── StudioCard.tsx       # Studio card in bento grid layout
│   ├── StudioFilter.tsx     //Filter chips for studio types
│   └── ui/                  # shadcn/ui primitives (button, card, dialog, etc.)
├── hooks/                 # Custom React hooks
│   ├── use-mobile.tsx    # Responsive breakpoint detection
│   └── use-toast.ts      # Toast notification system
```

## Key Patterns & Conventions

### Routing
- Route-based code splitting via `react-router-dom`
- Dynamic route: `/studio/:id` → `StudioDetail` page
- All page components live in `src/pages/`

### Styling & Theme
- **Tailwind CSS** with custom CSS variables for theming (defined in `index.css`)
- Theme toggling via `next-themes` (look for `className="dark"` on root/HTML)
- Custom colors: `primary`, `accent`, `surface`, `glow`, etc. reference CSS variables
- Component variants use `class-variance-authority` (cva) pattern in shadcn components

### Data Flow
- **React Query** handles server state; wrap data-fetching components with `QueryClientProvider`
- Mock studio data currently embedded in `Index.tsx`; should be replaced with API calls
- Backend API proxy: `/api/*` routes forward to `http://localhost:8000`

### Component Structure
- shadcn/ui components follow "slot" pattern with `className` merging via `tailwind-merge`
- Motion components from Framer Motion: use `initial`, `animate`, `transition`, `whileHover`, `whileTap`
- Radix UI primitives used for accessible dialogs, dropdowns, tabs, etc.

### TypeScript
- Strict mode enabled in tsconfig (some flags relaxed in base config)
- Path alias: `@/*` → `./src/*`
- React component files: `.tsx`; utilities: `.ts`

## Testing Strategy

### Unit & Integration Tests
- **Vitest** + `@testing-library/react`
- Test files co-located: `ComponentName.test.tsx` or `__tests__/` directories
- Mock studio data available; test rendering, interactions, and state changes

### E2E Tests
- **Playwright** configured via `playwright.config.ts` (extends Lovable preset)
- Tests simulate user flows: browsing studios, filtering, viewing details, booking

## Important Files to Know

- `vite.config.ts` - Vite configuration, proxy setup for backend API, path aliases
- `tailwind.config.ts` - Tailwind theme, custom colors, animations, plugin setup
- `eslint.config.js` - TypeScript ESLint with react-hooks and react-refresh rules
- `index.html` - HTML template
- `components.json` - shadcn/ui component registry

## Backend API

The frontend expects a backend running on `localhost:8000`. API calls are proxied:
- Vite dev server forwards `/api/*` to backend
- For production, set `VITE_API_URL` or configure proxy in build

## Notes

- This project was bootstrapped with Lovable (see `lovable-tagger` in devDependencies)
- Motion effects (magnetic buttons, staggered animations) used throughout - preserve these when modifying components
- Calendar component uses custom logic (not shadcn calendar) - be careful when editing date handling
- Theme context provided by `next-themes`; ensure theme toggle works on all pages
