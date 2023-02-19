import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

const roadSize = 300;
const roadTileNum = 5;
const manInitZ = 0;

// =======================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
// Fogを使うと遠くのライトが薄くなってしまう
// scene.fog = new THREE.FogExp2( 0x000000, 0.0025 );

const camera1 = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const camera2 = new THREE.PerspectiveCamera(
  75,
  10 / 16,
  0.1,
  1000
);

let anime = true;
updateIsPlayingLabel()

let renderer2Size = 0.2;

window.addEventListener("keydown", (e) => {
  if (e.code === 'Space') {
    anime = !anime;
    updateIsPlayingLabel();
  }

  if (e.code === 'ArrowUp') {
    renderer2Size = 1 - renderer2Size;
    renderer2.setSize(window.innerWidth * renderer2Size, window.innerWidth * renderer2Size * 1.6);
  }
});

function updateIsPlayingLabel() {
  document.getElementById('isPlaying').innerText = anime ? 'now playing' : 'paused';
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const renderer2 = new THREE.WebGLRenderer();
renderer2.setSize(window.innerWidth * renderer2Size, window.innerWidth * renderer2Size * 1.6);
renderer2.shadowMap.enabled = true;
document.body.appendChild(renderer2.domElement);
renderer2.domElement.classList.add('renderer2')

renderer2.domElement.addEventListener("click", (e) => {
  renderer2Size = renderer2Size == 1 ? 0.2 : 1;
  if (renderer2Size == 1) {
    renderer2.domElement.classList.add('full')
    renderer2.setSize(window.innerWidth, window.innerHeight);
  } else {
    renderer2.domElement.classList.remove('full')
    renderer2.setSize(window.innerWidth * renderer2Size, window.innerWidth * renderer2Size * 1.6);
  }
});

document.getElementById('isPlaying').addEventListener("click", (e) => {
  anime = !anime;
  updateIsPlayingLabel();
});

function makeMan() {
  const material = new THREE.MeshPhongMaterial({color: 0xff9a62});
  const material2 = new THREE.MeshPhongMaterial({color: 0x3739c7});
  const material3 = new THREE.MeshPhongMaterial({color: 0x333333});

  const man = new THREE.Object3D();

  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material);
  head.position.set(0, 0.5, -1.5);
  head.castShadow = true;
  man.add(head);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(1, 2, 2, 8), material);
  body.position.y = -2.2;
  body.rotation.x = THREE.MathUtils.degToRad(-30);
  body.scale.z = 0.7
  body.castShadow = true;
  man.add(body);

  const arm1 = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.4, 3, 2, 8),
    material
  );
  arm1.position.set(-1.5, -1.5, -1.8);
  arm1.rotation.set(1, 0, -0.3);
  arm1.castShadow = true;
  man.add(arm1);

  const arm2 = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.4, 3, 2, 8),
    material
  );
  arm2.position.set(1.5, -1.5, -1.8);
  arm2.rotation.set(1, 0, 0.3);
  arm2.castShadow = true;
  man.add(arm2);

  const wheelGeometry = new THREE.TorusGeometry(2, 0.2, 8, 24);
  const wheel1 = new THREE.Mesh(
    wheelGeometry,
    material3
  );
  wheel1.rotation.y = THREE.MathUtils.degToRad(90);
  wheel1.position.set(0, -6, -4);
  wheel1.castShadow = true;
  man.add(wheel1);

  const wheel2 = new THREE.Mesh(
    wheelGeometry,
    material3
  );
  wheel2.rotation.y = THREE.MathUtils.degToRad(90);
  wheel2.position.set(0, -6, 3);
  wheel2.castShadow = true;
  man.add(wheel2);

  let fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.2, 8), material2);
  fork.position.set(0.5, -4.7, -3.5);
  fork.rotation.x = THREE.MathUtils.degToRad(20);
  fork.castShadow = true;
  man.add(fork);
  fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.2, 8), material2);
  fork.position.set(-0.5, -4.7, -3.5);
  fork.rotation.x = THREE.MathUtils.degToRad(20);
  fork.castShadow = true;
  man.add(fork);
  fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), material2);
  fork.position.set(0, -4.5, -1.5);
  fork.rotation.x = THREE.MathUtils.degToRad(-40);
  fork.castShadow = true;
  man.add(fork);
  fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3, 8), material2);
  fork.position.set(0, -3.6, -1);
  fork.rotation.x = THREE.MathUtils.degToRad(-75);
  fork.castShadow = true;
  man.add(fork);
  fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.5, 8), material2);
  fork.position.set(0, -5, 1.8);
  fork.rotation.x = THREE.MathUtils.degToRad(-55);
  fork.castShadow = true;
  man.add(fork);
  fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), material2);
  fork.position.set(0, -4.2, 0.2);
  fork.rotation.x = THREE.MathUtils.degToRad(10);
  fork.castShadow = true;
  man.add(fork);
  fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 3.5, 8), material2);
  fork.position.set(0, -6.1, 1.5);
  fork.rotation.x = THREE.MathUtils.degToRad(90);
  fork.castShadow = true;
  man.add(fork);

  fork = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 8), material2);
  fork.position.set(0, -2.5, -2.9);
  fork.rotation.z = THREE.MathUtils.degToRad(90);
  fork.castShadow = true;
  man.add(fork);

  return man
}

