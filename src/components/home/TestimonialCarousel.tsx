import { useState, useEffect } from 'react';
import { getTestimonials } from '@/lib/data';
import type { Testimonial } from '@/types';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    getTestimonials().then(setTestimonials);
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <section className="py-20 bg-brand-cream">
      <div className="container-brutal">
        <AnimatedSection>
          <SectionHeader
            label="// Testimonials"
            title="Voices from the Diaspora"
            description="Real experiences from travellers who've discovered Yorubaland through our platform."
            align="center"
          />
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          <div className="max-w-3xl mx-auto">
            <div className="brutal-glass-static p-8 md:p-12 text-center relative">
              <Quote className="w-10 h-10 text-brand-gold/30 mx-auto mb-6" />
              <blockquote className="text-lg md:text-xl text-brand-charcoal leading-relaxed mb-8 min-h-[120px]">
                "{current.quote}"
              </blockquote>
              <div>
                <p className="font-heading font-bold text-brand-charcoal">{current.name}</p>
                <p className="font-mono text-xs uppercase tracking-wider text-brand-slate mt-1">
                  {current.location}
                </p>
                <p className="font-mono text-xs text-brand-gold mt-2">{current.trip_type}</p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 border-2 border-brand-charcoal flex items-center justify-center hover:bg-brand-charcoal hover:text-brand-cream transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-2 h-2 transition-all ${i === active ? 'bg-brand-gold w-6' : 'bg-brand-charcoal/20'}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActive((active + 1) % testimonials.length)}
                  className="w-10 h-10 border-2 border-brand-charcoal flex items-center justify-center hover:bg-brand-charcoal hover:text-brand-cream transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
