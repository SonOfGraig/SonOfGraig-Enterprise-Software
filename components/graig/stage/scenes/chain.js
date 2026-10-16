// Chain — his changelog as what it really is: a hash chain. Each upgrade is a block,
// sealed to the one before it; the newest sits at the front. A verification pulse
// runs down the chain and every block it passes lights its edges — the log checking
// itself. Scrolling travels along the chain into the past.
import { THREE, C, hdr, damp, clamp, nightEnv, makeCanvas, canvasTexture } from '../kit';
import { BUS } from '../bus';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

// a real-looking digest from the entry text (FNV-1a, shown as hex): decoration, not a claim
function digest(str) {
  let h = 0x811c9dc5, out = '';
  for (let k = 0; k < 4; k++) {
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i) + k; h = Math.imul(h, 0x01000193) >>> 0; }
    out += h.toString(16).padStart(8, '0');
  }
  return out;
}
function faceTex(hash, date) {
  const c = makeCanvas(512, 512), x = c.getContext('2d');
  x.clearRect(0, 0, 512, 512);
  x.font = '500 30px "JetBrains Mono", ui-monospace, monospace';
  x.fillStyle = 'rgba(125,211,252,.85)';
  x.fillText(date.toUpperCase(), 56, 96);
  x.font = '400 24px "JetBrains Mono", ui-monospace, monospace';
  x.fillStyle = 'rgba(148,163,184,.55)';
  for (let i = 0; i < 4; i++) x.fillText(hash.slice(i * 8, i * 8 + 8).replace(/(.{4})/, '$1 '), 56, 330 + i * 34);
  x.strokeStyle = 'rgba(125,211,252,.35)'; x.lineWidth = 2;
  x.strokeRect(56, 140, 64, 64);
  x.beginPath(); x.moveTo(72, 172); x.lineTo(84, 186); x.lineTo(106, 158); x.stroke();
  return canvasTexture(c);
}

export async function create({ host, renderer, mobile }) {
  const entries = JSON.parse(host.dataset.entries || '[]'); // [{date, title}]
  const scene = new THREE.Scene();
  scene.environment = nightEnv(renderer);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

  const key = new THREE.DirectionalLight(0xbfe6ff, 1.4);
  key.position.set(-3, 5, 6);
  scene.add(key, new THREE.AmbientLight(0x1b2a4a, 0.6));

  const n = Math.max(8, entries.length + 4);
  const blockGeo = new RoundedBoxGeometry(1.25, 1.25, 1.25, 4, 0.12);
  const edgeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.27, 1.27, 1.27));
  const linkGeo = new THREE.TorusGeometry(0.16, 0.035, 12, 40);
  const path = (i) => new THREE.Vector3(Math.sin(i * 0.55) * 1.6 - i * 0.25, -i * 0.12, -i * 2.0);

  const blocks = [];
  for (let i = 0; i < n; i++) {
    const e = entries[i];
    const g = new THREE.Group();
    g.position.copy(path(i));
    g.rotation.y = 0.5 + Math.sin(i * 0.55) * 0.2;
    const mat = new THREE.MeshPhysicalMaterial({ color: 0x0e1117, roughness: 0.22, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 1.4 });
    const b = new THREE.Mesh(blockGeo, mat);
    g.add(b);
    const edgeMat = new THREE.LineBasicMaterial({ color: hdr(C.sky, 1), transparent: true, opacity: 0.25 });
    g.add(new THREE.LineSegments(edgeGeo, edgeMat));
    if (e) {
      const face = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 1.05), new THREE.MeshBasicMaterial({ map: faceTex(digest(e.title + e.date), e.date), transparent: true, depthWrite: false }));
      face.position.z = 0.63;
      g.add(face);
    }
    scene.add(g);
    blocks.push({ g, edgeMat, mat });
    if (i < n - 1) {
      // two interlocked links between this block and the next
      const a = path(i), c = path(i + 1);
      const mid = a.clone().lerp(c, 0.5);
      for (let k = 0; k < 2; k++) {
        const l = new THREE.Mesh(linkGeo, new THREE.MeshPhysicalMaterial({ color: 0x9fb4c8, metalness: 1, roughness: 0.25, envMapIntensity: 1.2 }));
        l.position.copy(mid).add(c.clone().sub(a).multiplyScalar((k - 0.5) * 0.14));
        l.lookAt(c);
        l.rotateZ(k ? Math.PI / 2 : 0);
        scene.add(l);
      }
    }
  }
  // the pulse: a small bright bead that travels the chain
  const bead = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), new THREE.MeshBasicMaterial({ color: hdr(C.ice, 6) }));
  scene.add(bead);
  // depth haze: points of far dust so the chain reads as receding into the past
  const anchors = {};
  for (let i = 0; i < Math.min(3, entries.length); i++) {
    const o = new THREE.Object3D();
    o.position.set(-0.75, 0.75, 0.2);
    blocks[i].g.add(o);
    anchors[`b${i}`] = o;
  }

  let travel = 0;
  const look = new THREE.Vector3();
  return {
    scene, camera,
    post: { exposure: 1.05, tone: 'aces', hue: 0.85, vignette: 0.28, grain: 0.02, bloom: { strength: 0.8, radius: 1, threshold: 0.75, knee: 0.4 } },
    anchors,
    anchorOn: () => !mobile,
    update(dt, t, s) {
      // a log row under the visitor's pointer flies the camera to its block; else scroll travels
      const focus = BUS.chainFocus;
      travel = damp(travel, focus >= 0 ? Math.max(0, Math.min(focus - 0.6, n - 3)) : clamp((s.progress - 0.25) / 0.6) * Math.min(4, n - 3), 3, dt);
      const at = path(travel);
      const narrow = s.w / s.h < 0.9;
      camera.position.set(at.x + 3.2 + s.pointer.x * 0.35, at.y + 1.6 - s.pointer.y * 0.2, at.z + (narrow ? 9 : 7.2));
      look.copy(path(travel + 1.5));
      camera.lookAt(look.x + 0.4, look.y - 0.2, look.z);
      // pulse runs from the newest block into the past, every 5 s
      const q = ((t * 0.2) % 1) * (n - 1);
      const k = Math.floor(q), f = q - k;
      bead.position.copy(path(k)).lerp(path(Math.min(n - 1, k + 1)), f);
      for (let i = 0; i < n; i++) {
        const d = Math.abs(q - i);
        const lit = Math.exp(-d * d * 3);
        const picked = i === focus ? 1 : 0;
        blocks[i].edgeMat.opacity = Math.min(1, 0.18 + lit * 0.8 + (i === 0 ? 0.25 : 0) + picked * 0.6);
        blocks[i].edgeMat.color.copy(hdr(C.sky, 1 + lit * 3 + (i === 0 ? 0.6 : 0) + picked * 2.2));
        blocks[i].g.position.y = path(i).y + Math.sin(t * 0.8 + i) * 0.03;
        // fade the far past into the night
        const far = clamp((i - travel - 4) / 4);
        blocks[i].g.visible = far < 0.99;
      }
    },
    dispose() { scene.traverse((o) => { o.geometry?.dispose(); o.material?.map?.dispose(); o.material?.dispose?.(); }); },
  };
}
