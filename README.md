# vue3-img-viewer

> _A lightly and smooth imgViewer for Vue/You_

## 预览 Preview

![preview](https://github.com/bullshitking-99/vue3-img-viewer/blob/master/src/assets/vue3-img-viewer.gif?raw=true)

### [在线地址(online App)](https://bullshitking-99.github.io/vue3-img-viewer/)

## Features

- Out of the box, one-step configuration
  - Put it on anywhere you need it for automatic recognition, even body tags! However, I still recommend that you only wrap it in necessary places, such as article, post-body, etc., to avoid affecting other functional components with img on the page (such as clickable cards with embedded img)
- silky animation
  - Implemented using FLIP, intuitive
- Monitor window scrolling, exit preview
  - Scroll to exit in preview state
- provide scrolling source by yourself
  - When it is inconvenient to use the native window to monitor scrolling, you can provide one yourself
- Unloaded images will not be recognized
  - Images that are not fully loaded or do not exist will be skipped during the processing stage, so as to ensure the normal operation of the component
- Gif image static
  - Display the cover when initializing, click to make it play and stop again, this is for the convenience of browsing and energy saving

## 特性

- 开箱即用，一步配置
  - 可在任何你需要它的地方套上即可自动识别，即使是 body 标签！不过我仍然建议你将它仅包裹在必须的地方，如 article、post-body 这类，以避免页面中其它带图片的功能组件受到影响(如内嵌图片的可点击卡片)
- 丝滑动画
  - 使用 FLIP 实现，符合直觉
- 监听 window 滚动，退出预览
  - 在预览状态下滚动即可退出
- 自行提供滚动源
  - 在不方便使用原生 window 监听滚动时，你可以自己提供一个
- 未加载图片不会被识别
  - 未加载完全或不存在的图片在处理阶段会被跳过，这样可以保证组件正常运行
- Gif 图像静止
  - 初始化时仅展示封面，可点击使其播放和再次停止，这样是为了方便浏览和节约能耗

## 马上整起 Get it in SECONDS

将其包裹在含有图片的组件内，它将自动识别组件内容里所有的 img 元素，并让它可以点击预览.
`Wrap it in a component containing an image, it will automatically recognize all img elements in the component content, and make it clickable to preview.`

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

- 下载 `Download`

```TypeScript
// npm
npm install vue3-img-viewer
// yarn
yarn add vue3-img-viewer
// pnpm
pnpm install vue3-img-viewer

```

- 全局安装 `Global installation`

  执行下步即可在所有页面随意引用. `Execute the next step to freely quote on all pages.`

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

- 局部引用 `Partial Reference`

  或在需要它的地方直接引用. `or directly refer to where you need it.`

```ts
// in any.vue
// import ts and css
<script>
  import ImgViewer from "vue3-img-viewer"; import
  "vue3-img-viewer/dist/style.css";
</script>
```

## 属性 Props

```ts
<script>
interface Props {
  // 滚动检测源 - 响应式数据
  // Scroll Detection Source - Reactive Data
  scrollTop?: Ref<number>;
}
const props = defineProps<Props>();
</script>
```

## 待开发

- 双击图片放大
- ts 类型支持
- 持续开发，敬请期待

## To be developed

- double click to enlarge img
- ts type declare
- Continuous development, so stay tuned
