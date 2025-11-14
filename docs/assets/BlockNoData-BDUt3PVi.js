import{j as a}from"./index-BqqngPVJ.js";import{B as n}from"./button-BySoKPv9.js";import{a as i}from"./App-CbfVrafC.js";import"./utils-DTHjeje5.js";function u({variant:s,startWeight:t,targetWeight:o}){const r=i(),e={weight:`
        ${t?"начальный вес":""} 
        ${t&&o?"и":""} 
        ${o?"цель":""}
    `,callories:"допустимое количество калорий в день"};return a.jsxs(a.Fragment,{children:[a.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${e[s]}`}),a.jsx(n,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>r("/settings"),children:"Указать"})]})}export{u as default};
