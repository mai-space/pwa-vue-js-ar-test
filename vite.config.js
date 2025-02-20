import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/pwa-vue-js-ar-test/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,png,mp3,glb}'],
        runtimeCaching: [
          {
            urlPattern: /index-BFZS9czy\.js$/,
            handler: 'NetworkOnly' // Do not cache
          }
        ]
      },
      manifest: {
        name: 'Park Explorer AR',
        short_name: 'Park AR',
        start_url: '/pwa-vue-js-ar-test/',
        display: 'standalone',
        theme_color: '#4CAF50',
        background_color: '#ffffff',
      },
    }),
  ],
  build: {
    outDir: 'docs', // Change the output directory to 'docs'
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
    },
  },
  resolve: {
    alias: {
      three: 'three' // Ensure all packages use the same Three.js version
    }
  }
});
