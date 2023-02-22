import { createApp } from "vue";
import App from "./App.vue";

// yarn add vue3-img-viewer
import ImgViewer from "vue3-img-viewer";
import "vue3-img-viewer/dist/style.css";

const app = createApp(App);

app.use(ImgViewer);

app.mount("#app");
