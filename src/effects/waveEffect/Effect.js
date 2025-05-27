
import createWaveAssets from '../../utils/init.js';
import fragmentShader from './FragementShader.glsl.js';
import vertexShader from './Vertexshader.glsl.js';
import gsap from 'gsap';
import *as THREE from 'three';

const CherryWave = ({ container, image, speed = 0.05, strength = 0.02, hover = false,light,p=0.0 }) => {
  if (!image) {
    console.log("No image provided");
    return;
  }

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(image.src, (texture) => {
    const uniforms = {
      uImage: { value: texture },
      uTime: { value: 0.0 },
      uStrength: { value: hover ? 0 : strength },
      uLight:{value:light}
       
    };
   
    

    const waveassets = createWaveAssets(container.clientWidth, container.clientHeight);

    // Set camera to frame a 2x2 unit square
    waveassets.camera.fov = 2 * Math.atan(container.clientHeight / 2 / 600) * (180 / Math.PI);
    waveassets.camera.position.z = 2.8 -p;

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
        transparent: true
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

    
    if (hover) {

      container.addEventListener('mouseenter', () => {
        gsap.to(uniforms.uStrength, {
          value: strength,
          duration: 0.5,
          ease: 'power2.out'
        });
      
      });

      container.addEventListener('mouseleave', () => {
        gsap.to(uniforms.uStrength, {
          value: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
         
      });
    }

    container.innerHTML = '';
    container.appendChild(waveassets.renderer.domElement);

    window.addEventListener('resize', onResize);
    onResize();

    function animate() {
      uniforms.uTime.value += speed;
      waveassets.renderer.render(waveassets.Scene, waveassets.camera);
      requestAnimationFrame(animate);
    }
   
    animate();

    return {
      mesh: waveassets.mesh,
      geometry: waveassets.geometry,
      renderer: waveassets.renderer,
      Scene: waveassets.Scene
    };
  });
};

export default CherryWave;
