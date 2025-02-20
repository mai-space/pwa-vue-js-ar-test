<template>
  <div id="ARScene"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ArToolkitSource, ArToolkitContext, ArMarkerControls } from '@ar-js-org/ar.js/three.js/build/ar-threex.js';
import { Howl } from 'howler';

export default {
  data() {
    return {
      latitude: null,
      longitude: null,
      sound: null,
      markerDetected: false,
      soundPlayed: false, // ✅ New flag to ensure the sound plays only once
    };
  },
  mounted() {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const arToolkitSource = new ArToolkitSource({
      sourceType: 'webcam',
    });

    arToolkitSource.init(() => {
      setTimeout(() => {
        arToolkitSource.onResizeElement();
        arToolkitSource.copyElementSizeTo(renderer.domElement);
      }, 2000);
    });

    const arToolkitContext = new ArToolkitContext({
      cameraParametersUrl: '/pwa-vue-js-ar-test/assets/marker/12345/camera_para.dat',
      detectionMode: 'color_and_matrix',
    });

    arToolkitContext.init(() => {
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    const markerControls = new ArMarkerControls(arToolkitContext, camera, {
      type: 'pattern',
      patternUrl: '/pwa-vue-js-ar-test/assets/marker/12345/pattern-12345.patt',
      changeMatrixMode: 'cameraTransformMatrix',
    });

    // 🎵 Load Howler sound
    this.sound = new Howl({
      src: ['/pwa-vue-js-ar-test/assets/marker/12345/audio.mp3'],
      volume: 1,
    });

    // 🎵 Function to play sound only once
    this.onMarkerDetected = () => {
      if (!this.soundPlayed) {
        this.soundPlayed = true; // ✅ Prevent future plays
        this.sound.play();
      }
    };

    // Load the .glb model
    const loader = new GLTFLoader();
    loader.load(
      '/pwa-vue-js-ar-test/assets/marker/12345/model.glb',
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(14, 14, 14);
        model.position.set(0, 0, 0);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB model:', error);
      }
    );

    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // 🎥 Animation loop
    let animate = () => {
      requestAnimationFrame(animate);
      arToolkitContext.update(arToolkitSource.domElement);
      renderer.render(scene, camera);

      if (markerControls.object3d.visible) {
        this.onMarkerDetected();
      }
    };

    // Ensure correct `this` context
    animate = animate.bind(this);

    // Start animation
    renderer.setAnimationLoop(animate);
  }
};
</script>
