import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getDestinations, getAttractions, getEvents, getItineraries } from '@/lib/data';
import type { Destination, Attraction, VisitEvent, Itinerary } from '@/types';
import { SITE_NAME, ATTRACTION_CATEGORIES, EVENT_CATEGORIES } from '@/lib/constants';
import { formatDateRange } from '@/lib/utils';
import type { AttractionCategory, EventCategory } from '@/types';

type Tab = 'destinations' | 'attractions' | 'events' | 'itineraries';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('destinations');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [events, setEvents] = useState<VisitEvent[]>([]);
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    getDestinations().then(setDestinations);
    getAttractions().then(setAttractions);
    getEvents().then(setEvents);
    getItineraries().then(setItineraries);
  }, []);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'destinations', label: 'Destinations', count: destinations.length },
    { key: 'attractions', label: 'Attractions', count: attractions.length },
    { key: 'events', label: 'Events', count: events.length },
    { key: 'itineraries', label: 'Itineraries', count: itineraries.length },
  ];

  return (
    <>
      <Helmet>
        <title>Admin — {SITE_NAME}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="bg-brand-charcoal text-brand-cream py-12">
        <div className="container-brutal">
          <span className="section-label border-brand-gold text-brand-gold">// Admin Panel</span>
          <h1 className="font-heading text-3xl mt-3">Content Management</h1>
          <p className="text-white/60 mt-2 text-sm">
            Preview and manage all platform content. Connect Supabase for full CRUD operations.
          </p>
        </div>
      </section>
      <div className="adire-strip" />

      {/* Tabs */}
      <div className="bg-brand-sand border-b-2 border-brand-charcoal/10 sticky top-[calc(8px+4rem)] md:top-[calc(8px+5rem)] z-30">
        <div className="container-brutal flex gap-1 py-2 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-brand-charcoal text-brand-cream'
                  : 'text-brand-slate hover:text-brand-gold'
              }`}>
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <section className="py-8 bg-brand-cream min-h-screen">
        <div className="container-brutal">
          {/* Destinations */}
          {activeTab === 'destinations' && (
            <div className="space-y-4">
              {destinations.map(d => (
                <div key={d.id} className="brutal-glass-static p-4 flex gap-4 items-center">
                  <img src={d.image_url} alt={d.name} className="w-20 h-20 object-cover border-2 border-brand-charcoal shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold">{d.name}</h3>
                    <p className="text-brand-slate text-sm">{d.state} — {d.tagline}</p>
                    <p className="font-mono text-xs text-brand-slate mt-1">Slug: /{d.slug}</p>
                  </div>
                  <span className="badge text-brand-gold border-brand-gold shrink-0">{d.id}</span>
                </div>
              ))}
            </div>
          )}

          {/* Attractions */}
          {activeTab === 'attractions' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-3 border-brand-charcoal">
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Title</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Category</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Location</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Price</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Featured</th>
                  </tr>
                </thead>
                <tbody>
                  {attractions.map(a => (
                    <tr key={a.id} className="border-b border-brand-charcoal/10 hover:bg-brand-sand transition-colors">
                      <td className="py-3 font-semibold">{a.title}</td>
                      <td className="py-3">
                        <span className={`badge text-white ${ATTRACTION_CATEGORIES[a.category as AttractionCategory]?.color || 'bg-brand-slate'}`}>
                          {ATTRACTION_CATEGORIES[a.category as AttractionCategory]?.label || a.category}
                        </span>
                      </td>
                      <td className="py-3 text-brand-slate">{a.location}</td>
                      <td className="py-3 font-mono text-xs">{a.price_range}</td>
                      <td className="py-3">{a.featured ? '⭐' : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Events */}
          {activeTab === 'events' && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-3 border-brand-charcoal">
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Event</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Date</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Category</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Venue</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Detty Dec</th>
                    <th className="text-left py-3 font-mono text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(e => (
                    <tr key={e.id} className="border-b border-brand-charcoal/10 hover:bg-brand-sand transition-colors">
                      <td className="py-3 font-semibold">{e.title}</td>
                      <td className="py-3 font-mono text-xs">{formatDateRange(e.date_start, e.date_end)}</td>
                      <td className="py-3">
                        <span className={`badge text-white ${EVENT_CATEGORIES[e.category as EventCategory]?.color || 'bg-brand-slate'}`}>
                          {EVENT_CATEGORIES[e.category as EventCategory]?.label || e.category}
                        </span>
                      </td>
                      <td className="py-3 text-brand-slate">{e.venue}</td>
                      <td className="py-3">{e.is_detty_december ? '🔥' : '—'}</td>
                      <td className="py-3">
                        <span className="badge text-brand-gold border-brand-gold">{e.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Itineraries */}
          {activeTab === 'itineraries' && (
            <div className="space-y-4">
              {itineraries.map(i => (
                <div key={i.id} className="brutal-glass-static p-4">
                  <div className="flex items-center gap-4">
                    <img src={i.image_url} alt={i.title} className="w-20 h-20 object-cover border-2 border-brand-charcoal shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-heading font-bold">{i.title}</h3>
                      <p className="text-brand-slate text-sm">{i.type} • {i.duration_days} days • {i.price_estimate}</p>
                      <p className="font-mono text-xs text-brand-slate mt-1">{i.days.length} days planned, {i.days.reduce((acc, d) => acc + d.activities.length, 0)} activities total</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
