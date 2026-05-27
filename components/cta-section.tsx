import Link from 'next/link';
import { Button } from './ui/button';

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl blur-3xl" />
        </div>

        <div className="relative rounded-2xl border border-primary/20 bg-card/50 backdrop-blur p-8 md:p-16 text-center">
          <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to transform your shift handoffs?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join healthcare teams worldwide who are reducing errors and improving patient safety with ShiftSaarthi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Link href="/dashboard">Start Free 14-Day Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 text-foreground hover:bg-primary/5"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required. Full access to all features.
          </p>
        </div>
      </div>
    </section>
  );
}
