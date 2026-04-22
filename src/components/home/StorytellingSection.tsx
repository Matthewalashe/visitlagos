import AnimatedSection from '@/components/shared/AnimatedSection';

export default function StorytellingSection() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="container-brutal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <AnimatedSection direction="left">
            <span className="section-label">// Our Story</span>
            <h2 className="font-heading text-display-sm mt-3 mb-6 text-brand-charcoal">
              THE SOUL OF<br />
              <span className="text-gradient-gold">YORUBA</span> CULTURE
            </h2>
            <div className="space-y-4 text-brand-slate leading-relaxed">
              <p>
                Yorubaland stretches across Southwest Nigeria — a civilization of over 50 million people 
                with a cultural heritage spanning over a thousand years. From the ancient city of Ile-Ife, 
                where Yoruba cosmology places the creation of the world, to the electric streets of Lagos, 
                Africa's most vibrant megacity.
              </p>
              <p>
                This is a land of master bronze-casters and textile artists, of Afrobeat legends and Nobel 
                laureates, of sacred groves and rooftop parties. Where the Ooni of Ife sits on a throne 
                older than most European monarchies, and where a new generation is redefining African 
                creativity for the world.
              </p>
              <p className="font-semibold text-brand-charcoal">
                VisitLagos is your gateway to experiencing it all — authentically, deeply, and unforgettably.
              </p>
            </div>
            <div className="mt-8 flex gap-8">
              {[
                { value: '50M+', label: 'Yoruba People Worldwide' },
                { value: '1,000+', label: 'Years of Heritage' },
                { value: '3', label: 'UNESCO World Heritage Sites' },
              ].map(stat => (
                <div key={stat.label}>
                  <span className="block font-heading text-2xl md:text-3xl font-bold text-brand-gold">{stat.value}</span>
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.15em] text-brand-slate mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Images */}
          <AnimatedSection direction="right">
            <div className="relative">
              {/* Main image */}
              <div className="brutal-image aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=800&q=80"
                  alt="Traditional Yoruba cultural scene"
                  loading="lazy"
                />
              </div>
              {/* Offset accent image */}
              <div className="hidden md:block absolute -bottom-8 -left-8 w-48 h-48 brutal-image border-brand-gold">
                <img
                  src="https://images.unsplash.com/photo-1528277342758-f1d7613953a2?w=400&q=80"
                  alt="Yoruba textiles and crafts"
                  loading="lazy"
                />
              </div>
              {/* Decorative block */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-gold/20 border-2 border-brand-gold -z-10" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
