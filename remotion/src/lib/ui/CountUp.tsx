import { interpolate } from 'remotion';
import { fonts, themes, type ThemeName } from '../../tokens';

type Props = {
  theme: ThemeName;
  frame: number;
  startAt: number;
  endAt: number;
  from: number;
  to: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places. */
  digits?: number;
  /** Format with thousand separators (commas/spaces). */
  thousands?: boolean;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  color?: string;
  letterSpacing?: number;
};

export const CountUp: React.FC<Props> = ({
  theme,
  frame,
  startAt,
  endAt,
  from,
  to,
  prefix = '',
  suffix = '',
  digits = 0,
  thousands = false,
  fontSize = 32,
  fontFamily,
  fontWeight = 700,
  color,
  letterSpacing,
}) => {
  const t = themes[theme];
  const v = interpolate(frame, [startAt, endAt], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  let s = v.toFixed(digits);
  if (thousands) {
    const parts = s.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    s = parts.join('.');
  }

  return (
    <span
      style={{
        fontFamily: fontFamily ?? fonts.display,
        fontSize,
        fontWeight,
        color: color ?? t.text1,
        letterSpacing,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1,
      }}
    >
      {prefix}
      {s}
      {suffix}
    </span>
  );
};
