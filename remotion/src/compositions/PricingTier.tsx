import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';
import { Surface } from '../lib/Surface';
import { Header } from '../lib/Header';
import { Chip } from '../lib/ui/Chip';
import { CountUp } from '../lib/ui/CountUp';
import { loopSin01, masterFade } from '../lib/anim';

export type PricingTierProps = { theme: ThemeName };

type Tier = {
  name: string;
  price: number;
  unit: string;
  features: string[];
  recommended?: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Starter',
    price: 4999,
    unit: '/ month',
    features: ['Up to 5 seats', '1 cluster active', 'POPIA report', 'Email support'],
  },
  {
    name: 'Growth',
    price: 19999,
    unit: '/ month',
    features: ['Up to 25 seats', '3 clusters active', 'Priority support', 'POPIA + audit pack'],
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: 49999,
    unit: '/ month',
    features: ['Unlimited seats', 'All 5 clusters', 'Dedicated CSE', 'DPA included'],
  },
];

export const PricingTier: React.FC<PricingTierProps> = ({ theme }) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { width, fps, durationInFrames } = useVideoConfig();
  const opacity = masterFade(frame, durationInFrames);
  const cardWidth = 280;
  const gap = 28;
  const totalWidth = cardWidth * 3 + gap * 2;
  const startX = (width - totalWidth) / 2;

  return (
    <AbsoluteFill style={{ opacity }}>
      <Surface theme={theme} frame={frame} duration={durationInFrames} />
      <Header
        theme={theme}
        frame={frame}
        eyebrow="Plans"
        title="ZAR-priced."
        titleLine2="No FX surprises."
      />

      {TIERS.map((tier, i) => {
        const arrive = spring({ frame: frame - (30 + i * 18), fps, config: { damping: 14, stiffness: 110 } });
        const isRec = !!tier.recommended;
        const pulse = loopSin01(frame, 100, i * 0.6);
        const liftScale = isRec ? 1.05 : 1;
        const x = startX + i * (cardWidth + gap);
        const y = 260 + (isRec ? -16 : 0);

        return (
          <div
            key={tier.name}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: cardWidth,
              padding: 24,
              background: t.bg,
              border: `${isRec ? 2 : 1}px solid ${isRec ? t.amber : t.borderMd}`,
              borderRadius: radius.xl,
              boxShadow: isRec
                ? `0 22px 50px rgba(249,115,22,0.20), 0 0 0 ${pulse * 4}px rgba(249,115,22,0.18)`
                : `0 14px 34px ${t.nodeShadow}`,
              opacity: arrive,
              transform: `translateY(${(1 - arrive) * 14}px) scale(${(0.96 + arrive * 0.04) * liftScale})`,
            }}
          >
            {isRec ? (
              <div style={{ position: 'absolute', top: -14, left: 24 }}>
                <Chip theme={theme} frame={frame} variant="warn" pulse>
                  Recommended
                </Chip>
              </div>
            ) : null}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: t.text1 }}>{tier.name}</span>
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: t.text4, letterSpacing: 0.4 }}>0{i + 1}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 12 }}>
              <CountUp
                theme={theme}
                frame={frame}
                startAt={30 + i * 18}
                endAt={180 + i * 18}
                from={0}
                to={tier.price}
                prefix="R "
                thousands
                fontSize={36}
                color={isRec ? t.amber : t.text1}
              />
              <span style={{ fontFamily: fonts.mono, fontSize: 12, color: t.text3 }}>{tier.unit}</span>
            </div>
            <div
              style={{
                height: 1,
                background: t.border,
                margin: '16px 0',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tier.features.map((f, fi) => {
                const checkArrive = spring({
                  frame: frame - (80 + i * 18 + fi * 8),
                  fps,
                  config: { damping: 16, stiffness: 140 },
                });
                return (
                  <div
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      opacity: checkArrive,
                      transform: `translateX(${(1 - checkArrive) * -8}px)`,
                    }}
                  >
                    <Check size={14} color={isRec ? t.amber : t.success} />
                    <span style={{ fontFamily: fonts.sans, fontSize: 13, color: t.text2 }}>{f}</span>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                marginTop: 18,
                padding: '10px 14px',
                borderRadius: radius.md,
                background: isRec ? t.amber : t.surface2,
                color: isRec ? '#FFFFFF' : t.text1,
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 600,
                textAlign: 'center',
                border: `1px solid ${isRec ? t.amber : t.borderMd}`,
              }}
            >
              {isRec ? 'Start free trial' : 'Choose plan'}
            </div>
          </div>
        );
      })}

      {/* Bottom strip */}
      <Caption theme={theme} frame={frame} />
    </AbsoluteFill>
  );
};

const Check: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 14 14">
    <circle cx={7} cy={7} r={6} fill={color} fillOpacity={0.14} />
    <path d="M4 7.5 L6 9.5 L10 5" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Caption: React.FC<{ theme: ThemeName; frame: number }> = ({ theme, frame }) => {
  const t = themes[theme];
  const o = interpolate(frame, [220, 260], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 32, textAlign: 'center', opacity: o }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 13, color: t.text3 }}>
        Billed in ZAR · POPIA-native · Built in South Africa
      </span>
    </div>
  );
};
