import { interpolate } from 'remotion';
import { themes, type ThemeName } from '../../tokens';

type Props = {
  theme: ThemeName;
  frame: number;
  values: number[]; // 0..1
  width: number;
  height: number;
  /** Draw progress 0..1: 0 = hidden, 1 = fully drawn. */
  drawT: number;
  /** Fill under the line. */
  area?: boolean;
  color?: string;
};

export const Sparkline: React.FC<Props> = ({
  theme,
  frame,
  values,
  width,
  height,
  drawT,
  area = true,
  color,
}) => {
  const t = themes[theme];
  const stroke = color ?? t.blue;

  const path = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - v * height;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const visibleX = drawT * width;

  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {area ? (
        <path
          d={`${path} L${width},${height} L0,${height} Z`}
          fill={stroke}
          fillOpacity={0.12}
          clipPath="url(#spark-clip)"
        />
      ) : null}
      <path
        d={path}
        stroke={stroke}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#spark-clip)"
      />
      {drawT > 0.05 ? (
        <circle
          cx={visibleX - 1}
          cy={(() => {
            const idx = Math.min(values.length - 1, Math.floor(drawT * (values.length - 1)));
            return height - values[idx] * height;
          })()}
          r={3.5}
          fill={stroke}
        />
      ) : null}
      <defs>
        <clipPath id="spark-clip">
          <rect x={0} y={0} width={visibleX} height={height} />
        </clipPath>
      </defs>
    </svg>
  );
};
