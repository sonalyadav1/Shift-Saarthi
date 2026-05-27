import Link from 'next/link';
import type { Patient } from '@/lib/types';
import { riskBadgeStyles } from '@/lib/risk-styles';

interface PatientOverviewProps {
  patients: Patient[];
}

export function PatientOverview({ patients }: PatientOverviewProps) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">Patient Overview</h2>
        <span className="text-sm text-muted-foreground">{patients.length} active</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {patients.map((patient) => (
            <Link
              key={patient.id}
              href="/handoff"
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition">
                    {patient.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {patient.patientId} · {patient.bed}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border capitalize ${riskBadgeStyles[patient.riskLevel]}`}
                >
                  {patient.riskLevel}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{patient.diagnosis}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{patient.vitals}</span>
                <span>Handoff: {patient.lastHandoff}</span>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
