import { defineConfig } from "vite";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [tailwindcss()],
  manifest: true, // uncomment for PWA support
});
