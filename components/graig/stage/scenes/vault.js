// Vault — what stays private. The model of Tumiso is a small bright core; around it
// three tumbler rings, each with one gap. As the section scrolls in they turn, align
// their gaps, and lock; then a glass seal closes over the whole thing. Sealed on
// hardware he owns.
import { THREE, C, hdr, damp, clamp, smooth, nightEnv, softDot } from '../kit';
import { BUS } from '../bus';

export async function create({ renderer, mobile }) {
  const scene = new THREE.Scene();
  scene.environment = nightEnv(renderer);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.8, 10);
  const key = new THREE.DirectionalLight(0xcfeaff, 2.4);
  key.position.set(-4, 6, 5);
  scene.add(key, new THREE.AmbientLight(0x1b2a4a, 0.5));

  const rig = new THREE.Group();
  scene.add(rig);

  // the core: the twin's model of Tumiso
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 4), new THREE.MeshBasicMaterial({ color: hdr(C.sky, 3.2) }));
  rig.add(core);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: softDot(), color: hdr(C.blue, 1.2), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  halo.scale.setScalar(2.6);
  rig.add(halo);
  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.72, 1)),
    new THREE.LineBasicMaterial({ color: hdr(C.sky, 1.4), transparent: true, opacity: 0.5 }),
  );
  rig.add(wire);

  // three tumblers: segmented rings with one gap each
  const tumblerMat = new THREE.MeshPhysicalMaterial({ color: 0x8ea3bf, metalness: 0.92, roughness: 0.26, clearcoat: 0.6, envMapIntensity: 2.2 });
  const notchMat = new THREE.MeshBasicMaterial({ color: hdr(C.sky, 2.2) });
  const tumblers = [1.25, 1.62, 2.0].map((R, k) => {
    const g = new THREE.Group();
    const segs = 28 + k * 8;
    for (let i = 1; i < segs; i++) {
      const a0 = (i / segs) * Math.PI * 2, a1 = ((i + 0.82) / segs) * Math.PI * 2;
      const seg = new THREE.Mesh(new THREE.TorusGeometry(R, 0.05 + k * 0.01, 8, 6, a1 - a0), tumblerMat);
      seg.rotation.z = a0;
      g.add(seg);
    }
    // a bright notch either side of the gap
    for (const a of [0.02, (1 - 0.2 / segs) * Math.PI * 2]) {
      const n = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.16, 0.16), notchMat);
      n.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
      n.rotation.z = a;
      g.add(n);
    }
    // each starts on its own axis, far out of line
    g.userData.start = new THREE.Euler(0.9 + k * 0.7, -0.6 + k * 1.1, 1.7 + k * 2.1);
    rig.add(g);
    return g;
  });

  // the seal: a glass rounded cube that closes once the gaps align
  const sealU = { uA: { value: 0 }, uCol: { value: hdr(C.sky, 1) } };
  const seal = new THREE.Mesh(
    new THREE.SphereGeometry(2.55, 64, 48),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: sealU,
      vertexShader: 'varying vec3 vN; varying vec3 vE; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.); vN = normalize(normalMatrix * normal); vE = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
      fragmentShader: `uniform float uA; uniform vec3 uCol; varying vec3 vN; varying vec3 vE;
        void main(){ float f = pow(1. - clamp(dot(vN, vE), 0., 1.), 3.); gl_FragColor = vec4(uCol * f * 1.4 * uA, f * uA); }`,
    }),
  );
  rig.add(seal);

  const aSeal = new THREE.Object3D();
  aSeal.position.set(1.7, 1.7, 0.4);
  const aCore = new THREE.Object3D();
  aCore.position.set(-1.0, -0.9, 0.5);
  rig.add(aSeal, aCore);

  let lock = 0, rot = 0;
  const q0 = new THREE.Quaternion(), q1 = new THREE.Quaternion(), qs = new THREE.Quaternion();
  return {
    scene, camera,
    post: { exposure: 1.05, tone: 'aces', hue: 0.75, vignette: 0.26, grain: 0.02, bloom: { strength: 0.85, radius: 1, threshold: 0.7, knee: 0.45 } },
    anchors: { seal: aSeal, core: aCore },
    anchorOn: (n) => (n === 'seal' ? lock > 0.85 : true),
    update(dt, t, s) {
      // the four seals on the page: each one a visitor reaches locks one more tumbler,
      // the fourth closes the glass; before that, scrolling in does it on its own
      const step = BUS.vaultStep;
      lock = damp(lock, step >= 0 ? (step >= 3 ? 1 : 0.75) : smooth(0.2, 0.55, s.progress), 3, dt);
      tumblers.forEach((g, k) => {
        const want = step >= 0 ? (step >= k ? 1 : 0) : lock;
        g.userData.lock = damp(g.userData.lock ?? 0, want, 3.2, dt);
        qs.setFromEuler(g.userData.start);
        q1.identity();
        // before locking each one drifts on its own axis; it settles into the shared plane
        const drift = new THREE.Euler(g.userData.start.x + t * (0.2 + k * 0.07), g.userData.start.y + t * 0.13, g.userData.start.z + t * (0.3 - k * 0.1));
        q0.setFromEuler(drift);
        g.quaternion.copy(q0).slerp(q1, g.userData.lock);
        g.scale.setScalar(1 - lock * 0.04 * k);
      });
      sealU.uA.value = step >= 0 ? (step >= 3 ? smooth(0.8, 1, lock) : 0) : smooth(0.8, 1, lock);
      core.scale.setScalar(1 + Math.sin(t * 2.2) * 0.04);
      wire.rotation.set(t * 0.2, t * 0.31, 0);
      halo.material.opacity = 0.45 + lock * 0.25;
      rot = damp(rot, s.pointer.x * 0.35, 2, dt);
      rig.rotation.y = rot - 0.35 + lock * 0.35;
      rig.rotation.x = 0.25 - lock * 0.1;
      const narrow = s.w / s.h < 0.9;
      camera.position.set(s.pointer.x * 0.3, 0.5 - s.pointer.y * 0.2, narrow ? 13 : 10);
      camera.lookAt(0, 0, 0);
    },
    dispose() { scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); }); },
  };
}
