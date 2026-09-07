import { useEffect, useRef } from "react";
import { LOGO_PATH, LOGO_VIEWBOX } from "../logoPath";

/**
 * The one bold thing on the page.
 *
 * Three stacked copies of the traced JBVII mark — warm white and two cobalt
 * channels that separate under load — over four horizontal slices that
 * tear sideways. Intensity is driven by scroll position, so the mark holds
 * still while you read it and comes apart as you leave.
 */

const SLICES = [
  { top: 8, height: 13 },
  { top: 31, height: 9 },
  { top: 54, height: 16 },
  { top: 78, height: 11 },
];

type Props = { className?: string };

export default function LogoGlitch({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      el.style.setProperty("--g", "0");
      return;
    }

    let raf = 0;
    let lastSeed = 0;
    // page-load burst: settles over the first ~900ms
    const born = performance.now();

    const tick = (now: number) => {
      const vh = window.innerHeight;
      const scrolled = window.scrollY;

      // scroll drive: quiet at rest, ramps across the first screen
      const travel = Math.min(1, scrolled / (vh * 0.85));
      const scrollG = Math.pow(travel, 1.35);

      // load burst
      const age = now - born;
      const burst = age < 900 ? Math.pow(1 - age / 900, 2.2) : 0;

      const g = Math.min(1, scrollG + burst);
      el.style.setProperty("--g", g.toFixed(3));
      el.style.setProperty("--fade", String(1 - travel * 0.55));

      // re-seed the tear offsets at ~14fps for a digital stutter
      if (g > 0.02 && now - lastSeed > 70) {
        lastSeed = now;
        for (let i = 0; i < SLICES.length; i++) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          const mag = Math.random() * Math.random(); // biased toward small
          el.style.setProperty(`--s${i}`, (dir * mag).toFixed(3));
        }
        el.style.setProperty("--jit", (Math.random() * 2 - 1).toFixed(3));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const svg = (extra: string, fill: string) => (
    <svg
      className={`glitch__layer ${extra}`}
      viewBox={LOGO_VIEWBOX}
      aria-hidden="true"
      focusable="false"
    >
      <path d={LOGO_PATH} fill={fill} fillRule="evenodd" />
    </svg>
  );

  return (
    <div ref={ref} className={`glitch ${className}`} aria-hidden="true">
      {svg("glitch__chroma glitch__chroma--a", "#8EA5FF")}
      {svg("glitch__chroma glitch__chroma--b", "#405BFF")}
      {svg("glitch__base", "#F3F1EC")}
      {SLICES.map((s, i) => (
        <svg
          key={i}
          className="glitch__slice"
          viewBox={LOGO_VIEWBOX}
          aria-hidden="true"
          focusable="false"
          style={
            {
              clipPath: `inset(${s.top}% 0 ${100 - s.top - s.height}% 0)`,
              "--i": i,
            } as React.CSSProperties
          }
        >
          <path d={LOGO_PATH} fill="#F3F1EC" fillRule="evenodd" />
        </svg>
      ))}
    </div>
  );
}

/** Static mark for the header and footer — no motion, no chroma. */
export function LogoMark({ className = "" }: Props) {
  return (
    <svg
      className={className}
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label="JBVII"
      focusable="false"
    >
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
