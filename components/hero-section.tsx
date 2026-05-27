import Link from 'next/link';
import { Button } from './ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-t from-accent/20 to-transparent rounded-full blur-3xl opacity-40" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-6 w-fit mx-auto">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs sm:text-sm font-medium text-primary">
              AI-Powered Healthcare Platform
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 leading-tight">
            Voice-First Multilingual Workflow Automation for{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Healthcare Shift Handoffs
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-balance text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Streamline communication between healthcare teams. Reduce handoff errors, improve patient safety, and enhance operational efficiency with AI-powered shift management.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/5"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-8 flex-wrap pt-8 border-t border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">500+</div>
              <p className="text-sm text-muted-foreground">Healthcare Facilities</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">98%</div>
              <p className="text-sm text-muted-foreground">Error Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <p className="text-sm text-muted-foreground">Daily Handoffs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
