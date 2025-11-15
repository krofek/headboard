## Quick orientation

- This is a Nuxt 4 (Nitro) application using `@nuxt/ui`. Main source lives under `app/`.
- Key folders:
  - `app/plugins/` — global plugin(s). `app/plugins/api.ts` registers a $fetch client and provides it as `api` for the app.
  - `app/composables/` — auto-imported composables (configured in `nuxt.config.ts`). `app/composables/api.ts` is present but is a lightweight/placeholder; prefer the plugin client.
  - `app/repositories/` — thin repository classes that encapsulate API calls (e.g. `app/repositories/user.ts`).
  - `app/types/` — shared TypeScript types and interfaces used throughout the UI.

## Big-picture architecture

- UI: built with Nuxt + `@nuxt/ui` components (pages in `app/pages/`). Pages use `UDashboard*` components and composition API setup scripts.
- Data flow: components/pages call composables or repository classes which call the shared $fetch client created in `app/plugins/api.ts`.
- API client: runtime base URL is configured via `runtimeConfig.public.apiUrl` in `nuxt.config.ts`. The plugin attaches an Authorization header from `useCookie('auth_key')` on each request.

Why this matters to an automated agent:
- When editing API calls, wire them through `app/plugins/api.ts` (or the repository patterns in `app/repositories/`) so the global auth header and baseURL are used consistently.

## Project-specific conventions and patterns

- Auto-imports: `nuxt.config.ts` includes `imports.dirs: ['~/composables/**']` — new composables placed under `app/composables` are auto-available in setup scripts.
- Repositories: place network logic in `app/repositories/*` as small classes that accept the shared `api` (a `$fetch` instance). Example: `app/repositories/user.ts`:

  - constructor(api: $Fetch) { this.api = api }
  - async getUsers(): Promise<User[]> { return this.api('/users') }

- Types: Use the interfaces in `app/types/index.d.ts` (e.g. `User`) for signatures and component props.
- API auth & cookies: the global plugin reads `useCookie('auth_key')` and sets `Authorization: Bearer <value>`. Keep cookie name consistent when modifying auth flows.

## How to call the API (example snippets)

- From a page or component (setup script):

  const nuxt = useNuxtApp()
  const api = nuxt.$api // the $fetch client provided in `app/plugins/api.ts`
  // or instantiate a repository:
  const users = new (await import('~/app/repositories/user')).default(api)
  const list = await users.getUsers('')

- From a composable or repository, accept and use the provided `$fetch` instance rather than creating new ones.

## Developer workflows (commands and CI)

- Install deps: pnpm install (project uses pnpm; `package.json` sets `packageManager: pnpm@10.19.0`).
- Local dev: pnpm dev (starts Nuxt dev server at http://localhost:3000).
- Build: pnpm build
- Preview production build locally: pnpm preview
- Lint: pnpm run lint (CI runs this)
- Typecheck: pnpm run typecheck (CI runs this)

- CI details: see `.github/workflows/ci.yml` — actions checkout, pnpm install, lint, and typecheck. Keep changes compatible with those checks.

## Files to reference when making changes

- `nuxt.config.ts` — runtimeConfig.public.apiUrl, auto-import dirs, modules.
- `app/plugins/api.ts` — canonical place that creates and provides the `$fetch` client (auth header logic lives here).
- `app/repositories/*.ts` — patterns for network access and where to add new repository classes.
- `app/types/index.d.ts` — canonical shared types.
- `package.json` — scripts and package manager (pnpm).

## Small gotchas an agent should be aware of

- There is a placeholder `app/composables/api.ts` that defines a `$fetch` but returns an empty object; the real runtime injection is in `app/plugins/api.ts`. Prefer editing the plugin and repositories.
- Header name and cookie keys are sensitive to typos: plugin uses `Authorization` and `auth_key` cookie; double-check spelling when modifying auth flows.
- Repositories expect a `$fetch` instance typed as `$Fetch` / `NitroFetchRequest` (see `app/repositories/user.ts`). Use those types when editing or adding repositories.

## What to do when adding features

- Add any new network logic to `app/repositories/` as a small class that receives the injected `api` client.
- Add or extend types in `app/types/index.d.ts` and import them in components/repositories.
- If you add new composables, put them in `app/composables/` so they are auto-imported.

---

If anything above is unclear or you'd like more examples (e.g., converting a component to use a repository, or adding retries to the global client), tell me which area to expand and I will update this file.
