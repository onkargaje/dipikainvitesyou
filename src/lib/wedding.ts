// Central place to edit wedding data
export const wedding = {
  bride: "Akshay Rathod",
  groom: "Dipika Aade",
  date: "2026-05-03T18:00:00", // ISO
  dateLabel: "3 May, 2026",
  tagline: "We are getting married",
  venueShort: "Madhura lawns, Harsul, Chhatrapati Sambhajinagar, Maharashtra 431008",
  mapLink: "https://maps.app.goo.gl/TocWJixFgPjHS6dr9",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.7340509433793!2d75.35013937613051!3d19.9356089244232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdbbd6846579adf%3A0xbecf1309695d7547!2sMadhura%20Lawns%20And%20Mangal%20Karyalaya!5e0!3m2!1sen!2sin!4v1776477467231!5m2!1sen!2sin",
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
    venue: "Madhura lawns, Harsul, Chhatrapati Sambhajinagar, Maharashtra 431008",
    dress: "​Traditional",
    theme: "engagement",
  },
  {
    key: "haldi",
    name: "Haldi",
    date: "12 February 2026",
    time: "11:00 AM onwards",
    venue: "Madhura lawns, Harsul, Chhatrapati Sambhajinagar, Maharashtra 431008",
    dress: "Anything in Pink",
    theme: "haldi",
  },
  {
    key: "sangeet",
    name: "Sangeet",
    date: "2 May 2026",
    time: "8:00 PM onwards",
    venue: "Madhura lawns, Harsul, Chhatrapati Sambhajinagar, Maharashtra 431008",
    dress: "Anything Sparkling",
    theme: "sangeet",
  },
  {
    key: "phere",
    name: "Phere",
    date: "14 February 2026",
    time: "6:00 PM onwards",
    venue: "Madhura lawns, Harsul, Chhatrapati Sambhajinagar, Maharashtra 431008",
    dress: "Girls - Kathpadra Saree,\nBoys - Traditional Kurta",
    theme: "phere",
  },
] as const;
