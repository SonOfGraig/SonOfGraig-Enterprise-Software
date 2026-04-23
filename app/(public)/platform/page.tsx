import { PlatformHero } from '@/components/marketing/platform/PlatformHero';
import { BuildTimeline } from '@/components/marketing/platform/BuildTimeline';
import { WaitlistForm } from '@/components/marketing/platform/WaitlistForm';
import { ClusterStrip } from '@/components/marketing/home/ClusterStrip';

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <BuildTimeline />
      <div className="py-[var(--sp-16)]">
        <WaitlistForm />
      </div>
      <div id="clusters">
        <ClusterStrip />
      </div>
    </>
  );
}
