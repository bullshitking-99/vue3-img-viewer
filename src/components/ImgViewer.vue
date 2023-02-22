<script lang="ts" name="ImgViewer" setup>
import { onMounted, ref } from "vue";

// 控制 modal
const isShow = ref(false);
//  原图片实例
let curImg: HTMLImageElement;
// 现图片实例
let modalImg: HTMLImageElement;
// modal实例
let modal: HTMLElement;
// modal-img所需src
const imgSrc = ref("");

// FLIP
//  First Last 中获取 - invert所需数据
interface IRects {
  left: number;
  top: number;
  width: number;
}
let curRects: IRects; // 原图
let prevRects: IRects; // 预览图
let scaleVal: number;

// First & Last 获取图片大小和位置
function getRects(img: HTMLImageElement) {
  // 该方法会强制更新dom信息
  const rect = img.getBoundingClientRect();
  const { left, top, width } = rect;
  return { left, top, width };
}

// invert & play
function invertPlay(imgDom: HTMLImageElement, control: "show" | "close") {
  // 倒置的距离和尺寸
  const invert = {
    left: curRects.left - prevRects.left,
    top: curRects.top - prevRects.top,
  };

  let keyframes = [
    // cur-img在的位置
    {
      transform: `translate3d(${invert.left}px, ${invert.top}px,0) scale(${scaleVal})`,
      transformOrigin: "0 0",
    },
    // modal-img的位置
    { transform: "translate(0)" },
  ];
  if (control === "close") {
    keyframes = [keyframes[1], keyframes[0]];
  }

  const options = {
    duration: 300,
    easing: "cubic-bezier(.2,0,.2,1)",
    // easing: "linear",
  };

  // gogogo
  const animation = imgDom.animate(keyframes, options);

  // 动画结束时关闭modal
  if (control === "close") {
    animation.addEventListener("finish", () => {
      //  close modal
      isShow.value = false;
      imgSrc.value = "";

      // put origin-img back
      curImg.style.visibility = "visible";

      // 取消副作用
      curImg.style.transition = "";
      modal.style.backgroundColor = "";
    });
  }
}

// modal close handler - click & scroll
// 在一次滚动行为中 只执行最后一次 并重新获取原图的位置
// 进行防抖处理
const modalClose: () => void = debounce(function () {
  if (isShow.value) {
    // 重新记录原图位置
    curRects = getRects(curImg);

    // modal background-transparent
    modal.style.backgroundColor = "transparent";
    // invert play again
    invertPlay(modalImg, "close");
  }
}, 0);

// 滚动响应 - 在modal打开时，监听滚动事件
window.onscroll = modalClose;
// 也可自行使用inject监听滚动源

onMounted(() => {
  // 获取页面图片dom集
  const imgs = Array.from(document.getElementsByTagName("img"));
  // 每个图片的点击处理
  const curImgClickHandler = function (
    this: HTMLImageElement,
    { target }: MouseEvent
  ) {
    // 传递数据
    curImg = target as HTMLImageElement;
    // 触发 modal-img 的加载
    imgSrc.value = curImg.src;
    curRects = getRects(curImg);
    // 打开modal
    isShow.value = true;
  };
  // 为每个图片添加点击事件响应
  imgs.forEach((img: HTMLImageElement) => {
    // 预设样式
    img.style.cursor = "zoom-in";
    // 添加事件监听
    img.addEventListener("click", curImgClickHandler);
  });

  // 获取modal实例
  modal = document.getElementById("imgViewer-modal")!;

  // 预览图片dom
  modalImg = document.getElementById("imgViewer-modalImg") as HTMLImageElement;
  // 在预览图片加载完成后开始动画
  modalImg.onload = () => {
    prevRects = getRects(modalImg);
    scaleVal = curRects.width / prevRects.width;
    // 执行flip
    invertPlay(modalImg, "show");
    // 原图片消失
    curImg.style.visibility = "hidden";
  };
});

// 防抖函数
function debounce(func: Function, delay: number) {
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
</script>

<!-- <script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ImgViewer",
});
</script> -->

<template>
  <div id="imgViewer">
    <div
      @click="modalClose"
      id="imgViewer-modal"
      class="modal"
      :class="isShow ? 'modalShow' : 'modalClose'"
    >
      <img id="imgViewer-modalImg" :src="imgSrc" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
#imgViewer {
  .modal {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: zoom-out;
    transition: all ease 0.25s;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      pointer-events: none;
      user-select: none;
    }

    &.modalShow {
      background-color: rgba(3, 4, 4, 0.25);
    }

    &.modalClose {
      visibility: hidden;
    }
  }
}
</style>
