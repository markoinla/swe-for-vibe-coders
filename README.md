# SWE for Vibe Coders

An interactive course teaching software-engineering basics and best practices to people
who got into building through vibe coding. Short lessons, check-yourself questions, and
hands-on exercises in real repos.

Built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com) v4, and
interactive [Preact](https://preactjs.com) islands, designed to deploy to Cloudflare Pages.

## Getting started

```bash
npm install
npm run dev      # http://localhost:4321
```

## Commands

| Command           | Action                                        |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the local dev server                    |
| `npm run build`   | Build the production site to `./dist/`        |
| `npm run preview` | Preview the production build locally          |

## How it's organized

```
src/
├─ content/lessons/<module>/*.mdx   # the lessons — Markdown with interactive components
├─ data/modules.ts                  # the curriculum (module list + status)
├─ components/                      # Quiz (interactive), Callout, Terminal, TryItInRepo
├─ layouts/                         # page + lesson shells
├─ pages/                           # home, about, module pages, lesson router
└─ styles/global.css                # Tailwind entry + design tokens (light + dark)
```

### Styling

Tailwind v4 is wired in via `@tailwindcss/vite`. The colour system lives as CSS variables
in `src/styles/global.css` that flip with the OS light/dark preference, and they're mapped
into Tailwind's theme (`@theme inline`) — so utilities like `bg-surface`, `text-body`, and
`border-line` are automatically dark-mode aware, with no `dark:` classes needed. A few
reusable classes (`.btn`, `.container`) are defined with `@apply`.

### Writing a lesson

Add an `.mdx` file under `src/content/lessons/<module-slug>/`. The frontmatter drives
everything (ordering, module grouping, time estimate):

```mdx
---
title: Your first commit
description: The change → stage → commit rhythm.
module: version-control
order: 2
minutes: 12
---

import Quiz from '../../../components/Quiz.tsx';

Prose goes here, then drop in an interactive check:

<Quiz
  question="What is a commit?"
  options={[
    { text: "A saved snapshot", correct: true, explain: "Yes!" },
    { text: "A running server" },
  ]}
  client:visible
/>
```

Modules themselves live in `src/data/modules.ts`. Flip a module's `status` from
`coming-soon` to `available` once its lessons are written.

## Deploying to Cloudflare Pages

The site builds to fully static output, so no adapter or server is needed.

1. Push this repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Build command: `npm run build` · Output directory: `dist`
4. Deploy.

If you later add accounts or saved progress, switch to the
[`@astrojs/cloudflare`](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
adapter to unlock Workers, KV, and D1.

## Contributing

Spot a mistake or want to add a lesson? PRs welcome.
