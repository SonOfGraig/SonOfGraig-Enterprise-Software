import { spring } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../../tokens';
import { loopSin01 } from '../anim';

type Props = {
  theme: ThemeName;
  frame: number;
  fps: number;
  arriveAt: number;
  /** Stagger phase so a row of cards doesn't pulse in unison. */
  breathePhase?: number;
  /** Position via top/left if absolute, otherwise omit and let parent position. */
  style?: React.CSSProperties;
  eyebrow?: string;
  title: string;
  /** Optional subtitle / chart / children below the title. */
  children?: React.ReactNode;
  /** When true, render the card in a "highlighted" state with stronger glow. */
  emphasized?: boolean;
};

/** Card with arrival spring + continuous breathing pulse. Used everywhere. */
export const Card: React.FC<Props> = ({
  theme,
  frame,
  fps,
  arriveAt,
  breathePhase = 0,
  style,
  eyebrow,
  title,
  children,
  emphasized,
}) => {
  const t = themes[theme];
  const arrive = spring({
    frame: frame - arriveAt,
    fps,
    config: { damping: 14, stiffness: 110, mass: 0.7 },
  });
  const breathe = loopSin01(frame, 90, breathePhase);
  const breatheScale = 1 + breathe * 0.012;
  const breatheY = breathe * -1.5;

  return (
    <div
      style={{
        background: t.bg,
        border: `1px solid ${emphasized ? t.blue : t.borderMd}`,
        borderRadius: radius.lg,
        boxShadow: `0 ${10 * arrive}px ${24 * arrive}px ${emphasized ? t.blueGlow : t.nodeShadow}${emphasized ? ', 0 0 0 4px ' + t.blueGlow : ''}`,
        opacity: arrive,
        transform: `translateY(${(1 - arrive) * 16 + breatheY}px) scale(${(0.94 + arrive * 0.06) * breatheScale})`,
        padding: '14px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        ...style,
      }}
    >
      {eyebrow ? (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            color: t.text4,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </span>
      ) : null}
      <span
        style={{
          fontFamily: fonts.sans,
          fontSize: 17,
          fontWeight: 600,
          color: t.text1,
          lineHeight: 1.2,
        }}
      >
        {title}
      </span>
      {children}
    </div>
  );
};
