import type { Scene, SceneContext } from './useCanvasScene';

// Second batch of scenes ported from the 2026 agency site (2026-10-09), so
// every page and section can carry its own background. Same porting rules as
// scenes.ts: choreography kept, colour from the theme, brand blue only, no
// invented telemetry. Light mode keeps the originals' stronger line weights —
// the first ports were tuned too faint on white.

const TAU = Math.PI * 2;
/** Light mode needs more ink than dark mode to read on white. */
const ink = (dark: boolean, d: number, l: number) => (dark ? d : l);
const px = (c: SceneContext) => ({ x: (c.pointer.x / 2 + 0.5) * c.width, y: (c.pointer.y / 2 + 0.5) * c.height });

// ── ResourcesLatticeBackground.tsx → blueprint threads flowing in depth ─────
// Insights / knowledge pages.
type Thread = { x: number; offset: number; speed: number; seed: number; alt: boolean };
export const resourcesLattice: Scene<{ threads: Thread[] }> = {
  init: ({ width }) => ({
    threads: Array.from({ length: 24 }, (_, i) => ({
      x: (i / 24) * width * 2.5 - width * 0.75,
      offset: Math.random() * TAU,
      speed: 0.08 + Math.random() * 0.15,
      seed: Math.random() * 100,
      alt: i % 3 === 0,
    })),
  }),
  frame: (c, { threads }, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const travel = t * 60; // the original drove depth from scroll; here it drifts
    const cx = width / 2;
    const cy = height * 0.45;
    const P = 1000;
    ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.1, 0.2)})`;
    for (let x = 0; x < width; x += 40) for (let y = 0; y < height; y += 40) ctx.fillRect(x, y, 1, 1);
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.06, 0.1)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = -12; i <= 12; i++) {
      ctx.moveTo(cx + i * 15, cy - 100);
      ctx.lineTo(cx + i * 2250, height + 500);
    }
    ctx.stroke();
    for (const th of threads) {
      ctx.beginPath();
      let started = false;
      for (let i = 0; i < 25; i++) {
        let z = (i * 180 - travel * 1.2) % 4500;
        if (z < 0) z += 4500;
        if (z < 100) continue;
        const s = P / (P + z);
        const wx = Math.sin(t * th.speed + i * 0.3 + th.offset) * 150 * (1 - s);
        const wy = Math.cos(t * 0.6 + i * 0.4 + th.offset) * 80 * (1 - s);
        const x = cx + (th.x - cx + wx) * s;
        const y = cy + (height * 0.5 - cy + wy) * s;
        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else ctx.lineTo(x, y);
        if (i % 6 === 0 && z < 2500) {
          const bit = (t * 300 + th.seed * 50) % 4500;
          const d = Math.abs(z - bit);
          if (d < 150) {
            ctx.save();
            ctx.globalAlpha = Math.min(1, (1 - d / 150) * s * 1.5);
            ctx.fillStyle = `rgb(${rgb})`;
            ctx.beginPath();
            ctx.arc(x, y, 2.5 * s + 0.5, 0, TAU);
            ctx.fill();
            ctx.restore();
          }
        }
      }
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.3, 0.32) * (th.alt ? 0.7 : 1)})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
    for (let i = 0; i < 8; i++) {
      const z = (i * 600 + travel * 0.5) % 4500;
      const s = P / (P + z);
      const x = cx + Math.sin(i * 1.7) * width * 1.2 * s;
      const y = cy + Math.cos(i * 0.9) * height * 0.5 * s;
      ctx.strokeStyle = `rgba(${rgb}, ${(1 - z / 4500) * ink(dark, 0.25, 0.18)})`;
      ctx.strokeRect(x - 30 * s, y - 30 * s, 60 * s, 60 * s);
    }
  },
};

// ── GlobalSignalsBackground.tsx → perspective corridor, streams fly past ────
// Changelog / news: things shipping. Scroll velocity speeds it up.
type Stream = { x: number; y: number; z: number; speed: number; len: number; w: number };
type SigNode = { x: number; y: number; z: number; vx: number; vy: number; vz: number; r: number; pulse: number };
export const globalSignals: Scene<{ streams: Stream[]; nodes: SigNode[] }> = {
  init: ({ width, height }) => ({
    streams: Array.from({ length: 50 }, () => ({
      x: (Math.random() - 0.5) * width * 4,
      y: (Math.random() - 0.5) * height * 4,
      z: Math.random() * 1500,
      speed: 6 + Math.random() * 10,
      len: 150 + Math.random() * 400,
      w: 1 + Math.random() * 2,
    })),
    nodes: Array.from({ length: 22 }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: 200 + Math.random() * 1200,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.2,
      r: 1 + Math.random() * 3,
      pulse: Math.random(),
    })),
  }),
  frame: (c, { streams, nodes }, time) => {
    const { ctx, width, height, rgb, dark, pointer, scrollVelocity } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const v = Math.min(Math.abs(scrollVelocity) * 0.1, 4);
    const speed = 1 + v;
    const cx = width / 2;
    const cy = height / 2;
    const P = 900;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.09, 0.1) + v * 0.02})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = -20; i <= 20; i++) {
      const o = i * 160 + pointer.x * 60;
      ctx.moveTo(cx + o * 0.05, cy + 20);
      ctx.lineTo(cx + o * 15, height + 1000);
      ctx.moveTo(cx + o * 0.05, cy - 20);
      ctx.lineTo(cx + o * 15, -1000);
    }
    const gz = (t * 80 * speed) % 160;
    for (let j = 0; j < 6; j++) {
      const z = j * 160 - gz;
      const s = P / (P + z);
      const o = z * s * 6;
      ctx.moveTo(0, cy + o + 20);
      ctx.lineTo(width, cy + o + 20);
      ctx.moveTo(0, cy - o - 20);
      ctx.lineTo(width, cy - o - 20);
    }
    ctx.stroke();
    for (const s of streams) {
      s.z -= s.speed * speed;
      if (s.z <= 0) {
        s.z = 1500;
        s.x = (Math.random() - 0.5) * width * 4;
        s.y = (Math.random() - 0.5) * height * 4;
      }
      const sc = P / (P + s.z);
      const tsc = P / (P + s.z + s.len);
      const hx = cx + (s.x + pointer.x * 400) * sc;
      const hy = cy + (s.y + pointer.y * 400) * sc;
      const tx = cx + (s.x + pointer.x * 400) * tsc;
      const ty = cy + (s.y + pointer.y * 400) * tsc;
      const a = (1 - s.z / 1500) * ink(dark, 0.8, 0.55);
      const g = ctx.createLinearGradient(hx, hy, tx, ty);
      g.addColorStop(0, `rgba(${rgb}, ${a})`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = (s.w + v) * sc;
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
    }
    for (const n of nodes) {
      n.x += n.vx * speed;
      n.y += n.vy * speed;
      n.z += n.vz * speed;
      n.pulse = (n.pulse + 0.01 * speed) % 1;
      if (n.x < -width) n.x = width;
      if (n.x > width) n.x = -width;
      if (n.y < -height) n.y = height;
      if (n.y > height) n.y = -height;
      if (n.z < 200) n.z = 1400;
      if (n.z > 1400) n.z = 200;
      const sc = P / (P + n.z);
      const x = cx + (n.x + pointer.x * 250) * sc;
      const y = cy + (n.y + pointer.y * 250) * sc;
      ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.8, 0.6)})`;
      ctx.beginPath();
      ctx.arc(x, y, n.r * sc, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb}, ${(1 - n.pulse) * ink(dark, 0.5, 0.35)})`;
      ctx.beginPath();
      ctx.arc(x, y, n.pulse * 80 * sc, 0, TAU);
      ctx.stroke();
    }
    // HUD scan line from the original, drawn in-canvas.
    const scan = ((t / 12) % 1) * height;
    ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.25, 0.18)})`;
    ctx.fillRect(0, scan, width, 1);
  },
};

