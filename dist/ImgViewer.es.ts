import { defineComponent as h, ref as y, watch as I, onMounted as C, openBlock as T, createElementBlock as x, createElementVNode as b, unref as u, normalizeClass as B, renderSlot as L } from "vue";
function v(e) {
  const l = e.getBoundingClientRect(), { left: t, top: o, width: s } = l;
  return { left: t, top: o, width: s };
}
function R(e, l) {
  let t;
  return function(...o) {
    clearTimeout(t), t = setTimeout(() => {
      e.apply(this, o);
    }, l);
  };
}
function k(e) {
  console.log(e);
  const { target: l } = e;
  l instanceof HTMLImageElement && console.log("dbclick the img");
}
const $ = { id: "imgViewer" }, z = ["src"], S = /* @__PURE__ */ h({
  __name: "ImgViewer",
  props: {
    scrollTop: null
  },
  setup(e) {
    const l = e, t = y(!1);
    let o, s, f;
    const g = y("");
    let c, d, _;
    function w(r, i) {
      const n = {
        left: c.left - d.left,
        top: c.top - d.top
      };
      let m = [
        // cur-img在的位置
        {
          transform: `translate3d(${n.left}px, ${n.top}px,0) scale(${_})`,
          transformOrigin: "0 0"
        },
        // modal-img的位置
        { transform: "translate(0)" }
      ];
      i === "close" && (m = [m[1], m[0]]);
      const E = {
        duration: 300,
        easing: "cubic-bezier(.2,0,.2,1)"
        // easing: "linear",
      }, V = r.animate(m, E);
      i === "close" && V.addEventListener("finish", () => {
        t.value = !1, g.value = "", p = !0, o.style.visibility = "visible", o.style.transition = "", f.style.backgroundColor = "";
      });
    }
    let p = !0;
    const a = R(function() {
      t.value && p && (p = !1, c = v(o), f.style.backgroundColor = "transparent", w(s, "close"));
    }, 50);
    return I(t, (r) => {
      r && (l.scrollTop ? I(l.scrollTop, a) : window.addEventListener("scroll", a)), r || window.removeEventListener("scroll", a);
    }), C(() => {
      const r = Array.from(document.getElementsByTagName("img")), i = function({ target: n }) {
        o = n, g.value = o.src, c = v(o), t.value = !0;
      };
      r.forEach((n) => {
        n.onload = function() {
          n.style.cursor = "zoom-in", n.addEventListener("click", i);
        };
      }), f = document.getElementById("imgViewer-modal"), s = document.getElementById("imgViewer-modalImg"), s.onload = () => {
        d = v(s), _ = c.width / d.width, w(s, "show"), o.style.visibility = "hidden";
      };
    }), (r, i) => (T(), x("div", $, [
      b("div", {
        onClick: i[1] || (i[1] = //@ts-ignore
        (...n) => u(a) && u(a)(...n)),
        id: "imgViewer-modal",
        class: B(["modal", t.value ? "modalShow" : "modalClose"])
      }, [
        b("img", {
          id: "imgViewer-modalImg",
          onDblclick: i[0] || (i[0] = //@ts-ignore
          (...n) => u(k) && u(k)(...n)),
          src: g.value
        }, null, 40, z)
      ], 2),
      L(r.$slots, "default", {}, void 0, !0)
    ]));
  }
});
const H = (e, l) => {
  const t = e.__vccOpts || e;
  for (const [o, s] of l)
    t[o] = s;
  return t;
}, M = /* @__PURE__ */ H(S, [["__scopeId", "data-v-8f66e5b4"]]), O = {
  install: (e) => {
    e.component("ImgViewer", M);
  }
};
export {
  M as ImgViewer,
  O as default
};
