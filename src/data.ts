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
};

export const DISCS: Disc[] = [
  {
    id: "listen",
    label: "Listen",
    meta: "SoundCloud",
    href: LINKS.soundcloud,
    external: true,
    img: "/media/c-listen.webp",
  },
  {
    id: "about",
    label: "About",
    meta: "Bio",
    href: "#about",
    external: false,
    img: "/media/c-about.webp",
  },
  {
    id: "events",
    label: "Events",
    meta: "Upcoming",
    href: "#events",
    external: false,
    img: "/media/c-events.webp",
  },
  {
    id: "tickets",
    label: "Tickets",
    meta: "Skiddle",
    href: LINKS.tickets,
    external: true,
    img: "/media/c-tickets.webp",
  },
  {
    id: "instagram",
    label: "Instagram",
    meta: "@jbviidj",
    href: LINKS.instagram,
    external: true,
    img: "/media/c-instagram.webp",
  },
  {
    id: "tiktok",
    label: "TikTok",
    meta: "@jbvii_dj",
    href: LINKS.tiktok,
    external: true,
    img: "/media/c-tiktok.webp",
  },
  {
    id: "book",
    label: "Book me",
    meta: "Enquiries",
    href: "#booking",
    external: false,
    img: "/media/c-book.webp",
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
    venue: "Main room",
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
