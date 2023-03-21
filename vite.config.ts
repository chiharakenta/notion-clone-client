import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/notion-clone-client/',
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
