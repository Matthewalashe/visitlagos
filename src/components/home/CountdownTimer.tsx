import { useState, useEffect } from 'react';
import { DETTY_DECEMBER_DATE } from '@/lib/constants';
import { getTimeUntil } from '@/lib/utils';

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeUntil(DETTY_DECEMBER_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeUntil(DETTY_DECEMBER_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Mins' },
    { value: time.seconds, label: 'Secs' },
  ];

  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brand-gold mb-3">
        Countdown to Detty December 2026
      </p>
      <div className="flex gap-3">
        {blocks.map(({ value, label }) => (
          <div
            key={label}
            className="w-16 md:w-20 py-2 md:py-3 bg-white/10 backdrop-blur-md border border-white/20 text-center"
          >
            <span className="block font-heading text-2xl md:text-3xl font-bold text-brand-cream">
              {String(value).padStart(2, '0')}
            </span>
            <span className="block font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/60">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
