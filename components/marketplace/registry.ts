import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// The 2026 site's Marketplace "Components" + "Templates" UIs, ported as live
// interface concepts. Each loads on demand (client-only, own chunk).
export type LabItem = {
  slug: string;
  title: string;
  category: string;
  blurb: string;
  Component: ComponentType;
};

const load = (fn: () => Promise<{ default: ComponentType }>) => dynamic(fn, { ssr: false });

export const LAB_ITEMS: LabItem[] = [
  { slug: 'synaptic-gate', title: 'Synaptic Gate', category: 'Approvals', blurb: 'A human-in-the-loop gate: an action waits until someone grants it.', Component: load(() => import('./SynapticGateUI')) },
  { slug: 'neural-tracer', title: 'Neural Tracer', category: 'Observability', blurb: 'Signals traced through a network, step by step.', Component: load(() => import('./NeuralTracerUI')) },
  { slug: 'data-shard', title: 'Data Encryption Shard', category: 'Security', blurb: 'Lock and unlock a shard of data, with the key state always visible.', Component: load(() => import('./DataEncryptionShardUI')) },
  { slug: 'biometric-access', title: 'Biometric Access', category: 'Identity', blurb: 'A scan-to-enter access flow for sensitive areas.', Component: load(() => import('./BiometricAccessUI')) },
  { slug: 'neural-agent', title: 'Neural Agent Core', category: 'Agents', blurb: 'An agent console: tasks, reasoning and status at a glance.', Component: load(() => import('./NeuralAgentUI')) },
  { slug: 'logic-module', title: 'Logic Core Module', category: 'Automation', blurb: 'Rules wired into a single logic block.', Component: load(() => import('./LogicCoreModuleUI')) },
  { slug: 'quantum-admin', title: 'Admin OS', category: 'Systems', blurb: 'An operations admin shell with live panels.', Component: load(() => import('./QuantumAdminUI')) },
  { slug: 'spatial-dashboard', title: 'Spatial Command', category: 'Data visualisation', blurb: 'A depth-layered dashboard.', Component: load(() => import('./SpatialDashboardUI')) },
  { slug: 'delta-sync', title: 'Delta Sync', category: 'Data', blurb: 'Two stores reconciling only what changed.', Component: load(() => import('./DeltaSyncUI')) },
  { slug: 'flux-bridge', title: 'Flux Bridge', category: 'Integration', blurb: 'A bridge that carries a stream between two systems.', Component: load(() => import('./FluxBridgeUI')) },
  { slug: 'photon-bus', title: 'Photon Bus', category: 'Transport', blurb: 'A message bus visualised as light.', Component: load(() => import('./PhotonBusUI')) },
  { slug: 'managed-lattice', title: 'Managed Lattice', category: 'Infrastructure', blurb: 'A cluster of managed nodes, on and off.', Component: load(() => import('./ManagedLatticeUI')) },
  { slug: 'quantum-node', title: 'Compute Node', category: 'Compute', blurb: 'A single compute node and its state.', Component: load(() => import('./QuantumNodeUI')) },
  { slug: 'volumetric-radar', title: 'Volumetric Radar', category: 'Monitoring', blurb: 'A radar sweep that surfaces what is nearby.', Component: load(() => import('./VolumetricRadarUI')) },
  { slug: 'neural-link', title: 'Neural Interface Link', category: 'Interfaces', blurb: 'A pairing flow for a connected device.', Component: load(() => import('./NeuralInterfaceLinkUI')) },
  { slug: 'spatial-controller', title: 'Spatial Controller', category: 'Immersive', blurb: 'Controls for a 3D scene.', Component: load(() => import('./SpatialControllerUI')) },
  { slug: 'haptic-actuator', title: 'Haptic Actuator', category: 'Tactile', blurb: 'Tune a haptic pulse and feel the waveform.', Component: load(() => import('./HapticActuatorUI')) },
  { slug: 'bio-sensor', title: 'Bio-Sensor Bridge', category: 'Health', blurb: 'A live signal from a wearable sensor.', Component: load(() => import('./BioSensorBridgeUI')) },
  { slug: 'liquid-core', title: 'Liquid Core', category: 'Thermal', blurb: 'A fluid simulation responding to load.', Component: load(() => import('./LiquidCoreUI')) },
  { slug: 'kinetic-shard', title: 'Kinetic Shard', category: 'Energy', blurb: 'A shard that charges as you interact.', Component: load(() => import('./KineticShardUI')) },
  { slug: 'atomic-switch', title: 'Atomic Switch', category: 'Controls', blurb: 'A single, satisfying on/off state.', Component: load(() => import('./AtomicSwitchUI')) },
];

export const labItem = (slug: string) => LAB_ITEMS.find((i) => i.slug === slug)!;
