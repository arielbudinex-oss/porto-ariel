import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 2000,
    // matikan modulePreload: helper-nya membuat entry meng-import SEMUA chunk
    // (termasuk three 235KB) secara statis di halaman awal
    modulePreload: false,
    rollupOptions: {
      output: {
        // pisahkan vendor besar supaya bisa di-cache browser dan tidak
        // memblokir halaman pertama
        manualChunks(id) {
          // helper preload Vite jangan sampai menempel ke chunk three,
          // kalau tidak entry akan meng-import chunk itu statis dan
          // three.js ikut terunduh di halaman awal
          if (id.includes("preload-helper")) return "vendor-react";
          if (id.includes("node_modules")) {
            // react + scheduler satu chunk: kalau scheduler nyasar ke chunk
            // "vendor" yang berisi three, seluruh three ikut terunduh di awal
            if (
              id.includes("react-dom") ||
              id.includes("/react/") ||
              id.includes("scheduler") ||
              id.includes("use-sync-external-store")
            ) {
              return "vendor-react";
            }
            // three + seluruh ekosistemnya di chunk sendiri; hanya chunk lazy
            // (Lab/Lanyard) yang mengimportnya, jadi tidak diunduh di awal
            if (
              id.includes("three") ||
              id.includes("@react-three") ||
              id.includes("zustand") ||
              id.includes("its-fine") ||
              id.includes("react-use-measure") ||
              id.includes("postprocessing")
            ) {
              return "vendor-three";
            }
            if (id.includes("gsap")) return "vendor-gsap";
            if (id.includes("@phosphor-icons")) return "vendor-icons";
            if (id.includes("framer-motion") || id.includes("motion")) return "vendor-motion";
            return "vendor";
          }
        },
      },
    },
  },
});
