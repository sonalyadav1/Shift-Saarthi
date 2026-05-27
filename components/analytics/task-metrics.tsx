'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TaskMetric } from '@/lib/types';

interface TaskMetricsProps {
  data: TaskMetric[];
}

export function TaskMetrics({ data }: TaskMetricsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-sm font-bold text-foreground mb-4">Task Duration by Category</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0 0)" />
          <XAxis type="number" tick={{ fill: 'oklch(0.65 0 0)', fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="category"
            width={120}
            tick={{ fill: 'oklch(0.65 0 0)', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.12 0.02 240)',
              border: '1px solid oklch(0.20 0.02 240)',
              borderRadius: '8px',
            }}
          />
          <Bar dataKey="avgMinutes" fill="oklch(0.60 0.15 200)" name="Avg Minutes" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
