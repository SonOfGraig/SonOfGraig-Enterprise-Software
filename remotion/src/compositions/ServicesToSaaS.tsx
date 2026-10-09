import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { cycleProgress, loopSin01, masterFade } from '../lib/anim';

export type ServicesToSaaSProps = { theme: ThemeName };

// About · section 02 "From hours to access"
// Left  : hourly invoices stacking up (linear)
// Middle: arrow morphing as IP/templates flow right
// Right : recurring SaaS seats appearing
// Bottom: ARR ticker counting up alongside services ticker plateau

const INVOICES = [
  { hours: 80, rate: 1850 },
  { hours: 120, rate: 1750 },
  { hours: 60, rate: 2100 },
  { hours: 95, rate: 1900 },
  { hours: 140, rate: 1700 },
];

const SEATS = [
  { tier: 'Starter', mrr: 4999 },
  { tier: 'Growth', mrr: 19999 },
  { tier: 'Growth', mrr: 19999 },
  { tier: 'Enterprise', mrr: 49999 },
];

export const ServicesToSaaS: React.FC<ServicesToSaaSProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  const trackY = height * 0.52;
  const leftX = width * 0.22;
  const rightX = width * 0.78;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="ABOUT · THE TRANSFORMATION"
        title="From hours."
        titleLine2="To access."
      />

      {/* Services side — left */}
      <div
        style={{
          position: 'absolute',
          left: leftX - 130,
          top: trackY - 130,
          width: 260,
          textAlign: 'center',
        }}
      >
        <Chip theme={theme} frame={frame} variant="warn">
          Services · hourly
        </Chip>
      </div>

      {INVOICES.map((inv, i) => {
        const arrive = spring({
          frame: frame - (24 + i * 12),
          fps,
          config: { damping: 14, stiffness: 110 },
        });
        const stackOffsetY = i * 14;
        const bob = loopSin01(frame, 120, i * 0.7) * 1.5;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: leftX - 110,
              top: trackY - 70 + stackOffsetY + bob,
              width: 220,
              padding: '10px 14px',
              background: t.bg,
              border: `1px solid ${t.borderMd}`,
              borderRadius: radius.md,
              boxShadow: `0 4px 12px ${t.nodeShadow}`,
              opacity: arrive,
              transform: `translateX(${(1 - arrive) * -30}px) scale(${0.92 + arrive * 0.08})`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.text3 }}>
              {inv.hours}h × R{inv.rate.toLocaleString()}
            </span>
            <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: t.text1 }}>
              R{(inv.hours * inv.rate).toLocaleString()}
            </span>
          </div>
        );
      })}

      {/* IP / templates flowing right */}
      {Array.from({ length: 14 }).map((_, i) => {
        const cycle = cycleProgress(frame, 100, -i * 7);
        const x = leftX + 140 + (rightX - leftX - 280) * cycle;
        const y = trackY + Math.sin(cycle * Math.PI * 2 + i) * 18;
        const op = interpolate(cycle, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - 4,
              top: y - 4,
              width: 8,
              height: 8,
              borderRadius: radius.xs,
              background: t.blue,
              boxShadow: `0 0 12px ${t.blue}`,
              opacity: op,
            }}
          />
        );
      })}

      {/* Arrow center */}
      <div
        style={{
          position: 'absolute',
          left: width / 2 - 70,
          top: trackY - 32,
          width: 140,
          textAlign: 'center',
          opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 6 }}>
          IP · templates · runbooks
        </div>
        <svg width={140} height={28} viewBox="0 0 140 28">
          <line x1={6} y1={14} x2={120} y2={14} stroke={t.blue} strokeWidth={2} strokeDasharray="4 4" />
          <polygon points="120,8 134,14 120,20" fill={t.blue} />
        </svg>
      </div>

      {/* SaaS side — right */}
      <div
        style={{
          position: 'absolute',
          left: rightX - 130,
          top: trackY - 130,
          width: 260,
          textAlign: 'center',
        }}
      >
        <Chip theme={theme} frame={frame} variant="success" pulse>
          SaaS · recurring
        </Chip>
      </div>

      {SEATS.map((s, i) => {
        const arrive = spring({
          frame: frame - (100 + i * 18),
          fps,
          config: { damping: 14, stiffness: 110 },
        });
        const stackOffsetY = i * 18;
        const bob = loopSin01(frame, 110, i * 0.5) * 1.5;
        const isRec = s.tier === 'Growth' && i === 1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: rightX - 110,
              top: trackY - 70 + stackOffsetY + bob,
              width: 220,
              padding: '12px 16px',
              background: t.bg,
              border: `${isRec ? 1.5 : 1}px solid ${isRec ? t.blue : t.borderMd}`,
              borderRadius: radius.lg,
              boxShadow: isRec
                ? `0 8px 20px ${t.blueGlow}, 0 0 0 ${loopSin01(frame, 90) * 3}px ${t.blueGlow}`
                : `0 4px 12px ${t.nodeShadow}`,
              opacity: arrive,
              transform: `translateX(${(1 - arrive) * 30}px) scale(${0.92 + arrive * 0.08})`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: t.text1 }}>
              {s.tier}
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.blue, fontWeight: 600 }}>
              R{s.mrr.toLocaleString()}/mo
            </span>
          </div>
        );
      })}

      {/* Bottom metric strip */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          right: 56,
          bottom: 56,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <div>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            Services · linear
          </div>
          <CountUp
            theme={theme}
            frame={frame}
            from={0}
            to={1850000}
            startAt={40}
            endAt={200}
            prefix="R "
            thousands
            fontSize={24}
            color={t.amber}
          />
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
            SaaS ARR · compounding
          </div>
          <CountUp
            theme={theme}
            frame={frame}
            from={0}
            to={94900}
            startAt={120}
            endAt={280}
            prefix="R "
            thousands
            suffix=" / mo"
            fontSize={24}
            color={t.success}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