// ── ArtifactsLatticeBackground.tsx → 3D node cloud with motion trails ───────
// Pricing / product catalogue pages.
type ANode = { x: number; y: number; z: number; vx: number; vy: number; vz: number; r: number };
export const artifactsLattice: Scene<{ nodes: ANode[] }> = {
  init: ({ width, height }) => ({
    nodes: Array.from({ length: Math.min(100, Math.floor((width * height) / 14000) + 30) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
      vz: (Math.random() - 0.5) * 1.0,
      r: Math.random() * 2.5 + 1,
    })),
  }),
  frame: (c, { nodes }) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const cy = height / 2;
    const P = 800;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.07, 0.12)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = -10; i <= 10; i++) {
      ctx.moveTo(cx + i * 120 + pointer.x * 30, 0);
      ctx.lineTo(cx + i * 960 + pointer.x * 300, height);
    }
    ctx.stroke();
    const proj = nodes.map((n) => {
      n.x += n.vx;
      n.y += n.vy;
      n.z += n.vz;
      if (n.x < -300 || n.x > width + 300) n.vx *= -1;
      if (n.y < -300 || n.y > height + 300) n.vy *= -1;
      if (n.z < 0 || n.z > 1000) n.vz *= -1;
      const s = P / (P + n.z);
      return { s, x: cx + (n.x - cx) * s + pointer.x * 120 * s, y: cy + (n.y - cy) * s + pointer.y * 120 * s };
    });
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const pa = proj[i];
      ctx.fillStyle = `rgba(${rgb}, ${(1 - a.z / 1000) * ink(dark, 0.8, 0.6)})`;
      ctx.beginPath();
      ctx.arc(pa.x, pa.y, a.r * pa.s, 0, TAU);
      ctx.fill();
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (d < 250) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / 250) * ink(dark, 0.3, 0.38) * pa.s})`;
          ctx.lineWidth = pa.s;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(proj[j].x, proj[j].y);
          ctx.stroke();
        }
      }
    }
  },
};

// ── ComponentsLatticeBackground.tsx → drafting grid of UI atoms ─────────────
// Buttons, toggles, sliders and nodes on a drafting sheet; atoms near the
// cursor lift, rotate and wire themselves to it. Platform / builder sections.
type Atom = { ox: number; oy: number; x: number; y: number; type: number; rot: number; size: number; phase: number };
export const componentsLattice: Scene<{ atoms: Atom[] }> = {
  init: ({ width, height }) => {
    const atoms: Atom[] = [];
    for (let x = 80; x < width; x += 80)
      for (let y = 80; y < height; y += 80)
        if (Math.random() > 0.85)
          atoms.push({ ox: x, oy: y, x, y, type: Math.floor(Math.random() * 4), rot: (Math.random() - 0.5) * 0.2, size: 20 + Math.random() * 10, phase: Math.random() * TAU });
    return { atoms };
  },
  frame: (c, { atoms }, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const m = px(c);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.04, 0.05)})`;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 16) (ctx.moveTo(x, 0), ctx.lineTo(x, height));
    for (let y = 0; y <= height; y += 16) (ctx.moveTo(0, y), ctx.lineTo(width, y));
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.13, 0.12)})`;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 80) (ctx.moveTo(x, 0), ctx.lineTo(x, height));
    for (let y = 0; y <= height; y += 80) (ctx.moveTo(0, y), ctx.lineTo(width, y));
    ctx.stroke();
    // rotating drafting compass, top right
    ctx.save();
    ctx.translate(width - 100, 100);
    ctx.rotate(t * 0.2);
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.18, 0.2)})`;
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, TAU);
    ctx.moveTo(0, -45);
    ctx.lineTo(0, 45);
    ctx.moveTo(-45, 0);
    ctx.lineTo(45, 0);
    ctx.stroke();
    ctx.restore();
    for (const a of atoms) {
      const dx = m.x - a.ox;
      const dy = m.y - a.oy;
      const inf = pointer.inside ? Math.max(0, 1 - Math.hypot(dx, dy) / 320) : 0;
      a.x = a.ox + Math.sin(t * 0.5 + a.phase) * 6 + dx * inf * 0.1;
      a.y = a.oy + Math.cos(t * 0.4 + a.phase) * 6 + dy * inf * 0.1;
      const s = a.size;
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rot + inf * 0.15);
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.22, 0.32) + inf * 0.6})`;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      if (a.type === 0) {
        ctx.strokeRect(-s / 2, -s / 4, s, s / 2);
        if (inf > 0.3) {
          ctx.fillStyle = `rgba(${rgb}, ${inf * 0.15})`;
          ctx.fillRect(-s / 2, -s / 4, s, s / 2);
        }
      } else if (a.type === 1) {
        ctx.arc(0, 0, s / 3, 0, TAU);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = `rgb(${rgb})`;
        ctx.arc(Math.sin(t + a.phase) * (s / 8), 0, s / 10, 0, TAU);
        ctx.fill();
      } else if (a.type === 2) {
        ctx.moveTo(-s / 2, 0);
        ctx.lineTo(s / 2, 0);
        ctx.stroke();
        const k = Math.sin(t * 0.8 + a.phase) * (s / 3);
        ctx.fillStyle = dark ? '#05080f' : '#ffffff';
        ctx.fillRect(k - 3, -s / 4, 6, s / 2);
        ctx.strokeRect(k - 3, -s / 4, 6, s / 2);
      } else {
        ctx.arc(0, 0, s / 4, 0, TAU);
        ctx.moveTo(0, -s / 2);
        ctx.lineTo(0, s / 2);
        ctx.moveTo(-s / 2, 0);
        ctx.lineTo(s / 2, 0);
        ctx.stroke();
      }
      if (inf > 0.4) {
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${rgb})`;
        ctx.lineWidth = 1;
        ctx.arc(0, 0, s * 0.7, -Math.PI / 2, -Math.PI / 2 + TAU * inf);
        ctx.stroke();
      }
      ctx.restore();
      if (inf > 0.4) {
        ctx.setLineDash([2, 6]);
        ctx.strokeStyle = `rgba(${rgb}, ${inf * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        ctx.setLineDash([]);
        const p = (t * 1.5) % 1;
        ctx.fillStyle = `rgb(${rgb})`;
        ctx.beginPath();
        ctx.arc(a.x + (m.x - a.x) * p, a.y + (m.y - a.y) * p, 1.5, 0, TAU);
        ctx.fill();
      }
    }
    if (pointer.inside) {
      ctx.strokeStyle = `rgba(${rgb}, 0.25)`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 50, 0, TAU);
      ctx.stroke();
    }
  },
};

// ── TemplatesLatticeBackground.tsx → floating layout wireframes ─────────────
// Labelled frames drift over a ruled sheet; a crosshair tracks the cursor.
// Early access / onboarding: "here's how it fits together".
type Block = { x: number; y: number; w: number; h: number; vx: number; vy: number; id: number; label: string; rot: number };
const BLOCK_LABELS = ['Sources', 'Retrieval', 'Answer', 'Citations', 'Audit log', 'Access', 'Agents', 'Evaluation', 'Policies'];
export const templatesLattice: Scene<{ blocks: Block[] }> = {
  init: ({ width, height }) => ({
    blocks: Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      w: 140 + Math.random() * 180,
      h: 90 + Math.random() * 120,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      id: i,
      label: BLOCK_LABELS[i % BLOCK_LABELS.length],
      rot: (Math.random() - 0.5) * 0.02,
    })),
  }),
  frame: (c, { blocks }, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const ox = pointer.x * 20;
    const oy = pointer.y * 20;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.04, 0.05)})`;
    ctx.beginPath();
    for (let x = ox % 20; x < width; x += 20) (ctx.moveTo(x, 0), ctx.lineTo(x, height));
    for (let y = oy % 20; y < height; y += 20) (ctx.moveTo(0, y), ctx.lineTo(width, y));
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.12, 0.11)})`;
    ctx.beginPath();
    for (let x = ox % 120; x < width; x += 120) (ctx.moveTo(x, 0), ctx.lineTo(x, height));
    for (let y = oy % 120; y < height; y += 120) (ctx.moveTo(0, y), ctx.lineTo(width, y));
    ctx.stroke();
    const m = px(c);
    if (pointer.inside) {
      ctx.setLineDash([8, 8]);
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.2, 0.2)})`;
      ctx.beginPath();
      ctx.moveTo(m.x, 0);
      ctx.lineTo(m.x, height);
      ctx.moveTo(0, m.y);
      ctx.lineTo(width, m.y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.font = '600 9px Manrope, system-ui, sans-serif';
    for (const b of blocks) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < -b.w) b.x = width;
      if (b.x > width) b.x = -b.w;
      if (b.y < -b.h) b.y = height;
      if (b.y > height) b.y = -b.h;
      const bx = b.x + pointer.x * 35;
      const by = b.y + pointer.y * 35;
      ctx.save();
      ctx.translate(bx + b.w / 2, by + b.h / 2);
      ctx.rotate(b.rot + Math.sin(t * 0.5 + b.id) * 0.01);
      ctx.translate(-b.w / 2, -b.h / 2);
      const g = ctx.createLinearGradient(0, 0, b.w, b.h);
      g.addColorStop(0, dark ? `rgba(${rgb}, 0.14)` : 'rgba(255,255,255,0.85)');
      g.addColorStop(1, dark ? `rgba(${rgb}, 0.03)` : `rgba(${rgb}, 0.05)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, b.w, b.h);
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.4, 0.3)})`;
      ctx.strokeRect(0, 0, b.w, b.h);
      ctx.fillStyle = `rgb(${rgb})`;
      for (const [cx, cy] of [[0, 0], [b.w, 0], [0, b.h], [b.w, b.h]]) ctx.fillRect(cx - 2, cy - 2, 4, 4);
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = dark ? '#ffffff' : '#0f172a';
      ctx.fillText(b.label.toUpperCase(), 12, 18);
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    if (pointer.inside) {
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.4, 0.3)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(m.x, m.y, 25, 0, TAU);
      ctx.moveTo(m.x - 40, m.y);
      ctx.lineTo(m.x + 40, m.y);
      ctx.moveTo(m.x, m.y - 40);
      ctx.lineTo(m.x, m.y + 40);
      ctx.stroke();
    }
  },
};

