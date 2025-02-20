<template>
  <div id="ARScene"></div>
</template>

<script>
import * as THREE from 'three';
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

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = geometry.parameters.height / 2;
    scene.add(cube);

    function animate() {
      requestAnimationFrame(animate);
      arToolkitContext.update(arToolkitSource.domElement);
      renderer.render(scene, camera);
    }
  }
};
</script>
