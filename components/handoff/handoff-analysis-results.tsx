import type { HandoffAnalysis } from '@/app/api/handoff/route';
import { urgencyTheme } from '@/lib/risk-styles';
import { cn } from '@/lib/utils';
import { Activity, AlertTriangle, ClipboardList, Stethoscope } from 'lucide-react';
import { AlertChips } from '@/components/handoff/alert-chips';

interface HandoffAnalysisResultsProps {
  analysis: HandoffAnalysis;
}

export function HandoffAnalysisResults({ analysis }: HandoffAnalysisResultsProps) {
  const theme = urgencyTheme[analysis.urgencyLevel];
  const isCritical = analysis.urgencyLevel === 'critical';

  return (
    <section
      className={cn('rounded-xl border bg-card/40 overflow-hidden', theme.panel, theme.ring, 'ring-1')}
      aria-live="polite"
    >
      {/* Header strip */}
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-b border-border/60',
          isCritical && 'bg-red-500/10',
        )}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              'w-9 h-9 rounded-lg flex items-center justify-center border',
              theme.panel,
            )}
          >
            <Stethoscope className={cn('w-4 h-4', theme.heading)} />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">AI Handoff Analysis</h2>
            <p className="text-xs text-muted-foreground">Review before sign-off</p>
          </div>
        </div>
        <span
          className={cn(
            'inline-flex items-center gap-2 w-fit text-xs font-bold px-3 py-1.5 rounded-full border uppercase tracking-wide',
            theme.badge,
          )}
        >
          <span className={cn('w-2 h-2 rounded-full animate-pulse', theme.dot, !isCritical && 'animate-none')} />
          {theme.label} · {analysis.urgencyLevel}
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Summary */}
        <div
          className={cn(
            'rounded-lg border border-border/50 bg-background/40 pl-4 pr-4 py-4 border-l-4',
            theme.accent,
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className={cn('w-4 h-4', theme.heading)} />
            <h3 className="text-sm font-semibold text-foreground">Patient summary</h3>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">{analysis.patientSummary}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Urgency */}
          <div className={cn('rounded-lg border p-4', theme.panel)}>
            <div className="flex items-center gap-2 mb-3">
              <Activity className={cn('w-4 h-4', theme.heading)} />
              <h3 className="text-sm font-semibold text-foreground">Urgency</h3>
            </div>
            <p className={cn('text-2xl font-bold capitalize', theme.heading)}>
              {analysis.urgencyLevel}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{theme.label} priority</p>
            <div className="mt-3 h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all', theme.dot)}
                style={{
                  width:
                    analysis.urgencyLevel === 'low'
                      ? '25%'
                      : analysis.urgencyLevel === 'medium'
                        ? '50%'
                        : analysis.urgencyLevel === 'high'
                          ? '75%'
                          : '100%',
                }}
              />
            </div>
          </div>

          {/* Alerts — visually prominent */}
          <div
            className={cn(
              'rounded-lg border-2 p-4',
              theme.alertsPanel,
              isCritical && 'animate-none',
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className={cn('w-4 h-4', theme.heading)} />
              <h3 className={cn('text-sm font-bold', isCritical ? 'text-red-300' : 'text-foreground')}>
                Clinical alerts
              </h3>
            </div>
            <AlertChips symbols={analysis.alertSymbols} />
          </div>
        </div>

        {/* Tasks */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ClipboardList className={cn('w-4 h-4', theme.heading)} />
            <h3 className="text-sm font-semibold text-foreground">Action items</h3>
            <span className="text-xs text-muted-foreground ml-auto">
              {analysis.pendingTasks.length} task{analysis.pendingTasks.length !== 1 ? 's' : ''}
            </span>
          </div>
          {analysis.pendingTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {analysis.pendingTasks.map((task, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border px-3.5 py-3 transition-colors',
                    theme.taskCard,
                  )}
                >
                  <span
                    className={cn(
                      'flex-shrink-0 w-6 h-6 rounded-md text-[11px] font-bold flex items-center justify-center border',
                      theme.badge,
                    )}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/95 leading-snug pt-0.5">{task}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground rounded-lg border border-dashed border-border px-4 py-6 text-center">
              No tasks identified
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
