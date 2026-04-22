import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, ArrowRight, Search, Flame } from 'lucide-react';
import { getEvents, getDestinations } from '@/lib/data';
import type { VisitEvent, Destination, EventCategory } from '@/types';
import { SITE_NAME, EVENT_CATEGORIES } from '@/lib/constants';
import { formatDateRange } from '@/lib/utils';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SaveButton from '@/components/shared/SaveButton';

export default function EventsPage() {
  const [events, setEvents] = useState<VisitEvent[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDest, setSelectedDest] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dettyOnly, setDettyOnly] = useState(false);

  useEffect(() => {
    getEvents().then(setEvents);
    getDestinations().then(setDestinations);
  }, []);

  const filtered = events.filter(e => {
    if (selectedCategory !== 'all' && e.category !== selectedCategory) return false;
    if (selectedDest !== 'all' && e.destination_id !== selectedDest) return false;
    if (dettyOnly && !e.is_detty_december) return false;
    if (searchQuery && !e.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Events — {SITE_NAME}</title>
        <meta name="description" content="Discover upcoming festivals, concerts, cultural events, and Detty December happenings across Lagos and Southwest Nigeria." />
      </Helmet>

      <section className="bg-brand-charcoal text-brand-cream py-16 md:py-24">
        <div className="container-brutal">
          <span className="section-label border-brand-gold text-brand-gold">// What's On</span>
          <h1 className="font-heading text-display mt-3 text-brand-cream">
            EV<span className="text-gradient-gold">ENTS</span>
          </h1>
          <p className="text-white/60 max-w-xl mt-4 text-lg">
            Concerts, festivals, cultural gatherings, and Detty December madness — find your next experience.
          </p>
        </div>
      </section>
      <div className="adire-strip" />

      {/* Filters */}
      <section className="py-6 bg-brand-sand border-b-2 border-brand-charcoal/10 sticky top-[calc(8px+4rem)] md:top-[calc(8px+5rem)] z-30">
        <div className="container-brutal">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate" />
              <input type="text" placeholder="Search events..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-brand-charcoal bg-white font-body text-sm focus:outline-none focus:border-brand-gold transition-colors" />
            </div>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border-2 border-brand-charcoal bg-white font-mono text-xs uppercase tracking-wider cursor-pointer focus:outline-none focus:border-brand-gold">
              <option value="all">All Types</option>
              {Object.entries(EVENT_CATEGORIES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
            <select value={selectedDest} onChange={e => setSelectedDest(e.target.value)}
              className="px-4 py-2.5 border-2 border-brand-charcoal bg-white font-mono text-xs uppercase tracking-wider cursor-pointer focus:outline-none focus:border-brand-gold">
              <option value="all">All Locations</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <button onClick={() => setDettyOnly(!dettyOnly)}
              className={`px-4 py-2.5 border-2 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                dettyOnly ? 'bg-brand-coral text-white border-brand-coral' : 'border-brand-charcoal bg-white hover:bg-brand-coral hover:text-white hover:border-brand-coral'
              }`}>
              <Flame className="w-3.5 h-3.5" /> Detty December
            </button>
            <span className="font-mono text-xs text-brand-slate ml-auto">{filtered.length} events</span>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 bg-brand-cream">
        <div className="container-brutal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, index) => (
              <AnimatedSection key={event.id} delay={index * 50}>
                <Link to={`/events/${event.slug}`} className="block group h-full">
                  <div className="brutal-glass overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={event.image_url} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute top-3 left-3 bg-brand-charcoal text-brand-cream px-3 py-2 text-center">
                        <span className="block font-heading text-lg font-bold leading-none">{new Date(event.date_start).getDate()}</span>
                        <span className="block font-mono text-[0.6rem] uppercase tracking-wider">{new Date(event.date_start).toLocaleDateString('en-GB', { month: 'short' })}</span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <SaveButton itemId={event.id} itemType="event" className="bg-white/80 backdrop-blur-sm" />
                      </div>
                      {event.is_detty_december && (
                        <div className="absolute bottom-3 left-3">
                          <span className="badge bg-brand-coral text-white border-brand-coral">🔥 Detty December</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <span className={`badge text-white w-fit mb-2 ${EVENT_CATEGORIES[event.category as EventCategory]?.color || 'bg-brand-slate'}`}>
                        {EVENT_CATEGORIES[event.category as EventCategory]?.label || event.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">{event.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-brand-slate mb-1">
                        <Calendar className="w-3.5 h-3.5" /> {formatDateRange(event.date_start, event.date_end)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-brand-slate mb-3">
                        <MapPin className="w-3.5 h-3.5 shrink-0" /> {event.venue}
                      </div>
                      <p className="text-brand-slate text-sm flex-1 line-clamp-2">{event.description}</p>
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-brand-charcoal/10">
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
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-heading text-2xl text-brand-charcoal mb-2">No events found</p>
              <p className="text-brand-slate">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
