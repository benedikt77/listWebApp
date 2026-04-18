// vite.config.ts
import { defineConfig } from 'vite'


export default defineConfig({
  plugins: [],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',   // URL deines Express-Servers
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // optional
      },
    },
  },
})

