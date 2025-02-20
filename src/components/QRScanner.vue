<template>
  <div id="scanner-container">
    <h2>Scan a QR Code</h2>
    <div id="reader"></div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from 'html5-qrcode';

export default {
  mounted() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const qrBoxSize = Math.min(viewportWidth, viewportHeight) * 0.8; // 80% of screen size

    const scanner = new Html5QrcodeScanner('reader', {
      fps: 10,
      qrbox: { width: qrBoxSize, height: qrBoxSize }, // Adjust to screen
      aspectRatio: 1.0,
    });

    scanner.render((decodedText) => {
      this.$router.push(`/marker/${decodedText}`);
    });
  }
};
</script>

<style scoped>
#scanner-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#reader {
  width: 100%;
  height: 100%;
  max-width: 600px; /* Prevent it from being too large on big screens */
  max-height: 600px;
}
</style>
