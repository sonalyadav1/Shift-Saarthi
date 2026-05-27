import type {
  Alert,
  HandoffTask,
  LanguageUsage,
  MultilingualSummary,
  Patient,
  RiskAssessment,
  RiskEscalation,
  RiskTrend,
  ShiftEfficiency,
  ShiftHandoff,
  TaskMetric,
  VoiceHandoff,
  WorkloadTrend,
} from './types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    patientId: 'P-1042',
    bed: 'ICU-12',
    age: 58,
    diagnosis: 'Post-operative cardiac monitoring',
    riskLevel: 'medium',
    vitals: 'BP 128/82, HR 78',
    lastHandoff: '2h ago',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    patientId: 'P-1087',
    bed: 'Ward-4B',
    age: 45,
    diagnosis: 'Type 2 Diabetes management',
    riskLevel: 'low',
    vitals: 'BP 120/75, HR 72',
    lastHandoff: '4h ago',
  },
  {
    id: '3',
    name: 'Sunita Devi',
    patientId: 'P-1103',
    bed: 'ICU-08',
    age: 67,
    diagnosis: 'Respiratory distress',
    riskLevel: 'high',
    vitals: 'SpO2 91%, RR 24',
    lastHandoff: '1h ago',
  },
  {
    id: '4',
    name: 'Amit Patel',
    patientId: 'P-1156',
    bed: 'ICU-03',
    age: 52,
    diagnosis: 'Sepsis - antibiotic therapy',
    riskLevel: 'critical',
    vitals: 'Temp 38.9°C, BP 95/60',
    lastHandoff: '30m ago',
  },
  {
    id: '5',
    name: 'Meera Joshi',
    patientId: 'P-1198',
    bed: 'Ward-2A',
    age: 34,
    diagnosis: 'Maternity - postpartum care',
    riskLevel: 'low',
    vitals: 'Stable',
    lastHandoff: '6h ago',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    patientId: '4',
    severity: 'critical',
    message: 'Blood pressure dropping - notify physician immediately',
    time: '5 min ago',
  },
  {
    id: 'a2',
    patientId: '3',
    severity: 'high',
    message: 'Oxygen saturation below threshold',
    time: '15 min ago',
  },
  {
    id: 'a3',
    patientId: '1',
    severity: 'medium',
    message: 'Scheduled medication due in 30 minutes',
    time: '20 min ago',
  },
];

export const mockShiftHandoffs: ShiftHandoff[] = [
  {
    id: 'h1',
    patientId: '4',
    fromNurse: 'Anita R.',
    toNurse: 'Vikram S.',
    status: 'in-progress',
    time: '30m ago',
    summary: 'Critical sepsis case - monitor vitals hourly',
  },
  {
    id: 'h2',
    patientId: '3',
    fromNurse: 'Priya M.',
    toNurse: 'Anita R.',
    status: 'pending',
    time: '1h ago',
    summary: 'Respiratory support - O2 at 4L/min',
  },
  {
    id: 'h3',
    patientId: '1',
    fromNurse: 'Vikram S.',
    toNurse: 'Priya M.',
    status: 'complete',
    time: '2h ago',
    summary: 'Post-op stable - continue cardiac monitoring',
  },
];

export const mockRiskAssessments: RiskAssessment[] = [
  {
    id: 'r1',
    patientId: '4',
    riskScore: 92,
    factors: ['Hypotension', 'Elevated temperature', 'Sepsis protocol active'],
    recommendation: 'Escalate to attending physician - consider ICU transfer',
  },
  {
    id: 'r2',
    patientId: '3',
    riskScore: 78,
    factors: ['Low SpO2', 'Increased respiratory rate'],
    recommendation: 'Increase O2 flow, repeat ABG in 2 hours',
  },
  {
    id: 'r3',
    patientId: '1',
    riskScore: 45,
    factors: ['Post-operative status', 'Stable vitals'],
    recommendation: 'Continue standard monitoring protocol',
  },
];

export const mockMultilingualSummaries: MultilingualSummary[] = [
  {
    id: 'm1',
    patientId: '4',
    language: 'Hinglish',
    summary: 'Patient ko fever hai, antibiotics continue karo, vitals har hour check karo',
    confidence: 94,
  },
  {
    id: 'm2',
    patientId: '3',
    language: 'Hindi',
    summary: 'सांस की तकलीफ - ऑक्सीजन 4L पर, SpO2 मॉनिटर करें',
    confidence: 91,
  },
];

