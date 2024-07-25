import { defineConfig } from 'cypress';
import viteConfig from './config/vite.config.base';

export default defineConfig({
  includeShadowDom: true,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig,
    },
  },
});
