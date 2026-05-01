# RoomReady AI

AI-powered room setup for short-term rentals. Upload photos, get furnishing plans and shopping lists.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Auth & DB:** Supabase (auth, database, storage, RLS)
- **Payments:** Stripe Checkout Sessions
- **AI:** OpenAI-compatible API (GPT-4o for text/vision, DALL-E 3 for images)
- **PDF:** jsPDF (server-side generation)

## Getting Started

```bash
npm install
npm run dev        # Start dev server at http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type-check without emitting |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in all values before running.

### Supabase (required)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

### AI Provider (required for generation)

| Variable | Description |
|----------|-------------|
| `AI_PROVIDER` | AI provider name (e.g. `openai`) |
| `OPENAI_API_KEY` | OpenAI API key (`sk-...`) |
| `AI_TEXT_MODEL` | Text/vision model (e.g. `gpt-4o`) |
| `AI_VISION_MODEL` | Vision model (e.g. `gpt-4o`) |
| `AI_IMAGE_MODEL` | Image model (e.g. `dall-e-3`) |
| `IMAGE_GENERATION_QUALITY` | Image quality (`standard` or `hd`) |
| `IMAGE_GENERATION_SIZE` | Image size (e.g. `1024x1024`) |
| `AI_BASE_URL` | API base URL (e.g. `https://api.openai.com/v1`) |

### Stripe (required for payments)

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...` or `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (`whsec_...`) |
| `STRIPE_SINGLE_PROJECT_PRICE_ID` | Stripe Price ID for single project unlock |
| `NEXT_PUBLIC_APP_URL` | Public app URL for Stripe redirects |

## Database Setup

Run the SQL migrations in `db/migrations/` in numerical order (001 → 011) in the Supabase SQL Editor. Then optionally run the seed file for the product catalog.

## Deployment Checklist

1. **Set all environment variables** in your hosting platform (Vercel, etc.)
2. **Run database migrations** against your production Supabase project
3. **Configure Stripe webhook** in the Stripe Dashboard pointing to `https://yourdomain.com/api/webhooks/stripe` with events `checkout.session.completed`
4. **Configure Supabase Storage** — create bucket `project-images` with public access
5. **Set up your first admin user** by updating `profiles.role = 'admin'` for your account in Supabase
6. **Verify build:** `npm run build` should pass before deploying

## Project Structure

```
app/                          # Next.js App Router
  (marketing)/                # Marketing pages (home, about, pricing)
  login/                      # Login page
  dashboard/                  # User dashboard
  projects/[projectId]/       # Project pages
    upload/                   # Photo upload
    requirements/             # Design requirements form
    generating/               # AI generation progress
    variants/                 # Design variant browsing
    variants/[variantId]/     # Variant detail
      edit/                   # Edit variant
      shopping-list/          # Shopping list
    checkout/                 # Stripe checkout
    export/                   # PDF export
  admin/                      # Admin panel
    products/                 # Product catalog management
    projects/                 # All projects
    users/                    # All users
    generations/              # Generation jobs
    payments/                 # Payment records
  api/                        # API routes
    generate/                 # AI generation
    edit/                     # AI edit
    export/pdf/               # PDF export
    payments/                 # Stripe checkout
    webhooks/stripe/          # Stripe webhook

components/                   # React components
  ui/                         # shadcn/ui primitives
  layout/                     # Header, footer, container
  marketing/                  # Landing page sections
  projects/                   # Project forms and cards
  design/                     # Design variant components
  shopping/                   # Shopping list components
  generation/                 # Generation progress
  payments/                   # Stripe checkout CTA
  export/                     # PDF export
  admin/                      # Admin tables and forms

lib/                          # Library functions
  supabase/                   # Server/browser/middleware clients
  auth/                       # Auth helpers
  ai/                         # AI client, prompts, generation
  generation/                 # Generation orchestration
  projects/                   # Project CRUD
  design/                     # Design variant queries
  shopping/                   # Shopping list queries
  products/                   # Product catalog queries
  payments/                   # Stripe client
  pdf/                        # PDF generation
  export/                     # Export creation
  storage/                    # Supabase Storage helpers
  admin/                      # Admin data queries
  security/                   # Rate limiting
  logging/                    # Structured logger
```

## License

Private — all rights reserved.
