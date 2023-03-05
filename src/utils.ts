import { reactive, ref, toRef, toRefs } from "vue";
import gif_path from "./assets/GIF.svg";

// First & Last 获取图片大小和位置
export function getRects(img: HTMLImageElement) {
  // 该方法会强制更新dom信息
  const rect = img.getBoundingClientRect();
  const { left, top, width } = rect;
  return { left, top, width };
}

// 防抖函数
export function debounce(func: Function, delay: number) {
  // 记录上一次调度标识
  let lastTimerId: number;
  return function (this: Function, ...args: any[]) {
    // 取消上一次调度，若调度已执行，clearTimeout无副作用
    clearTimeout(lastTimerId);
    lastTimerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 图片缩放
// 获取点击位置，以其为源点进行scale
export function imgScale(
  option: "in" | "out",
  imgDom: HTMLImageElement,
  [offsetX, offsetY]: number[]
): void {
  // 放大时附上样式
  if (option === "in") {
    imgDom.style.transform = "scale(1.4)";
    imgDom.style.transformOrigin = `${offsetX}px ${offsetY}px`;
  }
  // 缩小时取消样式
  if (option === "out") {
    imgDom.style.transform = "scale(1)";
  }
}

/**
 * gif 停止和播放
 * @param gif
 */
export function useGif(gif: HTMLImageElement) {
  // 在更换src时不再触发组件内的生命周期事件
  gif.onload = null;

  // 原gif数据
  const url = gif.src;
  const width = gif.width;
  const height = gif.height;

  // canvas封面码
  let canvas_url: string;

  // 记录当前状态 - 播放/停止
  let isPlay = ref(false); // 得在改变的时候通知一下

  // 绘制canvas封面
  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  // 取gif第一帧作为底图
  ctx?.drawImage(gif, 0, 0, width, height);

  // 准备gif标志
  const gifSVG = document.createElement("img");
  gifSVG.src = gif_path;
  gifSVG.style.backgroundColor = "gray";
  // gif标志绘制函数，待图片加载后调用
  function drawGifSVG() {
    const gif_width = 70;
    const gif_height = 70;
    // gifSVG.style.filter = "grayscale(30%)";
    // gifSVG.style.backgroundColor = "gray"; // 设置图像样式无用

    ctx?.drawImage(
      gifSVG,
      (width - gif_width) / 2,
      (height - gif_height) / 2,
      gif_width,
      gif_height
    );
    // ctx.globalAlpha = 0.2; // 也不顶用
  }

  gifSVG.onload = () => {
    // 绘制gif标志
    drawGifSVG();
    // 绘制完成后生成url
    canvas_url = canvas.toDataURL("image/gif");
    // 图片初始化时切换url
    gif.src = canvas_url;
  };

  /**
   * 停止gif播放，切换src
   */
  function stop() {
    // 重置gif封面
    if (canvas_url) {
      gif.src = canvas_url; // 可能存在跨域问题？
      isPlay.value = false;
    }
  }

  /**
   * gif播放
   * 将src换回原地址
   */
  function play() {
    gif.src = url;
    isPlay.value = true;
  }

  // return toRefs(reactive({ stop, play, isPlay }));
  return {
    stop,
    play,
    isPlay,
  };
}
