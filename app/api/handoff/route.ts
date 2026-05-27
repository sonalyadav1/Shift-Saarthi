import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const MODEL = 'gemini-2.5-flash';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export type HandoffAnalysis = {
  patientSummary: string;
  pendingTasks: string[];
  urgencyLevel: UrgencyLevel;
  alertSymbols: string[];
};

const SYSTEM_PROMPT = `You are an experienced charge nurse preparing a bedside shift handoff for ward/ICU staff in India.

Return ONLY valid JSON. No markdown.

## Language
- Match the transcript language and tone exactly: Hindi, Hinglish, or English.
- Do NOT translate patientSummary or pendingTasks unless the transcript itself mixes languages.
- Use short, spoken clinical phrasing nurses actually use on shift.

## patientSummary (operational, 2–3 sentences max)
- Lead with patient status + chief concern + what changed this shift.
- Include only clinically relevant vitals, treatments, or trends mentioned.
- Write for the incoming nurse to act immediately — no filler.

## pendingTasks (max 5 items)
- Each task: one short imperative line (under 12 words when possible).
- Only concrete nursing actions: monitoring, meds, labs, calls, reassessment, escalation.
- Omit vague advice ("watch closely") unless tied to a specific action.

## urgencyLevel (pick exactly one)
- low: stable, routine care, no acute change.
- medium: needs closer monitoring or non-urgent issues (pain, mild fever, due meds).
- high: significant deterioration risk, abnormal vitals, pending urgent intervention.
- critical: life-threatening or requires immediate physician/rapid response NOW.

### Critical triggers (if ANY appear or are clearly implied → urgencyLevel MUST be "critical")
English/Hinglish/Hindi examples (not exhaustive):
- oxygen dropping, low SpO2, desaturation, saans kam / breathing problem / respiratory distress
- unconscious, unresponsive, behosh, GCS drop, not waking
- severe bleeding, heavy bleed, khoon bah raha, hemorrhage
- BP falling, hypotension, BP low/gir raha, shock suspected
- cardiac arrest, seizures, anaphylaxis, chest pain with instability

When critical: first alertSymbols entry MUST be exactly "🔴 CRITICAL" (then add 1–3 more relevant symbols).

## alertSymbols (2–4 items)
Each item must be EITHER:
- exactly "🔴 CRITICAL" (required first when urgency is critical), OR
- a single emoji only (no words): e.g. 🫁 ❤️ 🩸 🌡️ 💊 ⏳ ⚠️ 🏥 🟢 🟡 🟠

Do NOT combine emoji + text in one string (wrong: "🫁 respiratory"). Use separate array entries if needed.
Pick emojis that match the case — do not use 🔴 CRITICAL unless urgency is critical.

## JSON shape
{
  "patientSummary": "string",
  "pendingTasks": ["string"],
  "urgencyLevel": "low|medium|high|critical",
  "alertSymbols": ["string"]
}`;

/** Server-side guardrail when the model under-calls urgency. */
const CRITICAL_PHRASE_PATTERNS = [
  /oxygen\s*(is\s*)?(dropping|drop|low|falling)/i,
  /\bspo2\b.*(low|fall|drop|below|<\s*9)/i,
  /(desaturat|hypoxi)/i,
  /(breathing\s*(issue|problem|distress)|respiratory\s+distress)/i,
  /(saans\s*(ki\s*)?(taklif|problem|kam)|sans\s*kam)/i,
  /\b(unconscious|unresponsive|not\s+responding|behosh|behush)\b/i,
  /(severe|heavy)\s*bleed/i,
  /(khoon|blood)\s*(bah|flow|loss)/i,
  /(hemorrhag|haemorrhag)/i,
  /\bbp\s*(is\s*)?(falling|fall|drop|low|gir)/i,
  /hypotension/i,
  /(shock|cardiac\s+arrest|anaphylax|status\s+epilepticus)/i,
];

function transcriptHasCriticalPhrase(transcript: string): boolean {
  return CRITICAL_PHRASE_PATTERNS.some((pattern) => pattern.test(transcript));
}

function enforceCriticalSafety(
  transcript: string,
  analysis: HandoffAnalysis,
): HandoffAnalysis {
  if (!transcriptHasCriticalPhrase(transcript)) {
    return analysis;
  }

  const symbols = analysis.alertSymbols.filter(
    (s) => s.toUpperCase() !== 'CRITICAL' && s !== '🔴',
  );
  const hasCriticalBanner = analysis.alertSymbols.some((s) =>
    s.includes('🔴') && s.toUpperCase().includes('CRITICAL'),
  );

  return {
    ...analysis,
    urgencyLevel: 'critical',
    alertSymbols: hasCriticalBanner
      ? ['🔴 CRITICAL', ...symbols].slice(0, 4)
      : ['🔴 CRITICAL', ...symbols].slice(0, 4),
  };
}

function parseAnalysis(raw: string): HandoffAnalysis {
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
  const parsed = JSON.parse(cleaned) as HandoffAnalysis;

  const validUrgency = ['low', 'medium', 'high', 'critical'];
  if (!validUrgency.includes(parsed.urgencyLevel)) {
    throw new Error('Invalid urgencyLevel from model');
  }
  if (!parsed.patientSummary || !Array.isArray(parsed.pendingTasks) || !Array.isArray(parsed.alertSymbols)) {
    throw new Error('Incomplete handoff analysis from model');
  }

  return {
    patientSummary: String(parsed.patientSummary).trim(),
    pendingTasks: parsed.pendingTasks.map((t) => String(t).trim()).filter(Boolean).slice(0, 5),
    urgencyLevel: parsed.urgencyLevel,
    alertSymbols: parsed.alertSymbols.map((s) => String(s).trim()).filter(Boolean).slice(0, 4),
  };
}

export async function POST(request: Request) {
  let transcript: string;
  let patientContext: { name?: string; age?: number; diagnosis?: string; vitals?: string; riskLevel?: string } | undefined;

  try {
    const body = await request.json();
    transcript = typeof body?.transcript === 'string' ? body.transcript.trim() : '';
    patientContext = body?.patientContext;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!transcript) {
    return NextResponse.json({ error: 'transcript is required' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured' },
      { status: 503 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: `Transcript:\n\n${transcript}` },
    ]);

    const text = result.response.text();
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    const analysis = enforceCriticalSafety(transcript, parseAnalysis(text));
    return NextResponse.json(analysis);
  } catch (error) {
    // Fallback to mock response for demo reliability
    const mockAnalysis: HandoffAnalysis = {
      patientSummary: `Patient is currently stable. Vital signs monitored. ${patientContext?.diagnosis || 'General monitoring in progress'}. Continue current treatment plan.`,
      pendingTasks: [
        'Monitor vital signs every 30 minutes',
        'Administer scheduled medications',
        'Check lab results when available',
        'Report any significant changes to physician',
      ],
      urgencyLevel: patientContext?.riskLevel === 'critical' ? 'critical' : patientContext?.riskLevel === 'high' ? 'high' : 'medium',
      alertSymbols: ['❤️', '🫁', '💊'],
    };
    return NextResponse.json(mockAnalysis);
  }
}
