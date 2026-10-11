// Client-side health of the animated backgrounds. Every canvas engine
// (useCanvasScene, VolumetricRays) registers here and counts its frames, so
// the telemetry beacon can say whether a visitor's backgrounds actually moved
// — and, when they didn't, why (reduced motion, never visible, never started).
// "The animations look static" is otherwise invisible from the server.

export type SceneState = {
  name: string;
  reduced: boolean;
  /** became visible at least once */
  seen: boolean;
  /** the idle gate opened (loop allowed to start) */
  ready: boolean;
  frames: number;
};

const scenes = new Set<SceneState>();

export function registerScene(name: string, reduced: boolean): SceneState {
  const s: SceneState = { name, reduced, seen: false, ready: false, frames: 0 };
  scenes.add(s);
  return s;
}

export function unregisterScene(s: SceneState) {
  scenes.delete(s);
}

/** Summary for the beacon: how many scenes were on the page and how they fared. */
export function sceneReport() {
  let mounted = 0, reduced = 0, seen = 0, animating = 0, stalled = 0;
  const stalledNames = new Set<string>();
  for (const s of scenes) {
    mounted++;
    if (s.reduced) { reduced++; continue; }
    if (!s.seen) continue;
    seen++;
    // A visible scene should draw ~60 frames a second; 10 is a generous floor.
    if (s.frames >= 10) animating++;
    else { stalled++; stalledNames.add(s.ready ? s.name : `${s.name}:not-ready`); }
  }
  return { mounted, reduced, seen, animating, stalled, stalledNames: [...stalledNames].slice(0, 5) };
}
