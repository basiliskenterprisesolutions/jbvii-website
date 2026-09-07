import { DISC_EDGES, DISCS } from "../data";

const byId = Object.fromEntries(DISCS.map((d) => [d.id, d]));

/**
 * Section and profile index, laid out as a constellation: circles scattered
 * at irregular sizes with a faint web drawn between them so the group reads
 * as one object rather than seven loose links.
 *
 * The web is decorative and hidden on small screens, where the scatter
 * collapses to a grid and the lines would no longer connect anything.
 */
export default function Discs() {
  return (
    <nav className="discs" aria-label="Sections and profiles">
      <div className="discs__field">
        <svg
          className="discs__web"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {DISC_EDGES.map(([a, b]) => {
            const from = byId[a];
            const to = byId[b];
            if (!from || !to) return null;
            return (
              <line
                key={`${a}-${b}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
          {DISCS.map((d) => (
            <circle
              key={d.id}
              className="discs__node"
              cx={d.x}
              cy={d.y}
              r="0.45"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <ul className="discs__list">
          {DISCS.map((d) => (
            <li
              key={d.id}
              className="disc"
              style={
                {
                  "--x": `${d.x}%`,
                  "--y": `${d.y}%`,
                  "--size": d.size,
                } as React.CSSProperties
              }
            >
              <a
                className="disc__link"
                href={d.href}
                {...(d.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span className="disc__ring">
                  <span className="disc__bloom" aria-hidden="true" />
                  <span className="disc__media duo">
                    <img src={d.img} alt="" loading="lazy" />
                  </span>
                </span>
                <span className="disc__text">
                  <span className="disc__label">{d.label}</span>
                  <span className="data disc__meta">{d.meta}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
