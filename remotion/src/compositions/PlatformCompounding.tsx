import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { loopSin01, masterFade } from '../lib/anim';

export type PlatformCompoundingProps = { theme: ThemeName };

// About · section 03 "Why platforms compound"
// Two animated curves on a chart canvas:
//   - amber (services) grows linearly: y = a*t
//   - blue  (platform) grows compounding: y = b*(1.6)^t
// Phase markers (vertical dashed lines) at Phase 1 Q4 2026, Phase 2 Q2 2027, Phase 3 2028
// Bottom: live R-value comparison

const STEPS = 60; // sample points across t = [0,1]
const SERVICES_END = 0.55; // height at t=1 (linear)
const PLATFORM_GROWTH = 5.0; // exponent steepness (higher = more compounding)

function servicesY(t: number): number {
  return t * SERVICES_END;
}

function platformY(t: number): number {
  // Smooth exponential, normalized to fit chart
  const raw = (Math.exp(t * PLATFORM_GROWTH) - 1) / (Math.exp(PLATFORM_GROWTH) - 1);
  return raw * 0.95;
}

export const PlatformCompounding: React.FC<PlatformCompoundingProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  // Chart bounds inside the composition.
  const chartLeft = 96;
  const chartTop = 220;
  const chartWidth = 1088;
  const chartHeight = 360;

  // Draw progress across the chart
  const drawT = interpolate(frame, [40, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const x = (frac: number) => chartLeft + frac * chartWidth;
  const y = (frac: number) => chartTop + chartHeight - frac * chartHeight;

  // Build path strings
  const servicesPoints: string[] = [];
  const platformPoints: string[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const tt = i / STEPS;
    servicesPoints.push(`${x(tt).toFixed(1)},${y(servicesY(tt)).toFixed(1)}`);
    platformPoints.push(`${x(tt).toFixed(1)},${y(platformY(tt)).toFixed(1)}`);
  }
  const servicesPath = `M${servicesPoints.join(' L')}`;
  const platformPath = `M${platformPoints.join(' L')}`;

  // Current "head" position for live dots
  const headX = drawT;

  // Phase markers
  const PHASES = [
    { tt: 0.25, label: 'PHASE 1', sub: 'AI Dev Platform' },
    { tt: 0.55, label: 'PHASE 2', sub: 'Cloud + Data' },
    { tt: 0.85, label: 'PHASE 3', sub: 'Africa expansion' },
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="ABOUT · WHY PLATFORMS COMPOUND"
        title="Linear vs."
        titleLine2="compounding."
      />

      {/* Chart frame */}
      <svg
        style={{ position: 'absolute', inset: 0 }}
        viewBox="0 0 1280 720"
      >
        {/* Y axis grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={chartLeft}
            y1={y(g)}
            x2={chartLeft + chartWidth}
            y2={y(g)}
            stroke={t.borderMd}
            strokeWidth={1}
            strokeDasharray="2 6"
            opacity={0.7}
          />
        ))}

        {/* Phase markers */}
        {PHASES.map((p, i) => {
          const visible = interpolate(frame, [60 + i * 18, 80 + i * 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const px = x(p.tt);
          return (
            <g key={p.label} opacity={visible}>
              <line
                x1={px}
                y1={chartTop}
                x2={px}
                y2={chartTop + chartHeight}
                stroke={t.text4}
                strokeWidth={1}
                strokeDasharray="3 5"
              />
            </g>
          );
        })}

        {/* Services line (amber, linear) */}
        <path
          d={servicesPath}
          stroke={t.amber}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={chartWidth * 1.3}
          strokeDashoffset={(1 - drawT) * chartWidth * 1.3}
        />

        {/* Platform line (blue, compounding) — fill below */}
        <path
          d={`${platformPath} L${x(1).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`}
          fill={t.blue}
          fillOpacity={0.10}
          clipPath="url(#draw-clip)"
        />
        <path
          d={platformPath}
          stroke={t.blue}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={chartWidth * 1.8}
          strokeDashoffset={(1 - drawT) * chartWidth * 1.8}
        />

        <defs>
          <clipPath id="draw-clip">
            <rect x={chartLeft} y={chartTop} width={drawT * chartWidth} height={chartHeight} />
          </clipPath>
        </defs>

        {/* Heads (live dots) */}
        {drawT > 0.05 && (
          <>
            <circle
              cx={x(headX)}
              cy={y(servicesY(headX))}
              r={5 + loopSin01(frame, 50) * 1.5}
              fill={t.amber}
            />
            <circle
              cx={x(headX)}
              cy={y(platformY(headX))}
              r={6 + loopSin01(frame, 50, 0.6) * 2}
              fill={t.blue}
            />
          </>
        )}
      </svg>

      {/* Phase labels (HTML for nicer text rendering) */}
      {PHASES.map((p, i) => {
        const visible = interpolate(frame, [60 + i * 18, 80 + i * 18], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const px = chartLeft + p.tt * chartWidth;
        return (
          <div
            key={p.label}
            style={{
              position: 'absolute',
              left: px - 70,
              top: chartTop - 38,
              width: 140,
              textAlign: 'center',
              opacity: visible,
              transform: `translateY(${(1 - visible) * 8}px)`,
            }}
          >
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text3, letterSpacing: 0.4, fontWeight: 600 }}>
              {p.label}
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, marginTop: 2 }}>
              {p.sub}
            </div>
          </div>
        );
      })}

      {/* Legend + live values */}
      <div
        style={{
          position: 'absolute',
          left: 96,
          right: 96,
          bottom: 56,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', gap: 28 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 3, background: t.amber, borderRadius: 2 }} />
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.text3, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Services · linear
              </span>
            </div>
            <CountUp
              theme={theme}
              frame={frame}
              from={0}
              to={Math.round(servicesY(1) * 14000) * 1000}
              startAt={40}
              endAt={240}
              prefix="R "
              thousands
              fontSize={24}
              color={t.amber}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 14, height: 3, background: t.blue, borderRadius: 2 }} />
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.text3, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Platform · compounding
              </span>
            </div>
            <CountUp
              theme={theme}
              frame={frame}
              from={0}
              to={Math.round(platformY(1) * 60000) * 1000}
              startAt={40}
              endAt={260}
              prefix="R "
              thousands
              fontSize={24}
              color={t.blue}
            />
          </div>
        </div>
        <Chip theme={theme} frame={frame} variant="blue" pulse>
          Phase 3 inflection
        </Chip>
      </div>
    </AbsoluteFill>
  );
};
