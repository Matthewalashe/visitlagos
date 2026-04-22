import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, MapPin, ArrowLeft, DollarSign } from 'lucide-react';
import { getItineraryBySlug } from '@/lib/data';
import type { Itinerary, ItineraryActivity } from '@/types';
import { SITE_NAME, ITINERARY_TYPES } from '@/lib/constants';
import AnimatedSection from '@/components/shared/AnimatedSection';
import ShareButtons from '@/components/shared/ShareButtons';
import SaveButton from '@/components/shared/SaveButton';

const ACTIVITY_ICONS: Record<string, string> = {
  attraction: '🏛️',
  food: '🍽️',
  transport: '🚗',
  accommodation: '🏨',
  free_time: '⏳',
  shopping: '🛍️',
};

export default function ItineraryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    if (slug) getItineraryBySlug(slug).then(setItinerary);
  }, [slug]);

  if (!itinerary) {
    return <div className="min-h-screen flex items-center justify-center"><div className="font-mono text-brand-slate">Loading...</div></div>;
  }

  const typeConfig = ITINERARY_TYPES[itinerary.type];
  const currentDay = itinerary.days.find(d => d.day_number === activeDay);

  return (
    <>
      <Helmet>
        <title>{itinerary.title} — {SITE_NAME}</title>
        <meta name="description" content={itinerary.description} />
      </Helmet>

      <section className="relative h-[40vh] md:h-[50vh]">
        <img src={itinerary.image_url} alt={itinerary.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container-brutal">
            <Link to="/itineraries" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Routes
            </Link>
            <span className={`badge ${typeConfig.color} text-white border-transparent mb-3`}>
              {typeConfig.icon} {typeConfig.label}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">{itinerary.title}</h1>
            <p className="font-mono text-sm uppercase tracking-wider text-brand-gold mt-2">{itinerary.tagline}</p>
          </div>
        </div>
      </section>
      <div className="adire-strip" />

      <section className="py-12 bg-brand-cream">
        <div className="container-brutal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="flex items-center justify-between mb-6">
                  <ShareButtons url={`/itineraries/${slug}`} title={itinerary.title} />
                  <SaveButton itemId={itinerary.id} itemType="itinerary" />
                </div>
                <p className="text-brand-charcoal text-lg leading-relaxed mb-8">{itinerary.description}</p>
              </AnimatedSection>

              {/* Day selector */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {itinerary.days.map(day => (
                  <button key={day.day_number} onClick={() => setActiveDay(day.day_number)}
                    className={`px-4 py-2 border-2 font-mono text-sm uppercase tracking-wider whitespace-nowrap transition-all ${
                      activeDay === day.day_number
                        ? 'bg-brand-charcoal text-brand-cream border-brand-charcoal'
                        : 'border-brand-charcoal/20 text-brand-slate hover:border-brand-gold hover:text-brand-gold'
                    }`}>
                    Day {day.day_number}
                  </button>
                ))}
              </div>

              {/* Day content */}
              {currentDay && (
                <AnimatedSection key={activeDay}>
                  <div className="mb-6">
                    <h2 className="font-heading text-2xl font-bold text-brand-charcoal">
                      Day {currentDay.day_number}: {currentDay.title}
                    </h2>
                    <p className="text-brand-slate mt-2">{currentDay.description}</p>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-1">
                    {currentDay.activities.map((activity, i) => (
                      <div key={i} className="flex gap-4">
                        {/* Time column */}
                        <div className="w-16 shrink-0 text-right">
                          <span className="font-mono text-sm font-semibold text-brand-gold">{activity.time}</span>
                        </div>

                        {/* Timeline line */}
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-brand-gold rounded-full border-2 border-brand-cream shrink-0 mt-1.5" />
                          {i < currentDay.activities.length - 1 && <div className="w-0.5 flex-1 bg-brand-gold/20" />}
                        </div>

                        {/* Content */}
                        <div className="brutal-glass-static p-4 flex-1 mb-4">
                          <div className="flex items-start gap-2">
                            <span className="text-lg">{ACTIVITY_ICONS[activity.type] || '📍'}</span>
                            <div>
                              <h4 className="font-heading font-bold text-brand-charcoal">{activity.title}</h4>
                              <p className="text-brand-slate text-sm mt-1">{activity.description}</p>
                              <div className="flex items-center gap-1 mt-2 text-xs text-brand-slate">
                                <MapPin className="w-3 h-3" /> {activity.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="brutal-glass-static p-6 sticky top-28 space-y-4">
                <h3 className="font-heading text-lg font-bold pb-4 border-b-2 border-brand-charcoal">Route Details</h3>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Duration</p>
                    <p className="font-semibold">{itinerary.duration_days} Days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Estimated Cost</p>
                    <p className="font-semibold text-brand-gold">{itinerary.price_estimate}</p>
                  </div>
                </div>
                <hr className="brutal-divider" />
                <h4 className="font-mono text-xs uppercase tracking-wider text-brand-slate">Highlights</h4>
                <ul className="space-y-2">
                  {itinerary.highlights.map(h => (
                    <li key={h} className="text-sm flex items-start gap-2">
                      <span className="text-brand-gold">→</span> {h}
                    </li>
                  ))}
                </ul>
                <hr className="brutal-divider" />
                <Link to="/destinations" className="btn-brutal btn-brutal-gold w-full text-center">
                  Explore Destinations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
