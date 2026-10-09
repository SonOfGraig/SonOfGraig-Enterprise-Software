import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { loopSin01, masterFade } from '../lib/anim';

export type ClusterFunnelProps = { theme: ThemeName };

// 18 service dots arrayed in a 6x3 grid on the left, sweep right via bezier curves
// into 5 cluster cards on the right. Each cluster pulses when its sources finish landing.

const CLUSTERS = [
  { name: 'AI Dev Platform', color: '#0B9EDE', count: 5 },
  { name: 'Cloud & DevOps', color: '#F97316', count: 5 },
  { name: 'Data & Analytics', color: '#16A34A', count: 3 },
  { name: 'Creative & XR', color: '#7C3AED', count: 3 },
  { name: 'Dev Platform', color: '#475569', count: 2 },
];

const SERVICES = [
  'Gen AI', 'ML', 'Ethical AI', 'Cloud', 'DevOps', 'Security',
  'FinOps', 'IT Ops', 'Analytics', 'Data Eng', 'Workflow', 'Design Sys',
  'Brand AI', 'XR/AR', 'Low-code', 'Game Dev', 'IoT', 'Web3',
];

// Each service routes into a cluster index.
const ROUTING = [
  0, 0, 0,                  // AI Dev
  1, 1, 1, 1, 1,            // Cloud & DevOps
  2, 2, 2,                  // Data & Analytics
  3, 3, 3,                  // Creative & XR
  4, 4, 4,                  // Dev Platform
  0, 0,                     // overflow into AI Dev
];

export const ClusterFunnel: React.FC<ClusterFunnelProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  const gridLeft = 80;
  const gridTop = 230;
  const colGap = 92;
  const rowGap = 60;
  const cols = 3;

  const clusterX = width - 360;
  const clusterTopY = 230;
  const clusterGap = 80;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="The transformation"
        title="18 services."
        titleLine2="5 SaaS clusters."
      />

      {/* SVG layer for bezier flow lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width, height, pointerEvents: 'none' }}
        viewBox={`0 0 ${width} ${height}`}
      >
        {SERVICES.map((_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const sx = gridLeft + col * colGap + 24;
          const sy = gridTop + row * rowGap;

          const cIdx = ROUTING[i];
          const cluster = CLUSTERS[cIdx];
          const tx = clusterX + 20;
          const ty = clusterTopY + cIdx * clusterGap + 30;

          const drawT = interpolate(frame, [40 + i * 4, 90 + i * 4], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const opacityT = interpolate(drawT, [0, 1], [0.4, 0.7]);

          const cx1 = sx + (tx - sx) * 0.4;
          const cy1 = sy;
          const cx2 = sx + (tx - sx) * 0.6;
          const cy2 = ty;
          const d = `M${sx},${sy} C${cx1},${cy1} ${cx2},${cy2} ${tx},${ty}`;

          return (
            <g key={i}>
              <path
                d={d}
                stroke={cluster.color}
                strokeWidth={1.2}
                fill="none"
                strokeDasharray="600"
                strokeDashoffset={(1 - drawT) * 600}
                opacity={opacityT}
              />
            </g>
          );
        })}

        {/* Traveling particles along each route, looping */}
        {SERVICES.map((_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const sx = gridLeft + col * colGap + 24;
          const sy = gridTop + row * rowGap;
          const cIdx = ROUTING[i];
          const cluster = CLUSTERS[cIdx];
          const tx = clusterX + 20;
          const ty = clusterTopY + cIdx * clusterGap + 30;

          const period = 140;
          const phase = i * 7;
          const localT = ((frame + phase) % period) / period;
          if (frame < 80 + i * 4) return null;
          if (localT < 0 || localT > 1) return null;

          const cx1 = sx + (tx - sx) * 0.4;
          const cx2 = sx + (tx - sx) * 0.6;
          const cy2 = ty;
          const x = bezier(sx, cx1, cx2, tx, localT);
          const y = bezier(sy, sy, cy2, ty, localT);
          const op = interpolate(localT, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

          return (
            <circle key={`p-${i}`} cx={x} cy={y} r={3} fill={cluster.color} opacity={op} />
          );
        })}
      </svg>

      {/* Service dots — left grid */}
      {SERVICES.map((name, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gridLeft + col * colGap;
        const y = gridTop + row * rowGap;
        const arrive = spring({ frame: frame - (24 + i * 3), fps, config: { damping: 18, stiffness: 130 } });
        const cIdx = ROUTING[i];

        return (
          <div
            key={name}
            style={{
              position: 'absolute',
              left: x,
              top: y - 14,
              opacity: arrive,
              transform: `scale(${0.8 + arrive * 0.2})`,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: CLUSTERS[cIdx].color,
                boxShadow: `0 0 8px ${CLUSTERS[cIdx].color}88`,
              }}
            />
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: t.text2 }}>{name}</span>
          </div>
        );
      })}

      {/* Cluster cards — right column */}
      {CLUSTERS.map((c, i) => {
        const arriveDelay = 40 + i * 18;
        const arrive = spring({ frame: frame - arriveDelay, fps, config: { damping: 14, stiffness: 110 } });
        const pulse = loopSin01(frame, 100, i * 0.6);

        return (
          <div
            key={c.name}
            style={{
              position: 'absolute',
              left: clusterX,
              top: clusterTopY + i * clusterGap,
              width: 260,
              height: 60,
              background: t.bg,
              border: `1.5px solid ${c.color}`,
              borderRadius: radius.lg,
              boxShadow: `0 8px 22px ${c.color}33, 0 0 0 ${pulse * 4}px ${c.color}22`,
              opacity: arrive,
              transform: `translateY(${(1 - arrive) * 8}px) scale(${0.96 + arrive * 0.04})`,
              padding: '10px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: t.text1 }}>{c.name}</span>
              <span style={{ fontFamily: fonts.mono, fontSize: 11, color: c.color }}>{`0${i + 1}`}</span>
            </div>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text3, letterSpacing: 0.4 }}>
              {c.count} products
            </span>
          </div>
        );
      })}

      {/* Bottom caption */}
      <Caption theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

function bezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const it = 1 - t;
  return it * it * it * p0 + 3 * it * it * t * p1 + 3 * it * t * t * p2 + t * t * t * p3;
}

const Caption: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  const o = interpolate(frame, [200, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 56, bottom: 48, opacity: o, fontFamily: fonts.mono, fontSize: 13, color: t.text3 }}>
      Services revenue funds the platform · ZAR-priced · POPIA-native
    </div>
  );
};
