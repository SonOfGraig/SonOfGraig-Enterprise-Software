import type { Scene, SceneContext } from './useCanvasScene';

// Scenes drawn for Graig's page (/graig, served at graig.sonofgraig.com) and used
// nowhere else. They are not ports: each one is built from an idea in his own life:
// two minds merging, the rings of his second brain, a decision being made, a
// hash-chained log, his voice, the sealed twin, his orbit mark. Same engine and rules
// as scenes.ts: colour from the theme, brand blue only (ink stands in for Tumiso), any
// text is real (his memory layers are the console's own LAYER_LABEL), no telemetry.

const TAU = Math.PI * 2;
const ink = (dark: boolean, d: number, l: number) => (dark ? d : l);
/** The human side: white on dark, near-black on light. */
const human = (dark: boolean, a: number) => (dark ? `rgba(240,244,248,${a})` : `rgba(13,17,23,${a})`);
const ptr = (c: SceneContext) => ({ x: (c.pointer.x / 2 + 0.5) * c.width, y: (c.pointer.y / 2 + 0.5) * c.height });

// ── twinMerge: hero. Two fields meet at a seam and braid into one stream ─────
// Left particles are Tumiso (ink), right are Graig (blue). Each drifts toward the
// seam; there it joins a double helix that runs down the page and its colour shifts
// toward the other side's, so what leaves the seam is both. The pointer bends the seam.
type Mote = { x: number; y: number; vx: number; side: -1 | 1; r: number; phase: number; a: number; braid: number };
export const twinMerge: Scene<{ motes: Mote[] }> = {
  init: ({ width, height }) => {
    const n = Math.min(260, Math.floor((width * height) / 5200));
    const motes: Mote[] = [];
    for (let i = 0; i < n; i++) {
      const side = (i % 2 ? 1 : -1) as -1 | 1;
      motes.push({
        x: width / 2 + side * (Math.random() * width * 0.55 + 20),
        y: Math.random() * height, vx: 0, side,
        r: Math.random() * 1.6 + 0.6, phase: Math.random() * TAU, a: 0.25 + Math.random() * 0.5, braid: 0,
      });
    }
    return { motes };
  },
  frame: (c, { motes }, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    const t = time * 0.001;
    ctx.clearRect(0, 0, width, height);
    const seamX = (y: number) => width / 2 + Math.sin(y * 0.006 + t * 0.6) * 18 + (pointer.inside ? pointer.x * 60 : 0);

    // the seam itself: two strands of a helix, one ink, one blue
    for (let s = 0; s < 2; s++) {
      ctx.beginPath();
      for (let y = -10; y <= height + 10; y += 6) {
        const x = seamX(y) + Math.sin(y * 0.03 - t * 2 + s * Math.PI) * 14;
        if (y < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = s ? `rgba(${rgb}, ${ink(dark, 0.45, 0.5)})` : human(dark, ink(dark, 0.22, 0.25));
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    for (const m of motes) {
      const sx = seamX(m.y);
      const d = (sx - m.x) * m.side * -1; // distance to the seam on its own side (>0 = still out)
      if (m.braid > 0) {
        // riding the helix
        m.braid += 0.004;
        m.y += 0.9;
        m.x = sx + Math.sin(m.y * 0.03 - t * 2 + (m.side > 0 ? Math.PI : 0)) * 14;
        if (m.braid > 1 || m.y > height + 10) {
          m.braid = 0;
          m.y = Math.random() * height;
          m.x = width / 2 + m.side * (width * 0.3 + Math.random() * width * 0.25);
        }
      } else {
        m.vx += (sx - m.x) * 0.00004 + Math.sin(t + m.phase) * 0.004;
        m.vx *= 0.985;
        m.x += m.vx;
        m.y += Math.sin(t * 0.7 + m.phase) * 0.25;
        if (Math.abs(d) < 10) m.braid = 0.001;
      }
      // colour moves toward the other side's as it is braided in
      const k = Math.min(1, m.braid * 2.2);
      const blueness = m.side > 0 ? 1 - k * 0.5 : k * 0.5;
      const alpha = m.a * (m.braid > 0 ? 1 - Math.max(0, m.braid - 0.6) * 2.5 : 1);
      ctx.fillStyle = blueness > 0.5 ? `rgba(${rgb}, ${alpha})` : human(dark, alpha * 0.8);
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r + (m.braid > 0 ? 0.6 : 0), 0, TAU);
      ctx.fill();
    }
  },
};

// ── memoryRings: the rings of his second brain, recall travelling inward ─────
// Concentric rings in the console atlas's order (Core → Apps), dotted with nodes.
// Now and then a pulse leaves an outer node and runs to the core: one recall.
const LAYERS = ['Core', 'Skills', 'Code', 'Memory', 'Routines', 'Apps'];
const RADII = [0, 0.13, 0.22, 0.5, 0.86, 0.97];
type RNode = { ring: number; ang: number; speed: number; r: number };
type Recall = { ring: number; ang: number; p: number };
export const memoryRings: Scene<{ nodes: RNode[]; recalls: Recall[] }> = {
  init: () => {
    const nodes: RNode[] = [];
    RADII.forEach((_, ring) => {
      if (!ring) return;
      const n = ring === 3 ? 90 : 14 + ring * 8;
      for (let i = 0; i < n; i++) nodes.push({
        ring, ang: Math.random() * TAU, speed: (0.00004 + Math.random() * 0.00006) * (ring % 2 ? 1 : -1),
        // the memory ring is a band (0.34–0.76 in the atlas), the rest are lines
        r: ring === 3 ? 0.34 + Math.random() * 0.42 : RADII[ring],
      });
    });
    return { nodes, recalls: [] };
  },
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const cx = width * 0.78, cy = height * 0.5;
    const R = Math.max(width, height) * 0.62;
    ctx.lineWidth = 1;
    RADII.forEach((r, i) => {
      if (!i) return;
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, i === 3 ? 0.1 : 0.14, i === 3 ? 0.12 : 0.18)})`;
      ctx.beginPath(); ctx.arc(cx, cy, r * R, 0, TAU); ctx.stroke();
      ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.4, 0.55)})`;
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.fillText(LAYERS[i].toUpperCase(), cx - r * R + 6, cy - 6);
    });
    ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.8, 0.85)})`;
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, TAU); ctx.fill();
    for (const n of st.nodes) {
      n.ang += n.speed * 16;
      const r = n.r * R;
      ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.45, 0.5)})`;
      ctx.beginPath(); ctx.arc(cx + Math.cos(n.ang) * r, cy + Math.sin(n.ang) * r, 1.4, 0, TAU); ctx.fill();
    }
    if (time && st.recalls.length < 3 && Math.random() > 0.985) {
      const src = st.nodes[Math.floor(Math.random() * st.nodes.length)];
      st.recalls.push({ ring: src.ring, ang: src.ang, p: 0 });
    }
    st.recalls = st.recalls.filter((rc) => {
      rc.p += 0.008;
      const r0 = RADII[rc.ring] * R;
      const r = r0 * (1 - rc.p);
      const a = rc.ang + rc.p * 0.8;
      const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
      g.addColorStop(0, `rgba(${rgb}, ${0.9 * (1 - rc.p * 0.5)})`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, 14, 0, TAU); ctx.fill();
      return rc.p < 1;
    });
  },
};

