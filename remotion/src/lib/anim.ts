// Animation helpers shared by all compositions. Periodic where possible so
// MP4 loops are seamless from frame N back to frame 0.

import { interpolate } from 'remotion';

/** Continuous sine 0..1 with given period in frames. */
export function loopSin01(frame: number, periodFrames: number, phase = 0): number {
  return Math.sin(((frame / periodFrames) * Math.PI * 2) + phase) * 0.5 + 0.5;
}

/** Continuous sine -1..1 with given period in frames. */
export function loopSin(frame: number, periodFrames: number, phase = 0): number {
  return Math.sin(((frame / periodFrames) * Math.PI * 2) + phase);
}

/** Fade in at the start and out at the end, so any composition seam loops cleanly. */
export function masterFade(frame: number, duration: number, inFrames = 10, outFrames = 18): number {
  const inT = interpolate(frame, [0, inFrames], [0, 1], { extrapolateRight: 'clamp' });
  const outT = interpolate(frame, [duration - outFrames, duration], [1, 0], { extrapolateLeft: 'clamp' });
  return Math.min(inT, outT);
}

/** Staggered arrival progress 0..1 for the i-th item (sequenced after `baseDelay`). */
export function sequenceArrival(frame: number, i: number, baseDelay = 18, perItem = 10, dur = 24): number {
  return interpolate(frame, [baseDelay + i * perItem, baseDelay + i * perItem + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Repeating event cycle. Returns the local 0..1 progress through the current cycle. */
export function cycleProgress(frame: number, period: number, offset = 0): number {
  const phase = ((frame - offset) % period + period) % period;
  return phase / period;
}
