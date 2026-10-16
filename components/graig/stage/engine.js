/* Graig's stage — one fixed WebGL canvas behind his whole page.
   Ported from the Sunset 3-D engine (C:\sunset-3d\js\main.js + core.js):
   - the canvas IS the page ground: it paints every section's colour, the long night↔paper
     blends between them, a faint grain, and the ledger grid (hairline columns carried
     through the page) — so 3-D can sit in the page instead of inside boxes;
   - every [data-gscene] host is a window into its own THREE.Scene, drawn each frame with
     viewport + scissor onto the same canvas (optionally through the HDR post chain);
   - .g-anchor children of a host are DOM labels pinned to 3-D points.
   Scene modules export `async function create(ctx)` and return
   { scene, camera, update(dt, t, s), post?, tone?, exposure?, anchors?, anchorOn?(name) }.
   s = { rect, w, h, dt, t, progress (0 entering → 1 leaving), pin (through the pinned section),
         pointer {x,y} (-1..1 around the host centre), hover, scrollV, age, mobile }. */
import * as THREE from 'three';
import { Post } from './post';
import { clamp, damp, REDUCED } from './kit';

export function startStage({ canvas, root, loaders }) {
  const $$ = (s) => [...root.querySelectorAll(s)];
  const VP = { w: 1440, h: 900, dpr: 1, maxDpr: 2, mobile: false };
  const readViewport = () => {
    VP.w = document.documentElement.clientWidth || innerWidth;
    VP.h = innerHeight;
    VP.mobile = VP.w < 820;
    // weak GPUs (the i3 in the office) start lower; the governor raises it if frames allow
    const cores = navigator.hardwareConcurrency || 4;
    VP.maxDpr = Math.min(devicePixelRatio || 1, cores <= 4 ? 1.5 : 2);
    if (!VP.dpr || VP.dpr > VP.maxDpr) VP.dpr = VP.maxDpr;
  };
  readViewport();
  const PTR = { x: VP.w / 2, y: VP.h / 2 };
  const onPtr = (e) => { PTR.x = e.clientX; PTR.y = e.clientY; };
  addEventListener('pointermove', onPtr, { passive: true });

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false });
  } catch {
    return null; // no WebGL: the CSS section colours stay
  }
  renderer.setPixelRatio(VP.dpr);
  renderer.setSize(VP.w, VP.h, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.autoClear = false;
  renderer.setClearColor(0x070810, 1);
  document.documentElement.classList.add('g-gl');

  /* ---------------------------------------------------------------- page ground */
  const sections = $$('[data-ground]');
  const MAXS = 16;
  const ground = (() => {
    const u = {
      uHole: { value: Array.from({ length: 8 }, () => new THREE.Vector4()) }, uHoleN: { value: 0 },
      uLineX: { value: new Float32Array(5) }, uLineN: { value: 0 },
      uLines: { value: new Float32Array(MAXS) }, uTop: { value: new Float32Array(MAXS) }, uBlend: { value: new Float32Array(MAXS) },
      uCol: { value: Array.from({ length: MAXS }, () => new THREE.Vector3()) }, uN: { value: 0 },
      uRes: { value: new THREE.Vector2() }, uDpr: { value: 1 }, uScroll: { value: 0 },
    };
    const m = new THREE.ShaderMaterial({
      uniforms: u, depthTest: false, depthWrite: false,
      vertexShader: 'void main(){ gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: /* glsl */ `
        uniform float uLineX[5]; uniform int uLineN; uniform float uLines[${MAXS}]; uniform vec4 uHole[8]; uniform int uHoleN;
        uniform float uTop[${MAXS}]; uniform float uBlend[${MAXS}]; uniform vec3 uCol[${MAXS}]; uniform int uN; uniform vec2 uRes; uniform float uDpr, uScroll;
        float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
        void main(){
          float y = (uRes.y - gl_FragCoord.y) / uDpr;
          vec3 c = uCol[0]; float lines = uLines[0];
          for (int i = 1; i < ${MAXS}; i++) {
            if (i >= uN) break;
            if (y >= uTop[i]) lines = uLines[i];
            float b = uBlend[i];
            float t = b < 1. ? step(uTop[i], y) : smoothstep(uTop[i] - b * .35, uTop[i] + b * .65, y);
            c = mix(c, uCol[i], t);
          }
          vec2 pp = vec2(gl_FragCoord.x, gl_FragCoord.y - uScroll * uDpr) / uDpr;   // grain lives on the page, not the screen
          float lum = dot(c, vec3(.3, .59, .11));
          c += (h12(floor(pp)) - .5) * mix(.012, .02, 1. - lum);
          float fx = gl_FragCoord.x / uDpr;
          for (int k = 0; k < 8; k++) { if (k >= uHoleN) break; vec4 h = uHole[k]; if (fx > h.x && fx < h.z && y > h.y && y < h.w) lines = 0.; }
          if (lines > 0.) {
            float mm = 0.;
            for (int k = 0; k < 5; k++) { if (k >= uLineN) break; mm = max(mm, 1. - clamp(abs(fx - uLineX[k]) * uDpr - .5, 0., 1.)); }
            c = mix(c, lum < .35 ? vec3(.62, .78, .95) : vec3(.05, .07, .09), mm * lines * (lum < .35 ? .55 : 1.));
          }
          gl_FragColor = vec4(c, 1.);
        }`,
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    const mesh = new THREE.Mesh(g, m);
    mesh.frustumCulled = false;
    const sc = new THREE.Scene();
    sc.add(mesh);
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    // colours are written raw (no colour-space conversion), so the canvas shows exactly the CSS hex
    const cols = sections.map((s) => new THREE.Color().setStyle(s.dataset.ground, THREE.LinearSRGBColorSpace));
    const lineA = sections.map((s) => +(s.dataset.lines || 0));
    const lineHosts = $$('[data-gscene]').filter((h) => { const s = h.closest('[data-ground]'); return s && +(s.dataset.lines || 0) > 0; });
    return {
      render(r, scroll) {
        // ledger columns: the frame edges and its quarters (1200px container, site gutters)
        const pad = VP.w < 640 ? 16 : 32, fw = Math.min(1200, VP.w - pad * 2), fl = (VP.w - fw) / 2;
        const n5 = VP.w < 640 ? 2 : 5;
        for (let k = 0; k < 5; k++) u.uLineX.value[k] = (n5 === 2 ? fl + (k ? fw : 0) : fl + (fw * k) / 4) + 0.5;
        u.uLineN.value = n5;
        let n = 0;
        for (let i = 0; i < sections.length && n < MAXS; i++) {
          const rc = sections[i].getBoundingClientRect();
          if (rc.top > VP.h + 900) break;
          if (rc.bottom < -900 && i < sections.length - 1) continue;
          u.uLines.value[n] = lineA[i];
          u.uTop.value[n] = n === 0 ? -1e5 : rc.top;
          u.uBlend.value[n] = +(sections[i].dataset.blend || 0);
          u.uCol.value[n].set(cols[i].r, cols[i].g, cols[i].b);
          n++;
        }
        let hn = 0;
        for (const hs of lineHosts) {
          if (hn >= 8) break;
          const rc = hs.getBoundingClientRect();
          if (rc.bottom < 0 || rc.top > VP.h) continue;
          u.uHole.value[hn++].set(rc.left, rc.top, rc.right, rc.bottom);
        }
        u.uHoleN.value = hn;
        u.uN.value = Math.max(1, n);
        u.uRes.value.set(VP.w * VP.dpr, VP.h * VP.dpr);
        u.uDpr.value = VP.dpr;
        u.uScroll.value = scroll;
        r.setRenderTarget(null);
        r.setScissorTest(false);
        r.setViewport(0, 0, VP.w, VP.h);
        const tm = r.toneMapping;
        r.toneMapping = THREE.NoToneMapping;
        r.render(sc, cam);
        r.toneMapping = tm;
      },
    };
  })();

  /* ---------------------------------------------------------------- fade-in veil: a new scene rises out of its section colour */
  const veil = (() => {
    const u = { uCol: { value: new THREE.Vector3() }, uA: { value: 1 } };
    const m = new THREE.ShaderMaterial({
      uniforms: u, transparent: true, depthTest: false, depthWrite: false,
      vertexShader: 'void main(){ gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: 'uniform vec3 uCol; uniform float uA; void main(){ gl_FragColor = vec4(uCol, uA); }',
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    const mesh = new THREE.Mesh(g, m);
    mesh.frustumCulled = false;
    const sc = new THREE.Scene();
    sc.add(mesh);
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const c = new THREE.Color();
    return (r, host, clip, a) => {
      c.setStyle(host.section?.dataset.ground || '#070810', THREE.LinearSRGBColorSpace);
      u.uCol.value.set(c.r, c.g, c.b);
      u.uA.value = a;
      r.setRenderTarget(null);
      r.setViewport(0, 0, VP.w, VP.h);
      r.setScissor(clip.left, VP.h - clip.bottom, clip.width, clip.height);
      r.setScissorTest(true);
      const tm = r.toneMapping;
      r.toneMapping = THREE.NoToneMapping;
      r.render(sc, cam);
      r.toneMapping = tm;
      r.setScissorTest(false);
    };
  })();

  /* ---------------------------------------------------------------- scene hosts */
  const hosts = $$('[data-gscene]').map((el) => ({
    el, name: el.dataset.gscene, obj: null, state: 'idle', born: 0, visible: false,
    section: el.closest('[data-ground]'),
    anchors: [...el.querySelectorAll('.g-anchor')].map((a) => ({ el: a, name: a.dataset.anchor, x: -1e4, y: -1e4, on: false })),
  }));
  let dead = false;
  async function buildHost(h) {
    if (h.state !== 'idle') return;
    h.state = 'loading';
    try {
      const load = loaders[h.name];
      if (!load) throw new Error('no loader');
      const mod = await load();
      if (dead) return;
      h.obj = await mod.create({ host: h.el, name: h.name, renderer, THREE, VP, mobile: VP.mobile });
      if (dead) return;
      if (h.obj.post && !(h.obj.post instanceof Post)) h.obj.post = new Post(h.obj.post);
      h.state = 'ready';
      h.born = performance.now();
      h.el.classList.add('g-ready');
      try { renderer.compile(h.obj.scene, h.obj.camera); } catch { /* compiled on first draw */ }
    } catch (e) {
      h.state = 'missing';
      console.warn(`[graig] scene "${h.name}" not available:`, e?.message || e);
    }
  }
  (async () => {
    // the hero first, then the rest in page order, one at a time so first paint stays smooth
    for (const h of hosts) {
      await buildHost(h);
      if (dead) return;
      frame(performance.now(), true);
      await new Promise((r) => setTimeout(r, 30));
    }
  })();

  /* ---------------------------------------------------------------- loop */
  let last = performance.now(), T = 0, lastScroll = scrollY, scrollV = 0, frozen = null;
  let ftAvg = 16.7, lastGov = 0, lastFrameAt = 0, raf = 0;
  const _p = new THREE.Vector3();
  function resize() {
    readViewport();
    renderer.setPixelRatio(VP.dpr);
    renderer.setSize(VP.w, VP.h, false);
  }
  addEventListener('resize', resize);

  function frame(now, forced) {
    if (dead) return;
    lastFrameAt = now;
    const dt = Math.min(Math.max((now - last) / 1000, 0), 1 / 20);
    last = now;
    if (frozen === null) T += dt;
    else T = frozen;
    const sy = scrollY;
    scrollV = damp(scrollV, (sy - lastScroll) / Math.max(dt, 1 / 240), 8, dt);
    lastScroll = sy;

    // governor: hold frames near vsync by trading pixel ratio (never below 1)
    if (!forced && dt > 0) ftAvg = ftAvg * 0.95 + dt * 1000 * 0.05;
    if (!forced && now - lastGov > 2500) {
      if (ftAvg > 24 && VP.dpr > 1) { VP.dpr = Math.max(1, VP.dpr - 0.25); resize(); lastGov = now; }
      else if (ftAvg < 15 && VP.dpr < VP.maxDpr) { VP.dpr = Math.min(VP.maxDpr, VP.dpr + 0.25); resize(); lastGov = now; }
    }

    ground.render(renderer, sy);

    const H = VP.h, W = VP.w;
    for (const h of hosts) {
      if (h.state !== 'ready') continue;
      const r = h.el.getBoundingClientRect();
      const vis = r.bottom > 0 && r.top < H && r.right > 0 && r.left < W && r.width > 2 && r.height > 2;
      h.visible = vis;
      if (!vis) {
        for (const a of h.anchors) if (a.on) { a.on = false; a.el.classList.remove('on'); }
        continue;
      }
      const o = h.obj;
      const sec = h.section ? h.section.getBoundingClientRect() : r;
      const s = {
        rect: r, w: r.width, h: r.height, dt, t: T, mobile: VP.mobile, dpr: VP.dpr,
        progress: clamp((H - r.top) / (H + r.height)),
        pin: clamp(-sec.top / Math.max(1, sec.height - H)),
        pointer: {
          x: clamp((PTR.x - (r.left + r.width / 2)) / (r.width / 2), -1.5, 1.5),
          y: clamp((PTR.y - (r.top + r.height / 2)) / (r.height / 2), -1.5, 1.5),
        },
        hover: PTR.x >= r.left && PTR.x <= r.right && PTR.y >= r.top && PTR.y <= r.bottom,
        scrollV, age: (now - h.born) / 1000,
      };
      if (o.autoAspect !== false && o.camera.isPerspectiveCamera) {
        const a = r.width / r.height;
        if (Math.abs(o.camera.aspect - a) > 1e-4) { o.camera.aspect = a; o.camera.updateProjectionMatrix(); }
      }
      o.update?.(REDUCED ? 0 : dt, REDUCED ? 2 : T, s);
      const clip = { left: Math.max(0, r.left), top: Math.max(0, r.top), right: Math.min(W, r.right), bottom: Math.min(H, r.bottom) };
      clip.width = clip.right - clip.left;
      clip.height = clip.bottom - clip.top;
      if (o.post) o.post.render(renderer, o.scene, o.camera, r, clip, VP.dpr, T, H);
      else {
        renderer.setRenderTarget(null);
        renderer.setViewport(r.left, H - r.bottom, r.width, r.height);
        renderer.setScissor(clip.left, H - clip.bottom, clip.width, clip.height);
        renderer.setScissorTest(true);
        renderer.clear(false, true, false);
        renderer.toneMapping = o.tone === 'agx' ? THREE.AgXToneMapping : o.tone === 'neutral' ? THREE.NeutralToneMapping : THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = o.exposure ?? 1;
        renderer.render(o.scene, o.camera);
        renderer.setScissorTest(false);
      }
      const fade = frozen !== null ? 1 : clamp(s.age / 1.1);
      if (fade < 1) veil(renderer, h, clip, 1 - fade * fade * (3 - 2 * fade));
      // DOM labels pinned to 3-D points (transform-only writes)
      if (h.anchors.length && o.anchors) {
        for (const a of h.anchors) {
          const src = o.anchors[a.name];
          if (!src) continue;
          const v = src.isVector3 ? _p.copy(src) : src.getWorldPosition(_p);
          v.project(o.camera);
          const x = (v.x * 0.5 + 0.5) * r.width, y = (-v.y * 0.5 + 0.5) * r.height;
          const on = v.z < 1 && fade > 0.6 && (o.anchorOn ? o.anchorOn(a.name) : true);
          if (Math.abs(x - a.x) > 0.2 || Math.abs(y - a.y) > 0.2) {
            a.el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
            a.x = x; a.y = y;
          }
          if (on !== a.on) { a.on = on; a.el.classList.toggle('on', on); }
        }
      }
    }
  }
  function loop(now) {
    if (dead) return;
    if (!document.hidden) frame(now);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  // when rAF stalls (a hidden preview pane) keep painting slowly, so captures are never blank
  const iv = setInterval(() => { const n = performance.now(); if (n - lastFrameAt > 400) frame(n, true); }, 250);
  frame(performance.now(), true);

  const api = {
    hosts, renderer, VP,
    freeze(t) { frozen = t; frame(performance.now(), true); },
    unfreeze() { frozen = null; },
    status() { return Object.fromEntries(hosts.map((h) => [h.name, h.state])); },
    render() { frame(performance.now(), true); },
    fps() { return 1000 / ftAvg; },
    destroy() {
      dead = true;
      cancelAnimationFrame(raf);
      clearInterval(iv);
      removeEventListener('resize', resize);
      removeEventListener('pointermove', onPtr);
      for (const h of hosts) h.obj?.dispose?.();
      renderer.dispose();
      document.documentElement.classList.remove('g-gl');
    },
  };
  window.__graigStage = api;
  return api;
}
