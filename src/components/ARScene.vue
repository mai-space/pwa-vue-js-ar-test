<template>
  <div id="ARScene"></div>
</template>

<script>
import * as THREE from 'three';
import * as THREEx from 'ar.js';

const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const ArToolkitSource = new THREEx.ArToolkitSource({
  sourceType : 'webcam',
});

ArToolkitSource.init(()=>{
  setTimeout(() => {
    ArToolkitSource.onResizeElement();
    ArToolkitSource.copyElementSizeTo(renderer.domElement);
  }, 2000);
});

const ArToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: THREEx.ArToolkitContext.baseURL + 'assets/marker/12345/camera_para.dat',
  detectionMode: 'color_and_matrix',
});

ArToolkitContext.init(() => {
  camera.projectionMatrix.copy( ArToolkitContext.getProjectionMatrix() );
});

const ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera, {
  type : 'pattern',
  patternUrl : THREEx.ArToolkitContext.baseURL + 'assets/marker/12345/pattern-12345.patt',
  changeMatrixMode : 'cameraTransformMatrix'
});
scene.visible = false;

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshNormalMaterial( {
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide
} );
const cube = new THREE.Mesh( geometry, material );
cube.position.y = geometry.parameters.height / 2;
scene.add( cube );

function animate() {
  requestAnimationFrame( animate );
  ArToolkitContext.update( ArToolkitSource.domElement );
	renderer.render( scene, camera );
}
</script>
