'use client';

import { useState } from 'react';
import { WorkloadChart } from '@/components/analytics/workload-chart';
import { TaskMetrics } from '@/components/analytics/task-metrics';
import { RiskTrends } from '@/components/analytics/risk-trends';
import { MultilingualUsage } from '@/components/analytics/multilingual-usage';
import { ShiftEfficiencyCards } from '@/components/analytics/shift-efficiency';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  mockWorkloadTrends,
  mockTaskMetrics,
  mockRiskTrends,
  mockMultilingualUsage,
  mockShiftEfficiency,
} from '@/lib/mock-data';

type TimeRange = '7d' | '30d' | '90d';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Healthcare Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Real-time insights into clinic workflow and efficiency
            </p>
          </div>

          <div className="flex gap-2 bg-card border border-border rounded-lg p-1 w-fit">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Handoffs</p>
                <p className="text-3xl font-bold text-foreground mt-2">247</p>
                <p className="text-xs text-green-400 mt-2">↑ 12% from last period</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">🔄</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Task Duration</p>
                <p className="text-3xl font-bold text-foreground mt-2">8.2m</p>
                <p className="text-xs text-green-400 mt-2">↓ 5% improvement</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Patient Risk Incidents</p>
                <p className="text-3xl font-bold text-red-400 mt-2">12</p>
                <p className="text-xs text-red-400 mt-2">↑ 3 critical alerts</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Clinic Efficiency</p>
                <p className="text-3xl font-bold text-foreground mt-2">85%</p>
                <p className="text-xs text-green-400 mt-2">Target: 90%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkloadChart data={mockWorkloadTrends} />
          <TaskMetrics data={mockTaskMetrics} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiskTrends data={mockRiskTrends} />
          <MultilingualUsage data={mockMultilingualUsage} />
        </div>

        <ShiftEfficiencyCards data={mockShiftEfficiency} />

        <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-lg p-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Performance Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-2">Workload Optimization</p>
              <p className="text-muted-foreground">
                ShiftSaarthi has reduced average task completion time by 15% while maintaining patient
                safety standards across all shifts.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Risk Management</p>
              <p className="text-muted-foreground">
                Early warning system identified 3 critical cases within the monitoring period. Proactive
                escalations prevent adverse events.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Multilingual Impact</p>
              <p className="text-muted-foreground">
                Hinglish support drives 45% of all voice handoffs, enabling natural communication and
                reducing handoff duration by 20%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
