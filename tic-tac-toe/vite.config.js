import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // 👈 Important: allows access from local network
    port: 5173,           // 👈 Optional: make sure it's the port you're using
  }
})
