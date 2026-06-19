import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const mount = document.getElementById('stage');
const loaderEl = document.querySelector('.stage-loader');

const INK = 0x1c1815;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
mount.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// soft studio environment for nice PBR reflections
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);

// ----- world holds everything; pivot is just the guitar -----
const world = new THREE.Group();
scene.add(world);
const pivot = new THREE.Group();
world.add(pivot);

// ----- lighting: studio key (casts the shadow) + fill + warm rim -----
// The key light (and the floor it casts onto, added later) are parented to
// `world`, so the shadow caster is anchored to a spot in the scene and orbits
// rigidly with the guitar — the shadow stays attached to it instead of tracking
// the view. Fill/rim/ambient stay fixed in `scene` for steady overall light.
const key = new THREE.DirectionalLight(0xffffff, 2.5);
key.position.set(-2.5, 8, 3.4);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.bias = -0.0004;
key.shadow.normalBias = 0.02;
const sc = key.shadow.camera;
sc.near = 0.5; sc.far = 40; sc.left = -6; sc.right = 6; sc.top = 6; sc.bottom = -6;
world.add(key);
world.add(key.target);   // target at the world origin so the caster turns with the scene

const fill = new THREE.DirectionalLight(0xf4eee8, 0.7);
fill.position.set(-6, 2, 3);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xffe6d8, 0.9);
rim.position.set(-3, 4, -6);
scene.add(rim);

scene.add(new THREE.AmbientLight(0xffffff, 0.25));

// resting pose + drop-in intro
const FACE_YAW = Math.PI - 0.6;   // face the camera, turned toward the left
const TILT_X = 0.08;     // slight forward tilt for depth
const DROP_FROM = 5;   // how far above the rest position it starts
const DROP_DUR = 0.8;   // seconds for the drop-in
let model = null;
let cabRoot = null;
let introT0 = 0;

const loader = new GLTFLoader();
loader.load('assets/guitar.glb', (gltf) => {
  model = gltf.scene;

  model.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => {
        if (!m) return;
        if (m.metalness !== undefined && m.metalness > 0.9 && m.roughness < 0.05) m.roughness = 0.18;
        m.envMapIntensity = 0.85;
      });
    }
  });

  // The guitar is modelled lying flat (thin in Y). Stand it upright so its
  // face points at the camera, then normalise.
  model.rotation.x = -Math.PI / 2;
  model.updateWorldMatrix(true, true);

  // ---- normalize: center at origin, scale to a known size ----
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const targetSize = 4;
  const s = targetSize / maxDim;
  model.scale.setScalar(s);
  model.position.sub(center.multiplyScalar(s));

  // Stand the guitar vertically (neck up). The orient group keeps the model
  // centred at the origin so the pivot owns the final pose.
  const orient = new THREE.Group();
  orient.rotation.z = Math.PI / 2;   // long axis X -> vertical
  orient.add(model);
  pivot.add(orient);

  // fixed pose: turned to face the left, with a slight forward tilt
  pivot.rotation.x = TILT_X;
  pivot.rotation.y = FACE_YAW;

  // ground plane at the guitar's base to catch the cast shadow (invisible
  // except where the shadow lands — the page shows through elsewhere).
  // Parented to `world` alongside the key light, so caster, floor and guitar
  // rotate together as one rigid diorama and the shadow stays grounded.
  pivot.position.y = 0;
  pivot.updateWorldMatrix(true, true);
  const rest = new THREE.Box3().setFromObject(orient);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.ShadowMaterial({ opacity: 0.3 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = rest.min.y - 0.02;
  ground.receiveShadow = true;
  world.add(ground);

  pivot.position.y = reduceMotion ? 0 : DROP_FROM;
  introT0 = performance.now() / 1000;

  frameCamera(targetSize);
  loaderEl && loaderEl.classList.add('hidden');
  resize();
}, undefined, (err) => {
  console.error('Model load failed', err);
  if (loaderEl) loaderEl.textContent = 'model unavailable';
});

// ----- background: the amp cabs (whole prop, already arranged in the glb) -----
const CAB_SCALE_TO = 3.2;      // target max dimension for the whole prop
const CAB_YAW = FACE_YAW;         // match the guitar's angle so the cabs sit parallel to it (add a small offset to fine-tune)
const CAB_X = 1.4;                  // centered on the guitar (which sits at x = 0, screen centre)
const CAB_Z = -2.4;            // depth behind the guitar (guitar sits at z ~ 0)
const CAB_FLOOR = -2.0;        // ground level (matches the guitar's base)

