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
| **Figtree** | body copy | Google Fonts |
| **JetBrains Mono** | every label, button, nav item, date | Google Fonts |

**Do not self-host or hotlink pacha.com's fonts.** Pacha sets its paragraphs in
**TT Hoves** (TypeType) and its footer in **Supreme LL** (Lineto). Both are
commercial licences we do not hold, and their `.woff2` files are served under
pacha.com's own licence. Figtree is the free match — same geometric skeleton,
tall x-height and generous width. If the exact face is ever wanted, buy a TT
Hoves webfont licence from TypeType and swap `--body`; nothing else changes.

Earlier body faces and why they were dropped: Switzer (a Helvetica clone, read
as a default) and Ranade (character, but the wrong kind). Candidates were
compared by rendering them in the real theme at real sizes — see
`shot.mjs` in the session scratchpad for the method. Judge type by looking at
it, not by description.

Labels use `.data` (mono, uppercase, `0.2em` tracking). Mono things that must
stay readable — dates, times — add `.data--val`; running prose adds
`.data--prose`.

Section headings are the `SectionHead` component: title, hairline rule and
press-kit label on one baseline, rather than an eyebrow above a title.

## The constellation

The section index is circles scattered at irregular sizes, wired together by a
faint web. Positions live in `src/data.ts` as `x`/`y`/`size` per disc, and the
edges to draw as `DISC_EDGES`.

The web is an inline SVG with `viewBox="0 0 100 100"` and
`preserveAspectRatio="none"`, so its coordinate space **is** the percentage
space the discs are positioned in — a line between two disc ids lands on their
centres with nothing to keep in sync. Strokes carry `vector-effect="non-scaling-stroke"`
so they stay hairlines despite the non-uniform scaling.

Move a disc by editing `x`/`y` only; the web follows. Below 880px the scatter
collapses to a grid and the web is hidden, because it would then join circles
that are no longer where the lines expect.

## The first screen

`.hero` is exactly `100svh` and contains nothing but the mark, the line and the
two buttons. The marquee is deliberately **outside** the hero, immediately after
it, so the first screen is only the hero and the marquee opens the second. If
you add anything to the hero, keep it inside `.hero__inner` or the fold moves.

## Section reveals

Elements marked `[data-reveal]` are revealed by an IntersectionObserver in
`useReveal` (`App.tsx`), which unobserves each one after it fires. Four kinds:
`head` (title rises out of a mask, rule draws across, label follows), `up`,
`media` (a clip opens) and `band` (the violet marquee opens from a hairline —
the marker for crossing out of the first screen). `--d` on an element staggers
it.

**Nothing is hidden unless motion is wanted.** A script in `<head>` adds `anim`
to `<html>` before first paint, and every hidden state is scoped to `.anim`. So
with JS off, a failed bundle, or `prefers-reduced-motion`, everything renders in
its finished state instead of staying invisible. Keep new reveal rules under
`.anim` for the same reason.

The bottom `rootMargin` is what makes the motion *visible*, not just fire. At
`-6%` an element revealed the instant it touched the bottom edge of the screen,
so the animation had finished before it reached anywhere a reader was looking —
it read as no animation at all. `-20%` holds it until the element is properly on
screen. If reveals ever look dead again, check this before the durations.

> **The observer threshold must stay `0`.** IntersectionObserver measures a
> target *after* its own `clip-path` is applied, so a reveal that starts clipped
> shrinks the very geometry being observed. The band starts at `inset(46% 0)`
> and therefore tops out at a `0.076` intersection ratio — under a `0.12`
> threshold it can never reveal itself, and the marquee stays a slot forever.

## Disc hover

Hovering a circle lights the web edges it sits on: `Discs` tracks the hovered id
in state and marks matching `<line>`s `is-lit`. The circle scales 1.05 while the
photo inside scales 1.12, so the movement has depth, and a halo ring pulses
outward. Keep the photo's scale above the circle's or the effect flattens.

## Mobile gotchas

The footer credit badge and copyright sit **side by side on one line at every
width**, centred against each other. The badge is a fixed 216x30 in its own
shadow root and must never be squashed, so the copyright is what gives at narrow
sizes (tighter tracking, smaller gap, and the footer gives back some gutter
below 400px). `.foot__copy` must keep `margin: 0` — `align-items: center`
centres the *margin box*, so the global `p` bottom margin lifted the text ~6px
above the badge's centre.


Two things widened the document past the viewport, which threw the whole mobile
layout out (the header button ran off the right edge). Both are easy to
reintroduce:

- **The marquee is already full-bleed.** It is a direct child of `<main>`, which
  has no inline padding, so it needs no negative margin. A
  `margin-inline: calc(var(--pad) * -1)` on it pushes it a `--pad` past each
  edge and widens the page.
- **Decorative glows still take up space.** `.disc__bloom` sits at `inset: -20%`
  and `.disc__halo` scales to `1.26`. In the tight mobile grid the outer
  column's glow spilled past the content edge (360 -> 368). `.discs` clips on
  mobile so inner glows are untouched and only the outer edge is trimmed.

`body { overflow-x: hidden }` hides the symptom but does **not** stop
`scrollWidth` growing, so check `document.documentElement.scrollWidth` against
`clientWidth` at 360, 390 and 430 rather than trusting a screenshot. When
hunting one down, remember that check has to run with the body clipping lifted,
or every element looks innocent.

## The logo

`src/logoPath.ts` is the JBVII wordmark traced from `Copy of more.png` with
potrace — one path, `fill-rule="evenodd"` (the counters in the B and the slashed
V depend on it). It is ~35 kB of path data; that is expected.

`LogoGlitch` stacks white + two violet copies plus four clip-path slices, and
drives `--g` (intensity) from three sources added together: scroll position, a
burst on page load, and a low-amplitude idle flicker every 3.4-7.2s so the mark
never sits completely dead. The idle envelope is deliberately chopped
(`idleAge % 90 < 52`) so it stutters rather than fading smoothly. It is the only
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
