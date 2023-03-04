import { ref as T, defineComponent as p, watch as C, onMounted as h, openBlock as z, createElementBlock as A, createElementVNode as w, unref as L, normalizeClass as E, renderSlot as O } from "vue";
const _ = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc3NTc1NDg4ODExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk0NCAyOTlINjkyYy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1OS4yYzQuNCAwIDgtMy42IDgtOFY1NDkuOWgxNjguMmM0LjQgMCA4LTMuNiA4LThWNDk1YzAtNC40LTMuNi04LTgtOEg3NTkuMlYzNjQuMkg5NDRjNC40IDAgOC0zLjYgOC04VjMwN2MwLTQuNC0zLjYtOC04LTh6TTU4OCAzMDBoLTU2Yy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LThWMzA4YzAtNC40LTMuNi04LTgtOHpNNDUyIDUwMC45SDI5MC41Yy00LjQgMC04IDMuNi04IDh2NDMuN2MwIDQuNCAzLjYgOCA4IDhoOTQuOWwtMC4zIDguOWMtMS4yIDU4LjgtNDUuNiA5OC41LTExMC45IDk4LjUtNzYuMiAwLTEyMy45LTU5LjctMTIzLjktMTU2LjcgMC05NS44IDQ2LjgtMTU1LjIgMTIxLjUtMTU1LjIgNTQuOCAwIDkzLjEgMjYuOSAxMDguNSA3NS40aDc2LjJjLTEzLjYtODcuMi04Ni0xNDMuNC0xODQuNy0xNDMuNEMxNTAgMjg4IDcyIDM3NS4yIDcyIDUxMS45IDcyIDY1MC4yIDE0OS4xIDczNiAyNzMgNzM2YzExNC4xIDAgMTg3LTcwLjcgMTg3LTE4MS42di00NS41YzAtNC40LTMuNi04LTgtOHoiIGZpbGw9IiM1MTUxNTEiIHAtaWQ9IjE1MjMiPjwvcGF0aD48L3N2Zz4K";
function f(t) {
  const l = t.getBoundingClientRect(), { left: e, top: o, width: n } = l;
  return { left: e, top: o, width: n };
}
function x(t, l) {
  let e;
  return function(...o) {
    clearTimeout(e), e = setTimeout(() => {
      t.apply(this, o);
    }, l);
  };
}
function j(t) {
  console.log(t);
  const { target: l } = t;
  l instanceof HTMLImageElement && console.log("dbclick the img");
}
function b(t) {
  t.onload = null;
  const l = t.src, e = t.width, o = t.height;
  let n, u = T(!1), g = document.createElement("canvas");
  g.width = e, g.height = o;
  const c = g.getContext("2d");
  c == null || c.drawImage(t, 0, 0, e, o);
  const s = document.createElement("img");
  s.src = _, s.style.backgroundColor = "gray";
  function m() {
    c == null || c.drawImage(
      s,
      (e - 70) / 2,
      (o - 70) / 2,
      70,
      70
    );
  }
  s.onload = () => {
    m(), n = g.toDataURL("image/gif"), t.src = n;
  };
  function N() {
    n && (t.src = n, u.value = !1);
  }
  function M() {
    t.src = l, u.value = !0;
  }
  return {
    stop: N,
    play: M,
    isPlay: u
  };
}
const k = { id: "imgViewer" }, S = ["src"], Y = /* @__PURE__ */ p({
  __name: "ImgViewer",
  props: {
    scrollTop: null
  },
  setup(t) {
    const l = t, e = T(!1);
    let o, n, u;
    const g = T("");
    let c, s, m;
    function N(a, r) {
      const i = {
        left: c.left - s.left,
        top: c.top - s.top
      };
      let d = [
        // cur-img在的位置
        {
          transform: `translate3d(${i.left}px, ${i.top}px,0) scale(${m})`,
          transformOrigin: "0 0"
        },
        // modal-img的位置
        { transform: "translate(0)" }
      ];
      r === "close" && (d = [d[1], d[0]]);
      const D = {
        duration: 300,
        easing: "cubic-bezier(.2,0,.2,1)"
        // easing: "linear",
      }, y = a.animate(d, D);
      r === "close" && y.addEventListener("finish", () => {
        e.value = !1, g.value = "", M = !0, o.style.visibility = "visible", o.style.transition = "", u.style.backgroundColor = "";
      });
    }
    let M = !0;
    const I = x(function() {
      e.value && M && (M = !1, c = f(o), u.style.backgroundColor = "transparent", N(n, "close"));
    }, 50);
    return C(e, (a) => {
      a && (l.scrollTop ? C(l.scrollTop, I) : window.addEventListener("scroll", I)), a || window.removeEventListener("scroll", I);
    }), h(() => {
      const a = Array.from(document.getElementsByTagName("img")), r = function({ target: i }) {
        o = i, g.value = o.src, c = f(o), e.value = !0;
      };
      a.forEach((i) => {
        i.onload = function() {
          const d = i.src.split(".").pop();
          if (d === "gif") {
            i.style.cursor = "pointer";
            const { stop: D, play: y, isPlay: v } = b(i);
            i.addEventListener("click", () => {
              v.value ? D() : y();
            });
          }
          d !== "gif" && (i.style.cursor = "zoom-in", i.addEventListener("click", r));
        };
      }), u = document.getElementById("imgViewer-modal"), n = document.getElementById("imgViewer-modalImg"), n.onload = () => {
        s = f(n), m = c.width / s.width, N(n, "show"), o.style.visibility = "hidden";
      };
    }), (a, r) => (z(), A("div", k, [
      w("div", {
        onClick: r[1] || (r[1] = //@ts-ignore
        (...i) => L(I) && L(I)(...i)),
        id: "imgViewer-modal",
        class: E(["modal", e.value ? "modalShow" : "modalClose"])
      }, [
        w("img", {
          id: "imgViewer-modalImg",
          onDblclick: r[0] || (r[0] = //@ts-ignore
          (...i) => L(j) && L(j)(...i)),
          src: g.value
        }, null, 40, S)
      ], 2),
      O(a.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const V = (t, l) => {
  const e = t.__vccOpts || t;
  for (const [o, n] of l)
    e[o] = n;
  return e;
}, Q = /* @__PURE__ */ V(Y, [["__scopeId", "data-v-c482a645"]]), R = {
  install: (t) => {
    t.component("ImgViewer", Q);
  }
};
export {
  Q as ImgViewer,
  R as default
};
