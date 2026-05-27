'use client';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { LanguageUsage } from '@/lib/types';

const COLORS = [
  'oklch(0.65 0.18 240)',
  'oklch(0.60 0.15 200)',
  'oklch(0.55 0.12 180)',
  'oklch(0.50 0.10 220)',
];

interface MultilingualUsageProps {
  data: LanguageUsage[];
}

export function MultilingualUsage({ data }: MultilingualUsageProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-sm font-bold text-foreground mb-4">Multilingual Handoff Usage</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="language"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.12 0.02 240)',
              border: '1px solid oklch(0.20 0.02 240)',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
