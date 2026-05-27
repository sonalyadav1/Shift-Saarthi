import type { RiskAssessment } from '@/lib/types';
import { mockPatients } from '@/lib/mock-data';

interface AIRiskIndicatorsProps {
  assessments: RiskAssessment[];
}

export function AIRiskIndicators({ assessments }: AIRiskIndicatorsProps) {
  const getPatientName = (patientId: string) =>
    mockPatients.find((p) => p.id === patientId)?.name ?? 'Unknown';

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4">AI Risk Indicators</h2>
      <div className="space-y-4">
        {assessments.map((assessment) => (
          <div key={assessment.id} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-foreground">{getPatientName(assessment.patientId)}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Risk Score</span>
                <span
                  className={`text-lg font-bold ${
                    assessment.riskScore >= 80
                      ? 'text-red-400'
                      : assessment.riskScore >= 50
                        ? 'text-orange-400'
                        : 'text-green-400'
                  }`}
                >
                  {assessment.riskScore}
                </span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full ${
                  assessment.riskScore >= 80
                    ? 'bg-red-500'
                    : assessment.riskScore >= 50
                      ? 'bg-orange-500'
                      : 'bg-green-500'
                }`}
                style={{ width: `${assessment.riskScore}%` }}
              />
            </div>
            <ul className="text-xs text-muted-foreground space-y-1 mb-2">
              {assessment.factors.map((factor) => (
                <li key={factor}>• {factor}</li>
              ))}
            </ul>
            <p className="text-sm text-primary">{assessment.recommendation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
