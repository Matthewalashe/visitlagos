import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { ITINERARY_TYPES } from '@/lib/constants';
import SectionHeader from '@/components/shared/SectionHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';

const BUNDLES = [
  {
    slug: 'heritage-route',
    type: 'heritage' as const,
    title: 'Heritage Route',
    duration: '5 Days',
    price: '₦250,000+',
    priceUsd: '$156+',
    stops: 'Lagos → Badagry → Abeokuta → Ile-Ife → Osogbo',
    description: 'Walk through 500 years of Yoruba history — from slave ports to sacred groves.',
    image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80',
  },
  {
    slug: 'festival-route',
    type: 'festival' as const,
    title: 'Festival Route',
    duration: '4 Days',
    price: '₦300,000+',
    priceUsd: '$188+',
    stops: 'Lagos — Concerts, Art, Beaches, Shrine',
    description: 'The ultimate Detty December experience — concerts, beach parties, and Afrobeat legends.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
  },
  {
    slug: 'nature-route',
    type: 'nature' as const,
    title: 'Nature Route',
    duration: '3 Days',
    price: '₦150,000+',
    priceUsd: '$94+',
    stops: 'Lekki → Osogbo Sacred Grove → Idanre Hills',
    description: 'Discover Southwest Nigeria\'s wild side — canopy walks, sacred forests, and mountain climbs.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
];

export default function FeaturedBundles() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="container-brutal">
        <AnimatedSection>
          <SectionHeader
            label="// YorubaPass"
            title="Curated Journey Bundles"
            description="Pre-packaged, multi-day cultural routes that take you from arrival to exploration. Everything planned, all you do is experience."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {BUNDLES.map((bundle, index) => {
            const typeConfig = ITINERARY_TYPES[bundle.type];
            return (
              <AnimatedSection key={bundle.slug} delay={index * 150}>
                <Link to={`/itineraries/${bundle.slug}`} className="block group h-full">
                  <div className="brutal-glass h-full flex flex-col overflow-hidden">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={bundle.image}
                        alt={bundle.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className={`badge ${typeConfig.color} text-white border-transparent`}>
                          {typeConfig.icon} {typeConfig.label}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-brand-gold transition-colors">
                        {bundle.title}
                      </h3>
                      <p className="text-brand-slate text-sm mb-4 flex-1">
                        {bundle.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-brand-slate mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {bundle.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {bundle.stops.split('→').length} Stops
                        </span>
                      </div>
                      <div className="font-mono text-xs text-brand-slate mb-4">
                        {bundle.stops}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-brand-charcoal/10">
                        <div>
                          <span className="font-heading text-lg font-bold text-brand-gold">{bundle.price}</span>
                          <span className="text-brand-slate text-xs ml-2">({bundle.priceUsd})</span>
                        </div>
                        <span className="font-mono text-xs text-brand-indigo flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Route <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
