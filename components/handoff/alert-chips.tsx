import { cn } from '@/lib/utils';

export type ParsedAlert = {
  emoji: string;
  label: string | null;
  isCritical: boolean;
};

export function parseAlertSymbol(raw: string): ParsedAlert {
  const trimmed = raw.trim();
  const upper = trimmed.toUpperCase();

  if (upper.includes('CRITICAL')) {
    return { emoji: '🔴', label: 'CRITICAL', isCritical: true };
  }

  const emojiMatch = trimmed.match(/^(\p{Extended_Pictographic}+)\s*(.*)$/u);
  if (emojiMatch) {
    const label = emojiMatch[2]?.trim() || null;
    return { emoji: emojiMatch[1], label, isCritical: false };
  }

  if (/^[\p{Extended_Pictographic}]+$/u.test(trimmed)) {
    return { emoji: trimmed, label: null, isCritical: false };
  }

  return { emoji: '⚠️', label: trimmed, isCritical: false };
}

interface AlertChipsProps {
  symbols: string[];
  variant?: 'default' | 'compact';
  className?: string;
}

export function AlertChips({ symbols, variant = 'default', className }: AlertChipsProps) {
  if (symbols.length === 0) {
    return <p className="text-sm text-muted-foreground">No alerts flagged</p>;
  }

  const parsed = symbols.map(parseAlertSymbol);

  return (
    <ul
      className={cn(
        'flex flex-col gap-2 list-none m-0 p-0',
        variant === 'compact' && 'gap-1.5',
        className,
      )}
    >
      {parsed.map((alert, i) => (
        <li key={`${alert.emoji}-${alert.label}-${i}`} className="min-w-0">
          <div
            className={cn(
              'inline-flex items-center gap-2.5 max-w-full rounded-lg border px-3 py-2',
              alert.isCritical
                ? 'w-full text-red-300 border-red-500/50 bg-red-500/15 font-bold'
                : 'bg-background/40 border-border/80 text-foreground',
              variant === 'compact' && !alert.isCritical && 'px-2 py-1.5',
            )}
          >
            <span className="text-xl leading-none shrink-0" aria-hidden>
              {alert.emoji}
            </span>
            {alert.label && (
              <span
                className={cn(
                  'text-xs font-semibold capitalize truncate',
                  alert.isCritical ? 'text-red-200' : 'text-muted-foreground',
                )}
              >
                {alert.label}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
