import { Badge } from '@/components/ui/Badge';

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  tags: string[];
}

const team: TeamMember[] = [
  {
    initials: 'SG',
    name: 'Founder & CEO',
    role: 'Strategy / Enterprise sales',
    tags: ['Strategy', 'Platform vision']
  },
  {
    initials: 'CTO',
    name: 'Chief Technology Officer',
    role: 'Architecture / Infrastructure',
    tags: ['Architecture', 'AI systems']
  },
  {
    initials: 'ML',
    name: 'Head of AI',
    role: 'LLMs / Agent systems',
    tags: ['LLMs', 'Fine-tuning']
  },
  {
    initials: 'UX',
    name: 'Head of Design',
    role: 'Platform UX / Brand',
    tags: ['Platform UX', 'Design systems']
  }
];

export function TeamSection() {
  return (
    <section className="w-full pb-[var(--sp-20)]">
      <div className="max-w-[1080px] mx-auto px-8">
        
        <div className="text-center mb-[var(--sp-12)]">
          <h2 className="text-h2 text-[var(--sg-text-1)]">Small team. Deep expertise.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--sp-6)]">
          {team.map((member, i) => (
            <div key={i} className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)] flex flex-col items-center text-center">
              
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(90deg, #0B9EDE 0%, #F97316 100%)' }}
              >
                <span className="font-display font-bold text-[20px] text-[var(--sg-text-inv)]">
                  {member.initials}
                </span>
              </div>
              
              <h3 className="text-h3 text-[var(--sg-text-1)] mb-1">{member.name}</h3>
              <div className="text-caption text-[var(--sg-text-3)] mb-6">{member.role}</div>
              
              <div className="mt-auto flex flex-wrap justify-center gap-2">
                {member.tags.map((tag, j) => (
                  <Badge key={j} variant="default">{tag}</Badge>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
