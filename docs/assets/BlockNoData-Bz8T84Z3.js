import{j as a}from"./index-BkRbLbe9.js";import{a as r,B as i}from"./App-DmoP9taw.js";import"./warningToast-F5LWFs5h.js";function p({variant:o,startWeight:s,targetWeight:t}){const e=r(),n={weight:`
        ${s?"начальный вес":""} 
        ${s&&t?"и":""} 
        ${t?"цель":""}
    `,callories:"допустимое количество калорий в день"};return a.jsxs(a.Fragment,{children:[a.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${n[o]}`}),a.jsx(i,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>e("/settings"),children:"Указать"})]})}export{p as default};