loader.load('assets/cab.glb', (gltf) => {
  const cab = gltf.scene;
  cab.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = false;     // background only — the guitar is the one shadow caster
      o.receiveShadow = false;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((m) => { if (m) m.envMapIntensity = 0.9; });
    }
  });

  // orient first so the speakers face the guitar's back, then scale to fit
  cab.rotation.y = CAB_YAW;
  cab.updateWorldMatrix(true, true);
  let b = new THREE.Box3().setFromObject(cab);
  const size = b.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  cab.scale.multiplyScalar(CAB_SCALE_TO / maxDim);

  // place behind the guitar, centred at (CAB_X, CAB_Z) and resting on the floor
  cab.updateWorldMatrix(true, true);
  b = new THREE.Box3().setFromObject(cab);
  const c = b.getCenter(new THREE.Vector3());
  cab.position.x += CAB_X - c.x;
  cab.position.z += CAB_Z - c.z;
  cab.position.y += CAB_FLOOR - b.min.y;
  world.add(cab);
  cabRoot = cab;
}, undefined, (err) => console.error('Cab model failed', err));

function frameCamera(objSize) {
  // distance so the object fits — small margin so it fills the stage.
  // slight downward tilt so the ground (and its cast shadow) reads.
  const fov = camera.fov * (Math.PI / 180);
  const dist = (objSize / 2) / Math.tan(fov / 2);
  camera.position.set(0, 0.6, dist * 1.12);
  camera.lookAt(0, 0.05, 0);
}

// ----- resize / aspect -----
function resize() {
  const w = mount.clientWidth || 1;
  const h = mount.clientHeight || 1;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// pause rendering when offscreen (perf)
let paused = false;
const io = new IntersectionObserver((entries) => { paused = !entries[0].isIntersecting; }, { threshold: 0.01 });
io.observe(mount);

// ----- drag to rotate; springs back on release -----
// drag on the guitar -> rotate just the guitar; drag on the cabs -> rotate everything
const DRAG_SENS = 0.006;     // radians per pixel dragged
const PITCH_LIMIT = 0.7;     // clamp vertical tilt
const SNAP_DECAY = 0.96;     // how fast it eases back to rest (lower = snappier)
let dragging = false, dragMode = 'guitar', lastX = 0, lastY = 0;
let userYaw = 0, userPitch = 0;     // guitar offsets (from its rest pose)
let worldYaw = 0, worldPitch = 0;   // whole-scene offsets

const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
function pickMode(e) {
  const rect = mount.getBoundingClientRect();
  ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(ndc, camera);
  const targets = [];
  if (model) targets.push(model);
  if (cabRoot) targets.push(cabRoot);
  const hits = raycaster.intersectObjects(targets, true);
  if (!hits.length) return 'guitar';                    // empty space -> guitar (as before)
  for (let o = hits[0].object; o; o = o.parent) {       // closest surface wins
    if (o === cabRoot) return 'world';
    if (o === model) return 'guitar';
  }
  return 'guitar';
}

mount.style.cursor = 'grab';
mount.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'touch') return;   // leave touch swipes for page paging
  dragMode = pickMode(e);
  dragging = true;
  lastX = e.clientX; lastY = e.clientY;
  mount.setPointerCapture(e.pointerId);
  mount.style.cursor = 'grabbing';
});
mount.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const dx = (e.clientX - lastX) * DRAG_SENS;
  const dy = (e.clientY - lastY) * DRAG_SENS;
  if (dragMode === 'world') {
    worldYaw += dx;
    worldPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, worldPitch + dy));
  } else {
    userYaw += dx;
    userPitch = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, userPitch + dy));
  }
  lastX = e.clientX; lastY = e.clientY;
});
function endDrag() {
  if (!dragging) return;
  dragging = false;
  mount.style.cursor = 'grab';
}
mount.addEventListener('pointerup', endDrag);
mount.addEventListener('pointercancel', endDrag);

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  if (paused) return;
  const t = clock.getElapsedTime();

  if (model) {
    if (reduceMotion) {
      pivot.position.y = 0;
    } else {
      // drop-in: ease down from above, then settle into a gentle float
      const p = Math.min(1, (performance.now() / 1000 - introT0) / DROP_DUR);
      const eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      const dropY = (1 - eased) * DROP_FROM;
      const floatY = p >= 1 ? Math.sin(t * 0.9) * 0.04 : 0;
      pivot.position.y = dropY + floatY;
    }

    pivot.rotation.y = FACE_YAW + userYaw;
    pivot.rotation.x = TILT_X + userPitch;
  }

  // ease drag offsets back: guitar to its rest pose, the whole scene to identity
  if (!dragging) {
    userYaw *= SNAP_DECAY; userPitch *= SNAP_DECAY;
    worldYaw *= SNAP_DECAY; worldPitch *= SNAP_DECAY;
    if (Math.abs(userYaw) < 0.0008) userYaw = 0;
    if (Math.abs(userPitch) < 0.0008) userPitch = 0;
    if (Math.abs(worldYaw) < 0.0008) worldYaw = 0;
    if (Math.abs(worldPitch) < 0.0008) worldPitch = 0;
  }
  world.rotation.y = worldYaw;
  world.rotation.x = worldPitch;

  renderer.render(scene, camera);
}
animate();
