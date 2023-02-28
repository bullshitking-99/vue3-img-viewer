import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

// vue3-img-viewer
// import ImgViewer from "vue3-img-viewer";
// import "vue3-img-viewer/dist/style.css";

// toc-creator
import toc from "toc-creator";
import "toc-creator/dist/style.css";

const app = createApp(App);
app.use(toc);
app.mount("#app");
