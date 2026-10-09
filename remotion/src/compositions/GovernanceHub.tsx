import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { ProgressBar } from '../lib/ui/ProgressBar';
import { CountUp } from '../lib/ui/CountUp';
import { loopSin01, masterFade } from '../lib/anim';

export type GovernanceHubProps = { theme: ThemeName };

const POPIA_SECTIONS = [
  { code: 's11', label: 'Lawful processing', target: 1.0 },
  { code: 's19', label: 'Security safeguards', target: 0.97 },
  { code: 's26', label: 'Special PI', target: 0.94 },
];

const METRICS = [
  { label: 'Bias detected', value: 0.03, variant: 'success' as const, suffix: '%' },
  { label: 'Drift score', value: 0.12, variant: 'warn' as const, suffix: '' },
  { label: 'SHAP coverage', value: 99, variant: 'success' as const, suffix: '%' },
];

export const GovernanceHub: React.FC<GovernanceHubProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="AI Dev Platform · Governance Hub"
        title="Audit-ready AI."
        titleLine2="Out of the box."
      />

      {/* POPIA panel — left */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          top: 280,
          width: 420,
          background: t.bg,
          border: `1px solid ${t.borderMd}`,
          borderRadius: radius.lg,
          padding: 22,
          boxShadow: `0 16px 40px ${t.nodeShadow}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            POPIA compliance
          </span>
          <Chip theme={theme} frame={frame} variant="success" pulse>
            Section 11 · 19 · 26
          </Chip>
        </div>
        {POPIA_SECTIONS.map((s, i) => {
          const arrive = spring({ frame: frame - (60 + i * 14), fps, config: { damping: 16, stiffness: 130 } });
          return (
            <div
              key={s.code}
              style={{
                opacity: arrive,
                transform: `translateY(${(1 - arrive) * 8}px)`,
                display: 'grid',
                gridTemplateColumns: '60px 1fr 60px',
                alignItems: 'center',
                gap: 12,
                paddingBlock: 8,
              }}
            >
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.text3, letterSpacing: 0.4 }}>{s.code}</span>
              <span style={{ fontFamily: fonts.sans, fontSize: 13, color: t.text1 }}>{s.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                <ProgressBar
                  theme={theme}
                  frame={frame}
                  startAt={60 + i * 14}
                  endAt={120 + i * 14}
                  target={s.target}
                  width={70}
                  color={t.success}
                />
                <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.success, minWidth: 36, textAlign: 'right' }}>
                  <CountUp theme={theme} frame={frame} startAt={60 + i * 14} endAt={120 + i * 14} from={0} to={Math.round(s.target * 100)} suffix="%" fontSize={11} fontFamily={fonts.mono} fontWeight={600} color={t.success} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metric cards — right column */}
      <div style={{ position: 'absolute', right: 56, top: 280, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {METRICS.map((m, i) => {
          const arrive = spring({ frame: frame - (90 + i * 14), fps, config: { damping: 16, stiffness: 130 } });
          const pulse = loopSin01(frame, 90, i * 0.7);
          return (
            <div
              key={m.label}
              style={{
                width: 240,
                background: t.bg,
                border: `1px solid ${t.borderMd}`,
                borderRadius: radius.lg,
                padding: '14px 18px',
                opacity: arrive,
                transform: `translateY(${(1 - arrive) * 10 + pulse * -1.5}px) scale(${0.96 + arrive * 0.04})`,
                boxShadow: `0 8px 22px ${t.nodeShadow}`,
              }}
            >
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                {m.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                <CountUp
                  theme={theme}
                  frame={frame}
                  startAt={90 + i * 14}
                  endAt={170 + i * 14}
                  from={0}
                  to={m.value}
                  suffix={m.suffix}
                  digits={m.suffix === '%' ? 0 : 2}
                  fontSize={28}
                  color={m.variant === 'success' ? t.success : t.amber}
                />
                <Chip theme={theme} frame={frame} variant={m.variant} pulse>
                  {m.variant === 'success' ? 'Within bound' : 'Watch'}
                </Chip>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom — audit caption */}
      <Caption theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

const Caption: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  const o = interpolate(frame, [200, 230], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 56, bottom: 48, display: 'flex', alignItems: 'center', gap: 16, opacity: o }}>
      <Chip theme={theme} frame={frame} variant="success" pulse>
        Auto-generated audit pack
      </Chip>
      <span style={{ fontFamily: fonts.mono, fontSize: 13, color: t.text3 }}>
        Fairlearn · SHAP · Evidently · Langfuse
      </span>
    </div>
  );
};
