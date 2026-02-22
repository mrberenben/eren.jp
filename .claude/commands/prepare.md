# /prepare — Load Session Context

Load context files based on the user's work area. Follow these steps:

## Step 1: Always Load Core Context

Read these files first (they apply to all work areas):

1. `.claude/context/architecture.md` — system overview, component map, data flow
2. `.claude/skills/vercel-react-best-practices` - react and next best practices

## Step 2: Optional — Load Skills

If the task involves understanding architecture or data flow, offer to load relevant skills from `.claude/skills/`:

- `web-design-guidelines` — web design best practices
- `frontend-design` — designing
- `seo-audit` — audit seo and performance
- `shadcn-ui` — ui components
- `supabase-postgres-best-practices` — backend & db

## Step 4: Summarize

After loading, provide a brief summary:

- Which context files were loaded
- Key patterns to keep in mind for the session
- Any relevant planning docs in `.claude/planning/` if applicable

## Step 5: Agents & Skills

Wait for prompt and analyze the prompt. Use related skills and spawn agents when needed for job.
