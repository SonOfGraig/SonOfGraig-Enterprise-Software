import { Composition } from 'remotion';
import { AgentBuilder } from './compositions/AgentBuilder';
import { RagStudio } from './compositions/RagStudio';
import { GovernanceHub } from './compositions/GovernanceHub';
import { ClusterFunnel } from './compositions/ClusterFunnel';
import { CloudConsole } from './compositions/CloudConsole';
import { DataPipeline } from './compositions/DataPipeline';
import { AnalyticsStudio } from './compositions/AnalyticsStudio';
import { WorkflowEngine } from './compositions/WorkflowEngine';
import { SecurityPosture } from './compositions/SecurityPosture';
import { PricingTier } from './compositions/PricingTier';
import { PlatformTimeline } from './compositions/PlatformTimeline';
import { ServicesToSaaS } from './compositions/ServicesToSaaS';
import { PlatformCompounding } from './compositions/PlatformCompounding';
import { BlogHeroPillar } from './compositions/BlogHeroPillar';
import { BlogHeroCompliance } from './compositions/BlogHeroCompliance';
import { BlogHeroPlatform } from './compositions/BlogHeroPlatform';
import { BlogHeroGeneric } from './compositions/BlogHeroGeneric';
import { EditedClip } from './compositions/EditedClip';

const COMMON = {
  durationInFrames: 360,
  fps: 30,
  width: 1280,
  height: 720,
} as const;

type Slot = {
  baseId: string;
  component: React.FC<{ theme: 'light' | 'dark' }>;
};

const SLOTS: Slot[] = [
  { baseId: 'AgentBuilder', component: AgentBuilder },
  { baseId: 'RagStudio', component: RagStudio },
  { baseId: 'GovernanceHub', component: GovernanceHub },
  { baseId: 'ClusterFunnel', component: ClusterFunnel },
  { baseId: 'CloudConsole', component: CloudConsole },
  { baseId: 'DataPipeline', component: DataPipeline },
  { baseId: 'AnalyticsStudio', component: AnalyticsStudio },
  { baseId: 'WorkflowEngine', component: WorkflowEngine },
  { baseId: 'SecurityPosture', component: SecurityPosture },
  { baseId: 'PricingTier', component: PricingTier },
  { baseId: 'PlatformTimeline', component: PlatformTimeline },
  { baseId: 'ServicesToSaaS', component: ServicesToSaaS },
  { baseId: 'PlatformCompounding', component: PlatformCompounding },
  // Blog hero stills — exported via `remotion still`, not full renders.
  { baseId: 'BlogHeroPillar', component: BlogHeroPillar },
  { baseId: 'BlogHeroCompliance', component: BlogHeroCompliance },
  { baseId: 'BlogHeroPlatform', component: BlogHeroPlatform },
];

// Parameterised blog hero — props supplied per-post at render time via
// `remotion still BlogHeroGeneric<Theme> out.png --props='{…}'`. Defaults here
// just keep Studio previewable.
const GENERIC_DEFAULTS = {
  eyebrow: 'Insights · Strategy',
  title: 'Enterprise AI, built for South African conditions.',
  subtitle: 'POPIA-native. ZAR-priced. Built in South Africa.',
} as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Higgsfield footage edited on-brand. 6s @ 30fps. Swap `src`/`mediaType`
          to reuse the compositor for any future Higgsfield image or video. */}
      <Composition
        id="EditedClipAfricaThesis"
        component={EditedClip}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          theme: 'dark' as const,
          src: 'higgsfield/africa-thesis.png',
          mediaType: 'image' as const,
          eyebrow: 'SonOfGraig · The Thesis',
          title: 'Africa needs its own\nenterprise AI platform.',
          subtitle: 'POPIA-native. ZAR-priced. Built in South Africa.',
          brandUrl: 'sonofgraig.com',
        }}
      />
      {/* Veo 3.1 Lite clip (native voiceover) framed on-brand. Light treatment:
          brand eyebrow + footer only, headline omitted since the narration carries
          the message. mediaMuted=false lets Veo's audio play. */}
      <Composition
        id="EditedClipAfricaVeo"
        component={EditedClip}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          theme: 'dark' as const,
          src: 'higgsfield/africa-veo.mp4',
          mediaType: 'video' as const,
          mediaMuted: false,
          eyebrow: 'SonOfGraig · The Thesis',
          title: '',
          subtitle: '',
          brandUrl: 'sonofgraig.com',
        }}
      />
      <Composition
        id="BlogHeroGenericLight"
        component={BlogHeroGeneric}
        {...COMMON}
        defaultProps={{ theme: 'light' as const, ...GENERIC_DEFAULTS }}
      />
      <Composition
        id="BlogHeroGenericDark"
        component={BlogHeroGeneric}
        {...COMMON}
        defaultProps={{ theme: 'dark' as const, ...GENERIC_DEFAULTS }}
      />
      {SLOTS.flatMap((s) => [
        <Composition
          key={`${s.baseId}-Light`}
          id={`${s.baseId}Light`}
          component={s.component}
          {...COMMON}
          defaultProps={{ theme: 'light' as const }}
        />,
        <Composition
          key={`${s.baseId}-Dark`}
          id={`${s.baseId}Dark`}
          component={s.component}
          {...COMMON}
          defaultProps={{ theme: 'dark' as const }}
        />,
      ])}
    </>
  );
};
