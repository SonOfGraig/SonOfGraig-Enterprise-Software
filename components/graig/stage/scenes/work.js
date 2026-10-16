// Work — the carousel he published on one real day, as physical cards on the paper.
// The front card is always flat and face-on (the design is never tilted); the others
// fan back on either side, with soft shadows and a faint reflection on the floor.
// Scrolling through the section deals the slides forward one by one.
import { THREE, damp, clamp, studioEnv, paperLights, shadowFloor, makeCanvas, canvasTexture } from '../kit';

function roundMask(w = 256, h = 320, rad = 18) {
  const c = makeCanvas(w, h), x = c.getContext('2d');
  x.fillStyle = '#000'; x.fillRect(0, 0, w, h);
  x.fillStyle = '#fff';
  x.beginPath(); x.roundRect(1, 1, w - 2, h - 2, rad); x.fill();
  return canvasTexture(c, { srgb: false });
}
function fadeMask() {
  const c = makeCanvas(8, 128), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, '#000'); g.addColorStop(0.55, '#000'); g.addColorStop(1, '#666');
  x.fillStyle = g; x.fillRect(0, 0, 8, 128);
  return canvasTexture(c, { srgb: false });
}

export async function create({ host, renderer, mobile }) {
  const urls = (host.dataset.slides || '').split('|').filter(Boolean);
  const scene = new THREE.Scene();
  scene.environment = studioEnv(renderer);
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0.6, 11);
  paperLights(scene, { size: 6 });
  const floor = shadowFloor(40, 0.1, 7);
  floor.position.y = -1.62;
  scene.add(floor);

  const loader = new THREE.TextureLoader();
  const tex = await Promise.all(urls.map((u) => new Promise((res) => loader.load(u, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; res(t); }, undefined, () => res(null)))));
  const W = 2.4, Hh = 3.0; // slides are 4:5
  const mask = roundMask(), fade = fadeMask();
  const geo = new THREE.PlaneGeometry(W, Hh);
  const back = new THREE.PlaneGeometry(W * 1.004, Hh * 1.004);
  const cards = tex.map((t, i) => {
    const g = new THREE.Group();
    // the face: unlit, so the design shows its real colours
    const face = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: t, alphaMap: mask, transparent: true, toneMapped: false }));
    face.castShadow = true;
    face.position.z = 0.012;
    // the card stock behind it: lit paper, so the edges catch the light
    const stock = new THREE.Mesh(back, new THREE.MeshPhysicalMaterial({ color: 0xf8f9fb, roughness: 0.5, clearcoat: 0.4, alphaMap: mask, transparent: true, side: THREE.DoubleSide }));
    stock.castShadow = true;
    g.add(stock, face);
    // reflection on the floor
    const refl = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: t, alphaMap: fade, transparent: true, opacity: 0.1, toneMapped: false, depthWrite: false }));
    refl.scale.y = -1;
    refl.position.y = -Hh - 0.04;
    g.add(refl);
    g.userData = { i, face, refl };
    scene.add(g);
    return g;
  });

  const aFront = new THREE.Object3D();
  scene.add(aFront);
  let idx = 0, rot = 0;
  const api = {
    scene, camera, index: 0, tone: 'neutral', exposure: 1,
    anchors: { front: aFront },
    anchorOn: () => cards.length > 0,
    update(dt, t, s) {
      const n = cards.length;
      if (!n) return;
      const want = clamp((s.progress - 0.22) / 0.56) * (n - 1);
      idx = damp(idx, want, 4.5, dt);
      api.index = Math.round(idx);
      rot = damp(rot, s.pointer.x * 0.08, 2.5, dt);
      const spread = mobile ? 0.9 : 1.25;
      for (const c of cards) {
        const d = c.userData.i - idx; // 0 = front
        const ad = Math.min(Math.abs(d), 4), sg = Math.sign(d);
        const side = clamp(ad);
        c.position.set(sg * (side * spread + Math.max(0, ad - 1) * 0.55), -0.1, -side * 1.6 - Math.max(0, ad - 1) * 0.5);
        c.rotation.y = -sg * side * 0.95 + rot;
        c.position.y = -0.1 + (1 - side) * Math.sin(t * 1.1) * 0.03;
        const vis = 1 - clamp((ad - 3) / 1);
        c.visible = vis > 0.01;
        c.userData.face.material.opacity = vis;
        c.userData.refl.material.opacity = 0.1 * vis * (1 - side * 0.5);
        c.renderOrder = 10 - Math.round(ad * 2);
      }
      aFront.position.set(W / 2 - 0.1, Hh / 2 - 0.15, 0.1);
      const narrow = s.w / s.h < 0.9;
      camera.position.set(s.pointer.x * 0.25, 0.55 - s.pointer.y * 0.12, narrow ? 15 : 10.5);
      camera.lookAt(0, -0.05, 0);
    },
    dispose() { scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); }); tex.forEach((t) => t?.dispose()); },
  };
  return api;
}
