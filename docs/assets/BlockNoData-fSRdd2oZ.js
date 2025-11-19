import{j as a}from"./index-Dsi6zhP-.js";import{a as r,B as i}from"./App-SCCq2xCo.js";function m({variant:e,startWeight:s,targetWeight:t}){const n=r(),o={weight:`
        ${s?"начальный вес":""} 
        ${s&&t?"и":""} 
        ${t?"цель":""}
    `,callories:"допустимое количество калорий в день"};return a.jsxs(a.Fragment,{children:[a.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${o[e]}`}),a.jsx(i,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>n("/settings"),children:"Указать"})]})}export{m as default};
