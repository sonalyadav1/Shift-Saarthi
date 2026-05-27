import type { ShiftEfficiency } from '@/lib/types';

interface ShiftEfficiencyCardsProps {
  data: ShiftEfficiency[];
}

export function ShiftEfficiencyCards({ data }: ShiftEfficiencyCardsProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4">Shift Efficiency</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((shift) => (
          <div key={shift.shift} className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">{shift.shift}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold text-primary">{shift.efficiency}%</p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${shift.efficiency}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{shift.handoffs} handoffs</span>
                <span>Avg {shift.avgDuration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
