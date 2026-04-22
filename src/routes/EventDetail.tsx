import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, DollarSign, Clock, ArrowLeft, ExternalLink } from 'lucide-react';
import { getEventBySlug } from '@/lib/data';
import type { VisitEvent, EventCategory } from '@/types';
import { SITE_NAME, EVENT_CATEGORIES } from '@/lib/constants';
import { formatDateRange } from '@/lib/utils';
import AnimatedSection from '@/components/shared/AnimatedSection';
import ShareButtons from '@/components/shared/ShareButtons';
import SaveButton from '@/components/shared/SaveButton';

export default function EventDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<VisitEvent | null>(null);

  useEffect(() => {
    if (slug) getEventBySlug(slug).then(setEvent);
  }, [slug]);

  if (!event) {
    return <div className="min-h-screen flex items-center justify-center"><div className="font-mono text-brand-slate">Loading...</div></div>;
  }

  const catConfig = EVENT_CATEGORIES[event.category as EventCategory];

  return (
    <>
      <Helmet>
        <title>{event.title} — {SITE_NAME}</title>
        <meta name="description" content={event.description} />
      </Helmet>

      <section className="relative h-[40vh] md:h-[50vh]">
        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container-brutal">
            <Link to="/events" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Events
            </Link>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`badge text-white ${catConfig?.color || 'bg-brand-slate'}`}>{catConfig?.label || event.category}</span>
              {event.is_detty_december && <span className="badge bg-brand-coral text-white border-brand-coral">🔥 Detty December</span>}
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">{event.title}</h1>
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
                  <ShareButtons url={`/events/${slug}`} title={event.title} />
                  <SaveButton itemId={event.id} itemType="event" />
                </div>
                <div className="text-brand-charcoal leading-relaxed text-lg">
                  {event.long_description.split('\n\n').map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <div>
              <div className="brutal-glass-static p-6 sticky top-28 space-y-4">
                <h3 className="font-heading text-lg font-bold pb-4 border-b-2 border-brand-charcoal">Event Details</h3>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Date</p>
                    <p className="font-semibold">{formatDateRange(event.date_start, event.date_end)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Venue</p>
                    <p className="text-sm">{event.venue}</p>
                    <p className="text-sm text-brand-slate">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Price</p>
                    <p className="font-semibold text-brand-gold">{event.price_range}</p>
                  </div>
                </div>
                <hr className="brutal-divider" />
                {event.ticket_url ? (
                  <a href={`${event.ticket_url}?utm_source=visitlagos&utm_medium=affiliate`} target="_blank" rel="noopener noreferrer"
                    className="btn-brutal btn-brutal-coral w-full text-center flex items-center justify-center gap-2">
                    Get Tickets <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <Link to="/detty-december" className="btn-brutal btn-brutal-gold w-full text-center">
                    Join Waitlist
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
