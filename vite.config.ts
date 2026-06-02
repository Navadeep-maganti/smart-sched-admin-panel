import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    proxy: {
      '/api': {
        target: 'https://smart-scheduler-backend-wvvw.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
