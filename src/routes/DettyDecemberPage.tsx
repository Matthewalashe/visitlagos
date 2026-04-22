import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, ArrowRight, Flame } from 'lucide-react';
import { getEvents } from '@/lib/data';
import { formatDateRange, getTimeUntil } from '@/lib/utils';
import { SITE_NAME, DETTY_DECEMBER_DATE, EVENT_CATEGORIES } from '@/lib/constants';
import type { VisitEvent, EventCategory } from '@/types';
import AnimatedSection from '@/components/shared/AnimatedSection';
import NewsletterSignup from '@/components/home/NewsletterSignup';

export default function DettyDecemberPage() {
  const [events, setEvents] = useState<VisitEvent[]>([]);
  const [time, setTime] = useState(getTimeUntil(DETTY_DECEMBER_DATE));

  useEffect(() => {
    getEvents({ is_detty_december: true }).then(setEvents);
    const interval = setInterval(() => setTime(getTimeUntil(DETTY_DECEMBER_DATE)), 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownBlocks = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' },
  ];

  return (
    <>
      <Helmet>
        <title>Detty December 2026 — {SITE_NAME}</title>
        <meta name="description" content="Your complete guide to Detty December 2026 in Lagos — concerts, beach parties, festivals, food events, and curated travel bundles for the diaspora homecoming season." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1920&q=80" alt="Detty December Lagos concert" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal/50" />
        </div>

        <div className="relative container-brutal py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-coral/20 backdrop-blur-md border border-brand-coral/40">
              <Flame className="w-4 h-4 text-brand-coral" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cream">Coming December 2026</span>
            </div>

            <h1 className="font-heading text-display text-brand-cream mb-4">
              DETTY<br />
              <span className="text-gradient-coral">DECEMBER</span><br />
              2026
            </h1>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Coming home this December? Lagos is waiting. From Wizkid to Burna Boy, from beach raves to Afrobeat sessions at the Shrine — this is the season that brings Nigeria's diaspora together.
            </p>

            {/* Countdown */}
            <div className="flex gap-3 mb-8">
              {countdownBlocks.map(({ value, label }) => (
                <div key={label} className="w-20 md:w-24 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-center">
                  <span className="block font-heading text-3xl md:text-4xl font-bold text-brand-cream">{String(value).padStart(2, '0')}</span>
                  <span className="block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/60">{label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/events" className="btn-brutal btn-brutal-coral">
                View All Events <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/itineraries/festival-route" className="btn-brutal bg-white/10 backdrop-blur-sm text-brand-cream border-white/30 hover:bg-white/20">
                Festival Route Bundle
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="adire-strip" />

      {/* Events */}
      <section className="py-16 bg-brand-sand">
        <div className="container-brutal">
          <AnimatedSection>
            <span className="section-label">// Detty December Events</span>
            <h2 className="font-heading text-display-sm mt-3 mb-4">What's Happening</h2>
            <p className="text-brand-slate text-lg max-w-xl">The events that make December in Lagos legendary.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {events.map((event, index) => (
              <AnimatedSection key={event.id} delay={index * 100}>
                <Link to={`/events/${event.slug}`} className="block group">
                  <div className="brutal-glass overflow-hidden">
                    <div className="grid grid-cols-3">
                      <div className="col-span-1 overflow-hidden">
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover min-h-[160px] transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      </div>
                      <div className="col-span-2 p-5">
                        <span className={`badge text-white mb-2 ${EVENT_CATEGORIES[event.category as EventCategory]?.color || 'bg-brand-slate'}`}>
                          {EVENT_CATEGORIES[event.category as EventCategory]?.label || event.category}
                        </span>
                        <h3 className="font-heading text-lg font-bold group-hover:text-brand-gold transition-colors">{event.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-brand-slate mt-2">
                          <Calendar className="w-3.5 h-3.5" /> {formatDateRange(event.date_start, event.date_end)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-brand-slate mt-1">
                          <MapPin className="w-3.5 h-3.5" /> {event.venue}
                        </div>
                        <div className="mt-3 font-mono text-sm font-semibold text-brand-gold">{event.price_range}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Diaspora CTA */}
      <section className="py-16 bg-brand-charcoal text-brand-cream">
        <div className="container-brutal text-center">
          <AnimatedSection>
            <span className="section-label border-brand-gold text-brand-gold">// For the Diaspora</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-3 mb-4 text-brand-cream">Coming Home This December?</h2>
            <p className="text-white/60 max-w-lg mx-auto mb-8 text-lg">
              We've got your entire trip covered. From airport pickup recommendations to concert tickets, our Festival Route bundle is designed specifically for the homecoming crowd.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/itineraries/festival-route" className="btn-brutal btn-brutal-gold">
                View Festival Route <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/itineraries/heritage-route" className="btn-brutal bg-white/10 text-brand-cream border-white/30 hover:bg-white/20">
                Heritage Route
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />
    </>
  );
}
