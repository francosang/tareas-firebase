import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/tareas-firebase/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Firebase into a separate chunk
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          // Split VueFire into a separate chunk
          'vuefire-vendor': ['vuefire'],
          // Keep Vue in a separate chunk
          'vue-vendor': ['vue'],
        },
      },
    },
    // Increase the warning limit to 600kb to avoid warnings for the firebase chunk
    chunkSizeWarningLimit: 600,
  },
})
