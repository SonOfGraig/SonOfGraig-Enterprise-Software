import { ShieldCheck, Globe, Users } from 'lucide-react';

export function TransitionStory() {
  return (
    <section className="w-full pb-[var(--sp-20)]">
      <div className="max-w-[1080px] mx-auto px-8">
        
        {/* Transition Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--sp-6)] mb-[var(--sp-12)]">
          
          {/* LEFT CARD */}
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] border-t-4 border-t-[var(--sg-blue)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm">
            <div className="text-label text-[var(--sg-blue)] mb-2">WHO WE WERE</div>
            <h2 className="text-h2 text-[var(--sg-text-1)] mb-4">Digital solutions agency</h2>
            <p className="font-sans text-[15px] text-[var(--sg-text-3)] leading-relaxed">
              For 6 years, we operated as a high-end digital solutions agency. We delivered 18 distinct service lines across enterprise AI, cloud architecture, and data engineering. We built deep domain expertise by solving complex, bespoke problems for large organizations, learning exactly what enterprises need to succeed with modern technology.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] border-t-4 border-t-[var(--sg-amber)] rounded-[var(--r-xl)] p-[var(--sp-8)] shadow-sm">
            <div className="text-label text-[var(--sg-amber)] mb-2">WHO WE ARE BECOMING</div>
            <h2 className="text-h2 text-[var(--sg-text-1)] mb-4">Enterprise AI software company</h2>
            <p className="font-sans text-[15px] text-[var(--sg-text-3)] leading-relaxed">
              We are actively transitioning our 18 services into 5 core SaaS clusters. Our ongoing service engagements are funding this build, and every project we deliver adds new IP to the platform. We are productising our expertise so that African enterprises can access world-class AI infrastructure without the bespoke agency price tag.
            </p>
          </div>

        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-6)]">
          
          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)]">
            <div className="w-10 h-10 rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] flex items-center justify-center mb-4">
              <ShieldCheck size={20} className="text-[var(--sg-blue)]" />
            </div>
            <h3 className="text-h3 text-[var(--sg-text-1)] mb-2">Honest positioning</h3>
            <p className="font-sans text-[14px] text-[var(--sg-text-3)]">
              We don&apos;t hide our transition. We are building in public, sharing our roadmap, and being transparent about what is ready today versus what is coming tomorrow.
            </p>
          </div>

          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)]">
            <div className="w-10 h-10 rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] flex items-center justify-center mb-4">
              <Globe size={20} className="text-[var(--sg-blue)]" />
            </div>
            <h3 className="text-h3 text-[var(--sg-text-1)] mb-2">African-first design</h3>
            <p className="font-sans text-[14px] text-[var(--sg-text-3)]">
              We build specifically for the regulatory, infrastructure, and business realities of the African enterprise market. POPIA compliance and local data residency are defaults, not add-ons.
            </p>
          </div>

          <div className="bg-[var(--sg-bg)] border border-[var(--sg-border)] rounded-[var(--r-xl)] p-[var(--sp-6)]">
            <div className="w-10 h-10 rounded-[var(--r-lg)] bg-[var(--sg-blue-glow)] flex items-center justify-center mb-4">
              <Users size={20} className="text-[var(--sg-blue)]" />
            </div>
            <h3 className="text-h3 text-[var(--sg-text-1)] mb-2">Built with customers</h3>
            <p className="font-sans text-[14px] text-[var(--sg-text-3)]">
              Our platform isn&apos;t built in a vacuum. It is forged in the fires of real enterprise deployments. Our founding customers directly shape the features we prioritize.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
