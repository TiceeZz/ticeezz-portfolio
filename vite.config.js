import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginWebp } from './src/utils/vite-plugin-webp';

export default defineConfig({
  plugins: [
    react(),
    vitePluginWebp({ quality: 80 }),
  ],
  build: {
    target: 'esnext',
  },
});
