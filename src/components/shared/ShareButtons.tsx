import { Share2, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = `${window.location.origin}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { Icon: TwitterIcon, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, label: 'Twitter' },
    { Icon: FacebookIcon, href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, label: 'Facebook' },
    { Icon: () => <MessageCircle className="w-3.5 h-3.5" />, href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`, label: 'WhatsApp' },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs uppercase tracking-wider text-brand-slate mr-1">
        <Share2 className="w-3.5 h-3.5 inline" /> Share
      </span>
      {shareLinks.map(({ Icon, href, label }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${label}`}
          className="w-8 h-8 border border-brand-charcoal/20 flex items-center justify-center hover:bg-brand-charcoal hover:text-brand-cream transition-all text-brand-slate">
          <Icon />
        </a>
      ))}
      <button onClick={copyLink} aria-label="Copy link"
        className="w-8 h-8 border border-brand-charcoal/20 flex items-center justify-center hover:bg-brand-gold hover:text-brand-cream hover:border-brand-gold transition-all text-brand-slate">
        <LinkIcon className="w-3.5 h-3.5" />
      </button>
      {copied && <span className="text-xs text-brand-gold font-mono">Copied!</span>}
    </div>
  );
}
