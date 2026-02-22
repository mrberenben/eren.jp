# CLAUDE.md — Personal Portfolio & Blog Site

## Project Overview

A minimalist personal website for a frontend web developer. Core sections: a short bio, a blog, interactive custom React component demos with source code, and a contact form. Data is persisted via Supabase.

---

## Tech Stack

| Layer                | Library / Version                            |
| -------------------- | -------------------------------------------- |
| Framework            | Next.js 16.1.16 (App Router)                 |
| UI Library           | React 19.2.3 with **React Compiler** enabled |
| Styling              | Tailwind CSS 4.2                             |
| Component Primitives | shadcn/ui (base/ui) 3.8.5                    |
| Backend / DB         | Supabase (Postgres + Auth + Storage)         |

---

## Project Structure

```
/
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root layout (fonts, theme provider)
│   ├── page.tsx                # Home — bio section
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Individual post
│   ├── components/
│   │   ├── page.tsx            # Component showcase listing
│   │   └── [slug]/page.tsx     # Individual demo + source code
│   └── contact/
│       └── page.tsx            # Contact form
├── components/
│   ├── ui/                     # shadcn/ui primitives (DO NOT edit)
│   ├── layout/                 # Header, Footer, Nav
│   └── shared/                 # Reusable app-level components
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   └── server.ts           # Server Supabase client (RSC / Server Actions)
│   └── utils.ts                # cn(), formatDate(), etc.
├── content/                    # MDX or markdown source for blog posts
└── public/                     # Static assets
```

---

## Key Conventions

### React & Next.js

- Use **Server Components by default**. Add `'use client'` only when necessary (event handlers, hooks, browser APIs).
- React Compiler is active — do **not** manually wrap with `useMemo` / `useCallback` unless there is a measured perf reason.
- Prefer `async` Server Components + `fetch` / Supabase server client for data loading over client-side fetching where possible.
- Use Next.js **Server Actions** (`'use server'`) for mutations (contact form submissions, etc.).
- File-based routing via App Router. Dynamic segments use `[slug]` convention.

### Styling

- **Tailwind CSS 4.2** — use the new CSS-first config (`@theme` in a CSS file, not `tailwind.config.js`) if customizing tokens.
- Follow a **minimalist** visual language: generous whitespace, neutral palette, clean typography.
- Use shadcn/ui primitives as the base; extend via `className` prop only. Do **not** modify files inside `components/ui/`.
- No arbitrary magic numbers — use Tailwind design tokens.

### TypeScript

- Strict mode enabled. All props, return types, and Supabase query results must be typed.
- Define shared types in `types/` or co-locate with the feature file.
- Use `zod` for any form validation or external data parsing.

### Supabase

- **Browser client** (`lib/supabase/client.ts`) — only inside Client Components.
- **Server client** (`lib/supabase/server.ts`) — inside Server Components, Server Actions, and Route Handlers.
- Never expose `SUPABASE_SECRET_KEY` to the client. It must only be used in trusted server contexts.
- Row Level Security (RLS) must be enabled on all tables.

---

## Supabase Schema (Core Tables)

```sql
-- Blog posts
posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text,
  content     text,           -- MDX / Markdown body
  published   boolean default false,
  created_at  timestamptz default now()
)

-- Custom component showcase entries
components (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text,
  source_code text,           -- Raw source shown in demo page
  published   boolean default false,
  created_at  timestamptz default now()
)

-- Contact form submissions
contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz default now()
)
```

---

## Component Demo Pages

Each entry under `/components/[slug]` should render:

1. **Live interactive demo** — the component rendered in an isolated sandbox area.
2. **Source code viewer** — syntax-highlighted code block (use `shiki` or similar).
3. **Description / usage notes**.

Keep demos self-contained. If a demo component needs state, wrap it in a lightweight `'use client'` wrapper; the primitive itself should remain portable.

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
SUPABASE_SECRET_KEY= # server-only, never expose to client
```

---

## Do's and Don'ts

| ✅ Do                                   | ❌ Don't                                       |
| --------------------------------------- | ---------------------------------------------- |
| Keep pages minimal and focused          | Add heavy animations or unnecessary UI noise   |
| Use Server Components for data fetching | Fetch data client-side unless truly necessary  |
| Type everything strictly                | Use `any`                                      |
| Follow the minimalist design language   | Override shadcn/ui internals directly          |
| Use Server Actions for form mutations   | Create API routes for simple mutations         |
| Co-locate component logic and types     | Scatter related files across unrelated folders |

---

## Notes for LLMs

- When adding a new feature, identify first whether it belongs in a Server or Client Component.
- When generating Tailwind classes, prefer semantic spacing/size tokens over arbitrary values.
- When writing Supabase queries, always use the correct client (browser vs server) and account for RLS.
- When creating a new component demo, follow the structure: `app/components/[slug]/page.tsx` (RSC wrapper) + `DemoClient.tsx` (client island).
- Minimalism is a first-class constraint — avoid feature creep in UI suggestions.
