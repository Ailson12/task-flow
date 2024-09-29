import { defineConfig, defaultExclude } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [...defaultExclude, 'src/helpers/index.ts'],
    },
  },
})
