import type { Patient } from '@/lib/types';
import { riskBadgeStyles } from '@/lib/risk-styles';

interface HandoffPatientHeaderProps {
  patient: Patient;
}

export function HandoffPatientHeader({ patient }: HandoffPatientHeaderProps) {
  return (
    <div className="bg-card border border-primary/30 rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{patient.name}</h2>
          <p className="text-muted-foreground mt-1">
            {patient.patientId} · {patient.bed} · Age {patient.age}
          </p>
          <p className="text-sm text-muted-foreground mt-2">{patient.diagnosis}</p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2">
          <span
            className={`text-sm px-3 py-1 rounded-full border capitalize ${riskBadgeStyles[patient.riskLevel]}`}
          >
            {patient.riskLevel} risk
          </span>
          <p className="text-sm text-muted-foreground">{patient.vitals}</p>
        </div>
      </div>
    </div>
  );
}
