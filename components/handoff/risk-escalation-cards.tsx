import type { RiskEscalation } from '@/lib/types';
import { riskBadgeStyles } from '@/lib/risk-styles';

interface RiskEscalationCardsProps {
  escalations: RiskEscalation[];
}

export function RiskEscalationCards({ escalations }: RiskEscalationCardsProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4">Risk Escalations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {escalations.map((item) => (
          <div key={item.id} className="bg-card border border-red-500/30 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">{item.title}</h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border capitalize ${riskBadgeStyles[item.level]}`}
              >
                {item.level}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
