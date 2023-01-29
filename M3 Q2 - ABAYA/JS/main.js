import * as THREE from './three.module.js';
import { FontLoader } from './FontLoader.js';
import { TextGeometry } from './TextGeometry.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
let stars, starGeo;
let textMesh = new THREE.Mesh();
lighting();
firstName();
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let sprite = new THREE.TextureLoader().load("./assets/images/star.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xffb6c1,
    size: 0.7,
    map: sprite,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
    starGeo.verticesNeedUpdate = true;
    stars.position.z -= 2;
    
    if(stars.position.z < -30){
      stars.position.z = 50;
    }
  };

  //Randomize Particle Colors
  function randomColors(obj) {
    setInterval(() => {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
  
      obj.material.color.setRGB(r, g, b);
    }, 3000);
  }
  randomColors(stars);

  
//Creating Name Geometry
function firstName(){
  let fName = "Mark Raphael";
  const texture = new THREE.TextureLoader().load("./assets/textures/wooden.jpg");
  const textLoader = new FontLoader();
  textLoader.load("./assets/fonts/Woodenhead_Regular.json",function(font){
    const nameGeo = new TextGeometry(fName,{
      font: font,
      size: 2,
      height: 2
    });
    const nameMaterial = new THREE.MeshPhongMaterial({map: texture});
    
    textMesh = new THREE.Mesh(nameGeo, nameMaterial);
    nameGeo.center();
    scene.add(textMesh);
    camera.position.z = 20;
    
  });
};

function lighting() {
  const light = new THREE.HemisphereLight(0x780a44, 0x1c3020, 1);
  scene.add(light);
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 0, 15);
  spotLight.castShadow = true;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  scene.add(spotLight);
}

function animate() {
  requestAnimationFrame(animate);
  animateParticles();
  textMesh.rotation.x += 0.009;
  textMesh.rotation.y += 0.009;
  
  renderer.render(scene, camera);
}

animate();
