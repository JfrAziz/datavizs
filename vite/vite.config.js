import path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: "./vite/index.html"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
})
