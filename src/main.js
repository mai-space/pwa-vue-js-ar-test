import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importiere den Router

import './style.css';

const app = createApp(App);
app.use(router); // Nutze den Router
app.mount('#app');
