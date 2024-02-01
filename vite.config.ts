// vite.config.ts
import {resolve} from "path"
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
    "@views": path.resolve(__dirname, "src/views"),
    "@store": path.resolve(__dirname, "src/store"),
    "@components": path.resolve(__dirname, "src/components"),
    "@lib": path.resolve(__dirname, "src/lib"),
    "@assests": path.resolve(__dirname, "src/assests"),
    "@": path.resolve(__dirname, "src/"),
    }}
});

