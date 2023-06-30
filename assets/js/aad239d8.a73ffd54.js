"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3554],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(n),m=a,f=u["".concat(l,".").concat(m)]||u[m]||d[m]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8128:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_position:3},o="Create Action Slice",c={unversionedId:"API/create-action-slice",id:"API/create-action-slice",title:"Create Action Slice",description:"This file defines the side effects (async calls) for the components such as making analytics call or updating local storage.",source:"@site/docs/API/create-action-slice.md",sourceDirName:"API",slug:"/API/create-action-slice",permalink:"/redux-rewire/docs/API/create-action-slice",draft:!1,editUrl:"https://github.com/ds-fancode/redux-rewire/blob/main/documentation/docs/API/create-action-slice.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"sidebarAPI",previous:{title:"Create Reducer Slice",permalink:"/redux-rewire/docs/API/create-reducer-slice"},next:{title:"Guides",permalink:"/redux-rewire/docs/category/guides-1"}},l={},s=[{value:"Arguments",id:"arguments",level:2}],p={toc:s},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-action-slice"},"Create Action Slice"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"This file defines the side effects (async calls) for the components such as making analytics call or updating local storage.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="to-do-component.action.ts"',title:'"to-do-component.action.ts"'},'import { createActionSlice } from "redux-rewire";\nimport { reducerSlice } from "./to-do-component.reducer"; // import reducerSlice from file generated in step 2\nexport const actionSlice = createActionSlice(reducerSlice, {\n  mount: async (actionData, otherData: {\n    state: InitialStateType, // Updated state of the component\n    actions: { mount: (data: string) => {}}, // contains all the list of actions\n    reduxKey: string, // component key reference used in the global state\n    globalState: object, // global state\n    prevState: InitialStateType, // component previous state\n  }) => {\n\n    // The following array returned has nothing to do with redux-rewire,\n    // it is application specific\n    const toDoList = await getInitialTodosFromBackend()\n    actions.addInitialToDos(toDoList)\n    return\n  },\n});\n')),(0,a.kt)("h2",{id:"arguments"},"Arguments"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"strong"},"reducerSlice")))),(0,a.kt)("p",null,"Reducer slice returned from ",(0,a.kt)("inlineCode",{parentName:"p"},"createReducerSlice"),". This helps in providing reducers we have defined, so that we can define actions with same name (type-safety)."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Since we believe in composition, we are passing return type of last definition")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("strong",{parentName:"li"},(0,a.kt)("inlineCode",{parentName:"strong"},"actionMap")))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Key value pair, to define async functions of actions"),(0,a.kt)("li",{parentName:"ul"},"Each function provides 2 arguments",(0,a.kt)("ol",{parentName:"li"},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"actionData")," - Type definition of actionData is auto-picked from reducer function we have defined before"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"otherData")," - This contains additional data you may use.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"state")," - This is readonly current state of component, this provides new manipulated state we get from corresponding reducer execution."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"actions")," - This contains list of all possible actions we have defined in our reducer."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"reduxKey")," - This is the final key of the component against which redux has stored this component latest state."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"globalState")," -  This contains whole redux state, we got using ",(0,a.kt)("inlineCode",{parentName:"li"},"getState()")," api of redux."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"prevState")," -  This provides the old state of the component before execution of corresponding reducer.")))))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Since all functions defined here are async we can make any API calls here, and call next reducer function from here itself using ",(0,a.kt)("inlineCode",{parentName:"p"},"actions")," argument we have provided.")))}d.isMDXComponent=!0}}]);