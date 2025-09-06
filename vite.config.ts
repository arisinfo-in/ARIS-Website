import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Performance optimizations
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react', 'framer-motion'],
          charts: ['recharts', 'd3'],
          three: ['three'],
        },
      },
    },
    
    // Enable source maps for production debugging
    sourcemap: false,
    
    // Optimize asset handling
    assetsInlineLimit: 4096,
    
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  
  // Dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      'framer-motion',
      'axios',
    ],
    exclude: ['lucide-react'],
  },
  
  // Server configuration for development
  server: {
    port: 5173,
    host: true,
    // Enable HMR
    hmr: {
      overlay: false,
    },
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
  
  // CSS optimization
  css: {
    devSourcemap: true,
  },
  
  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
