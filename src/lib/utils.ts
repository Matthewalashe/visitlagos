import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sMonth = s.toLocaleDateString('en-GB', { month: 'short' });
  const eMonth = e.toLocaleDateString('en-GB', { month: 'short' });
  if (sMonth === eMonth) {
    return `${s.getDate()} – ${e.getDate()} ${sMonth} ${e.getFullYear()}`;
  }
  return `${s.getDate()} ${sMonth} – ${e.getDate()} ${eMonth} ${e.getFullYear()}`;
}

export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  if (currency === 'USD') {
    return `$${(amount / 1600).toFixed(0)}`;
  }
  return `₦${amount.toLocaleString()}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getWhatsAppLink(number: string, message?: string): string {
  const cleaned = number.replace(/^0/, '234');
  const encoded = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${cleaned}${encoded ? `?text=${encoded}` : ''}`;
}

export function getTimeUntil(targetDate: Date): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
