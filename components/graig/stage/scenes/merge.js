// Merge — the four stages of the twin, one cloud of light that reshapes as you scroll
// through the pinned section:
//   0 Capture     memories stream in along a vortex (his listening cyan)
//   1 Model       they settle into the rings of his memory, the console atlas's own layers
//   2 Predict     a decision tree grows; one path — the choice Tumiso actually made — lights up
//   3 Strengthen  the tree closes into a lattice: the same person, structurally stronger
// Every point carries all four positions; the shader blends them with a per-point stagger
// and a swirl mid-flight, so the transitions flow instead of tweening.
import { THREE, C, hdr, rng, damp, clamp, softDot, pxPerUnit } from '../kit';

export const LAYERS = ['Core', 'Skills', 'Code', 'Memory', 'Routines', 'Apps'];

export async function create({ mobile }) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);
  camera.position.set(0, 1.2, 12);
  const lite = (navigator.hardwareConcurrency || 4) <= 4;
  const N = mobile ? 3600 : lite ? 5200 : 8000;
  const r = rng(23);
  const A = new Float32Array(N * 4); // capture: (spiral param, angle offset, radius jitter, height jitter)
  const B = new Float32Array(N * 3), Cc = new Float32Array(N * 3), D = new Float32Array(N * 3);
  const K = new Float32Array(N * 4); // (stagger, size, hot path, ring index / 5)

  /* ---- 1 model: six rings — Core is a dense heart, Memory is a wide band */
  const RADII = [0.35, 1.0, 1.45, 2.15, 2.85, 3.35];
  const ringOf = (i) => { const x = i / N; return x < 0.08 ? 0 : x < 0.2 ? 1 : x < 0.32 ? 2 : x < 0.68 ? 3 : x < 0.86 ? 4 : 5; };

  /* ---- 2 predict: a binary tree, 6 levels, growing upward in 3-D */
  const segs = []; // [ax,ay,az,bx,by,bz,hot]
  const grow = (x, y, z, ang, tilt, len, lvl, hot) => {
    if (lvl > 6) return;
    const bx = x + Math.sin(ang) * len * Math.cos(tilt), bz = z + Math.sin(tilt) * len * 0.8, by = y + Math.cos(ang) * len;
    segs.push([x, y, z, bx, by, bz, hot]);
    const spread = 1.0 - lvl * 0.08;
    const pick = (lvl * 7 + 3) % 2; // the path he chose: deterministic, alternating
    grow(bx, by, bz, ang - spread, tilt + 0.35, len * 0.8, lvl + 1, hot && pick === 0 ? 1 : 0);
    grow(bx, by, bz, ang + spread, tilt - 0.35, len * 0.8, lvl + 1, hot && pick === 1 ? 1 : 0);
  };
  grow(0, -2.7, 0, 0, 0, 1.25, 0, 1);
  const segLen = segs.map((s) => Math.hypot(s[3] - s[0], s[4] - s[1], s[5] - s[2]));
  const segTot = segLen.reduce((a, b) => a + b, 0);
  const pickSeg = (u) => { let acc = 0; for (let k = 0; k < segs.length; k++) { acc += segLen[k] / segTot; if (u <= acc) return k; } return segs.length - 1; };

  /* ---- 3 strengthen: a geodesic lattice (edges of an icosphere) with a bright core */
  const ico = new THREE.IcosahedronGeometry(2.6, 1);
  const pos = ico.attributes.position;
  const edges = [];
  const seen = new Set();
  const keyOf = (v) => `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
  for (let i = 0; i < pos.count; i += 3) {
    const v = [0, 1, 2].map((k) => new THREE.Vector3().fromBufferAttribute(pos, i + k));
    for (const [a, b] of [[0, 1], [1, 2], [2, 0]]) {
      const ka = keyOf(v[a]), kb = keyOf(v[b]);
      const id = ka < kb ? ka + kb : kb + ka;
      if (!seen.has(id)) { seen.add(id); edges.push([v[a], v[b]]); }
    }
  }
  ico.dispose();

  for (let i = 0; i < N; i++) {
    const u = r();
    // capture
    A[i * 4] = r(); A[i * 4 + 1] = r() * Math.PI * 2; A[i * 4 + 2] = r(); A[i * 4 + 3] = r() - 0.5;
    // model
    const ring = ringOf(i);
    const rad = ring === 3 ? 1.85 + r() * 0.75 : ring === 0 ? r() ** 0.5 * RADII[0] : RADII[ring] + (r() - 0.5) * 0.06;
    const th = r() * Math.PI * 2;
    B[i * 3] = Math.cos(th) * rad; B[i * 3 + 1] = (r() - 0.5) * (ring === 3 ? 0.18 : 0.05) + (ring === 0 ? (r() - 0.5) * 0.5 : 0); B[i * 3 + 2] = Math.sin(th) * rad;
    // predict
    const sk = pickSeg(u), s = segs[sk], f = r();
    const jit = 0.05 + (1 - sk / segs.length) * 0.04;
    Cc[i * 3] = s[0] + (s[3] - s[0]) * f + (r() - 0.5) * jit;
    Cc[i * 3 + 1] = s[1] + (s[4] - s[1]) * f + (r() - 0.5) * jit;
    Cc[i * 3 + 2] = s[2] + (s[5] - s[2]) * f + (r() - 0.5) * jit;
    // strengthen: 82% on lattice edges, the rest a core
    if (r() < 0.82) {
      const e = edges[Math.floor(r() * edges.length)], g = r();
      D[i * 3] = e[0].x + (e[1].x - e[0].x) * g; D[i * 3 + 1] = e[0].y + (e[1].y - e[0].y) * g; D[i * 3 + 2] = e[0].z + (e[1].z - e[0].z) * g;
    } else {
      const rr = r() ** 1.8 * 0.9, a = r() * Math.PI * 2, b = Math.acos(2 * r() - 1);
      D[i * 3] = rr * Math.sin(b) * Math.cos(a); D[i * 3 + 1] = rr * Math.cos(b); D[i * 3 + 2] = rr * Math.sin(b) * Math.sin(a);
    }
    K[i * 4] = r(); K[i * 4 + 1] = 0.5 + r() ** 3 * 2.4; K[i * 4 + 2] = s[6] ? 1 : 0; K[i * 4 + 3] = ring / 5;
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(B, 3));
  g.setAttribute('aA', new THREE.BufferAttribute(A, 4));
  g.setAttribute('aC', new THREE.BufferAttribute(Cc, 3));
  g.setAttribute('aD', new THREE.BufferAttribute(D, 3));
  g.setAttribute('aK', new THREE.BufferAttribute(K, 4));
  const U = {
    uStage: { value: 0 }, uTime: { value: 0 }, uPx: { value: 1 }, uMap: { value: softDot() },
    c0: { value: hdr(C.cyan, 1) }, c1: { value: hdr(C.sky, 1) }, c2: { value: hdr(C.deep, 1.6) }, c3: { value: hdr(C.blue, 1) }, cHot: { value: hdr(C.ice, 1) },
  };
  const cloud = new THREE.Points(g, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: U,
    vertexShader: /* glsl */ `
      attribute vec4 aA, aK; attribute vec3 aC, aD;
      uniform float uStage, uTime, uPx; uniform vec3 c0, c1, c2, c3, cHot;
      varying vec3 vCol; varying float vA;
      // 0 until the stage approaches, 1 for every point once it has arrived; staggered in between
      float st(float k){ return smoothstep(0., 1., clamp((uStage - k) * 3.2 - aK.x * .5 + .5, 0., 1.)); }
      vec3 rotY(vec3 p, float a){ float c = cos(a), s = sin(a); return vec3(c * p.x - s * p.z, p.y, s * p.x + c * p.z); }
      void main(){
        // capture: an inward vortex, endlessly fed
        float u = fract(aA.x - uTime * .07);
        float rad = .2 + u * u * 4.4 + aA.z * aA.z * .5 * u;
        float arm = floor(aA.y / 6.2832 * 3.) * 2.0944 + (aA.z - .5) * .35;   // three arms
        float ang = arm + (1. - u) * 7.5 + uTime * .2;
        vec3 pA = vec3(cos(ang) * rad, aA.w * (.15 + u * .9) + (u - .5) * .4, sin(ang) * rad);
        // model: the rings turn at their own speeds (odd layers the other way)
        float dir = mod(floor(aK.w * 5. + .5), 2.) * 2. - 1.;
        vec3 pB = rotY(position, uTime * (.05 + aK.w * .06) * dir);
        vec3 pC = rotY(aC, sin(uTime * .15) * .25);
        vec3 pD = rotY(aD, uTime * .08);
        float s1 = st(.5), s2 = st(1.5), s3 = st(2.5);
        vec3 p = mix(mix(mix(pA, pB, s1), pC, s2), pD, s3);
        // mid-flight swirl
        float fl = s1 * (1. - s1) + s2 * (1. - s2) + s3 * (1. - s3);
        p += vec3(sin(aK.x * 40. + uTime), cos(aK.x * 31. + uTime * .8), sin(aK.x * 23. - uTime * .6)) * fl * 1.6;
        vec4 mv = modelViewMatrix * vec4(p, 1.);
        // colour per stage; the chosen path burns white-hot with a pulse running up it
        vec3 col = mix(mix(mix(c0, c1, s1), c2, s2), c3, s3);
        float pulse = smoothstep(.12, 0., abs(fract(aC.y * .16 - uTime * .35) - .5) - .38);
        float hot = aK.z * s2 * (1. - s3) * (.7 + pulse * 1.5);
        col = mix(col, cHot, clamp(hot * .45, 0., 1.)) * (1. + hot);
        float core = s1 * (1. - s2) * step(aK.w, .01) * 1.2 + s3 * step(length(aD), .95) * .7;
        col *= 1. + core;
        float dim = mix(1., .72, s2 * (1. - s3) * (1. - aK.z));     // in Predict the unchosen branches step back
        vA = (.55 + .45 * sin(uTime * 2. + aK.x * 60.)) * mix(1., smoothstep(0., .15, u), 1. - s1);
        float lattice = s3 * step(.95, length(aD));
        col *= 1. + lattice * .9;
        vCol = col * dim;
        gl_PointSize = aK.y * (1. + core * .3 + hot * .2) * mix(.03, .026, lattice) * uPx / -mv.z;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform sampler2D uMap; varying vec3 vCol; varying float vA;
      void main(){ float a = texture2D(uMap, gl_PointCoord).a * vA; gl_FragColor = vec4(vCol * a * .8, a); }`,
  }));
  cloud.frustumCulled = false;
  const world = new THREE.Group();
  world.add(cloud);
  scene.add(world);

  /* faint horizon disc under it all — gives the cloud a floor to stand over */
  const disc = new THREE.Mesh(
    new THREE.RingGeometry(0.1, 7, 96, 1),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uCol: { value: hdr(C.blue, 1) }, uTime: { value: 0 } },
      vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
      fragmentShader: `uniform vec3 uCol; uniform float uTime; varying vec2 vP;
        void main(){ float r = length(vP); float rings = smoothstep(.03, 0., abs(fract(r * 1.25 - uTime * .04) - .5) - .46);
          float a = exp(-r * .5) * (.05 + rings * .16); gl_FragColor = vec4(uCol * a, a); }`,
    }),
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = -2.9;
  world.add(disc);

  /* -------------------------------------------------------------- anchors: the memory layers' real names */
  const anchors = {};
  [[1, 1.25], [3, 2.35], [5, 0.3]].forEach(([ring, a]) => {
    const o = new THREE.Object3D();
    o.position.set(RADII[ring] * Math.cos(a), 0.12, RADII[ring] * Math.sin(a));
    world.add(o);
    anchors[`layer${ring}`] = o;
  });
  const chosen = new THREE.Object3D();
  const top = segs.filter((s) => s[6]).pop();
  chosen.position.set(top[3], top[4] + 0.2, top[5]);
  world.add(chosen);
  anchors.chosen = chosen;

  let stage = 0, rot = 0, tilt = 0.62;
  const api = {
    scene, camera,
    post: { exposure: 1, tone: 'aces', hue: 0.45, vignette: 0.3, grain: 0.02, bloom: { strength: 0.85, radius: 1.1, threshold: 0.7, knee: 0.5 } },
    anchors,
    anchorOn: (n) => (n === 'chosen' ? Math.abs(stage - 2) < 0.35 : Math.abs(stage - 1) < 0.35),
    /** 0..3, written by the page from the pinned scroll. */
    target: 0,
    update(dt, t, s) {
      // pin 0..1 → stage 0..3, with a hold on each stage
      const p = clamp(s.pin) * 4;
      const k = Math.min(3, Math.floor(p)), f = p - k;
      const want = Math.min(3, k + clamp((f - 0.62) / 0.38));
      stage = damp(stage, want, 3.2, dt);
      api.stageNow = stage;
      U.uStage.value = stage; U.uTime.value = t; disc.material.uniforms.uTime.value = t;
      U.uPx.value = pxPerUnit(s, camera);
      rot = damp(rot, s.pointer.x * 0.25, 2, dt);
      world.rotation.y = rot + t * 0.03;
      // look down on the vortex and the rings, level with the tree, a little above the lattice
      const tiltFor = (x) => (x < 1.5 ? 0.62 : x < 2.5 ? 0.06 : 0.32);
      tilt = damp(tilt, tiltFor(stage), 2.4, dt);
      world.rotation.x = tilt;
      const narrow = s.w / s.h < 0.9;
      // desktop: the cloud sits right of the stage list; phones: centred, further back
      world.position.set(narrow ? 0 : s.w > 1100 ? 2.4 : 1.6, narrow ? 0.9 : 0.1, 0);
      const pull = stage > 1.5 && stage < 2.5 ? 0.6 : 0;
      camera.position.set(s.pointer.x * 0.4, 1.3 - s.pointer.y * 0.25 + pull, narrow ? 16 : 12.5);
      camera.lookAt(world.position.x * 0.55, world.position.y * 0.6 + pull * 0.5, 0);
    },
    stageNow: 0,
    dispose() { scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); }); },
  };
  return api;
}
