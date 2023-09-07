import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Directorio de salida para los archivos compilados
    minify: true,   // Minificar el código en producción
    sourcemap: false, // Deshabilitar los mapas de origen en producción (mejora el rendimiento)
  },
  server: {
    port: process.env.PORT || 5173
  }
})
