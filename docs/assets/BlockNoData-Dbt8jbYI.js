import{j as t}from"./index-B2AH5Xp-.js";import{B as n}from"./button-Duuf_EL1.js";import{u as i}from"./App-BfFn9QIi.js";import"./utils-USqDSMMR.js";function u({variant:s,startWeigth:a,targetWeigth:o}){const r=i(),e={weigth:`
        ${a?"начальный вес":""} 
        ${a&&o?"и":""} 
        ${o?"цель":""}
    `,callories:"допустимое количество калорий в день"};return t.jsxs(t.Fragment,{children:[t.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${e[s]}`}),t.jsx(n,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>r("/settings"),children:"Указать"})]})}export{u as default};
