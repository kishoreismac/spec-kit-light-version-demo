import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        catalog: resolve(rootDir, 'catalog/index.html')
      }
    }
  },
  test: {
    include: ['tests/unit/**/*.test.js'],
    environment: 'node'
  }
})
