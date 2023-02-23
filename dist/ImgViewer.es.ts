import { defineComponent as V, ref as v, onMounted as b, openBlock as h, createElementBlock as C, createElementVNode as y, unref as d, normalizeClass as E, renderSlot as x } from "vue";
function g(t) {
  const o = t.getBoundingClientRect(), { left: e, top: n, width: s } = o;
  return { left: e, top: n, width: s };
}
function B(t, o) {
  let e;
  return function(...n) {
    clearTimeout(e), e = setTimeout(() => {
      t.apply(this, n);
    }, o);
  };
}
function w(t) {
  console.log(t);
  const { target: o } = t;
  o instanceof HTMLImageElement && console.log("dbclick the img");
}
const T = { id: "imgViewer" }, R = ["src"], S = /* @__PURE__ */ V({
  __name: "ImgViewer",
  setup(t) {
    const o = v(!1);
    let e, n, s;
    const u = v("");
    let r, a, p;
    function _(c, i) {
      const l = {
        left: r.left - a.left,
        top: r.top - a.top
      };
      let m = [
        // cur-img在的位置
        {
          transform: `translate3d(${l.left}px, ${l.top}px,0) scale(${p})`,
          transformOrigin: "0 0"
        },
        // modal-img的位置
        { transform: "translate(0)" }
      ];
      i === "close" && (m = [m[1], m[0]]);
      const I = {
        duration: 300,
        easing: "cubic-bezier(.2,0,.2,1)"
        // easing: "linear",
      }, k = c.animate(m, I);
      i === "close" && k.addEventListener("finish", () => {
        o.value = !1, u.value = "", e.style.visibility = "visible", e.style.transition = "", s.style.backgroundColor = "";
      });
    }
    const f = B(function() {
      o.value && (r = g(e), s.style.backgroundColor = "transparent", _(n, "close"));
    }, 20);
    return window.onscroll = f, b(() => {
      const c = Array.from(document.getElementsByTagName("img")), i = function({ target: l }) {
        e = l, u.value = e.src, r = g(e), o.value = !0;
      };
      c.forEach((l) => {
        l.style.cursor = "zoom-in", l.addEventListener("click", i);
      }), s = document.getElementById("imgViewer-modal"), n = document.getElementById("imgViewer-modalImg"), n.onload = () => {
        a = g(n), p = r.width / a.width, _(n, "show"), e.style.visibility = "hidden";
      };
    }), (c, i) => (h(), C("div", T, [
      y("div", {
        onClick: i[1] || (i[1] = //@ts-ignore
        (...l) => d(f) && d(f)(...l)),
        id: "imgViewer-modal",
        class: E(["modal", o.value ? "modalShow" : "modalClose"])
      }, [
        y("img", {
          id: "imgViewer-modalImg",
          onDblclick: i[0] || (i[0] = //@ts-ignore
          (...l) => d(w) && d(w)(...l)),
          src: u.value
        }, null, 40, R)
      ], 2),
      x(c.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const $ = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [n, s] of o)
    e[n] = s;
  return e;
}, z = /* @__PURE__ */ $(S, [["__scopeId", "data-v-6130d8f4"]]), H = {
  install: (t) => {
    t.component("ImgViewer", z);
  }
};
export {
  z as ImgViewer,
  H as default
};
