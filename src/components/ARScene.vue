<template>
  <a-scene embedded arjs>
    <a-assets>
      <a-asset-item id="model" src="/assets/marker/12345/model.glb"></a-asset-item>
    </a-assets>

    <a-marker preset="custom" type="pattern" url="/assets/marker/12345/marker.patt">
      <a-entity gltf-model="#model" scale="0.5 0.5 0.5"></a-entity>
    </a-marker>

    <a-camera></a-camera>
  </a-scene>
</template>

<script>
import 'aframe';
import 'aframe-ar';

export default {
  mounted() {
    console.log('ARScene mounted, AFRAME:', window.AFRAME);
  },
};
</script>
