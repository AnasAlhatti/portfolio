import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
 base: '/portfolio/', plugins: [react()],
 test: { environment: 'jsdom', setupFiles: ['./src/test/setup.js'], include: ['src/test/**/*.{test,spec}.{js,jsx}'],
 coverage: { provider: 'v8', include: ['src/**/*.{js,jsx}'], exclude: ['src/test/**', 'src/main.jsx', 'src/content/**'], reporter: ['text', 'html'], thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 } } }
});
