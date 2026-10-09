import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { cycleProgress, loopSin01, masterFade } from '../lib/anim';

export type SecurityPostureProps = { theme: ThemeName };

const EVENTS = [
  { sev: 'low', label: 'Token rotation completed · iam.svc.account.42' },
  { sev: 'med', label: 'Anomalous login · 41.123.x.x · blocked' },
  { sev: 'low', label: 'SBOM scan · 0 critical CVEs' },
  { sev: 'high', label: 'Excess perms detected · revoked · usr.0091' },
  { sev: 'low', label: 'MTLS handshake · 100% success last 24h' },
  { sev: 'med', label: 'Geo-fence: write blocked outside af-south-1' },
] as const;

export const SecurityPosture: React.FC<SecurityPostureProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  const radarCX = 270;
  const radarCY = 460;
  const radarR = 150;
  const sweepAngle = (frame / 90) * Math.PI * 2; // one rotation per 3s
  const sweepX = radarCX + Math.cos(sweepAngle) * radarR;
  const sweepY = radarCY + Math.sin(sweepAngle) * radarR;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} grid={false} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="Cloud & DevOps · Security Posture"
        title="Zero-trust."
        titleLine2="Always-on audit."
      />

      {/* Radar panel */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          top: 240,
          width: 460,
          height: 360,
          background: t.bg,
          border: `1px solid ${t.borderMd}`,
          borderRadius: radius.lg,
          boxShadow: `0 16px 40px ${t.nodeShadow}`,
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 14, left: 16 }}>
          <Chip theme={theme} frame={frame} variant="success" pulse>
            Posture · Strong
          </Chip>
        </div>
        <div style={{ position: 'absolute', top: 14, right: 16 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4 }}>Live</span>
        </div>

        <svg width={460} height={360} viewBox="0 0 460 360" style={{ position: 'absolute', inset: 0 }}>
          {/* Concentric rings */}
          {[1, 0.66, 0.33].map((r, i) => (
            <circle
              key={i}
              cx={radarCX - 56}
              cy={radarCY - 240}
              r={radarR * r}
              fill="none"
              stroke={t.borderMd}
              strokeWidth={1}
              strokeDasharray="2 4"
            />
          ))}
          {/* Cross-hairs */}
          <line x1={radarCX - 56 - radarR} y1={radarCY - 240} x2={radarCX - 56 + radarR} y2={radarCY - 240} stroke={t.borderMd} strokeWidth={1} />
          <line x1={radarCX - 56} y1={radarCY - 240 - radarR} x2={radarCX - 56} y2={radarCY - 240 + radarR} stroke={t.borderMd} strokeWidth={1} />

          {/* Sweep line */}
          <line
            x1={radarCX - 56}
            y1={radarCY - 240}
            x2={sweepX - 56}
            y2={sweepY - 240}
            stroke={t.blue}
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.8}
          />
          {/* Sweep fan (faded) */}
          {Array.from({ length: 12 }).map((_, k) => {
            const a = sweepAngle - (k / 12) * 0.6;
            const x = (radarCX - 56) + Math.cos(a) * radarR;
            const y = (radarCY - 240) + Math.sin(a) * radarR;
            return (
              <line
                key={k}
                x1={radarCX - 56}
                y1={radarCY - 240}
                x2={x}
                y2={y}
                stroke={t.blue}
                strokeWidth={1}
                opacity={(1 - k / 12) * 0.18}
              />
            );
          })}

          {/* Threats — fixed positions, pulse when sweep approaches */}
          {THREATS.map((tt, i) => {
            const tx = (radarCX - 56) + Math.cos(tt.a) * radarR * tt.r;
            const ty = (radarCY - 240) + Math.sin(tt.a) * radarR * tt.r;
            const ang = ((sweepAngle - tt.a + Math.PI * 8) % (Math.PI * 2));
            const close = ang < 0.5 ? (1 - ang / 0.5) : 0;
            const color = tt.sev === 'high' ? '#DC2626' : tt.sev === 'med' ? t.amber : t.text3;

            return (
              <g key={i}>
                <circle cx={tx} cy={ty} r={4 + close * 8} fill={color} opacity={0.18 + close * 0.6} />
                <circle cx={tx} cy={ty} r={3} fill={color} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Shield + KPIs — right top */}
      <div
        style={{
          position: 'absolute',
          right: 56,
          top: 240,
          width: 400,
          background: t.bg,
          border: `1px solid ${t.borderMd}`,
          borderRadius: radius.lg,
          padding: 22,
          boxShadow: `0 16px 40px ${t.nodeShadow}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Shield theme={theme} frame={frame} fps={fps} />
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
              Posture score
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <CountUp theme={theme} frame={frame} startAt={30} endAt={180} from={0} to={94} suffix="" fontSize={36} />
              <span style={{ fontFamily: fonts.mono, fontSize: 12, color: t.text3 }}>/ 100</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
          <KPI theme={theme} frame={frame} label="MTTR" value="6.2 min" />
          <KPI theme={theme} frame={frame} label="Coverage" value="100%" />
          <KPI theme={theme} frame={frame} label="Open CVEs" value="0" success />
          <KPI theme={theme} frame={frame} label="MFA" value="Required" success />
        </div>
      </div>

      {/* Event log — right bottom */}
      <EventLog theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

const THREATS = [
  { a: 0.7, r: 0.85, sev: 'med' as const },
  { a: 2.1, r: 0.55, sev: 'low' as const },
  { a: 3.4, r: 0.78, sev: 'high' as const },
  { a: 4.7, r: 0.40, sev: 'low' as const },
  { a: 5.7, r: 0.62, sev: 'med' as const },
];

const Shield: React.FC<{ theme: ThemeName; frame: number; fps: number }> = ({ theme, frame, fps }) => {
  const t = themes[theme];
  const arrive = spring({ frame: frame - 14, fps, config: { damping: 14, stiffness: 110 } });
  const pulse = loopSin01(frame, 90);

  return (
    <svg width={54} height={62} viewBox="0 0 54 62" style={{ opacity: arrive, transform: `scale(${0.9 + arrive * 0.1})` }}>
      <defs>
        <linearGradient id="shield-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.blue} stopOpacity="0.22" />
          <stop offset="100%" stopColor={t.blue} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M27 2 L50 12 V32 C50 48 38 56 27 60 C16 56 4 48 4 32 V12 Z"
        fill="url(#shield-grad)"
        stroke={t.blue}
        strokeWidth={1.8}
      />
      <circle cx={27} cy={32} r={4 + pulse * 3} fill={t.blue} opacity={0.4 + pulse * 0.6} />
    </svg>
  );
};

const KPI: React.FC<{ theme: ThemeName; frame: number; label: string; value: string; success?: boolean }> = ({
  theme,
  frame,
  label,
  value,
  success,
}) => {
  const t = themes[theme];
  return (
    <div
      style={{
        padding: '10px 12px',
        background: t.surface,
        borderRadius: radius.md,
        border: `1px solid ${t.border}`,
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 9, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 600, color: success ? t.success : t.text1, marginTop: 4 }}>
        {value}
      </div>
    </div>
  );
};

const EventLog: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  const VIS = 4;
  const SHIFT = 50;
  const idxFloat = frame / SHIFT;
  const idx = Math.floor(idxFloat);
  const yOff = (idxFloat - idx) * 22;

  return (
    <div
      style={{
        position: 'absolute',
        right: 56,
        bottom: 56,
        width: 400,
        height: 152,
        background: t.bg,
        border: `1px solid ${t.borderMd}`,
        borderRadius: radius.lg,
        overflow: 'hidden',
        boxShadow: `0 16px 40px ${t.nodeShadow}`,
      }}
    >
      <div style={{ padding: '8px 14px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Events
        </span>
        <Chip theme={theme} frame={frame} variant="success" pulse>
          Live
        </Chip>
      </div>
      <div style={{ position: 'relative', height: 110, overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${-yOff}px)`, padding: '8px 14px' }}>
          {Array.from({ length: VIS + 1 }).map((_, i) => {
            const ev = EVENTS[(idx + i) % EVENTS.length];
            const sevColor = ev.sev === 'high' ? '#DC2626' : ev.sev === 'med' ? t.amber : t.success;
            return (
              <div key={i} style={{ display: 'flex', gap: 10, paddingBlock: 4, fontFamily: fonts.mono, fontSize: 11 }}>
                <span
                  style={{
                    width: 32,
                    color: sevColor,
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {ev.sev}
                </span>
                <span style={{ color: t.text1, flex: 1 }}>{ev.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
