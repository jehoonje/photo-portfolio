"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[213],{6213:(e,r,t)=>{t.r(r),t.d(r,{default:()=>a});var l=t(4848),s=t(6540),c=t(6517);function a(){let e=(0,s.useRef)(null),r=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let l;return t.e(183).then(t.bind(t,4183)).then(t=>{let{ScrollTrigger:s}=t;c.Ay.registerPlugin(s);let a=r.current.querySelectorAll("iframe");c.Ay.set(a,{opacity:0}),(l=c.Ay.timeline({scrollTrigger:{trigger:e.current,start:"top top",end:"+=1500",scrub:!0,pin:!0}})).to(a,{opacity:1,duration:1,stagger:.3}),s.refresh()}),()=>{l&&l.kill(),e.current&&c.Ay.set(e.current,{clearProps:"all"}),ScrollTrigger.getAll().forEach(e=>e.kill())}},[]),(0,l.jsx)("section",{ref:e,id:"articles",className:"relative w-4/5 min-h-screen bg-black flex items-center justify-center",style:{height:"100vh",margin:"0 auto",marginBottom:"200px",borderTop:"4px solid #111a"},children:(0,l.jsxs)("div",{className:"text-center",children:[(0,l.jsx)("h2",{className:"text-3xl md:text-5xl font-bold text-white mb-8",children:"Sets"}),(0,l.jsx)("div",{ref:r,className:"w-[100%] mx-auto bg-black flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5",children:["1831342242","1926103367","1418699092","1629740511","1655524542","1705728921","1726012296","1953712599"].map(e=>(0,l.jsx)("iframe",{className:"md:w-[40%] w-[100%] h-[20px] md:h-[120px]",scrolling:"no",frameBorder:"no",allow:"autoplay",src:"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/".concat(e,"&color=%23ff5500&inverse=true&auto_play=false&show_user=true")},e))})]})})}}}]);