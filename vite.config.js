import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Android-Manifest-STIG-Checker/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
