import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { fonts, radius, themes, type ThemeName } from '../tokens';

export type EditedClipProps = {
  theme: ThemeName;
  /** Path under remotion/public, e.g. "higgsfield/africa-thesis.png". */
  src: string;
  /** Higgsfield outputs are either a still or a clip. */
  mediaType: 'image' | 'video';
  /** Small uppercase label, top-left. */
  eyebrow: string;
  /** Headline — keep under ~70 chars for a clean two-line wrap. Omit/empty to hide
   *  (e.g. for a clip that already carries spoken narration). */
  title?: string;
  /** Supporting line under the headline. Omit/empty to hide. */
  subtitle?: string;
  /** Footer URL, right-aligned. */
  brandUrl?: string;
  /** Optional narration track under remotion/public (e.g. "voiceover/thesis.mp3"). */
  voiceoverSrc?: string;
  /** Optional background-music track under remotion/public. */
  musicSrc?: string;
  /** Voiceover gain (0–1). Default 1. */
  voiceoverVolume?: number;
  /** Music gain (0–1). Kept low so narration sits on top. Default 0.14. */
  musicVolume?: number;
  /**
   * Mute the source media's own audio. Default true (stills/B-roll are silent).
   * Set false when the media is a clip with usable native audio — e.g. a Veo 3.1
   * render created with generate_audio=true.
   */
  mediaMuted?: boolean;
};

/**
 * Brand compositor for Higgsfield footage. Higgsfield generates the raw image or
 * video; this composition is the *editor* — it full-bleeds the media, adds a slow
 * Ken Burns move (stills only), a legibility scrim, and the SonOfGraig brand frame
 * (eyebrow, headline, footer strip) using design-system v3 tokens. Drop any new
 * Higgsfield asset into remotion/public and point `src` at it.
 */
export const EditedClip: React.FC<EditedClipProps> = ({
  theme,
  src,
  mediaType,
  eyebrow,
  title,
  subtitle,
  brandUrl = 'sonofgraig.com',
  voiceoverSrc,
  musicSrc,
  voiceoverVolume = 1,
  musicVolume = 0.14,
  mediaMuted = true,
}) => {
  const t = themes[theme];
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Intro fade-from-black and gentle outro fade.
  const introFade = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const outroFade = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
  const masterOpacity = Math.min(introFade, outroFade);

  // Ken Burns: slow zoom + drift for stills (video already has motion).
  const kb = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const scale = mediaType === 'image' ? 1.06 + kb * 0.12 : 1;
  const driftX = mediaType === 'image' ? -kb * 28 : 0;
  const driftY = mediaType === 'image' ? -kb * 16 : 0;

  // Text reveals.
  const eyebrowIn = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const titleIn = spring({ frame: frame - 22, fps, config: { damping: 200 } });
  const subIn = spring({ frame: frame - 34, fps, config: { damping: 200 } });
  const footerIn = spring({ frame: frame - 44, fps, config: { damping: 200 } });

  const slide = (p: number, dist = 24) => ({
    opacity: p,
    transform: `translateY(${(1 - p) * dist}px)`,
  });

  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {/* Audio layers — independent of the visual fades. */}
      {musicSrc ? (
        <Audio src={staticFile(musicSrc)} volume={musicVolume} />
      ) : null}
      {voiceoverSrc ? (
        <Audio src={staticFile(voiceoverSrc)} volume={voiceoverVolume} />
      ) : null}

      <AbsoluteFill style={{ opacity: masterOpacity }}>
        {/* Media layer */}
        <AbsoluteFill
          style={{
            transform: `scale(${scale}) translate(${driftX}px, ${driftY}px)`,
          }}
        >
          {mediaType === 'video' ? (
            <OffthreadVideo
              src={staticFile(src)}
              muted={mediaMuted}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Img
              src={staticFile(src)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </AbsoluteFill>

        {/* Brand scrims: darken top-left for eyebrow, bottom for headline/footer */}
        <AbsoluteFill
          style={{
            background:
              'linear-gradient(180deg, rgba(8,11,18,0.55) 0%, rgba(8,11,18,0) 26%, rgba(8,11,18,0) 48%, rgba(8,11,18,0.72) 100%)',
          }}
        />

        {/* Eyebrow (top-left) */}
        <div
          style={{
            position: 'absolute',
            top: 56,
            left: 72,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            ...slide(eyebrowIn, 16),
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: radius.xs,
              background: t.amber,
              boxShadow: `0 0 0 4px rgba(249,115,22,0.18)`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.sans,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 0.6,
              color: '#F0F4F8',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
        </div>

        {/* Headline + subtitle (lower-left). Hidden when both are empty. */}
        {title || subtitle ? (
          <div style={{ position: 'absolute', left: 72, bottom: 120, maxWidth: 880 }}>
            {title ? (
              <h1
                style={{
                  fontFamily: fonts.display,
                  fontSize: 62,
                  fontWeight: 700,
                  letterSpacing: -1.4,
                  lineHeight: 1.05,
                  color: '#FFFFFF',
                  margin: 0,
                  textShadow: '0 2px 24px rgba(0,0,0,0.45)',
                  ...slide(titleIn, 28),
                }}
              >
                {title}
              </h1>
            ) : null}
            {subtitle ? (
              <p
                style={{
                  marginTop: title ? 20 : 0,
                  fontFamily: fonts.sans,
                  fontSize: 20,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.82)',
                  lineHeight: 1.45,
                  maxWidth: 660,
                  ...slide(subIn, 24),
                }}
              >
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Footer brand strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 72,
            right: 72,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...slide(footerIn, 16),
          }}
        >
          <div
            style={{
              fontFamily: fonts.display,
              fontSize: 20,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: -0.4,
            }}
          >
            sonofgraig
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            {brandUrl}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
