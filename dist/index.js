import{createContext as t,useContext as o,useState as i}from"react";import n from"redaxios";import{merge as r}from"merge-anything";import{dequal as e}from"dequal";import{useCustomCompareEffect as u}from"use-custom-compare";import{jsx as c}from"react/jsx-runtime";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function d(t,o,i,n){return new(i||(i=Promise))((function(r,e){function u(t){try{d(n.next(t))}catch(t){e(t)}}function c(t){try{d(n.throw(t))}catch(t){e(t)}}function d(t){var o;t.done?r(t.value):(o=t.value,o instanceof i?o:new i((function(t){t(o)}))).then(u,c)}d((n=n.apply(t,o||[])).next())}))}const s=t({options:{axios:n.defaults}});function a({options:t,children:o}){return c(s.Provider,Object.assign({value:{options:t}},{children:o}),void 0)}function l(t,c={},a){const{options:l}=o(s),[v,f]=i({}),[p,h]=i(!!a),[m,y]=i(null),x=(o,i,e)=>d(this,void 0,void 0,(function*(){var u,s;const a=r(l,c);h(!0),a.axios=(null===(u=a.interceptors)||void 0===u?void 0:u.request)?yield a.interceptors.request(null!==(s=a.axios)&&void 0!==s?s:{}):a.axios;const[v,p]=yield function(t){return d(this,void 0,void 0,(function*(){try{return[yield t,!1]}catch(t){return[t,!0]}}))}(n(Object.assign({url:t+i,method:o,data:e},a.axios)));return p?(y(v),m=v,a.onError&&a.onError(m),void h(!1)):(f(v.data),y(null),(t=>{a.onSuccess&&a.onSuccess(t)})(v.data),h(!1),v.data);var m}));u((()=>{Array.isArray(a)&&x("get","")}),[...null!=a?a:[]],e);return{data:v,loading:p,error:m,get:(t="")=>d(this,void 0,void 0,(function*(){return yield x("get",t)})),post:(t="",o)=>d(this,void 0,void 0,(function*(){return yield x("post",t,o)})),del:(t="")=>d(this,void 0,void 0,(function*(){return yield x("delete",t)})),put:(t="",o)=>d(this,void 0,void 0,(function*(){return yield x("put",t,o)})),patch:(t="",o)=>d(this,void 0,void 0,(function*(){return yield x("patch",t,o)}))}}export{a as RedaxiosProvider,l as useRedaxios};
