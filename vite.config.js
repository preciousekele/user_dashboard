import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/user_dashboard/',  
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: 'localhost', 
    port: 3002,      
    strictPort: true, 
    open: true        
  },
  build: {
    assetsInlineLimit: 4096, 
    emptyOutDir: true,       
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  optimizeDeps: {
    include: ['boxicons'] 
  },
  resolve: {
    alias: {
      
      '@': '/src'
    }
  }
});