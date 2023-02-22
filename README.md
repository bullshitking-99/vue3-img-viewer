# vue3-img-viewer

> A lightly and smooth imgViewer for Vue/You

## 预览 Preview

![preview](https://github.com/bullshitking-99/vue3-img-viewer/blob/master/src/assets/vue3-img-viewer.gif?raw=true)

### [在线地址(online App)](https://bullshitking-99.github.io/vue3-img-viewer/)

## 在组件中使用 used in the component

将其包裹在含有图片的组件内，它将自动识别组件内容里所有的 img 元素，并让它可以点击预览
Wrap it in a component containing an image, it will automatically recognize all img elements in the component content, and make it clickable to preview

```html
// in any.vue
<template>
  <ImgViewer>
    <div>... put any thing ...</div>
    <img src="..." alt="..." />
    <img src="..." alt="..." />
    <img src="..." alt="..." />
    <div>... put any thing ...</div>
  </ImgViewer>
</template>
```

## 下载与引用 Download and Citation

- 下载 Download

```TypeScript
// npm
npm install vue3-img-viewer
// yarn
yarn add vue3-img-viewer
// pnpm
yarn install vue3-img-viewer

```

- 全局安装 Global installation

  执行下步即可在所有页面随意引用 Execute the next step to freely quote on all pages

```TypeScript
// in main.ts
// import ts and css
import ImgViewer from "vue3-img-viewer";
import "vue3-img-viewer/dist/style.css";

// use it
const app = createApp(App);
app.use(ImgViewer);
app.mount("#app");

```

- 局部引用 partial reference

  或在需要它的地方直接引用 or directly refer to where you need it

```ts
// in any.vue
// import ts and css
<script>
  import ImgViewer from "vue3-img-viewer"; import
  "vue3-img-viewer/dist/style.css";
</script>
```

## 特性

- 开箱即用，一步配置

  - 可在任何你需要它的地方套上即可自动识别，即使是 body 标签！

- 丝滑动画

  - 使用 FLIP 实现，符合直觉

- 监听 window 滚动，退出预览
  - 在预览状态下滚动即可退出

## Features

- Out of the box, one-step configuration

  - Can be put on anywhere you need it and can be automatically recognized, even body tags!

- silky animation

  - Implemented using FLIP, intuitive

- Monitor window scrolling, exit preview
  - Scroll to exit in preview state

## 待开发

- 双击图片放大
- 监听自定义滚动源
- ts 类型支持
- 持续开发，敬请期待

## To be developed

- Improve scrolling exit animation to make it as smooth as clicking back
- Listen for custom scroll sources
- js version and corresponding type file
- Continuous development, so stay tuned
