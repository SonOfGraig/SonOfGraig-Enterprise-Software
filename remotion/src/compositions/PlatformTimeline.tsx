import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { loopSin01, masterFade } from '../lib/anim';

export type PlatformTimelineProps = { theme: ThemeName };

type Milestone = {
  label: string;
  detail: string;
  x: number; // 0..1 along the track
  variant: 'now' | 'soon' | 'future';
};

const MILESTONES: Milestone[] = [
  { label: 'Services', detail: '18 → 5 collapse', x: 0.04, variant: 'now' },
  { label: 'RAG Studio', detail: 'Q4 2026 · GA', x: 0.22, variant: 'now' },
  { label: 'Agent Builder', detail: 'Q1 2027 · Beta', x: 0.40, variant: 'soon' },
  { label: 'Cloud Console', detail: 'Q2 2027 · GA', x: 0.55, variant: 'soon' },
  { label: 'Analytics Studio', detail: 'Q2 2027 · GA', x: 0.66, variant: 'soon' },
  { label: 'Governance Hub', detail: 'Q3 2027 · GA', x: 0.80, variant: 'future' },
  { label: 'Africa expansion', detail: 'NG · KE · 2028', x: 0.96, variant: 'future' },
];

const PHASES = [
  { label: 'Phase 1', from: 0.0, to: 0.30, color: '#0B9EDE' },
  { label: 'Phase 2', from: 0.30, to: 0.72, color: '#F97316' },
  { label: 'Phase 3', from: 0.72, to: 1.0, color: '#7C3AED' },
];

export const PlatformTimeline: React.FC<PlatformTimelineProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  const trackY = 460;
  const trackLeft = 80;
  const trackRight = width - 80;
  const trackWidth = trackRight - trackLeft;

  // Playhead moves left→right over the run phase, then loops via masterFade.
  const playT = interpolate(frame, [60, durationInFrames - 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const playX = trackLeft + playT * trackWidth;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="The roadmap"
        title="Services today."
        titleLine2="Software tomorrow."
      />

      {/* Phase strips */}
      {PHASES.map((p, i) => {
        const x = trackLeft + p.from * trackWidth;
        const w = (p.to - p.from) * trackWidth;
        const arrive = spring({ frame: frame - (24 + i * 12), fps, config: { damping: 14, stiffness: 110 } });
        return (
          <div
            key={p.label}
            style={{
              position: 'absolute',
              left: x,
              top: trackY + 30,
              width: w,
              height: 6,
              background: p.color,
              borderRadius: 999,
              opacity: arrive * 0.85,
              transform: `scaleX(${arrive})`,
              transformOrigin: 'left center',
            }}
          />
        );
      })}

      {/* Track baseline */}
      <div
        style={{
          position: 'absolute',
          left: trackLeft,
          top: trackY,
          width: trackWidth,
          height: 2,
          background: t.borderMd,
        }}
      />

      {/* Quarter ticks */}
      {QUARTERS.map((q, i) => {
        const x = trackLeft + q.x * trackWidth;
        const arrive = spring({ frame: frame - (28 + i * 6), fps, config: { damping: 16, stiffness: 130 } });
        return (
          <div
            key={q.label}
            style={{
              position: 'absolute',
              left: x - 0.5,
              top: trackY - 6,
              opacity: arrive,
            }}
          >
            <div style={{ width: 1, height: 12, background: t.text4 }} />
            <span
              style={{
                position: 'absolute',
                left: -22,
                top: -28,
                fontFamily: fonts.mono,
                fontSize: 10,
                color: t.text4,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {q.label}
            </span>
          </div>
        );
      })}

      {/* Milestones */}
      {MILESTONES.map((m, i) => {
        const x = trackLeft + m.x * trackWidth;
        const arrive = spring({ frame: frame - (50 + i * 12), fps, config: { damping: 16, stiffness: 130 } });
        const reached = playT * trackWidth + trackLeft >= x;
        const variantColor = m.variant === 'now' ? t.success : m.variant === 'soon' ? t.blue : t.text3;
        const pulse = loopSin01(frame, 90, i * 0.5);

        return (
          <div
            key={m.label}
            style={{
              position: 'absolute',
              left: x,
              top: trackY,
              opacity: arrive,
              transform: `translateX(-50%) translateY(${(1 - arrive) * 8}px)`,
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                left: -7,
                top: -7,
                width: 14,
                height: 14,
                borderRadius: 999,
                background: reached ? variantColor : t.surface,
                border: `2px solid ${variantColor}`,
                boxShadow: reached ? `0 0 ${12 + pulse * 8}px ${variantColor}` : 'none',
              }}
            />
            {/* Card above */}
            <div
              style={{
                position: 'absolute',
                left: -80,
                top: -84,
                width: 160,
                padding: '8px 10px',
                background: t.bg,
                border: `1px solid ${t.borderMd}`,
                borderRadius: radius.md,
                boxShadow: `0 6px 16px ${t.nodeShadow}`,
              }}
            >
              <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: t.text1 }}>{m.label}</div>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text3, marginTop: 2 }}>{m.detail}</div>
            </div>
            {/* Connector line */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: -42,
                width: 1,
                height: 35,
                background: t.borderMd,
              }}
            />
          </div>
        );
      })}

      {/* Phase labels */}
      {PHASES.map((p, i) => {
        const x = trackLeft + ((p.from + p.to) / 2) * trackWidth;
        const arrive = spring({ frame: frame - (60 + i * 14), fps, config: { damping: 14, stiffness: 110 } });
        return (
          <div
            key={p.label}
            style={{
              position: 'absolute',
              left: x - 60,
              top: trackY + 60,
              width: 120,
              textAlign: 'center',
              opacity: arrive,
              transform: `translateY(${(1 - arrive) * 6}px)`,
            }}
          >
            <div style={{ display: 'inline-block' }}>
              <Chip theme={theme} frame={frame} variant={i === 0 ? 'blue' : i === 1 ? 'warn' : 'neutral'}>
                {p.label}
              </Chip>
            </div>
          </div>
        );
      })}

      {/* Playhead */}
      <div
        style={{
          position: 'absolute',
          left: playX - 2,
          top: trackY - 24,
          width: 4,
          height: 60,
          background: t.blue,
          borderRadius: 4,
          boxShadow: `0 0 16px ${t.blueGlow}`,
        }}
      />

      {/* Bottom caption */}
      <Caption theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

const QUARTERS = [
  { label: 'Q3 2026', x: 0.0 },
  { label: 'Q4 2026', x: 0.18 },
  { label: 'Q1 2027', x: 0.36 },
  { label: 'Q2 2027', x: 0.54 },
  { label: 'Q3 2027', x: 0.72 },
  { label: '2028', x: 0.94 },
];

const Caption: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  const o = interpolate(frame, [220, 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 56, bottom: 36, opacity: o, fontFamily: fonts.mono, fontSize: 13, color: t.text3 }}>
      18 services fund the platform · Targets · SOC 2 Type I → Type II → ISO 27001
    </div>
  );
};
