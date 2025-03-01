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
  return `${format}/${entryName}.min.js`;
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
  const entry = resolve(__dirname, './src/main.ts');
  const pkgJson = getPkgJson();
  const isProd = mode === 'production';

  return {
    mode,
    define: {
      __APP_NAME__: JSON.stringify(pkgJson.name),
      __APP_VERSION__: JSON.stringify(pkgJson.version),
    },
    build: {
      lib: {
        entry,
      },
      rollupOptions: {
        output: [
          {
            entryFileNames: fmtEntryFileNames(FORMAT_TYPE.es, pkgJson.name),
            format: FORMAT_TYPE.es,
            manualChunks: (id: string) => manualChunks(FORMAT_TYPE.es, id),
          },
          {
            entryFileNames: fmtEntryFileNames(FORMAT_TYPE.cjs, pkgJson.name),
            format: FORMAT_TYPE.cjs,
            manualChunks: (id: string) => manualChunks(FORMAT_TYPE.cjs, id),
          },
        ],
      },
      minify: isProd,
    },
    plugins: [dts({ tsconfigPath: './tsconfig.json', outDir: './dist/types' })],
  } as UserConfig;
});
