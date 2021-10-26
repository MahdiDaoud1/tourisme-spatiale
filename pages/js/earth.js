import gsap from "gsap";
import * as THREE from "three";
import vertexShader from "../../shaders/vertex.glsl";
import fragmentShader from "../../shaders/fragment.glsl";
import atmosphereVertex from "../../shaders/atmosphereVertex.glsl";
import atmosphereFrag from "../../shaders/atmosphereFrag.glsl";
const canvasContainer = document.querySelector("#canvas-container");
const mouse = new THREE.Vector2();
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  canvasContainer.offsetWidth / canvasContainer.offsetHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("canvas"),
});

renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//create sphere
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load("../../assets/globe.jpg"),
      },
    },
  })
);

// create shining atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertex,
    fragmentShader: atmosphereFrag,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
  })
);
atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);
//==============

const group = new THREE.Group();

// creating star geometry
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starVerticies = [];
for (let i = 0; i < 5000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 3000;
  starVerticies.push(x, y, z);
}
starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(starVerticies, 3)
);
const stars = new THREE.Points(starGeometry, starMaterial);
if (innerWidth > 661) {
  scene.add(stars);
}

camera.position.z = 15;

group.add(sphere);
scene.add(group);

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.003;

  gsap.to(group.rotation, { x: -mouse.y * 0.7, y: mouse.x * 0.7, duration: 2 });
  renderer.render(scene, camera);
}
animate();
addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
});
