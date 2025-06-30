/// <reference types="vite/client" />

import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [],
  build: {
    target: ['es2022']
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    include: ['@angular/core', '@angular/common', '@angular/router']
  },
  define: {
    'import.meta.vitest': mode !== 'production'
  }
}));