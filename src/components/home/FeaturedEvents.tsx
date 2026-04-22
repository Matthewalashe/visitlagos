import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { getEvents } from '@/lib/data';
import { formatDateRange } from '@/lib/utils';
import { EVENT_CATEGORIES } from '@/lib/constants';
import type { VisitEvent, EventCategory } from '@/types';
import SectionHeader from '@/components/shared/SectionHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function FeaturedEvents() {
  const [events, setEvents] = useState<VisitEvent[]>([]);

  useEffect(() => {
    getEvents({ featured: true }).then(data => setEvents(data.slice(0, 6)));
  }, []);

  if (events.length === 0) return null;

  return (
    <section className="py-20 bg-brand-sand">
      <div className="container-brutal">
        <AnimatedSection>
          <SectionHeader
            label="// Upcoming Events"
            title="Don't Miss These"
            description="From Afrobeats concerts to ancient festivals — experience Lagos and Yorubaland's most unforgettable events."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {events.map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 100}>
              <Link to={`/events/${event.slug}`} className="block group">
                <div className="brutal-glass overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    {/* Date badge */}
                    <div className="absolute top-3 left-3 bg-brand-charcoal text-brand-cream px-3 py-2 text-center">
                      <span className="block font-heading text-lg font-bold leading-none">
                        {new Date(event.date_start).getDate()}
                      </span>
                      <span className="block font-mono text-[0.6rem] uppercase tracking-wider">
                        {new Date(event.date_start).toLocaleDateString('en-GB', { month: 'short' })}
                      </span>
                    </div>
                    {/* Category */}
                    <div className="absolute top-3 right-3">
                      <span className={`badge text-white ${EVENT_CATEGORIES[event.category as EventCategory]?.color || 'bg-brand-slate'}`}>
                        {EVENT_CATEGORIES[event.category as EventCategory]?.label || event.category}
                      </span>
                    </div>
                    {event.is_detty_december && (
                      <div className="absolute bottom-3 left-3">
                        <span className="badge bg-brand-coral text-white border-brand-coral">
                          🔥 Detty December
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-brand-slate mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDateRange(event.date_start, event.date_end)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-brand-slate mb-3">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{event.venue}, {event.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-brand-charcoal/10">
                      <span className="font-mono text-sm font-semibold text-brand-gold">{event.price_range}</span>
                      <span className="font-mono text-xs text-brand-indigo flex items-center gap-1 group-hover:gap-2 transition-all">
                        Details <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <Link to="/events" className="btn-brutal btn-brutal-outline">
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
