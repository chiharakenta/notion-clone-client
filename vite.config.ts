import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_NAME,
  server: {
    open: true,
    port: 3000
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react'
    })
  ]
});
