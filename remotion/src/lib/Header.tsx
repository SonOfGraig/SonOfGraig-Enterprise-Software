import { interpolate } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';

type Props = {
  theme: ThemeName;
  frame: number;
  eyebrow: string;
  title: string;
  /** Optional second line of title. */
  titleLine2?: string;
};

/** Brand mark + eyebrow + headline used by every composition. */
export const Header: React.FC<Props> = ({ theme, frame, eyebrow, title, titleLine2 }) => {
  const t = themes[theme];
  const o = interpolate(frame, [4, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(frame, [4, 22], [12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
          opacity: o,
          transform: `translateY(${y}px)`,
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
          {eyebrow}
        </span>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 56,
          right: 56,
          opacity: o,
          transform: `translateY(${y}px)`,
        }}
      >
        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: -1.3,
            lineHeight: 1.05,
            color: t.text1,
            margin: 0,
            maxWidth: 880,
          }}
        >
          {title}
          {titleLine2 ? (
            <>
              <br />
              {titleLine2}
            </>
          ) : null}
        </h1>
      </div>
    </>
  );
};
