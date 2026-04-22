// ============================================
// VisitLagos — TypeScript Type Definitions
// Maps 1:1 with Supabase table schemas
// ============================================

export interface Destination {
  id: string;
  name: string;
  slug: string;
  state: string;
  tagline: string;
  description: string;
  long_description: string;
  image_url: string;
  gallery: string[];
  highlights: string[];
  getting_there: string;
  best_time: string;
  created_at: string;
}

export interface Attraction {
  id: string;
  title: string;
  slug: string;
  destination_id: string;
  category: AttractionCategory;
  description: string;
  long_description: string;
  image_url: string;
  gallery: string[];
  location: string;
  price_range: string;
  opening_hours: string;
  affiliate_url?: string;
  tags: string[];
  featured: boolean;
  created_at: string;
}

export type AttractionCategory = 'cultural' | 'nature' | 'food' | 'nightlife' | 'shopping' | 'historical';

export interface VisitEvent {
  id: string;
  title: string;
  slug: string;
  destination_id: string;
  date_start: string;
  date_end: string;
  category: EventCategory;
  description: string;
  long_description: string;
  image_url: string;
  venue: string;
  location: string;
  price_range: string;
  price_from?: number;
  price_currency: string;
  affiliate_url?: string;
  ticket_url?: string;
  is_detty_december: boolean;
  featured: boolean;
  status: 'upcoming' | 'ongoing' | 'past' | 'sold_out';
  created_at: string;
}

export type EventCategory = 'festival' | 'concert' | 'cultural' | 'food' | 'art' | 'nightlife';

export interface Itinerary {
  id: string;
  title: string;
  slug: string;
  type: 'heritage' | 'festival' | 'nature';
  tagline: string;
  description: string;
  duration_days: number;
  image_url: string;
  highlights: string[];
  price_estimate: string;
  days: ItineraryDay[];
  created_at: string;
}

export interface ItineraryDay {
  day_number: number;
  title: string;
  description: string;
  activities: ItineraryActivity[];
}

export interface ItineraryActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'attraction' | 'food' | 'transport' | 'accommodation' | 'free_time';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  image_url?: string;
  trip_type: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  whatsapp?: string;
  travel_dates?: string;
  interests: string[];
  message: string;
  status: 'new' | 'replied' | 'closed';
  created_at: string;
}
