// ============================================
// VisitLagos — Site-wide Constants
// ============================================

export const SITE_NAME = 'VisitLagos';
export const SITE_TAGLINE = 'Gateway to Yoruba Land';
export const SITE_DESCRIPTION = 'Discover, plan, and experience curated cultural journeys across Lagos and Southwest Nigeria. From Detty December to ancient heritage routes — your gateway to authentic Yoruba culture.';
export const SITE_URL = 'https://visitlagos.com';

export const WHATSAPP_NUMBER = '08184495633';

// Exchange rate (NGN to USD) — update periodically
export const NGN_TO_USD_RATE = 1600;

// Detty December 2026 target date
export const DETTY_DECEMBER_DATE = new Date('2026-12-01T00:00:00+01:00');

// Navigation links
export const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Attractions', href: '/attractions' },
  { label: 'Events', href: '/events' },
  { label: 'Itineraries', href: '/itineraries' },
  { label: 'Detty December', href: '/detty-december' },
] as const;

// Category labels and colors
export const ATTRACTION_CATEGORIES = {
  cultural: { label: 'Cultural', color: 'bg-brand-indigo' },
  nature: { label: 'Nature', color: 'bg-green-600' },
  food: { label: 'Food & Drink', color: 'bg-brand-coral' },
  nightlife: { label: 'Nightlife', color: 'bg-purple-600' },
  shopping: { label: 'Shopping', color: 'bg-brand-gold' },
  historical: { label: 'Historical', color: 'bg-amber-700' },
} as const;

export const EVENT_CATEGORIES = {
  festival: { label: 'Festival', color: 'bg-brand-coral' },
  concert: { label: 'Concert', color: 'bg-purple-600' },
  cultural: { label: 'Cultural', color: 'bg-brand-indigo' },
  food: { label: 'Food & Drink', color: 'bg-green-600' },
  art: { label: 'Art & Design', color: 'bg-brand-gold' },
  nightlife: { label: 'Nightlife', color: 'bg-pink-600' },
} as const;

export const ITINERARY_TYPES = {
  heritage: { label: 'Heritage Route', icon: '🏛️', color: 'bg-brand-gold' },
  festival: { label: 'Festival Route', icon: '🎭', color: 'bg-brand-coral' },
  nature: { label: 'Nature Route', icon: '🌿', color: 'bg-green-600' },
} as const;
