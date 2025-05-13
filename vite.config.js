import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // this makes the dev server listen on your local IP
    port: 3000,        // optional, default is 5173
    strictPort: true,  // optional, will fail if port 3000 is taken
  },
});
