import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: 'localhost', // Explicit host
    port: 3001,       // Explicit port
    strictPort: true, // Don't try other ports if 5173 is taken
    open: true        // Automatically open browser
  },
  build: {
    assetsInlineLimit: 4096, // Files smaller than 4kb will be inlined
    emptyOutDir: true,       // Clear output directory on build
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  optimizeDeps: {
    include: ['boxicons'] // Ensure boxicons are properly optimized
  },
  resolve: {
    alias: {
      // Add any necessary aliases here
      '@': '/src'
    }
  }
});