(function(g,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(g=typeof globalThis<"u"?globalThis:g||self,t(g.ImgViewer={},g.Vue))})(this,function(g,t){"use strict";const C="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjc3NTc1NDg4ODExIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE1MjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk0NCAyOTlINjkyYy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1OS4yYzQuNCAwIDgtMy42IDgtOFY1NDkuOWgxNjguMmM0LjQgMCA4LTMuNiA4LThWNDk1YzAtNC40LTMuNi04LTgtOEg3NTkuMlYzNjQuMkg5NDRjNC40IDAgOC0zLjYgOC04VjMwN2MwLTQuNC0zLjYtOC04LTh6TTU4OCAzMDBoLTU2Yy00LjQgMC04IDMuNi04IDh2NDA2YzAgNC40IDMuNiA4IDggOGg1NmM0LjQgMCA4LTMuNiA4LThWMzA4YzAtNC40LTMuNi04LTgtOHpNNDUyIDUwMC45SDI5MC41Yy00LjQgMC04IDMuNi04IDh2NDMuN2MwIDQuNCAzLjYgOCA4IDhoOTQuOWwtMC4zIDguOWMtMS4yIDU4LjgtNDUuNiA5OC41LTExMC45IDk4LjUtNzYuMiAwLTEyMy45LTU5LjctMTIzLjktMTU2LjcgMC05NS44IDQ2LjgtMTU1LjIgMTIxLjUtMTU1LjIgNTQuOCAwIDkzLjEgMjYuOSAxMDguNSA3NS40aDc2LjJjLTEzLjYtODcuMi04Ni0xNDMuNC0xODQuNy0xNDMuNEMxNTAgMjg4IDcyIDM3NS4yIDcyIDUxMS45IDcyIDY1MC4yIDE0OS4xIDczNiAyNzMgNzM2YzExNC4xIDAgMTg3LTcwLjcgMTg3LTE4MS42di00NS41YzAtNC40LTMuNi04LTgtOHoiIGZpbGw9IiM1MTUxNTEiIHAtaWQ9IjE1MjMiPjwvcGF0aD48L3N2Zz4K";function L(e){const c=e.getBoundingClientRect(),{left:i,top:o,width:l}=c;return{left:i,top:o,width:l}}function h(e,c){let i;return function(...o){clearTimeout(i),i=setTimeout(()=>{e.apply(this,o)},c)}}function w(e){console.log(e);const{target:c}=e;c instanceof HTMLImageElement&&console.log("dbclick the img")}function j(e){e.onload=null;const c=e.src,i=e.width,o=e.height;let l,m=t.ref(!1),u=document.createElement("canvas");u.width=i,u.height=o;const s=u.getContext("2d");s==null||s.drawImage(e,0,0,i,o);const r=document.createElement("img");r.src=C,r.style.backgroundColor="gray";function N(){s==null||s.drawImage(r,(i-70)/2,(o-70)/2,70,70)}r.onload=()=>{N(),l=u.toDataURL("image/gif"),e.src=l};function y(){l&&(e.src=l,m.value=!1)}function M(){e.src=c,m.value=!0}return{stop:y,play:M,isPlay:m}}const z={id:"imgViewer"},A=["src"],E=t.defineComponent({__name:"ImgViewer",props:{scrollTop:null,gifStatic:{type:Boolean}},setup(e){const c=e,i=t.ref(!1);let o,l,m;const u=t.ref("");let s,r,N;function y(a,d){const n={left:s.left-r.left,top:s.top-r.top};let f=[{transform:`translate3d(${n.left}px, ${n.top}px,0) scale(${N})`,transformOrigin:"0 0"},{transform:"translate(0)"}];d==="close"&&(f=[f[1],f[0]]);const D={duration:300,easing:"cubic-bezier(.2,0,.2,1)"},T=a.animate(f,D);d==="close"&&T.addEventListener("finish",()=>{i.value=!1,u.value="",M=!0,o.style.visibility="visible",o.style.transition="",m.style.backgroundColor=""})}let M=!0;const I=h(function(){i.value&&M&&(M=!1,s=L(o),m.style.backgroundColor="transparent",y(l,"close"))},50);return t.watch(i,a=>{a&&(c.scrollTop?t.watch(c.scrollTop,I):window.addEventListener("scroll",I)),a||window.removeEventListener("scroll",I)}),t.onMounted(()=>{const a=Array.from(document.getElementsByTagName("img")),d=function({target:n}){o=n,u.value=o.src,s=L(o),i.value=!0};a.forEach(n=>{n.onload=function(){if(c.gifStatic&&n.src.split(".").pop()==="gif"){n.style.cursor="pointer";const{stop:D,play:T,isPlay:v}=j(n);n.addEventListener("click",()=>{v.value?D():T()});return}n.style.cursor="zoom-in",n.addEventListener("click",d)}}),m=document.getElementById("imgViewer-modal"),l=document.getElementById("imgViewer-modalImg"),l.onload=()=>{r=L(l),N=s.width/r.width,y(l,"show"),o.style.visibility="hidden"}}),(a,d)=>(t.openBlock(),t.createElementBlock("div",z,[t.createElementVNode("div",{onClick:d[1]||(d[1]=(...n)=>t.unref(I)&&t.unref(I)(...n)),id:"imgViewer-modal",class:t.normalizeClass(["modal",i.value?"modalShow":"modalClose"])},[t.createElementVNode("img",{id:"imgViewer-modalImg",onDblclick:d[0]||(d[0]=(...n)=>t.unref(w)&&t.unref(w)(...n)),src:u.value},null,40,A)],2),t.renderSlot(a.$slots,"default",{},void 0,!0)]))}}),O="",p=((e,c)=>{const i=e.__vccOpts||e;for(const[o,l]of c)i[o]=l;return i})(E,[["__scopeId","data-v-a4515fb3"]]),_={install:e=>{e.component("ImgViewer",p)}};g.ImgViewer=p,g.default=_,Object.defineProperties(g,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
