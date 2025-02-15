<template>
  <div class="qr-generator">
    <h2>QR Code Generator</h2>
    <input v-model="text" @input="generateQrCode" placeholder="Enter text" class="input" />
    <canvas ref="qrCanvas"></canvas>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    async generateQrCode() {
      if (!this.text) return;
      try {
        await QRCode.toCanvas(this.$refs.qrCanvas, this.text, { width: 200 });
      } catch (error) {
        console.error('QR Code generation failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.qr-generator {
  text-align: center;
  padding: 20px;
}
.input {
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
}
</style>
