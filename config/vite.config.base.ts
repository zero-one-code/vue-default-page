import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    target: 'es2015',
    copyPublicDir: false,
    rollupOptions: {
      external: ['lodash'],
    },
    lib: {
      entry: fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
});