// ── WebDevHeroBackground.tsx → probe grid: points flee a scanning lens ──────
// Service detail heroes (build / engineering).
type Probe = { ox: number; oy: number; x: number; y: number };
type Prim = { x: number; y: number; size: number; vx: number; vy: number; rot: number; rs: number };
type Rain = { x: number; y: number; len: number; speed: number; a: number };
export const webDevProbe: Scene<{ pts: Probe[]; prims: Prim[]; rain: Rain[] }> = {
  init: ({ width, height }) => {
    const pts: Probe[] = [];
    for (let x = -70; x <= width + 70; x += 70) for (let y = -70; y <= height + 70; y += 70) pts.push({ ox: x, oy: y, x, y });
    return {
      pts,
      prims: Array.from({ length: 8 }, () => ({ x: Math.random() * width, y: Math.random() * height, size: 50 + Math.random() * 100, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, rot: Math.random() * TAU, rs: (Math.random() - 0.5) * 0.005 })),
      rain: Array.from({ length: 25 }, () => ({ x: Math.random() * width, y: Math.random() * height, len: 40 + Math.random() * 100, speed: 0.5 + Math.random() * 2, a: 0.1 + Math.random() * 0.3 })),
    };
  },
  frame: (c, { pts, prims, rain }) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const m = pointer.inside ? px(c) : { x: -1e4, y: -1e4 };
    const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 600);
    glow.addColorStop(0, `rgba(${rgb}, ${ink(dark, 0.07, 0.05)})`);
    glow.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = glow;
    if (pointer.inside) ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;
    for (const r of rain) {
      r.y -= r.speed;
      if (r.y < -r.len) {
        r.y = height + r.len;
        r.x = Math.random() * width;
      }
      ctx.strokeStyle = `rgba(${rgb}, ${r.a * ink(dark, 1, 0.9)})`;
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x, r.y + r.len);
      ctx.stroke();
    }
    ctx.lineWidth = 0.5;
    for (const p of pts) {
      const dx = m.x - p.ox;
      const dy = m.y - p.oy;
      const d = Math.hypot(dx, dy);
      if (d < 350) {
        const f = (350 - d) / 350;
        const ang = Math.atan2(dy, dx);
        p.x = p.ox - Math.cos(ang) * f * 60;
        p.y = p.oy - Math.sin(ang) * f * 60;
        if (d < 180) {
          ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.2, 0.16) * f})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      } else {
        p.x = p.ox;
        p.y = p.oy;
      }
      ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.28, 0.42)})`;
      ctx.fillRect(p.x - 1.25, p.y - 1.25, 2.5, 2.5);
    }
    ctx.lineWidth = 1;
    for (const p of prims) {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rs;
      if (p.x < -p.size) p.x = width + p.size;
      if (p.x > width + p.size) p.x = -p.size;
      if (p.y < -p.size) p.y = height + p.size;
      if (p.y > height + p.size) p.y = -p.size;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.14, 0.18)})`;
      ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.25, 0.25)})`;
      for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) ctx.fillRect((sx * p.size) / 2 - 2, (sy * p.size) / 2 - 2, 4, 4);
      ctx.restore();
    }
    if (pointer.inside) {
      const r = 70;
      const k = 15;
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.25, 0.3)})`;
      ctx.beginPath();
      ctx.arc(m.x, m.y, r, 0, TAU);
      for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        ctx.moveTo(m.x + sx * r, m.y + sy * r - sy * k);
        ctx.lineTo(m.x + sx * r, m.y + sy * r);
        ctx.lineTo(m.x + sx * r - sx * k, m.y + sy * r);
      }
      ctx.stroke();
    }
  },
};