// ── decisionBranches: a choice travels a tree and commits to one branch ──────
// Paths fork left to right. A light runs from the root, picks a branch at each fork
// (that branch brightens and stays lit a moment), and the unchosen ones fade.
type Edge = { x0: number; y0: number; x1: number; y1: number; depth: number; parent: number; lit: number };
export const decisionBranches: Scene<{ edges: Edge[]; path: number[]; p: number }> = {
  init: ({ width, height }) => {
    const edges: Edge[] = [];
    const depthMax = 5;
    const grow = (x: number, y: number, depth: number, spread: number, parent: number) => {
      if (depth >= depthMax) return;
      for (const dir of [-1, 1]) {
        const x1 = x + width / (depthMax + 0.6), y1 = y + dir * spread;
        edges.push({ x0: x, y0: y, x1, y1, depth, parent, lit: 0 });
        grow(x1, y1, depth + 1, spread * 0.52, edges.length - 1);
      }
    };
    grow(-20, height / 2, 0, height * 0.24, -1);
    return { edges, path: [], p: 1 };
  },
  frame: (c, st) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    if (st.p >= 1 || !st.path.length) {
      // choose a new root-to-leaf path
      st.path = [];
      let parent = -1;
      for (;;) {
        const kids = st.edges.map((e, i) => (e.parent === parent ? i : -1)).filter((i) => i >= 0);
        if (!kids.length) break;
        const pick = kids[Math.random() > 0.5 ? 1 : 0];
        st.path.push(pick);
        parent = pick;
      }
      st.p = 0;
    }
    st.p += 0.0035;
    const seg = st.p * st.path.length;
    st.path.forEach((ei, k) => { if (k < seg) st.edges[ei].lit = 1; });
    ctx.lineCap = 'round';
    for (const e of st.edges) {
      e.lit *= 0.992;
      const base = ink(dark, 0.08, 0.12) + (5 - e.depth) * 0.01;
      ctx.strokeStyle = `rgba(${rgb}, ${base + e.lit * 0.5})`;
      ctx.lineWidth = 1 + e.lit * 1.5;
      ctx.beginPath();
      const mx = (e.x0 + e.x1) / 2;
      ctx.moveTo(e.x0, e.y0);
      ctx.bezierCurveTo(mx, e.y0, mx, e.y1, e.x1, e.y1);
      ctx.stroke();
      ctx.fillStyle = `rgba(${rgb}, ${base * 2 + e.lit * 0.5})`;
      ctx.beginPath(); ctx.arc(e.x1, e.y1, 2 + e.lit * 1.5, 0, TAU); ctx.fill();
    }
    // the travelling choice
    const k = Math.min(st.path.length - 1, Math.floor(seg));
    const e = st.edges[st.path[k]];
    if (e && st.p < 1) {
      const f = seg - k, mx = (e.x0 + e.x1) / 2;
      const bx = (1 - f) ** 3 * e.x0 + 3 * (1 - f) ** 2 * f * mx + 3 * (1 - f) * f * f * mx + f ** 3 * e.x1;
      const by = (1 - f) ** 3 * e.y0 + 3 * (1 - f) ** 2 * f * e.y0 + 3 * (1 - f) * f * f * e.y1 + f ** 3 * e.y1;
      const g = ctx.createRadialGradient(bx, by, 0, bx, by, 18);
      g.addColorStop(0, `rgba(${rgb}, 0.95)`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(bx, by, 18, 0, TAU); ctx.fill();
    }
  },
};

