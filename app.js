const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function makeMan()
{
  const material = new THREE.MeshNormalMaterial({ color: 0x00ff00 });

  const man = new THREE.Object3D();
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material);
  sphere.position.set(0, 0.5, -0.5);
  man.add(sphere);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(1, 2, 2, 8), material);
  body.position.y = -2.5;
  man.add(body);

  const arm1 = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.4, 3, 2, 8),
    material
  );
  arm1.position.set(-1.5, -1.5, -1.8);
  arm1.rotation.set(1, 0, -0.3);
  man.add(arm1);

  const arm2 = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.4, 3, 2, 8),
    material
  );
  arm2.position.set(1.5, -1.5, -1.8);
  arm2.rotation.set(1, 0, 0.3);
  man.add(arm2);

  man.rotation.x = -0.5;

  return man
}

const man = makeMan();
scene.add(man);

const light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);

camera.position.z = 15;

// カメラコントローラーを作成
const controls = new THREE.OrbitControls(camera, document.body);
// 滑らかにカメラコントローラーを制御する
// controls.enableDamping = true;
// controls.dampingFactor = 0.2;

function animate() {
  requestAnimationFrame(animate);
  // controls.update();

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.05;

  renderer.render(scene, camera);
}

animate();
