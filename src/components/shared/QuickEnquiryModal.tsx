import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { submitEnquiry } from '@/lib/data';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INTEREST_OPTIONS = [
  'Heritage & History', 'Festivals & Events', 'Nature & Adventure',
  'Food & Culinary', 'Nightlife & Music', 'Art & Culture',
  'Detty December', 'Family Trip',
];

export default function QuickEnquiryModal({ isOpen, onClose }: QuickEnquiryModalProps) {
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', travel_dates: '',
    interests: [] as string[], message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await submitEnquiry(form);
    setStatus(result.success ? 'success' : 'error');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-brand-cream border-3 border-brand-charcoal max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-brand-charcoal">
          <div>
            <span className="section-label">Quick Enquiry</span>
            <h3 className="font-heading text-xl mt-1">Plan Your Journey</h3>
          </div>
          <button onClick={onClose} className="p-2 border-2 border-brand-charcoal hover:bg-brand-charcoal hover:text-brand-cream transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h4 className="font-heading text-xl mb-2">Thank You!</h4>
            <p className="text-brand-slate mb-6">We'll be in touch within 24 hours to help plan your trip.</p>
            <button onClick={onClose} className="btn-brutal btn-brutal-primary">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-slate block mb-1">Name *</label>
              <input type="text" required value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-brand-charcoal bg-white font-body focus:outline-none focus:border-brand-gold transition-colors" />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-slate block mb-1">Email *</label>
              <input type="email" required value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-brand-charcoal bg-white font-body focus:outline-none focus:border-brand-gold transition-colors" />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-slate block mb-1">WhatsApp Number</label>
              <input type="tel" value={form.whatsapp} onChange={e => setForm(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-brand-charcoal bg-white font-body focus:outline-none focus:border-brand-gold transition-colors"
                placeholder="+234 or country code" />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-slate block mb-1">Travel Dates</label>
              <input type="text" value={form.travel_dates} onChange={e => setForm(prev => ({ ...prev, travel_dates: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-brand-charcoal bg-white font-body focus:outline-none focus:border-brand-gold transition-colors"
                placeholder="e.g., December 2026, Flexible" />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-slate block mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map(interest => (
                  <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                    className={`badge cursor-pointer transition-all ${
                      form.interests.includes(interest)
                        ? 'bg-brand-gold text-white border-brand-gold'
                        : 'text-brand-slate hover:border-brand-gold hover:text-brand-gold'
                    }`}>
                    {interest}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-brand-slate block mb-1">Message *</label>
              <textarea required rows={3} value={form.message} onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 border-2 border-brand-charcoal bg-white font-body focus:outline-none focus:border-brand-gold transition-colors resize-none"
                placeholder="Tell us about your dream trip..." />
            </div>
            <button type="submit" disabled={status === 'loading'}
              className="btn-brutal btn-brutal-gold w-full flex items-center justify-center gap-2 disabled:opacity-50">
              <Send className="w-4 h-4" />
              {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
            </button>
            {status === 'error' && <p className="text-brand-coral text-sm text-center">Something went wrong. Please try again.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
