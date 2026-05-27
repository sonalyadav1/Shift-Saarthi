'use client';

import { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onTranscriptUpdate: (transcript: string) => void;
  onRecordingStateChange: (isRecording: boolean) => void;
  language?: string;
}

export function VoiceRecorder({
  onTranscriptUpdate,
  onRecordingStateChange,
  language = 'en-IN',
}: VoiceRecorderProps) {

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const startRecognition = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    let finalTranscript = '';

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      const full = (finalTranscript + interim).trim();
      setTranscript(full);
      onTranscriptUpdate(full);
    };

    recognition.onerror = (event: any) => {
      setIsRecording(false);
      onRecordingStateChange(false);
      recognition.stop();
    };

    recognition.onend = () => {
      setIsRecording(false);
      onRecordingStateChange(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
    onRecordingStateChange(true);
  };

  const stopRecognition = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
    onRecordingStateChange(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecognition();
    } else {
      startRecognition();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Voice Recorder</h3>
        <Button
          type="button"
          onClick={toggleRecording}
          className={isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}
        >
          {isRecording ? (
            <>
              <Square className="w-4 h-4 animate-pulse" />
              Listening…
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Start Recording
            </>
          )}
        </Button>
      </div>
      <div className="min-h-[160px] rounded-lg bg-muted/30 border border-border p-4">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-xs text-muted-foreground">Live Transcript</p>
          {isRecording && <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" aria-label="listening" />}
        </div>
        <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
          {transcript || 'Press Start Recording to begin voice handoff...'}
        </pre>
      </div>
      <div className="flex gap-2 pt-2">
        <span className="text-xs text-muted-foreground">Language: {language}</span>
      </div>
    </div>
  );
}