// ── MissionSuccessBackground.tsx → grid beams that ping the nodes they cross
type Beam = { x: number; y: number; vx: number; vy: number; ok: boolean };
export const missionBeams: Scene<{ beams: Beam[]; pings: Map<string, number> }> = {
  init: () => ({ beams: [], pings: new Map() }),
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const S = 100;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.07, 0.11)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += S) (ctx.moveTo(x, 0), ctx.lineTo(x, height));
    for (let y = 0; y <= height; y += S) (ctx.moveTo(0, y), ctx.lineTo(width, y));
    ctx.stroke();
    if (time && Math.random() > 0.93) {
      const h = Math.random() > 0.5;
      st.beams.push({
        x: h ? -50 : Math.floor((Math.random() * width) / S) * S,
        y: h ? Math.floor((Math.random() * height) / S) * S : -50,
        vx: h ? 7 : 0,
        vy: h ? 0 : 7,
        ok: Math.random() > 0.75,
      });
    }
    st.beams = st.beams.filter((b) => {
      b.x += b.vx;
      b.y += b.vy;
      const col = b.ok ? (dark ? '74, 222, 128' : '22, 163, 74') : rgb;
      const g = ctx.createLinearGradient(b.x - b.vx * 12, b.y - b.vy * 12, b.x, b.y);
      g.addColorStop(0, `rgba(${col}, 0)`);
      g.addColorStop(1, `rgba(${col}, ${ink(dark, 0.9, 0.75)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(b.x - b.vx * 12, b.y - b.vy * 12);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      if (b.x % S < 7 && b.y % S < 7 && b.x >= 0 && b.y >= 0) st.pings.set(`${Math.round(b.x / S)}:${Math.round(b.y / S)}`, 1);
      return b.x < width + 100 && b.y < height + 100;
    });
    for (const [k, p] of st.pings) {
      const [gx, gy] = k.split(':').map(Number);
      ctx.strokeStyle = `rgba(${rgb}, ${p * ink(dark, 0.45, 0.5)})`;
      ctx.beginPath();
      ctx.arc(gx * S, gy * S, (1 - p) * 18 + 2, 0, TAU);
      ctx.stroke();
      const n = p * 0.93;
      if (n < 0.02) st.pings.delete(k);
      else st.pings.set(k, n);
    }
  },
};

// ── BackgroundBeams.tsx (BeamsWithCollision) → beams fall and burst on a floor
type Fall = { x: number; y: number; len: number; speed: number; wait: number };
type Spark = { x: number; y: number; vx: number; vy: number; life: number };
export const collisionBeams: Scene<{ beams: Fall[]; sparks: Spark[] }> = {
  init: ({ width }) => ({
    beams: Array.from({ length: Math.max(6, Math.floor(width / 140)) }, () => ({
      x: Math.random() * width,
      y: -Math.random() * 600,
      len: 24 + Math.random() * 60,
      speed: 2 + Math.random() * 4,
      wait: 0,
    })),
    sparks: [],
  }),
  frame: (c, st) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const floor = height - 2;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.18, 0.2)})`;
    ctx.beginPath();
    ctx.moveTo(0, floor);
    ctx.lineTo(width, floor);
    ctx.stroke();
    for (const b of st.beams) {
      if (b.wait > 0) {
        b.wait--;
        continue;
      }
      b.y += b.speed;
      if (b.y >= floor) {
        for (let i = 0; i < 14; i++) st.sparks.push({ x: b.x, y: floor, vx: (Math.random() - 0.5) * 3, vy: -Math.random() * 2.5 - 0.5, life: 1 });
        b.y = -b.len - Math.random() * 200;
        b.x = Math.random() * width;
        b.wait = Math.floor(Math.random() * 120);
        continue;
      }
      const g = ctx.createLinearGradient(b.x, b.y - b.len, b.x, b.y);
      g.addColorStop(0, `rgba(${rgb}, 0)`);
      g.addColorStop(1, `rgba(${rgb}, ${ink(dark, 0.85, 0.7)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(b.x, b.y - b.len);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    st.sparks = st.sparks.filter((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.06;
      s.life -= 0.025;
      ctx.fillStyle = `rgba(${rgb}, ${Math.max(0, s.life) * ink(dark, 0.9, 0.7)})`;
      ctx.fillRect(s.x - 1, s.y - 1, 2, 2);
      return s.life > 0;
    });
  },
};

// ── BioPulseBackground.tsx → hex mesh with pulses travelling the edges ──────
// Careers / people: a living network. Mesh bends away from the cursor.
type Hex = { ox: number; oy: number; x: number; y: number; nb: number[] };
type Pulse = { a: number; b: number; p: number; speed: number; o: number };
export const bioPulse: Scene<{ pts: Hex[]; pulses: Pulse[] }> = {
  init: ({ width, height }) => {
    const size = 50;
    const hh = Math.sqrt(3) * size;
    const pts: Hex[] = [];
    for (let col = 0; col < Math.ceil(width / (size * 1.5)) + 2; col++)
      for (let r = 0; r < Math.ceil(height / hh) + 2; r++) {
        const x = col * size * 1.5;
        const y = r * hh + (col % 2 ? hh / 2 : 0);
        pts.push({ ox: x, oy: y, x, y, nb: [] });
      }
    pts.forEach((p, i) => pts.forEach((q, j) => i !== j && Math.hypot(p.ox - q.ox, p.oy - q.oy) < size * 1.8 && p.nb.push(j)));
    return { pts, pulses: [] };
  },
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark, pointer, scrollVelocity } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const m = pointer.inside ? px(c) : { x: -1e4, y: -1e4 };
    const beat = 1 + Math.min(Math.abs(scrollVelocity) * 0.05, 2);
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.09, 0.1)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    st.pts.forEach((p) => {
      const d = Math.hypot(m.x - p.ox, m.y - p.oy);
      if (d < 300) {
        const f = (300 - d) / 300;
        const a = Math.atan2(m.y - p.oy, m.x - p.ox);
        p.x = p.ox - Math.cos(a) * f * 30;
        p.y = p.oy - Math.sin(a) * f * 30;
      } else {
        p.x = p.ox;
        p.y = p.oy + Math.sin(t + p.ox * 0.01) * 3;
      }
    });
    st.pts.forEach((p, i) => p.nb.forEach((j) => j > i && (ctx.moveTo(p.x, p.y), ctx.lineTo(st.pts[j].x, st.pts[j].y))));
    ctx.stroke();
    if (time && st.pulses.length < 25 && Math.random() > 0.9) {
      const a = Math.floor(Math.random() * st.pts.length);
      const nb = st.pts[a].nb;
      if (nb.length) st.pulses.push({ a, b: nb[Math.floor(Math.random() * nb.length)], p: 0, speed: 0.005 + Math.random() * 0.015, o: 0.4 + Math.random() * 0.6 });
    }
    st.pulses = st.pulses.filter((q) => {
      q.p += q.speed * beat;
      if (q.p >= 1) {
        const nb = st.pts[q.b].nb;
        if (!nb.length || Math.random() < 0.2) return false;
        q.a = q.b;
        q.b = nb[Math.floor(Math.random() * nb.length)];
        q.p = 0;
      }
      const A = st.pts[q.a];
      const B = st.pts[q.b];
      ctx.fillStyle = `rgba(${rgb}, ${q.o * ink(dark, 1, 0.75)})`;
      ctx.beginPath();
      ctx.arc(A.x + (B.x - A.x) * q.p, A.y + (B.y - A.y) * q.p, 2, 0, TAU);
      ctx.fill();
      return true;
    });
  },
};

// ── ModularLattice.tsx → square grid, packets travel the lines ──────────────
type Packet = { x: number; y: number; vx: number; vy: number };
export const modularLattice: Scene<{ packets: Packet[] }> = {
  init: () => ({ packets: [] }),
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const S = 60;
    const m = pointer.inside ? px(c) : { x: -1e4, y: -1e4 };
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.07, 0.1)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += S) (ctx.moveTo(x, 0), ctx.lineTo(x, height));
    for (let y = 0; y <= height; y += S) (ctx.moveTo(0, y), ctx.lineTo(width, y));
    ctx.stroke();
    if (pointer.inside) {
      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 300);
      g.addColorStop(0, `rgba(${rgb}, ${ink(dark, 0.15, 0.1)})`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }
    if (time && st.packets.length < 50 && Math.random() > 0.9) {
      const h = Math.random() > 0.5;
      st.packets.push({
        x: h ? -20 : Math.floor((Math.random() * width) / S) * S,
        y: h ? Math.floor((Math.random() * height) / S) * S : -20,
        vx: h ? 2 + Math.random() * 3 : 0,
        vy: h ? 0 : 2 + Math.random() * 3,
      });
    }
    st.packets = st.packets.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      const near = Math.hypot(p.x - m.x, p.y - m.y) < 200;
      ctx.fillStyle = `rgba(${rgb}, ${near ? 0.85 : ink(dark, 0.35, 0.45)})`;
      ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
      return p.x < width + 50 && p.y < height + 50;
    });
  },
};

// ── SonarEchoWaves.tsx → sonar pings expanding from a fixed origin ──────────
type Ring = { r: number; o: number };
export const sonarEcho: Scene<{ rings: Ring[]; last: number }> = {
  init: () => ({ rings: [{ r: 120, o: 0.4 }, { r: 380, o: 0.25 }], last: 0 }),
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    if (time - st.last > 2600) {
      st.rings.push({ r: 0, o: 0.55 });
      st.last = time;
    }
    const cx = width > 1024 ? width * 0.7 : width * 0.5;
    const cy = height * 0.5;
    const k = ink(dark, 1, 1.25);
    // static range rings + crosshair, like a sonar screen
    ctx.strokeStyle = `rgba(${rgb}, ${0.06 * k})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let r = 100; r < Math.max(width, height); r += 100) ctx.moveTo(cx + r, cy), ctx.arc(cx, cy, r, 0, TAU);
    ctx.moveTo(cx - width, cy);
    ctx.lineTo(cx + width, cy);
    ctx.moveTo(cx, cy - height);
    ctx.lineTo(cx, cy + height);
    ctx.stroke();
    st.rings = st.rings.filter((ring) => {
      ring.r += 1.6;
      ring.o -= 0.0012;
      if (ring.o <= 0) return false;
      ctx.strokeStyle = `rgba(${rgb}, ${ring.o * k})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, TAU);
      ctx.stroke();
      if (ring.r > 50) {
        ctx.strokeStyle = `rgba(${rgb}, ${ring.o * 0.35 * k})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, ring.r - 20, 0, TAU);
        ctx.stroke();
      }
      return true;
    });
    // rotating sweep
    const a = (time * 0.0006) % TAU;
    const g = ctx.createConicGradient ? ctx.createConicGradient(a, cx, cy) : null;
    if (g) {
      g.addColorStop(0, `rgba(${rgb}, ${0.12 * k})`);
      g.addColorStop(0.08, `rgba(${rgb}, 0)`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(width, height), 0, TAU);
      ctx.fill();
    }
  },
};

