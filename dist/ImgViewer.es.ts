import { ref as w, defineComponent as z, watch as p, onMounted as A, openBlock as _, createElementBlock as E, createElementVNode as h, normalizeClass as O, withModifiers as x, renderSlot as S } from "vue";
const b = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc3NTc1NDg4ODExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk0NCAyOTlINjkyYy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1OS4yYzQuNCAwIDgtMy42IDgtOFY1NDkuOWgxNjguMmM0LjQgMCA4LTMuNiA4LThWNDk1YzAtNC40LTMuNi04LTgtOEg3NTkuMlYzNjQuMkg5NDRjNC40IDAgOC0zLjYgOC04VjMwN2MwLTQuNC0zLjYtOC04LTh6TTU4OCAzMDBoLTU2Yy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LThWMzA4YzAtNC40LTMuNi04LTgtOHpNNDUyIDUwMC45SDI5MC41Yy00LjQgMC04IDMuNi04IDh2NDMuN2MwIDQuNCAzLjYgOCA4IDhoOTQuOWwtMC4zIDguOWMtMS4yIDU4LjgtNDUuNiA5OC41LTExMC45IDk4LjUtNzYuMiAwLTEyMy45LTU5LjctMTIzLjktMTU2LjcgMC05NS44IDQ2LjgtMTU1LjIgMTIxLjUtMTU1LjIgNTQuOCAwIDkzLjEgMjYuOSAxMDguNSA3NS40aDc2LjJjLTEzLjYtODcuMi04Ni0xNDMuNC0xODQuNy0xNDMuNEMxNTAgMjg4IDcyIDM3NS4yIDcyIDUxMS45IDcyIDY1MC4yIDE0OS4xIDczNiAyNzMgNzM2YzExNC4xIDAgMTg3LTcwLjcgMTg3LTE4MS42di00NS41YzAtNC40LTMuNi04LTgtOHoiIGZpbGw9IiM1MTUxNTEiIHAtaWQ9IjE1MjMiPjwvcGF0aD48L3N2Zz4K";
function T(t) {
  const l = t.getBoundingClientRect(), { left: e, top: i, width: o } = l;
  return { left: e, top: i, width: o };
}
function k(t, l) {
  let e;
  return function(...i) {
    clearTimeout(e), e = setTimeout(() => {
      t.apply(this, i);
    }, l);
  };
}
function Y(t, l, [e, i]) {
  t === "in" && (l.style.transform = "scale(1.4)", l.style.transformOrigin = `${e}px ${i}px`), t === "out" && (l.style.transform = "scale(1)");
}
function V(t) {
  t.onload = null;
  const l = t.src, e = t.width, i = t.height;
  let o, u = w(!1), r = document.createElement("canvas");
  r.width = e, r.height = i;
  const n = r.getContext("2d");
  n == null || n.drawImage(t, 0, 0, e, i);
  const a = document.createElement("img");
  a.src = b, a.style.backgroundColor = "gray";
  function M() {
    n == null || n.drawImage(
      a,
      (e - 70) / 2,
      (i - 70) / 2,
      70,
      70
    );
  }
  a.onload = () => {
    M(), o = r.toDataURL("image/gif"), t.src = o;
  };
  function N() {
    o && (t.src = o, u.value = !1);
  }
  function d() {
    t.src = l, u.value = !0;
  }
  return {
    stop: N,
    play: d,
    isPlay: u
  };
}
const B = { id: "imgViewer" }, Q = ["onClick", "src"], R = /* @__PURE__ */ z({
  __name: "ImgViewer",
  props: {
    scrollTop: null,
    gifStatic: { type: Boolean }
  },
  setup(t) {
    const l = t, e = w(!1);
    let i, o, u;
    const r = w("");
    let n, a, M;
    function N(c, g) {
      const s = {
        left: n.left - a.left,
        top: n.top - a.top
      };
      let I = [
        // cur-img在的位置
        {
          transform: `translate3d(${s.left}px, ${s.top}px,0) scale(${M})`,
          transformOrigin: "0 0"
        },
        // modal-img的位置
        { transform: "translate(0)" }
      ];
      g === "close" && (I = [I[1], I[0]]);
      const D = {
        duration: 300,
        easing: "cubic-bezier(.2,0,.2,1)"
      }, C = c.animate(I, D);
      g === "close" && C.addEventListener("finish", () => {
        e.value = !1, r.value = "", d = !0, i.style.visibility = "visible", i.style.transition = "", u.style.backgroundColor = "", o.style.transform = "scale(1)", o.style.transformOrigin = "";
      });
    }
    let d = !0;
    function y() {
      e.value && d && (d = !1, n = T(i), u.style.backgroundColor = "transparent", N(o, "close"));
    }
    const f = k(y, 50);
    let m = null, L = "in";
    const v = ({ offsetX: c, offsetY: g }) => {
      m ? (Y(L, o, [c, g]), L = L === "in" ? "out" : "in", clearTimeout(m), m = null) : m = setTimeout(() => {
        y(), m = null, o.style.transform = "none";
      }, 230);
    };
    return p(e, (c) => {
      if (c) {
        if (l.scrollTop) {
          p(l.scrollTop, f);
          return;
        }
        window.addEventListener("scroll", f);
      }
      c || window.removeEventListener("scroll", f);
    }), A(() => {
      const c = Array.from(document.getElementsByTagName("img")), g = function({ target: s }) {
        i = s, r.value = i.src, n = T(i), e.value = !0;
      };
      c.forEach((s) => {
        s.onload = function() {
          if (l.gifStatic && s.src.split(".").pop() === "gif") {
            s.style.cursor = "pointer";
            const { stop: D, play: C, isPlay: j } = V(s);
            s.addEventListener("click", () => {
              j.value ? D() : C();
            });
            return;
          }
          s.style.cursor = "zoom-in", s.addEventListener("click", g);
        };
      }), u = document.getElementById("imgViewer-modal"), o = document.getElementById("imgViewer-modalImg"), o.onload = () => {
        a = T(o), M = n.width / a.width, N(o, "show"), i.style.visibility = "hidden";
      };
    }), (c, g) => (_(), E("div", B, [
      h("div", {
        onClick: y,
        id: "imgViewer-modal",
        class: O(["modal", e.value ? "modalShow" : "modalClose"])
      }, [
        h("img", {
          id: "imgViewer-modalImg",
          onClick: x(v, ["stop"]),
          src: r.value
        }, null, 8, Q)
      ], 2),
      S(c.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const U = (t, l) => {
  const e = t.__vccOpts || t;
  for (const [i, o] of l)
    e[i] = o;
  return e;
}, W = /* @__PURE__ */ U(R, [["__scopeId", "data-v-a252bf00"]]), H = {
  install: (t) => {
    t.component("ImgViewer", W);
  }
};
export {
  W as ImgViewer,
  H as default
};
