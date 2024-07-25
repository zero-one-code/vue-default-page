import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import { fileURLToPath } from 'node:url';

export default mergeConfig(
  baseConfig,
  defineConfig({
    build: {
      outDir: 'dist/web-components',
      lib: {
        entry: fileURLToPath(
          new URL('../src/web-components/index.ts', import.meta.url)
        ),
      },
    },
  })
);
