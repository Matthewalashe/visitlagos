import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';
import { NAV_LINKS, SITE_NAME, WHATSAPP_NUMBER } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/utils';
import NewsletterSignup from '@/components/home/NewsletterSignup';

const SocialIcons = {
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  YouTube: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-brand-cream">
      <div className="adire-strip" />

      <div className="container-brutal py-16">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-white/10">
          <NewsletterSignup variant="footer" />
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-brand-gold" />
              <span className="font-heading font-bold text-xl">{SITE_NAME}</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Your gateway to authentic Yoruba cultural experiences. Discover Lagos and Southwest Nigeria like never before.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: SocialIcons.Instagram, label: 'Instagram', href: '#' },
                { Icon: SocialIcons.Twitter, label: 'Twitter', href: '#' },
                { Icon: SocialIcons.YouTube, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-brand-gold hover:border-brand-gold transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-brand-gold mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-brand-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Routes */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-brand-gold mb-6">
              YorubaPass Routes
            </h4>
            <ul className="space-y-3">
              {[
                { label: '🏛️ Heritage Route', href: '/itineraries/heritage-route' },
                { label: '🎭 Festival Route', href: '/itineraries/festival-route' },
                { label: '🌿 Nature Route', href: '/itineraries/nature-route' },
              ].map((route) => (
                <li key={route.href}>
                  <Link
                    to={route.href}
                    className="text-white/60 hover:text-brand-gold transition-colors text-sm"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-brand-gold mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={getWhatsAppLink(WHATSAPP_NUMBER, 'Hi! I have a question about VisitLagos.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-brand-gold transition-colors text-sm flex items-center gap-2"
                >
                  <span>💬</span> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@visitlagos.com"
                  className="text-white/60 hover:text-brand-gold transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> hello@visitlagos.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-brutal py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-mono">
            © {currentYear} {SITE_NAME}. Gateway to Yoruba Land.
          </p>
          <p className="text-white/40 text-xs font-mono">
            Made with ❤️ for the culture
          </p>
        </div>
      </div>
    </footer>
  );
}
