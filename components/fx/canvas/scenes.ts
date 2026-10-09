import type { Scene } from './useCanvasScene';

// Scenes ported from the 2026 agency site. Choreography is kept from the
// originals (counts, speeds, geometry); colour comes from the theme and
// opacities are tuned so content on top stays readable. Brand blue only —
// the originals' orange accents are dropped (01-color: amber is accent-only).

// ── KnowledgeGraphLattice.tsx → drifting nodes joined when close ──────────
// Use behind "knowledge" content: the platform, RAG, data layers.
type Node = { x: number; y: number; vx: number; vy: number; r: number };
export const knowledgeGraph: Scene<{ nodes: Node[] }> = {
  init: ({ width, height }) => ({
    nodes: Array.from({ length: Math.floor((width * height) / 26000) + 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8,
    })),
  }),
  frame: ({ ctx, width, height, rgb, dark, pointer }, { nodes }) => {
    ctx.clearRect(0, 0, width, height);
    const link = 170;
    const lineA = dark ? 0.22 : 0.26;
    // The pointer is a temporary node: nearby nodes reach toward it.
    const px = (pointer.x / 2 + 0.5) * width;
    const py = (pointer.y / 2 + 0.5) * height;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0) n.x = width;
      if (n.x > width) n.x = 0;
      if (n.y < 0) n.y = height;
      if (n.y > height) n.y = 0;
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / link) * lineA})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      const dp = Math.hypot(a.x - px, a.y - py);
      if (dp < link * 1.2) {
        ctx.strokeStyle = `rgba(${rgb}, ${(1 - dp / (link * 1.2)) * lineA * 1.6})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
    }
    ctx.fillStyle = `rgba(${rgb}, ${dark ? 0.55 : 0.6})`;
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};

// ── ServicesBackground.tsx → perspective lanes with falling data shards ───
// Scroll velocity speeds the shards up. Use behind delivery / services.
type Shard = { y: number; len: number; speed: number; lane: number; a: number };
export const dataShards: Scene<{ shards: Shard[]; lanes: number }> = {
  init: ({ width, height }) => {
    const lanes = Math.ceil(width / 80);
    return {
      lanes,
      shards: Array.from({ length: 36 }, () => ({
        y: Math.random() * height,
        len: 40 + Math.random() * 100,
        speed: 0.8 + Math.random() * 2.2,
        lane: Math.floor(Math.random() * lanes),
        a: 0.12 + Math.random() * 0.35,
      })),
    };
  },
  frame: ({ ctx, width, height, rgb, dark, scrollVelocity }, { shards, lanes }) => {
    ctx.clearRect(0, 0, width, height);
    const cx = width / 2;
    const spacing = 80;
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.08 : 0.1})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = -lanes; i <= lanes; i++) {
      ctx.moveTo(cx + i * spacing * 0.2, -200);
      ctx.lineTo(cx + i * spacing * 3, height + 200);
    }
    for (let i = 0; i < 15; i++) {
      const y = Math.pow(i / 15, 2) * height;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    const boost = Math.min(Math.abs(scrollVelocity) * 0.15, 8);
    ctx.lineCap = 'round';
    for (const s of shards) {
      s.y += s.speed + boost;
      if (s.y > height + 200) {
        s.y = -200;
        s.lane = Math.floor(Math.random() * lanes);
      }
      const x = cx + (s.lane - lanes / 2) * spacing * (1 + (s.y / height) * 2.5);
      const g = ctx.createLinearGradient(x, s.y - s.len, x, s.y);
      g.addColorStop(0, `rgba(${rgb}, 0)`);
      g.addColorStop(1, `rgba(${rgb}, ${s.a * (dark ? 1 : 1)})`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, s.y - s.len);
      ctx.lineTo(x, s.y);
      ctx.stroke();
      ctx.fillStyle = `rgba(${rgb}, ${s.a})`;
      ctx.beginPath();
      ctx.arc(x, s.y, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};

// ── LiveSystemHeatmap.tsx → dot matrix lit by drifting hotspots ───────────
// Quiet, data-flavoured texture. Use behind process / metrics sections.
type Hotspot = { x: number; y: number; r: number; target: number; life: number };
export const dotMatrix: Scene<{ spots: Hotspot[] }> = {
  init: () => ({ spots: [] }),
  frame: ({ ctx, width, height, rgb, dark }, st, time) => {
    ctx.clearRect(0, 0, width, height);
    if (time && st.spots.length < 5 && Math.random() > 0.97) {
      st.spots.push({ x: Math.random() * width, y: Math.random() * height, r: 0, target: 150 + Math.random() * 200, life: 1 });
    }
    st.spots = st.spots.filter((h) => {
      h.r += (h.target - h.r) * 0.02;
      h.life -= 0.002;
      return h.life > 0;
    });
    const step = 24;
    const base = dark ? 0.07 : 0.12;
    for (let x = step / 2; x < width; x += step) {
      for (let y = step / 2; y < height; y += step) {
        let k = 0;
        for (const h of st.spots) {
          const d = Math.hypot(x - h.x, y - h.y);
          if (d < h.r) k = Math.max(k, (1 - d / h.r) * h.life);
        }
        ctx.fillStyle = k > 0 ? `rgba(${rgb}, ${base + k * 0.45})` : dark ? `rgba(255,255,255,${base})` : `rgba(13,17,23,${base * 0.8})`;
        ctx.beginPath();
        ctx.arc(x, y, k > 0 ? 1 + k * 0.8 : 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
};

// ── DigitalLatticeBackground.tsx → 3D grid tunnel with packets flying in ──
// The most energetic scene. Use once per page, for the closing CTA.
type Packet = { x: number; y: number; z: number; speed: number; len: number };
export const latticeTunnel: Scene<{ packets: Packet[]; z: number }> = {
  init: ({ width, height }) => ({
    z: 0,
    packets: Array.from({ length: 50 }, () => ({
      x: (Math.random() - 0.5) * width * 4,
      y: (Math.random() - 0.5) * height * 4,
      z: Math.random() * 2000,
      speed: 6 + Math.random() * 14,
      len: 40 + Math.random() * 150,
    })),
  }),
  frame: ({ ctx, width, height, rgb, dark, pointer }, st) => {
    ctx.clearRect(0, 0, width, height);
    st.z += 1.2;
    const cx = width / 2 + pointer.x * 60;
    const cy = height * 0.42 + pointer.y * 40;
    const persp = 600;
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.2 : 0.18})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const n = 16;
    const gs = width / n;
    for (let i = -n; i <= n; i++) {
      ctx.moveTo(cx + i * gs * 0.2, cy - 100);
      ctx.lineTo(cx + i * gs * 10, height + 1000);
    }
    for (let j = 0; j < 8; j++) {
      const zl = j * 150 + (st.z % 150);
      const y = cy + zl * (persp / (persp + zl)) * 2.5;
      if (y < height + 200) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
    }
    ctx.stroke();
    for (const p of st.packets) {
      p.z -= p.speed;
      if (p.z <= 0) {
        p.z = 2000;
        p.x = (Math.random() - 0.5) * width * 4;
        p.y = (Math.random() - 0.5) * height * 4;
      }
      const s = persp / (persp + p.z);
      const x = cx + p.x * s;
      const y = cy + p.y * s;
      if (x < -200 || x > width + 200 || y < -200 || y > height + 200) continue;
      const ts = persp / (persp + p.z + p.len);
      ctx.globalAlpha = (1 - p.z / 2000) * (dark ? 0.9 : 0.75);
      ctx.strokeStyle = `rgb(${rgb})`;
      ctx.lineWidth = 2.5 * s;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(cx + p.x * ts, cy + p.y * ts);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },
};

/** Blend an "r, g, b" string toward white by t (0…1) — lighter tints of the brand blue. */
function tint(rgb: string, t: number) {
  return rgb
    .split(',')
    .map((v) => Math.round(Number(v) + (255 - Number(v)) * t))
    .join(', ');
}

// ── LiquidIntelligenceBackground.tsx → gooey blue blobs + grid + dust ──────
// Rendered at low DPR and blurred/contrasted in CSS (the "gooey" filter), so
// it's cheap. Pointer pulls blobs and repels dust. Use as a page hero.
type Blob = { x: number; y: number; r: number; vx: number; vy: number; light: boolean; phase: number };
type Dust = { x: number; y: number; vx: number; vy: number; size: number; a: number };
export const liquidIntelligence: Scene<{ blobs: Blob[]; dust: Dust[] }> = {
  init: ({ width, height }) => ({
    blobs: Array.from({ length: 7 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: (0.25 + Math.random() * 0.3) * Math.max(width, height),
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      light: i % 2 === 1,
      phase: Math.random() * Math.PI * 2,
    })),
    dust: Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      a: Math.random() * 0.4 + 0.2,
    })),
  }),
  frame: ({ ctx, width, height, rgb, dark, pointer }, { blobs, dust }, time) => {
    const t = time * 0.001;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.12 : 0.11})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += 100) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = 0; y <= height; y += 100) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();

    const px = (pointer.x / 2 + 0.5) * width;
    const py = (pointer.y / 2 + 0.5) * height;
    ctx.globalCompositeOperation = dark ? 'screen' : 'multiply';
    for (const b of blobs) {
      b.x += b.vx + Math.sin(t + b.phase) * 0.5;
      b.y += b.vy + Math.cos(t + b.phase) * 0.5;
      if (b.x < -b.r) b.x = width + b.r;
      if (b.x > width + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = height + b.r;
      if (b.y > height + b.r) b.y = -b.r;
      const d = Math.hypot(px - b.x, py - b.y);
      if (d < 400) { b.x += (px - b.x) * ((400 - d) / 400) * 0.02; b.y += (py - b.y) * ((400 - d) / 400) * 0.02; }
      const r = b.r * (1 + Math.sin(t * 0.5 + b.phase) * 0.12);
      const c = b.light ? tint(rgb, 0.45) : rgb;
      const a = dark ? 0.35 : 0.3;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      g.addColorStop(0, `rgba(${c}, ${a})`);
      g.addColorStop(0.6, `rgba(${c}, ${a * 0.3})`);
      g.addColorStop(1, `rgba(${c}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    for (const p of dust) {
      p.x = (p.x + p.vx + width) % width;
      p.y = (p.y + p.vy + height) % height;
      const dx = px - p.x, dy = py - p.y, d = Math.hypot(dx, dy);
      const f = d < 180 ? ((180 - d) / 180) * 0.6 : 0;
      ctx.fillStyle = dark ? `rgba(255,255,255,${p.a})` : `rgba(${rgb}, ${p.a * 1.6})`;
      ctx.beginPath();
      ctx.arc(p.x - dx * f, p.y - dy * f, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  },
};

// ── ChronosTimeline.tsx (TemporalFluxBackground) → light streaks over a grid
// Streaks travel left→right; scroll velocity speeds them up. Use behind a
// timeline or any "story so far" section.
type Streak = { x: number; y: number; z: number; len: number; speed: number; a: number };
export const temporalFlux: Scene<{ streaks: Streak[] }> = {
  init: ({ width, height }) => ({
    streaks: Array.from({ length: 70 }, () => {
      const z = Math.random();
      return { x: Math.random() * width, y: Math.random() * height, z, len: 60 + Math.random() * 250, speed: (0.8 + Math.random() * 2) * (0.5 + z), a: 0.08 + Math.random() * 0.32 };
    }),
  }),
  frame: ({ ctx, width, height, rgb, dark, scrollVelocity }, { streaks }) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.07 : 0.08})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x < width; x += 120) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = 0; y < height; y += 120) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();
    const boost = 1 + Math.min(Math.abs(scrollVelocity) * 0.08, 4);
    ctx.lineCap = 'round';
    for (const s of streaks) {
      s.x += s.speed * boost;
      if (s.x > width + s.len) { s.x = -s.len; s.y = Math.random() * height; }
      const a = s.a * (dark ? 1 : 0.95);
      const g = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y);
      g.addColorStop(0, `rgba(${rgb}, 0)`);
      g.addColorStop(0.8, `rgba(${rgb}, ${a})`);
      g.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1 + s.z * 2.5;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + s.len, s.y);
      ctx.stroke();
      if (s.z > 0.6) {
        ctx.fillStyle = dark ? `rgba(255,255,255,${a * 1.4})` : `rgba(${rgb}, ${a * 1.4})`;
        ctx.beginPath();
        ctx.arc(s.x + s.len * 0.9, s.y, 1 + s.z, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
};

// ── NeuralArchitecture.tsx → labelled node network that parts for the cursor
// Core nodes carry the AI Dev Platform's real building blocks, so the picture
// says something true: four modules on one shared layer.
type ANode = { x: number; y: number; vx: number; vy: number; r: number; label: string | null };
const ARCH_LABELS = ['RAG Studio', 'Agent Builder', 'Governance Hub', 'ML Ops', 'Data layer', 'Audit trail', 'Access control'];
export const neuralArchitecture: Scene<{ nodes: ANode[] }> = {
  init: ({ width, height }) => ({
    nodes: Array.from({ length: 38 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: i < ARCH_LABELS.length ? 4.5 : 1.8,
      label: i < ARCH_LABELS.length ? ARCH_LABELS[i] : null,
    })),
  }),
  frame: ({ ctx, width, height, rgb, dark, pointer }, { nodes }) => {
    ctx.clearRect(0, 0, width, height);
    const mx = (pointer.x / 2 + 0.5) * width;
    const my = (pointer.y / 2 + 0.5) * height;
    const link = 180;
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
      const dx = mx - n.x, dy = my - n.y, d = Math.hypot(dx, dy);
      if (d < 220 && d > 0) { const f = ((220 - d) / 220) * 2.4; n.x -= (dx / d) * f; n.y -= (dy / d) * f; }
    }
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / link) * (dark ? 0.28 : 0.26)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    ctx.font = '600 10px ui-sans-serif, system-ui, sans-serif';
    for (const n of nodes) {
      ctx.fillStyle = n.label ? `rgb(${rgb})` : dark ? 'rgba(255,255,255,0.22)' : 'rgba(13,17,23,0.22)';
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      if (n.label) {
        ctx.fillStyle = `rgba(${rgb}, 0.14)`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.6)' : 'rgba(13,17,23,0.55)';
        ctx.fillText(n.label.toUpperCase(), n.x + 12, n.y + 3.5);
      }
    }
  },
};

