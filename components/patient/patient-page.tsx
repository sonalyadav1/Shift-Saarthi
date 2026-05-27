"use client";
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { urgencyTheme } from '@/lib/risk-styles';
import { Button } from '@/components/ui/button';
import type { Patient } from '@/lib/types';

interface PatientPageProps {
  patient: Patient | null;
}

interface PatientData {
  transcriptHistory: string[];
  pendingTasks: string[];
  urgency: string;
  currentCondition: string;
}

const getInitialData = (patient: Patient | null): PatientData =>
  patient
    ? {
        transcriptHistory: [],
        pendingTasks: [],
        urgency: patient.riskLevel,
        currentCondition: patient.diagnosis,
      }
    : {
        transcriptHistory: [],
        pendingTasks: [],
        urgency: 'low',
        currentCondition: '',
      };

export default function PatientPage({ patient }: PatientPageProps) {
  const [data, setData] = useState<PatientData>(getInitialData(patient));
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!patient) return <div className="p-8 text-center text-lg">Patient not found.</div>;

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setData((prev) => ({
        transcriptHistory: [transcript, ...prev.transcriptHistory],
        urgency: ['low','medium','high','critical'][Math.floor(Math.random()*4)],
        currentCondition: transcript,
        pendingTasks: [
          ...prev.pendingTasks,
          `Follow up on: ${transcript.slice(0, 30)}...`,
        ],
      }));
      setTranscript('');
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <main className="max-w-3xl mx-auto p-4 sm:p-8 space-y-6">
      <div className="bg-card border border-border rounded-lg p-6 flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-bold text-foreground mb-1">{patient.name}</h2>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>Age: <b className="text-foreground">{patient.age}</b></span>
            <span>Bed: <b className="text-foreground">{patient.bed}</b></span>
            <span>Urgency: <span className={cn('px-2 py-1 rounded-full text-xs font-semibold', urgencyTheme[data.urgency as keyof typeof urgencyTheme]?.badge)}>{data.urgency}</span></span>
          </div>
          <div className="mt-2">
            <div className="font-semibold text-foreground">Current Condition</div>
            <div className="text-sm mt-1">{data.currentCondition}</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="transcript" className="text-sm font-semibold text-foreground">Add Transcript</label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            rows={4}
            className="w-full rounded-lg bg-muted/30 border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y min-h-[80px]"
            placeholder="Enter new handoff or update..."
            disabled={isAnalyzing}
          />
        </div>
        <Button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !transcript.trim()}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 min-h-11"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-bold text-foreground mb-2">Transcript History</h3>
          <ul className="space-y-2 text-sm">
            {data.transcriptHistory.length === 0 && <li className="text-muted-foreground">No transcripts yet.</li>}
            {data.transcriptHistory.map((t, i) => (
              <li key={i} className="bg-muted/30 rounded p-2 border border-border">{t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-bold text-foreground mb-2">Pending Tasks</h3>
          <ul className="space-y-2 text-sm">
            {data.pendingTasks.length === 0 && <li className="text-muted-foreground">No pending tasks.</li>}
            {data.pendingTasks.map((t, i) => (
              <li key={i} className="bg-muted/30 rounded p-2 border border-border">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
