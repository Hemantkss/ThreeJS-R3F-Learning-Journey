import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI({
  width: 300,
  title: "Debug GUI",
});
gui.hide();
// Toggle GUI visibility with 'h' key
window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    if (gui._hidden) {
      gui.show();
    } else {
      gui.hide();
    }
  }
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// fog control
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

// texture control
// const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//   console.log("loading started");
// };

// loadingManager.onProgress = () => {
//   console.log("loading in progress");
// };

// loadingManager.onLoad = () => {
//   console.log("loading completed");
// };

// loadingManager.onError = (error) => {
//   console.error("loading error", error);
// };

// const textureLoader = new THREE.TextureLoader(loadingManager);
const textureLoader = new THREE.TextureLoader();

// Materials for doors
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// Materials for bricks
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

// Materials for grass
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

// grassTexture repeat texture
grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
doorRoughnessTexture.repeat.set(8, 8);

// texture repeat texture
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
doorRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
doorRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.25; // 2.5 / 2 = 1.25
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.5 + 0.5; // walls.height / 2 + roof.height / 2
roof.rotation.y = Math.PI * 0.25; // 45 degrees
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    // wireframe: true,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2 + 0.0001; // walls.depth / 2 + door.depth / 2
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
// const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });
const graveMaterial = new THREE.MeshStandardMaterial({
  map: bricksColorTexture,
  normalMap: bricksNormalTexture,
  roughnessMap: bricksRoughnessTexture,
});

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2; // random angle
  const radius = 3 + Math.random() * 6; // random radius
  const x = Math.sin(angle) * radius; // get x position using sinine
  const z = Math.cos(angle) * radius; // get z position using cosine

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.3, z); // set position
  grave.rotation.y = (Math.random() - 0.5) * 0.4; // random rotation
  grave.rotation.z = (Math.random() - 0.5) * 0.4; // random rotation
  grave.castShadow = true; // shadow effect

  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.15);
gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("ambientLight");
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.15);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001).name("moonLight");
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001).name("moonLightX");
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001).name("moonLightY");
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001).name("moonLightZ");
scene.add(moonLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 1.5, 7);
doorLight.position.set(0, 2.2, 2.7); // above the door
house.add(doorLight);
doorLight.castShadow = true; // shadow effect

// Ghosts light
const ghostsLight1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghostsLight1);

const ghostsLight2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghostsLight2);

const ghostsLight3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghostsLight3);

// Particle Geometry
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 500;
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3); // To store velocity for movement
const lifetimes = new Float32Array(particleCount); // To control fade effect

// Initialize positions, velocities, and lifetimes
for (let i = 0; i < 500; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10; // X position
  positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y position
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z position

  velocities[i * 3] = (Math.random() - 0.5) * 0.02; // X velocity
  velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02; // Y velocity
  velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02; // Z velocity

  lifetimes[i] = Math.random() * 5; // Random lifetime for each particle
}

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particleGeometry.setAttribute(
  "velocity",
  new THREE.BufferAttribute(velocities, 3)
);
particleGeometry.setAttribute(
  "lifetime",
  new THREE.BufferAttribute(lifetimes, 1)
);

// Particle Material
const particleMaterial = new THREE.PointsMaterial({
  color: "#ff88cc",
  size: 0.1,
  transparent: true,
  opacity: 0.8,
});

// Create Particle System
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Animate Particles
function animateParticles() {
  const positions = particleGeometry.attributes.position.array;
  const velocities = particleGeometry.attributes.velocity.array;
  const lifetimes = particleGeometry.attributes.lifetime.array;

  for (let i = 0; i < particleCount; i++) {
    // Update positions
    positions[i * 3] += velocities[i * 3];
    positions[i * 3 + 1] += velocities[i * 3 + 1];
    positions[i * 3 + 2] += velocities[i * 3 + 2];

    // Reduce lifetime and reset particle if it fades out
    lifetimes[i] -= 0.02;
    if (lifetimes[i] <= 0) {
      positions[i * 3] = (Math.random() - 0.5) * 10; // Reset X position
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Reset Y position
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Reset Z position

      lifetimes[i] = Math.random() * 5; // Reset lifetime
    }
  }

  // Update geometry attributes
  particleGeometry.attributes.position.needsUpdate = true;
  particleGeometry.attributes.lifetime.needsUpdate = true;

  // Adjust material opacity based on lifetime
  particleMaterial.opacity = Math.max(0.1, Math.random()); // Vary opacity
}

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

// shadow map
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true; // shadow effect
doorLight.castShadow = true; // shadow effect
ghostsLight1.castShadow = true; // shadow effect
ghostsLight2.castShadow = true; // shadow effect
ghostsLight3.castShadow = true; // shadow effect

walls.castShadow = true; // shadow effect
bush1.castShadow = true; // shadow effect
bush2.castShadow = true; // shadow effect
bush3.castShadow = true; // shadow effect
bush4.castShadow = true; // shadow effect

floor.receiveShadow = true; // shadow

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghostsLight1.shadow.mapSize.width = 256;
ghostsLight1.shadow.mapSize.height = 256;
ghostsLight1.shadow.camera.far = 7;

ghostsLight2.shadow.mapSize.width = 256;
ghostsLight2.shadow.mapSize.height = 256;
ghostsLight2.shadow.camera.far = 7;

ghostsLight3.shadow.mapSize.width = 256;
ghostsLight3.shadow.mapSize.height = 256;
ghostsLight3.shadow.camera.far = 7;

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  //  Ghost animation
  //   ghost1.animate
  const ghost1Angle = elapsedTime * 0.5;
  ghostsLight1.position.x = Math.cos(ghost1Angle) * 4;
  ghostsLight1.position.z = Math.sin(ghost1Angle) * 4;
  ghostsLight1.position.y = Math.sin(elapsedTime * 3);

  //   ghost2.animate
  const ghost2Angle = -elapsedTime * 0.32;
  ghostsLight2.position.x = Math.cos(ghost2Angle) * 6;
  ghostsLight2.position.z = Math.sin(ghost2Angle) * 6;
  ghostsLight2.position.y = Math.sin(
    elapsedTime * 4 + Math.sin(elapsedTime * 2.5)
  );

  //   ghost3.animate
  const ghost3Angle = elapsedTime * 0.18;
  ghostsLight3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghostsLight3.position.z =
    Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghostsLight3.position.y =
    Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2);

  // Particle animation
  animateParticles(); // Update particles

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
