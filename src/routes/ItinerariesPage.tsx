import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { getItineraries } from '@/lib/data';
import type { Itinerary } from '@/types';
import { SITE_NAME, ITINERARY_TYPES } from '@/lib/constants';
import SectionHeader from '@/components/shared/SectionHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function ItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);

  useEffect(() => {
    getItineraries().then(setItineraries);
  }, []);

  return (
    <>
      <Helmet>
        <title>Curated Itineraries — {SITE_NAME}</title>
        <meta name="description" content="Pre-packaged, multi-day cultural routes across Lagos and Southwest Nigeria. Heritage, Festival, and Nature routes designed for the ultimate Yoruba experience." />
      </Helmet>

      <section className="bg-brand-charcoal text-brand-cream py-16 md:py-24">
        <div className="container-brutal">
          <span className="section-label border-brand-gold text-brand-gold">// YorubaPass</span>
          <h1 className="font-heading text-display mt-3 text-brand-cream">
            CURATED<br /><span className="text-gradient-gold">ROUTES</span>
          </h1>
          <p className="text-white/60 max-w-xl mt-4 text-lg">
            Pre-packaged cultural journeys designed to give you the deepest possible experience of Yorubaland. Everything planned — just show up and explore.
          </p>
        </div>
      </section>
      <div className="adire-strip" />

      <section className="py-16 bg-brand-cream">
        <div className="container-brutal space-y-12">
          {itineraries.map((itin, index) => {
            const typeConfig = ITINERARY_TYPES[itin.type];
            return (
              <AnimatedSection key={itin.id} delay={index * 100}>
                <Link to={`/itineraries/${itin.slug}`} className="block group">
                  <div className="brutal-glass overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-5">
                      <div className="lg:col-span-2 h-64 lg:h-auto overflow-hidden">
                        <img src={itin.image_url} alt={itin.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      </div>
                      <div className="lg:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`badge ${typeConfig.color} text-white border-transparent`}>
                            {typeConfig.icon} {typeConfig.label}
                          </span>
                          <span className="badge text-brand-slate">
                            <Clock className="w-3 h-3 mr-1 inline" /> {itin.duration_days} Days
                          </span>
                        </div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold group-hover:text-brand-gold transition-colors mb-2">
                          {itin.title}
                        </h2>
                        <p className="font-mono text-xs uppercase tracking-[0.1em] text-brand-gold mb-4">{itin.tagline}</p>
                        <p className="text-brand-slate leading-relaxed mb-6">{itin.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {itin.highlights.slice(0, 4).map(h => (
                            <span key={h} className="badge text-brand-slate">{h}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-heading text-xl font-bold text-brand-gold">{itin.price_estimate}</span>
                          <span className="btn-brutal btn-brutal-outline text-xs">
                            View Day-by-Day <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </section>
    </>
  );
}
