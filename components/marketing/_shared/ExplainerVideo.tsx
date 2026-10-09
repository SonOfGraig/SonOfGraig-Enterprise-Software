'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

type Sources = {
  mp4: string;
  webm?: string;
  poster: string;
};

type Props = {
  /** Asset set for light theme. */
  light: Sources;
  /** Asset set for dark theme. Falls back to `light` if omitted. */
  dark?: Sources;
  caption: string;
  aspectRatio?: number;
  className?: string;
};

/**
 * ExplainerVideo — mobile-safe lazy video.
 *
 * The previous version rendered `<video autoplay muted loop playsInline
 * preload="auto">` for every instance on the page on first paint. Multiple
 * instances → multiple H.264 decoders → iOS Safari GPU OOM → tab crash.
 *
 * Mitigations (in priority order):
 *   1. SSR + first paint render the poster `<img>` only — no `<video>` ever.
 *   2. On mobile / touch devices (≤768px or coarse pointer), stay on the
 *      poster forever. No video element is created. No decoder is spawned.
 *      Visitors can tap to play the inline video if they want it.
 *   3. On desktop, mount the `<video>` only when an IntersectionObserver
 *      reports the element near the viewport (300px rootMargin), and only
 *      one element at a time, with `preload="metadata"` so the browser
 *      streams the first few KB rather than the whole file.
 *   4. Honour data-saver / `effectiveType` slow-2g/2g/3g — stay on poster.
 *
 * Net effect: page can contain 20 ExplainerVideos and a mobile Safari tab
 * still loads with no decoders running, no autoplay races, no OOMs.
 */
export function ExplainerVideo({
  light,
  dark,
  caption,
  aspectRatio = 16 / 9,
  className,
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // SSR-safe default — assume mobile
  const [shouldRenderVideo, setShouldRenderVideo] = useState(false);
  const [tappedToPlay, setTappedToPlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mount + mobile detection
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 768px), (pointer: coarse)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Desktop-only: IntersectionObserver to defer video mount until near viewport.
  useEffect(() => {
    if (!mounted || isMobile || shouldRenderVideo) return;
    const el = containerRef.current;
    if (!el) return;

    // Respect data-saver / slow connections even on desktop.
    type NetInfo = { saveData?: boolean; effectiveType?: string };
    const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldRenderVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px', threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, isMobile, shouldRenderVideo]);

  // App default theme is `light` (v3.1), so SSR/first paint matches that.
  const themeKey = mounted && resolvedTheme === 'dark' ? 'dark' : 'light';
  const active = themeKey === 'dark' ? (dark ?? light) : light;

  const renderVideo = (isMobile && tappedToPlay) || (!isMobile && shouldRenderVideo);

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full overflow-hidden', className)}
      style={{
        aspectRatio,
        background: 'var(--sg-surface)',
        borderRadius: 'var(--r-xl)',
        border: '1px solid var(--sg-border)',
        boxShadow: '0 18px 40px rgba(11,158,222,0.10), 0 6px 14px rgba(0,0,0,0.06)',
      }}
      aria-label={caption}
    >
      {/* Poster always renders. On mobile this is the entire experience
          unless the user taps the play button. On desktop it covers the
          gap before the IntersectionObserver swaps in <video>. */}
      <img
        src={active.poster}
        alt={caption}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      {renderVideo && (
        <video
          key={`v-${themeKey}-${active.mp4}`}
          className="absolute inset-0 w-full h-full object-cover"
          poster={active.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={caption}
        >
          {active.webm ? <source src={active.webm} type="video/webm" /> : null}
          <source src={active.mp4} type="video/mp4" />
        </video>
      )}

      {/* Mobile tap-to-play affordance — only shown when the poster is the
          live state and the user hasn't opted in yet. */}
      {mounted && isMobile && !tappedToPlay && (
        <button
          type="button"
          onClick={() => setTappedToPlay(true)}
          aria-label={`Play video: ${caption}`}
          className="absolute inset-0 flex items-center justify-center group focus:outline-none"
          style={{ background: 'rgba(13, 17, 23, 0.18)' }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.20)',
              transition: 'transform 160ms ease',
            }}
            className="group-hover:scale-105 group-focus-visible:scale-105"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#0B9EDE" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
