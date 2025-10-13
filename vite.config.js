import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.md'], // this is fine for assets
  optimizeDeps: {
    exclude: ['.md'], // ✅ single pattern instead of **/*.md
  },
  build: {
    rollupOptions: {
      external: [/\.md$/], // ensures Vite doesn’t parse markdown as JS
    },
  },
})
