import { useEffect, useRef, useState } from "react";
import LogoGlitch, { LogoMark } from "./components/LogoGlitch";
import Discs from "./components/Discs";
import SectionHead from "./components/SectionHead";
import { GALLERY, LINKS, PLAYED, TICKER, UPCOMING } from "./data";

/* grain, generated once, used by the fixed atmosphere layer */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

function useScrolled(threshold = 40) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return past;
}

/**
 * Reveals anything marked [data-reveal] once it enters the viewport, then
 * stops watching it. Gated on the `anim` class the head script sets, so with
 * JS off or reduced motion on, nothing is ever hidden in the first place.
 */
function useReveal() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("anim")) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      // threshold MUST stay 0. IntersectionObserver measures the target after
      // its own clip-path is applied, so a reveal that starts clipped shrinks
      // the very geometry being observed: the band starts at inset(46% 0) and
      // tops out at a 0.076 ratio, which never crosses a 0.12 threshold and
      // so can never reveal itself.
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const scrolled = useScrolled();
  useReveal();
  const formRef = useRef<HTMLFormElement>(null);

  const onBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Booking enquiry — ${f.get("event") || "event"} — ${f.get("date") || "date TBC"}`;
    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Event: ${f.get("event")}`,
      `Venue / city: ${f.get("venue")}`,
      `Date: ${f.get("date")}`,
      `Set length: ${f.get("length")}`,
      "",
      String(f.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${LINKS.bookingEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <div className="atmos" style={{ "--grain": GRAIN } as React.CSSProperties} />

      <a className="skip" href="#main">Skip to content</a>

      <header className={`bar ${scrolled ? "bar--stuck" : ""}`}>
        <a className="bar__mark" href="#top" aria-label="JBVII — top of page">
          <LogoMark className="bar__logo" />
        </a>
        <nav className="bar__nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#played">Shows</a>
          <a href="#sounds">Listen</a>
          <a href="#events">Dates</a>
          <a className="btn bar__cta" href="#booking">Enquire</a>
        </nav>
      </header>

      <main id="main" className="page">
        {/* ------------------------------ hero ------------------------------ */}
        <section id="top" className="hero">
          <div className="hero__bg" aria-hidden="true">
            <img src="/media/hero.webp" alt="" fetchPriority="high" />
          </div>

          <div className="hero__inner wrap">
            <h1 className="hero__h1">
              <span className="sr-only">
                JBVII — Joe Burke, DJ, producer and promoter
              </span>
              <LogoGlitch className="hero__logo" />
            </h1>
            <p className="hero__line">
              DJ, producer and promoter.
            </p>
            <p className="hero__sub">
              Late-night house, disco edits and harder cuts. Built live for the
              room.
            </p>
            <div className="hero__cta">
              <a className="btn" href="#booking">Booking enquiry</a>
              <a
                className="btn btn--ghost"
                href={LINKS.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hear a mix
              </a>
            </div>
          </div>

        </section>


        {/* The marquee opens the second screen rather than closing the first,
            so the hero is all you see until you scroll. */}
        <div className="ticker" aria-hidden="true" data-reveal="band">
          <div className="ticker__run">
            {[0, 1].map((dup) => (
              <span className="ticker__set" key={dup}>
                {TICKER.map((t) => (
                  <span className="ticker__item" key={t}>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* --------------------------- disc nav --------------------------- */}
        <section className="section-pad discs-section">
          <div className="wrap">
            <Discs />
          </div>
        </section>

        {/* --------------------------- statement --------------------------- */}
        <section className="statement">
          <div className="wrap">
            <p className="statement__line">It doesn't count until 2am.</p>
            <div className="statement__foot">
              <span className="data">Peak time and after</span>
              <span className="data">House to hard house</span>
            </div>
          </div>
        </section>

        {/* ---------------------------- about ---------------------------- */}
        <section id="about" className="section-pad about">
          <div className="wrap about__grid">
            <figure className="about__figure duo" data-reveal="media">
              <img src="/media/portrait.webp" alt="JBVII playing in front of a projection wall" loading="lazy" />
            </figure>
            <div className="about__body" data-reveal="up">
              <SectionHead title="Who I am" meta="Bio" />
              <p className="lede">
                Joe Burke. JBVII is the name on the poster.
              </p>
              <p>
                I am a Dundee-based DJ and the promoter behind Project VII. I
                started young and learned by playing the full night, not only the
                easy hour.
              </p>
              <p>
                My sets move from house and disco into harder territory when the
                room is ready. They are shaped in real time rather than fixed in
                advance.
              </p>
              <p>
                For Project VII, I handle the lineups, promotion and the room
                itself. That wider view of a night carries into every set I play.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------- credits --------------------------- */}
        <section id="played" className="section-pad played">
          <div className="wrap">
            <SectionHead title="What I've done" meta="Selected shows" />
            <ol className="lineup">
              {PLAYED.map((g, i) => (
                <li className="lineup__row" key={i} data-reveal="up" style={{ "--d": i } as React.CSSProperties}>
                  <span className="data data--val lineup__date">{g.date}</span>
                  <span className="lineup__event">
                    {g.event}
                    {g.note && <span className="lineup__note">{g.note}</span>}
                  </span>
                  <span className="lineup__venue">{g.venue}</span>
                  <span className="lineup__city">{g.city}</span>
                  <span className="data data--val lineup__time">{g.time || ""}</span>
                </li>
              ))}
            </ol>

            <div className="posters" data-reveal="media">
              <figure className="poster">
                <img src="/media/poster-brewfest.webp" alt="Dundee Brewfest artist announcement featuring JBVII" loading="lazy" />
                <figcaption className="data">Dundee Brewfest 2026, Canvas</figcaption>
              </figure>
              <figure className="poster">
                <img src="/media/poster-projectvii.webp" alt="Project VII lineup poster, Prism Dundee" loading="lazy" />
                <figcaption className="data">Project VII at Prism</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------------------------- sounds ---------------------------- */}
        <section id="sounds" className="section-pad sounds">
          <div className="wrap">
            <SectionHead title="Mixes" meta="Listen" />
            <p className="lede sounds__lede">
              Recent mixes, recorded live and in the studio.
            </p>
            <div className="player" data-reveal="up">
              <iframe
                title="JBVII on SoundCloud"
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                loading="lazy"
                src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjbvii&color=%235e75ff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              />
            </div>
            <a
              className="btn btn--ghost sounds__more"
              href={LINKS.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on SoundCloud
            </a>
          </div>
        </section>

        {/* ---------------------------- events ---------------------------- */}
        <section id="events" className="section-pad events">
          <div className="wrap">
            <SectionHead title="Dates" meta="Tickets" />

            {UPCOMING.length > 0 ? (
              <ol className="lineup lineup--upcoming">
                {UPCOMING.map((g, i) => (
                  <li className="lineup__row" key={i} data-reveal="up" style={{ "--d": i } as React.CSSProperties}>
                    <span className="data data--val lineup__date">{g.date}</span>
                    <span className="lineup__event">{g.event}</span>
                    <span className="lineup__venue">{g.venue}</span>
                    <span className="lineup__city">{g.city}</span>
                    <a
                      className="btn lineup__ticket"
                      href={LINKS.tickets}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Tickets
                    </a>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="empty" data-reveal="up">
                <p className="lede">
                  Nothing on sale this second. The next Project VII date is being
                  put together now, and tickets go up on Skiddle the day it is
                  confirmed.
                </p>
                <div className="empty__cta">
                  <a
                    className="btn"
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get it first on Instagram
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={LINKS.tickets}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Skiddle page
                  </a>
                </div>
              </div>
            )}

            <div className="ahead" data-reveal="up">
              <h3 className="display h-sub">Where I'm going</h3>
              <p>
                More Project VII dates, bigger rooms, and one clear goal: the
                first JBVII original finished and released.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------- gallery ---------------------------- */}
        <section className="section-pad gallery-section">
          <div className="wrap">
            <SectionHead title="The room" meta="Gallery" />
          </div>
          <div className="gallery">
            {GALLERY.map((g, i) => (
              <figure
                className="gallery__item duo"
                key={g.src}
                data-reveal="media"
                style={{ "--d": i } as React.CSSProperties}
              >
                <img src={g.src} alt={g.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        {/* ----------------------------- merch ----------------------------- */}
        <section id="merch" className="section-pad merch">
          <div className="wrap">
            <SectionHead title="Merch" meta="Store" />
          </div>
          <div className="wrap merch__grid">
            <div data-reveal="up">
              <p className="lede">
                The first small run is in production: tees and a long sleeve,
                carrying the JBVII mark.
              </p>
              <p>
                Release details will be posted here and on Instagram.
              </p>
              <a
                className="btn"
                href={LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow for the drop
              </a>
            </div>
            <div className="merch__slab" aria-hidden="true" data-reveal="media">
              <LogoMark className="merch__mark" />
              <span className="merch__stamp">First run</span>
            </div>
          </div>
        </section>

        {/* ---------------------------- booking ---------------------------- */}
        <section id="booking" className="section-pad booking">
          <div className="wrap">
            <SectionHead title="Book me" meta="Contact" />
          </div>
          <div className="wrap booking__grid">
            <div className="booking__intro" data-reveal="up">
              <p className="lede">
                For club, festival and private bookings, send the date, venue and
                kind of room. You will get a direct reply.
              </p>
              <p className="data data--prose booking__note">
                Sending this opens your email app with the details filled in. Or
                write straight to{" "}
                <a className="link" href={`mailto:${LINKS.bookingEmail}`}>
                  {LINKS.bookingEmail}
                </a>
                .
              </p>
            </div>

            <form className="form" onSubmit={onBook} ref={formRef} data-reveal="up">
              <div className="field">
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="event">What's the event</label>
                <input id="event" name="event" placeholder="Club night, festival, wedding…" required />
              </div>
              <div className="field">
                <label htmlFor="venue">Venue and city</label>
                <input id="venue" name="venue" />
              </div>
              <div className="field field--half">
                <label htmlFor="date">Date</label>
                <input id="date" name="date" type="date" />
              </div>
              <div className="field field--half">
                <label htmlFor="length">Set length</label>
                <input id="length" name="length" placeholder="90 minutes" />
              </div>
              <div className="field">
                <label htmlFor="message">Anything else</label>
                <textarea id="message" name="message" rows={4} placeholder="Capacity, curfew, what the room is like…" />
              </div>
              <button className="btn form__submit" type="submit">Send enquiry</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot__grid">
          <div className="foot__brand">
            <LogoMark className="foot__logo" />
            <p className="data data--prose foot__tag">DJ, producer and promoter. Scotland.</p>
          </div>

          <nav className="foot__links" aria-label="Elsewhere">
            <a href={LINKS.soundcloud} target="_blank" rel="noopener noreferrer">SoundCloud</a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={LINKS.tickets} target="_blank" rel="noopener noreferrer">Skiddle</a>
            <a href={`mailto:${LINKS.bookingEmail}`}>Bookings</a>
          </nav>

          <div className="foot__credit">
            <basilisk-badge theme="dark">
              <a href="https://basilisk.software/?ref=jbvii.uk">
                built by <b>basilisk.software</b>
              </a>
            </basilisk-badge>
            <p className="data foot__copy">© {new Date().getFullYear()} JBVII</p>
          </div>
        </div>
      </footer>
    </>
  );
}
