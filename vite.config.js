import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces so forwarded ports (e.g. GitHub Codespaces)
    // can reach the dev server, not just IPv6 loopback.
    host: true,
    // Codespaces serves the app from a *.app.github.dev hostname, which Vite's
    // host check blocks by default.
    allowedHosts: ['.app.github.dev'],
  },
})