// ── hashChain: blocks sealed one to the next, scrolling past ─────────────────
// Rows of blocks linked by a line. The newest block at the right edge seals with a
// flash and links to the one before it: his tamper-evident log.
type Block = { x: number; row: number; seal: number; w: number };
export const hashChain: Scene<{ blocks: Block[]; rows: number; next: number }> = {
  init: ({ width, height }) => {
    const rows = Math.max(3, Math.floor(height / 120));
    const blocks: Block[] = [];
    for (let r = 0; r < rows; r++) for (let x = -40; x < width + 80; x += 96) blocks.push({ x: x + (r % 2) * 48, row: r, seal: 0, w: 44 + Math.random() * 18 });
    return { blocks, rows, next: 0 };
  },
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark, scrollVelocity } = c;
    ctx.clearRect(0, 0, width, height);
    const speed = 0.35 + Math.min(Math.abs(scrollVelocity) * 0.05, 2);
    const rowH = height / st.rows;
    for (let r = 0; r < st.rows; r++) {
      const y = rowH * (r + 0.5);
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.1, 0.14)})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      ctx.setLineDash([]);
    }
    if (time > st.next) {
      const row = st.blocks.filter((b) => b.x > width * 0.55 && b.seal === 0);
      if (row.length) row[Math.floor(Math.random() * row.length)].seal = 1;
      st.next = time + 900;
    }
    for (const b of st.blocks) {
      b.x -= speed;
      if (b.x < -100) { b.x += Math.ceil((width + 200) / 96) * 96; b.seal = 0; }
      const y = rowH * (b.row + 0.5);
      const h = 22;
      const flash = b.seal > 0.5 ? (b.seal - 0.5) * 2 : 0;
      if (b.seal > 0) b.seal = Math.max(0.5, b.seal - 0.01);
      ctx.fillStyle = b.seal ? `rgba(${rgb}, ${ink(dark, 0.08, 0.06) + flash * 0.25})` : 'transparent';
      ctx.strokeStyle = `rgba(${rgb}, ${(b.seal ? ink(dark, 0.4, 0.45) : ink(dark, 0.14, 0.2)) + flash * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(b.x, y - h / 2, b.w, h, 4);
      ctx.fill(); ctx.stroke();
      if (b.seal) {
        // the link back to the previous block
        ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.35, 0.4) + flash * 0.4})`;
        ctx.beginPath(); ctx.moveTo(b.x, y); ctx.lineTo(b.x - (96 - b.w), y); ctx.stroke();
        ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.6, 0.7)})`;
        for (let k = 0; k < 4; k++) ctx.fillRect(b.x + 7 + k * 8, y - 1, 5, 2);
      }
    }
  },
};

// ── voicePrint: his voice. Bars that speak in phrases, then rest ─────────────
// A centred spectrum that runs in bursts like speech (phrase, pause, phrase), with a
// soft trace of the last phrase behind it. Behind the "watch him work" section.
export const voicePrint: Scene<{ bars: number[]; trail: number[]; phrase: number; rest: number }> = {
  init: ({ width }) => {
    const n = Math.max(40, Math.floor(width / 9));
    return { bars: new Array(n).fill(0), trail: new Array(n).fill(0), phrase: 0, rest: 0 };
  },
  frame: (c, st, time) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    const t = time * 0.001;
    if (st.rest > 0) st.rest -= 1; else if ((st.phrase += 1) > 160 + Math.random() * 80) { st.phrase = 0; st.rest = 70 + Math.random() * 60; }
    const speaking = st.rest <= 0;
    const n = st.bars.length, gap = width / n, cy = height * 0.55;
    for (let i = 0; i < n; i++) {
      const u = i / n;
      const env = Math.sin(u * Math.PI) ** 1.5;
      const target = speaking ? env * (0.35 + 0.65 * Math.abs(Math.sin(t * 7 + u * 13) * Math.sin(t * 2.3 + u * 5))) : env * 0.04;
      st.bars[i] += (target - st.bars[i]) * 0.18;
      st.trail[i] = Math.max(st.bars[i], st.trail[i] * 0.985);
      const h = st.bars[i] * height * 0.32, th = st.trail[i] * height * 0.32;
      const x = i * gap + gap / 2;
      ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.07, 0.08)})`;
      ctx.fillRect(x - 1.5, cy - th, 3, th * 2);
      ctx.fillStyle = `rgba(${rgb}, ${ink(dark, 0.35, 0.4) + st.bars[i] * 0.3})`;
      ctx.fillRect(x - 1.5, cy - h, 3, h * 2);
    }
  },
};

