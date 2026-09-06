# jbvii.uk — JBVII (Joe Burke), DJ / producer / promoter

Electronic press kit and booking site. Live at **https://jbvii.basilisk.software**
(preview). Intended home is **jbvii.uk**.

## Stack

React 19 + Vite + TypeScript, single page, no router, no UI library, no tests.
`npm run build` is the only check that exists — run it after every change.

The build is **prerendered**, not a plain SPA:

```
tsc -b  →  vite build  →  vite build --ssr  →  node prerender.mjs
```

`prerender.mjs` renders `src/entry-server.tsx` with `renderToString` and injects
the result into `dist/index.html` at the `<!--app-html-->` marker. `main.tsx`
then calls `hydrateRoot` instead of `createRoot`.

**Do not undo this.** It exists for two reasons: the basilisk badge anchor has to
be present in the served HTML to count as a backlink, and an EPK needs to be
readable by crawlers. A plain `vite build` silently breaks both — the page still
looks perfect in a browser.

Anything rendered during SSR must not touch `window`/`document` outside
`useEffect`.

## Commands

```bash
npm run build     # typecheck + build + prerender
npm run deploy    # build, then wrangler pages deploy dist
```

Wrangler is a local devDependency (`./node_modules/.bin/wrangler`), not global.

Hosting is Cloudflare Pages project **jbvii**; `basilisk-router` maps
`jbvii.basilisk.software` → `jbvii.pages.dev`. There is no DNS record and no
Pages custom domain, by design.

## Editing content

Almost everything Joe would want changed lives in `src/data.ts`: social links,
booking email, the disc nav, gig lists, gallery, ticker. Adding an entry to
`UPCOMING` automatically swaps the Events section out of its empty state.

Items still marked `TODO(joe)` in that file: the real Skiddle/RA artist URL and
the real bookings inbox.

## Design tokens

Defined at the top of `src/styles.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `#07080D` | base; blue-shifted, never pure black |
| `--haze` | `#12151F` | raised panels |
| `--blinder` | `#F2F4FF` | text and the logo; slightly blue white |
| `--uv` | `#6B3BFF` | violet wash |
| `--laser` | `#FF2D6F` | hot accent |

Both accents are used as **light** — bloom, beam, gradient bleed — not as flat
fills. The `.atmos` layer (fixed, `z-index: 0`) carries the corner washes and an
inline-SVG grain so the dark never reads as a flat swatch.

Type is **Bodoni Moda** for every statement (it matches the JBVII logotype) and
**Archivo** for everything functional. Two families only.

## The logo

`src/logoPath.ts` is the JBVII wordmark traced from `Copy of more.png` with
potrace — one path, `fill-rule="evenodd"` (the counters in the B and the slashed
V depend on it). It is ~35 kB of path data; that is expected.

`LogoGlitch` stacks white + magenta + violet copies plus four clip-path slices,
and drives `--g` (intensity) from scroll position in a rAF loop. It is the only
non-user-triggered motion on the page besides the hero ticker, and both are
disabled under `prefers-reduced-motion`.

`LogoMark` is the static version for the header, footer and merch slab.

## Gotchas

- **`noindex` is deliberate.** `index.html` carries a robots meta and
  `public/robots.txt` disallows everything, so the basilisk.software preview
  can't outrank jbvii.uk. **Remove both when the site moves to the real domain**
  — they are commented in place.
- **The badge needs `React.JSX`, not global `JSX`.** React 19 moved the
  intrinsics namespace; `src/basilisk-badge.d.ts` declares both.
- **The booking form has no backend.** It builds a `mailto:` from the fields.
  If a real inbox/endpoint is wanted later, swap `onBook` in `App.tsx`.
- **Chrome cannot reach `vite preview` from this machine's agent sandbox.**
  Review against the deployed URL instead of localhost.
- `source-images/` is gitignored — public repo, large binaries, and it contains
  photos that are not used on the site.
