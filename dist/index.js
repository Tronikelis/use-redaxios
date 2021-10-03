import{jsx as o}from"react/jsx-runtime";import{createContext as t,useContext as r,useState as a}from"react";import n from"redaxios";import{merge as e}from"merge-anything";import{dequal as i}from"dequal";import{useCustomCompareEffect as s}from"use-custom-compare";import c from"lru-cache";const u=t({options:{axios:n.defaults}});function l({options:t,children:r}){return o(u.Provider,Object.assign({value:{options:t}},{children:r}),void 0)}const d=new c({max:500,maxAge:36e5});function m(o,t={},c){const{options:l}=r(u),[m,p]=a(null),[v,x]=a(!!c),[f,y]=a(null),g=async(r,a,s)=>{var c,u,m,v;x(!0);const f=e(l,t),g=d.get(o+(null===(c=f.axios)||void 0===c?void 0:c.url)+r);g&&(p(g),x(!1));f.axios=(null===(u=f.interceptors)||void 0===u?void 0:u.request)?await f.interceptors.request(null!==(m=f.axios)&&void 0!==m?m:{}):f.axios;const[h,w]=await async function(o){try{return[await o,!1]}catch(o){return[o,!0]}}(n({url:o+a,method:r,data:s,...f.axios}));return w?(y(h),q=h,f.onError&&f.onError(q),void x(!1)):(i(h.data,g)||(d.set(o+(null===(v=f.axios)||void 0===v?void 0:v.url)+r,h.data),p(h.data)),y(null),(o=>{f.onSuccess&&f.onSuccess(o)})(h.data),x(!1),h.data);var q};s((()=>{Array.isArray(c)&&g("get","")}),[...null!=c?c:[]],i);return{data:m,loading:v,error:f,get:async(o="")=>g("get",o),post:async(o="",t)=>g("post",o,t),del:async(o="")=>g("delete",o),put:async(o="",t)=>g("put",o,t),patch:async(o="",t)=>g("patch",o,t)}}export{l as RedaxiosProvider,m as useRedaxios};
