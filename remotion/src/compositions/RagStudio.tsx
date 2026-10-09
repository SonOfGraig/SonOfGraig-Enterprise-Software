import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { cycleProgress, loopSin01, masterFade } from '../lib/anim';

export type RagStudioProps = { theme: ThemeName };

// RAG Studio explainer:
//  - 5 source docs fan in from the left
//  - tokens spiral into a vector store at the centre
//  - centre lights up; a query enters from the right
//  - cited answer card appears bottom-right with [1] [2] [3] source chips

const SOURCES = ['Contract.pdf', 'POPIA s11.md', 'CRM.csv', 'Slack #ops', 'Wiki/runbook'];

export const RagStudio: React.FC<RagStudioProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);

  const centerX = width * 0.52;
  const centerY = height * 0.58;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="AI Dev Platform · RAG Studio"
        title="Cite every answer."
        titleLine2="From every source."
      />

      {/* Source document fans on the left */}
      {SOURCES.map((name, i) => {
        const baseY = centerY - 110 + i * 36;
        const arrive = spring({
          frame: frame - (30 + i * 6),
          fps,
          config: { damping: 16, stiffness: 130, mass: 0.6 },
        });
        // After arrival, gently bob to feel alive.
        const bob = loopSin01(frame, 120, i * 0.7) * 2;

        return (
          <div
            key={name}
            style={{
              position: 'absolute',
              left: 100,
              top: baseY + bob,
              opacity: arrive,
              transform: `translateX(${(1 - arrive) * -40}px)`,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderRadius: radius.md,
              background: t.bg,
              border: `1px solid ${t.borderMd}`,
              boxShadow: `0 4px 14px ${t.nodeShadow}`,
              minWidth: 200,
            }}
          >
            <DocIcon color={t.text3} />
            <span style={{ fontFamily: fonts.mono, fontSize: 12, color: t.text1 }}>{name}</span>
          </div>
        );
      })}

      {/* Tokens spiraling into the vector store */}
      {Array.from({ length: 18 }).map((_, i) => {
        const cycle = cycleProgress(frame, 90, -i * 5);
        const start = { x: 240, y: centerY - 80 + (i % 5) * 36 };
        const end = { x: centerX, y: centerY };
        const x = start.x + (end.x - start.x) * cycle;
        const y = start.y + (end.y - start.y) * cycle;
        const op = interpolate(cycle, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - 3,
              top: y - 3,
              width: 6,
              height: 6,
              borderRadius: 999,
              background: t.blue,
              boxShadow: `0 0 10px ${t.blue}`,
              opacity: op,
            }}
          />
        );
      })}

      {/* Vector store hex/cylinder at center */}
      <VectorStore theme={theme} cx={centerX} cy={centerY} frame={frame} fps={fps} />

      {/* Query in from the right */}
      <Query theme={theme} frame={frame} width={width} centerY={centerY} />

      {/* Cited answer card bottom-right */}
      <CitedAnswer theme={theme} frame={frame} fps={fps} />

      {/* Bottom strip — KPI captions */}
      <BottomStrip theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

