// Hero — Graig is Tumiso, extended. On the paper, under the headline: Tumiso as a
// glossy ink sphere (the original) and Graig as his orb (core, lattice, tumblers,
// glass, orbit). Between them a braided stream runs both ways — what one learns, the
// other keeps — turning from ink to blue as it crosses, with brighter packets riding
// it. Under them the ledger grid runs off into the distance. Scrolling draws them
// together. Hovering Graig makes him listen; the state buttons drive his orb.
import { THREE, C, rng, damp, clamp, studioEnv, paperLights, shadowFloor, contactShadow, softDot, pxPerUnit } from '../kit';
import { buildOrb } from '@/lib/graig/orb-core';

const ORB_STATES = ['idle', 'listening', 'thinking', 'speaking'];
import { BUS } from '../bus';

export async function create({ host, renderer, mobile }) {
  const zone = host.closest('section')?.querySelector('.g-stage-zone');
  const scene = new THREE.Scene();
  scene.environment = studioEnv(renderer);
  const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 200);
  camera.position.set(0, 2.2, 17);
  const lite = (navigator.hardwareConcurrency || 4) <= 4;
  const { key } = paperLights(scene, { size: 7, mapSize: lite ? 1024 : 2048 });

  const world = new THREE.Group();
  scene.add(world);
  const FLOOR = -1.3;
  const floor = shadowFloor(60, 0.12, 7.5);
  floor.position.y = FLOOR;
  world.add(floor);

  /* -------------------------------------------------------------- the ledger grid on the floor */
  const gridU = { uInk: { value: new THREE.Color(C.ink) }, uBlue: { value: new THREE.Color(C.blue) }, uTime: { value: 0 } };
  const grid = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, uniforms: gridU,
      vertexShader: 'varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }',
      fragmentShader: /* glsl */ `
        uniform vec3 uInk, uBlue; uniform float uTime; varying vec2 vP;
        float ln(float v, float s){ float w = fwidth(v / s); return 1. - smoothstep(0., w * 1.2, abs(fract(v / s + .5) - .5)); }
        void main(){
          float g = max(ln(vP.x, .9), ln(vP.y, .9));
          float r = length(vP * vec2(.8, 1.));
          float fade = smoothstep(11., 2.5, r);
          // a slow pulse of blue runs out from between them along the grid: one exchange
          float k = fract(uTime * .08);
          float ring = smoothstep(.35, 0., abs(r - k * 11.)) * (1. - k);
          gl_FragColor = vec4(mix(uInk, uBlue, ring), g * fade * (.07 + ring * .2));
        }`,
    }),
  );
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = FLOOR + 0.002;
  grid.renderOrder = -3;
  world.add(grid);

  /* -------------------------------------------------------------- Tumiso: the original */
  const left = new THREE.Group();
  const ink = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    new THREE.MeshPhysicalMaterial({ color: C.ink, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.06, sheen: 0.4, sheenColor: new THREE.Color(0x4b5563) }),
  );
  ink.castShadow = true;
  left.add(ink);
  const lcs = contactShadow(2.6, 0.34);
  lcs.position.y = FLOOR + 0.004;
  world.add(left, lcs);

  /* -------------------------------------------------------------- Graig: his orb */
  const right = new THREE.Group();
  // his real face: the same orb-core as his console, HUD, phone and videos, drawn for paper
  const orb = buildOrb(THREE, { lite, theme: 'light' });
  orb.object.scale.setScalar(1.05);
  right.add(orb.object);
  const rcs = contactShadow(2.8, 0.2);
  rcs.position.y = FLOOR + 0.004;
  world.add(right, rcs);

  /* -------------------------------------------------------------- the braid + its packets */
  const strands = (n, sizeK, seed) => {
    const rr = rng(seed);
    const aU = new Float32Array(n), aS = new Float32Array(n), aO = new Float32Array(n), aZ = new Float32Array(n);
    for (let i = 0; i < n; i++) { aU[i] = rr(); aS[i] = i % 2; aO[i] = rr(); aZ[i] = (0.55 + rr() ** 3 * 1.4) * sizeK; }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aU', new THREE.BufferAttribute(aU, 1));
    g.setAttribute('aStrand', new THREE.BufferAttribute(aS, 1));
    g.setAttribute('aOff', new THREE.BufferAttribute(aO, 1));
    g.setAttribute('aSz', new THREE.BufferAttribute(aZ, 1));
    return g;
  };
  const bu = {
    uTime: { value: 0 }, uL: { value: new THREE.Vector3() }, uR: { value: new THREE.Vector3() }, uPx: { value: 1 }, uSpeed: { value: 1 },
    uInk: { value: new THREE.Color(C.ink) }, uBlue: { value: new THREE.Color(C.blue) }, uMap: { value: softDot() }, uRich: { value: 0.5 },
  };
  const braidVS = (packet) => /* glsl */ `
    attribute float aU, aStrand, aOff, aSz; uniform float uTime, uPx, uRich, uSpeed; uniform vec3 uL, uR; varying float vT, vA;
    void main(){
      float u = fract(aU + uTime * (${packet ? '.11' : '.05'} + aOff * .03) * uSpeed * (aStrand > .5 ? -1. : 1.));
      vec3 a = uL + vec3(.92, .05, 0.), b = uR - vec3(1.22, -.05, 0.);
      vec3 p = mix(a, b, u); p.y += sin(u * 3.14159) * .7;
      float tw = (u * 10. + uTime * .8) * 3.14159 + aStrand * 3.14159;
      float rad = .2 * sin(u * 3.14159) + .025;
      p.y += cos(tw) * rad; p.z += sin(tw) * rad;
      ${packet ? '' : 'p += (vec3(fract(aOff * 13.7), fract(aOff * 7.3), fract(aOff * 3.1)) - .5) * .045;'}
      vec4 mv = modelViewMatrix * vec4(p, 1.);
      vT = aStrand > .5 ? 1. - u : u;
      vA = smoothstep(0., .07, u) * smoothstep(1., .93, u) * ${packet ? '1.' : 'step(aOff, uRich)'};
      gl_PointSize = aSz * ${packet ? '.05' : '.016'} * uPx / -mv.z;
      gl_Position = projectionMatrix * mv;
    }`;
  const braidFS = (packet) => /* glsl */ `
    uniform sampler2D uMap; uniform vec3 uInk, uBlue; varying float vT, vA;
    void main(){
      float a = texture2D(uMap, gl_PointCoord).a * vA;
      if (a < .02) discard;
      vec3 c = mix(uInk, uBlue, smoothstep(.15, .85, vT));
      ${packet ? 'c = mix(c, vec3(1.), .25);' : 'a *= .88;'}
      gl_FragColor = vec4(c, a);
    }`;
  const lite2 = mobile || lite;
  const braid = new THREE.Points(strands(mobile ? 1400 : lite2 ? 2200 : 3200, 1, 5), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: bu, vertexShader: braidVS(false), fragmentShader: braidFS(false) }));
  const packets = new THREE.Points(strands(mobile ? 8 : 14, 1, 9), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: bu, vertexShader: braidVS(true), fragmentShader: braidFS(true) }));
  braid.frustumCulled = packets.frustumCulled = false;
  braid.renderOrder = packets.renderOrder = 1;
  world.add(braid, packets);

  /* -------------------------------------------------------------- dust in the light */
  const DN = mobile ? 160 : 320;
  const dr = rng(31);
  const dp = new Float32Array(DN * 3), dz = new Float32Array(DN);
  for (let i = 0; i < DN; i++) { dp[i * 3] = (dr() - 0.5) * 16; dp[i * 3 + 1] = FLOOR + dr() * 6; dp[i * 3 + 2] = (dr() - 0.5) * 8; dz[i] = 0.4 + dr() * 1.2; }
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  dg.setAttribute('aSz', new THREE.BufferAttribute(dz, 1));
  const du = { uTime: { value: 0 }, uPx: { value: 1 }, uMap: { value: softDot() } };
  const dust = new THREE.Points(dg, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, uniforms: du,
    vertexShader: `attribute float aSz; uniform float uTime, uPx; varying float vA;
      void main(){ vec3 p = position; p.y += sin(uTime * .2 + position.x) * .15; p.x += sin(uTime * .13 + position.z * 2.) * .2;
        vec4 mv = modelViewMatrix * vec4(p, 1.); vA = smoothstep(30., 10., -mv.z); gl_PointSize = aSz * .02 * uPx / -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: 'uniform sampler2D uMap; varying float vA; void main(){ float a = texture2D(uMap, gl_PointCoord).a * vA * .22; gl_FragColor = vec4(.3, .42, .55, a); }',
  }));
  dust.frustumCulled = false;
  world.add(dust);

  /* -------------------------------------------------------------- anchors */
  const aT = new THREE.Object3D(), aG = new THREE.Object3D(), aB = new THREE.Object3D();
  aT.position.set(0, -1.32, 0.4); aG.position.set(0, -1.32, 0.4); // names hang under each of them, clear of the copy
  left.add(aT); right.add(aG); world.add(aB);

  key.shadow.autoUpdate = true;
  let near = 0, rot = 0, voice = 0, since = 0, hoverK = 0;
  const _v = new THREE.Vector3();
  return {
    scene, camera, tone: 'neutral', exposure: 1,
    anchors: { tumiso: aT, graig: aG, bridge: aB },
    anchorOn: (n) => (n === 'bridge' ? !mobile : true),
    update(dt, t, s) {
      const narrow = s.w / s.h < 0.9;
      // framing: the pair stands in the stage zone under the centred copy, sized to fit it
      const dist = 17;
      const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist;
      const ppu = s.h / (2 * half); // css px per world unit at the pair's depth
      const zr = zone?.getBoundingClientRect();
      const zTop = zr ? zr.top - s.rect.top : s.h * 0.55, zH = zr ? zr.height : s.h * 0.35;
      const fy = (zTop + zH * 0.46) / s.h;
      const fit = Math.min(1, (zH * 0.5) / (1.75 * ppu), (s.w * 0.47) / (4.6 * ppu));
      world.position.y = (1 - 2 * fy) * half;
      world.scale.setScalar(fit);

      // scroll: as the hero leaves, they draw together
      near = damp(near, clamp((s.progress - 0.5) * 2.2), 4, dt);
      const gap = (narrow ? 1.75 : 2.7) - near * (narrow ? 0.2 : 0.55);
      left.position.set(-gap, Math.sin(t * 0.9) * 0.05, 0);
      right.position.set(gap, Math.sin(t * 0.9 + 1.4) * 0.05, 0);
      lcs.position.x = left.position.x; rcs.position.x = right.position.x;
      aB.position.set(0, -0.72, 0.5);

      // Graig's state: a hovered button previews; hovering him makes him listen; else his own cycle
      since += dt;
      if (BUS.auto && since > 4.5) { since = 0; BUS.set('orb', ORB_STATES[(ORB_STATES.indexOf(BUS.orb) + 1) % ORB_STATES.length]); }
      world.updateMatrixWorld();
      _v.copy(right.position).applyMatrix4(world.matrixWorld).project(camera);
      const dx = (s.pointer.x - _v.x) * (s.w / s.h), dy = -s.pointer.y - _v.y;
      const hovered = s.hover && Math.hypot(dx, dy) < 0.32 * (narrow ? 0.8 : 1);
      hoverK = damp(hoverK, hovered ? 1 : 0, 8, dt);
      const st = BUS.preview || (hoverK > 0.5 ? 'listening' : BUS.orb);
      BUS.set('shown', st);
      const level = st === 'speaking' ? Math.max(0, Math.sin(t * 9) * 0.6 + Math.sin(t * 23) * 0.3) : 0;
      voice = damp(voice, level, 18, dt);
      orb.step(dt, st, voice);
      // he turns a little toward you when you come close
      right.rotation.y = damp(right.rotation.y, hovered ? -0.25 : 0, 4, dt);

      bu.uL.value.copy(left.position); bu.uR.value.copy(right.position);
      bu.uTime.value = t; du.uTime.value = t; gridU.uTime.value = t;
      bu.uRich.value = 0.45 + near * 0.55;
      bu.uSpeed.value = st === 'thinking' ? 1.8 : st === 'speaking' ? 1.4 : st === 'listening' ? 0.7 : 1;
      const px = pxPerUnit(s, camera);
      bu.uPx.value = px; du.uPx.value = px;

      rot = damp(rot, s.pointer.x * 0.12, 2.5, dt);
      world.rotation.y = rot;
      camera.position.set(s.pointer.x * 0.35, s.pointer.y * -0.18 + near * 0.5, dist);
      camera.lookAt(0, near * 0.3, 0);
    },
    dispose() { orb.dispose(); scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); }); },
  };
}
