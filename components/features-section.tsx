export function FeaturesSection() {
  const features = [
    {
      title: 'Voice-First Interface',
      description: 'Hands-free operation optimized for busy clinical environments. Speak naturally and let AI handle the documentation.',
      icon: '🎤',
    },
    {
      title: 'Multilingual Support',
      description: 'Supports 30+ languages with real-time translation and context-aware terminology for global healthcare teams.',
      icon: '🌍',
    },
    {
      title: 'Real-Time Handoffs',
      description: 'Instant shift transfer with automated verification and escalation protocols to ensure nothing falls through the cracks.',
      icon: '⚡',
    },
    {
      title: 'Patient Safety',
      description: 'AI-powered error detection, critical alert highlighting, and compliance with healthcare data standards.',
      icon: '🛡️',
    },
    {
      title: 'Smart Analytics',
      description: 'Track handoff quality, identify patterns, and optimize processes with actionable insights and reporting.',
      icon: '📊',
    },
    {
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security, end-to-end encryption, and full audit trails for regulatory compliance.',
      icon: '🔒',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-transparent via-background to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features for Modern Healthcare
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform shift handoffs into seamless, efficient processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative p-6 rounded-lg border border-border/50 bg-card/30 backdrop-blur hover:border-primary/50 hover:bg-card/50 transition duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

              <div className="relative">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
