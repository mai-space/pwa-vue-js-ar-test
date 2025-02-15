import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,mp3,glb}']
      },
      manifest: {
        name: 'Park Explorer AR',
        short_name: 'Park AR',
        start_url: '/',
        display: 'standalone',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
      }
    })
  ],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
    }
  }
});
