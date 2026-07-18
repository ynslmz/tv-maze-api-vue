import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        include: ['src/**/*.{ts,vue}'],
        exclude: [
          'src/**/*.spec.ts',
          'src/**/*.mock.ts',
          'src/main.ts',
          'src/env.d.ts',
          'src/**/*.d.ts'
        ],
        thresholds: {
          statements: 50,
          branches: 50,
          functions: 45,
          lines: 50
        }
      }
    }
  })
)
