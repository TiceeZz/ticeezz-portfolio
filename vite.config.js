import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginWebp } from './src/utils/vite-plugin-webp';

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), vitePluginWebp({ quality: 80 }), cloudflare()],
  build: {
    target: 'esnext',
  },
});