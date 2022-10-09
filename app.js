const scene = new THREE.Scene();
scene.background = new THREE.Color("gray");

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

function makeMan()
{
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

  const man = new THREE.Object3D();
  const head = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material);
  head.position.set(0, 0.5, -0.5);
  head.castShadow = true;
  man.add(head);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(1, 2, 2, 8), material);
  body.position.y = -2.5;
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

  man.rotation.x = -0.5;

  return man
}

const man = makeMan();
man.position.z = 50;
scene.add(man);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(50, 200),
  new THREE.MeshPhongMaterial({ color: 0xaaccff })
);
floor.receiveShadow = true;
floor.position.set(0, -8, 0);
floor.rotation.x = THREE.MathUtils.degToRad(-90);
scene.add(floor)

// =======================================================
// ライト
const light = new THREE.SpotLight(0xffffff, 0.5);
light.castShadow = true;
light.position.set(-10, 20, 50);
light.target.position.set(-1, 0, 0);
scene.add(light);
scene.add(light.target);
const helper = new THREE.SpotLightHelper(light);
scene.add(helper);
// =======================================================

// camera.position.z = 15;
camera.position.set(-50, 20, 0);
camera.position.set(0, 80, 0);
// camera.rotation.set(2, 1, 1)

// カメラコントローラーを作成
const controls = new THREE.OrbitControls(camera, document.body);
// 滑らかにカメラコントローラーを制御する
// controls.enableDamping = true;
// controls.dampingFactor = 0.2;

function animate() {
  requestAnimationFrame(animate);
  // controls.update();

  // camera.position.z += -0.1;
  man.position.z += -0.5;
  if (man.position.z < -50) {
    man.position.z = 50;
  }
  camera.position.z = man.position.z - 25;

  renderer.render(scene, camera);
}

animate();
