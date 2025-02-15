import { createRouter, createWebHistory } from 'vue-router';
import QRScanner from '../components/QRScanner.vue';
import ARScene from '../components/ARScene.vue';
import QRGenerator from "../components/QRGenerator.vue";

const routes = [
  { path: '/', component: QRScanner },
  { path: '/generator', component: QRGenerator },
  { path: '/marker/:id', component: ARScene }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
