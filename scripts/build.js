import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __dirname = fileURLToPath(new URL('../', import.meta.url));

function start() {
  const libBase = {
    formats: ['es', 'cjs'],
    fileName: 'index',
  };
  const buildMap = [
    {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        ...libBase,
      },
      rollupOptions: {
        external: ['vue'],
      },
    },
    {
      outDir: 'dist/web-components',
      lib: {
        entry: resolve(__dirname, 'src/web-components/index.ts'),
        ...libBase,
      },
    },
  ];
  buildMap.forEach((buildConfig) => build({ build: buildConfig }));
}

start();
