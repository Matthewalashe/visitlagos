import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getDestinations } from '@/lib/data';
import type { Destination } from '@/types';
import SectionHeader from '@/components/shared/SectionHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function DestinationShowcase() {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    getDestinations().then(setDestinations);
  }, []);

  if (destinations.length === 0) return null;

  return (
    <section className="py-20 bg-brand-sand">
      <div className="container-brutal">
        <AnimatedSection>
          <SectionHeader
            label="// Destinations"
            title="Explore Yorubaland"
            description="Three distinct destinations, each offering a unique window into Yoruba civilization."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {destinations.map((dest, index) => (
            <AnimatedSection key={dest.id} delay={index * 150}>
              <Link to={`/destinations/${dest.slug}`} className="block group">
                <div className="relative h-80 md:h-96 brutal-image overflow-hidden">
                  <img
                    src={dest.image_url}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="badge bg-brand-gold text-white border-brand-gold mb-3">
                      {dest.state}
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-white/70 font-mono text-xs uppercase tracking-wider mb-3">
                      {dest.tagline}
                    </p>
                    <p className="text-white/60 text-sm line-clamp-2 mb-4">
                      {dest.description.substring(0, 120)}...
                    </p>
                    <span className="font-mono text-xs text-brand-gold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore {dest.name} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
