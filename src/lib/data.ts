// ============================================
// VisitLagos — Data Fetching Layer
// Uses local JSON with Supabase fallback
// Swap to Supabase by updating these functions
// ============================================

import { supabase } from './supabase';
import type { Destination, Attraction, VisitEvent, Itinerary, Testimonial } from '@/types';

import destinationsData from '@/data/destinations.json';
import attractionsData from '@/data/attractions.json';
import eventsData from '@/data/events.json';
import itinerariesData from '@/data/itineraries.json';
import testimonialsData from '@/data/testimonials.json';

// ---- Destinations ----
export async function getDestinations(): Promise<Destination[]> {
  if (supabase) {
    const { data } = await supabase.from('destinations').select('*').order('name');
    if (data) return data as Destination[];
  }
  return destinationsData as Destination[];
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  if (supabase) {
    const { data } = await supabase.from('destinations').select('*').eq('slug', slug).single();
    if (data) return data as Destination;
  }
  return (destinationsData as Destination[]).find(d => d.slug === slug) || null;
}

// ---- Attractions ----
export async function getAttractions(filters?: {
  destination_id?: string;
  category?: string;
  featured?: boolean;
}): Promise<Attraction[]> {
  if (supabase) {
    let query = supabase.from('attractions').select('*').order('featured', { ascending: false });
    if (filters?.destination_id) query = query.eq('destination_id', filters.destination_id);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.featured) query = query.eq('featured', true);
    const { data } = await query;
    if (data) return data as Attraction[];
  }
  let results = attractionsData as Attraction[];
  if (filters?.destination_id) results = results.filter(a => a.destination_id === filters.destination_id);
  if (filters?.category) results = results.filter(a => a.category === filters.category);
  if (filters?.featured) results = results.filter(a => a.featured);
  return results;
}

export async function getAttractionBySlug(slug: string): Promise<Attraction | null> {
  if (supabase) {
    const { data } = await supabase.from('attractions').select('*').eq('slug', slug).single();
    if (data) return data as Attraction;
  }
  return (attractionsData as Attraction[]).find(a => a.slug === slug) || null;
}

// ---- Events ----
export async function getEvents(filters?: {
  destination_id?: string;
  category?: string;
  is_detty_december?: boolean;
  featured?: boolean;
}): Promise<VisitEvent[]> {
  if (supabase) {
    let query = supabase.from('events').select('*').order('date_start');
    if (filters?.destination_id) query = query.eq('destination_id', filters.destination_id);
    if (filters?.category) query = query.eq('category', filters.category);
    if (filters?.is_detty_december) query = query.eq('is_detty_december', true);
    if (filters?.featured) query = query.eq('featured', true);
    const { data } = await query;
    if (data) return data as VisitEvent[];
  }
  let results = eventsData as VisitEvent[];
  if (filters?.destination_id) results = results.filter(e => e.destination_id === filters.destination_id);
  if (filters?.category) results = results.filter(e => e.category === filters.category);
  if (filters?.is_detty_december) results = results.filter(e => e.is_detty_december);
  if (filters?.featured) results = results.filter(e => e.featured);
  return results;
}

export async function getEventBySlug(slug: string): Promise<VisitEvent | null> {
  if (supabase) {
    const { data } = await supabase.from('events').select('*').eq('slug', slug).single();
    if (data) return data as VisitEvent;
  }
  return (eventsData as VisitEvent[]).find(e => e.slug === slug) || null;
}

// ---- Itineraries ----
export async function getItineraries(): Promise<Itinerary[]> {
  if (supabase) {
    const { data } = await supabase.from('itineraries').select('*').order('duration_days');
    if (data) return data as Itinerary[];
  }
  return itinerariesData as Itinerary[];
}

export async function getItineraryBySlug(slug: string): Promise<Itinerary | null> {
  if (supabase) {
    const { data } = await supabase.from('itineraries').select('*').eq('slug', slug).single();
    if (data) return data as Itinerary;
  }
  return (itinerariesData as Itinerary[]).find(i => i.slug === slug) || null;
}

// ---- Testimonials ----
export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialsData as Testimonial[];
}

// ---- Newsletter ----
export async function subscribeNewsletter(email: string, source: string = 'website'): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    const { error } = await supabase.from('newsletter_subscribers').insert({ email, source });
    if (error) {
      if (error.code === '23505') return { success: false, error: 'You\'re already subscribed!' };
      return { success: false, error: 'Something went wrong. Please try again.' };
    }
    return { success: true };
  }
  // Local fallback — just succeed
  console.log('Newsletter signup (local):', email, source);
  return { success: true };
}

// ---- Enquiries ----
export async function submitEnquiry(enquiry: {
  name: string;
  email: string;
  whatsapp?: string;
  travel_dates?: string;
  interests: string[];
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (supabase) {
    const { error } = await supabase.from('enquiries').insert(enquiry);
    if (error) return { success: false, error: 'Something went wrong. Please try again.' };
    return { success: true };
  }
  console.log('Enquiry (local):', enquiry);
  return { success: true };
}
