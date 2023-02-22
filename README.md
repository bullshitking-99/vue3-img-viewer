# vue3-img-viewer

> A lightly and smooth imgViewer for Vue/You

## 预览

![preview](https://github.com/bullshitking-99/vue3-img-viewer/tree/master/src/assets/vue3-img-viewer.gif?)

### [在线地址(click me)](https://bullshitking-99.github.io/vue3-img-viewer/)

## 在组件中使用

将其包裹在含有图片的组件内，它将自动识别组件内容里所有的 img 元素，并让他可以点击预览

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

## 下载与引用

- 下载

```TypeScript
// npm
npm install vue3-img-viewer
// yarn
yarn add vue3-img-viewer
// pnpm
yarn install vue3-img-viewer

```

- 全局安装

  执行下步即可在所有页面随意引用

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

- 局部引用

  或在需要它的地方直接引用

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

## 待开发

- 完善滚动退出动画，使其和点击返回一样顺滑
- 监听自定义滚动源
- js 版本与对应的类型文件
- 持续开发，敬请期待