// ── SpatialDisplacement.tsx → dot field that parts around the cursor ────────
type Dot = { ox: number; oy: number; x: number; y: number };
export const spatialDisplacement: Scene<{ pts: Dot[] }> = {
  init: ({ width, height }) => {
    const pts: Dot[] = [];
    for (let x = 0; x <= width + 50; x += 50) for (let y = 0; y <= height + 50; y += 50) pts.push({ ox: x, oy: y, x, y });
    return { pts };
  },
  frame: (c, { pts }, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const m = pointer.inside ? px(c) : { x: -1e4, y: -1e4 };
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.35, 0.4)})`;
    ctx.lineWidth = 1;
    for (const p of pts) {
      const dx = m.x - p.ox;
      const dy = m.y - p.oy;
      const d = Math.hypot(dx, dy);
      if (d < 300) {
        const f = (300 - d) / 300;
        const a = Math.atan2(dy, dx);
        p.x = p.ox - Math.cos(a) * f * 50;
        p.y = p.oy - Math.sin(a) * f * 50;
      } else {
        p.x = p.ox;
        p.y = p.oy + Math.sin(p.ox * 0.01 + t) * 5;
      }
      ctx.fillStyle = `rgba(${rgb}, ${d < 200 ? 0.55 : ink(dark, 0.16, 0.24)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, d < 200 ? 1.4 : 1.1, 0, TAU);
      ctx.fill();
      if (Math.hypot(p.x - m.x, p.y - m.y) < 150) {
        ctx.beginPath();
        ctx.moveTo(p.x - 5, p.y);
        ctx.lineTo(p.x + 5, p.y);
        ctx.moveTo(p.x, p.y - 5);
        ctx.lineTo(p.x, p.y + 5);
        ctx.stroke();
      }
    }
  },
};

