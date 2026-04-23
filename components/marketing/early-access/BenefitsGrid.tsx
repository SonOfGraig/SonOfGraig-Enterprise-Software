import { Percent, Users, Rocket, Award } from 'lucide-react';

export function BenefitsGrid() {
  const benefits = [
    {
      icon: Percent,
      title: '70% off first year',
      desc: 'Significant discount in exchange for direct product feedback and use case co-development.'
    },
    {
      icon: Users,
      title: 'Direct founding team access',
      desc: 'Monthly calls with the engineering team. Your priorities directly influence sprint planning.'
    },
    {
      icon: Rocket,
      title: 'Your use case ships first',
      desc: 'The features you need are built first. Not roadmap promises -- binding co-development agreement.'
    },
    {
      icon: Award,
      title: 'Founding customer recognition',
      desc: 'Permanent credit on the platform. Case study co-authorship. Reference customer status.'
    }
  ];

  return (
    <section id="benefits" className="w-full py-[var(--sp-16)] bg-[var(--sg-surface)] border-y border-[var(--sg-border)]">
      <div className="max-w-[1080px] mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--sp-4)]">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div key={i} className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col">
                <div className="w-[36px] h-[36px] rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] flex items-center justify-center mb-4">
                  <Icon size={20} strokeWidth={1.5} className="text-[var(--sg-blue)]" />
                </div>
                <h3 className="text-h3 text-[var(--sg-text-1)] mb-3">{benefit.title}</h3>
                <p className="text-body text-[var(--sg-text-3)]">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
