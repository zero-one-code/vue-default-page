import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './config/vite.config.base';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      onConsoleLog: (log) => !log.includes('isCustomElement'),
    },
  })
);
