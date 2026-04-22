import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SaveButtonProps {
  itemId: string;
  itemType: 'attraction' | 'event' | 'itinerary';
  className?: string;
}

function getSavedItems(): string[] {
  try {
    return JSON.parse(localStorage.getItem('visitlagos_saved') || '[]');
  } catch {
    return [];
  }
}

function toggleSaved(key: string): boolean {
  const items = getSavedItems();
  const idx = items.indexOf(key);
  if (idx > -1) {
    items.splice(idx, 1);
    localStorage.setItem('visitlagos_saved', JSON.stringify(items));
    return false;
  } else {
    items.push(key);
    localStorage.setItem('visitlagos_saved', JSON.stringify(items));
    return true;
  }
}

export default function SaveButton({ itemId, itemType, className }: SaveButtonProps) {
  const key = `${itemType}:${itemId}`;
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getSavedItems().includes(key));
  }, [key]);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(toggleSaved(key)); }}
      className={cn('p-2 transition-all hover:scale-110', className)}
      aria-label={saved ? 'Remove from saved' : 'Save for later'}
    >
      <Heart
        className={cn('w-5 h-5 transition-colors', saved ? 'fill-brand-coral text-brand-coral' : 'text-brand-slate hover:text-brand-coral')}
      />
    </button>
  );
}
