import{j as a}from"./index-1x5LbHdv.js";import{B as n}from"./button-hapViWYP.js";import{a as i}from"./App-Bu1h9DHy.js";import"./utils-CrxeQ0c-.js";function u({variant:s,startWeight:t,targetWeight:o}){const r=i(),e={weight:`
        ${t?"начальный вес":""} 
        ${t&&o?"и":""} 
        ${o?"цель":""}
    `,callories:"допустимое количество калорий в день"};return a.jsxs(a.Fragment,{children:[a.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${e[s]}`}),a.jsx(n,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>r("/settings"),children:"Указать"})]})}export{u as default};
