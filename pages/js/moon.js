import * as THREE from "three";

const scene = new THREE.Scene();
const canvasContainer = document.querySelector("#canvas-container");
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

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(5, 100, 50),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../../assets/moon.jfif"),
  })
);

scene.add(moon);

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

function animate() {
  requestAnimationFrame(animate);
  moon.rotateY(0.01);
  renderer.render(scene, camera);
}
animate();
