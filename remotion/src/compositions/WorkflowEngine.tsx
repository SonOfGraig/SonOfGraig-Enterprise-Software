import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { masterFade } from '../lib/anim';

export type WorkflowEngineProps = { theme: ThemeName };

type State = 'idle' | 'running' | 'done';

type Step = {
  id: string;
  label: string;
  kind: 'trigger' | 'action' | 'branch' | 'delay' | 'sink';
  x: number;
  y: number;
  // When the step starts "running" in the cycle.
  runFrame: number;
};

const STEPS: Step[] = [
  { id: 'tr', label: 'New lead in CRM', kind: 'trigger', x: 0.10, y: 0.50, runFrame: 30 },
  { id: 'a1', label: 'Enrich (Clearbit)', kind: 'action', x: 0.28, y: 0.50, runFrame: 60 },
  { id: 'br', label: 'Score ≥ 80?', kind: 'branch', x: 0.46, y: 0.50, runFrame: 100 },
  { id: 'a2', label: 'Notify #sales', kind: 'action', x: 0.64, y: 0.32, runFrame: 140 },
  { id: 'a3', label: 'Wait 30 min', kind: 'delay', x: 0.64, y: 0.68, runFrame: 140 },
  { id: 'sk', label: 'Create deal', kind: 'sink', x: 0.84, y: 0.50, runFrame: 200 },
];

const EDGES: Array<[string, string]> = [
  ['tr', 'a1'],
  ['a1', 'br'],
  ['br', 'a2'],
  ['br', 'a3'],
  ['a2', 'sk'],
  ['a3', 'sk'],
];

export const WorkflowEngine: React.FC<WorkflowEngineProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  const byId = Object.fromEntries(STEPS.map((s) => [s.id, s]));
  const RUN_WINDOW = 35;
  const stepState = (s: Step): State => {
    if (frame < s.runFrame) return 'idle';
    if (frame < s.runFrame + RUN_WINDOW) return 'running';
    return 'done';
  };

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="Data & Analytics · Workflow Engine"
        title="Automate the boring."
        titleLine2="Ship the rest of the day."
      />

      {/* Edges */}
      <svg style={{ position: 'absolute', inset: 0 }} viewBox={`0 0 ${width} ${height}`}>
        {EDGES.map(([a, b], i) => {
          const sa = byId[a];
          const sb = byId[b];
          const x1 = sa.x * width + 70;
          const y1 = sa.y * height;
          const x2 = sb.x * width - 70;
          const y2 = sb.y * height;
          const cx1 = (x1 + x2) / 2;
          const cx2 = (x1 + x2) / 2;

          const drawStart = sa.runFrame + 10;
          const drawT = interpolate(frame, [drawStart, drawStart + 25], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const stateA = stepState(sa);
          const isActive = stateA === 'running' || stateA === 'done';
          const stroke = isActive ? t.blue : t.borderStr;
          const totalLen = 360;

          return (
            <g key={`e-${i}`}>
              <path
                d={`M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`}
                stroke={stroke}
                strokeWidth={1.6}
                fill="none"
                strokeDasharray={totalLen}
                strokeDashoffset={(1 - drawT) * totalLen}
                strokeLinecap="round"
              />
            </g>
          );
        })}

        {/* Particles along active edges */}
        {EDGES.map(([a, b], i) => {
          const sa = byId[a];
          const sb = byId[b];
          const x1 = sa.x * width + 70;
          const y1 = sa.y * height;
          const x2 = sb.x * width - 70;
          const y2 = sb.y * height;
          const cx1 = (x1 + x2) / 2;
          const cx2 = (x1 + x2) / 2;

          const period = 90;
          const localT = ((frame - sa.runFrame - i * 4) % period) / period;
          if (frame < sa.runFrame + 20) return null;
          if (localT < 0 || localT > 1) return null;

          const it = 1 - localT;
          const x = it * it * it * x1 + 3 * it * it * localT * cx1 + 3 * it * localT * localT * cx2 + localT * localT * localT * x2;
          const y = it * it * it * y1 + 3 * it * it * localT * y1 + 3 * it * localT * localT * y2 + localT * localT * localT * y2;
          const op = interpolate(localT, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

          return <circle key={`p-${i}`} cx={x} cy={y} r={3.5} fill={t.blue} opacity={op} />;
        })}
      </svg>

      {/* Step nodes */}
      {STEPS.map((s, i) => {
        const arrive = spring({ frame: frame - (24 + i * 10), fps, config: { damping: 14, stiffness: 110 } });
        const state = stepState(s);
        const variant = state === 'running' ? 'blue' : state === 'done' ? 'success' : 'neutral';
        const w = s.kind === 'branch' ? 130 : 150;
        const h = 64;

        return (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: s.x * width - w / 2,
              top: s.y * height - h / 2,
              width: w,
              height: h,
              padding: '10px 14px',
              background: t.bg,
              border: `1px solid ${state === 'running' ? t.blue : t.borderMd}`,
              borderRadius: s.kind === 'branch' ? radius.xl : radius.lg,
              boxShadow: state === 'running'
                ? `0 10px 26px ${t.blueGlow}, 0 0 0 4px ${t.blueGlow}`
                : `0 6px 18px ${t.nodeShadow}`,
              opacity: arrive,
              transform: `translateY(${(1 - arrive) * 10}px) scale(${0.96 + arrive * 0.04})`,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'flex-start',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                {kindLabel(s.kind)}
              </span>
              <Chip theme={theme} frame={frame} variant={variant} pulse={state === 'running'}>
                {state === 'running' ? 'Running' : state === 'done' ? 'Done' : 'Idle'}
              </Chip>
            </div>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: t.text1 }}>{s.label}</span>
          </div>
        );
      })}

      {/* Bottom caption */}
      <Caption theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

function kindLabel(k: Step['kind']): string {
  return { trigger: 'Trigger', action: 'Action', branch: 'Branch', delay: 'Delay', sink: 'Sink' }[k];
}

const Caption: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  const o = interpolate(frame, [200, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 56, bottom: 48, opacity: o, fontFamily: fonts.mono, fontSize: 13, color: t.text3 }}>
      500+ integrations · Schedule + trigger · Event log per run
    </div>
  );
};
