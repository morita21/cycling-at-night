const roadSize = 300;

// =======================================================

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

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

window.addEventListener("keydown", (e) => {
  if (e.code === 'Space') {
    anime = !anime;
    updateIsPlayingLabel();
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
renderer2.setSize(window.innerWidth / 5, window.innerWidth / 5 * 1.6);
renderer2.shadowMap.enabled = true;
document.body.appendChild(renderer2.domElement);
renderer2.domElement.classList.add('renderer2')

function makeMan() {
  const material = new THREE.MeshPhongMaterial({color: 0x00ff00});

  const man = new THREE.Object3D();

  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material);
  head.position.set(0, 0.5, -1.5);
  head.castShadow = true;
  man.add(head);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(1, 2, 2, 8), material);
  body.position.y = -2.2;
  body.rotation.x = THREE.MathUtils.degToRad(-30);
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

  // man.rotation.x = -0.5;

  const wheelGeometry = new THREE.TorusGeometry(2, 0.4, 8, 24);
  const wheel1 = new THREE.Mesh(
    wheelGeometry,
    material
  );
  wheel1.rotation.y = THREE.MathUtils.degToRad(90);
  wheel1.position.set(0, -6, -4);
  wheel1.castShadow = true;
  man.add(wheel1);

  const wheel2 = new THREE.Mesh(
    wheelGeometry,
    material
  );
  wheel2.rotation.y = THREE.MathUtils.degToRad(90);
  wheel2.position.set(0, -6, 4);
  wheel2.castShadow = true;
  man.add(wheel2);

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
man.position.z = 50;
scene.add(man);

// =======================================================
// 地面
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, roadSize * 3),
  new THREE.MeshPhongMaterial({color: 0xaaccff})
);
floor.receiveShadow = true;
floor.position.set(0, -8, -roadSize);
floor.rotation.x = THREE.MathUtils.degToRad(-90);
scene.add(floor)

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

const sphereSize = 5;
const lightMeshMat = new THREE.MeshBasicMaterial({color: 0xcccccc});
for (let i = -1; i < 5; i++) {
  let light = new THREE.PointLight(0xff3333, 1, 200, 2);
  light.position.set(20, 20, 0 - i * 150);
  light.castShadow = true;
  scene.add(light);

  let lightMesh = new THREE.Mesh(new THREE.SphereGeometry(2), lightMeshMat);
  lightMesh.position.set(light.position.x, light.position.y, light.position.z);
  scene.add(lightMesh);

  // scene.add(new THREE.PointLightHelper(light, sphereSize));
}
// =======================================================
// カメラのポジション
const cameraOffsetZ = 10;

// 俯瞰カメラ
// camera1.position.set(-50, 20, 0); // 横から
camera1.position.set(0, 200, 0); // 上から

// カメラコントローラーを作成
const controls = new THREE.OrbitControls(camera1, document.body);
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
      man.position.z = roadSize / 2;
    }
    camera2.position.z = man.position.z + cameraOffsetZ;
  }

  renderer.render(scene, camera1);
  renderer2.render(scene, camera2);
}

animate();
