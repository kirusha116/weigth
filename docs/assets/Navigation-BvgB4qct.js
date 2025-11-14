import{c as e,j as s}from"./index-1x5LbHdv.js";import{u as r}from"./index-CitFiVrM.js";import{N as c}from"./App-Bu1h9DHy.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M12 16v5",key:"zza2cw"}],["path",{d:"M16 14v7",key:"1g90b9"}],["path",{d:"M20 10v11",key:"1iqoj0"}],["path",{d:"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15",key:"1fw8x9"}],["path",{d:"M4 18v3",key:"1yp0dc"}],["path",{d:"M8 14v7",key:"n3cwzv"}]],n=e("chart-no-axes-combined",p);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"M12 11h4",key:"1jrz19"}],["path",{d:"M12 16h4",key:"n85exb"}],["path",{d:"M8 11h.01",key:"1dfujw"}],["path",{d:"M8 16h.01",key:"18s6g9"}]],h=e("clipboard-list",u);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3.072",key:"n6s66f"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"m6.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.88.001l-1.846.85a.5.5 0 0 1-.693-.593l1.29-4.88",key:"1e6yvx"}],["circle",{cx:"5",cy:"14",r:"3",key:"ufru5t"}]],l=e("file-badge",y);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],x=e("layout-dashboard",b);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],m=e("settings",g),t={dashboard:"dashboard",tasks:"tasks",awards:"awards",statistics:"statistics",settings:"settings"},k={tasks:"tasks",awards:"awards",dashboard:"dashboard",statistics:"statistics",settings:"settings"},w={[t.dashboard]:"Доска",[t.tasks]:"Задания",[t.awards]:"Награды",[t.statistics]:"Статистика",[t.settings]:"Настройки"},j={[t.dashboard]:s.jsx(x,{}),[t.tasks]:s.jsx(h,{}),[t.awards]:s.jsx(l,{}),[t.statistics]:s.jsx(n,{}),[t.settings]:s.jsx(m,{})},f={[t.dashboard]:s.jsx(x,{className:"size-8"}),[t.tasks]:s.jsx(h,{className:"size-6"}),[t.awards]:s.jsx(l,{className:"size-6"}),[t.statistics]:s.jsx(n,{className:"size-6"}),[t.settings]:s.jsx(m,{className:"size-6"})};function z(){const o=!r("(min-width: 640px)"),d=!r("(min-width: 1024px)");return s.jsxs(s.Fragment,{children:[!o&&s.jsx("nav",{className:"mt-4 z-50",children:Object.values(t).map(a=>s.jsxs(c,{to:`/${a!=="dashboard"?a:""}`,className:({isActive:i})=>i?`flex p-3 ${!d&&"pr-15"} bg-rose-50 rounded-md *:stroke-rose-400 xl:w-auto w-fit`:`flex p-3 ${!d&&"pr-15"} rounded-md xl:w-auto w-fit`,children:[j[a],!d&&s.jsx("p",{className:"ml-3",children:w[a]})]},a))}),o&&s.jsx("nav",{className:"fixed left-0 top-full -translate-y-full flex w-full justify-around pt-3 pb-8 items-end bg-white border-t z-50",children:Object.values(k).map(a=>s.jsx(c,{to:`/${a!=="dashboard"?a:""}`,className:({isActive:i})=>i?"bg-rose-50 rounded-md *:stroke-rose-400":"rounded-md",children:f[a]},a))})]})}export{z as default};
