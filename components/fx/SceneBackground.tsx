'use client';

import type { CSSProperties } from 'react';
import { useCanvasScene, type Scene } from './canvas/useCanvasScene';
import {
  dataShards,
  dotMatrix,
  knowledgeGraph,
  latticeTunnel,
  liquidIntelligence,
  temporalFlux,
  neuralArchitecture,
  signalGrid,
  blueprintSearch,
  tacticalCommand,
  footerLattice,
} from './canvas/scenes';
import * as more from './canvas/scenes2';

// Per-scene render settings. Blurred scenes render at low DPR — the CSS filter
// erases the detail anyway, and it quarters the GPU cost on older laptops.
const SCENES = {
  knowledgeGraph: { scene: knowledgeGraph },
  dataShards: { scene: dataShards },
  dotMatrix: { scene: dotMatrix },
  latticeTunnel: { scene: latticeTunnel },
  temporalFlux: { scene: temporalFlux },
  neuralArchitecture: { scene: neuralArchitecture },
  signalGrid: { scene: signalGrid },
  blueprintSearch: { scene: blueprintSearch },
  footerLattice: { scene: footerLattice },
  tacticalCommand: { scene: tacticalCommand, maxDpr: 0.5, style: { filter: 'blur(48px) contrast(150%)', transform: 'scale(1.08)' } as CSSProperties },
  liquidIntelligence: { scene: liquidIntelligence, maxDpr: 0.5, style: { filter: 'blur(36px) contrast(160%)', transform: 'scale(1.1)' } as CSSProperties },
  // second batch (scenes2.ts)
  resourcesLattice: { scene: more.resourcesLattice },
  globalSignals: { scene: more.globalSignals },
  artifactsLattice: { scene: more.artifactsLattice },
  componentsLattice: { scene: more.componentsLattice },
  templatesLattice: { scene: more.templatesLattice },
  webDevProbe: { scene: more.webDevProbe },
  missionBeams: { scene: more.missionBeams },
  collisionBeams: { scene: more.collisionBeams },
  bioPulse: { scene: more.bioPulse },
  modularLattice: { scene: more.modularLattice },
  sonarEcho: { scene: more.sonarEcho },
  spatialDisplacement: { scene: more.spatialDisplacement },
  acousticWaves: { scene: more.acousticWaves },
  assemblyLine: { scene: more.assemblyLine },
  starfield: { scene: more.starfield },
  matrixRain: { scene: more.matrixRain },
  nebula: { scene: more.nebula },
  hexField: { scene: more.hexField },
  perspectiveFloor: { scene: more.perspectiveFloor },
};

export type SceneName = keyof typeof SCENES;

// A section background: one ported canvas scene, faded into the section's own
// surface at the top and bottom edges so sections join seamlessly.
// Rule (16-sections.md): at most one scene per section; cards on top stay solid.
export function SceneBackground({ scene, fade = true }: { scene: SceneName; fade?: boolean }) {
  const cfg: { scene: Scene<unknown>; maxDpr?: number; style?: CSSProperties } = SCENES[scene] as never;
  const ref = useCanvasScene(cfg.scene, { maxDpr: cfg.maxDpr ?? 1.5, name: scene });
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={cfg.style}>
        <canvas ref={ref} className="absolute inset-0" />
      </div>
      {fade && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--scene-fade, var(--sg-bg)) 0%, transparent 18%, transparent 82%, var(--scene-fade, var(--sg-bg)) 100%)',
          }}
        />
      )}
    </div>
  );
}
