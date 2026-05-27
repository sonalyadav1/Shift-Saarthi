export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Patient {
  id: string;
  name: string;
  patientId: string;
  bed: string;
  age: number;
  diagnosis: string;
  riskLevel: RiskLevel;
  vitals: string;
  lastHandoff: string;
}

export interface Alert {
  id: string;
  patientId: string;
  severity: RiskLevel;
  message: string;
  time: string;
}

export interface ShiftHandoff {
  id: string;
  patientId: string;
  fromNurse: string;
  toNurse: string;
  status: 'pending' | 'in-progress' | 'complete';
  time: string;
  summary: string;
}

export interface RiskAssessment {
  id: string;
  patientId: string;
  riskScore: number;
  factors: string[];
  recommendation: string;
}

export interface MultilingualSummary {
  id: string;
  patientId: string;
  language: string;
  summary: string;
  confidence: number;
}

export interface VoiceHandoff {
  clinicalSummary: string;
  medications: string;
  followUp: string;
  criticalNotes: string;
}

export interface HandoffTask {
  id: string;
  patientId: string;
  title: string;
  priority: RiskLevel;
  dueTime: string;
  completed: boolean;
}

export interface RiskEscalation {
  id: string;
  patientId: string;
  title: string;
  level: RiskLevel;
  description: string;
}

export interface WorkloadTrend {
  date: string;
  handoffs: number;
  tasks: number;
}

export interface TaskMetric {
  category: string;
  avgMinutes: number;
  count: number;
}

export interface RiskTrend {
  date: string;
  incidents: number;
  resolved: number;
}

export interface LanguageUsage {
  language: string;
  percentage: number;
  handoffs: number;
}

export interface ShiftEfficiency {
  shift: string;
  efficiency: number;
  handoffs: number;
  avgDuration: string;
}
