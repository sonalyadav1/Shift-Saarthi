'use client';

interface LanguageSelectorProps {
  selected: string;
  onChange: (langCode: string) => void;
}

const languages = [
  { label: 'English', code: 'en-US' },
  { label: 'Hindi', code: 'hi-IN' },
  { label: 'Hinglish', code: 'en-IN' },
  { label: 'Tamil', code: 'ta-IN' },
  { label: 'Telugu', code: 'te-IN' },
];

export function LanguageSelector({ selected, onChange }: LanguageSelectorProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Recording Language</h3>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => onChange(lang.code)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
              selected === lang.code
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
