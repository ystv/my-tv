import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import basicSSL from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), basicSSL()],
  envPrefix: "PUBLIC_",
  build: {
    outDir: 'build',
  },
  server: {
    https: true,
    host: "ystv-development.localhost",
    port: 3000,
  }
});
