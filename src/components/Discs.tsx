import { DISCS } from "../data";

/**
 * The circle nav, borrowed from the Pacha artist grid but scattered rather
 * than gridded — seven lit discs hanging in the haze at different depths.
 * Each one switches on when you reach for it.
 */
export default function Discs() {
  return (
    <nav className="discs" aria-label="Sections and profiles">
      <ul className="discs__field">
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
    </nav>
  );
}