// ── AcousticResonance.tsx → layered sine waves ──────────────────────────────
// Quiet and horizontal — good behind FAQ and long text sections.
export const acousticWaves: Scene<Record<string, never>> = {
  init: () => ({}),
  frame: (c, _s, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const phase = time * 0.0006;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.lineWidth = i % 2 ? 1 : 2;
      ctx.strokeStyle = `rgba(${rgb}, ${(i % 2 ? 0.07 : 0.12 + i * 0.02) * ink(dark, 1, 1.2)})`;
      const amp = 40 + i * 15;
      const f = 0.002 + i * 0.001;
      for (let x = 0; x <= width; x += 8) {
        const y = height / 2 + Math.sin(x * f + phase + i * 0.5) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  },
};

// ── AssemblyLinePulses.tsx → vertical rails with pulses dropping down ───────
type Drop = { x: number; y: number; speed: number };
export const assemblyLine: Scene<{ drops: Drop[] }> = {
  init: () => ({ drops: [] }),
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const S = 120;
    const n = Math.ceil(width / S) + 1;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.08, 0.1)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < n; i++) (ctx.moveTo(i * S, 0), ctx.lineTo(i * S, height));
    ctx.stroke();
    if (time && Math.random() > 0.92) st.drops.push({ x: Math.floor(Math.random() * n) * S, y: -50, speed: 2 + Math.random() * 4 });
    ctx.lineCap = 'round';
    st.drops = st.drops.filter((p) => {
      p.y += p.speed;
      const g = ctx.createLinearGradient(p.x, p.y - 40, p.x, p.y);
      g.addColorStop(0, `rgba(${rgb}, 0)`);
      g.addColorStop(1, `rgba(${rgb}, ${ink(dark, 0.9, 0.75)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - 40);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.fillStyle = `rgb(${rgb})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, TAU);
      ctx.fill();
      return p.y < height + 100;
    });
  },
};

