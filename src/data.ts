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
  /** centre position + diameter, as a share of the constellation box */
  x: number;
  y: number;
  size: string;
};

export const DISCS: Disc[] = [
  {
    id: "listen",
    label: "Listen",
    meta: "Mixes on SoundCloud",
    href: LINKS.soundcloud,
    external: true,
    img: "/media/c-listen.webp",
    x: 9,
    y: 42,
    size: "clamp(116px, 13vw, 196px)",
  },
  {
    id: "about",
    label: "About",
    meta: "Who I am",
    href: "#about",
    external: false,
    img: "/media/c-about.webp",
    x: 24,
    y: 11,
    size: "clamp(84px, 9.5vw, 142px)",
  },
  {
    id: "events",
    label: "Events",
    meta: "Where I'm playing",
    href: "#events",
    external: false,
    img: "/media/c-events.webp",
    x: 33,
    y: 75,
    size: "clamp(98px, 11vw, 166px)",
  },
  {
    id: "tickets",
    label: "Tickets",
    meta: "Skiddle",
    href: LINKS.tickets,
    external: true,
    img: "/media/c-tickets.webp",
    x: 50,
    y: 28,
    size: "clamp(114px, 12.5vw, 188px)",
  },
  {
    id: "instagram",
    label: "Instagram",
    meta: "@jbviidj",
    href: LINKS.instagram,
    external: true,
    img: "/media/c-instagram.webp",
    x: 64,
    y: 78,
    size: "clamp(84px, 9.5vw, 142px)",
  },
  {
    id: "tiktok",
    label: "TikTok",
    meta: "@jbvii_dj",
    href: LINKS.tiktok,
    external: true,
    img: "/media/c-tiktok.webp",
    x: 76,
    y: 30,
    size: "clamp(92px, 10.5vw, 156px)",
  },
  {
    id: "book",
    label: "Book me",
    meta: "Enquiries",
    href: "#booking",
    external: false,
    img: "/media/c-book.webp",
    x: 89,
    y: 68,
    size: "clamp(106px, 12vw, 180px)",
  },
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
    venue: "Music Hall",
    city: "Dundee",
  },
];

/* TODO(joe): add confirmed dates here and the Events section fills itself in. */
export const UPCOMING: Gig[] = [];

export const GALLERY = [
  { src: "/media/g3.webp", alt: "Lit from above in the crowd, late" },
  { src: "/media/g1.webp", alt: "Behind the CDJs under purple wash" },
  { src: "/media/g2.webp", alt: "Front of house, blue strobe" },
  { src: "/media/g5.webp", alt: "Eat sleep rave repeat, facing the screen" },
  { src: "/media/g9.webp", alt: "Hands on the mixer mid-set" },
  { src: "/media/g6.webp", alt: "In the room before doors" },
  { src: "/media/g4.webp", alt: "Backstage at the venue" },
  { src: "/media/g7.webp", alt: "Festival field, daytime" },
  { src: "/media/g8.webp", alt: "Out front with the crowd" },
];

export const TICKER = [
  "Canvas Dundee",
  "Prism",
  "Music Hall",
  "Dundee Brewfest 2026",
  "Project VII",
];