// ── ContactHeroBackground.tsx → grid, cursor spotlight, beams that ping nodes
// Signals travel the grid lines; nodes they cross ring and fade. Use behind
// contact / "talk to us" heroes.
type Beam = { x: number; y: number; vx: number; vy: number };
type GNode = { x: number; y: number; a: number };
export const signalGrid: Scene<{ nodes: GNode[]; beams: Beam[]; sp: number }> = {
  init: ({ width, height }) => {
    const sp = 96;
    const nodes: GNode[] = [];
    for (let x = 0; x <= width + sp; x += sp) for (let y = 0; y <= height + sp; y += sp) nodes.push({ x, y, a: 0 });
    return { nodes, beams: [], sp };
  },
  frame: ({ ctx, width, height, rgb, dark, pointer }, st, time) => {
    ctx.clearRect(0, 0, width, height);
    const { sp } = st;
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.06 : 0.1})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= width; x += sp) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = 0; y <= height; y += sp) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();
    const px = (pointer.x / 2 + 0.5) * width;
    const py = (pointer.y / 2 + 0.5) * height;
    const g = ctx.createRadialGradient(px, py, 0, px, py, 380);
    g.addColorStop(0, `rgba(${rgb}, ${dark ? 0.1 : 0.07})`);
    g.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    if (time && st.beams.length < 14 && Math.random() > 0.93) {
      const h = Math.random() > 0.5;
      st.beams.push(h
        ? { x: -100, y: Math.floor((Math.random() * height) / sp) * sp, vx: 4 + Math.random() * 4, vy: 0 }
        : { x: Math.floor((Math.random() * width) / sp) * sp, y: -100, vx: 0, vy: 4 + Math.random() * 4 });
    }
    ctx.lineWidth = 2;
    st.beams = st.beams.filter((b) => {
      b.x += b.vx;
      b.y += b.vy;
      const lg = ctx.createLinearGradient(b.x - b.vx * 15, b.y - b.vy * 15, b.x, b.y);
      lg.addColorStop(0, `rgba(${rgb}, 0)`);
      lg.addColorStop(1, `rgba(${rgb}, ${dark ? 0.9 : 0.7})`);
      ctx.strokeStyle = lg;
      ctx.beginPath();
      ctx.moveTo(b.x - b.vx * 15, b.y - b.vy * 15);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      for (const n of st.nodes) if (Math.abs(b.x - n.x) < 6 && Math.abs(b.y - n.y) < 6) n.a = 1;
      return b.x < width + 200 && b.y < height + 200;
    });
    ctx.lineWidth = 1;
    for (const n of st.nodes) {
      if (n.a > 0.05) {
        ctx.strokeStyle = `rgba(${rgb}, ${n.a * 0.35})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, (1 - n.a) * 20, 0, Math.PI * 2);
        ctx.stroke();
        n.a *= 0.94;
      }
      ctx.fillStyle = `rgba(${rgb}, ${dark ? 0.18 : 0.25})`;
      ctx.fillRect(n.x - 1, n.y - 1, 2, 2);
    }
  },
};

// ── CareersHeroBackground.tsx → blueprint grid, rotating hex "people" and a
// searchlight lens on the cursor that picks out roles. Use for careers.
type Hex = { x: number; y: number; z: number; vx: number; vy: number; size: number; rot: number; rs: number; role: string };
const ROLES = ['ENGINEER', 'DESIGNER', 'ARCHITECT', 'RESEARCHER', 'ANALYST'];
export const blueprintSearch: Scene<{ hexes: Hex[] }> = {
  init: ({ width, height }) => ({
    hexes: Array.from({ length: 56 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 4 + 3,
      rot: Math.random() * Math.PI * 2,
      rs: (Math.random() - 0.5) * 0.015,
      role: ROLES[Math.floor(Math.random() * ROLES.length)],
    })),
  }),
  frame: ({ ctx, width, height, rgb, dark, pointer }, { hexes }) => {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.07 : 0.1})`;
    ctx.lineWidth = dark ? 0.5 : 0.8;
    ctx.beginPath();
    for (let x = 0; x < width; x += 80) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = 0; y < height; y += 80) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();
    const mx = (pointer.x / 2 + 0.5) * width;
    const my = (pointer.y / 2 + 0.5) * height;
    const lens = Math.min(220, Math.min(width, height) * 0.32);
    const light = tint(rgb, 0.35);
    for (let i = 0; i < hexes.length; i++) {
      const n = hexes[i];
      n.x += n.vx; n.y += n.vy; n.rot += n.rs;
      if (n.x < -100) n.x = width + 100; if (n.x > width + 100) n.x = -100;
      if (n.y < -100) n.y = height + 100; if (n.y > height + 100) n.y = -100;
      const scale = 800 / (800 + n.z);
      const base = (1 - n.z / 1000) * (dark ? 0.35 : 0.5);
      const d = Math.hypot(n.x - mx, n.y - my);
      const focal = d < lens;
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.rot);
      ctx.beginPath();
      const s = n.size * scale * (focal ? 1.5 : 1);
      for (let k = 0; k < 6; k++) ctx.lineTo(s * Math.cos((k * Math.PI) / 3), s * Math.sin((k * Math.PI) / 3));
      ctx.closePath();
      ctx.strokeStyle = `rgba(${focal ? light : rgb}, ${focal ? Math.max(0.7, base * 2) : base})`;
      ctx.lineWidth = dark ? 1 : 1.5;
      ctx.stroke();
      ctx.restore();
      if (focal) {
        const a = 1 - d / lens;
        ctx.font = '600 9px ui-monospace, monospace';
        ctx.fillStyle = `rgba(${rgb}, ${a * 0.85})`;
        ctx.fillText(n.role, n.x + 14, n.y + 3);
        ctx.setLineDash([2, 4]);
        ctx.strokeStyle = `rgba(${rgb}, ${a * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mx, my); ctx.stroke();
        ctx.setLineDash([]);
      }
      for (let j = i + 1; j < hexes.length; j++) {
        const m = hexes[j];
        const dd = Math.hypot(n.x - m.x, n.y - m.y);
        if (dd < 150) {
          ctx.strokeStyle = dark ? `rgba(255,255,255,${(1 - dd / 150) * base * 0.35})` : `rgba(${rgb}, ${(1 - dd / 150) * base * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
        }
      }
    }
    if (pointer.x !== 0 || pointer.y !== 0) {
      ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.25 : 0.35})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(mx, my, lens, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([5, 8]);
      ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.14 : 0.2})`;
      ctx.beginPath(); ctx.arc(mx, my, lens - 20, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { ctx.moveTo(mx + dx * lens, my + dy * lens); ctx.lineTo(mx + dx * (lens + 10), my + dy * (lens + 10)); }
      ctx.stroke();
    }
  },
};

// ── TacticalCommandBackground.tsx → ink blobs that FLEE the cursor over a
// slowly drifting grid (rendered blurred, like liquidIntelligence). Tension
// rather than attraction — use for security.
type TBlob = { x: number; y: number; r: number; vx: number; vy: number; light: boolean; phase: number };
type TDust = { x: number; y: number; vx: number; vy: number; size: number; a: number };
export const tacticalCommand: Scene<{ blobs: TBlob[]; dust: TDust[] }> = {
  init: ({ width, height }) => ({
    blobs: Array.from({ length: 10 }, (_, i) => ({
      x: Math.random() * width, y: Math.random() * height,
      r: (0.18 + Math.random() * 0.25) * Math.max(width, height),
      vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
      light: i % 2 === 1, phase: Math.random() * Math.PI * 2,
    })),
    dust: Array.from({ length: 80 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1, a: Math.random() * 0.5 + 0.3,
    })),
  }),
  frame: ({ ctx, width, height, rgb, dark, pointer }, { blobs, dust }, time) => {
    const t = time * 0.001;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);
    const mx = (pointer.x / 2 + 0.5) * width;
    const my = (pointer.y / 2 + 0.5) * height;
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.12 : 0.1})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    const yOff = (t * 15) % 100;
    for (let x = 0; x <= width; x += 100) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = yOff; y <= height; y += 100) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();
    ctx.globalCompositeOperation = dark ? 'screen' : 'multiply';
    for (const b of blobs) {
      b.x += b.vx + Math.sin(t * 0.5 + b.phase) * 0.3;
      b.y += b.vy + Math.cos(t * 0.5 + b.phase) * 0.3;
      if (b.x < -b.r) b.x = width + b.r; if (b.x > width + b.r) b.x = -b.r;
      if (b.y < -b.r) b.y = height + b.r; if (b.y > height + b.r) b.y = -b.r;
      const dx = mx - b.x, dy = my - b.y, d = Math.hypot(dx, dy);
      if (d < 350) { const f = (350 - d) / 350; b.x -= dx * f * 0.03; b.y -= dy * f * 0.03; }
      const r = b.r * (1 + Math.sin(t * 0.8 + b.phase) * 0.2);
      const c = b.light ? tint(rgb, 0.4) : rgb;
      const a = dark ? 0.4 : 0.28;
      const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      g.addColorStop(0, `rgba(${c}, ${a})`);
      g.addColorStop(0.5, `rgba(${c}, ${a * 0.3})`);
      g.addColorStop(1, `rgba(${c}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    for (const p of dust) {
      p.x = (p.x + p.vx + width) % width;
      p.y = (p.y + p.vy + height) % height;
      ctx.fillStyle = dark ? `rgba(${tint(rgb, 0.5)}, ${p.a})` : `rgba(${rgb}, ${p.a * 0.9})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
    }
  },
};

// ── FooterLattice.tsx → slowly drifting grid with dots that ping and fade.
// The quietest scene; made for the global footer.
type FDot = { x: number; y: number; a: number };
export const footerLattice: Scene<{ dots: FDot[]; off: number }> = {
  init: ({ width, height }) => {
    const dots: FDot[] = [];
    for (let x = 0; x <= width + 60; x += 60) for (let y = 0; y <= height + 60; y += 60) dots.push({ x, y, a: Math.random() * 0.2 });
    return { dots, off: 0 };
  },
  frame: ({ ctx, width, height, rgb, dark }, st, time) => {
    ctx.clearRect(0, 0, width, height);
    st.off = (st.off + 0.2) % 60;
    ctx.strokeStyle = `rgba(${rgb}, ${dark ? 0.06 : 0.05})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -60 + st.off; x <= width; x += 60) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
    for (let y = 0; y <= height; y += 60) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
    ctx.stroke();
    const t = time * 0.001;
    st.dots.forEach((d, i) => {
      if (time && Math.random() > 0.996) d.a = 0.8;
      d.a += (0.1 - d.a) * 0.05;
      ctx.fillStyle = `rgba(${rgb}, ${Math.max(0, d.a + Math.sin(t + i) * 0.05)})`;
      ctx.beginPath(); ctx.arc(d.x, d.y, 1.1, 0, Math.PI * 2); ctx.fill();
    });
  },
};
