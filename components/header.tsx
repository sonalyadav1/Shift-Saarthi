import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
            <svg
              className="w-5 h-5 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">ShiftSaarthi</span>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
            Features
          </a>
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition">
            Benefits
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
            Pricing
          </a>
          <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition">
            Contact
          </a>
        </div>

        {/* CTA Button */}
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/dashboard">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
}
