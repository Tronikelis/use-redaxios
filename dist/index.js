import{jsx as t}from"react/jsx-runtime";import{createContext as o,useContext as r,useState as e}from"react";import a from"redaxios";import{merge as i}from"merge-anything";import{dequal as n}from"dequal";import{useCustomCompareEffect as s}from"use-custom-compare";import c from"quick-lru";const u=o({options:{axios:a.defaults}});function l({options:o,children:r}){return t(u.Provider,Object.assign({value:{options:o}},{children:r}),void 0)}const p=new c({maxSize:500,maxAge:36e5});function d(t,o={},c){var l;const{options:d}=r(u),[m,v]=e(null!==(l=p.get({url:t,relativeUrl:"",options:{defaults:d,options:o},type:"get"}))&&void 0!==l?l:void 0),[f,y]=e(!!c),[g,x]=e(void 0),h=async(r,e,s)=>{var c,u;const l=p.get({url:t,relativeUrl:e,options:{defaults:d,options:o},type:r});l?(v(l),y(!1)):y(!0);const m=i(d,o);m.axios=(null===(c=m.interceptors)||void 0===c?void 0:c.request)?await m.interceptors.request(null!==(u=m.axios)&&void 0!==u?u:{}):m.axios;const[f,g]=await async function(t){try{return[await t,!1]}catch(t){return[t,!0]}}(a({url:t+e,method:r,data:s,...m.axios}));return g?(x(f),h=f,m.onError&&m.onError(h),void y(!1)):(n(f.data,l)||(p.set({url:t,relativeUrl:e,options:{defaults:d,options:o},type:r},f.data),v(f.data)),x(void 0),(t=>{m.onSuccess&&m.onSuccess(t)})(f.data),y(!1),f.data);var h};s((()=>{Array.isArray(c)&&h("get","")}),[...null!=c?c:[]],n);return{data:m,loading:f,error:g,get:async(t="")=>h("get",t),post:async(t="",o)=>h("post",t,o),del:async(t="")=>h("delete",t),put:async(t="",o)=>h("put",t,o),patch:async(t="",o)=>h("patch",t,o)}}export{l as RedaxiosProvider,d as useRedaxios};