export const mockVoiceHandoff: VoiceHandoff = {
  clinicalSummary:
    'Patient Amit Patel, ICU-03. Sepsis on broad-spectrum antibiotics. Temp 38.9°C, BP trending low at 95/60. Fluid resuscitation initiated.',
  medications:
    'Continue Piperacillin-Tazobactam 4.5g IV q6h. Hold Metformin. PRN Acetaminophen for fever >38.5°C.',
  followUp:
    'Repeat lactate in 4 hours. Blood cultures pending. Notify Dr. Mehta if BP <90/60.',
  criticalNotes:
    'Family notified of critical status. DNR status: Full code. Allergies: Penicillin (verified - current abx is safe).',
};

export const mockHandoffTasks: HandoffTask[] = [
  {
    id: 't1',
    patientId: '4',
    title: 'Repeat lactate level',
    priority: 'critical',
    dueTime: 'In 4 hours',
    completed: false,
  },
  {
    id: 't2',
    patientId: '4',
    title: 'Hourly vitals check',
    priority: 'high',
    dueTime: 'Ongoing',
    completed: false,
  },
  {
    id: 't3',
    patientId: '4',
    title: 'Review blood culture results',
    priority: 'medium',
    dueTime: 'When available',
    completed: false,
  },
];

export const mockRiskEscalations: RiskEscalation[] = [
  {
    id: 'e1',
    patientId: '4',
    title: 'Hemodynamic instability',
    level: 'critical',
    description: 'BP 95/60 and dropping. Fluid bolus administered. Physician notified.',
  },
];

export const mockWorkloadTrends: WorkloadTrend[] = [
  { date: 'May 11', handoffs: 14, tasks: 42 },
  { date: 'May 12', handoffs: 16, tasks: 38 },
  { date: 'May 13', handoffs: 18, tasks: 45 },
  { date: 'May 14', handoffs: 15, tasks: 40 },
  { date: 'May 15', handoffs: 17, tasks: 44 },
  { date: 'May 16', handoffs: 19, tasks: 48 },
  { date: 'May 17', handoffs: 16, tasks: 41 },
  { date: 'May 18', handoffs: 20, tasks: 50 },
  { date: 'May 19', handoffs: 18, tasks: 46 },
  { date: 'May 20', handoffs: 17, tasks: 43 },
  { date: 'May 21', handoffs: 19, tasks: 47 },
  { date: 'May 22', handoffs: 21, tasks: 52 },
  { date: 'May 23', handoffs: 18, tasks: 45 },
  { date: 'May 24', handoffs: 16, tasks: 42 },
  { date: 'May 25', handoffs: 15, tasks: 39 },
];

export const mockTaskMetrics: TaskMetric[] = [
  { category: 'Vitals Check', avgMinutes: 5, count: 120 },
  { category: 'Medication Admin', avgMinutes: 8, count: 85 },
  { category: 'Documentation', avgMinutes: 12, count: 95 },
  { category: 'Patient Assessment', avgMinutes: 15, count: 60 },
  { category: 'Handoff Recording', avgMinutes: 10, count: 45 },
];

export const mockRiskTrends: RiskTrend[] = [
  { date: 'May 11', incidents: 2, resolved: 2 },
  { date: 'May 12', incidents: 1, resolved: 1 },
  { date: 'May 13', incidents: 3, resolved: 2 },
  { date: 'May 14', incidents: 1, resolved: 1 },
  { date: 'May 15', incidents: 2, resolved: 2 },
  { date: 'May 16', incidents: 4, resolved: 3 },
  { date: 'May 17', incidents: 2, resolved: 2 },
  { date: 'May 18', incidents: 3, resolved: 3 },
  { date: 'May 19', incidents: 1, resolved: 1 },
  { date: 'May 20', incidents: 2, resolved: 2 },
  { date: 'May 21', incidents: 3, resolved: 2 },
  { date: 'May 22', incidents: 2, resolved: 2 },
  { date: 'May 23', incidents: 1, resolved: 1 },
  { date: 'May 24', incidents: 2, resolved: 2 },
  { date: 'May 25', incidents: 1, resolved: 0 },
];

export const mockMultilingualUsage: LanguageUsage[] = [
  { language: 'Hinglish', percentage: 45, handoffs: 111 },
  { language: 'English', percentage: 30, handoffs: 74 },
  { language: 'Hindi', percentage: 18, handoffs: 44 },
  { language: 'Other', percentage: 7, handoffs: 18 },
];

export const mockShiftEfficiency: ShiftEfficiency[] = [
  { shift: 'Morning (7AM-3PM)', efficiency: 88, handoffs: 82, avgDuration: '9.2m' },
  { shift: 'Evening (3PM-11PM)', efficiency: 85, handoffs: 95, avgDuration: '8.8m' },
  { shift: 'Night (11PM-7AM)', efficiency: 79, handoffs: 70, avgDuration: '10.1m' },
];
