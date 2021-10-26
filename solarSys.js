import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.querySelector("canvas"),
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

var gridXZ = new THREE.GridHelper(1000, 100, 1000);

scene.add(gridXZ);
// the sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(30, 64, 64),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../assets/sunUV.jfif"),
  })
);
scene.add(sun);

//mercury
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(5, 64, 64),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../assets/mercury.jpg"),
  })
);
mercury.position.setX(80);
scene.add(mercury);

// venus
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(9, 64, 64),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../assets/venus.jfif"),
  })
);
venus.position.setX(118);
scene.add(venus);

// earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 50, 50),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../assets/globe.jpg"),
  })
);
earth.position.setX(175);
scene.add(earth);

// mars
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(6.5, 50, 50),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../assets/mars.jfif"),
  })
);
mars.position.setX(230);
scene.add(mars);

// jupiter
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(15, 50, 50),
  new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load("../assets/jupiter.jfif"),
  })
);
jupiter.position.setX(280);
scene.add(jupiter);

camera.position.set(0, 55, 140);

const controls = new OrbitControls(camera, document.querySelector("canvas"));
function animate() {
  requestAnimationFrame(animate);
  earth.rotateY(0.01);
  controls.update();
  renderer.render(scene, camera);
}
animate();
