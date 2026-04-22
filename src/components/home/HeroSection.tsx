import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=1920&q=80"
          alt="Lagos skyline aerial view"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 via-brand-charcoal/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-transparent to-brand-charcoal/30" />
      </div>

      {/* Content */}
      <div className="relative container-brutal py-20 md:py-0">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-cream">
              Detty December 2026 — Coming Soon
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-display text-brand-cream mb-6">
            GATEWAY<br />
            TO <span className="text-gradient-gold">YORUBA</span><br />
            LAND
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
            Discover, plan, and experience curated cultural journeys across Lagos and Southwest Nigeria. 
            From ancient kingdoms to Afrobeats concerts — your adventure starts here.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/destinations" className="btn-brutal btn-brutal-gold">
              Explore Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/events" className="btn-brutal bg-white/10 backdrop-blur-sm text-brand-cream border-white/30 hover:bg-white/20 hover:transform hover:-translate-y-0.5">
              View Events
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Countdown */}
          <CountdownTimer />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-float">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Brutalist corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 md:w-40 md:h-40 border-b-3 border-l-3 border-brand-gold opacity-50" />
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 border-t-3 border-r-3 border-brand-gold opacity-50" />
    </section>
  );
}
