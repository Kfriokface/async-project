import { defineConfig } from 'vite'
import postcss from './postcss.config.js';

export default defineConfig({
  base: './',
  define: {
    'process.env': {}
  },
  css: {
    postcss
  }
})
