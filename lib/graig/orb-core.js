// GRAIG's orb — v6 "vault" (2026-10-17). Tumiso: "use this exact design" — the sealed
// vault from his website's privacy section — "remove the purple, it's not part of our
// design system", "port it across all devices", "a complete light/dark mode".
//
// ONE source for every face he has: the console and voice HUD (OrbReactor.tsx), the
// phone app (it loads the console), the vertical videos (backend/app/content/video.py
// inlines this file verbatim with its own THREE — every THREE name used here must be in
// video.py's _THREE_NS), and his website (exported to lib/graig/orb-core.js).
//
// The drawing: a bright core (his model of Tumiso) roiling on simplex noise, a wire
// lattice around it, three tumbler rings each with one gap and two lit notches, and a
// fresnel glass seal over the whole thing, with two soft glows. No lights needed: every
// material shades itself, so it looks the same in any scene.
//
// States, all from the sonofgraig blue spectrum (no violet):
//   idle       sapphire  · sealed: the tumblers sit in one plane, gaps aligned, turning slowly
//   listening  cyan      · still sealed; the rings lean in toward you, the core swells
//   thinking   sky       · the seal opens: each tumbler spins hard on its own axis, the lattice turns
//   speaking   electric  · sealed again; rings pulse with each syllable, the core goes white-hot
//
// Themes: 'dark' is the vault as drawn on the night section (additive light); 'light'
// redraws it for paper (inked rings, tinted glass, glows that tint instead of add).
//
// DETERMINISTIC: step(dt, state, level) integrates from its inputs only (no clock, no
// Math.random). The video steps it at a fixed 1/fps; the console passes frame time.

