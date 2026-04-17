// Central place to edit wedding data
export const wedding = {
  bride: "Akshay Rathod",
  groom: "Dipika Aade",
  date: "2026-05-03T18:00:00", // ISO
  dateLabel: "3 May, 2026",
  tagline: "We are getting married",
  venueShort: "Madhura lawns, Harsool",
  mapLink: "https://maps.app.goo.gl/TocWJixFgPjHS6dr9",
  mapEmbed:
    "https://www.google.com/maps?q=The+Leela+Palace+Udaipur&output=embed",
  upi: "aarav.anaya@okhdfc",
  bank: {
    name: "Aarav Mehta",
    account: "•••• •••• 4421",
    ifsc: "HDFC0001234",
  },
};

export const events = [
  {
    key: "engagement",
    name: "Engagement",
    date: "2 May 2026",
    time: "11:00 AM onwards",
    venue: "​Madhura Lawns, Harsool",
    dress: "​",
    theme: "engagement",
  },
  {
    key: "haldi",
    name: "Haldi",
    date: "12 February 2026",
    time: "11:00 AM onwards",
    venue: "Garden Lawns, The Leela Palace",
    dress: "Sunshine Yellow",
    theme: "haldi",
  },
  {
    key: "sangeet",
    name: "Sangeet",
    date: "2 May 2026",
    time: "8:00 PM onwards",
    venue: "​Madhura Lawns",
    dress: "Anything Sparkling",
    theme: "sangeet",
  },
  {
    key: "phere",
    name: "Phere",
    date: "14 February 2026",
    time: "6:00 PM onwards",
    venue: "Lakeside Mandap, The Leela Palace",
    dress: "Royal Traditional",
    theme: "phere",
  },
] as const;
