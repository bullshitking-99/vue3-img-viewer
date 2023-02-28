(function(c,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(c=typeof globalThis<"u"?globalThis:c||self,e(c.ImgViewer={},c.Vue))})(this,function(c,e){"use strict";function g(t){const i=t.getBoundingClientRect(),{left:o,top:n,width:s}=i;return{left:o,top:n,width:s}}function h(t,i){let o;return function(...n){clearTimeout(o),o=setTimeout(()=>{t.apply(this,n)},i)}}function y(t){console.log(t);const{target:i}=t;i instanceof HTMLImageElement&&console.log("dbclick the img")}const v={id:"imgViewer"},E=["src"],k=e.defineComponent({__name:"ImgViewer",props:{scrollTop:null},setup(t){const i=t,o=e.ref(!1);let n,s,p;const _=e.ref("");let d,f,b;function V(a,r){const l={left:d.left-f.left,top:d.top-f.top};let u=[{transform:`translate3d(${l.left}px, ${l.top}px,0) scale(${b})`,transformOrigin:"0 0"},{transform:"translate(0)"}];r==="close"&&(u=[u[1],u[0]]);const C={duration:300,easing:"cubic-bezier(.2,0,.2,1)"},x=a.animate(u,C);r==="close"&&x.addEventListener("finish",()=>{o.value=!1,_.value="",w=!0,n.style.visibility="visible",n.style.transition="",p.style.backgroundColor=""})}let w=!0;const m=h(function(){o.value&&w&&(w=!1,d=g(n),p.style.backgroundColor="transparent",V(s,"close"))},50);return e.watch(o,a=>{a&&(i.scrollTop?e.watch(i.scrollTop,m):window.addEventListener("scroll",m)),a||window.removeEventListener("scroll",m)}),e.onMounted(()=>{const a=Array.from(document.getElementsByTagName("img")),r=function({target:l}){n=l,_.value=n.src,d=g(n),o.value=!0};a.forEach(l=>{l.onload=function(){l.style.cursor="zoom-in",l.addEventListener("click",r)}}),p=document.getElementById("imgViewer-modal"),s=document.getElementById("imgViewer-modalImg"),s.onload=()=>{f=g(s),b=d.width/f.width,V(s,"show"),n.style.visibility="hidden"}}),(a,r)=>(e.openBlock(),e.createElementBlock("div",v,[e.createElementVNode("div",{onClick:r[1]||(r[1]=(...l)=>e.unref(m)&&e.unref(m)(...l)),id:"imgViewer-modal",class:e.normalizeClass(["modal",o.value?"modalShow":"modalClose"])},[e.createElementVNode("img",{id:"imgViewer-modalImg",onDblclick:r[0]||(r[0]=(...l)=>e.unref(y)&&e.unref(y)(...l)),src:_.value},null,40,E)],2),e.renderSlot(a.$slots,"default",{},void 0,!0)]))}}),B="",I=((t,i)=>{const o=t.__vccOpts||t;for(const[n,s]of i)o[n]=s;return o})(k,[["__scopeId","data-v-8f66e5b4"]]),T={install:t=>{t.component("ImgViewer",I)}};c.ImgViewer=I,c.default=T,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
