# RoomReady AI

AI-powered room setup for short-term rentals. Upload photos, get furnishing plans and shopping lists.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Package manager:** npm

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |

## Project Structure

```
app/                  # Next.js App Router
  layout.tsx          # Root layout
  (marketing)/        # Marketing pages (header + footer)
  login/              # Login page
  dashboard/          # Dashboard page
  projects/           # Project pages
components/
  ui/                 # shadcn/ui components
  layout/             # Layout components (header, footer, container)
lib/                  # Utility functions
types/                # Shared TypeScript types
```
