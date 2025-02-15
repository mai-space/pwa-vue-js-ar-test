<template>
  <div>
    <h2>Scan a QR Code</h2>
    <div id="reader"></div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from 'html5-qrcode';

export default {
  mounted() {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: { width: 250, height: 250 } });
    scanner.render((decodedText) => {
      this.$router.push(`/marker/${decodedText}`);
    });
  }
};
</script>
