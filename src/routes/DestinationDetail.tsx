import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, Plane, ArrowRight } from 'lucide-react';
import { getDestinationBySlug, getAttractions, getEvents } from '@/lib/data';
import type { Destination, Attraction, VisitEvent } from '@/types';
import { SITE_NAME, ATTRACTION_CATEGORIES } from '@/lib/constants';
import { formatDateRange } from '@/lib/utils';
import AnimatedSection from '@/components/shared/AnimatedSection';
import ShareButtons from '@/components/shared/ShareButtons';
import type { AttractionCategory } from '@/types';

export default function DestinationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [events, setEvents] = useState<VisitEvent[]>([]);

  useEffect(() => {
    if (!slug) return;
    getDestinationBySlug(slug).then(setDestination);
  }, [slug]);

  useEffect(() => {
    if (!destination) return;
    getAttractions({ destination_id: destination.id }).then(setAttractions);
    getEvents({ destination_id: destination.id }).then(setEvents);
  }, [destination]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-mono text-brand-slate">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{destination.name} — {SITE_NAME}</title>
        <meta name="description" content={destination.description} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img src={destination.image_url} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-12 pt-8">
          <div className="container-brutal">
            <span className="badge bg-brand-gold text-white border-brand-gold mb-3">{destination.state}</span>
            <h1 className="font-heading text-display text-white">{destination.name}</h1>
            <p className="font-mono text-sm uppercase tracking-wider text-brand-gold mt-2">{destination.tagline}</p>
          </div>
        </div>
      </section>
      <div className="adire-strip" />

      {/* Content */}
      <section className="py-16 bg-brand-cream">
        <div className="container-brutal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <ShareButtons url={`/destinations/${slug}`} title={`${destination.name} — ${SITE_NAME}`} />
                <div className="mt-8 prose-lg text-brand-charcoal leading-relaxed">
                  {destination.long_description.split('\n\n').map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                  ))}
                </div>
              </AnimatedSection>

              {/* Highlights */}
              <AnimatedSection className="mt-12">
                <h2 className="font-heading text-2xl font-bold mb-6">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.highlights.map((h, i) => (
                    <div key={i} className="brutal-glass-static p-4 flex items-start gap-3">
                      <span className="text-brand-gold font-heading font-bold text-lg">→</span>
                      <span className="text-sm">{h}</span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Attractions in this destination */}
              {attractions.length > 0 && (
                <AnimatedSection className="mt-16">
                  <h2 className="font-heading text-2xl font-bold mb-6">Things to Do in {destination.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {attractions.map(attr => (
                      <Link key={attr.id} to={`/attractions/${attr.slug}`} className="block group">
                        <div className="brutal-glass overflow-hidden">
                          <div className="h-40 overflow-hidden">
                            <img src={attr.image_url} alt={attr.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                          </div>
                          <div className="p-4">
                            <span className={`badge text-white mb-2 ${ATTRACTION_CATEGORIES[attr.category as AttractionCategory]?.color || 'bg-brand-slate'}`}>
                              {ATTRACTION_CATEGORIES[attr.category as AttractionCategory]?.label || attr.category}
                            </span>
                            <h3 className="font-heading font-bold group-hover:text-brand-gold transition-colors">{attr.title}</h3>
                            <p className="text-brand-slate text-sm mt-1 line-clamp-2">{attr.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Events in this destination */}
              {events.length > 0 && (
                <AnimatedSection className="mt-16">
                  <h2 className="font-heading text-2xl font-bold mb-6">Events in {destination.name}</h2>
                  <div className="space-y-4">
                    {events.map(event => (
                      <Link key={event.id} to={`/events/${event.slug}`} className="block group">
                        <div className="brutal-glass p-4 flex gap-4 items-center">
                          <div className="shrink-0 w-16 h-16 bg-brand-charcoal text-brand-cream flex flex-col items-center justify-center">
                            <span className="font-heading text-lg font-bold leading-none">{new Date(event.date_start).getDate()}</span>
                            <span className="font-mono text-[0.55rem] uppercase">{new Date(event.date_start).toLocaleDateString('en-GB', { month: 'short' })}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading font-bold truncate group-hover:text-brand-gold transition-colors">{event.title}</h3>
                            <p className="text-brand-slate text-sm">{event.venue}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-brand-slate shrink-0 group-hover:text-brand-gold transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="brutal-glass-static p-6 sticky top-28">
                <h3 className="font-heading text-lg font-bold mb-4 pb-4 border-b-2 border-brand-charcoal">Plan Your Visit</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Plane className="w-5 h-5 text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Getting There</p>
                      <p className="text-sm">{destination.getting_there}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Best Time to Visit</p>
                      <p className="text-sm">{destination.best_time}</p>
                    </div>
                  </div>
                  <hr className="brutal-divider" />
                  <Link to="/itineraries" className="btn-brutal btn-brutal-gold w-full text-center">
                    View Itineraries
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
