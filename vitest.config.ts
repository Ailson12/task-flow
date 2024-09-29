import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    svgr(),
  ],
  test: {
    environment: 'jsdom',
    testTimeout: 8000,
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, 'src/router/index.tsx'],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
