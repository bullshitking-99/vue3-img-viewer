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

// 图片放大
// 目前无效 - 需解决 modal-img 点击问题
export function enlarge(event: MouseEvent): void {
  console.log(event);
  const { target: dom } = event;
  // 判断：除image元素外无响应
  if (!(dom instanceof HTMLImageElement)) return;
  console.log("dbclick the img");
}
