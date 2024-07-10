import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ['lodash'],
    },
  },
});
