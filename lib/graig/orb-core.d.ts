// Types for orb-core.js — Graig's face, copied verbatim from
// C:\Jarvis\sonofgraig-jarvis\frontend\app\components\orb\orb-core.js by GRAIG's
// site export. Edit it there, never here.
import type * as THREE from 'three';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking';
export function buildOrb(
  three: typeof THREE,
  opts?: { lite?: boolean; theme?: 'dark' | 'light' },
): {
  object: THREE.Object3D;
  step: (dt: number, state?: OrbState, level?: number) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  dispose: () => void;
};
