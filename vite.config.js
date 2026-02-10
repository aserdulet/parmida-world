import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/parmida-world/',
  plugins: [react(),tailwindcss(),],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
