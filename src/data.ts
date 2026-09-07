/* ------------------------------------------------------------------
   Single source of truth for everything Joe might want to change.
   Edit here, run `npm run build`, redeploy. Nothing else to touch.
------------------------------------------------------------------ */

export const LINKS = {
  soundcloud: "https://soundcloud.com/jbvii",
  instagram: "https://www.instagram.com/jbviidj",
  tiktok: "https://www.tiktok.com/@jbvii_dj",
  // TODO(joe): replace with the real Skiddle / Resident Advisor artist page
  tickets: "https://www.skiddle.com/",
  // TODO(joe): replace with the real bookings inbox
  bookingEmail: "bookings@jbvii.uk",
};

export type Disc = {
  id: string;
  label: string;
  meta: string;
  href: string;
  external: boolean;
  img: string;
  /** centre + diameter of the disc, as a share of the constellation box */
  x: number;
  y: number;
  size: string;
};

export const DISCS: Disc[] = [
  {
    id: "listen",
    label: "Listen",
    meta: "SoundCloud",
    href: LINKS.soundcloud,
    external: true,
    img: "/media/c-listen.webp",
    x: 10,
    y: 40,
    size: "clamp(112px, 12.5vw, 188px)",
  },
  {
    id: "about",
    label: "About",
    meta: "Bio",
    href: "#about",
    external: false,
    img: "/media/c-about.webp",
    x: 25,
    y: 12,
    size: "clamp(80px, 9vw, 134px)",
  },
  {
    id: "events",
    label: "Events",
    meta: "Upcoming",
    href: "#events",
    external: false,
    img: "/media/c-events.webp",
    x: 34,
    y: 74,
    size: "clamp(94px, 10.5vw, 158px)",
  },
  {
    id: "tickets",
    label: "Tickets",
    meta: "Skiddle",
    href: LINKS.tickets,
    external: true,
    img: "/media/c-tickets.webp",
    x: 50,
    y: 30,
    size: "clamp(110px, 12vw, 180px)",
  },
  {
    id: "instagram",
    label: "Instagram",
    meta: "@jbviidj",
    href: LINKS.instagram,
    external: true,
    img: "/media/c-instagram.webp",
    x: 63,
    y: 76,
    size: "clamp(80px, 9vw, 134px)",
  },
  {
    id: "tiktok",
    label: "TikTok",
    meta: "@jbvii_dj",
    href: LINKS.tiktok,
    external: true,
    img: "/media/c-tiktok.webp",
    x: 76,
    y: 26,
    size: "clamp(90px, 10vw, 150px)",
  },
  {
    id: "book",
    label: "Book me",
    meta: "Enquiries",
    href: "#booking",
    external: false,
    img: "/media/c-book.webp",
    x: 89,
    y: 62,
    size: "clamp(104px, 11.5vw, 172px)",
  },
];

/**
 * Which discs are wired to which. The web is decorative — it makes the
 * scatter read as one constellation instead of seven loose circles — so
 * edges are chosen to spread across the field without crossing.
 */
export const DISC_EDGES: [string, string][] = [
  ["listen", "about"],
  ["listen", "events"],
  ["about", "tickets"],
  ["events", "tickets"],
  ["tickets", "tiktok"],
  ["events", "instagram"],
  ["instagram", "book"],
  ["tiktok", "book"],
];

export type Gig = {
  date: string;
  time?: string;
  event: string;
  venue: string;
  city: string;
  note?: string;
};

/* Confirmed from Joe's own artwork. Add to this list as dates land. */
export const PLAYED: Gig[] = [
  {
    date: "01 Aug 2026",
    time: "Day session",
    event: "Dundee Brewfest",
    venue: "Canvas",
    city: "Dundee",
    note: "Five years of beer, music and community",
  },
  {
    date: "11 Apr 2026",
    time: "20:30",
    event: "Project VII",
    venue: "Prism",
    city: "Dundee",
    note: "Own night — booked the room and opened it",
  },
  {
    date: "2026",
    event: "Music Hall",
    venue: "Main room",
    city: "Dundee",
  },
];

/* TODO(joe): add confirmed dates here and the Events section fills itself in. */
export const UPCOMING: Gig[] = [];

/**
 * `pos` is the CSS object-position for the crop. These photos are portrait and
 * the gallery cells are short, so the default 50% centre lands on torsos and
 * cuts faces off. Read a new value off the source image rather than guessing.
 */
export const GALLERY: { src: string; alt: string; pos?: string }[] = [
  { src: "/media/g3.webp", alt: "Lit from above in the crowd, late" },
  { src: "/media/g1.webp", alt: "Behind the CDJs under purple wash", pos: "50% 18%" },
  { src: "/media/g2.webp", alt: "Front of house, blue strobe" },
  { src: "/media/g5.webp", alt: "Eat sleep rave repeat, facing the screen" },
  { src: "/media/g9.webp", alt: "Hands on the mixer mid-set" },
  { src: "/media/g6.webp", alt: "In the room before doors", pos: "50% 26%" },
  { src: "/media/g4.webp", alt: "Backstage at the venue", pos: "50% 30%" },
  { src: "/media/g7.webp", alt: "Festival field, daytime", pos: "50% 28%" },
  { src: "/media/g8.webp", alt: "Out front with the crowd" },
];

export const TICKER = [
  "Canvas Dundee",
  "Prism",
  "Music Hall",
  "Dundee Brewfest 2026",
  "Project VII",
];
