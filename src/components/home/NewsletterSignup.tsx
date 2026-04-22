import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/data';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  variant?: 'hero' | 'section' | 'footer';
}

export default function NewsletterSignup({ variant = 'section' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    const result = await subscribeNewsletter(email, variant);
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
      setErrorMsg(result.error || 'Something went wrong');
    }
  };

  const isFooter = variant === 'footer';

  return (
    <div className={cn(isFooter ? '' : 'py-20')}>
      <div className={cn(isFooter ? '' : 'container-brutal')}>
        <div className={cn(
          isFooter ? '' : 'gold-glass p-8 md:p-12',
          'text-center'
        )}>
          <span className={cn(
            'section-label',
            isFooter ? 'border-brand-gold text-brand-gold' : ''
          )}>
            // Stay Connected
          </span>
          <h3 className={cn(
            'font-heading text-2xl md:text-3xl font-bold mt-3 mb-3',
            isFooter ? 'text-brand-cream' : 'text-brand-charcoal'
          )}>
            {isFooter ? 'Join the Journey' : "Don't Miss a Thing"}
          </h3>
          <p className={cn(
            'max-w-md mx-auto mb-8 text-sm',
            isFooter ? 'text-white/60' : 'text-brand-slate'
          )}>
            Get curated travel tips, event alerts, Detty December updates, and exclusive YorubaPass deals. No spam — just culture.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-brand-gold">
              <CheckCircle className="w-5 h-5" />
              <span className="font-heading font-semibold">Welcome to the journey! 🎉</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={cn(
                  'flex-1 px-4 py-3 border-2 font-body focus:outline-none transition-colors',
                  isFooter
                    ? 'border-white/20 bg-white/10 text-brand-cream placeholder:text-white/40 focus:border-brand-gold'
                    : 'border-brand-charcoal bg-white focus:border-brand-gold'
                )}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-brutal btn-brutal-primary flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                {status === 'loading' ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-brand-coral text-sm mt-3">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