// function makeLight() {
//   const light = new THREE.SpotLight(0xffffff, 0.5);
//   light.castShadow = true;
//   light.position.set(-10, 20, 50);
//   light.target.position.set(-1, 0, 0);
//
//   return light;
// }

const man = makeMan();
man.position.z = manInitZ;
scene.add(man);

// =======================================================
// 原点
// 赤X 緑Y 青Z
// scene.add(new THREE.AxesHelper(5));

// =======================================================
// 地面
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, roadSize * roadTileNum),
  new THREE.MeshPhongMaterial({color: 0x4a588c})
);
// 長さの半分ずらして、端を原点にする
floor.geometry.translate( 0, roadSize * roadTileNum / 2, 0 );

floor.receiveShadow = true;
floor.position.set(0, -8, 0);
floor.rotation.x = THREE.MathUtils.degToRad(-90);
scene.add(floor)

// const box = new THREE.BoxHelper( floor, 0xffff00 );
// scene.add( box );
// const floorAixsHelper = new THREE.AxesHelper(5);
// floor.add(floorAixsHelper);

// =======================================================
// ライト
// const light = makeLight();
// scene.add(light);
// scene.add(light.target);
// scene.add(new THREE.SpotLightHelper(light));

// const light2 = makeLight();
// light2.position.x = -25;
// light2.position.z = -100;
// light2.target.position.set(-100,0,0)
// scene.add(light2);
// scene.add(light2.target);x

// const lightHelper = new THREE.SpotLightHelper(light2);
// scene.add(lightHelper);

// ライト列の生成と配置
const sphereSize = 5;
const lightMeshMat = new THREE.MeshBasicMaterial({color: 0xcccccc});
for (let i = 0; i <= 7; i++) {
  let light = new THREE.PointLight(0xfbffbc, 1, 200, 2);
  light.position.set(20, 20, 0 - i * (roadSize / 2));
  light.castShadow = true;
  scene.add(light);

  let lightMesh = new THREE.Mesh(new THREE.SphereGeometry(2), lightMeshMat);
  lightMesh.position.set(light.position.x, light.position.y, light.position.z);
  scene.add(lightMesh);

  // scene.add(new THREE.PointLightHelper(light, sphereSize));
}

// scene.add( new THREE.AmbientLight( 0x222222 ) );

// =======================================================
// カメラのポジション
const cameraOffsetZ = 10;

// 俯瞰カメラ
// camera1.position.set(-20, 0, 0); // 横から
camera1.position.set(0, 200, 0); // 上から
// camera2.rotation.x = THREE.MathUtils.degToRad(-90);

// カメラコントローラーを作成
const controls = new OrbitControls(camera1, document.body);
// 滑らかにカメラコントローラーを制御する
// controls.enableDamping = true;
// controls.dampingFactor = 0.2;

// 背後カメラ
camera2.position.set(1, 5, cameraOffsetZ); // 背後
camera2.rotation.set(-0.2, 0, 0)


function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  // lightHelper.update();

  if (anime) {
    camera2.position.z += -0.1;
    man.position.z += -1;
    if (man.position.z < -roadSize / 2) {
      man.position.z = manInitZ;
    }
    camera2.position.z = man.position.z + cameraOffsetZ;
  }

  renderer.render(scene, camera1);
  renderer2.render(scene, camera2);
}

animate();
