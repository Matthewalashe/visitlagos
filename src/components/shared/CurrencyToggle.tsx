import { useState, createContext, useContext, ReactNode } from 'react';
import { NGN_TO_USD_RATE } from '@/lib/constants';

type Currency = 'NGN' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (amountNGN: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'NGN',
  toggleCurrency: () => {},
  formatPrice: () => '',
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('NGN');

  const toggleCurrency = () => setCurrency(prev => (prev === 'NGN' ? 'USD' : 'NGN'));

  const formatPrice = (amountNGN: number) => {
    if (currency === 'USD') {
      return `$${Math.round(amountNGN / NGN_TO_USD_RATE).toLocaleString()}`;
    }
    return `₦${amountNGN.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export default function CurrencyToggle() {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <button
      onClick={toggleCurrency}
      className="flex items-center gap-1 px-2.5 py-1.5 border border-brand-charcoal/20 font-mono text-[0.65rem] uppercase tracking-wider hover:border-brand-gold hover:text-brand-gold transition-all"
      aria-label={`Switch to ${currency === 'NGN' ? 'USD' : 'NGN'}`}
    >
      <span className={currency === 'NGN' ? 'text-brand-gold font-bold' : 'text-brand-slate'}>₦</span>
      <span className="text-brand-slate">/</span>
      <span className={currency === 'USD' ? 'text-brand-gold font-bold' : 'text-brand-slate'}>$</span>
    </button>
  );
}
