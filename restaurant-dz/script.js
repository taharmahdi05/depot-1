const threeContainer = document.getElementById('three-container');

function initThreeJS() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 20;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  threeContainer.appendChild(renderer.domElement);

  // Ground plane
  const planeGeometry = new THREE.PlaneGeometry(50, 50);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -0.5;
  scene.add(plane);

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
  scene.add(ambientLight);

  // Directional light
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(10, 15, 10);
  scene.add(dirLight);

  // Point light for glow
  const pointLight = new THREE.PointLight(0xff6b6b, 0.5, 30);
  pointLight.position.set(0, 5, 0);
  scene.add(pointLight);

  // Create multiple food-related objects
  const objects = [];

  // Donut/ring shape
  const donutGeometry = new THREE.TorusGeometry(1.5, 0.4, 16, 32);
  const donutMaterial = new THREE.MeshStandardMaterial({ color: 0xd32f2f });
  const donut = new THREE.Mesh(donutGeometry, donutMaterial);
  donut.position.x = -8;
  donut.rotation.y = Math.PI / 4;
  scene.add(donut);
  objects.push(donut);

  // Spice jar / cone shape
  const coneGeometry = new THREE.ConeGeometry(1, 3, 32);
  const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xe91e63 });
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.position.x = 0;
  cone.position.y = 1.5;
  cone.rotation.z = Math.PI / 4;
  scene.add(cone);
  objects.push(cone);

  // Cube with animation
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xff9800 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = 8;
  cube.position.y = 1;
  scene.add(cube);
  objects.push(cube);

  // Spherical meatballs
  const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x4caf50 });
  const spheres = [];
  for (let i = 0; i < 5; i++) {
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 15
    );
    sphere.position.y += 2;
    scene.add(sphere);
    spheres.push(sphere);
    objects.push(sphere);
  }

  // Particle system for atmosphere - 500 particles
  const particleCount = 500;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSpeeds = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 50;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50 + 10;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    particleSpeeds[i] = Math.random() * 0.5 + 0.1;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xff69b4,
    size: 0.15,
    transparent: true,
    opacity: 0.7
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // Pulsed light
  const pulseLight = new THREE.PointLight(0xff69b4, 0.3, 20);
  pulseLight.position.set(0, 3, 0);
  scene.add(pulseLight);

  // Mouse interaction
  const mouse = new THREE.Vector2();
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.016;

    // Rotate objects
    donut.rotation.y = time * 0.5;
    donut.rotation.x = time * 0.2;
    cone.rotation.y = time * 0.3;
    cube.rotation.x = time * 0.4;
    cube.rotation.y = time * 0.3;

    // Spherical motion
    spheres.forEach((sphere, i) => {
      sphere.rotation.y = time * (0.5 + i * 0.2);
      sphere.position.y = 2 + Math.sin(time * 2 + i) * 2;
    });

    // Pulse light
    pulseLight.intensity = 0.3 + Math.sin(time * 3) * 0.2;

    // Particle floating animation
    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += particleSpeeds[i] * 0.05;
      if (positions[i * 3 + 1] > 35) {
        positions[i * 3 + 1] = -15;
      }
    }
    particleGeometry.attributes.position.needsUpdate = true;
    particles.rotation.y = time * 0.05;

    // Camera follows mouse slightly
    camera.position.x += (mouse.x * 3 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();

  // Resize handling
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}

document.addEventListener('DOMContentLoaded', initThreeJS);