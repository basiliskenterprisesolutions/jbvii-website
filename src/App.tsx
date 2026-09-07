import { useEffect, useRef, useState } from "react";
import LogoGlitch, { LogoMark } from "./components/LogoGlitch";
import Discs from "./components/Discs";
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

export default function App() {
  const scrolled = useScrolled();
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
          <a href="#played">Credits</a>
          <a href="#sounds">Mixes</a>
          <a href="#events">Events</a>
          <a className="btn bar__cta" href="#booking">Book JBVII</a>
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
              DJ, producer and promoter. Scotland.
            </p>
            <p className="hero__sub">
              House built for the back half of the night — the stretch after the
              room stops being polite, when the only thing holding it together
              is the kick.
            </p>
            <div className="hero__cta">
              <a className="btn" href="#booking">Book JBVII</a>
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

          <div className="ticker" aria-hidden="true">
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
        </section>

        {/* --------------------------- disc nav --------------------------- */}
        <section className="section-pad discs-section">
          <div className="wrap">
            <Discs />
          </div>
        </section>

        {/* ---------------------------- about ---------------------------- */}
        <section id="about" className="section-pad about">
          <div className="wrap about__grid">
            <div className="about__figure">
              <img src="/media/portrait.webp" alt="JBVII playing in front of a projection wall" loading="lazy" />
            </div>
            <div className="about__body">
              <h2 className="h-sect">Who I am</h2>
              <p className="lede">
                Joe Burke. JBVII is the name on the poster.
              </p>
              <p>
                I have been behind the decks since I was barely old enough to get
                into the rooms I now play. House first, but I build sets for the
                part of the night most people never get booked for — the two a.m.
                stretch where the room has gone quiet in the head and loud in the
                legs.
              </p>
              <p>
                I do not just play the parties. I put them on. Project VII is my
                own night: I book the lineup, hang the posters, work the door,
                then open the room myself at half eight.
              </p>
              <p>
                Book me because I read a floor properly. There is no stock set and
                no autopilot — I have watched the room from behind the door and
                from behind the booth, and I play what it actually needs.
              </p>
            </div>
          </div>
        </section>

        {/* --------------------------- credits --------------------------- */}
        <section id="played" className="section-pad played">
          <div className="wrap">
            <div className="played__head">
              <h2 className="h-sect">What I've done</h2>
              <p className="small played__note">Rooms played, most recent first</p>
            </div>
            <ol className="lineup">
              {PLAYED.map((g, i) => (
                <li className="lineup__row" key={i}>
                  <span className="lineup__date">{g.date}</span>
                  <span className="lineup__event">
                    {g.event}
                    {g.note && <span className="lineup__note">{g.note}</span>}
                  </span>
                  <span className="lineup__venue">{g.venue}</span>
                  <span className="lineup__city">{g.city}</span>
                  <span className="lineup__time">{g.time || ""}</span>
                </li>
              ))}
            </ol>

            <div className="posters">
              <figure className="poster">
                <img src="/media/poster-brewfest.webp" alt="Dundee Brewfest artist announcement featuring JBVII" loading="lazy" />
                <figcaption>Dundee Brewfest 2026, Canvas</figcaption>
              </figure>
              <figure className="poster">
                <img src="/media/poster-projectvii.webp" alt="Project VII lineup poster, Prism Dundee" loading="lazy" />
                <figcaption>Project VII at Prism</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---------------------------- sounds ---------------------------- */}
        <section id="sounds" className="section-pad sounds">
          <div className="wrap">
            <h2 className="h-sect">Mixes</h2>
            <p className="lede sounds__lede">
              Play them here. Nothing to download, nothing to sign up for.
            </p>
            <div className="player">
              <iframe
                title="JBVII on SoundCloud"
                width="100%"
                height="450"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                loading="lazy"
                src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fjbvii&color=%23ff2d6f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
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
            <h2 className="h-sect">Dates</h2>

            {UPCOMING.length > 0 ? (
              <ol className="lineup lineup--upcoming">
                {UPCOMING.map((g, i) => (
                  <li className="lineup__row" key={i}>
                    <span className="lineup__date">{g.date}</span>
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
              <div className="empty">
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

            <div className="ahead">
              <h3 className="ahead__h">Where I'm going</h3>
              <p>
                More Project VII dates, in bigger rooms than the last one. A
                festival slot each summer rather than one. And the first JBVII
                original finished and out — produced, not just played.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------- gallery ---------------------------- */}
        <section className="section-pad gallery-section">
          <div className="wrap">
            <h2 className="h-sect">The room</h2>
          </div>
          <div className="gallery">
            {GALLERY.map((g) => (
              <figure className="gallery__item" key={g.src}>
                <img src={g.src} alt={g.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        {/* ----------------------------- merch ----------------------------- */}
        <section id="merch" className="section-pad merch">
          <div className="wrap merch__grid">
            <div>
              <h2 className="h-sect">Merch</h2>
              <p className="lede">
                First run is in production — tees and a long sleeve, the mark on
                the back, small numbers.
              </p>
              <p>
                It goes live here and drops on Instagram the same hour. If you
                want one, that is the place to watch.
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
            <div className="merch__slab" aria-hidden="true">
              <LogoMark className="merch__mark" />
              <span className="merch__stamp">First run</span>
            </div>
          </div>
        </section>

        {/* ---------------------------- booking ---------------------------- */}
        <section id="booking" className="section-pad booking">
          <div className="wrap booking__grid">
            <div className="booking__intro">
              <h2 className="h-sect">Book me</h2>
              <p className="lede">
                Clubs, festivals, birthdays, weddings, brand nights. Tell me the
                room and the hour and I will tell you what I would play.
              </p>
              <p className="small">
                Sending this opens your email app with the details filled in. Or
                write straight to{" "}
                <a className="link" href={`mailto:${LINKS.bookingEmail}`}>
                  {LINKS.bookingEmail}
                </a>
                .
              </p>
            </div>

            <form className="form" onSubmit={onBook} ref={formRef}>
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
            <p className="small foot__tag">DJ, producer and promoter. Scotland.</p>
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
            <p className="small foot__copy">© {new Date().getFullYear()} JBVII</p>
          </div>
        </div>
      </footer>
    </>
  );
}
