// Mark — Graig's own mark as a physical object to close the page: a glossy blue core,
// its tilted orbit and the satellite running round it, standing on the paper.
import { THREE, C, damp, studioEnv, paperLights, shadowFloor, contactShadow } from '../kit';

export async function create({ renderer }) {
  const scene = new THREE.Scene();
  scene.environment = studioEnv(renderer);
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  camera.position.set(0, 1.1, 10);
  paperLights(scene, { size: 4 });
  const floor = shadowFloor(30, 0.13, 3.6);
  floor.position.y = -1.55;
  scene.add(floor);
  const cs = contactShadow(2.8, 0.22);
  cs.position.y = -1.54;
  scene.add(cs);

  const mark = new THREE.Group();
  scene.add(mark);
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.95, 96, 64),
    new THREE.MeshPhysicalMaterial({ color: C.blue, roughness: 0.18, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, sheen: 0.5, sheenColor: new THREE.Color(C.ice), envMapIntensity: 1.2 }),
  );
  core.castShadow = true;
  mark.add(core);
  const tilt = new THREE.Group();
  tilt.rotation.set(Math.PI / 2 - 0.42, 0, -0.42);
  mark.add(tilt);
  const R = 1.85;
  const orbit = new THREE.Mesh(
    new THREE.TorusGeometry(R, 0.035, 24, 240),
    new THREE.MeshPhysicalMaterial({ color: 0x9ccbea, metalness: 0.85, roughness: 0.22, clearcoat: 1, envMapIntensity: 1.4 }),
  );
  orbit.castShadow = true;
  tilt.add(orbit);
  const sat = new THREE.Mesh(new THREE.SphereGeometry(0.22, 48, 32), new THREE.MeshPhysicalMaterial({ color: C.blue, roughness: 0.2, clearcoat: 1 }));
  sat.castShadow = true;
  tilt.add(sat);

  let rot = 0;
  return {
    scene, camera, tone: 'neutral', exposure: 1,
    update(dt, t, s) {
      const a = t * 0.6 + 0.6;
      sat.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
      rot = damp(rot, s.pointer.x * 0.4, 2.5, dt);
      mark.rotation.y = rot + Math.sin(t * 0.3) * 0.15;
      mark.position.y = 0.05 + Math.sin(t * 0.9) * 0.05;
      camera.position.set(s.pointer.x * 0.25, 1.1 - s.pointer.y * 0.15, s.w / s.h < 0.9 ? 13 : 10);
      camera.lookAt(0, 0, 0);
    },
    dispose() { scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); }); },
  };
}
