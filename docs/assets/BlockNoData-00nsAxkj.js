import{j as t}from"./index-ClrLQSZE.js";import{B as n}from"./button-KM2B4vHL.js";import{c as i}from"./App-CMlEbArH.js";import"./utils-BHoiX9Iq.js";function u({variant:s,startWeight:a,targetWeight:o}){const r=i(),e={weight:`
        ${a?"начальный вес":""} 
        ${a&&o?"и":""} 
        ${o?"цель":""}
    `,callories:"допустимое количество калорий в день"};return t.jsxs(t.Fragment,{children:[t.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${e[s]}`}),t.jsx(n,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>r("/settings"),children:"Указать"})]})}export{u as default};
