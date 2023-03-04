import { ref as T, defineComponent as v, watch as C, onMounted as h, openBlock as z, createElementBlock as A, createElementVNode as w, unref as L, normalizeClass as E, renderSlot as O } from "vue";
const _ = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc3NTc1NDg4ODExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk0NCAyOTlINjkyYy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1OS4yYzQuNCAwIDgtMy42IDgtOFY1NDkuOWgxNjguMmM0LjQgMCA4LTMuNiA4LThWNDk1YzAtNC40LTMuNi04LTgtOEg3NTkuMlYzNjQuMkg5NDRjNC40IDAgOC0zLjYgOC04VjMwN2MwLTQuNC0zLjYtOC04LTh6TTU4OCAzMDBoLTU2Yy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LThWMzA4YzAtNC40LTMuNi04LTgtOHpNNDUyIDUwMC45SDI5MC41Yy00LjQgMC04IDMuNi04IDh2NDMuN2MwIDQuNCAzLjYgOCA4IDhoOTQuOWwtMC4zIDguOWMtMS4yIDU4LjgtNDUuNiA5OC41LTExMC45IDk4LjUtNzYuMiAwLTEyMy45LTU5LjctMTIzLjktMTU2LjcgMC05NS44IDQ2LjgtMTU1LjIgMTIxLjUtMTU1LjIgNTQuOCAwIDkzLjEgMjYuOSAxMDguNSA3NS40aDc2LjJjLTEzLjYtODcuMi04Ni0xNDMuNC0xODQuNy0xNDMuNEMxNTAgMjg4IDcyIDM3NS4yIDcyIDUxMS45IDcyIDY1MC4yIDE0OS4xIDczNiAyNzMgNzM2YzExNC4xIDAgMTg3LTcwLjcgMTg3LTE4MS42di00NS41YzAtNC40LTMuNi04LTgtOHoiIGZpbGw9IiM1MTUxNTEiIHAtaWQ9IjE1MjMiPjwvcGF0aD48L3N2Zz4K";
function f(t) {
  const l = t.getBoundingClientRect(), { left: e, top: i, width: n } = l;
  return { left: e, top: i, width: n };
}
function b(t, l) {
  let e;
  return function(...i) {
    clearTimeout(e), e = setTimeout(() => {
      t.apply(this, i);
    }, l);
  };
}
function p(t) {
  console.log(t);
  const { target: l } = t;
  l instanceof HTMLImageElement && console.log("dbclick the img");
}
function x(t) {
  t.onload = null;
  const l = t.src, e = t.width, i = t.height;
  let n, u = T(!1), g = document.createElement("canvas");
  g.width = e, g.height = i;
  const c = g.getContext("2d");
  c == null || c.drawImage(t, 0, 0, e, i);
  const s = document.createElement("img");
  s.src = _, s.style.backgroundColor = "gray";
  function M() {
    c == null || c.drawImage(
      s,
      (e - 70) / 2,
      (i - 70) / 2,
      70,
      70
    );
  }
  s.onload = () => {
    M(), n = g.toDataURL("image/gif"), t.src = n;
  };
  function N() {
    n && (t.src = n, u.value = !1);
  }
  function I() {
    t.src = l, u.value = !0;
  }
  return {
    stop: N,
    play: I,
    isPlay: u
  };
}
const S = { id: "imgViewer" }, k = ["src"], Y = /* @__PURE__ */ v({
  __name: "ImgViewer",
  props: {
    scrollTop: null,
    gifStatic: { type: Boolean }
  },
  setup(t) {
    const l = t, e = T(!1);
    let i, n, u;
    const g = T("");
    let c, s, M;
    function N(a, r) {
      const o = {
        left: c.left - s.left,
        top: c.top - s.top
      };
      let m = [
        // cur-img在的位置
        {
          transform: `translate3d(${o.left}px, ${o.top}px,0) scale(${M})`,
          transformOrigin: "0 0"
        },
        // modal-img的位置
        { transform: "translate(0)" }
      ];
      r === "close" && (m = [m[1], m[0]]);
      const y = {
        duration: 300,
        easing: "cubic-bezier(.2,0,.2,1)"
        // easing: "linear",
      }, D = a.animate(m, y);
      r === "close" && D.addEventListener("finish", () => {
        e.value = !1, g.value = "", I = !0, i.style.visibility = "visible", i.style.transition = "", u.style.backgroundColor = "";
      });
    }
    let I = !0;
    const d = b(function() {
      e.value && I && (I = !1, c = f(i), u.style.backgroundColor = "transparent", N(n, "close"));
    }, 50);
    return C(e, (a) => {
      a && (l.scrollTop ? C(l.scrollTop, d) : window.addEventListener("scroll", d)), a || window.removeEventListener("scroll", d);
    }), h(() => {
      const a = Array.from(document.getElementsByTagName("img")), r = function({ target: o }) {
        i = o, g.value = i.src, c = f(i), e.value = !0;
      };
      a.forEach((o) => {
        o.onload = function() {
          if (l.gifStatic && o.src.split(".").pop() === "gif") {
            o.style.cursor = "pointer";
            const { stop: y, play: D, isPlay: j } = x(o);
            o.addEventListener("click", () => {
              j.value ? y() : D();
            });
            return;
          }
          o.style.cursor = "zoom-in", o.addEventListener("click", r);
        };
      }), u = document.getElementById("imgViewer-modal"), n = document.getElementById("imgViewer-modalImg"), n.onload = () => {
        s = f(n), M = c.width / s.width, N(n, "show"), i.style.visibility = "hidden";
      };
    }), (a, r) => (z(), A("div", S, [
      w("div", {
        onClick: r[1] || (r[1] = //@ts-ignore
        (...o) => L(d) && L(d)(...o)),
        id: "imgViewer-modal",
        class: E(["modal", e.value ? "modalShow" : "modalClose"])
      }, [
        w("img", {
          id: "imgViewer-modalImg",
          onDblclick: r[0] || (r[0] = //@ts-ignore
          (...o) => L(p) && L(p)(...o)),
          src: g.value
        }, null, 40, k)
      ], 2),
      O(a.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const V = (t, l) => {
  const e = t.__vccOpts || t;
  for (const [i, n] of l)
    e[i] = n;
  return e;
}, B = /* @__PURE__ */ V(Y, [["__scopeId", "data-v-a4515fb3"]]), R = {
  install: (t) => {
    t.component("ImgViewer", B);
  }
};
export {
  B as ImgViewer,
  R as default
};
