// components/animations/SectionLabel.tsx
'use client';

interface SectionLabelProps {
  number: string;
  text: string;
  dark?: boolean;
}

export const SectionLabel = ({ number, text, dark = false }: SectionLabelProps) => {
  const styles = dark
    ? {
        label: 'text-white/60',
        line: 'bg-white/30',
        text: 'text-white/60'
      }
    : {
        label: 'text-gray-500',
        line: 'bg-gray-300',
        text: 'text-gray-500'
      };

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`text-[10px] uppercase tracking-[0.4em] ${styles.label}`}>
        [ {number} ]
      </span>
      <span className={`h-px w-10 ${styles.line}`} />
      <span className={`text-[10px] uppercase tracking-[0.4em] ${styles.text}`}>
        {text}
      </span>
    </div>
  );
};