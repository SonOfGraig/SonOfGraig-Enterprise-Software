import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';

// 12s @ 30fps = 360 frames. Phase 1 beachhead "Agent Builder" explainer.
//
// Loop structure:
//   0–60   : Build phase — title in, 4 nodes spring in, edges draw.
//   60–340 : Run phase — continuous signal pulses, breathing nodes, drifting mesh,
//            pulsing "trace captured" chip. Everything is internally periodic.
//   340–360: Cross-fade tail back to opening state so the MP4 loops cleanly.

export type AgentBuilderProps = { theme: ThemeName };

const NODES = [
  { id: 'prompt', label: 'Prompt', x: 0.14 },
  { id: 'tool', label: 'Tool', x: 0.38 },
  { id: 'model', label: 'Model', x: 0.62 },
  { id: 'response', label: 'Response', x: 0.86 },
];

const PULSE_PERIOD = 70;   // a pulse leaves a node every 70 frames
const PULSE_TRAVEL = 50;   // takes 50 frames to traverse an edge

export const AgentBuilder: React.FC<AgentBuilderProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  // Smooth in at start, smooth out at very end so loop seam is invisible.
  const intro = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const outro = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp' },
  );
  const masterOpacity = Math.min(intro, outro);

  // Drifting mesh: two radial gradients orbit slowly. Period = 240 frames so it
  // completes exactly 1.5 cycles over the 360-frame video (smooth at loop seam
  // because the sine evaluates equivalently at frame 0 and frame 360 + offset).
  const meshT = (frame / durationInFrames) * Math.PI * 2;
  const meshAX = 18 + Math.sin(meshT) * 6;
  const meshAY = 22 + Math.cos(meshT * 0.7) * 4;
  const meshBX = 82 - Math.sin(meshT * 0.8) * 6;
  const meshBY = 80 + Math.cos(meshT) * 4;

  const trackY = height * 0.58;

  return (
    <AbsoluteFill style={{ background: t.surface, opacity: masterOpacity }}>
      {/* Drifting mesh */}
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(58% 46% at ${meshAX}% ${meshAY}%, ${t.meshA} 0%, transparent 65%),
            radial-gradient(50% 40% at ${meshBX}% ${meshBY}%, ${t.meshB} 0%, transparent 60%)
          `,
          transition: 'none',
        }}
      />

      {/* Faint dot-grid backdrop adds enterprise rigor without competing for attention */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${t.borderMd} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.4,
          maskImage: 'radial-gradient(80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Brand mark */}
      <Headline t={t} frame={frame} />

      {/* Nodes — initial spring-in + continuous breathing pulse */}
      {NODES.map((node, idx) => {
        const arriveAt = 18 + idx * 12;
        const arrive = spring({
          frame: frame - arriveAt,
          fps,
          config: { damping: 14, stiffness: 110, mass: 0.7 },
        });

        // Continuous gentle breathing — staggered per node so the row doesn't pulse in unison.
        const breathT = (frame + idx * 18) / fps;
        const breathe = Math.sin(breathT * 2.0) * 0.5 + 0.5; // 0..1
        const breatheScale = 1 + breathe * 0.012;
        const breatheY = breathe * -1.5;

        // Highlight ring when a pulse is "inside" this node
        const lastPulseStart = Math.floor(frame / PULSE_PERIOD) * PULSE_PERIOD;
        const inEdge = idx; // edge after this node
        const pulseEnter = lastPulseStart + inEdge * PULSE_TRAVEL;
        const proxToPulse = Math.max(0, 1 - Math.abs(frame - pulseEnter) / 10);

        return (
          <Node
            key={node.id}
            cx={node.x * width}
            cy={trackY}
            label={node.label}
            index={idx}
            arrive={arrive}
            breatheScale={breatheScale}
            breatheY={breatheY}
            highlight={proxToPulse}
            t={t}
          />
        );
      })}

      {/* Edges */}
      {NODES.slice(0, -1).map((from, idx) => {
        const to = NODES[idx + 1];
        const drawStart = 24 + idx * 12;
        const draw = interpolate(frame, [drawStart, drawStart + 18], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const x1 = from.x * width + 78;
        const x2 = to.x * width - 78;
        // Slow march of the dash pattern — continuous data hint along the line.
        const dashOffset = -((frame * 0.6) % 8);

        return (
          <svg
            key={`edge-${idx}`}
            style={{ position: 'absolute', left: 0, top: 0, width, height, pointerEvents: 'none' }}
          >
            <line
              x1={x1}
              y1={trackY}
              x2={x1 + (x2 - x1) * draw}
              y2={trackY}
              stroke={t.borderStr}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              strokeDashoffset={dashOffset}
            />
          </svg>
        );
      })}

      {/* Continuous signal pulses — repeat across the whole run phase. */}
      {NODES.slice(0, -1).flatMap((from, idx) => {
        const to = NODES[idx + 1];
        const x1 = from.x * width + 78;
        const x2 = to.x * width - 78;

        // Generate every pulse that could be on this edge during the video.
        const firstPulse = -PULSE_PERIOD; // include any pulse already in flight at frame 0
        const lastPulse = durationInFrames + PULSE_PERIOD;
        const pulses: React.ReactNode[] = [];

        for (let start = firstPulse + idx * PULSE_TRAVEL; start < lastPulse; start += PULSE_PERIOD) {
          if (start + PULSE_TRAVEL < 0 || start > durationInFrames) continue;
          const localT = interpolate(frame, [start, start + PULSE_TRAVEL], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          if (localT <= 0 || localT >= 1) continue;
          const cx = x1 + (x2 - x1) * localT;
          const opacity = interpolate(localT, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

          pulses.push(
            <div
              key={`pulse-${idx}-${start}`}
              style={{
                position: 'absolute',
                left: cx - 6,
                top: trackY - 6,
                width: 12,
                height: 12,
                borderRadius: 999,
                background: t.blue,
                boxShadow: `0 0 18px ${t.blue}, 0 0 6px ${t.blue}`,
                opacity,
              }}
            />,
          );
        }
        return pulses;
      })}

      {/* Trailing trace chip pulses gently to draw the eye to the outcome */}
      <TraceCaption t={t} frame={frame} fps={fps} />
    </AbsoluteFill>
  );
};

// ────────────────────────────────────────────────────────────────────────────

const Headline: React.FC<{ t: ReturnType<typeof getTheme>; frame: number }> = ({ t, frame }) => {
  const titleY = interpolate(frame, [4, 22], [12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [4, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: radius.xs,
            background: t.blue,
            boxShadow: `0 0 0 4px ${t.blueGlow}`,
          }}
        />
        <span
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 0.4,
            color: t.text3,
            textTransform: 'uppercase',
          }}
        >
          AI Dev Platform · Agent Builder
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 56,
          right: 56,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: -1.4,
            lineHeight: 1.05,
            color: t.text1,
            margin: 0,
            maxWidth: 880,
          }}
        >
          Compose agents
          <br />
          on a visual canvas.
        </h1>
      </div>
    </>
  );
};

const Node: React.FC<{
  cx: number;
  cy: number;
  label: string;
  index: number;
  arrive: number;
  breatheScale: number;
  breatheY: number;
  highlight: number;
  t: ReturnType<typeof getTheme>;
}> = ({ cx, cy, label, index, arrive, breatheScale, breatheY, highlight, t }) => {
  const w = 156;
  const h = 64;

  return (
    <div
      style={{
        position: 'absolute',
        left: cx - w / 2,
        top: cy - h / 2,
        width: w,
        height: h,
        background: t.bg,
        border: `1px solid ${t.borderMd}`,
        borderRadius: radius.lg,
        boxShadow: `
          0 ${10 * arrive}px ${24 * arrive}px ${t.nodeShadow},
          0 0 0 ${highlight * 2}px ${t.blueGlow}
        `,
        opacity: arrive,
        transform: `translateY(${(1 - arrive) * 16 + breatheY}px) scale(${(0.92 + arrive * 0.08) * breatheScale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '10px 16px',
        gap: 4,
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          color: t.text4,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        }}
      >
        Node {String(index + 1).padStart(2, '0')}
      </span>
      <span
        style={{
          fontFamily: fonts.sans,
          fontSize: 17,
          fontWeight: 600,
          color: t.text1,
        }}
      >
        {label}
      </span>
    </div>
  );
};

const TraceCaption: React.FC<{ t: ReturnType<typeof getTheme>; frame: number; fps: number }> = ({ t, frame, fps }) => {
  const appear = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseT = frame / fps;
  const pulse = (Math.sin(pulseT * 2.3) * 0.5 + 0.5); // 0..1
  const dotScale = 1 + pulse * 0.6;
  const dotOpacity = 0.55 + pulse * 0.45;

  return (
    <div
      style={{
        position: 'absolute',
        left: 56,
        right: 56,
        bottom: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        opacity: appear,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px',
          background: t.successBg,
          color: t.success,
          borderRadius: radius.full,
          border: `1px solid ${t.successBd}`,
          fontFamily: fonts.sans,
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: t.success,
            transform: `scale(${dotScale})`,
            opacity: dotOpacity,
          }}
        />
        Trace captured
      </span>
      <span style={{ fontFamily: fonts.mono, fontSize: 13, color: t.text3 }}>
        Multi-agent orchestration · Human approvals · Full execution trace
      </span>
    </div>
  );
};

// Helper for TS — keeps the inferred Theme type narrow for the sub-components.
function getTheme(name: ThemeName) {
  return themes[name];
}
