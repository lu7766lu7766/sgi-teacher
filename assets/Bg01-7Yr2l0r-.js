var D=Object.defineProperty,K=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var C=(r,l,a)=>l in r?D(r,l,{enumerable:!0,configurable:!0,writable:!0,value:a}):r[l]=a,v=(r,l)=>{for(var a in l||(l={}))J.call(l,a)&&C(r,a,l[a]);if(j)for(var a of j(l))U.call(l,a)&&C(r,a,l[a]);return r},V=(r,l)=>K(r,k(l));import{d as B,u as T,s as A,c as E,o as F,a as M,b as _,e as h,t as P,w as $,v as G,r as R,f as w,F as q,g as z}from"./index-6WLbK_HC.js";const H="/sgi-teacher/bg_01.jpg";var L=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{};function Q(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var N={exports:{}};(function(r,l){(function(a,p){r.exports=p()})(L,()=>(()=>{var a={d:(o,t)=>{for(var n in t)a.o(t,n)&&!a.o(o,n)&&Object.defineProperty(o,n,{enumerable:!0,get:t[n]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t)},p={};a.d(p,{default:()=>x});const u=(...o)=>{},f=o=>o!==null&&(o==null?void 0:o.constructor.name)==="Object";let g,s;const y=()=>{if(!g){g=!0;try{s=m.storage||localStorage,s.getItem("")}catch(o){s=(()=>{const t={getItem:e=>n[e]||null,setItem:(e,c)=>{n[e]=c},removeItem:e=>{n[e]=void 0},clear:()=>{n={__proto__:t}}};let n={__proto__:t};return n})()}S()}},d="\0",O=(o,t,n=!0)=>n?[...JSON.stringify(o)].map(e=>String.fromCharCode(e.charCodeAt(0)+t)).join(""):JSON.parse([...o].map(e=>String.fromCharCode(e.charCodeAt(0)-t)).join("")),m={ttl:null,encrypt:!1,encrypter:O,decrypter:(o,t)=>O(o,t,!1),secret:75,storage:void 0};Object.seal(m);const S=(o=!1)=>{y();for(const t of Object.keys(s)){const n=s.getItem(t);let e;try{e=JSON.parse(n||"")}catch(c){continue}f(e)&&d in e&&(Date.now()>e.ttl||o)&&s.removeItem(t)}},x={config:m,set:(o,t,n={})=>{y();const e=V(v(v({},m),n),{encrypt:n.encrypt!==!1&&(n.encrypt||m.encrypt),ttl:n.ttl===null?null:n.ttl||m.ttl});try{const c=e.ttl&&!isNaN(e.ttl)&&e.ttl>0;let i=c?{[d]:t,ttl:Date.now()+1e3*e.ttl}:t;e.encrypt&&(c?i[d]=(e.encrypter||u)(i[d],e.secret):i=(e.encrypter||u)(i,e.secret)),s.setItem(o,JSON.stringify(i))}catch(c){return!1}},get:(o,t={})=>{y();const n=s.getItem(o),e=V(v(v({},m),t),{encrypt:t.encrypt!==!1&&(t.encrypt||m.encrypt),ttl:t.ttl===null?null:t.ttl||m.ttl});let c,i;try{c=JSON.parse(n||""),i=f(c)&&d in c,(e.decrypt||e.encrypt)&&(i?c[d]=(e.decrypter||u)(c[d],e.secret):c=(e.decrypter||u)(c,e.secret))}catch(Z){}return i?Date.now()>c.ttl?(s.removeItem(o),null):c[d]:c!==void 0?c:n},flush:S,clear:()=>{y(),s.clear()},remove:o=>{y(),s.removeItem(o)}};return p.default})())})(N);var W=N.exports;const I=Q(W),X={key:0,class:"absolute break-all -mt-2"},b=B({__name:"InputArea",props:{modelValue:{},lsKey:{}},emits:["update:modelValue"],setup(r,{emit:l}){const a=T(),{isConverting:p}=A(a),u=r,f=l,g=E({get(){return u.modelValue},set(s){I.set(u.lsKey,s),f("update:modelValue",s)}});return F(()=>{const s=I.get(u.lsKey);s&&f("update:modelValue",s)}),(s,y)=>M(p)?(_(),h("div",X,P(u.modelValue),1)):$((_(),h("textarea",{key:1,class:"input-area absolute",placeholder:"點我開始輸入","onUpdate:modelValue":y[0]||(y[0]=d=>g.value=d)},null,512)),[[G,g.value]])}}),Y=z("img",{src:H,class:"w-full"},null,-1),le={__name:"Bg01",setup(r){const l=R({note1:"",note2:"",note3:"",note4:""});return(a,p)=>(_(),h(q,null,[Y,w(b,{class:"left-[2vw] top-[46vw] w-[43vw] h-[35vw]",placeholder:"點我開始輸入",lsKey:"bg01-01",modelValue:l.note1,"onUpdate:modelValue":p[0]||(p[0]=u=>l.note1=u)},null,8,["modelValue"]),w(b,{class:"left-[52vw] top-[57vw] w-[47vw] h-[33vw]",placeholder:"點我開始輸入",lsKey:"bg01-02",modelValue:l.note2,"onUpdate:modelValue":p[1]||(p[1]=u=>l.note2=u)},null,8,["modelValue"]),w(b,{class:"left-[2vw] top-[96vw] w-[38vw] h-[43vw]",placeholder:"點我開始輸入",lsKey:"bg01-03",modelValue:l.note3,"onUpdate:modelValue":p[2]||(p[2]=u=>l.note3=u)},null,8,["modelValue"]),w(b,{class:"left-[47vw] top-[104vw] w-[52vw] h-[36vw]",placeholder:"點我開始輸入",lsKey:"bg01-04",modelValue:l.note4,"onUpdate:modelValue":p[3]||(p[3]=u=>l.note4=u)},null,8,["modelValue"])],64))}};export{le as default};
