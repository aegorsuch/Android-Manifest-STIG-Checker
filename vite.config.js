import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/STIG-Checker/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
