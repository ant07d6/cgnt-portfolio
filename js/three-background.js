/* =========================================================
THREE BACKGROUND SYSTEM
Adaptive • Responsive • Optimized
Desktop = Advanced FX
Mobile/Tablet = Lightweight Particles
========================================================= */

/* =========================================================
DEVICE DETECTION
========================================================= */

const isMobile =
window.innerWidth < 1024 ||
/Android|iPhone|iPad|iPod|Tablet/i.test(navigator.userAgent);

/* =========================================================
CANVAS
========================================================= */

const canvas = document.querySelector("#bg");

/* =========================================================
COMMON SCENE
========================================================= */

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = isMobile ? 45 : 30;

/* =========================================================
RENDERER
========================================================= */

const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: !isMobile
});

/* PIXEL RATIO LIMIT */

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
);

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

/* =========================================================
RESPONSIVE CANVAS QUALITY
========================================================= */

function updateRendererQuality() {

  const width = window.innerWidth;

  if(width < 768){

    renderer.setPixelRatio(1);

  } else if(width < 1400){

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

  } else {

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

  }

}

updateRendererQuality();

/* =========================================================
MOUSE INTERACTION
========================================================= */

const mouse = {
  x: 0,
  y: 0
};

window.addEventListener("mousemove", (e) => {

  mouse.x =
  (e.clientX / window.innerWidth - 0.5) * 2;

  mouse.y =
  (e.clientY / window.innerHeight - 0.5) * 2;

});

/* =========================================================
MOBILE / TABLET VERSION
LIGHTWEIGHT PARTICLES
========================================================= */

if(isMobile){

  /* PARTICLES */

  const particleGeometry =
  new THREE.BufferGeometry();

  const particleCount = 1200;

  const positions =
  new Float32Array(particleCount * 3);

  for(let i = 0; i < particleCount * 3; i++){

    positions[i] =
    (Math.random() - 0.5) * 180;

  }

  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  const particleMaterial =
  new THREE.PointsMaterial({

    color: 0xffffff,
    size: 0.12,
    transparent: true,
    opacity: 0.6

  });

  const particles =
  new THREE.Points(
    particleGeometry,
    particleMaterial
  );

  scene.add(particles);

  /* ANIMATION */

  function animateMobile(){

    requestAnimationFrame(animateMobile);

    particles.rotation.y += 0.0007;
    particles.rotation.x += 0.0002;

    particles.rotation.y += mouse.x * 0.0008;
    particles.rotation.x += mouse.y * 0.0008;

    renderer.render(scene, camera);

  }

  animateMobile();

}

/* =========================================================
DESKTOP VERSION
ADVANCED CINEMATIC SYSTEM
========================================================= */

else{

  /* =====================================================
  LIGHT
  ===================================================== */

  const light =
  new THREE.PointLight(0xffffff, 3);

  light.position.set(200, -10, 200);
  scene.add(light);

  /* =====================================================
  GROUP
  ===================================================== */

  const rotatingGroup =
  new THREE.Group();

  scene.add(rotatingGroup);

  /* =====================================================
  STARS
  ===================================================== */

  const starsGeometry =
  new THREE.BufferGeometry();

  const starsCount = 4000;

  const starsPositions =
  new Float32Array(starsCount * 3);

  for(let i = 0; i < starsCount * 3; i++){

    starsPositions[i] =
    (Math.random() - 0.5) * 300;

  }

  starsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      starsPositions,
      3
    )
  );

  const starsMaterial =
  new THREE.PointsMaterial({

    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.7

  });

  const stars =
  new THREE.Points(
    starsGeometry,
    starsMaterial
  );

  scene.add(stars);

  /* =====================================================
  CORE OBJECT
  ===================================================== */

  const geometry =
  new THREE.IcosahedronGeometry(8, 2);

  const material =
  new THREE.MeshStandardMaterial({

    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    roughness: 1.0,
    metalness: 1

  });

  const mesh =
  new THREE.Mesh(
    geometry,
    material
  );

  rotatingGroup.add(mesh);

  /* =====================================================
  PARTICLES FROM GEOMETRY
  ===================================================== */

  const pointsGeometry =
  new THREE.BufferGeometry();

  const geoPositions =
  geometry.attributes.position.array;

  pointsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
      geoPositions,
      3
    )
  );

  const pointsMaterial =
  new THREE.PointsMaterial({

    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.9

  });

  const points =
  new THREE.Points(
    pointsGeometry,
    pointsMaterial
  );

  rotatingGroup.add(points);

  /* =====================================================
  PARALLAX
  ===================================================== */

  let targetX = 0;
  let targetY = 0;

  /* =====================================================
  ANIMATION
  ===================================================== */

  function animateDesktop(){

    requestAnimationFrame(
      animateDesktop
    );

    /* SMOOTH FOLLOW */

    targetX +=
    (mouse.x - targetX) * 0.03;

    targetY +=
    (mouse.y - targetY) * 0.03;

    rotatingGroup.rotation.y += 0.002;
    rotatingGroup.rotation.x += 0.001;

    rotatingGroup.rotation.y +=
    targetX * 0.02;

    rotatingGroup.rotation.x +=
    targetY * 0.02;

    stars.rotation.y += 0.0003;

    renderer.render(scene, camera);

  }

  animateDesktop();

}

/* =========================================================
RESIZE
========================================================= */

window.addEventListener("resize", () => {

  camera.aspect =
  window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  updateRendererQuality();

});