const VectorStore: React.FC<{ theme: ThemeName; cx: number; cy: number; frame: number; fps: number }> = ({
  theme,
  cx,
  cy,
  frame,
  fps,
}) => {
  const t = themes[theme];
  const arrive = spring({ frame: frame - 22, fps, config: { damping: 14, stiffness: 110 } });
  const pulse = loopSin01(frame, 75) * 0.6 + 0.4;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: cx - 78,
          top: cy - 60,
          width: 156,
          height: 120,
          background: t.bg,
          borderRadius: radius.lg,
          border: `1.5px solid ${t.blue}`,
          boxShadow: `0 0 ${20 + pulse * 22}px ${t.blueGlow}, 0 0 0 ${pulse * 4}px ${t.blueGlow}`,
          opacity: arrive,
          transform: `scale(${0.9 + arrive * 0.1})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          padding: 12,
        }}
      >
        <svg width={42} height={26} viewBox="0 0 42 26">
          <ellipse cx={21} cy={5} rx={18} ry={4} fill="none" stroke={t.blue} strokeWidth={1.6} />
          <path d="M3,5 L3,21 A18,4 0 0 0 39,21 L39,5" fill="none" stroke={t.blue} strokeWidth={1.6} />
          <ellipse cx={21} cy={13} rx={18} ry={4} fill="none" stroke={t.blue} strokeWidth={0.9} opacity={0.5} />
        </svg>
        <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, color: t.text1 }}>Vector store</span>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text3 }}>
          <CountUpInline theme={theme} frame={frame} from={1200} to={14820} startAt={30} endAt={200} thousands /> chunks
        </span>
      </div>
    </>
  );
};

const CountUpInline: React.FC<{
  theme: ThemeName;
  frame: number;
  from: number;
  to: number;
  startAt: number;
  endAt: number;
  thousands?: boolean;
}> = ({ theme, frame, from, to, startAt, endAt, thousands }) => (
  <CountUp
    theme={theme}
    frame={frame}
    from={from}
    to={to}
    startAt={startAt}
    endAt={endAt}
    thousands={thousands}
    fontSize={10}
    fontFamily={fonts.mono}
    fontWeight={500}
    color={themes[theme].text3}
  />
);

const Query: React.FC<{ theme: ThemeName; frame: number; width: number; centerY: number }> = ({
  theme,
  frame,
  width,
  centerY,
}) => {
  const t = themes[theme];
  const o = interpolate(frame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const x = interpolate(frame, [120, 165], [width - 50, width - 320], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fullText = 'What does POPIA s11 require?';
  const charCount = Math.max(0, Math.min(fullText.length, Math.floor((frame - 130) / 1.2)));
  const typed = fullText.slice(0, charCount);
  const showCursor = (frame % 30) < 15;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: centerY - 24,
        opacity: o,
        padding: '12px 14px',
        background: t.bg,
        border: `1px solid ${t.borderMd}`,
        borderRadius: radius.md,
        width: 280,
        boxShadow: `0 6px 16px ${t.nodeShadow}`,
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
        Query
      </div>
      <div style={{ fontFamily: fonts.sans, fontSize: 14, color: t.text1, marginTop: 4 }}>
        {typed}
        {showCursor ? <span style={{ color: t.blue }}>▍</span> : null}
      </div>
    </div>
  );
};

const CitedAnswer: React.FC<{ theme: ThemeName; frame: number; fps: number }> = ({ theme, frame, fps }) => {
  const t = themes[theme];
  const arrive = spring({
    frame: frame - 200,
    fps,
    config: { damping: 16, stiffness: 130, mass: 0.7 },
  });
  if (arrive < 0.01) return null;

  return (
    <div
      style={{
        position: 'absolute',
        right: 56,
        bottom: 110,
        width: 380,
        background: t.bg,
        border: `1px solid ${t.borderMd}`,
        borderRadius: radius.lg,
        boxShadow: `0 18px 44px ${t.nodeShadow}`,
        opacity: arrive,
        transform: `translateY(${(1 - arrive) * 18}px) scale(${0.94 + arrive * 0.06})`,
        padding: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4, textTransform: 'uppercase' }}>
          Cited answer
        </span>
        <Chip theme={theme} frame={frame} variant="success" pulse>
          POPIA-native
        </Chip>
      </div>
      <p style={{ fontFamily: fonts.sans, fontSize: 13, color: t.text1, margin: 0, lineHeight: 1.5 }}>
        POPIA Section 11 requires lawful processing — consent, contract, or legitimate interest
        <Citation n={1} t={t} /> with purpose specification
        <Citation n={2} t={t} /> and minimisation
        <Citation n={3} t={t} />.
      </p>
      <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
        <Chip theme={theme} variant="blue">
          [1] POPIA s11.md
        </Chip>
        <Chip theme={theme} variant="blue">
          [2] Wiki/runbook
        </Chip>
        <Chip theme={theme} variant="blue">
          [3] Contract.pdf
        </Chip>
      </div>
    </div>
  );
};

const Citation: React.FC<{ n: number; t: ReturnType<typeof getTheme> }> = ({ n, t }) => (
  <span
    style={{
      display: 'inline-block',
      marginInline: 3,
      padding: '0px 5px',
      fontSize: 10,
      fontFamily: 'inherit',
      background: t.blueGlow,
      color: t.blue,
      borderRadius: 4,
      verticalAlign: 'top',
    }}
  >
    [{n}]
  </span>
);

const BottomStrip: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  const o = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: 56,
        bottom: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        opacity: o,
      }}
    >
      <Chip theme={theme} variant="neutral">
        Hybrid search · BM25 + cosine
      </Chip>
      <span style={{ fontFamily: fonts.mono, fontSize: 13, color: t.text3 }}>Self-hosted Qdrant · Citations on every answer</span>
    </div>
  );
};

function getTheme(name: ThemeName) {
  return themes[name];
}

const DocIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width={14} height={16} viewBox="0 0 14 16" fill="none">
    <path
      d="M2 1.5 V14.5 A0.5 0.5 0 0 0 2.5 15 H11.5 A0.5 0.5 0 0 0 12 14.5 V4.5 L9 1.5 H2.5 A0.5 0.5 0 0 0 2 2 Z"
      stroke={color}
      strokeWidth={1.2}
    />
    <path d="M9 1.5 V4.5 H12" stroke={color} strokeWidth={1.2} />
  </svg>
);
