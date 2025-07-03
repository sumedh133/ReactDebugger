import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import injectSource from './babel-plugin-inject-source.js';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({
      // Only apply to .tsx and .jsx files
      filter: /\.(t|j)sx$/,
      babelConfig: {
        presets: ['@babel/preset-typescript'],
        plugins: [injectSource],
      },
    }),
  ],
});