// ── sealedVault: a grid of cells a scan line seals as it passes ─────────────
// Behind "what stays private". Each cell the line crosses closes with a small
// lock bar; sealed cells hold, then slowly open again so the scan has work to do.
export const sealedVault: Scene<{ cells: number[]; cols: number; rows: number; scan: number }> = {
  init: ({ width, height }) => {
    const cols = Math.ceil(width / 56), rows = Math.ceil(height / 56);
    return { cells: new Array(cols * rows).fill(0), cols, rows, scan: 0 };
  },
  frame: (c, st) => {
    const { ctx, width, height, rgb, dark } = c;
    ctx.clearRect(0, 0, width, height);
    st.scan = (st.scan + 1.1) % (width + 200);
    const s = 56;
    for (let r = 0; r < st.rows; r++) for (let col = 0; col < st.cols; col++) {
      const i = r * st.cols + col, x = col * s, y = r * s;
      if (Math.abs(x + s / 2 - st.scan) < s / 2 && Math.random() > 0.35) st.cells[i] = 1;
      st.cells[i] = Math.max(0, st.cells[i] - 0.0016);
      const k = st.cells[i];
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.06, 0.09) + k * 0.25})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 8, y + 8, s - 16, s - 16);
      if (k > 0.05) {
        ctx.fillStyle = `rgba(${rgb}, ${k * ink(dark, 0.08, 0.06)})`;
        ctx.fillRect(x + 8, y + 8, s - 16, s - 16);
        ctx.fillStyle = `rgba(${rgb}, ${k * ink(dark, 0.6, 0.65)})`;
        ctx.fillRect(x + s / 2 - 6, y + s / 2 - 1, 12, 2);
        ctx.fillRect(x + s / 2 - 1, y + s / 2 - 4, 2, 4);
      }
    }
    const g = ctx.createLinearGradient(st.scan - 60, 0, st.scan + 4, 0);
    g.addColorStop(0, `rgba(${rgb}, 0)`);
    g.addColorStop(1, `rgba(${rgb}, ${ink(dark, 0.22, 0.18)})`);
    ctx.fillStyle = g;
    ctx.fillRect(st.scan - 60, 0, 64, height);
  },
};

