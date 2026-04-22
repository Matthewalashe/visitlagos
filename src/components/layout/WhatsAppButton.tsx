import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { getWhatsAppLink } from '@/lib/utils';

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink(WHATSAPP_NUMBER, 'Hi! I am interested in exploring Lagos and Yoruba cultural experiences. Can you help me plan my trip?')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-brand-charcoal text-brand-cream text-xs font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
