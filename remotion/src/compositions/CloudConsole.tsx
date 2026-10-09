import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { Sparkline } from '../lib/ui/Sparkline';
import { cycleProgress, loopSin01, masterFade } from '../lib/anim';

export type CloudConsoleProps = { theme: ThemeName };

const LOG_LINES = [
  { code: 'INFO ', msg: 'eks-prod scaled 4 → 6 nodes' },
  { code: 'OK   ', msg: 'rag-studio canary 100% healthy' },
  { code: 'WARN ', msg: 'cpu p95 84% on agent-runner-2' },
  { code: 'OK   ', msg: 'cost guardrail < R23,400 / day' },
  { code: 'INFO ', msg: 'cron: nightly POPIA audit pack OK' },
  { code: 'OK   ', msg: 'iam: rotated 7 service keys' },
  { code: 'INFO ', msg: 'helm release governance-hub v0.42' },
];

const REGIONS = [
  { code: 'af-south-1', x: 0.36, y: 0.78, label: 'Cape Town', primary: true },
  { code: 'eu-west-1',  x: 0.48, y: 0.32, label: 'Ireland', primary: false },
  { code: 'us-east-1',  x: 0.20, y: 0.40, label: 'N. Virginia', primary: false },
];

export const CloudConsole: React.FC<CloudConsoleProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} grid={false} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="Cloud & DevOps · Cloud Console"
        title="Multi-cloud."
        titleLine2="One pane of glass."
      />

      {/* Map / globe panel — left */}
      <div
        style={{
          position: 'absolute',
          left: 56,
          top: 240,
          width: 540,
          height: 320,
          background: t.bg,
          border: `1px solid ${t.borderMd}`,
          borderRadius: radius.lg,
          overflow: 'hidden',
          boxShadow: `0 16px 40px ${t.nodeShadow}`,
        }}
      >
        {/* dot-grid map backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${t.borderMd} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
            opacity: 0.6,
          }}
        />
        {/* Pins */}
        {REGIONS.map((r, i) => {
          const arrive = spring({ frame: frame - (40 + i * 20), fps, config: { damping: 14, stiffness: 110 } });
          const pulse = loopSin01(frame, 80, i * 0.7);
          const pinX = r.x * 540;
          const pinY = r.y * 320;
          const color = r.primary ? t.blue : t.text3;

          return (
            <div key={r.code}>
              {r.primary ? (
                <div
                  style={{
                    position: 'absolute',
                    left: pinX - 30,
                    top: pinY - 30,
                    width: 60,
                    height: 60,
                    borderRadius: 999,
                    border: `2px solid ${t.blue}`,
                    opacity: (1 - pulse) * 0.6,
                    transform: `scale(${0.6 + pulse * 1.4})`,
                  }}
                />
              ) : null}
              <div
                style={{
                  position: 'absolute',
                  left: pinX - 6,
                  top: pinY - 6,
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: color,
                  boxShadow: r.primary ? `0 0 14px ${t.blue}` : `0 0 6px ${color}`,
                  opacity: arrive,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: pinX + 14,
                  top: pinY - 16,
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  color: r.primary ? t.blue : t.text3,
                  letterSpacing: 0.3,
                  textTransform: 'uppercase',
                  opacity: arrive,
                }}
              >
                {r.code}
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: pinX + 14,
                  top: pinY - 2,
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  color: t.text2,
                  opacity: arrive,
                }}
              >
                {r.label}
              </div>
            </div>
          );
        })}
        {/* Arc from primary to others */}
        <svg style={{ position: 'absolute', inset: 0 }} viewBox="0 0 540 320">
          {REGIONS.filter((r) => !r.primary).map((r, i) => {
            const primary = REGIONS.find((x) => x.primary)!;
            const x1 = primary.x * 540;
            const y1 = primary.y * 320;
            const x2 = r.x * 540;
            const y2 = r.y * 320;
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2 - 80;
            const drawT = interpolate(frame, [90 + i * 20, 150 + i * 20], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const totalLen = 420;
            return (
              <path
                key={r.code}
                d={`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`}
                stroke={t.blue}
                strokeWidth={1.3}
                strokeDasharray={`${totalLen}`}
                strokeDashoffset={(1 - drawT) * totalLen}
                fill="none"
                opacity={0.6}
              />
            );
          })}
        </svg>

        <div style={{ position: 'absolute', top: 12, left: 14 }}>
          <Chip theme={theme} frame={frame} variant="blue" pulse>
            Primary · af-south-1
          </Chip>
        </div>
      </div>

      {/* Cost gauge — right column top */}
      <CostPanel theme={theme} frame={frame} fps={fps} />

      {/* Activity log — right column bottom */}
      <ActivityLog theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

const CostPanel: React.FC<{ theme: ThemeName; frame: number; fps: number }> = ({ theme, frame, fps }) => {
  const t = themes[theme];
  const arrive = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 110 } });
  const spark = Array.from({ length: 24 }, (_, i) => 0.35 + Math.sin(i * 0.6) * 0.18 + Math.random() * 0.08);
  const drawT = interpolate(frame, [60, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        right: 56,
        top: 240,
        width: 380,
        background: t.bg,
        border: `1px solid ${t.borderMd}`,
        borderRadius: radius.lg,
        padding: 22,
        opacity: arrive,
        transform: `translateY(${(1 - arrive) * 10}px)`,
        boxShadow: `0 16px 40px ${t.nodeShadow}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Spend today
        </span>
        <Chip theme={theme} frame={frame} variant="success" pulse>
          On budget
        </Chip>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
        <CountUp theme={theme} frame={frame} startAt={50} endAt={200} from={0} to={18420} prefix="R " thousands fontSize={36} />
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.text3 }}>/ R 23 400</span>
      </div>
      <div style={{ marginTop: 12 }}>
        <Sparkline theme={theme} frame={frame} values={spark} width={336} height={68} drawT={drawT} />
      </div>
    </div>
  );
};

const ActivityLog: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  // Scrolling log — show 4 lines, shift one line every 40 frames.
  const VIS = 4;
  const SHIFT = 40;
  const idxFloat = frame / SHIFT;
  const idx = Math.floor(idxFloat);
  const yOff = (idxFloat - idx) * 22;

  return (
    <div
      style={{
        position: 'absolute',
        right: 56,
        bottom: 64,
        width: 380,
        height: 120,
        background: t.bg,
        border: `1px solid ${t.borderMd}`,
        borderRadius: radius.lg,
        overflow: 'hidden',
        boxShadow: `0 16px 40px ${t.nodeShadow}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderBottom: `1px solid ${t.border}` }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Live activity
        </span>
        <Chip theme={theme} frame={frame} variant="success" pulse>
          Streaming
        </Chip>
      </div>
      <div style={{ position: 'relative', height: 90, overflow: 'hidden' }}>
        <div style={{ transform: `translateY(${-yOff}px)`, padding: '8px 14px' }}>
          {Array.from({ length: VIS + 1 }).map((_, i) => {
            const line = LOG_LINES[(idx + i) % LOG_LINES.length];
            const fg = line.code.startsWith('WARN') ? t.amber : line.code.startsWith('OK') ? t.success : t.text3;
            return (
              <div key={i} style={{ display: 'flex', gap: 8, paddingBlock: 3, fontFamily: fonts.mono, fontSize: 11 }}>
                <span style={{ color: fg, width: 40 }}>{line.code}</span>
                <span style={{ color: t.text1 }}>{line.msg}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
