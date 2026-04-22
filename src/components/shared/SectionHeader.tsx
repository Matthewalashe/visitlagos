interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ label, title, description, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <span className="section-label">{label}</span>
      <h2 className="font-heading text-display-sm mt-3 mb-4 text-brand-charcoal">
        {title}
      </h2>
      {description && (
        <p className={`text-brand-slate text-lg max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
