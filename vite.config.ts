/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import type { UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const FORMAT_TYPE = {
  es: 'es',
  cjs: 'cjs',
};

function fmtEntryFileNames(format: string, entryName: string): string {
  const ext = format === FORMAT_TYPE.es ? 'js' : 'cjs';
  return `${format}/[name].min.${ext}`;
}

function getPkgJson() {
  return JSON.parse(
    readFileSync(resolve(__dirname, './package.json')).toString(),
  );
}

function manualChunks(format: string, id: string) {
  if (id.includes('node_modules')) {
    return `${format}/vendor`;
  }
}

export default defineConfig(({ mode }) => {
  const pkgJson = getPkgJson();
  const isProd = mode === 'production';
  const name = 'ztool';

  return {
    mode,
    define: {
      __APP_NAME__: JSON.stringify(name),
      __APP_VERSION__: JSON.stringify(pkgJson.version),
    },
    build: {
      target: 'es6',
      lib: {
        entry: {
          [name]: resolve(__dirname, './src/main.ts'),
        },
      },
      rollupOptions: {
        output: [
          {
            entryFileNames: fmtEntryFileNames(FORMAT_TYPE.es, name),
            format: FORMAT_TYPE.es,
            manualChunks: (id: string) => manualChunks(FORMAT_TYPE.es, id),
          },
          {
            entryFileNames: fmtEntryFileNames(FORMAT_TYPE.cjs, name),
            format: FORMAT_TYPE.cjs,
            manualChunks: (id: string) => manualChunks(FORMAT_TYPE.cjs, id),
          },
        ],
      },
      minify: isProd,
    },
    plugins: [dts({ tsconfigPath: './tsconfig.json', outDir: './dist/types' })],
    test: {
      browser: {},
      watch: false,
    },
  } as UserConfig;
});
