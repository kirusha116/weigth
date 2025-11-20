import{j as e,r as c,q as d,k as u,w as h,l as m,f as x,m as f,n as g}from"./index-CMFhOMCn.js";import{c as n}from"./App-Blfn8m0Q.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=[["path",{d:"M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z",key:"1eaqc3"}]],y=n("arrow-big-down",p);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z",key:"lh0v7k"}]],w=n("arrow-big-up",j);/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M5 12h14",key:"1ays0h"}]],N=n("minus",b);function k(){return e.jsx("h1",{className:"text-2xl mb-6",children:e.jsx("b",{children:"Статистика"})})}function v(){const[i,l]=c.useState();return c.useEffect(()=>{async function r(){const s=[],a=d(m(f,x.currentUser?.uid),h("timestamp","!=","undefined"),u("timestamp"));(await g(a)).forEach(t=>s.push(t.data())),l(s)}r()}),e.jsxs(e.Fragment,{children:[e.jsx(k,{}),e.jsx("ul",{className:"flex flex-col-reverse",children:i?.map((r,s,a)=>{const o=(t=>!t||r.currentWeight===a[t-1].currentWeight?()=>e.jsx(N,{className:"stroke-gray-400 fill-gray-400 "}):r.currentWeight>a[t-1].currentWeight?()=>e.jsx(w,{className:"stroke-red-300 fill-red-300"}):()=>e.jsx(y,{className:"stroke-green-300 fill-green-300"}))(s);return e.jsxs("li",{className:"flex mb-1 items-center rounded-lg bg-white border shadow-xs px-3 py-2 relative w-full",children:[e.jsx("div",{className:"h-8 rounded-md aspect-square border-rose-300 border-2 mr-4 flex justify-center items-center",children:o()}),e.jsx("p",{children:e.jsx("b",{children:new Date(r.lastDateOfLoad).toLocaleDateString("ru-RU",{day:"numeric",month:"long",year:"numeric"})})}),e.jsx("div",{className:"grow"}),e.jsx("p",{children:e.jsx("b",{children:`${r.currentWeight?.toString()}${r.currentWeight%1?"":".0"} кг`})})]},r.lastDateOfLoad)})})]})}export{v as default};
