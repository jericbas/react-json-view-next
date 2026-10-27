import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        'plugins/clipboard/index': resolve(import.meta.dirname, 'src/plugins/clipboard/index.ts'),
        'plugins/editor/index': resolve(import.meta.dirname, 'src/plugins/editor/index.ts'),
        'plugins/search/index': resolve(import.meta.dirname, 'src/plugins/search/index.ts'),
        'plugins/virtual/index': resolve(import.meta.dirname, 'src/plugins/virtual/index.ts'),
        'themes/index': resolve(import.meta.dirname, 'src/themes/index.ts'),
        'compat/index': resolve(import.meta.dirname, 'src/compat/index.tsx')
      },
      name: 'reactJsonView',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
