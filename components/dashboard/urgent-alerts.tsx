import type { Alert } from '@/lib/types';
import { mockPatients } from '@/lib/mock-data';
import { riskBadgeStyles, riskDotStyles } from '@/lib/risk-styles';

interface UrgentAlertsProps {
  alerts: Alert[];
}

export function UrgentAlerts({ alerts }: UrgentAlertsProps) {
  const getPatientName = (patientId: string) =>
    mockPatients.find((p) => p.id === patientId)?.name ?? 'Unknown';

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4">Urgent Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="bg-card border border-border rounded-lg p-4 flex items-start gap-4"
          >
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${riskDotStyles[alert.severity]}`} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-medium text-foreground">{getPatientName(alert.patientId)}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border capitalize ${riskBadgeStyles[alert.severity]}`}
                >
                  {alert.severity}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">{alert.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
