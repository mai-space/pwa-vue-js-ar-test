<template>
  <div id="ARScene"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ArToolkitSource, ArToolkitContext, ArMarkerControls } from '@ar-js-org/ar.js/three.js/build/ar-threex.js';

export default {
  data() {
    return {
      latitude: null,
      longitude: null
    };
  },
  mounted() {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
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

    const arMarkerControls = new ArMarkerControls(arToolkitContext, camera, {
      type: 'pattern',
      patternUrl: '/pwa-vue-js-ar-test/assets/marker/12345/pattern-12345.patt',
      changeMatrixMode: 'cameraTransformMatrix'
    });
    scene.visible = false;

    // Load the .glb model
    const loader = new GLTFLoader();
    loader.load('/pwa-vue-js-ar-test/assets/marker/12345/model.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5); // Adjust scale if needed
      model.position.set(0, 0, 0); // Adjust position
      scene.add(model);
    }, undefined, (error) => {
      console.error('Error loading GLB model:', error);
    });


    function animate() {
      requestAnimationFrame(animate);
      arToolkitContext.update(arToolkitSource.domElement);
      renderer.render(scene, camera);
    }
  }
};
</script>
