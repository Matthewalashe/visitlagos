import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="adire-strip" />
      <nav className="bg-brand-cream/90 backdrop-blur-md border-b-3 border-brand-charcoal">
        <div className="container-brutal flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
            <MapPin className="w-6 h-6 text-brand-gold group-hover:text-brand-coral transition-colors" />
            <div>
              <span className="font-heading font-bold text-lg md:text-xl text-brand-charcoal tracking-tight">
                {SITE_NAME}
              </span>
              <span className="hidden md:inline-block ml-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-brand-slate border border-brand-slate px-1.5 py-0.5">
                Gateway to Yoruba Land
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-all duration-200',
                  location.pathname.startsWith(link.href)
                    ? 'text-brand-gold border-b-2 border-brand-gold font-semibold'
                    : 'text-brand-charcoal hover:text-brand-gold'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/itineraries"
              className="ml-3 btn-brutal btn-brutal-primary text-xs py-2 px-4"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 border-2 border-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 border-t-2 border-brand-charcoal',
            mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 border-t-0'
          )}
        >
          <div className="container-brutal py-4 flex flex-col gap-1 bg-brand-cream">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'py-3 px-4 font-mono text-sm uppercase tracking-[0.1em] border-l-3 transition-all',
                  location.pathname.startsWith(link.href)
                    ? 'border-brand-gold text-brand-gold bg-brand-sand'
                    : 'border-transparent text-brand-charcoal hover:border-brand-gold hover:text-brand-gold'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/itineraries"
              onClick={() => setMobileOpen(false)}
              className="mt-2 btn-brutal btn-brutal-primary text-xs w-full text-center"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
