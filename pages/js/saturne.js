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

const saturne = new THREE.Mesh(
  new THREE.SphereGeometry(5, 100, 50),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../../assets/saturne.jfif"),
  })
);

scene.add(saturne);

const geometry1 = new THREE.RingGeometry(8.9, 8, 60);
const material1 = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("../assets/saturnering.jfif"),
  side: THREE.DoubleSide,
});
const ring1 = new THREE.Mesh(geometry1, material1);
ring1.rotateX(20);
ring1.rotateY(-100);
//
ring1.translateZ(2);
scene.add(ring1);

const geometry2 = new THREE.RingGeometry(7.8, 6.8, 60);
const material2 = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("../assets/saturnering.jfif"),
  side: THREE.DoubleSide,
});
const ring2 = new THREE.Mesh(geometry2, material2);
ring2.rotateX(20);

ring2.rotateY(-100);
ring2.translateZ(2);

scene.add(ring2);

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
  saturne.rotateY(-0.01);
  ring1.rotateZ(0.001);
  ring2.rotateZ(0.005);
  renderer.render(scene, camera);
}
animate();
