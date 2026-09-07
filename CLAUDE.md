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

Defined at the top of `src/styles.css`. The theme is ported from
**madeacademy.basilisk.software**, with the accent scale moved from blue to
violet. Two things make it read as one system — keep both when adding anything.

**The five-step accent.** Never introduce a raw hex accent; pick a step.

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#060609` | base |
| `--surface` | `#101019` | raised panels |
| `--text` | `#F3F3F6` | text and the logo |
| `--muted` / `--muted-2` | `#8D8D9C` / `#63636F` | secondary, labels |
| `--violet` | `#6E3BFF` | primary accent |
| `--violet-hi` | `#A78BFF` | hover, focus, detail |
| `--violet-deep` | `#2E0B96` | shadowed accent |
| `--violet-glow` / `--violet-wash` | 35% / 10% violet | rings, section washes |

The magenta that used to pair with the violet is gone. The only place two
colours still split is the glitch mark's chroma layers, where it reads as broken
signal rather than as an accent.

**The cut corner.** `--cut-shape` is a 315° gradient used as a mask, so one
corner is chamfered off. It is on buttons, nav items, disc tiles, posters and
panels, sized per element with `--cut`.

> A `mask` clips anything painted outside the element box, **including the focus
> outline**. Everything carrying the chamfer therefore draws focus inward with
> `outline-offset: -3px`. If you add the mask to something new that can take
> focus, add it to that rule too or keyboard focus silently disappears. This is
> also why form inputs are *not* masked.

Neutrals, easing (`--ease`, `--ease-out`), `--maxw`, `--pad` and `--nav-h` come
from the same source. Legacy names (`--ink`, `--blinder`, `--uv`, `--hair`…) are
aliased onto these tokens at the bottom of `:root`, so colour has one source of
truth.

Photography goes through `.duo`: grayscale underneath, a violet wash blended
with `mix-blend-mode: color` at **0.4** opacity, releasing to colour on hover.
That opacity is deliberately low — at 0.7 the photos flood to flat violet and
lose all detail.

The ticker under the hero is the one full-bleed violet band, and the only place
the accent runs edge to edge.

## Type

| Family | Role | Source |
| --- | --- | --- |
| **Archivo** | headings (`.display`, weight 700) | Google Fonts |
| **Ranade** | body copy | Fontshare |
| **JetBrains Mono** | every label, button, nav item, date | Google Fonts |

Ranade has **no 600** — use 500 or 700. It replaced Switzer because Switzer is a
Helvetica clone and reads as a default; Ranade has enough character in the
letterforms to look chosen. `body` is 16px rather than 17 because Ranade's
x-height runs large.

Labels use `.data` (mono, uppercase, `0.2em` tracking). Mono things that must
stay readable — dates, times — add `.data--val`; running prose adds
`.data--prose`.

Section headings are the `SectionHead` component: title, hairline rule and
press-kit label on one baseline, rather than an eyebrow above a title.

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
