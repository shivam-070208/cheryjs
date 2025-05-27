import createWaveAssets from "../../utils/init.js";
import fragmentShader from "./FragementShader.glsl.js";
import vertexShader from "./VertexShader.glsl.js";
import gsap from "gsap";
import *as THREE from 'three';

export function ImageTransition1(
  container,
  { speed = 0.02, strength = 0.02, radius = 0.02, hover = false,noise=0.4,p=0.0 } = {}
) {
  let image = Array.from(container.querySelectorAll("img"));
  if (!image.length) {
    console.log("No image provided");
    return;
  }
  const uniforms = {
    uImage: { value: null },
    uImage2: { value: null },
    uTime: { value: 0.0 },
    uStrength: { value: hover ? 0 : strength },
    uNoise:{value:noise},
    uMouse: { value: new THREE.Vector2(-10, -10) },
    uRadius: { value: radius },
  };
  const textureLoader = new THREE.TextureLoader();

  let textures = [];
  let index;
  image.map((img, i) => {
    textureLoader.load(img.src, (texture) => {
      index = 0;
      if (i == 1) uniforms.uImage2.value = texture;
      if (i == 0) uniforms.uImage.value = texture;
      textures.push(texture);
    });
  });

  const waveassets = createWaveAssets(
    container.clientWidth,
    container.clientHeight
  );

  // Set camera to frame a 2x2 unit square
  waveassets.camera.fov =
    2 * Math.atan(container.clientHeight / 2 / 600) * (180 / Math.PI);
  waveassets.camera.position.z = 2.8 +p;

  let mesh;

  function createMesh() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const aspect = width / height;
    const worldHeight = 2.3;
    const worldWidth = worldHeight * aspect;

    const geometry = new THREE.PlaneGeometry(worldWidth, worldHeight, 100, 100);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
    });

    return new THREE.Mesh(geometry, material);
  }

  function addMesh() {
    if (mesh) {
      waveassets.Scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }

    mesh = createMesh();
    waveassets.mesh = mesh;
    waveassets.Scene.add(mesh);
  }

  function onResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    waveassets.renderer.setSize(width, height);
    waveassets.renderer.setPixelRatio(window.devicePixelRatio);

    waveassets.camera.aspect = width / height;
    waveassets.camera.updateProjectionMatrix();

    addMesh();
  }

  function onMouseMove(event) {
    const bounds = container.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = -((event.clientY - bounds.top) / bounds.height) + 0.5;

    gsap.to(uniforms.uMouse.value, {
      x: x,
      y: y,
      duration: 0.2,
    });
  }

  container.addEventListener("mousemove", onMouseMove);
  if (hover) {
    container.addEventListener("mouseenter", () => {
      gsap.to(uniforms.uStrength, {
        value: strength,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(uniforms.uRadius, {
        value: radius,
        duration: 0.2,
      });
    });

    container.addEventListener("mouseleave", () => {
      gsap.to(uniforms.uStrength, {
        value: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(uniforms.uRadius, {
        value: -100,
        duration: 0.6,
      });
    });
  }

  container.innerHTML = "";
  container.appendChild(waveassets.renderer.domElement);

  window.addEventListener("resize", onResize);
  onResize();

  function animate() {
    uniforms.uTime.value += speed;
    waveassets.renderer.render(waveassets.Scene, waveassets.camera);
    requestAnimationFrame(animate);
  }

  animate();
  // let isTransitioning = false; // Removed unused variable

  container.addEventListener("click", () => {
    const nextIndex = (index + 1) % textures.length;
    const nextNextIndex = (index + 2) % textures.length;

    gsap.to(uniforms.uRadius, {
      value: 2,
      duration: 2,
      ease: "power2.inOut",

      onComplete: () => {
        uniforms.uImage.value = textures[nextIndex];
        uniforms.uImage2.value = textures[nextNextIndex];
        gsap.fromTo(
          uniforms.uRadius,
          { value: 0.0 },
          {
            value: radius,
            duration: 2,
            ease: "power2.inOut",
          }
        );
        index = nextIndex;
      },
    });
  });

  return {
    mesh: waveassets.mesh,
    geometry: waveassets.geometry,
    renderer: waveassets.renderer,
    Scene: waveassets.Scene,
    currntimageIndex: index,
  };
}
