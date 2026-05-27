'use client';

import { useState, useEffect } from 'react';
import { Loader2, Sparkles, Plus } from 'lucide-react';
import type { HandoffAnalysis } from '@/app/api/handoff/route';
import { VoiceRecorder } from '@/components/handoff/voice-recorder';
import { LanguageSelector } from '@/components/handoff/language-selector';
import { HandoffPatientHeader } from '@/components/handoff/handoff-patient-header';
import { HandoffAnalysisResults } from '@/components/handoff/handoff-analysis-results';
import { Button } from '@/components/ui/button';
import { mockPatients } from '@/lib/mock-data';

interface HistoryEntry {
  text: string;
  timestamp: string;
}

const formatTime = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  return `${displayHours}:${displayMinutes} ${ampm}`;
};

const getStorageKey = (patientId: string): string => `handoff_history_${patientId}`;

const loadHistoryFromStorage = (patientId: string): HistoryEntry[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(getStorageKey(patientId));
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveHistoryToStorage = (patientId: string, history: HistoryEntry[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(patientId), JSON.stringify(history));
  } catch {
    // Fail silently in production
  }
};

export default function HandoffPage() {
  const [selectedPatientId, setSelectedPatientId] = useState('1');
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<HandoffAnalysis | null>(null);
  const [transcriptHistory, setTranscriptHistory] = useState<HistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const patient = mockPatients.find((p) => p.id === selectedPatientId) || mockPatients[0];

  // Load history from localStorage on mount and when patient changes
  useEffect(() => {
    const history = loadHistoryFromStorage(selectedPatientId);
    setTranscriptHistory(history);
    setAnalysis(null);
    setTranscript('');
    setIsLoaded(true);
  }, [selectedPatientId]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      saveHistoryToStorage(selectedPatientId, transcriptHistory);
    }
  }, [transcriptHistory, selectedPatientId, isLoaded]);

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: transcript,
          patientContext: {
            name: patient.name,
            age: patient.age,
            diagnosis: patient.diagnosis,
            vitals: patient.vitals,
            riskLevel: patient.riskLevel,
          },
        }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      const result = await response.json();
      setAnalysis(result);
      const newEntry: HistoryEntry = { text: transcript, timestamp: formatTime() };
      setTranscriptHistory((prev) => [newEntry, ...prev]);
      setTranscript('');
    } catch (error) {
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddToLog = () => {
    if (!transcript.trim()) return;
    const newEntry: HistoryEntry = { text: transcript, timestamp: formatTime() };
    setTranscriptHistory((prev) => [newEntry, ...prev]);
    setTranscript('');
  };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Patient Selection */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Select Patient</h3>
        <div className="flex flex-wrap gap-2">
          {mockPatients.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPatientId(p.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${
                selectedPatientId === p.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted/50 text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {p.name} ({p.bed})
            </button>
          ))}
        </div>
      </div>

      {/* Patient Header */}
      <HandoffPatientHeader patient={patient} />

      {/* Voice & Language */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VoiceRecorder
          language={selectedLanguage}
          onTranscriptUpdate={(text) => setTranscript(text)}
          onRecordingStateChange={() => {}}
        />
        <LanguageSelector selected={selectedLanguage} onChange={setSelectedLanguage} />
      </div>

      {/* Transcript Input */}
      <div className="bg-card border border-border rounded-lg p-6 space-y-4">
        <div>
          <label htmlFor="transcript" className="text-sm font-semibold text-foreground">
            Handoff Transcript
          </label>
          <textarea
            id="transcript"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={5}
            className="w-full mt-2 rounded-lg bg-muted/30 border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y min-h-[120px]"
            placeholder="Enter handoff notes or paste voice-to-text transcript..."
            disabled={isAnalyzing}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleAddToLog}
            disabled={!transcript.trim()}
            className="w-full sm:w-auto bg-muted hover:bg-muted/80 text-muted-foreground min-h-11"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Log
          </Button>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !transcript.trim()}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 min-h-11"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze & Summarize
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && <HandoffAnalysisResults analysis={analysis} />}

      {/* History */}
      {transcriptHistory.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Handoff History</h3>
          <ul className="space-y-2">
            {transcriptHistory.map((entry, i) => (
              <li key={i} className="bg-muted/30 rounded-lg p-3 border border-border text-sm text-foreground">
                <span className="text-primary font-semibold">{entry.timestamp}</span>
                <span className="text-muted-foreground mx-2">—</span>
                <span>{entry.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
