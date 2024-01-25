import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import envCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: process.env.REACT_APP_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  }
})
