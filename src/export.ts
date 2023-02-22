import type { App } from "vue";
import ImgViewer from "./components/ImgViewer.vue";

export { ImgViewer };

// 全局引入
export default {
  install: (app: App): void => {
    app.component("ImgViewer", ImgViewer);
  },
};
