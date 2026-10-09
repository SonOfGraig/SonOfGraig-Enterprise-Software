import { interpolate } from 'remotion';
import { themes, type ThemeName } from '../../tokens';

type Props = {
  theme: ThemeName;
  frame: number;
  /** Frame at which the bar starts filling. */
  startAt: number;
  /** Frame at which the bar reaches `target`. */
  endAt: number;
  /** Final 0..1 ratio. */
  target: number;
  width?: number;
  height?: number;
  color?: string;
};

export const ProgressBar: React.FC<Props> = ({
  theme,
  frame,
  startAt,
  endAt,
  target,
  width = 220,
  height = 6,
  color,
}) => {
  const t = themes[theme];
  const fillT = interpolate(frame, [startAt, endAt], [0, target], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        background: t.surface2,
        borderRadius: 999,
        overflow: 'hidden',
        border: `1px solid ${t.border}`,
      }}
    >
      <div
        style={{
          width: `${fillT * 100}%`,
          height: '100%',
          background: color ?? t.blue,
          borderRadius: 999,
        }}
      />
    </div>
  );
};
