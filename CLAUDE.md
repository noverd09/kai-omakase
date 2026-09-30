# omakase-ja

KAI is a fictional premium Japanese omakase restaurant: a portfolio project that is both a restaurant website and a reservation lead-generation system. Primary conversion: **Reserve a Table**. Journey: discover KAI, understand the experience, explore the menu, reserve, submit a request, see a confirmation state. Never present a submitted reservation as confirmed; it is a `pending` request until a staff action exists.

**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, React Hook Form + Zod, Motion only where it earns its place.

**Pages:** `/`, `/menu`, `/experience`, `/private-dining`, `/about`, `/reservations`, `/contact`.

**Architecture (Supabase-ready, Supabase NOT connected):** UI components never touch a database. Flow is `Form -> Reservation Service -> Repository interface -> Mock repository` (later swapped for a Supabase repository with no UI change). Layout: `app/`, `components/`, `lib/` (`lib/reservations/{types,validation,repository,mock-repository}.ts`), `types/`, `data/` (mock menu, reservations, restaurant, chef), `schemas/`. Future tables are typed only: `reservations`, `menu_items`, `restaurant_settings`, `private_dining_inquiries`. Reservation statuses: `pending | confirmed | cancelled | completed`.

**Reservation flow:** date, party size, time (mock availability 5:30 to 8:30 PM in 30 min steps), seating (Chef's Counter / Dining Table / No Preference), guest details, review, confirmation. Zod validation with inline errors (email, phone, party size limits, past dates, required). Design loading, empty, error, no-availability, and success states, not only the happy path.

**Build order (do not generate every page at once):** architecture, design system, global layout, navigation, homepage, reservation experience, menu, remaining pages, mock data, validation, responsive refinement, accessibility, final QA. Check consistency after each.

**Design:** follow [`DESIGN.md`](./DESIGN.md) ("Hinoki Ledger"). Tastemaker style lock in `.tastemaker/style-lock.md`. Mobile-first, `prefers-reduced-motion` respected, semantic HTML, keyboard and focus support, per-page metadata and Open Graph, structure ready for Restaurant/LocalBusiness JSON-LD (no fabricated business details).

@AGENTS.md

Everything above is the shared rule set (including project context and learnings, sections 10 and 11). The rules below are additions specific to Claude Code.

## Ask Before Destructive Commands

Never run irreversible or shared-state-changing commands without explicit permission. State the exact command, why, and wait for an OK.

Always require confirmation:

- `git push --force` / `--force-with-lease`
- `git reset --hard`, `git clean -fd`, `git checkout -- .`
- `git merge`, `git rebase`, `git cherry-pick` onto shared branches
- `git branch -D`, deleting remote branches (`git push origin :branch`)
- `git commit --amend` on already-pushed commits
- `git tag -d` / force-pushing tags
- Deleting or overwriting files or directories you haven't inspected

If unsure whether a command is destructive, ask.

## Verify Before Reporting Complete

- TypeScript: run `tsc --noEmit` and fix every type error.
- Builds: run the build command and confirm it succeeds.
- If you cannot verify, say so explicitly. Don't imply success.

## Next.js 16

This is not the Next.js from older training data. Before writing Next code, read the relevant guide in `node_modules/next/dist/docs/`. Do not branch initial render props on `useReducedMotion` (it causes hydration mismatches that hide content for reduced-motion users). Use `MotionConfig reducedMotion="user"` in `components/Providers.tsx` and the CSS `.reveal` classes.

## Design (UI work)

- Before writing any UI, check for `DESIGN.md` at the project root.
- If it exists: follow it. Use its tokens (colors, type scale, radii, spacing) and component rules. No hardcoded hex values or off-scale sizes. Read its Do's and Don'ts.
- If it doesn't exist: stop and run the `design-md-planner` skill (greenfield mode) to create it before building screens. Exception: if the user says to skip it, proceed and note that UI decisions are undocumented.
- Avoid the generic AI look: indigo/violet primary, Inter everywhere, `rounded-2xl` + soft shadow on everything, centered hero + three-column feature grid.
- After changing tokens or components, re-lint: `npx -y -p @google/design.md designmd lint DESIGN.md` (the `-p` form is needed on Windows PowerShell).

## Match the Model to the Task

- Mechanical, well-specified work (bulk edits, boilerplate, sweeps): smaller model or subagent.
- Hard reasoning (architecture, deep debugging, security): strongest model.
- Independent chunks: parallel subagents. Don't spawn agents for work doable inline.

## Environment

- Windows. Shell is PowerShell; Git Bash also available. Use the syntax of whichever you call.
- <!-- TODO: list CLIs actually installed (rg, fd, jq, gh, bun...) after checking with Get-Command. -->

## Further Rules

- `rules/`: path-scoped rule files; each declares its scope on the first line.
- Directory-level `CLAUDE.md` files: extra rules for that tree.
- Keep CLAUDE.md and AGENTS.md each under 300 lines.
