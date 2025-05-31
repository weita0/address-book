import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vitest/config";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";

// import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  // test: {
  //   environment: "jsdom",
  //   globals: true,
  //   setupFiles: ["./src/test/setup.ts"],
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
