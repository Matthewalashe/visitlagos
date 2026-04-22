import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Clock, DollarSign, ExternalLink, ArrowLeft } from 'lucide-react';
import { getAttractionBySlug } from '@/lib/data';
import type { Attraction, AttractionCategory } from '@/types';
import { SITE_NAME, ATTRACTION_CATEGORIES } from '@/lib/constants';
import AnimatedSection from '@/components/shared/AnimatedSection';
import ShareButtons from '@/components/shared/ShareButtons';
import SaveButton from '@/components/shared/SaveButton';

export default function AttractionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [attraction, setAttraction] = useState<Attraction | null>(null);

  useEffect(() => {
    if (slug) getAttractionBySlug(slug).then(setAttraction);
  }, [slug]);

  if (!attraction) {
    return <div className="min-h-screen flex items-center justify-center"><div className="font-mono text-brand-slate">Loading...</div></div>;
  }

  const catConfig = ATTRACTION_CATEGORIES[attraction.category as AttractionCategory];

  return (
    <>
      <Helmet>
        <title>{attraction.title} — {SITE_NAME}</title>
        <meta name="description" content={attraction.description} />
      </Helmet>

      {/* Hero */}
      <section className="relative h-[40vh] md:h-[50vh]">
        <img src={attraction.image_url} alt={attraction.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="container-brutal">
            <Link to="/attractions" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Attractions
            </Link>
            <span className={`badge text-white mb-3 ${catConfig?.color || 'bg-brand-slate'}`}>
              {catConfig?.label || attraction.category}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">{attraction.title}</h1>
            <div className="flex items-center gap-2 mt-3 text-white/70">
              <MapPin className="w-4 h-4" /> {attraction.location}
            </div>
          </div>
        </div>
      </section>
      <div className="adire-strip" />

      {/* Content */}
      <section className="py-12 bg-brand-cream">
        <div className="container-brutal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <div className="flex items-center justify-between mb-6">
                  <ShareButtons url={`/attractions/${slug}`} title={attraction.title} />
                  <SaveButton itemId={attraction.id} itemType="attraction" />
                </div>
                <div className="text-brand-charcoal leading-relaxed text-lg">
                  {attraction.long_description.split('\n\n').map((p, i) => (
                    <p key={i} className="mb-4">{p}</p>
                  ))}
                </div>
                {attraction.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8">
                    {attraction.tags.map(tag => (
                      <span key={tag} className="badge text-brand-slate">#{tag}</span>
                    ))}
                  </div>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div>
              <div className="brutal-glass-static p-6 sticky top-28 space-y-4">
                <h3 className="font-heading text-lg font-bold pb-4 border-b-2 border-brand-charcoal">Visitor Info</h3>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Price</p>
                    <p className="font-semibold">{attraction.price_range}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Hours</p>
                    <p className="text-sm">{attraction.opening_hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mb-1">Location</p>
                    <p className="text-sm">{attraction.location}</p>
                  </div>
                </div>
                {attraction.affiliate_url && (
                  <>
                    <hr className="brutal-divider" />
                    <a href={`${attraction.affiliate_url}?utm_source=visitlagos&utm_medium=affiliate`} target="_blank" rel="noopener noreferrer"
                      className="btn-brutal btn-brutal-gold w-full text-center flex items-center justify-center gap-2">
                      Book Now <ExternalLink className="w-4 h-4" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
