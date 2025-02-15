<template>
  <div class="arjs-loader">
    <div>Loading, please wait...</div>
  </div>

  <a-scene
    vr-mode-ui="enabled: false"
    arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
    renderer="antialias: true; alpha: true"
  >
    <a-camera gps-new-camera="gpsMinDistance: 5"></a-camera>

    <!-- GPS-placed entity -->
    <a-entity
      v-if="latitude && longitude"
      material="color: red"
      geometry="primitive: box"
      :gps-new-entity-place="`latitude: ${latitude}; longitude: ${longitude}`"
      scale="10 10 10"
    ></a-entity>
  </a-scene>
</template>

<script>
import 'aframe';
import 'aframe-ar';

export default {
  data() {
    return {
      latitude: null,
      longitude: null
    };
  },
  mounted() {
    console.log('ARScene mounted, AFRAME:', window.AFRAME);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(`User Location: ${this.latitude}, ${this.longitude}`);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }
};
</script>
