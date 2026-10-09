import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { masterFade } from '../lib/anim';

export type DataPipelineProps = { theme: ThemeName };

const STAGES = [
  { id: 'src', label: 'Source', sub: 'Postgres · Stripe · CRM', x: 0.10 },
  { id: 'flt', label: 'Filter', sub: 'POPIA mask + dedupe', x: 0.34 },
  { id: 'xfm', label: 'Transform', sub: 'Aggregate · Enrich', x: 0.58 },
  { id: 'snk', label: 'Sink', sub: 'Warehouse · BI', x: 0.82 },
];

export const DataPipeline: React.FC<DataPipelineProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);
  const trackY = height * 0.55;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="Data & Analytics · Pipeline Builder"
        title="Move every row."
        titleLine2="With lineage you can ship to legal."
      />

      {/* Stages */}
      {STAGES.map((s, i) => {
        const arrive = spring({ frame: frame - (24 + i * 14), fps, config: { damping: 14, stiffness: 110 } });
        const cx = s.x * width;
        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: cx - 110,
              top: trackY - 50,
              width: 220,
              height: 100,
              padding: '14px 18px',
              background: t.bg,
              border: `1px solid ${t.borderMd}`,
              borderRadius: radius.lg,
              boxShadow: `0 8px 22px ${t.nodeShadow}`,
              opacity: arrive,
              transform: `translateY(${(1 - arrive) * 12}px) scale(${0.96 + arrive * 0.04})`,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Stage {i + 1}
              </span>
              <Chip theme={theme} frame={frame} variant={i === STAGES.length - 1 ? 'blue' : 'neutral'} pulse={i === STAGES.length - 1}>
                {i === STAGES.length - 1 ? 'Ready' : 'OK'}
              </Chip>
            </div>
            <span style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 600, color: t.text1 }}>{s.label}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text3, letterSpacing: 0.3 }}>{s.sub}</span>
          </div>
        );
      })}

      {/* Pipes — connecting lines */}
      <svg style={{ position: 'absolute', inset: 0 }} viewBox={`0 0 ${width} ${height}`}>
        {STAGES.slice(0, -1).map((s, i) => {
          const next = STAGES[i + 1];
          const x1 = s.x * width + 110;
          const x2 = next.x * width - 110;
          const dashOffset = -((frame * 0.8) % 8);
          return (
            <line
              key={i}
              x1={x1}
              y1={trackY}
              x2={x2}
              y2={trackY}
              stroke={t.borderStr}
              strokeWidth={2}
              strokeDasharray="4 4"
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </svg>

      {/* Row particles flowing through pipes */}
      {STAGES.slice(0, -1).flatMap((s, i) => {
        const next = STAGES[i + 1];
        const x1 = s.x * width + 110;
        const x2 = next.x * width - 110;
        const period = 60;
        const stagger = 12;
        const colors = [t.blue, t.success, t.amber];

        return Array.from({ length: 4 }).map((_, k) => {
          const offset = i * 18 + k * stagger;
          const localT = ((frame - offset) % period) / period;
          if (localT < 0 || localT > 1) return null;
          const cx = x1 + (x2 - x1) * localT;
          const op = interpolate(localT, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

          return (
            <div
              key={`r-${i}-${k}`}
              style={{
                position: 'absolute',
                left: cx - 12,
                top: trackY - 5,
                width: 24,
                height: 10,
                borderRadius: 3,
                background: colors[k % colors.length],
                boxShadow: `0 0 12px ${colors[k % colors.length]}66`,
                opacity: op,
              }}
            />
          );
        });
      })}

      {/* Bottom metrics */}
      <div style={{ position: 'absolute', left: 56, bottom: 56, display: 'flex', gap: 32, alignItems: 'flex-end' }}>
        <Metric theme={theme} label="Rows / sec" frame={frame} from={0} to={48230} startAt={60} endAt={220} thousands />
        <Metric theme={theme} label="Latency (p95)" frame={frame} from={0} to={92} startAt={70} endAt={230} suffix="ms" />
        <Metric theme={theme} label="Lineage events" frame={frame} from={0} to={1284} startAt={80} endAt={240} thousands />
      </div>
    </AbsoluteFill>
  );
};

const Metric: React.FC<{
  theme: ThemeName;
  frame: number;
  label: string;
  from: number;
  to: number;
  startAt: number;
  endAt: number;
  suffix?: string;
  thousands?: boolean;
}> = ({ theme, frame, label, from, to, startAt, endAt, suffix, thousands }) => {
  const t = themes[theme];
  return (
    <div>
      <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
        {label}
      </div>
      <CountUp
        theme={theme}
        frame={frame}
        from={from}
        to={to}
        startAt={startAt}
        endAt={endAt}
        suffix={suffix ?? ''}
        thousands={thousands}
        fontSize={28}
        color={t.text1}
      />
    </div>
  );
};
