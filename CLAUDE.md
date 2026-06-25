# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev        # dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

No test suite, no linter configured.

## Tech Stack

| Layer | Tech | Version |
|---|---|---|
| UI | React | 18.3 |
| Build | Vite | 5.4 |
| Styling | Tailwind CSS | 3.4 |
| Routing | React Router v6 | 6.27 |
| Animations | Framer Motion | 11.2 |
| Icons | lucide-react | 0.453 |
| Deploy | Netlify | — |
| Forms | FormSubmit.co | — |

## Project Structure

```
src/
├── App.jsx              # Entire portfolio: data constants + all UI components
├── main.jsx             # Router definition — register new routes here
├── index.css            # Tailwind directives + 2 global rules (scroll-behavior, focus-visible)
├── ScrollProgress.jsx   # Only standalone component: fixed top progress bar
└── views/
    ├── ProjectDetail.jsx  # Case study for PIRtech (/proyectos/pirtech)
    └── About.jsx          # /about page (stub, minimal content)

public/
├── assets/              # Project screenshots (pirtech-home.png, pirtech-catalogo.png, pirtech-nosotros.png)
├── accents/             # SVG decoratives (dots.svg used in Navbar)
├── _redirects           # Netlify SPA redirect rule (/* → /index.html 200)
├── success.html         # Standalone post-form page (Tailwind via CDN, no React)
├── cv-jeremias-regalzi.pdf
├── favicon.svg
├── manifest.webmanifest
├── robots.txt
└── sitemap.xml
```

## Architecture

**Monolithic App.jsx pattern** — All data and UI components live in `src/App.jsx`. This is intentional for a portfolio of this size; do NOT extract components into separate files unless the user explicitly asks.

**Data layer** — Four plain JS constants at the top of `src/App.jsx`:
- `PROFILE` — name, role, summary, links, badges, skills
- `PROJECTS` — array of project objects (see schema below)
- `EXPERIENCE` — array of `{ company, role, period, bullets[] }`
- `EDUCATION` — array of `{ school, degree, period }`

All content edits go here. No CMS, no external data source.

**Routing** — Defined in `src/main.jsx` with `createBrowserRouter`:
- `/` → `App.jsx`
- `/proyectos/pirtech` → `views/ProjectDetail.jsx`
- `/about` → `views/About.jsx`

**Animation pattern** — Sections use `whileInView` + `viewport={{ once: true }}` so animations fire once on scroll. Cards use `initial/whileInView` with staggered `delay: i * 0.08`. `ScrollProgress.jsx` uses `useScroll` + `useSpring`.

**Dark mode** — Media-query based (`prefers-color-scheme`). All dark variants use the `dark:` Tailwind prefix. The root background is `from-slate-50 to-white dark:from-zinc-950 dark:to-zinc-900`.

**Contact form** — Native HTML form → FormSubmit.co (`action="https://formsubmit.co/jereregalzi93@gmail.com"`). Hidden fields: `_next` (→ `/success.html`) and `_captcha: false`. `success.html` is a standalone static file, not a React route.

**Static file copying** — `vite.config.js` uses `vite-plugin-static-copy` to copy `public/_redirects` and `public/success.html` into `dist/` root. Do not remove this plugin.

## Naming Conventions

- **Components**: PascalCase function declarations (`function ProjectDetail()`, `export default function Portfolio()`)
- **Data constants**: SCREAMING_SNAKE_CASE (`PROFILE`, `PROJECTS`)
- **Files**: PascalCase for components (`ProjectDetail.jsx`, `ScrollProgress.jsx`), camelCase for config (`vite.config.js`)
- **CSS**: Tailwind utility classes only — no custom class names, no CSS modules
- **Route slugs**: Spanish, lowercase with hyphens (`/proyectos/pirtech`)

## Coding Standards

- No TypeScript — plain JSX throughout
- No prop-types — this is a personal portfolio, not a shared library
- No comments in JSX unless the pattern is genuinely non-obvious
- Tailwind classes ordered: layout → spacing → typography → color → state (`hover:`, `dark:`, `group-hover:`) → animation
- `loading="lazy"` on all `<img>` tags except the hero photo (above the fold)
- All external links: `target="_blank" rel="noreferrer"`
- `max-w-6xl` is the standard page container width (views use `max-w-5xl`)
- `px-4` horizontal padding on all containers
- Card hover pattern: `hover:-translate-y-1.5 hover:shadow-xl hover:shadow-blue-500/10`

## Design System

**Color palette** — Blue-centric:
- Primary: `blue-600` / `blue-400` (dark)
- Accent gradient: `from-blue-600 to-blue-400` (section titles), `from-blue-500 to-indigo-400` (underline bar)
- Cards: `bg-white/70 dark:bg-zinc-900/70` with `backdrop-blur`
- Borders: `border-zinc-200/80 dark:border-zinc-700/60`
- Muted text: `text-zinc-600 dark:text-zinc-300`

**Tag component** — Blue pill for stack/skills: `bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300`

**Section component** — Wraps every main section; accepts `id` and `title`. Gradient title + 3px blue underline bar. Always use this for new sections.

**Card component** — Glass-morphism card with hover lift. Use as the base for any new card UI.

**ProjectBadge** — `"Live"` (green, animated pulse dot) or `"Interno"` (zinc, lock icon).

## PROJECTS Array Schema

```js
{
  title: string,           // e.g. "PIRtech — Catálogo + Presupuesto"
  description: string,
  highlights: string[],    // 2-4 bullet points shown in card
  stack: string[],         // rendered as <Tag> chips
  repo: string | null,     // GitHub URL or null (shows lock icon)
  demo: string | null,     // Live URL or null (shows lock icon)
  image: string | null,    // "/assets/filename.png" or null → gradient placeholder
  badge: "Live" | "Interno",
  caseStudy?: string,      // optional route string, e.g. "/proyectos/pirtech"
}
```

## Common Tasks

**Add a project** — Append to `PROJECTS` in `src/App.jsx`. Place screenshot in `public/assets/`.

**Add a case study page** — Create `src/views/MyProject.jsx` (copy `ProjectDetail.jsx` as template), register route in `src/main.jsx`, set `caseStudy: "/proyectos/my-project"` on the project object.

**Add a new nav section** — Add an anchor link to the `links` array in `Navbar`, wrap the content in `<Section id="..." title="...">`, place it inside `<main>` in `Portfolio`.

**Update personal info** — Edit `PROFILE` constant in `src/App.jsx`. CV file lives at `public/cv-jeremias-regalzi.pdf`.

**Update experience/education** — Edit `EXPERIENCE` or `EDUCATION` arrays in `src/App.jsx`.

## Deployment

- Platform: Netlify, auto-deploy from `main` branch
- Live URL: `https://jeremias-regalzi-portfolio.netlify.app`
- SPA routing: `public/_redirects` (`/* /index.html 200`) copied to `dist/` by vite-plugin-static-copy
- Build command: `npm run build` → output dir: `dist/`
