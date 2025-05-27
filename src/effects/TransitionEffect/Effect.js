import createWaveAssets from "../../utils/init.js";
import fragmentShader from "./FragementsShader.glsl.js";
import vertexShader from "./VertexShader.glsl.js";
import gsap from "gsap";
import * as THREE from 'three';
export function ImageTransition2(container, { x = -1, y = 1,time = false,speed = 1.2,ttime =4.0,p =0.0,hover =false,target = null ,ttype = 0} = {}) {

if(!container) return console.error("No container provided");
const image = Array.from(container.querySelectorAll("img"));
if(!(image.length > 1)) return console.error("No images provided, at least two images are required for transition");

const ImageTransitionassets = createWaveAssets(
    container.clientWidth,
    container.clientHeight
  );

  const uniforms = {
    uImage: { value: null },
    uImage2: { value: null },
    uTime: { value: 0.0 },
    uStrength: { value: 0.02 },
    uMouse: { value: new THREE.Vector2(-10, -10) },
    uX:{ value: x },
    uY:{ value: y }
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
  ImageTransitionassets.camera.fov = 2 * Math.atan(container.clientHeight / 2 / 600) * (180 / Math.PI);
  ImageTransitionassets.camera.position.z = 2.7 -p;

  let mesh;

  function createMesh() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    const aspect = width / height;
    const worldHeight = 2.3;
    const worldWidth = worldHeight * aspect;

    const geometry = new THREE.PlaneGeometry(worldWidth, worldHeight, 100, 100);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms,
      transparent: true,
    });

    return new THREE.Mesh(geometry, material);
  }

  function addMesh() {
    if (mesh) {
      ImageTransitionassets.Scene.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    }

    mesh = createMesh();
    ImageTransitionassets.Scene.add(mesh);
  }

   function onResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    ImageTransitionassets.renderer.setSize(width, height);
    ImageTransitionassets.renderer.setPixelRatio(window.devicePixelRatio);

    ImageTransitionassets.camera.aspect = width / height;
    ImageTransitionassets.camera.updateProjectionMatrix();

    addMesh();
  }
  onResize();
  window.addEventListener("resize", onResize, false);
  container.innerHTML = "";
  container.appendChild(ImageTransitionassets.renderer.domElement);


   
   
  if (time)  {
    gsap.to(uniforms.uTime, {
      value: 1.0,
      duration: 3,
      repeat: -1,
      delay: ttime,
      repeatDelay: 4.0,
      onRepeat: () => {
        console.log("Transition completed");
        uniforms.uTime.value = 0.0;
        index = (index + 1) % textures.length;
        uniforms.uImage.value = textures[index];
        uniforms.uImage2.value = textures[(index + 1) % textures.length];
      }
    });
  } else if (hover) {
    let isAnimating = false;
    container.addEventListener("mouseenter", () => {
      if (isAnimating) return;
      isAnimating = true;
      gsap.to(uniforms.uTime, {
        value: 1.0,
        duration: 1.2,
        onComplete: () => {
          uniforms.uTime.value = 0.0;
          index = (index + 1) % textures.length;
          uniforms.uImage.value = textures[index];
          uniforms.uImage2.value = textures[(index + 1) % textures.length];
          isAnimating = false;
        }
      });
    });
  } else if (target && Array.isArray(target) && target.length === image.length) {
    target.forEach((el, i) => {
      let eventType;
      if(ttype) eventType = "click";
      else eventType = "mouseenter";
      el.addEventListener(eventType, () => {
        console.log(eventType);
        if (index === i) return;
        gsap.to(uniforms.uTime, {
          value: 1.0,
          duration: 1.2,
          onComplete: () => {
        uniforms.uTime.value = 0.0;
        index = i;
        uniforms.uImage.value = textures[index];
        uniforms.uImage2.value = textures[(index + 1) % textures.length];
          }
        });
      });
    });
  }
  function animate() {
  ImageTransitionassets.renderer.render(ImageTransitionassets.Scene, ImageTransitionassets.camera);
  requestAnimationFrame(animate);
}
animate();

  return {
    assets: ImageTransitionassets,
    mesh,
    updateMesh: addMesh,
  };

}