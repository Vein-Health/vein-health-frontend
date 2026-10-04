import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/tests/polyfills.ts', './src/tests/setup.ts'],
    restoreMocks: true,
    clearMocks: true,
    isolate: false,
    testTimeout: 20_000,
  },
})
