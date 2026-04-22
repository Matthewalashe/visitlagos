import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { getDestinations } from '@/lib/data';
import type { Destination } from '@/types';
import SectionHeader from '@/components/shared/SectionHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { SITE_NAME } from '@/lib/constants';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);

  return (
    <>
      <Helmet>
        <title>Destinations — {SITE_NAME}</title>
        <meta name="description" content="Explore Lagos, Ogun, and Osun — three distinct destinations offering unique windows into Yoruba civilization. Plan your Southwest Nigeria adventure." />
      </Helmet>

      {/* Page Header */}
      <section className="bg-brand-charcoal text-brand-cream py-16 md:py-24">
        <div className="container-brutal">
          <span className="section-label border-brand-gold text-brand-gold">// Explore</span>
          <h1 className="font-heading text-display mt-3 text-brand-cream">
            DESTI<span className="text-gradient-gold">NATIONS</span>
          </h1>
          <p className="text-white/60 max-w-xl mt-4 text-lg">
            From the electric energy of Lagos to the ancient kingdoms of Osun — discover the heart of Yorubaland.
          </p>
        </div>
      </section>
      <div className="adire-strip" />

      {/* Destinations Grid */}
      <section className="py-16 bg-brand-cream">
        <div className="container-brutal">
          <div className="space-y-16">
            {destinations.map((dest, index) => (
              <AnimatedSection key={dest.id} delay={index * 100}>
                <Link to={`/destinations/${dest.slug}`} className="block group">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`brutal-image aspect-[16/10] overflow-hidden ${index % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                      <img src={dest.image_url} alt={dest.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>

                    {/* Content */}
                    <div className="py-4">
                      <span className="badge text-brand-gold border-brand-gold mb-4">{dest.state}</span>
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-charcoal mb-2 group-hover:text-brand-gold transition-colors">
                        {dest.name}
                      </h2>
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-brand-gold mb-4">{dest.tagline}</p>
                      <p className="text-brand-slate leading-relaxed mb-6">{dest.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {dest.highlights.slice(0, 3).map(h => (
                          <span key={h} className="badge text-brand-slate">{h.split('—')[0].trim()}</span>
                        ))}
                      </div>
                      <span className="btn-brutal btn-brutal-outline inline-flex">
                        Explore {dest.name} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
                {index < destinations.length - 1 && <hr className="brutal-divider mt-16" />}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
