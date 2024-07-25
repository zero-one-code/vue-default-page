import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [libInjectCss()],
    build: {
      rollupOptions: {
        external: ['vue'],
      },
    },
  })
);
