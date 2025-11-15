import{j as t}from"./index-CQpZQV_-.js";import{B as n}from"./button-CGzcp-Hx.js";import{b as i}from"./App-Da1xnnNH.js";import"./utils-DmUHSM0z.js";function u({variant:s,startWeight:a,targetWeight:o}){const r=i(),e={weight:`
        ${a?"начальный вес":""} 
        ${a&&o?"и":""} 
        ${o?"цель":""}
    `,callories:"допустимое количество калорий в день"};return t.jsxs(t.Fragment,{children:[t.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${e[s]}`}),t.jsx(n,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>r("/settings"),children:"Указать"})]})}export{u as default};
