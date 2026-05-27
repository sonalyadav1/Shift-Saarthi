'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { WorkloadTrend } from '@/lib/types';

interface WorkloadChartProps {
  data: WorkloadTrend[];
}

export function WorkloadChart({ data }: WorkloadChartProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-sm font-bold text-foreground mb-4">Daily Workload Trends</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
          <XAxis dataKey="date" tick={{ fill: 'oklch(0.65 0 0)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'oklch(0.65 0 0)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.12 0.02 240)',
              border: '1px solid oklch(0.20 0.02 240)',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="handoffs" fill="oklch(0.65 0.18 240)" name="Handoffs" radius={[4, 4, 0, 0]} />
          <Bar dataKey="tasks" fill="oklch(0.70 0.15 240)" name="Tasks" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
