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
    testTimeout: 20000,
    setupFiles: 'src/configs/test/setupTests.ts',
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        'src/main.tsx',
        'src/router/index.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
