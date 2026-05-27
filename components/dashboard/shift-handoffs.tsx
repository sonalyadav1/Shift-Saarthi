import type { ShiftHandoff } from '@/lib/types';
import { mockPatients } from '@/lib/mock-data';

interface ShiftHandoffsProps {
  handoffs: ShiftHandoff[];
}

const statusStyles: Record<ShiftHandoff['status'], string> = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  'in-progress': 'bg-primary/20 text-primary',
  complete: 'bg-green-500/20 text-green-400',
};

export function ShiftHandoffs({ handoffs }: ShiftHandoffsProps) {
  const getPatientName = (patientId: string) =>
    mockPatients.find((p) => p.id === patientId)?.name ?? 'Unknown';

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4">Shift Handoffs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {handoffs.map((handoff) => (
          <div key={handoff.id} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-foreground">{getPatientName(handoff.patientId)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusStyles[handoff.status]}`}>
                {handoff.status.replace('-', ' ')}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{handoff.summary}</p>
            <div className="text-xs text-muted-foreground flex justify-between">
              <span>{handoff.fromNurse} → {handoff.toNurse}</span>
              <span>{handoff.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
