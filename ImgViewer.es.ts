import { defineComponent as V, ref as v, onMounted as b, openBlock as k, createElementBlock as C, createElementVNode as y, unref as w, normalizeClass as E, renderSlot as x } from "vue";
const B = { id: "imgViewer" }, R = ["src"], S = /* @__PURE__ */ V({
  __name: "ImgViewer",
  setup(r) {
    const s = v(!1);
    let o, i, a;
    const m = v("");
    let c, d, p;
    function u(n) {
      const t = n.getBoundingClientRect(), { left: e, top: l, width: g } = t;
      return { left: e, top: l, width: g };
    }
    function _(n, t) {
      const e = {
        left: c.left - d.left,
        top: c.top - d.top
      };
      let l = [
        // cur-img在的位置
        {
          transform: `translate3d(${e.left}px, ${e.top}px,0) scale(${p})`,
          transformOrigin: "0 0"
        },
        // modal-img的位置
        { transform: "translate(0)" }
      ];
      t === "close" && (l = [l[1], l[0]]);
      const g = {
        duration: 300,
        easing: "cubic-bezier(.2,0,.2,1)"
        // easing: "linear",
      }, h = n.animate(l, g);
      t === "close" && h.addEventListener("finish", () => {
        s.value = !1, m.value = "", o.style.visibility = "visible", o.style.transition = "", a.style.backgroundColor = "";
      });
    }
    const f = I(function() {
      s.value && (c = u(o), a.style.backgroundColor = "transparent", _(i, "close"));
    }, 0);
    window.onscroll = f, b(() => {
      const n = Array.from(document.getElementsByTagName("img")), t = function({ target: e }) {
        o = e, m.value = o.src, c = u(o), s.value = !0;
      };
      n.forEach((e) => {
        e.style.cursor = "zoom-in", e.addEventListener("click", t);
      }), a = document.getElementById("imgViewer-modal"), i = document.getElementById("imgViewer-modalImg"), i.onload = () => {
        d = u(i), p = c.width / d.width, _(i, "show"), o.style.visibility = "hidden";
      };
    });
    function I(n, t) {
      let e;
      return function(...l) {
        clearTimeout(e), e = setTimeout(() => {
          n.apply(this, l);
        }, t);
      };
    }
    return (n, t) => (k(), C("div", B, [
      y("div", {
        onClick: t[0] || (t[0] = //@ts-ignore
        (...e) => w(f) && w(f)(...e)),
        id: "imgViewer-modal",
        class: E(["modal", s.value ? "modalShow" : "modalClose"])
      }, [
        y("img", {
          id: "imgViewer-modalImg",
          src: m.value
        }, null, 8, R)
      ], 2),
      x(n.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const T = (r, s) => {
  const o = r.__vccOpts || r;
  for (const [i, a] of s)
    o[i] = a;
  return o;
}, $ = /* @__PURE__ */ T(S, [["__scopeId", "data-v-e5fb20d5"]]), L = {
  install: (r) => {
    r.component("ImgViewer", $);
  }
};
export {
  $ as ImgViewer,
  L as default
};
