import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://public-api.meteofrance.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
