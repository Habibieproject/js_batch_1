import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Semua request /api/... diteruskan ke backend Express
      "/api": "http://localhost:3001",
    },
  },
});
