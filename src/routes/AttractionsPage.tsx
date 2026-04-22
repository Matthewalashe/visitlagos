import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, ArrowRight, MapPin } from 'lucide-react';
import { getAttractions, getDestinations } from '@/lib/data';
import type { Attraction, Destination, AttractionCategory } from '@/types';
import { SITE_NAME, ATTRACTION_CATEGORIES } from '@/lib/constants';
import AnimatedSection from '@/components/shared/AnimatedSection';
import SaveButton from '@/components/shared/SaveButton';

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDest, setSelectedDest] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAttractions().then(setAttractions);
    getDestinations().then(setDestinations);
  }, []);

  const filtered = attractions.filter(attr => {
    if (selectedCategory !== 'all' && attr.category !== selectedCategory) return false;
    if (selectedDest !== 'all' && attr.destination_id !== selectedDest) return false;
    if (searchQuery && !attr.title.toLowerCase().includes(searchQuery.toLowerCase()) && !attr.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Attractions — {SITE_NAME}</title>
        <meta name="description" content="Discover cultural sites, nature reserves, art galleries, historical landmarks, and hidden gems across Lagos and Southwest Nigeria." />
      </Helmet>

      {/* Header */}
      <section className="bg-brand-charcoal text-brand-cream py-16 md:py-24">
        <div className="container-brutal">
          <span className="section-label border-brand-gold text-brand-gold">// Discover</span>
          <h1 className="font-heading text-display mt-3 text-brand-cream">
            ATTRAC<span className="text-gradient-gold">TIONS</span>
          </h1>
          <p className="text-white/60 max-w-xl mt-4 text-lg">
            From world-class art galleries to sacred UNESCO groves — find your next experience.
          </p>
        </div>
      </section>
      <div className="adire-strip" />

      {/* Filters */}
      <section className="py-6 bg-brand-sand border-b-2 border-brand-charcoal/10 sticky top-[calc(8px+4rem)] md:top-[calc(8px+5rem)] z-30">
        <div className="container-brutal">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate" />
              <input
                type="text"
                placeholder="Search attractions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-brand-charcoal bg-white font-body text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border-2 border-brand-charcoal bg-white font-mono text-xs uppercase tracking-wider cursor-pointer focus:outline-none focus:border-brand-gold"
            >
              <option value="all">All Categories</option>
              {Object.entries(ATTRACTION_CATEGORIES).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>

            {/* Destination filter */}
            <select
              value={selectedDest}
              onChange={e => setSelectedDest(e.target.value)}
              className="px-4 py-2.5 border-2 border-brand-charcoal bg-white font-mono text-xs uppercase tracking-wider cursor-pointer focus:outline-none focus:border-brand-gold"
            >
              <option value="all">All Destinations</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>

            <span className="font-mono text-xs text-brand-slate ml-auto">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 bg-brand-cream">
        <div className="container-brutal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((attr, index) => (
              <AnimatedSection key={attr.id} delay={index * 50}>
                <Link to={`/attractions/${attr.slug}`} className="block group h-full">
                  <div className="brutal-glass overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={attr.image_url} alt={attr.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className="absolute top-3 left-3">
                        <span className={`badge text-white ${ATTRACTION_CATEGORIES[attr.category as AttractionCategory]?.color || 'bg-brand-slate'}`}>
                          {ATTRACTION_CATEGORIES[attr.category as AttractionCategory]?.label || attr.category}
                        </span>
                      </div>
                      <SaveButton itemId={attr.id} itemType="attraction" className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm" />
                      {attr.featured && (
                        <div className="absolute bottom-3 left-3">
                          <span className="badge bg-brand-gold text-white border-brand-gold">⭐ Featured</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">{attr.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-brand-slate mb-3">
                        <MapPin className="w-3.5 h-3.5" /> {attr.location}
                      </div>
                      <p className="text-brand-slate text-sm flex-1 line-clamp-3">{attr.description}</p>
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-brand-charcoal/10">
                        <span className="font-mono text-sm font-semibold text-brand-gold">{attr.price_range}</span>
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
              <p className="font-heading text-2xl text-brand-charcoal mb-2">No attractions found</p>
              <p className="text-brand-slate">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
