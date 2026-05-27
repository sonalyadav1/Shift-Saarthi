'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { RiskTrend } from '@/lib/types';

interface RiskTrendsProps {
  data: RiskTrend[];
}

export function RiskTrends({ data }: RiskTrendsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-sm font-bold text-foreground mb-4">Patient Risk Incidents</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
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
          <Line
            type="monotone"
            dataKey="incidents"
            stroke="oklch(0.55 0.2 25)"
            name="Incidents"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="resolved"
            stroke="oklch(0.55 0.15 145)"
            name="Resolved"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
