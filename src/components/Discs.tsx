import { DISCS } from "../data";

/** Image-led section and profile index. */
export default function Discs() {
  return (
    <nav className="discs" aria-label="Sections and profiles">
      <ul className="discs__field">
        {DISCS.map((d) => (
          <li key={d.id} className="disc">
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
