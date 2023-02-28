<script lang="ts" setup>
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import { getRects, debounce, enlarge, useGif } from "../utils";

interface Props {
  // 滚动检测源 - 响应式数据
  scrollTop?: Ref<number>;
}
const props = defineProps<Props>();

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

      // 使modal回到可关闭状态
      closeable = true;

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
// 在关闭动画执行期间，不再响应事件调用，动画结束后再打开
let closeable = true;
const modalClose: () => void = debounce(function () {
  // 滚动时触发，使用isShow判断是否执行
  if (isShow.value && closeable) {
    closeable = false;

    // 重新记录原图位置
    curRects = getRects(curImg);

    // modal background-transparent
    modal.style.backgroundColor = "transparent";
    // invert play again
    invertPlay(modalImg, "close");
  }
}, 50);

// 滚动响应 - watch(isShow), 在modal打开时，监听滚动事件
watch(isShow, (isShow) => {
  if (isShow) {
    if (props.scrollTop) {
      watch(props.scrollTop, modalClose);
    } else {
      window.addEventListener("scroll", modalClose);
    }
  }
  if (!isShow) window.removeEventListener("scroll", modalClose);
});
// 也可自行使用inject监听滚动源;

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
    // 在图片加载完成后 进行处理
    img.onload = function () {
      // 根据src后缀判断图片种类
      const imgType = img.src.split(".").pop();
      // gif处理
      if (imgType === "gif") {
        // 预设样式
        img.style.cursor = "pointer";
        // 将gif切换为封面，并导出控制方法
        const { stop, play, isPlay } = useGif(img);
        // 添加事件监听
        img.addEventListener("click", () => {
          isPlay.value ? stop() : play();
        });
      }
      // 静态图片处理
      if (imgType !== "gif") {
        // 预设样式
        img.style.cursor = "zoom-in";
        // 添加事件监听
        img.addEventListener("click", curImgClickHandler);
      }
    };
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
</script>

<template>
  <div id="imgViewer">
    <div
      @click="modalClose"
      id="imgViewer-modal"
      class="modal"
      :class="isShow ? 'modalShow' : 'modalClose'"
    >
      <img id="imgViewer-modalImg" @dblclick.native="enlarge" :src="imgSrc" />
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

    // 移动端放大后可移动查看
    overflow: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      pointer-events: none;
      user-select: none;
      max-width: 100vw;
      max-height: 100vh;
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
