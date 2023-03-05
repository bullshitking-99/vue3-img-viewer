<script lang="ts" setup>
import type { Ref } from "vue";
import { onMounted, ref, watch } from "vue";
import { getRects, debounce, imgScale, useGif } from "../utils";

interface Props {
  // 滚动检测源 - 响应式数据
  scrollTop?: Ref<number>;
  // 是否静止gif
  gifStatic?: boolean;
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
      curImg.style.opacity = "";

      // 取消副作用
      curImg.style.transition = "";
      modal.style.backgroundColor = "";
      modalImg.style.transform = "scale(1)";
      modalImg.style.transformOrigin = "";
    });
  }
}

// modal close handler - click & scroll
// 在关闭动画执行期间，不再响应事件调用，动画结束后再打开
let closeable = true;
function modalClose() {
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
}

// 响应滚动 - close
// 在一次滚动行为中 只执行最后一次 并重新获取原图的位置
// 进行防抖处理
const modalClose_scroll: () => void = debounce(modalClose, 50);

// 响应点击 - close
// 点击延时处理，保留 timeid
// 滞空期内再次点击判定为 dbclick，调用放大方法
let timeId: number | null = null;
let imgScaleOption: "in" | "out" = "in";
const modalClose_dbClick = ({ offsetX, offsetY }: MouseEvent) => {
  if (!timeId) {
    timeId = setTimeout(() => {
      modalClose();
      // 如果作为单击执行则clear
      timeId = null;
      modalImg.style.transform = "none";
    }, 230);
  } else {
    // 获取点击相对图片的位置
    imgScale(imgScaleOption, modalImg, [offsetX, offsetY]);
    // 调整后序双击缩放类型
    imgScaleOption = imgScaleOption === "in" ? "out" : "in";
    // clear
    clearTimeout(timeId);
    timeId = null;
  }
};

// 滚动响应 - watch(isShow), 在modal打开时，监听滚动事件
watch(isShow, (isShow) => {
  if (isShow) {
    if (props.scrollTop) {
      watch(props.scrollTop, modalClose_scroll);
      return;
    }
    window.addEventListener("scroll", modalClose_scroll);
  }
  if (!isShow) window.removeEventListener("scroll", modalClose_scroll);
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
      // 根据参数情况特殊处理
      if (props.gifStatic) {
        // console.log(props.gifStatic); // 空值传入自动为true
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

          return;
        }
      }

      // 默认静态图片处理
      // 预设样式
      img.style.cursor = "zoom-in";
      // 添加事件监听
      img.addEventListener("click", curImgClickHandler);
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

    // 原图片消失
    curImg.style.opacity = "0";
    curImg.style.transition = "all .07s ease";
    // 执行flip
    invertPlay(modalImg, "show");
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
      <img
        id="imgViewer-modalImg"
        @click.stop="modalClose_dbClick"
        :src="imgSrc"
      />
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
    transition: all ease 0.1s;
    z-index: 999;

    // 移动端放大后可移动查看
    overflow: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      // pointer-events: none;
      transition: all 0.3s ease;
      user-select: none;
      max-width: 100vw;
      max-height: 100vh;
      cursor: zoom-in;
      // position: absolute; // scale 并未扩大modal的尺寸
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