// ── VanguardStarfield.tsx → depth starfield, warps into streaks on scroll ───
// In light mode the stars are drawn in brand blue (white stars vanish on white).
type Star = { x: number; y: number; z: number; size: number; o: number };
export const starfield: Scene<{ stars: Star[] }> = {
  init: ({ width, height }) => ({
    stars: Array.from({ length: 320 }, () => ({ x: (Math.random() - 0.5) * width * 2, y: (Math.random() - 0.5) * height * 2, z: Math.random() * width, size: Math.random() * 2, o: Math.random() * 0.5 + 0.3 })),
  }),
  frame: (c, { stars }) => {
    const { ctx, width, height, rgb, dark, pointer, scrollVelocity } = c;
    ctx.clearRect(0, 0, width, height);
    const warp = Math.min(Math.abs(scrollVelocity) * 0.4, 30);
    const P = width / 2;
    for (const s of stars) {
      s.z -= 0.5 + warp;
      if (s.z <= 0) {
        s.z = width;
        s.x = (Math.random() - 0.5) * width * 2;
        s.y = (Math.random() - 0.5) * height * 2;
      }
      const sc = P / (P + s.z);
      const x = width / 2 + s.x * sc + pointer.x * 50 * sc;
      const y = height / 2 + s.y * sc + pointer.y * 50 * sc;
      if (x < 0 || x > width || y < 0 || y > height) continue;
      const a = Math.max(0, Math.min(1, (1 - s.z / width) * s.o * ink(dark, 1, 1.3)));
      if (warp > 2) {
        ctx.strokeStyle = `rgba(${rgb}, ${a})`;
        ctx.lineWidth = Math.max(0.3, s.size);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + (scrollVelocity > 0 ? -warp : warp));
        ctx.stroke();
      } else {
        ctx.fillStyle = dark ? `rgba(255,255,255,${a})` : `rgba(${rgb}, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.3, s.size * (1 - s.z / width) * 1.5), 0, TAU);
        ctx.fill();
      }
    }
  },
};

// ── MatrixRain3D.tsx → depth-sorted hex rain with real keywords ─────────────
// Keywords are the platform's own vocabulary. Security / engineering.
const HEX = '0123456789ABCDEF';
const WORDS = ['CITE', 'TRACE', 'AUDIT', 'REDACT', 'RETRIEVE', 'POPIA', 'AGENT', 'EVAL', 'ACCESS'];
type RainDrop = { x: number; y: number; z: number; speed: number; text: string[]; word: boolean; fs: number; o: number };
const newDrop = (w: number, h: number, y?: number): RainDrop => {
  const z = Math.random();
  const word = Math.random() > 0.94;
  const text = word ? WORDS[Math.floor(Math.random() * WORDS.length)].split('') : Array.from({ length: 10 + Math.floor(Math.random() * 18) }, () => HEX[Math.floor(Math.random() * 16)]);
  return { x: Math.random() * w, y: y ?? -Math.random() * 800 - 100, z, speed: (1 + Math.random() * 2) * (0.5 + z * 1.5), text, word, fs: 10 + z * 16, o: 0.08 + z * 0.55 };
};
export const matrixRain: Scene<{ drops: RainDrop[] }> = {
  init: ({ width, height }) => ({ drops: Array.from({ length: Math.floor(width / 24) }, () => newDrop(width, height, Math.random() * height)).sort((a, b) => a.z - b.z) }),
  frame: (c, st) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const k = ink(dark, 1, 0.85);
    st.drops.forEach((d, i) => {
      ctx.font = `600 ${d.fs}px "JetBrains Mono", monospace`;
      d.text.forEach((ch, j) => {
        const y = d.y - j * d.fs * 1.1;
        if (y > height + 50 || y < -50) return;
        const head = j === 0;
        const char = !d.word && Math.random() > 0.98 ? HEX[Math.floor(Math.random() * 16)] : ch;
        ctx.fillStyle = head ? (dark ? `rgba(200,230,255,${d.o})` : `rgba(${rgb}, ${Math.min(1, d.o * 1.4)})`) : `rgba(${rgb}, ${d.o * k * (d.word ? 1.3 : 1) * (1 - j / (d.text.length + 4))})`;
        ctx.fillText(char, d.x, y);
      });
      d.y += d.speed;
      if (d.y - d.text.length * d.fs * 1.1 > height) st.drops[i] = newDrop(width, height);
    });
  },
};

// ── StellarNebulaBackground.tsx → slow drifting particle haze ───────────────
type Mote = { x: number; y: number; r: number; v: number; a: number; o: number };
export const nebula: Scene<{ motes: Mote[] }> = {
  init: ({ width, height }) => ({
    motes: Array.from({ length: Math.min(140, Math.floor((width * height) / 9000)) }, () => ({ x: Math.random() * width, y: Math.random() * height, r: Math.random() * 2 + 0.5, v: 0.1 + Math.random() * 0.4, a: Math.random() * TAU, o: 0.2 + Math.random() * 0.5 })),
  }),
  frame: (c, { motes }, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.0002;
    // two soft nebula clouds that orbit slowly
    for (let i = 0; i < 2; i++) {
      const x = width * (0.3 + i * 0.4) + Math.cos(t + i * 3) * width * 0.08;
      const y = height * (0.4 + i * 0.2) + Math.sin(t * 1.3 + i) * height * 0.1;
      const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.35);
      g.addColorStop(0, `rgba(${rgb}, ${ink(dark, 0.1, 0.07)})`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }
    for (const p of motes) {
      p.x += Math.cos(p.a) * p.v;
      p.y += Math.sin(p.a) * p.v;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      ctx.fillStyle = `rgba(${rgb}, ${p.o * ink(dark, 1, 0.85)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.fill();
    }
  },
};

// ── GaiaEcoBackground.tsx → hex honeycomb lit by a travelling wave ──────────
// Recoloured to brand blue. Photons float upward and are drawn to the cursor.
type Photon = { x: number; y: number; vx: number; vy: number; r: number; o: number };
export const hexField: Scene<{ photons: Photon[] }> = {
  init: ({ width, height }) => ({
    photons: Array.from({ length: 36 }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 1.0, vy: -0.4 - Math.random() * 1.2, r: 1 + Math.random() * 2, o: 0.15 + Math.random() * 0.45 })),
  }),
  frame: (c, { photons }, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    const size = 35;
    const hd = size * 1.5;
    const vd = Math.sqrt(3) * size;
    const m = pointer.inside ? px(c) : { x: -1e4, y: -1e4 };
    const base = ink(dark, 0.05, 0.06);
    for (let col = 0; col < Math.ceil(width / hd) + 1; col++)
      for (let r = 0; r < Math.ceil(height / vd) + 1; r++) {
        const x = col * hd;
        const y = r * vd + (col % 2 ? vd / 2 : 0);
        const hi = Math.max(0, Math.max(0, 1 - Math.hypot(x - m.x, y - m.y) / 300) + Math.sin(col * 0.2 + t) * 0.12);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i;
          if (i) ctx.lineTo(x + size * Math.cos(a), y + size * Math.sin(a));
          else ctx.moveTo(x + size * Math.cos(a), y + size * Math.sin(a));
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(${rgb}, ${base + hi * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        if (hi > 0.15) {
          ctx.fillStyle = `rgba(${rgb}, ${hi * 0.05})`;
          ctx.fill();
        }
      }
    for (const p of photons) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      const d = Math.hypot(p.x - m.x, p.y - m.y);
      const pull = d < 200 ? (200 - d) / 200 : 0;
      p.x += (m.x - p.x) * pull * 0.02;
      p.y += (m.y - p.y) * pull * 0.02;
      ctx.fillStyle = `rgba(${rgb}, ${p.o * ink(dark, 1, 0.9)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, TAU);
      ctx.fill();
    }
  },
};

// ── EstateSpatialBackground.tsx → tilted perspective floor grid ─────────────
export const perspectiveFloor: Scene<Record<string, never>> = {
  init: () => ({}),
  frame: (c, _s, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const drift = (time * 0.02) % 80;
    const horizon = height * 0.35 + pointer.y * 20;
    const cx = width / 2 + pointer.x * 60;
    ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.12, 0.13)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = -30; i <= 30; i++) {
      ctx.moveTo(cx + i * 6, horizon);
      ctx.lineTo(cx + i * 160, height + 40);
    }
    for (let j = 0; j < 22; j++) {
      const z = (j * 80 + drift) / (22 * 80);
      const y = horizon + Math.pow(z, 2.2) * (height - horizon + 40);
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
    // horizon glow
    const g = ctx.createLinearGradient(0, horizon - 60, 0, horizon + 60);
    g.addColorStop(0, `rgba(${rgb}, 0)`);
    g.addColorStop(0.5, `rgba(${rgb}, ${ink(dark, 0.12, 0.08)})`);
    g.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, horizon - 60, width, 120);
  },
};