// ── orbitField: his mark, multiplied. Satellites on tilted orbits ────────────
// The closing band. A bright core with tilted elliptical orbits; each carries one
// satellite, and the pointer tilts the whole system a little.
type Orbit = { rx: number; ry: number; tilt: number; speed: number; phase: number; size: number };
export const orbitField: Scene<{ orbits: Orbit[] }> = {
  init: ({ width, height }) => {
    const m = Math.max(width, height);
    return {
      orbits: Array.from({ length: 9 }, (_, i) => ({
        rx: m * (0.12 + i * 0.07), ry: m * (0.04 + i * 0.022), tilt: -0.42 + (Math.random() - 0.5) * 0.3,
        speed: (0.00025 + Math.random() * 0.0003) * (i % 2 ? 1 : -1), phase: Math.random() * TAU, size: 1.5 + Math.random() * 2,
      })),
    };
  },
  frame: (c, { orbits }, time) => {
    const { ctx, width, height, rgb, dark, pointer } = c;
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2 + pointer.x * 30, cy = height * 0.5 + pointer.y * 20;
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 90);
    core.addColorStop(0, `rgba(${rgb}, ${ink(dark, 0.35, 0.25)})`);
    core.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = core;
    ctx.beginPath(); ctx.arc(cx, cy, 90, 0, TAU); ctx.fill();
    for (const o of orbits) {
      const tilt = o.tilt + pointer.y * 0.05;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);
      ctx.strokeStyle = `rgba(${rgb}, ${ink(dark, 0.26, 0.22)})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.ellipse(0, 0, o.rx, o.ry, 0, 0, TAU); ctx.stroke();
      const a = o.phase + time * o.speed;
      const x = Math.cos(a) * o.rx, y = Math.sin(a) * o.ry;
      const front = Math.sin(a) > 0;
      ctx.fillStyle = front ? `rgba(${rgb}, ${ink(dark, 0.95, 0.85)})` : `rgba(${rgb}, ${ink(dark, 0.35, 0.3)})`;
      ctx.beginPath(); ctx.arc(x, y, o.size * (front ? 1.6 : 1), 0, TAU); ctx.fill();
      ctx.restore();
    }
  },
};