export const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
vec3 x1=x0-i1+1.0*C.xxx;vec3 x2=x0-i2+2.0*C.xxx;vec3 x3=x0-1.0+3.0*C.xxx;
i=mod(i,289.0);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
float n_=1.0/7.0;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);
vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}`;

// [deep, rim, glint] per state — sonofgraig blues only
export const PALETTE = {
  idle: ['#0B3B8C', '#38BDF8', '#BAE6FD'],
  listening: ['#065A6E', '#22D3EE', '#A5F3FC'],
  thinking: ['#0C4A6E', '#0EA5E9', '#E0F2FE'],
  speaking: ['#0B4A8C', '#7DD3FC', '#F0F9FF'],
};
export const DYNAMICS = {
  idle: { lock: 1, spin: 0.14, lean: 0, e: 0.18, wire: 0.25, amp: 0.05 },
  listening: { lock: 1, spin: 0.08, lean: 1, e: 0.45, wire: 0.2, amp: 0.06 },
  thinking: { lock: 0, spin: 1.35, lean: 0, e: 0.62, wire: 1.3, amp: 0.1 },
  speaking: { lock: 0.9, spin: 0.3, lean: 0.3, e: 0.95, wire: 0.5, amp: 0.08 },
};

const CORE_VERT = `${SNOISE}
uniform float uTime,uAmp;varying float vN;varying vec3 vNrm;varying vec3 vEye;
void main(){vec3 dir=normalize(position);float n=snoise(dir*2.2+uTime*.35);vN=n;
vec3 p=position+dir*n*uAmp;vec4 mv=modelViewMatrix*vec4(p,1.);vEye=normalize(-mv.xyz);vNrm=normalize(normalMatrix*dir);gl_Position=projectionMatrix*mv;}`;
const CORE_FRAG = `uniform vec3 uDeep,uRim,uGlint;uniform float uEnergy,uLevel,uLight;varying float vN;varying vec3 vNrm;varying vec3 vEye;
void main(){float ndv=clamp(dot(vNrm,vEye),0.,1.);float m=clamp(vN*.5+.5,0.,1.);
vec3 c=mix(uRim,uGlint,smoothstep(.35,1.,m)*ndv);
c=mix(c,vec3(1.),pow(ndv,3.)*(.25+uLevel*.6));
c=mix(c,uDeep,pow(1.-ndv,2.)*.6);
c*=mix(1.05+uEnergy*.35,.95,uLight);
gl_FragColor=vec4(c,1.);}`;
const FRES_VERT = `varying vec3 vNrm;varying vec3 vEye;
void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vEye=normalize(-mv.xyz);vNrm=normalize(normalMatrix*normal);gl_Position=projectionMatrix*mv;}`;
// tumblers: dark = glowing dashes, brighter at the edges; light = inked metal with a glint
const RING_FRAG = `uniform vec3 uDeep,uRim,uGlint;uniform float uLight,uEnergy;varying vec3 vNrm;varying vec3 vEye;
void main(){float ndv=clamp(dot(vNrm,vEye),0.,1.);float f=pow(1.-ndv,1.6);
vec3 dark=uRim*(.55+f*1.1+uEnergy*.25);
vec3 lit=mix(uDeep,uRim,f*.7)+uGlint*pow(ndv,24.)*.6;
gl_FragColor=vec4(mix(dark,lit,uLight),1.);}`;
const SEAL_FRAG = `uniform vec3 uDeep,uRim;uniform float uLight,uA;varying vec3 vNrm;varying vec3 vEye;
void main(){float f=pow(1.-clamp(dot(vNrm,vEye),0.,1.),3.);
if(uLight<.5){gl_FragColor=vec4(uRim*f*1.5*uA,f*uA);}
else{gl_FragColor=vec4(mix(uRim,uDeep,.45),f*.55*uA);}}`;

/**
 * Build the orb. Returns { object, step(dt, state, level), setTheme(theme), dispose() }.
 *   THREE      — the three.js namespace (passed in so the video can use its inlined copy)
 *   opts.lite  — fewer segments for weak GPUs
 *   opts.theme — 'dark' (default) or 'light'
 */
export function buildOrb(THREE, opts = {}) {
  const lite = !!opts.lite;
  let light = opts.theme === 'light' ? 1 : 0;
  const col = (k) => PALETTE[k].map((h) => new THREE.Color(h));
  const cur = col('idle');
  const targets = Object.fromEntries(Object.keys(PALETTE).map((k) => [k, col(k)]));
  const shared = { uDeep: { value: cur[0] }, uRim: { value: cur[1] }, uGlint: { value: cur[2] }, uLight: { value: light }, uEnergy: { value: 0.18 } };

  const root = new THREE.Group();
  const orb = new THREE.Group();
  orb.scale.setScalar(0.82);
  orb.rotation.x = 0.22;
  root.add(orb);

  // glows — canvas radial sprites
  const gc = document.createElement('canvas');
  gc.width = gc.height = 128;
  const gx = gc.getContext('2d');
  const gg = gx.createRadialGradient(64, 64, 0, 64, 64, 64);
  gg.addColorStop(0, 'rgba(255,255,255,1)');
  gg.addColorStop(0.3, 'rgba(255,255,255,.42)');
  gg.addColorStop(1, 'rgba(255,255,255,0)');
  gx.fillStyle = gg;
  gx.fillRect(0, 0, 128, 128);
  const glowTex = new THREE.CanvasTexture(gc);
  const glowMat = (o) => new THREE.SpriteMaterial({ map: glowTex, color: cur[1].clone(), transparent: true, opacity: o, depthWrite: false, blending: THREE.AdditiveBlending });
  const glowIn = new THREE.Sprite(glowMat(0.85));
  glowIn.scale.setScalar(1.7);
  const glowOut = new THREE.Sprite(glowMat(0.32));
  glowOut.scale.setScalar(4.6);
  root.add(glowOut, glowIn);

  // core
  const coreU = { ...shared, uTime: { value: 0 }, uAmp: { value: 0.05 }, uLevel: { value: 0 } };
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, lite ? 4 : 5), new THREE.ShaderMaterial({ uniforms: coreU, vertexShader: CORE_VERT, fragmentShader: CORE_FRAG }));
  orb.add(core);

  // lattice
  const wireMat = new THREE.LineBasicMaterial({ color: cur[2].clone(), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  const wire = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.66, 1)), wireMat);
  orb.add(wire);

  // tumblers: segmented rings, one gap each, a lit notch either side of it
  const ringMat = new THREE.ShaderMaterial({ uniforms: shared, vertexShader: FRES_VERT, fragmentShader: RING_FRAG });
  const notchMat = new THREE.MeshBasicMaterial({ color: cur[2].clone() });
  const START = [[0.9, -0.6, 1.7], [1.6, 0.5, 3.8], [2.3, 1.6, 5.9]];
  const tumblers = [0.88, 1.06, 1.24].map((R, k) => {
    const g = new THREE.Group();
    const segs = (lite ? 22 : 30) + k * 6;
    const arc = new THREE.TorusGeometry(R, 0.03 + k * 0.004, lite ? 5 : 8, 4, (0.8 / segs) * Math.PI * 2);
    for (let i = 1; i < segs; i++) {
      const m = new THREE.Mesh(arc, ringMat);
      m.rotation.z = (i / segs) * Math.PI * 2;
      g.add(m);
    }
    const nb = new THREE.BoxGeometry(0.026, 0.11, 0.11);
    for (const a of [0.03, (1 - 0.18 / segs) * Math.PI * 2]) {
      const n = new THREE.Mesh(nb, notchMat);
      n.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
      n.rotation.z = a;
      g.add(n);
    }
    g.userData.start = START[k];
    orb.add(g);
    return g;
  });

  // the seal
  const sealU = { ...shared, uA: { value: 1 } };
  const sealMat = new THREE.ShaderMaterial({ uniforms: sealU, vertexShader: FRES_VERT, fragmentShader: SEAL_FRAG, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const seal = new THREE.Mesh(new THREE.SphereGeometry(1.52, lite ? 40 : 64, lite ? 28 : 48), sealMat);
  orb.add(seal);

  function setTheme(theme) {
    light = theme === 'light' ? 1 : 0;
    shared.uLight.value = light;
    const blend = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    for (const m of [glowIn.material, glowOut.material, wireMat, sealMat]) {
      m.blending = blend;
      m.needsUpdate = true;
    }
  }
  setTheme(light ? 'light' : 'dark');

  // integrators
  let t = 0, lock = 1, spin = 0.14, lean = 0, e = 0.18, wireSpin = 0.25, amp = 0.05, turn = 0;
  const spins = [0, 0, 0];
  const qA = new THREE.Quaternion(), qB = new THREE.Quaternion(), eu = new THREE.Euler();

  function step(dt, state = 'idle', level = 0) {
    const d = DYNAMICS[state] || DYNAMICS.idle;
    const pal = targets[state] || targets.idle;
    const lv = Math.max(0, Math.min(1, level));
    const k = Math.min(1, dt * 3);
    t += dt;
    lock += (d.lock - lock) * Math.min(1, dt * 2.4);
    spin += (d.spin - spin) * k;
    lean += (d.lean - lean) * k;
    e += (d.e + lv * 0.4 - e) * Math.min(1, dt * 8);
    wireSpin += (d.wire - wireSpin) * k;
    amp += (d.amp + lv * 0.06 - amp) * Math.min(1, dt * 9);
    for (let i = 0; i < 3; i++) cur[i].lerp(pal[i], Math.min(1, dt * 2.4));

    shared.uEnergy.value = e;
    coreU.uTime.value = t;
    coreU.uAmp.value = amp;
    coreU.uLevel.value = lv;
    core.scale.setScalar(1 + lean * 0.1 + lv * 0.14 + Math.sin(t * 1.7) * 0.025);
    wireMat.color.copy(light ? cur[0] : cur[2]);
    wireMat.opacity = light ? 0.7 : 0.45 + e * 0.25;
    wire.rotation.x += dt * wireSpin * 0.7;
    wire.rotation.y += dt * wireSpin;
    notchMat.color.copy(light ? cur[1] : cur[2]);
    glowIn.material.color.copy(cur[1]);
    glowOut.material.color.copy(cur[1]);
    glowIn.material.opacity = light ? 0.28 + e * 0.1 : 0.6 + e * 0.35;
    glowOut.material.opacity = light ? 0.12 : 0.22 + e * 0.15;
    glowIn.scale.setScalar(1.6 + e * 0.4 + lv * 0.4);
    sealU.uA.value = 0.35 + lock * 0.65;

    turn += dt * (0.12 + spin * 0.2);
    for (let i = 0; i < 3; i++) {
      const g = tumblers[i], s0 = g.userData.start;
      spins[i] += dt * spin * (1 + i * 0.35) * (i % 2 ? -1 : 1);
      eu.set(s0[0] + spins[i] * 0.6, s0[1] + spins[i] * 0.4, s0[2] + spins[i]);
      qA.setFromEuler(eu);
      // sealed: all three face the viewer in one plane, gaps aligned on the right;
      // they lean in toward you while he listens
      eu.set(-0.3 * lean, 0, Math.sin(turn) * 0.25);
      qB.setFromEuler(eu);
      g.quaternion.copy(qA).slerp(qB, lock);
      const pulse = state === 'speaking' ? lv * 0.045 * (i + 1) : 0;
      g.scale.setScalar(1 - lean * 0.035 * i + pulse);
    }
    orb.rotation.y = Math.sin(t * 0.21) * 0.18;
    root.scale.setScalar(1 + lv * 0.03);
  }

  function dispose() {
    root.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) o.material.dispose();
    });
    glowTex.dispose();
  }

  step(0, 'idle', 0);
  return { object: root, step, setTheme, dispose };
}
