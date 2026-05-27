import type { RiskLevel } from './types';

export const riskBadgeStyles: Record<RiskLevel, string> = {
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const riskDotStyles: Record<RiskLevel, string> = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
};

export const urgencyTheme: Record<
  RiskLevel,
  {
    label: string;
    badge: string;
    dot: string;
    panel: string;
    accent: string;
    ring: string;
    heading: string;
    taskCard: string;
    alertsPanel: string;
  }
> = {
  low: {
    label: 'Stable',
    badge: riskBadgeStyles.low,
    dot: riskDotStyles.low,
    panel: 'border-green-500/30 bg-green-500/[0.07]',
    accent: 'border-l-green-500',
    ring: 'ring-green-500/20',
    heading: 'text-green-400',
    taskCard: 'border-green-500/20 bg-green-500/[0.04] hover:border-green-500/35',
    alertsPanel: 'border-green-500/25 bg-gradient-to-br from-green-500/10 to-transparent',
  },
  medium: {
    label: 'Monitor',
    badge: riskBadgeStyles.medium,
    dot: riskDotStyles.medium,
    panel: 'border-yellow-500/30 bg-yellow-500/[0.07]',
    accent: 'border-l-yellow-500',
    ring: 'ring-yellow-500/20',
    heading: 'text-yellow-400',
    taskCard: 'border-yellow-500/20 bg-yellow-500/[0.04] hover:border-yellow-500/35',
    alertsPanel: 'border-yellow-500/30 bg-gradient-to-br from-yellow-500/12 to-transparent',
  },
  high: {
    label: 'Priority',
    badge: riskBadgeStyles.high,
    dot: riskDotStyles.high,
    panel: 'border-orange-500/35 bg-orange-500/[0.08]',
    accent: 'border-l-orange-500',
    ring: 'ring-orange-500/25',
    heading: 'text-orange-400',
    taskCard: 'border-orange-500/25 bg-orange-500/[0.05] hover:border-orange-500/40',
    alertsPanel: 'border-orange-500/35 bg-gradient-to-br from-orange-500/12 to-transparent',
  },
  critical: {
    label: 'Critical',
    badge: riskBadgeStyles.critical,
    dot: riskDotStyles.critical,
    panel: 'border-red-500/50 bg-red-500/10 shadow-[0_0_24px_-6px_rgba(239,68,68,0.35)]',
    accent: 'border-l-red-500',
    ring: 'ring-red-500/30',
    heading: 'text-red-400',
    taskCard: 'border-red-500/30 bg-red-500/[0.06] hover:border-red-500/45',
    alertsPanel:
      'border-red-500/50 bg-gradient-to-br from-red-500/15 via-red-500/5 to-transparent shadow-[inset_0_1px_0_0_rgba(248,113,113,0.15)]',
  },
};
