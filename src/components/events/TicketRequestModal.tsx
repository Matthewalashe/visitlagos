import { useState } from 'react';
import { X, Send, Ticket } from 'lucide-react';
import type { VisitEvent } from '@/types';

interface TicketRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: VisitEvent;
}

export default function TicketRequestModal({ isOpen, onClose, event }: TicketRequestModalProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    quantity: 1,
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Import dynamically to avoid circular deps
      const { submitTicketRequest } = await import('@/lib/data');
      const result = await submitTicketRequest({
        event_id: event.id,
        ...form,
      });
      if (result.success) {
        setStatus('success');
        setForm({ name: '', email: '', whatsapp: '', quantity: 1, message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.name === 'quantity' ? Number(e.target.value) : e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-brand-cream border-2 border-brand-charcoal w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b-2 border-brand-charcoal">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-brand-coral" />
            <h2 className="font-heading text-xl font-bold">Get Tickets</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:text-brand-coral transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Event Info */}
        <div className="px-5 pt-4 pb-2">
          <p className="font-heading font-bold text-lg">{event.title}</p>
          <p className="font-mono text-xs text-brand-slate uppercase tracking-wider mt-1">{event.price_range}</p>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-8 h-8 text-brand-gold" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-2">Request Received! 🎉</h3>
            <p className="text-brand-slate text-sm mb-6">
              We'll reach out via email or WhatsApp with your ticket details shortly.
            </p>
            <button onClick={onClose} className="btn-brutal btn-brutal-primary">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block font-mono text-[0.65rem] uppercase tracking-wider text-brand-slate mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border-2 border-brand-charcoal bg-white focus:border-brand-gold focus:outline-none transition-colors font-body text-sm"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block font-mono text-[0.65rem] uppercase tracking-wider text-brand-slate mb-1.5">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 border-2 border-brand-charcoal bg-white focus:border-brand-gold focus:outline-none transition-colors font-body text-sm"
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[0.65rem] uppercase tracking-wider text-brand-slate mb-1.5">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border-2 border-brand-charcoal bg-white focus:border-brand-gold focus:outline-none transition-colors font-body text-sm"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label className="block font-mono text-[0.65rem] uppercase tracking-wider text-brand-slate mb-1.5">
                  Quantity *
                </label>
                <select
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border-2 border-brand-charcoal bg-white focus:border-brand-gold focus:outline-none transition-colors font-body text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'ticket' : 'tickets'}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[0.65rem] uppercase tracking-wider text-brand-slate mb-1.5">
                Message (optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2.5 border-2 border-brand-charcoal bg-white focus:border-brand-gold focus:outline-none transition-colors font-body text-sm resize-none"
                placeholder="Any special requests..."
              />
            </div>

            {status === 'error' && (
              <p className="text-brand-coral text-sm font-mono">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-brutal btn-brutal-coral w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {status === 'loading' ? 'Submitting...' : 'Request Tickets'}
            </button>

            <p className="text-center text-xs text-brand-slate">
              We'll confirm availability and send payment details via email or WhatsApp.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
