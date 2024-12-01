import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  define: {
    'process.env': {}
  },
  css: {
    postcss: './postcss.config.js',
  },
})
