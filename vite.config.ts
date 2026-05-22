import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  build: {
    // Bump the warning threshold modestly - the three.js chunk is still
    // ~500 KB minified by its nature, but it's now isolated and cacheable.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Split heavy / rarely-changing dependencies into their own chunks so
        // repeat visitors keep them cached even when our app code ships.
        manualChunks: {
          react: ["react", "react-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          lenis: ["lenis"],
        },
      },
    },
  },
});
