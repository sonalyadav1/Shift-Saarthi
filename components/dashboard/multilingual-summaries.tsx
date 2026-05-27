import type { MultilingualSummary } from '@/lib/types';
import { mockPatients } from '@/lib/mock-data';

interface MultilingualSummariesProps {
  summaries: MultilingualSummary[];
}

export function MultilingualSummaries({ summaries }: MultilingualSummariesProps) {
  const getPatientName = (patientId: string) =>
    mockPatients.find((p) => p.id === patientId)?.name ?? 'Unknown';

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-4">Multilingual Summaries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summaries.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">{getPatientName(item.patientId)}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/30 text-secondary-foreground">
                {item.language}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{item.summary}</p>
            <p className="text-xs text-muted-foreground">AI confidence: {item.confidence}%</p>
          </div>
        ))}
      </div>
    </section>
  );
}
