import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '#src': resolve('src/renderer/src'),
        '#src/components': resolve('src/renderer/src/components')
      }
    },
    plugins: [react()]
  },
  build: {
    rollupOptions: {
      external: ['better-sqlite3']
    }
  },
})
