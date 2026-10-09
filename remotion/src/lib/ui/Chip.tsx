import { fonts, radius, themes, type ThemeName } from '../../tokens';
import { loopSin01 } from '../anim';

type Variant = 'neutral' | 'blue' | 'success' | 'warn' | 'danger';

type Props = {
  theme: ThemeName;
  frame?: number;
  variant?: Variant;
  /** Pulse the leading dot. */
  pulse?: boolean;
  pulsePhase?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Chip: React.FC<Props> = ({
  theme,
  frame = 0,
  variant = 'neutral',
  pulse = false,
  pulsePhase = 0,
  children,
  style,
}) => {
  const t = themes[theme];
  const colorMap: Record<Variant, { bg: string; bd: string; fg: string; dot: string }> = {
    neutral: { bg: t.surface2, bd: t.borderMd, fg: t.text2, dot: t.text3 },
    blue: { bg: t.blueGlow, bd: t.blue, fg: t.blue, dot: t.blue },
    success: { bg: t.successBg, bd: t.successBd, fg: t.success, dot: t.success },
    warn: { bg: 'rgba(180,83,9,0.10)', bd: 'rgba(180,83,9,0.30)', fg: t.amber, dot: t.amber },
    danger: { bg: 'rgba(220,38,38,0.10)', bd: 'rgba(220,38,38,0.30)', fg: '#DC2626', dot: '#DC2626' },
  };
  const c = colorMap[variant];

  const p = pulse ? loopSin01(frame, 60, pulsePhase) : 0;
  const dotScale = 1 + p * 0.6;
  const dotOpacity = 0.55 + p * 0.45;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        background: c.bg,
        color: c.fg,
        borderRadius: radius.full,
        border: `1px solid ${c.bd}`,
        fontFamily: fonts.sans,
        fontSize: 12,
        fontWeight: 600,
        ...style,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: c.dot,
          transform: pulse ? `scale(${dotScale})` : undefined,
          opacity: pulse ? dotOpacity : 1,
        }}
      />
      {children}
    </span>
  );
};
