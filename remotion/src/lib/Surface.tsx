import { AbsoluteFill } from 'remotion';
import { themes, type ThemeName } from '../tokens';
import { loopSin } from './anim';

type Props = {
  theme: ThemeName;
  frame: number;
  duration: number;
  /** Add the faint dot grid overlay. Defaults to true. */
  grid?: boolean;
};

/** Themed drifting-mesh + dot-grid backdrop used by every composition. */
export const Surface: React.FC<Props> = ({ theme, frame, duration, grid = true }) => {
  const t = themes[theme];
  // Single full cycle across the whole video so the loop seam is invisible.
  const aX = 18 + loopSin(frame, duration) * 6;
  const aY = 22 + loopSin(frame, duration * 0.75) * 4;
  const bX = 82 - loopSin(frame, duration * 1.1) * 6;
  const bY = 80 + loopSin(frame, duration) * 4;

  return (
    <>
      <AbsoluteFill style={{ background: t.surface }} />
      <AbsoluteFill
        style={{
          background: `
            radial-gradient(58% 46% at ${aX}% ${aY}%, ${t.meshA} 0%, transparent 65%),
            radial-gradient(50% 40% at ${bX}% ${bY}%, ${t.meshB} 0%, transparent 60%)
          `,
        }}
      />
      {grid ? (
        <AbsoluteFill
          style={{
            backgroundImage: `radial-gradient(${t.borderMd} 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            opacity: 0.4,
            maskImage: 'radial-gradient(80% 80% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(80% 80% at 50% 50%, black 30%, transparent 100%)',
          }}
        />
      ) : null}
    </>
  );
};
