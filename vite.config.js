import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Final config — works with markdown imports & Netlify
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.md"],

  define: {
    // Fix "Buffer is not defined" in browser for gray-matter
    'process.env': {},
    'global': 'globalThis',
  },

  optimizeDeps: {
    include: ["gray-matter"],
  },

  build: {
    outDir: "dist", // ✅ Ensure correct Netlify publish directory
  },
});

