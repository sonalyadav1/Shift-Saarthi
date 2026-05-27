# ShiftSaarthi

## Overview

ShiftSaarthi is a multilingual, voice-first healthcare workflow automation platform designed to improve shift handoffs in hospitals and clinics.

The platform enables healthcare staff to record patient updates using natural speech in Hindi, Hinglish, or English. These handoffs are analyzed in real time using AI to generate structured summaries, identify clinical urgency, extract actionable tasks, and maintain continuity across shifts.

ShiftSaarthi is built for fast-paced and resource-constrained healthcare environments where verbal communication, language switching, and inconsistent documentation often lead to workflow gaps and information loss.

---

## Problem Statement

Shift handoffs are one of the most critical communication workflows in healthcare. In many hospitals and clinics, patient updates are still exchanged verbally or through unstructured notes, making the process inconsistent, time-consuming, and error-prone.

Healthcare staff often spend significant time documenting, repeating, and clarifying patient updates during shift changes, especially in understaffed or high-pressure environments. Communication gaps during these transitions can directly impact operational efficiency and patient safety.

Common challenges include:

- Loss of important clinical information during shift changes
- Time-consuming manual documentation and repetitive communication
- Language barriers between healthcare staff
- Lack of structured task tracking and urgency escalation
- Difficulty maintaining continuity across multiple shifts
- Increased cognitive load during busy clinical workflows

---

## Solution

ShiftSaarthi transforms spoken handoffs into structured operational workflows.

Healthcare staff can provide patient updates through voice input, and the platform automatically:

- Converts speech into text
- Preserves multilingual communication styles
- Generates concise patient summaries
- Detects urgency and risk indicators
- Extracts actionable follow-up tasks
- Maintains timestamped handoff history

The goal is to reduce communication gaps, improve shift continuity, and simplify healthcare workflows without increasing documentation burden.

---

## Key Features

### Voice-First Handoff Workflow
Supports real-time speech-to-text input for faster and more natural patient updates.

### Multilingual Communication Support
Designed for Hindi, Hinglish, and English workflows commonly used in real healthcare environments.

### AI-Powered Clinical Summaries
Uses Google Gemini API to generate concise and structured patient handoff summaries.

### Urgency Detection
Automatically identifies high-risk situations and categorizes urgency levels based on clinical context.

### Actionable Task Extraction
Extracts follow-up actions and pending tasks from handoff conversations.

### Handoff History Tracking
Maintains timestamped handoff logs for workflow continuity and review.

### Operational Dashboard
Provides a centralized interface for patient workflow monitoring and handoff management.

---

## Architecture / Workflow

1. Healthcare staff record patient handoffs using voice input.
2. Speech is transcribed in real time using the Web Speech API.
3. Transcripts are analyzed using Google Gemini API.
4. The AI generates:
   - structured patient summaries
   - urgency levels
   - alerts
   - actionable tasks
5. Processed handoffs are added to the workflow history.
6. Healthcare staff can review and continue shift coordination through the dashboard.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| TypeScript | Type-safe application development |
| Tailwind CSS | UI styling |
| Google Gemini API | AI-powered workflow analysis |
| Web Speech API | Real-time speech recognition |

---

## Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/ShiftSaarthi.git
cd ShiftSaarthi
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

You can generate a Gemini API key from Google AI Studio.

### Run the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---

## Usage Flow

1. Open the dashboard
2. Select or review a patient handoff workflow
3. Record or type a patient update
4. Analyze the transcript using AI
5. Review generated:
   - patient summary
   - urgency level
   - alerts
   - action items
6. Track handoff history and workflow continuity

---

## Project Structure

```text
app/                # Next.js app directory (routes, pages, API)
components/         # UI components
lib/                # Utilities, types, and mock data
hooks/              # Custom React hooks
public/             # Static assets
styles/             # Global styles
```

---

## Future Improvements

- Integration with EHR/HIS systems
- Secure cloud-based handoff storage
- Role-based authentication and permissions
- Expanded multilingual medical vocabulary support
- Mobile-first workflow enhancements
- Real-time collaboration across care teams

---

## Deployment

The project can be deployed using platforms that support Next.js applications, such as:

- Vercel
- Netlify
- Railway

For production deployment:

```bash
npm run build
```

---

## License

This project is licensed under the MIT License.

```