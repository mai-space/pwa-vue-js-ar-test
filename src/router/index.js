import { createRouter, createWebHistory } from 'vue-router';
import QRScanner from '../components/QRScanner.vue';
import ARScene from '../components/ARScene.vue';
import QRGenerator from "../components/QRGenerator.vue";

const routes = [
  { path: '/pwa-vue-js-ar-test/scan', component: QRScanner },
  { path: '/pwa-vue-js-ar-test/generator', component: QRGenerator },
  { path: '/pwa-vue-js-ar-test/marker/:id', component: ARScene }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
