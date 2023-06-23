import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({ 
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
    manifest: {
      "name": "Assistant",
      "short_name": "Assistant",
      "icons": [
          {
              "src": "/android-chrome-192x192.png",
              "sizes": "192x192",
              "type": "image/png"
          },
          {
              "src": "/android-chrome-512x512.png",
              "sizes": "512x512",
              "type": "image/png"
          }
      ],
      "theme_color": "#fefcfa",
      "background_color": "#fefcfa",
      "display": "standalone",
      "orientation": "portrait",
      description: 'Assistant',
    }
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
