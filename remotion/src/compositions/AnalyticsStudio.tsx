import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { Sparkline } from '../lib/ui/Sparkline';
import { loopSin01, masterFade } from '../lib/anim';

export type AnalyticsStudioProps = { theme: ThemeName };

// Seeded pseudo-random so each render is deterministic.
function seedSeries(seed: number, n: number, base: number, range: number): number[] {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    const trend = i / n;
    out.push(Math.max(0, Math.min(1, base + trend * range * 0.6 + (r - 0.5) * range * 0.4)));
  }
  return out;
}

const SERIES_A = seedSeries(11, 48, 0.3, 0.6);
const SERIES_B = seedSeries(29, 48, 0.5, 0.4);

const KPIS = [
  { label: 'MRR', value: 482300, prefix: 'R ', thousands: true, suffix: '' },
  { label: 'NPS', value: 64, prefix: '', thousands: false, suffix: '' },
  { label: 'Active orgs', value: 138, prefix: '', thousands: false, suffix: '' },
];

export const AnalyticsStudio: React.FC<AnalyticsStudioProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  const drawT = interpolate(frame, [40, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorT = interpolate(frame, [200, 320], [0.05, 0.95], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="Data & Analytics · Analytics Studio"
        title="From query"
        titleLine2="to dashboard in minutes."
      />

      {/* Main chart panel */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          top: 240,
          width: 760,
          height: 360,
          background: t.bg,
          border: `1px solid ${t.borderMd}`,
          borderRadius: radius.lg,
          padding: 22,
          boxShadow: `0 18px 44px ${t.nodeShadow}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Last 30 days
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 600, color: t.text1, marginTop: 2 }}>
              Activations vs. retention
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip theme={theme} frame={frame} variant="blue" pulse>
              Activations
            </Chip>
            <Chip theme={theme} frame={frame} variant="success">
              Retention
            </Chip>
          </div>
        </div>

        {/* Chart area */}
        <div style={{ position: 'relative', marginTop: 12 }}>
          <Sparkline theme={theme} frame={frame} values={SERIES_A} width={716} height={240} drawT={drawT} color={t.blue} />
          <div style={{ position: 'absolute', inset: 0 }}>
            <Sparkline theme={theme} frame={frame} values={SERIES_B} width={716} height={240} drawT={drawT} color={t.success} area={false} />
          </div>

          {/* Tooltip cursor */}
          {drawT > 0.5 ? (
            <div
              style={{
                position: 'absolute',
                left: cursorT * 716 - 1,
                top: 0,
                width: 2,
                height: 240,
                background: t.borderStr,
              }}
            />
          ) : null}
          {drawT > 0.5 ? (
            <div
              style={{
                position: 'absolute',
                left: cursorT * 716 + 8,
                top: 12,
                background: t.bg,
                border: `1px solid ${t.borderMd}`,
                borderRadius: radius.md,
                padding: '8px 10px',
                fontFamily: fonts.mono,
                fontSize: 10,
                color: t.text1,
                boxShadow: `0 6px 16px ${t.nodeShadow}`,
                minWidth: 90,
              }}
            >
              <div style={{ color: t.text3 }}>Day {Math.floor(cursorT * 30)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, background: t.blue, borderRadius: 999 }} />
                <span>
                  {Math.round(
                    SERIES_A[Math.min(SERIES_A.length - 1, Math.floor(cursorT * (SERIES_A.length - 1)))] * 1200,
                  )}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, background: t.success, borderRadius: 999 }} />
                <span>
                  {Math.round(
                    SERIES_B[Math.min(SERIES_B.length - 1, Math.floor(cursorT * (SERIES_B.length - 1)))] * 1200,
                  )}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* KPI cards — right */}
      <div style={{ position: 'absolute', right: 56, top: 240, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {KPIS.map((k, i) => {
          const arrive = spring({ frame: frame - (40 + i * 16), fps, config: { damping: 14, stiffness: 110 } });
          const pulse = loopSin01(frame, 110, i * 0.6);
          return (
            <div
              key={k.label}
              style={{
                width: 280,
                background: t.bg,
                border: `1px solid ${t.borderMd}`,
                borderRadius: radius.lg,
                padding: '16px 20px',
                opacity: arrive,
                transform: `translateY(${(1 - arrive) * 10 + pulse * -1.5}px)`,
                boxShadow: `0 12px 30px ${t.nodeShadow}`,
              }}
            >
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                {k.label}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                <CountUp
                  theme={theme}
                  frame={frame}
                  startAt={40 + i * 16}
                  endAt={170 + i * 16}
                  from={0}
                  to={k.value}
                  prefix={k.prefix}
                  thousands={k.thousands}
                  fontSize={30}
                />
                <Chip theme={theme} frame={frame} variant="success" pulse>
                  ↑ live
                </Chip>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
