import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
  },
  base: "/vue3-img-viewer/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  // build: {
  //   lib: {
  //     entry: path.resolve(__dirname, "src/export.ts"),
  //     name: "ImgViewer",
  //     fileName: (format) => `ImgViewer.${format}.ts`,
  //   },
  //   rollupOptions: {
  //     // 确保外部化处理那些你不想打包进库的依赖
  //     external: ["vue"],
  //     output: {
  //       // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
  //       globals: {
  //         vue: "Vue",
  //       },
  //     },
  //   },
  // },
});
