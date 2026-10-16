// Graig's stage — shared helpers for scene authors.
// Ported from the Sunset 3-D engine (C:\sunset-3d\js\core.js) and recoloured for
// sonofgraig: night #070810, paper white, the blue spectrum of his orb.
import * as THREE from 'three';

export { THREE };

/* ------------------------------------------------------------------ math */
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const inv = (a, b, v) => clamp((v - a) / (b - a));
export const smooth = (a, b, v) => { const t = inv(a, b, v); return t * t * (3 - 2 * t); };
export const damp = (a, b, lambda, dt) => lerp(a, b, 1 - Math.exp(-lambda * dt));
export const E = {
  outCubic: (t) => 1 - (1 - t) ** 3,
  outQuart: (t) => 1 - (1 - t) ** 4,
  inOutCubic: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2),
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
};
/** Deterministic PRNG: const r = rng(7); r() -> [0,1). Scene builds never use Math.random. */
export function rng(seed = 1) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ------------------------------------------------------------------ palette (sonofgraig v3.1 + the orb's spectrum) */
export const C = {
  night: 0x070810,
  paper: 0xffffff,
  ink: 0x0d1117,
  blue: 0x0b9ede,
  sky: 0x38bdf8,
  ice: 0xe0f2fe,
  sapphire: 0x0b3b8c,
  deep: 0x065a82,
  cyan: 0x22d3ee,
};
/** A THREE.Color in linear space, optionally pushed past 1 so bloom picks it up. */
export const hdr = (hex, k = 1) => new THREE.Color(hex).multiplyScalar(k);

/** Device pixels per world unit at distance 1, for gl_PointSize = size * uPx / -mv.z. */
export const pxPerUnit = (s, camera) => (s.h * (s.dpr || 1)) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));

export const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ textures */
export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}
export function canvasTexture(cv, { srgb = true } = {}) {
  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}
let dotTex = null;
/** Soft round sprite for point clouds (white, alpha falloff). */
export function softDot() {
  if (dotTex) return dotTex;
  const c = makeCanvas(64, 64), x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,.85)');
  g.addColorStop(0.6, 'rgba(255,255,255,.18)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  dotTex = canvasTexture(c, { srgb: false });
  return dotTex;
}
/** A radial "contact shadow" blob for under objects on the paper. */
export function contactShadow(size = 1, strength = 0.35) {
  const c = makeCanvas(128, 128), x = c.getContext('2d');
  const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, `rgba(13,17,23,${strength})`);
  g.addColorStop(0.45, `rgba(13,17,23,${strength * 0.45})`);
  g.addColorStop(1, 'rgba(13,17,23,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 128, 128);
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({ map: canvasTexture(c), transparent: true, depthWrite: false, toneMapped: false }),
  );
  m.rotation.x = -Math.PI / 2;
  m.renderOrder = -1;
  return m;
}

/* ------------------------------------------------------------------ environments (prefiltered once per renderer) */
const envCache = new WeakMap();
/** Cool paper studio for objects on the white sections: a room the colour of the page,
    a big white softbox upper left (the key's direction), a dim blue-grey fill right,
    a top strip and a faint brand-blue rim behind. Shadow sides read cool grey, never violet. */
export function studioEnv(renderer) {
  const cache = envCache.get(renderer) || {};
  if (cache.studio) return cache.studio;
  const sc = new THREE.Scene();
  const col = (hex, k = 1) => new THREE.Color(hex).multiplyScalar(k);
  const room = new THREE.Mesh(new THREE.BoxGeometry(20, 12, 20), new THREE.MeshBasicMaterial({ color: col(0xe9edf3, 0.6), side: THREE.BackSide }));
  room.position.y = 4;
  sc.add(room);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshBasicMaterial({ color: col(0xffffff, 0.85) }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.99;
  sc.add(floor);
  const box = (w, h, c, k, pos) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: col(c, k), side: THREE.DoubleSide }));
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    sc.add(m);
  };
  box(7, 5, 0xffffff, 8, [-6, 6, 5]); // key softbox
  box(4, 6, 0xe6eef8, 2.2, [8, 2.5, 3]); // fill
  box(12, 1.4, 0xffffff, 3, [0, 9.8, 0]); // top strip
  box(8, 3, 0x7cc7ef, 2.4, [2, 3, -9]); // brand-blue rim
  const pm = new THREE.PMREMGenerator(renderer);
  cache.studio = pm.fromScene(sc, 0.02).texture;
  pm.dispose();
  sc.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
  envCache.set(renderer, cache);
  return cache.studio;
}
/** Night studio for objects on the dark sections: a near-black room lit by long blue
    softboxes, so glossy edges catch brand-blue highlights and nothing else. */
export function nightEnv(renderer) {
  const cache = envCache.get(renderer) || {};
  if (cache.night) return cache.night;
  const sc = new THREE.Scene();
  const col = (hex, k = 1) => new THREE.Color(hex).multiplyScalar(k);
  sc.add(new THREE.Mesh(new THREE.BoxGeometry(20, 12, 20), new THREE.MeshBasicMaterial({ color: col(0x070810, 1), side: THREE.BackSide })));
  const box = (w, h, c, k, pos) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: col(c, k), side: THREE.DoubleSide }));
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    sc.add(m);
  };
  box(10, 0.8, 0xcfe8ff, 3.2, [-5, 6, 4]); // long cool strip, upper left (kept below ACES' blue→violet shift)
  box(0.8, 8, 0x0b9ede, 4, [8, 1, 2]); // brand-blue edge light, right
  box(6, 4, 0x1b2a4a, 2, [0, -3, 8]); // dim front fill
  const pm = new THREE.PMREMGenerator(renderer);
  cache.night = pm.fromScene(sc, 0.03).texture;
  pm.dispose();
  sc.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); });
  envCache.set(renderer, cache);
  return cache.night;
}

/* ------------------------------------------------------------------ the shared key light for paper scenes */
export function paperLights(scene, { shadow = true, size = 6, mapSize = 2048 } = {}) {
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-2.6, 8.5, 4.6); // high, so shadows stay short and inside the scene's box
  if (shadow) {
    key.castShadow = true;
    key.shadow.mapSize.set(mapSize, mapSize);
    key.shadow.camera.left = -size; key.shadow.camera.right = size;
    key.shadow.camera.top = size; key.shadow.camera.bottom = -size;
    key.shadow.camera.near = 1; key.shadow.camera.far = 20;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.02;
    key.shadow.radius = 6;
  }
  scene.add(key);
  const hemi = new THREE.HemisphereLight(0xf5f8fc, 0xdfe5ee, 0.55);
  scene.add(hemi);
  return { key, hemi };
}
/** A floor that only shows the shadows falling on it, fading out radially so a shadow
    never meets the edge of its scene's box. */
export function shadowFloor(size = 30, opacity = 0.14, fade = 4.5) {
  const mat = new THREE.ShadowMaterial({ opacity, color: 0x0d1117 });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uFade = { value: fade };
    sh.vertexShader = sh.vertexShader.replace('void main() {', 'varying vec2 vFloor;\nvoid main() {\n  vFloor = position.xy;');
    sh.fragmentShader = sh.fragmentShader
      .replace('void main() {', 'uniform float uFade; varying vec2 vFloor;\nvoid main() {')
      .replace('#include <tonemapping_fragment>', 'gl_FragColor.a *= smoothstep(uFade, uFade * .45, length(vFloor));\n#include <tonemapping_fragment>');
  };
  const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  m.rotation.x = -Math.PI / 2;
  m.receiveShadow = true;
  return m;
}
