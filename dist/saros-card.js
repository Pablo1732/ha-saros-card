var X=globalThis,J=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e1=Symbol(),y1=new WeakMap,N=class{constructor(V,C,H){if(this._$cssResult$=!0,H!==e1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=V,this.t=C}get styleSheet(){let V=this.o,C=this.t;if(J&&V===void 0){let H=C!==void 0&&C.length===1;H&&(V=y1.get(C)),V===void 0&&((this.o=V=new CSSStyleSheet).replaceSync(this.cssText),H&&y1.set(C,V))}return V}toString(){return this.cssText}},w1=e=>new N(typeof e=="string"?e:e+"",void 0,e1),$=(e,...V)=>{let C=e.length===1?e[0]:V.reduce((H,L,M)=>H+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(L)+e[M+1],e[0]);return new N(C,e,e1)},B1=(e,V)=>{if(J)e.adoptedStyleSheets=V.map(C=>C instanceof CSSStyleSheet?C:C.styleSheet);else for(let C of V){let H=document.createElement("style"),L=X.litNonce;L!==void 0&&H.setAttribute("nonce",L),H.textContent=C.cssText,e.appendChild(H)}},t1=J?e=>e:e=>e instanceof CSSStyleSheet?(V=>{let C="";for(let H of V.cssRules)C+=H.cssText;return w1(C)})(e):e;var{is:d5,defineProperty:p5,getOwnPropertyDescriptor:m5,getOwnPropertyNames:n5,getOwnPropertySymbols:l5,getPrototypeOf:v5}=Object,O=globalThis,P1=O.trustedTypes,x5=P1?P1.emptyScript:"",i1=O.reactiveElementPolyfillSupport,I=(e,V)=>e,o1={toAttribute(e,V){switch(V){case Boolean:e=e?x5:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,V){let C=e;switch(V){case Boolean:C=e!==null;break;case Number:C=e===null?null:Number(e);break;case Object:case Array:try{C=JSON.parse(e)}catch{C=null}}return C}},D1=(e,V)=>!d5(e,V),T1={attribute:!0,type:String,converter:o1,reflect:!1,useDefault:!1,hasChanged:D1},F1,R1;(F1=Symbol.metadata)!=null||(Symbol.metadata=Symbol("metadata")),(R1=O.litPropertyMetadata)!=null||(O.litPropertyMetadata=new WeakMap);var h=class extends HTMLElement{static addInitializer(V){var C;this._$Ei(),((C=this.l)!=null?C:this.l=[]).push(V)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(V,C=T1){if(C.state&&(C.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(V)&&((C=Object.create(C)).wrapped=!0),this.elementProperties.set(V,C),!C.noAccessor){let H=Symbol(),L=this.getPropertyDescriptor(V,H,C);L!==void 0&&p5(this.prototype,V,L)}}static getPropertyDescriptor(V,C,H){var r;let{get:L,set:M}=(r=m5(this.prototype,V))!=null?r:{get(){return this[C]},set(i){this[C]=i}};return{get:L,set(i){let t=L==null?void 0:L.call(this);M==null||M.call(this,i),this.requestUpdate(V,t,H)},configurable:!0,enumerable:!0}}static getPropertyOptions(V){var C;return(C=this.elementProperties.get(V))!=null?C:T1}static _$Ei(){if(this.hasOwnProperty(I("elementProperties")))return;let V=v5(this);V.finalize(),V.l!==void 0&&(this.l=[...V.l]),this.elementProperties=new Map(V.elementProperties)}static finalize(){if(this.hasOwnProperty(I("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(I("properties"))){let C=this.properties,H=[...n5(C),...l5(C)];for(let L of H)this.createProperty(L,C[L])}let V=this[Symbol.metadata];if(V!==null){let C=litPropertyMetadata.get(V);if(C!==void 0)for(let[H,L]of C)this.elementProperties.set(H,L)}this._$Eh=new Map;for(let[C,H]of this.elementProperties){let L=this._$Eu(C,H);L!==void 0&&this._$Eh.set(L,C)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(V){let C=[];if(Array.isArray(V)){let H=new Set(V.flat(1/0).reverse());for(let L of H)C.unshift(t1(L))}else V!==void 0&&C.push(t1(V));return C}static _$Eu(V,C){let H=C.attribute;return H===!1?void 0:typeof H=="string"?H:typeof V=="string"?V.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var V;this._$ES=new Promise(C=>this.enableUpdating=C),this._$AL=new Map,this._$E_(),this.requestUpdate(),(V=this.constructor.l)==null||V.forEach(C=>C(this))}addController(V){var C,H;((C=this._$EO)!=null?C:this._$EO=new Set).add(V),this.renderRoot!==void 0&&this.isConnected&&((H=V.hostConnected)==null||H.call(V))}removeController(V){var C;(C=this._$EO)==null||C.delete(V)}_$E_(){let V=new Map,C=this.constructor.elementProperties;for(let H of C.keys())this.hasOwnProperty(H)&&(V.set(H,this[H]),delete this[H]);V.size>0&&(this._$Ep=V)}createRenderRoot(){var C;let V=(C=this.shadowRoot)!=null?C:this.attachShadow(this.constructor.shadowRootOptions);return B1(V,this.constructor.elementStyles),V}connectedCallback(){var V,C;(V=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(C=this._$EO)==null||C.forEach(H=>{var L;return(L=H.hostConnected)==null?void 0:L.call(H)})}enableUpdating(V){}disconnectedCallback(){var V;(V=this._$EO)==null||V.forEach(C=>{var H;return(H=C.hostDisconnected)==null?void 0:H.call(C)})}attributeChangedCallback(V,C,H){this._$AK(V,H)}_$ET(V,C){var M;let H=this.constructor.elementProperties.get(V),L=this.constructor._$Eu(V,H);if(L!==void 0&&H.reflect===!0){let r=(((M=H.converter)==null?void 0:M.toAttribute)!==void 0?H.converter:o1).toAttribute(C,H.type);this._$Em=V,r==null?this.removeAttribute(L):this.setAttribute(L,r),this._$Em=null}}_$AK(V,C){var M,r,i;let H=this.constructor,L=H._$Eh.get(V);if(L!==void 0&&this._$Em!==L){let t=H.getPropertyOptions(L),A=typeof t.converter=="function"?{fromAttribute:t.converter}:((M=t.converter)==null?void 0:M.fromAttribute)!==void 0?t.converter:o1;this._$Em=L;let a=A.fromAttribute(C,t.type);this[L]=(i=a!=null?a:(r=this._$Ej)==null?void 0:r.get(L))!=null?i:a,this._$Em=null}}requestUpdate(V,C,H,L=!1,M){var r,i;if(V!==void 0){let t=this.constructor;if(L===!1&&(M=this[V]),H!=null||(H=t.getPropertyOptions(V)),!(((r=H.hasChanged)!=null?r:D1)(M,C)||H.useDefault&&H.reflect&&M===((i=this._$Ej)==null?void 0:i.get(V))&&!this.hasAttribute(t._$Eu(V,H))))return;this.C(V,C,H)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(V,C,{useDefault:H,reflect:L,wrapped:M},r){var i,t,A;H&&!((i=this._$Ej)!=null?i:this._$Ej=new Map).has(V)&&(this._$Ej.set(V,(t=r!=null?r:C)!=null?t:this[V]),M!==!0||r!==void 0)||(this._$AL.has(V)||(this.hasUpdated||H||(C=void 0),this._$AL.set(V,C)),L===!0&&this._$Em!==V&&((A=this._$Eq)!=null?A:this._$Eq=new Set).add(V))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(C){Promise.reject(C)}let V=this.scheduleUpdate();return V!=null&&await V,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var H,L;if(!this.isUpdatePending)return;if(!this.hasUpdated){if((H=this.renderRoot)!=null||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[r,i]of this._$Ep)this[r]=i;this._$Ep=void 0}let M=this.constructor.elementProperties;if(M.size>0)for(let[r,i]of M){let{wrapped:t}=i,A=this[r];t!==!0||this._$AL.has(r)||A===void 0||this.C(r,void 0,i,A)}}let V=!1,C=this._$AL;try{V=this.shouldUpdate(C),V?(this.willUpdate(C),(L=this._$EO)==null||L.forEach(M=>{var r;return(r=M.hostUpdate)==null?void 0:r.call(M)}),this.update(C)):this._$EM()}catch(M){throw V=!1,this._$EM(),M}V&&this._$AE(C)}willUpdate(V){}_$AE(V){var C;(C=this._$EO)==null||C.forEach(H=>{var L;return(L=H.hostUpdated)==null?void 0:L.call(H)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(V)),this.updated(V)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(V){return!0}update(V){this._$Eq&&(this._$Eq=this._$Eq.forEach(C=>this._$ET(C,this[C]))),this._$EM()}updated(V){}firstUpdated(V){}},_1;h.elementStyles=[],h.shadowRootOptions={mode:"open"},h[I("elementProperties")]=new Map,h[I("finalized")]=new Map,i1==null||i1({ReactiveElement:h}),((_1=O.reactiveElementVersions)!=null?_1:O.reactiveElementVersions=[]).push("2.1.2");var G=globalThis,E1=e=>e,C1=G.trustedTypes,W1=C1?C1.createPolicy("lit-html",{createHTML:e=>e}):void 0,Q1="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,K1="?"+g,Z5=`<${K1}>`,B=document,U=()=>B.createComment(""),Q=e=>e===null||typeof e!="object"&&typeof e!="function",v1=Array.isArray,s5=e=>v1(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",A1=`[ 	
\f\r]`,z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N1=/-->/g,$1=/>/g,y=RegExp(`>|${A1}(?:([^\\s"'>=/]+)(${A1}*=${A1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),I1=/'/g,z1=/"/g,q1=/^(?:script|style|textarea|title)$/i,x1=e=>(V,...C)=>({_$litType$:e,strings:V,values:C}),m=x1(1),H1=x1(2),T5=x1(3),P=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),G1=new WeakMap,w=B.createTreeWalker(B,129);function j1(e,V){if(!v1(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return W1!==void 0?W1.createHTML(V):V}var u5=(e,V)=>{let C=e.length-1,H=[],L,M=V===2?"<svg>":V===3?"<math>":"",r=z;for(let i=0;i<C;i++){let t=e[i],A,a,p=-1,n=0;for(;n<t.length&&(r.lastIndex=n,a=r.exec(t),a!==null);)n=r.lastIndex,r===z?a[1]==="!--"?r=N1:a[1]!==void 0?r=$1:a[2]!==void 0?(q1.test(a[2])&&(L=RegExp("</"+a[2],"g")),r=y):a[3]!==void 0&&(r=y):r===y?a[0]===">"?(r=L!=null?L:z,p=-1):a[1]===void 0?p=-2:(p=r.lastIndex-a[2].length,A=a[1],r=a[3]===void 0?y:a[3]==='"'?z1:I1):r===z1||r===I1?r=y:r===N1||r===$1?r=z:(r=y,L=void 0);let l=r===y&&e[i+1].startsWith("/>")?" ":"";M+=r===z?t+Z5:p>=0?(H.push(A),t.slice(0,p)+Q1+t.slice(p)+g+l):t+g+(p===-2?i:l)}return[j1(e,M+(e[C]||"<?>")+(V===2?"</svg>":V===3?"</math>":"")),H]},K=class e{constructor({strings:V,_$litType$:C},H){let L;this.parts=[];let M=0,r=0,i=V.length-1,t=this.parts,[A,a]=u5(V,C);if(this.el=e.createElement(A,H),w.currentNode=this.el.content,C===2||C===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(L=w.nextNode())!==null&&t.length<i;){if(L.nodeType===1){if(L.hasAttributes())for(let p of L.getAttributeNames())if(p.endsWith(Q1)){let n=a[r++],l=L.getAttribute(p).split(g),o=/([.?@])?(.*)/.exec(n);t.push({type:1,index:M,name:o[2],strings:l,ctor:o[1]==="."?p1:o[1]==="?"?m1:o[1]==="@"?n1:R}),L.removeAttribute(p)}else p.startsWith(g)&&(t.push({type:6,index:M}),L.removeAttribute(p));if(q1.test(L.tagName)){let p=L.textContent.split(g),n=p.length-1;if(n>0){L.textContent=C1?C1.emptyScript:"";for(let l=0;l<n;l++)L.append(p[l],U()),w.nextNode(),t.push({type:2,index:++M});L.append(p[n],U())}}}else if(L.nodeType===8)if(L.data===K1)t.push({type:2,index:M});else{let p=-1;for(;(p=L.data.indexOf(g,p+1))!==-1;)t.push({type:7,index:M}),p+=g.length-1}M++}}static createElement(V,C){let H=B.createElement("template");return H.innerHTML=V,H}};function F(e,V,C=e,H){var r,i,t;if(V===P)return V;let L=H!==void 0?(r=C._$Co)==null?void 0:r[H]:C._$Cl,M=Q(V)?void 0:V._$litDirective$;return(L==null?void 0:L.constructor)!==M&&((i=L==null?void 0:L._$AO)==null||i.call(L,!1),M===void 0?L=void 0:(L=new M(e),L._$AT(e,C,H)),H!==void 0?((t=C._$Co)!=null?t:C._$Co=[])[H]=L:C._$Cl=L),L!==void 0&&(V=F(e,L._$AS(e,V.values),L,H)),V}var d1=class{constructor(V,C){this._$AV=[],this._$AN=void 0,this._$AD=V,this._$AM=C}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(V){var A;let{el:{content:C},parts:H}=this._$AD,L=((A=V==null?void 0:V.creationScope)!=null?A:B).importNode(C,!0);w.currentNode=L;let M=w.nextNode(),r=0,i=0,t=H[0];for(;t!==void 0;){if(r===t.index){let a;t.type===2?a=new q(M,M.nextSibling,this,V):t.type===1?a=new t.ctor(M,t.name,t.strings,this,V):t.type===6&&(a=new l1(M,this,V)),this._$AV.push(a),t=H[++i]}r!==(t==null?void 0:t.index)&&(M=w.nextNode(),r++)}return w.currentNode=B,L}p(V){let C=0;for(let H of this._$AV)H!==void 0&&(H.strings!==void 0?(H._$AI(V,H,C),C+=H.strings.length-2):H._$AI(V[C])),C++}},q=class e{get _$AU(){var V,C;return(C=(V=this._$AM)==null?void 0:V._$AU)!=null?C:this._$Cv}constructor(V,C,H,L){var M;this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=V,this._$AB=C,this._$AM=H,this.options=L,this._$Cv=(M=L==null?void 0:L.isConnected)!=null?M:!0}get parentNode(){let V=this._$AA.parentNode,C=this._$AM;return C!==void 0&&(V==null?void 0:V.nodeType)===11&&(V=C.parentNode),V}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(V,C=this){V=F(this,V,C),Q(V)?V===d||V==null||V===""?(this._$AH!==d&&this._$AR(),this._$AH=d):V!==this._$AH&&V!==P&&this._(V):V._$litType$!==void 0?this.$(V):V.nodeType!==void 0?this.T(V):s5(V)?this.k(V):this._(V)}O(V){return this._$AA.parentNode.insertBefore(V,this._$AB)}T(V){this._$AH!==V&&(this._$AR(),this._$AH=this.O(V))}_(V){this._$AH!==d&&Q(this._$AH)?this._$AA.nextSibling.data=V:this.T(B.createTextNode(V)),this._$AH=V}$(V){var M;let{values:C,_$litType$:H}=V,L=typeof H=="number"?this._$AC(V):(H.el===void 0&&(H.el=K.createElement(j1(H.h,H.h[0]),this.options)),H);if(((M=this._$AH)==null?void 0:M._$AD)===L)this._$AH.p(C);else{let r=new d1(L,this),i=r.u(this.options);r.p(C),this.T(i),this._$AH=r}}_$AC(V){let C=G1.get(V.strings);return C===void 0&&G1.set(V.strings,C=new K(V)),C}k(V){v1(this._$AH)||(this._$AH=[],this._$AR());let C=this._$AH,H,L=0;for(let M of V)L===C.length?C.push(H=new e(this.O(U()),this.O(U()),this,this.options)):H=C[L],H._$AI(M),L++;L<C.length&&(this._$AR(H&&H._$AB.nextSibling,L),C.length=L)}_$AR(V=this._$AA.nextSibling,C){var H;for((H=this._$AP)==null?void 0:H.call(this,!1,!0,C);V!==this._$AB;){let L=E1(V).nextSibling;E1(V).remove(),V=L}}setConnected(V){var C;this._$AM===void 0&&(this._$Cv=V,(C=this._$AP)==null||C.call(this,V))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(V,C,H,L,M){this.type=1,this._$AH=d,this._$AN=void 0,this.element=V,this.name=C,this._$AM=L,this.options=M,H.length>2||H[0]!==""||H[1]!==""?(this._$AH=Array(H.length-1).fill(new String),this.strings=H):this._$AH=d}_$AI(V,C=this,H,L){let M=this.strings,r=!1;if(M===void 0)V=F(this,V,C,0),r=!Q(V)||V!==this._$AH&&V!==P,r&&(this._$AH=V);else{let i=V,t,A;for(V=M[0],t=0;t<M.length-1;t++)A=F(this,i[H+t],C,t),A===P&&(A=this._$AH[t]),r||(r=!Q(A)||A!==this._$AH[t]),A===d?V=d:V!==d&&(V+=(A!=null?A:"")+M[t+1]),this._$AH[t]=A}r&&!L&&this.j(V)}j(V){V===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,V!=null?V:"")}},p1=class extends R{constructor(){super(...arguments),this.type=3}j(V){this.element[this.name]=V===d?void 0:V}},m1=class extends R{constructor(){super(...arguments),this.type=4}j(V){this.element.toggleAttribute(this.name,!!V&&V!==d)}},n1=class extends R{constructor(V,C,H,L,M){super(V,C,H,L,M),this.type=5}_$AI(V,C=this){var r;if((V=(r=F(this,V,C,0))!=null?r:d)===P)return;let H=this._$AH,L=V===d&&H!==d||V.capture!==H.capture||V.once!==H.once||V.passive!==H.passive,M=V!==d&&(H===d||L);L&&this.element.removeEventListener(this.name,this,H),M&&this.element.addEventListener(this.name,this,V),this._$AH=V}handleEvent(V){var C,H;typeof this._$AH=="function"?this._$AH.call((H=(C=this.options)==null?void 0:C.host)!=null?H:this.element,V):this._$AH.handleEvent(V)}},l1=class{constructor(V,C,H){this.element=V,this.type=6,this._$AN=void 0,this._$AM=C,this.options=H}get _$AU(){return this._$AM._$AU}_$AI(V){F(this,V)}};var a1=G.litHtmlPolyfillSupport,U1;a1==null||a1(K,q),((U1=G.litHtmlVersions)!=null?U1:G.litHtmlVersions=[]).push("3.3.3");var Y1=(e,V,C)=>{var M,r;let H=(M=C==null?void 0:C.renderBefore)!=null?M:V,L=H._$litPart$;if(L===void 0){let i=(r=C==null?void 0:C.renderBefore)!=null?r:null;H._$litPart$=L=new q(V.insertBefore(U(),i),i,void 0,C!=null?C:{})}return L._$AI(e),L};var T=globalThis,f=class extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var C,H;let V=super.createRenderRoot();return(H=(C=this.renderOptions).renderBefore)!=null||(C.renderBefore=V.firstChild),V}update(V){let C=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(V),this._$Do=Y1(C,this.renderRoot,this.renderOptions)}connectedCallback(){var V;super.connectedCallback(),(V=this._$Do)==null||V.setConnected(!0)}disconnectedCallback(){var V;super.disconnectedCallback(),(V=this._$Do)==null||V.setConnected(!1)}render(){return P}},X1;f._$litElement$=!0,f.finalized=!0,(X1=T.litElementHydrateSupport)==null||X1.call(T,{LitElement:f});var Z1=T.litElementPolyfillSupport;Z1==null||Z1({LitElement:f});var J1;((J1=T.litElementVersions)!=null?J1:T.litElementVersions=[]).push("4.2.2");var S5=["status","vacuum_error","dock_error","cleaning_mode","mop_intensity","clean_percent","cleaning_area","cleaning_time","current_room","in_cleaning","water_shortage","clean_box_empty","dirty_box_full","water_box_attached","mop_attached","main_brush_time_left","side_brush_time_left","filter_time_left","sensor_time_left","strainer_time_left","reset_main_brush_consumable","reset_side_brush_consumable","reset_air_filter_consumable","reset_sensor_consumable","reset_dock_strainer_consumable","total_cleaning_count","total_cleaning_area","total_cleaning_time","last_clean_end","mop_drying_remaining_time"];function C2(e,V){var M,r,i,t,A,a,p;let C={},H=(M=e.entities)!=null?M:{},L=(r=H[V.entity])==null?void 0:r.device_id;if(L){let n=(t=(i=e.devices)==null?void 0:i[L])==null?void 0:t.name,l=new Set([L]);for(let o of Object.values((A=e.devices)!=null?A:{}))(o.via_device_id===L||n&&o.name&&o.name!==n&&o.name.startsWith(n))&&l.add(o.id);for(let o of Object.values(H)){if(!o.device_id||!l.has(o.device_id))continue;let Z=e.states[o.entity_id];o.translation_key&&S5.includes(o.translation_key)&&!C[o.translation_key]&&(C[o.translation_key]=o.entity_id);let s=Z==null?void 0:Z.attributes.device_class;o.entity_id.startsWith("sensor.")&&s==="battery"&&((a=C.battery)!=null||(C.battery=o.entity_id)),o.entity_id.startsWith("binary_sensor.")&&s==="battery_charging"&&((p=C.charging)!=null||(C.charging=o.entity_id))}}return{...C,...V.entities}}var c=(e,V)=>{var C;return V==null?"\u2013":(C=e[V])!=null?C:V.replace(/_/g," ").replace(/^./,H=>H.toUpperCase())},H2={starting:"Startet",charger_disconnected:"Ladestation getrennt",idle:"Bereit",remote_control_active:"Fernsteuerung",cleaning:"Reinigt",returning_home:"F\xE4hrt zur Station",manual_mode:"Manueller Modus",charging:"L\xE4dt",charging_problem:"Ladeproblem",paused:"Pausiert",spot_cleaning:"Spot-Reinigung",error:"Fehler",shutting_down:"F\xE4hrt herunter",updating:"Update l\xE4uft",docking:"Dockt an",going_to_target:"F\xE4hrt zum Ziel",zoned_cleaning:"Reinigt Zone",segment_cleaning:"Reinigt R\xE4ume",emptying_the_bin:"Leert Staubbeh\xE4lter",washing_the_mop:"W\xE4scht Mopp",going_to_wash_the_mop:"F\xE4hrt zur Moppw\xE4sche",back_to_dock_washing_duster:"F\xE4hrt zur Moppw\xE4sche",in_call:"Videoanruf",mapping:"Kartiert",patrol:"Patrouille",attaching_the_mop:"Bringt Mopp an",detaching_the_mop:"Legt Mopp ab",charging_complete:"Voll geladen",device_offline:"Offline",locked:"Gesperrt",air_drying_stopping:"Beendet Trocknung",robot_status_mopping:"Wischt",clean_mop_cleaning:"Saugt & wischt",clean_mop_mopping:"Wischt",segment_mopping:"Wischt R\xE4ume",segment_clean_mop_cleaning:"Saugt & wischt R\xE4ume",segment_clean_mop_mopping:"Wischt R\xE4ume",zoned_mopping:"Wischt Zone",zoned_clean_mop_cleaning:"Saugt & wischt Zone",zoned_clean_mop_mopping:"Wischt Zone"},V2={vacuum:"Saugen",vac_and_mop:"Saugen & Wischen",vac_then_mop:"Saugen, dann Wischen",vac_followed_by_mop:"Saugen, dann Wischen",vacuum_then_mop:"Saugen, dann Wischen",mop:"Wischen"},L2={vacuum:["mdi:fan"],vac_and_mop:["mdi:fan","mdi:plus","mdi:water"],vac_then_mop:["mdi:fan","mdi:arrow-right","mdi:water"],vac_followed_by_mop:["mdi:fan","mdi:arrow-right","mdi:water"],vacuum_then_mop:["mdi:fan","mdi:arrow-right","mdi:water"],mop:["mdi:water"]},M2=["quiet","balanced","turbo","max","max_plus"],r2={quiet:"Leise",balanced:"Ausgewogen",turbo:"Turbo",max:"Max",max_plus:"Max+",off:"Aus",smart_mode:"Smart",custom:"Benutzerdefiniert"},e2=["slight","low","medium","moderate","high","extreme"],t2={off:"Aus",slight:"Minimal",low:"Niedrig",medium:"Mittel",moderate:"Erh\xF6ht",high:"Hoch",extreme:"Extrem",smart_mode:"Smart",custom:"Benutzerdefiniert"},s1={lidar_blocked:"LiDAR-Sensor blockiert",bumper_stuck:"Sto\xDFf\xE4nger klemmt",wheels_suspended:"R\xE4der h\xE4ngen in der Luft",cliff_sensor_error:"Absturzsensor-Fehler",main_brush_jammed:"Hauptb\xFCrste blockiert",side_brush_jammed:"Seitenb\xFCrste blockiert",wheels_jammed:"R\xE4der blockiert",robot_trapped:"Roboter steckt fest",no_dustbin:"Staubbeh\xE4lter fehlt",strainer_error:"Filter-Fehler",compass_error:"Kompass-Fehler",low_battery:"Akku zu schwach",charging_error:"Ladefehler",battery_error:"Akku-Fehler",wall_sensor_dirty:"Wandsensor verschmutzt",robot_tilted:"Roboter steht schr\xE4g",side_brush_error:"Seitenb\xFCrsten-Fehler",fan_error:"Gebl\xE4se-Fehler",dock:"Problem an der Station",optical_flow_sensor_dirt:"Bodensensor verschmutzt",vertical_bumper_pressed:"Oberer Sto\xDFf\xE4nger gedr\xFCckt",dock_locator_error:"Station nicht gefunden",return_to_dock_fail:"R\xFCckkehr zur Station fehlgeschlagen",nogo_zone_detected:"In Sperrzone",visual_sensor:"Kamera verschmutzt",light_touch:"Lichtsensor-Fehler",vibrarise_jammed:"Wischmodul blockiert",robot_on_carpet:"Roboter auf Teppich",filter_blocked:"Filter verstopft",invisible_wall_detected:"Virtuelle Wand erkannt",cannot_cross_carpet:"Kann Teppich nicht \xFCberqueren",internal_error:"Interner Fehler",clear_water_box_hoare:"Frischwassertank pr\xFCfen",dirty_water_box_hoare:"Schmutzwassertank pr\xFCfen",clear_water_box_exception:"Frischwassertank-Fehler",temperature_protection:"\xDCberhitzungsschutz",water_carriage_drop:"Wischmodul abgefallen",audio_error:"Lautsprecher-Fehler"},u1={no_dustbin_or_filter:"Staubbeutel oder Filter fehlt",auto_empty_dock_fan_error:"Absauggebl\xE4se defekt",duct_blockage:"Absaugkanal verstopft",auto_empty_dock_voltage_error:"Spannungsfehler",water_empty:"Frischwasser leer",waste_water_tank_full:"Schmutzwassertank voll",maintenance_brush_jammed:"Reinigungsb\xFCrste blockiert",dirty_tank_latch_open:"Schmutzwassertank-Verriegelung offen",no_dustbin:"Staubbeh\xE4lter fehlt",cleaning_tank_full_or_blocked:"Reinigungswanne voll oder verstopft"},i2=[{key:"main_brush_time_left",reset:"reset_main_brush_consumable",name:"Hauptb\xFCrste",icon:"mdi:brush",life:300},{key:"side_brush_time_left",reset:"reset_side_brush_consumable",name:"Seitenb\xFCrste",icon:"mdi:fan",life:200},{key:"filter_time_left",reset:"reset_air_filter_consumable",name:"Luftfilter",icon:"mdi:air-filter",life:150},{key:"sensor_time_left",reset:"reset_sensor_consumable",name:"Sensoren reinigen",icon:"mdi:eye-outline",life:30},{key:"strainer_time_left",reset:"reset_dock_strainer_consumable",name:"Schmutzf\xE4nger (Station)",icon:"mdi:filter-outline",life:150}],x={locked:"Gesperrt",ready:"Bereit",start:"Starten",running:"L\xE4uft",done:"Fertig",cancel:"Abbrechen"},S={ok:"OK",carry:"Muss zur Station",running:"Station L\xE4uft",done:"Kann zur\xFCck"};var o2="M19,18.31V20A2,2 0 0,1 17,22H7A2,2 0 0,1 5,20V16.3C4.54,16.12 3.95,16 3,16A1,1 0 0,1 2,15A1,1 0 0,1 3,14C3.82,14 4.47,14.08 5,14.21V12.3C4.54,12.12 3.95,12 3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10C3.82,10 4.47,10.08 5,10.21V8.3C4.54,8.12 3.95,8 3,8A1,1 0 0,1 2,7A1,1 0 0,1 3,6C3.82,6 4.47,6.08 5,6.21V4A2,2 0 0,1 7,2H17A2,2 0 0,1 19,4V6.16C20.78,6.47 21.54,7.13 21.71,7.29C22.1,7.68 22.1,8.32 21.71,8.71C21.32,9.1 20.8,9.09 20.29,8.71V8.71C20.29,8.71 19.25,8 17,8C15.74,8 14.91,8.41 13.95,8.9C12.91,9.41 11.74,10 10,10C9.64,10 9.31,10 9,9.96V7.95C9.3,8 9.63,8 10,8C11.26,8 12.09,7.59 13.05,7.11C14.09,6.59 15.27,6 17,6V4H7V20H17V18C18.5,18 18.97,18.29 19,18.31M17,10C15.27,10 14.09,10.59 13.05,11.11C12.09,11.59 11.26,12 10,12C9.63,12 9.3,12 9,11.95V13.96C9.31,14 9.64,14 10,14C11.74,14 12.91,13.41 13.95,12.9C14.91,12.42 15.74,12 17,12C19.25,12 20.29,12.71 20.29,12.71V12.71C20.8,13.1 21.32,13.1 21.71,12.71C22.1,12.32 22.1,11.69 21.71,11.29C21.5,11.08 20.25,10 17,10M17,14C15.27,14 14.09,14.59 13.05,15.11C12.09,15.59 11.26,16 10,16C9.63,16 9.3,16 9,15.95V17.96C9.31,18 9.64,18 10,18C11.74,18 12.91,17.41 13.95,16.9C14.91,16.42 15.74,16 17,16C19.25,16 20.29,16.71 20.29,16.71V16.71C20.8,17.1 21.32,17.1 21.71,16.71C22.1,16.32 22.1,15.69 21.71,15.29C21.5,15.08 20.25,14 17,14Z";var A2="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z";var a2="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z";var d2="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z";var p2="M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z",m2="M16,18H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var n2="M16,17H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var l2="M16,15H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var v2="M16,14H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var x2="M16,13H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var Z2="M16,12H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var s2="M16,10H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var u2="M16,9H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var S2="M16,8H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var S1="M23.05,11H20.05V4L15.05,14H18.05V22M12,18H4L4.05,6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z",c2="M23,11H20V4L15,14H18V22M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z",h2="M23.05,11H20.05V4L15.05,14H18.05V22M12.05,17H4.05V6H12.05M12.72,4H11.05V2H5.05V4H3.38A1.33,1.33 0 0,0 2.05,5.33V20.67C2.05,21.4 2.65,22 3.38,22H12.72C13.45,22 14.05,21.4 14.05,20.67V5.33A1.33,1.33 0 0,0 12.72,4Z",O2="M12,15H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z",g2="M13 4H11V2H5V4H3C2.4 4 2 4.4 2 5V21C2 21.6 2.4 22 3 22H13C13.6 22 14 21.6 14 21V5C14 4.4 13.6 4 13 4M12 14.5H4V6H12V14.5M23 11H20V4L15 14H18V22",f2="M23,11H20V4L15,14H18V22M12,13H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z",k2="M12,11H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z",b2="M12,10H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4M23,11H20V4L15,14H18V22L23,11Z",y2="M23,11H20V4L15,14H18V22M12,9H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z",w2="M23,11H20V4L15,14H18V22M12,8H4V6H12M12.67,4H11V2H5V4H3.33A1.33,1.33 0 0,0 2,5.33V20.67C2,21.4 2.6,22 3.33,22H12.67C13.4,22 14,21.4 14,20.67V5.33A1.33,1.33 0 0,0 12.67,4Z";var B2="M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z";var P2="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z";var T2="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z";var F2="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z";var R2="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";var _2="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";var D2="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M4,6V18H11V6H4M20,18V6H18.76C19,6.54 18.95,7.07 18.95,7.13C18.88,7.8 18.41,8.5 18.24,8.75L15.91,11.3L19.23,11.28L19.24,12.5L14.04,12.47L14,11.47C14,11.47 17.05,8.24 17.2,7.95C17.34,7.67 17.91,6 16.5,6C15.27,6.05 15.41,7.3 15.41,7.3L13.87,7.31C13.87,7.31 13.88,6.65 14.25,6H13V18H15.58L15.57,17.14L16.54,17.13C16.54,17.13 17.45,16.97 17.46,16.08C17.5,15.08 16.65,15.08 16.5,15.08C16.37,15.08 15.43,15.13 15.43,15.95H13.91C13.91,15.95 13.95,13.89 16.5,13.89C19.1,13.89 18.96,15.91 18.96,15.91C18.96,15.91 19,17.16 17.85,17.63L18.37,18H20M8.92,16H7.42V10.2L5.62,10.76V9.53L8.76,8.41H8.92V16Z";var E2="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z";var W2="M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11M12.5,2C17,2 17.11,5.57 14.75,6.75C13.76,7.24 13.32,8.29 13.13,9.22C13.61,9.42 14.03,9.73 14.35,10.13C18.05,8.13 22.03,8.92 22.03,12.5C22.03,17 18.46,17.1 17.28,14.73C16.78,13.74 15.72,13.3 14.79,13.11C14.59,13.59 14.28,14 13.88,14.34C15.87,18.03 15.08,22 11.5,22C7,22 6.91,18.42 9.27,17.24C10.25,16.75 10.69,15.71 10.89,14.79C10.4,14.59 9.97,14.27 9.65,13.87C5.96,15.85 2,15.07 2,11.5C2,7 5.56,6.89 6.74,9.26C7.24,10.25 8.29,10.68 9.22,10.87C9.41,10.39 9.73,9.97 10.14,9.65C8.15,5.96 8.94,2 12.5,2Z";var N2="M15,19.88C15.04,20.18 14.94,20.5 14.71,20.71C14.32,21.1 13.69,21.1 13.3,20.71L9.29,16.7C9.06,16.47 8.96,16.16 9,15.87V10.75L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L15,10.75V19.88M7.04,5L11,10.06V15.58L13,17.58V10.05L16.96,5H7.04Z";var V1="M13 24C9.74 24 6.81 22 5.6 19L2.57 11.37C2.26 10.58 3 9.79 3.81 10.05L4.6 10.31C5.16 10.5 5.62 10.92 5.84 11.47L7.25 15H8V3.25C8 2.56 8.56 2 9.25 2S10.5 2.56 10.5 3.25V12H11.5V1.25C11.5 .56 12.06 0 12.75 0S14 .56 14 1.25V12H15V2.75C15 2.06 15.56 1.5 16.25 1.5C16.94 1.5 17.5 2.06 17.5 2.75V12H18.5V5.75C18.5 5.06 19.06 4.5 19.75 4.5S21 5.06 21 5.75V16C21 20.42 17.42 24 13 24Z";var $2="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3";var I2="M15 13L11 17V14H2V12H11V9L15 13M5 20V16H7V18H17V10.19L12 5.69L7.21 10H4.22L12 3L22 12H19V20H5Z";var z2="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z";var G2="M12,2C15.31,2 18,4.66 18,7.95C18,12.41 12,19 12,19C12,19 6,12.41 6,7.95C6,4.66 8.69,2 12,2M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M20,19C20,21.21 16.42,23 12,23C7.58,23 4,21.21 4,19C4,17.71 5.22,16.56 7.11,15.83L7.75,16.74C6.67,17.19 6,17.81 6,18.5C6,19.88 8.69,21 12,21C15.31,21 18,19.88 18,18.5C18,17.81 17.33,17.19 16.25,16.74L16.89,15.83C18.78,16.56 20,17.71 20,19Z";var U2="M14,19H18V5H14M6,19H10V5H6V19Z";var Q2="M8,5.14V19.14L19,12.14L8,5.14Z";var K2="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";var q2="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13";var j2="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z";var Y2="M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10.04 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10.04 2.58,8.12 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C14.08,15.58 13.06,16 12,16C10.94,16 9.92,15.58 9.17,14.83L7.76,16.24C6.63,15.12 6,13.59 6,12A6,6 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z";var X2="M3,5V21H9V19.5H7V18H9V16.5H5V15H9V13.5H7V12H9V10.5H5V9H9V5H10.5V9H12V7H13.5V9H15V5H16.5V9H18V7H19.5V9H21V3H5A2,2 0 0,0 3,5M6,7A1,1 0 0,1 5,6A1,1 0 0,1 6,5A1,1 0 0,1 7,6A1,1 0 0,1 6,7Z";var J2="M15,5V9H11V13H7V17H3V20H10V16H14V12H18V8H22V5H15Z";var C5="M18,18H6V6H18V18Z";var H5="M12,20A6,6 0 0,1 6,14C6,10 12,3.25 12,3.25C12,3.25 18,10 18,14A6,6 0 0,1 12,20Z";var V5="M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z";var c5={"mdi:air-filter":o2,"mdi:alert":A2,"mdi:alert-circle":a2,"mdi:arrow-right":d2,"mdi:brush":P2,"mdi:check":T2,"mdi:check-circle":F2,"mdi:clock-outline":R2,"mdi:close":_2,"mdi:counter":D2,"mdi:eye-outline":E2,"mdi:fan":W2,"mdi:filter-outline":N2,"mdi:history":$2,"mdi:home-import-outline":I2,"mdi:lock":z2,"mdi:map-marker-radius":G2,"mdi:pause":U2,"mdi:play":Q2,"mdi:plus":K2,"mdi:restore":j2,"mdi:robot-vacuum":Y2,"mdi:ruler-square":X2,"mdi:stairs":J2,"mdi:power":q2,"mdi:hand-back-right":V1,"mdi:stop":C5,"mdi:water":H5,"mdi:wrench":V5},h5=[B2,m2,n2,l2,v2,x2,Z2,s2,u2,S2,p2],O5=[S1,S1,h2,O2,g2,f2,k2,b2,y2,w2,c2],L5=(e,V)=>(V?O5:h5)[Math.max(0,Math.min(10,Math.round(e/10)))],v=(e,V="")=>{var C;return c1((C=c5[e])!=null?C:"",V)},c1=(e,V="")=>m`<svg class="mdi ${V}" viewBox="0 0 24 24" aria-hidden="true"><path d=${e}></path></svg>`;var h1=(e,V,C)=>e.map((H,L)=>H1`<circle class=${C}
  style="animation-delay:${(L*.35).toFixed(2)}s" cx=${H} cy=${V} r=${C==="dust"?1.6+L%2*.7:2.2}></circle>`),O1=(e,V)=>{let C=e*Math.PI/180;return`${(Math.sin(C)*V).toFixed(2)} ${(-Math.cos(C)*V).toFixed(2)}`},g5=[0,120,240].map(e=>[-8,0,8].map(V=>`M${O1(e,2)} Q${O1(e-4+V*.3,8.5)} ${O1(e-72+V,11)}`).join(" ")).join(" "),M5=(e,V)=>H1`<g class="brush ${V}" transform="translate(${e} 112)"><g class="ext"><circle class="blur" r="11"></circle><g class="spin">
  <g transform=${V==="grey"?"scale(-1 1)":"scale(1 1)"}><path class="bristles" d="${g5}"></path></g>
  </g></g></g>`;function r5(e,V){let C=e==="mop"||e==="cleanmop"||e==="wash",H=["clean","mop","cleanmop","return","map"].includes(e);return m`<svg class="robot a-${e} st-${V} ${C?"mopping":""} ${H?"raised":""}"
    viewBox="0 0 260 150" aria-hidden="true">
    <defs>
      <radialGradient id="rb-body" cx="40%" cy="70%" r="80%">
        <stop offset="0" stop-color="#2b3540"></stop><stop offset="1" stop-color="#121820"></stop>
      </radialGradient>
      <radialGradient id="rb-tower" cx="45%" cy="40%" r="70%">
        <stop offset="0" stop-color="#3a4048"></stop><stop offset="1" stop-color="#16191d"></stop>
      </radialGradient>
      <linearGradient id="rb-st" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#686c72"></stop><stop offset="1" stop-color="#3b3e43"></stop>
      </linearGradient>
      <linearGradient id="rb-heat" gradientUnits="userSpaceOnUse" x1="0" y1="34" x2="0" y2="10">
        <stop offset="0" stop-color="#e53935"></stop><stop offset="0.5" stop-color="#ff7043"></stop><stop offset="1" stop-color="#ffb300"></stop>
      </linearGradient>
      <filter id="rb-mblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="0.5"></feGaussianBlur></filter>
      <radialGradient id="rb-shadow">
        <stop offset="0.75" stop-color="rgba(0,0,0,0.38)"></stop><stop offset="1" stop-color="rgba(0,0,0,0)"></stop>
      </radialGradient>
    </defs>

    <g class="station">
      <rect class="st-shadow" x="80" y="6" width="100" height="48" rx="11"></rect>
      <rect class="st-body" x="82" y="4" width="96" height="46" rx="10"></rect>
      <rect class="st-lid" x="89" y="9" width="82" height="28" rx="6"></rect>
      <path class="st-split" d="M130 11 V35"></path>
      <rect class="st-logo" x="122" y="42.5" width="16" height="1.6" rx="0.8"></rect>
      <g class="ups">${h1([122,130,138,126,134],46,"up")}</g>
      <!-- Mopp trocknen: warme Luft wellt aus der Station -->
      <g class="heat">${[108,130,152].map((L,M)=>H1`<path style="animation-delay:${(M*.5).toFixed(1)}s"
        d="M${L} 34 q-3 -3 0 -6 t0 -6 t0 -6 t0 -6"></path>`)}</g>
    </g>

    <g class="rings"><circle cx="130" cy="84" r="46"></circle><circle cx="130" cy="84" r="46" style="animation-delay:1.3s"></circle></g>
    <g class="bot">
      <circle class="shadow" cx="132" cy="88" r="50"></circle>
      <g class="trail">${h1([110,122,138,150],34,"drop")}</g>
      <g class="roller"><rect x="103" y="35" width="54" height="10" rx="5"></rect><path d="M106 40 H154"></path></g>
      <g class="ripples"><circle cx="112" cy="42" r="6"></circle><circle cx="148" cy="42" r="6" style="animation-delay:0.6s"></circle></g>
      ${M5(96,"orange")}
      ${M5(164,"grey")}
      <g class="dusts">${h1([102,116,130,144,158],142,"dust")}</g>
      <circle class="body" cx="130" cy="84" r="44"></circle>
      <circle class="rim" cx="130" cy="84" r="43.4"></circle>
      <!-- hinterer Deckel (matter), Naht quer über die Mitte -->
      <path class="lid" d="M88.5 90.6 A42 42 0 1 1 171.5 90.6 Z"></path>
      <path class="bumper" d="M87.4 93 A43 43 0 0 0 172.6 93"></path>
      <!-- Lidar-Turm vorne, klein und dunkel, versenkbar -->
      <g class="tower">
        <circle class="tw-shadow" cx="130.8" cy="117" r="7"></circle>
        <circle class="tw" cx="130" cy="116" r="6.6"></circle>
        <circle class="tw-ring" cx="130" cy="116" r="4.2"></circle>
        <circle class="tw-ring" cx="130" cy="116" r="2"></circle>
      </g>
      <rect class="slot" x="127" y="107.3" width="6" height="2.6" rx="1.3"></rect>
      <!-- Ein/Aus- und Home-Taste hintereinander, leuchten weiß -->
      <g class="keys">
        <circle class="key" cx="130" cy="102.4" r="2.8"></circle>
        <circle class="key" cx="130" cy="96.4" r="2.8"></circle>
        <path class="glyph" d="M129 101.6 A1.4 1.4 0 1 0 131 101.6 M130 100.8 V102.3"></path>
        <path class="glyph home" d="M128.8 96.6 L130 95.5 L131.2 96.6 M129.2 96.3 V97.6 H130.8 V96.3"></path>
      </g>
      <path class="beam" d="M118 126 L70 150 H190 L142 126 Z"></path>
      <!-- Hand von oben (Handrücken), Finger liegen auf dem Roboter: nur beim Tragen sichtbar -->
      <g class="hand" transform="translate(112 96) scale(1.5)"><path d="${V1}"></path></g>
      <g class="badge">
        <circle cx="130" cy="62" r="13"></circle>
        <path class="g-charge" d="M131.5 53 L124 64 H129.5 L128.5 71 L136 60 H130.5 Z"></path>
        <path class="g-pause" d="M125 56 h3.5 v12 h-3.5z M131.5 56 h3.5 v12 h-3.5z"></path>
        <path class="g-error" d="M128.2 54 h3.6 v10 h-3.6z M128.2 66.5 h3.6 v3.6 h-3.6z"></path>
      </g>
    </g>
  </svg>`}var e5=$`
  /* hidden: Animationen (Heimfahrt, Bahnen) dürfen nicht über den Status-Text laufen */
  .robot { width: 100%; height: 100%; overflow: hidden; display: block; }

  /* Gerätefarben (echtes Aussehen), Zustandsfarbe kommt als --rb-accent von der Karte */
  .station { transition: opacity 0.5s; }
  .st-none .station { opacity: 0; }
  .st-ghost .station { opacity: 0.35; }
  .st-shadow { fill: rgba(0, 0, 0, 0.25); }
  .st-body { fill: url(#rb-st); stroke: rgba(255, 255, 255, 0.1); stroke-width: 0.8; }
  .st-lid { fill: rgba(255, 255, 255, 0.07); stroke: rgba(0, 0, 0, 0.25); stroke-width: 0.8; }
  .st-split { stroke: rgba(0, 0, 0, 0.3); stroke-width: 1; }
  .st-logo { fill: rgba(255, 255, 255, 0.45); }
  .shadow { fill: url(#rb-shadow); }
  .body { fill: url(#rb-body); }
  .rim { fill: none; stroke: rgba(255, 255, 255, 0.12); stroke-width: 0.7; }
  .lid { fill: #10151b; stroke: rgba(0, 0, 0, 0.5); stroke-width: 0.8; }
  .bumper { fill: none; stroke: #07090b; stroke-width: 2.6; stroke-linecap: round; }

  /* Turm: klein, dunkel gebürstet; fährt beim Fahren aus (Schatten), in der Station eingefahren */
  .tower { transform-origin: 130px 116px; transform: scale(0.88); transition: transform 0.6s; }
  .raised .tower { transform: scale(1); }
  .tw-shadow { fill: rgba(0, 0, 0, 0.5); opacity: 0.3; transition: opacity 0.6s; }
  .raised .tw-shadow { opacity: 1; }
  .tw { fill: url(#rb-tower); stroke: rgba(255, 255, 255, 0.14); stroke-width: 0.5; }
  .tw-ring { fill: none; stroke: rgba(255, 255, 255, 0.06); stroke-width: 0.5; }
  .slot { fill: #07090b; stroke: rgba(255, 255, 255, 0.1); stroke-width: 0.4; }

  /* Tasten: weiß beleuchtet (Home schwächer); Ladung = atmen, Fehler = blinken, offline = aus */
  .key { fill: #0d1116; stroke: rgba(255, 255, 255, 0.12); stroke-width: 0.4; }
  .glyph { fill: none; stroke: #fff; stroke-width: 0.7; stroke-linecap: round; stroke-linejoin: round; opacity: 0.95;
    filter: drop-shadow(0 0 1.2px rgba(255, 255, 255, 0.9)); }
  .glyph.home { opacity: 0.5; filter: none; }
  .a-idle .glyph, .a-pause .glyph { opacity: 0.6; filter: none; }
  .a-idle .glyph.home, .a-pause .glyph.home { opacity: 0.35; }
  .a-offline .glyph { opacity: 0.12; filter: none; }

  .brush path { fill: none; stroke-linecap: round; }
  .brush .bristles { stroke-width: 0.8; }
  .brush.orange .bristles { stroke: #f29a1a; }
  .brush.grey .bristles { stroke: #a3a9b0; }
  .brush.orange .blur { fill: #f29a1a; }
  .brush.grey .blur { fill: #a3a9b0; }
  .brush .blur { opacity: 0; }
  /* um die Nabe drehen (nicht um die Mitte der Umrissbox, sonst eiert sie) */
  .brush .spin, .brush .ext { transform-box: view-box; transform-origin: 0 0; }
  /* eingefahren: klein und unsichtbar unterm Gehäuse; beim Saugen fahren sie aus */
  .brush .ext { transform: scale(0.3); opacity: 0; transition: transform 0.5s, opacity 0.5s; }
  .a-clean .brush .ext, .a-cleanmop .brush .ext { transform: scale(1); opacity: 1; }
  .ripples circle { transform-box: fill-box; transform-origin: center; }
  .roller { opacity: 0; transition: opacity 0.4s; }
  .mopping .roller { opacity: 1; }
  .roller rect { fill: #dfe7ee; stroke: #8fa3b5; stroke-width: 0.8; }
  .roller path { stroke: var(--rb-water); stroke-width: 6; stroke-dasharray: 3 3; stroke-linecap: butt; opacity: 0.55; }
  .ripples circle { fill: none; stroke: var(--rb-water); stroke-width: 1.5; opacity: 0; }
  .beam { fill: var(--rb-accent); opacity: 0; }
  .dust { fill: #8a9097; opacity: 0; }
  .up { fill: var(--rb-accent); opacity: 0; }
  .heat path { fill: none; stroke: url(#rb-heat); stroke-width: 1.8; stroke-linecap: round; opacity: 0; }
  .drop { fill: var(--rb-water); opacity: 0; }
  .rings circle { fill: none; stroke: var(--rb-accent); stroke-width: 2; opacity: 0; transform-origin: 130px 84px; }
  .badge { opacity: 0; transition: opacity 0.3s; }
  .badge circle { fill: var(--rb-accent); }
  .badge path { fill: #fff; display: none; }
  .bot { transform-origin: 130px 84px; }

  /* Reinigen: Roboter zieht Bahnen, Bürsten drehen gegenläufig, Staub wird eingesaugt; Wischen: Walze dreht, Tropfen bleiben zurück */
  .a-clean .bot, .a-cleanmop .bot, .a-mop .bot { animation: rb-path 10s ease-in-out infinite; }
  .a-clean .spin, .a-cleanmop .spin { animation: rb-spin 0.6s linear infinite; filter: url(#rb-mblur); }
  .a-clean .brush .blur, .a-cleanmop .brush .blur { opacity: 0.16; }
  /* Bürsten drehen gegen ihre Biegung (Borsten ziehen nach), die gespiegelte rechte andersherum */
  .a-clean .grey .spin, .a-cleanmop .grey .spin { animation-direction: reverse; }
  .a-clean .dust, .a-cleanmop .dust { animation: rb-suck 1.8s ease-in infinite; }
  .a-mop .roller path, .a-cleanmop .roller path, .a-wash .roller path { animation: rb-roll 0.4s linear infinite; }
  .a-mop .drop, .a-cleanmop .drop { animation: rb-trail 1.8s ease-out infinite; }
  /* Station: Staub wird abgesaugt / Walze gewaschen */
  .a-empty .up { animation: rb-rise 1.5s ease-in infinite; }
  .a-wash .ripples circle { animation: rb-ripple 1.2s ease-out infinite; }
  .a-dry .heat path { animation: rb-heat 1.6s ease-in-out infinite; }
  /* Laden, Pause, Fehler */
  .a-charge .rings circle { animation: rb-ring 2.6s ease-out infinite; }
  .a-charge .badge, .a-pause .badge, .a-error .badge { opacity: 1; }
  .a-charge .g-charge, .a-pause .g-pause, .a-error .g-error { display: block; }
  .a-charge .badge, .a-charge .glyph { animation: rb-breathe 2.6s ease-in-out infinite; }
  .a-error .glyph { animation: rb-blink 0.8s steps(1) infinite; }
  /* Heimfahrt: rollt immer wieder rückwärts in die (blasse) Station */
  .a-return .bot { animation: rb-home 2.8s ease-in-out infinite; }
  /* Tragen: Roboter hebt sich sanft an, Schatten wird kleiner */
  /* Tragen: Hand setzt den Roboter in die Station bzw. nimmt ihn heraus */
  .hand { opacity: 0; }
  .hand path { fill: #e9bd98; stroke: rgba(0, 0, 0, 0.45); stroke-width: 0.45; stroke-linejoin: round; }
  .a-carry_in .bot, .a-carry_out .bot { transform-origin: 130px 84px; }
  .a-carry_in .bot { animation: rb-carry-in 4s ease-in-out infinite; }
  .a-carry_in .hand { animation: rb-hand-in 4s ease-in-out infinite; }
  .a-carry_out .bot { animation: rb-carry-out 4s ease-in-out infinite; }
  .a-carry_out .hand { animation: rb-hand-out 4s ease-in-out infinite; }
  .a-carry_in .shadow, .a-carry_out .shadow { opacity: 0.5; }
  .a-map .beam { animation: rb-scan 1.8s ease-in-out infinite; }
  .a-error .bot { animation: rb-shake 0.5s ease-in-out 3; }
  .a-error .rings circle { animation: rb-ring 1.6s ease-out infinite; }
  .a-offline .bot, .a-offline .station { opacity: 0.45; filter: grayscale(1); }

  @keyframes rb-path {
    0%, 100% { transform: translate(0, 0) rotate(0); }
    20% { transform: translate(-34px, 4px) rotate(-22deg); }
    45% { transform: translate(-8px, 8px) rotate(10deg); }
    70% { transform: translate(34px, 4px) rotate(24deg); }
    85% { transform: translate(14px, -2px) rotate(-6deg); }
  }
  @keyframes rb-home {
    0% { transform: translateY(46px); opacity: 0; }
    15% { opacity: 1; }
    70%, 100% { transform: translateY(0); opacity: 1; }
  }
  /* rein: von unten hochgetragen, abgesetzt (scale 1.06 → 1 = angehoben → steht), Hand verschwindet */
  @keyframes rb-carry-in {
    0% { transform: translateY(56px) scale(1.06); opacity: 0; }
    12% { opacity: 1; }
    55% { transform: translateY(0) scale(1.06); }
    68%, 92% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(0) scale(1); opacity: 0; }
  }
  @keyframes rb-hand-in { 0%, 60% { opacity: 1; } 75%, 100% { opacity: 0; } }
  /* raus: Hand greift, hebt an, trägt nach unten weg */
  @keyframes rb-carry-out {
    0%, 22% { transform: translateY(0) scale(1); opacity: 1; }
    32% { transform: translateY(0) scale(1.06); }
    80% { transform: translateY(56px) scale(1.06); opacity: 1; }
    92%, 100% { transform: translateY(56px) scale(1.06); opacity: 0; }
  }
  @keyframes rb-hand-out { 0%, 5% { opacity: 0; } 18%, 100% { opacity: 1; } }
  @keyframes rb-spin { to { transform: rotate(-360deg); } }
  @keyframes rb-roll { to { stroke-dashoffset: -6; } }
  @keyframes rb-suck { 0% { opacity: 0; transform: translateY(4px); } 30% { opacity: 0.9; } 100% { opacity: 0; transform: translateY(-12px); } }
  @keyframes rb-trail { 0% { opacity: 0; transform: translateY(2px); } 30% { opacity: 0.9; } 100% { opacity: 0; transform: translateY(-12px); } }
  @keyframes rb-rise { 0% { opacity: 0; transform: translateY(0); } 25% { opacity: 1; } 100% { opacity: 0; transform: translateY(-34px); } }
  @keyframes rb-heat { 0% { opacity: 0; transform: translateY(4px); } 40% { opacity: 0.85; } 100% { opacity: 0; transform: translateY(-8px); } }
  @keyframes rb-ripple { 0% { opacity: 0.8; transform: scale(0.3); } 100% { opacity: 0; transform: scale(1.6); } }
  @keyframes rb-ring { 0% { opacity: 0.7; transform: scale(1); } 100% { opacity: 0; transform: scale(1.4); } }
  @keyframes rb-breathe { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes rb-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
  @keyframes rb-scan { 0%, 100% { opacity: 0; } 50% { opacity: 0.22; } }
  @keyframes rb-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }

  .noanim .robot *, .noanim .robot { animation: none !important; }
  @media (prefers-reduced-motion: reduce) { .robot, .robot * { animation: none !important; } }
`;var t5=new Map;function k(e,V=0){if(e==null||!isFinite(e))return"\u2013";let C=t5.get(V);return C||(C=new Intl.NumberFormat("de-DE",{minimumFractionDigits:0,maximumFractionDigits:V}),t5.set(V,C)),C.format(e)}function j(e){return e<=0?"0 h":e<1?`${Math.round(e*60)} min`:`${k(e,e<10?1:0)} h`}var i5=e=>e.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"});function g1(e,V=new Date){let C=e?new Date(e):void 0;if(!C||isNaN(C.getTime()))return;let H=M=>new Date(M.getFullYear(),M.getMonth(),M.getDate()).getTime(),L=Math.round((H(V)-H(C))/864e5);return L<=0?`heute ${i5(C)}`:L===1?`gestern ${i5(C)}`:L<14?`vor ${L} Tagen`:C.toLocaleDateString("de-DE",{day:"numeric",month:"numeric",year:"2-digit"})}var o5=[e5,$`
  :host {
    --sc-text: var(--primary-text-color);
    --sc-text2: var(--secondary-text-color);
    --sc-divider: var(--divider-color, rgba(127, 127, 127, 0.2));
    /* Bedienelemente in der Theme-Hauptfarbe, Meldungen in den HA-Statusfarben */
    --sc-ctl: var(--primary-color, #03a9f4);
    --sc-on-ctl: var(--text-primary-color, #fff);
    --sc-ok: var(--success-color, #43a047);
    --sc-warn: var(--warning-color, #ffa600);
    --sc-err: var(--error-color, #db4437);
    /* Flächen wie HA-Regler: inaktive Farbe mit 20 % (color-mix fehlt in alten WebViews → rgba davor) */
    --sc-fill: rgba(158, 158, 158, 0.2);
    --rb-water: var(--light-blue-color, #03a9f4);
    color: var(--sc-text);
    display: block;
  }
  @supports (color: color-mix(in srgb, red 20%, transparent)) {
    :host { --sc-fill: color-mix(in srgb, var(--state-inactive-color, #9e9e9e) 20%, transparent); }
  }
  b { font-weight: 500; }
  button { font: inherit; color: inherit; -webkit-tap-highlight-color: transparent; }
  .mdi { width: var(--mdc-icon-size, 24px); height: var(--mdc-icon-size, 24px); fill: currentColor; flex: none; }

  .card {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    border-radius: var(--ha-card-border-radius, 12px);
    border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--sc-divider));
    box-shadow: var(--ha-card-box-shadow, none);
    overflow: hidden;
    box-sizing: border-box;
    padding-bottom: 14px;
  }

  /* ---------- Kopf mit Roboter ---------- */
  .hero { position: relative; height: 186px; }
  /* Schein reicht bis hinter den Status und läuft innerhalb der Fläche ganz aus (keine harte Kante) */
  .hero::before { content: ""; position: absolute; top: 0; right: 0; bottom: -64px; left: 0;
    background: radial-gradient(closest-side at 50% 48%, var(--accent) 0%, transparent 100%);
    opacity: 0; transition: opacity 0.6s; }
  .hero.tint::before { opacity: 0.2; }
  .name { position: absolute; top: 14px; left: 16px; right: 140px; font-size: 14px; font-weight: 500; color: var(--sc-text2);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chips { position: absolute; top: 10px; right: 10px; display: flex; gap: 6px; z-index: 1; }
  .chip { display: inline-flex; align-items: center; gap: 4px; height: 30px; padding: 0 10px; border-radius: 15px; border: 0;
    background: var(--sc-fill); font-size: 13px; font-weight: 500; --mdc-icon-size: 18px; box-sizing: border-box; }
  .chip.bat.low { color: var(--sc-err); }
  .chip.health { cursor: pointer; padding: 0 8px; background: none; position: relative; isolation: isolate; }
  .chip.health::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: currentColor; opacity: 0.18; z-index: -1; }
  .chip.health:hover::before { opacity: 0.28; }
  .chip.health.ok { color: var(--sc-ok); }
  .chip.health.warn { color: var(--sc-warn); }
  .chip.health.error { color: var(--sc-err); animation: sc-pulse 2s ease-in-out infinite; }
  .bot-wrap { position: absolute; left: 50%; top: 42px; width: 243px; height: 140px; margin-left: -121.5px;
    padding: 0; border: 0; background: none; cursor: pointer; }

  /* ---------- Status ---------- */
  .status { text-align: center; padding: 0 16px; position: relative; }
  .primary { font-size: 20px; font-weight: 500; line-height: 26px; }
  .secondary { font-size: 14px; color: var(--sc-text2); line-height: 20px; margin-top: 2px; }
  .progress { height: 6px; border-radius: 3px; background: var(--sc-fill); margin: 10px auto 0; max-width: 260px; overflow: hidden; }
  .progress i { display: block; height: 100%; background: var(--rb-accent); border-radius: 3px; transition: width 0.6s; }

  /* ---------- Modus + Stärke ---------- */
  .controls { padding: 14px 14px 0; display: flex; flex-direction: column; gap: 12px; }
  .seg { display: flex; gap: 4px; padding: 4px; border-radius: 14px; background: var(--sc-fill); }
  .seg button { flex: 1 1 0; min-width: 0; min-height: 54px; border: 0; border-radius: 10px; background: none; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 4px 2px;
    font-size: 12px; font-weight: 500; color: var(--sc-text2); --mdc-icon-size: 20px; transition: background 0.2s, color 0.2s; }
  .seg button span { text-align: center; line-height: 14px; max-width: 100%; }
  .seg .mi { display: flex; align-items: center; gap: 1px; }
  .seg .mi .mdi:nth-child(2):not(:last-child) { --mdc-icon-size: 13px; opacity: 0.8; }
  .seg button.on { background: var(--sc-ctl); color: var(--sc-on-ctl); }
  .seg button:disabled:not(.on) { opacity: 0.5; cursor: default; }
  .seg button:disabled { cursor: default; }
  .levels { display: flex; flex-direction: column; gap: 6px; }
  .lv-head { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--sc-text2); --mdc-icon-size: 18px; padding: 0 2px; }
  .lv-head b { margin-left: auto; color: var(--sc-text); }
  .steps { display: flex; gap: 4px; }
  .steps button { flex: 1; height: 32px; border: 0; border-radius: 8px; background: var(--sc-fill); cursor: pointer; padding: 0;
    transition: background 0.2s; }
  .steps button:first-child { border-radius: 12px 6px 6px 12px; }
  .steps button:last-child { border-radius: 6px 12px 12px 6px; }
  .steps button.on { background: var(--sc-ctl); }
  .steps button:disabled { opacity: 0.5; cursor: default; }
  /* Wert nur aus dem Verlauf (HA meldet unknown) → abgeschwächt */
  .levels.stale .steps button.on { opacity: 0.5; }
  .levels.stale b { font-weight: 500; color: var(--sc-text2); }
  .note { font-size: 12px; color: var(--sc-text2); padding: 0 2px; line-height: 16px; }

  /* ---------- Knöpfe ---------- */
  .actions { display: flex; gap: 8px; padding: 14px 14px 0; }
  .btn { flex: 1 1 0; min-width: 0; height: 48px; border: 0; border-radius: 12px; cursor: pointer; position: relative; isolation: isolate;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 12px;
    font-size: 14px; font-weight: 500; --mdc-icon-size: 20px; transition: filter 0.2s; }
  .btn span { line-height: 17px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .btn:hover:not(:disabled) { filter: brightness(1.08); }
  .btn.primary { background: var(--sc-ctl); color: var(--sc-on-ctl); }
  .btn.sec { background: var(--sc-fill); }
  .btn.danger, .btn.ok { background: none; }
  .btn.danger { color: var(--sc-err); }
  .btn.ok { color: var(--sc-ok); }
  .btn.danger::before, .btn.ok::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: currentColor; opacity: 0.15; z-index: -1; }
  .btn.icon-only { flex: 0 0 48px; padding: 0; }
  .btn:disabled { cursor: default; opacity: 0.45; filter: none; }
  .btn.busy:disabled { opacity: 0.8; }
  .btn .end { --mdc-icon-size: 18px; opacity: 0.8; margin-left: -2px; }
  .spinner { width: 20px; height: 20px; flex: none; animation: sc-spin 1s linear infinite; }
  .spinner circle { fill: none; stroke: var(--sc-ctl); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 40 60; }

  .banner { display: flex; gap: 10px; align-items: flex-start; margin: 14px 14px 0; padding: 12px; border-radius: 12px;
    font: inherit; font-size: 14px; line-height: 20px; position: relative; isolation: isolate;
    border: 0; background: none; color: inherit; text-align: left; cursor: pointer; width: calc(100% - 28px); box-sizing: border-box; }
  .banner > div { flex: 1; }
  .banner > .end { --mdc-icon-size: 18px; opacity: 0.6; margin-top: 1px; color: inherit; }
  .banner b { display: block; }
  .banner .inl { --mdc-icon-size: 16px; vertical-align: -3px; }
  .banner::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: var(--sc-ok); opacity: 0.15; z-index: -1; }
  .banner > .mdi { color: var(--sc-ok); }
  div.banner { cursor: default; }
  .banner.warn::before { background: var(--sc-warn); }
  .banner.warn > .mdi { color: var(--sc-warn); }

  /* ---------- Dialoge ---------- */
  dialog.dlg { border: 0; padding: 0; background: none; color: var(--sc-text); width: calc(100vw - 24px); max-width: 440px; max-height: none; overflow: visible; }
  dialog.dlg.small { max-width: 360px; }
  dialog.dlg.dark { color-scheme: dark; }
  dialog.dlg::backdrop { background: rgba(0, 0, 0, 0.5); }
  /* nur der Inhalt scrollt, Kopf bleibt stehen; schmale Scrollleiste mit Abstand zu den runden Ecken */
  .dlg-in { background: var(--ha-card-background, var(--card-background-color, #fff)); border-radius: var(--ha-dialog-border-radius, 24px);
    max-height: calc(100vh - 48px);
    /* iPhone: nicht unter Statusleiste/Home-Balken, dvh = wirklich sichtbare Höhe */
    max-height: calc(100dvh - 32px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px));
    overflow: hidden; display: flex; flex-direction: column; box-sizing: border-box;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35); padding-top: 20px; }
  .dlg-in.pad { padding: 20px; }
  .dlg-body { overflow-y: auto; padding: 0 14px 20px 20px; margin: 0 6px 12px 0;
    scrollbar-width: thin; scrollbar-color: var(--scrollbar-thumb-color, rgba(127, 127, 127, 0.45)) transparent; }
  .dlg-body::-webkit-scrollbar { width: 6px; }
  .dlg-body::-webkit-scrollbar-track { background: transparent; }
  .dlg-body::-webkit-scrollbar-button { display: none; height: 0; }
  .dlg-body::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb-color, rgba(127, 127, 127, 0.45)); border-radius: 3px; }
  .dlg-head { display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: 500; margin-bottom: 14px; padding: 0 20px; }
  .dlg-in.pad .dlg-head { padding: 0; }
  .dlg-head span { flex: 1; }
  .x { width: 40px; height: 40px; margin: -8px -8px -8px 0; border: 0; border-radius: 50%; background: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; }
  .x:hover, .reset:hover:not(:disabled) { background: var(--sc-fill); }
  .dlg p { font-size: 14px; line-height: 20px; color: var(--sc-text2); margin: -4px 0 18px; }
  .dlg-btns { display: flex; gap: 8px; }
  .dlg-foot { display: flex; margin-top: 18px; }
  h3 { font-size: 14px; font-weight: 500; color: var(--sc-text2); margin: 20px 2px 4px; }
  .msg { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; margin-bottom: 6px; font-size: 14px;
    position: relative; isolation: isolate; }
  .msg::before { content: ""; position: absolute; top: 0; right: 0; bottom: 0; left: 0; border-radius: inherit; background: currentColor; opacity: 0.14; z-index: -1; }
  .msg span { color: var(--sc-text); }
  .msg.ok { color: var(--sc-ok); }
  .msg.warn { color: var(--sc-warn); }
  .msg.error { color: var(--sc-err); }
  .row { display: flex; align-items: center; gap: 12px; min-height: 48px; font-size: 14px; }
  .row .ic { width: 36px; height: 36px; border-radius: 50%; background: var(--sc-fill); display: flex; align-items: center; justify-content: center;
    flex: none; --mdc-icon-size: 20px; color: var(--sc-text2); }
  .row .txt { flex: 1; min-width: 0; display: flex; flex-direction: column; }
  .row .txt small { font-size: 12px; color: var(--sc-text2); }
  .row .val { color: var(--sc-text2); text-align: right; }
  .good { color: var(--sc-ok); }
  .bad { color: var(--sc-err); font-weight: 500; }
  .cons .bar { display: block; height: 4px; border-radius: 2px; background: var(--sc-fill); margin-top: 5px; overflow: hidden; }
  .cons .bar i { display: block; height: 100%; background: var(--sc-ok); border-radius: 2px; }
  .cons.due .bar i { background: var(--sc-warn); }
  .cons.due .ic { color: var(--sc-warn); }
  .cons.due small { color: var(--sc-warn); }
  .reset { width: 40px; height: 40px; border: 0; border-radius: 50%; background: none; cursor: pointer; flex: none;
    display: flex; align-items: center; justify-content: center; color: var(--sc-text2); }
  .reset:disabled { opacity: 0.35; cursor: default; }

  @keyframes sc-spin { to { transform: rotate(360deg); } }
  @keyframes sc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
  .noanim .chip.health.error { animation: none; }
`];var f5=["unknown","unavailable",""],_=["cleaning","returning"],Y=["vac_then_mop","vac_followed_by_mop","vacuum_then_mop"],L1=e=>Y.includes(e)?"vac_then_mop":e,k5=["vacuum","vac_and_mop","vac_then_mop"],b5="var(--warning-color, #ffa600)",b="var(--state-vacuum-active-color, var(--teal-color, #009688))",M1={clean:b,mop:b,cleanmop:b,map:b,empty:b,wash:b,return:b,carry_in:"var(--warning-color, #ffa600)",carry_out:"var(--warning-color, #ffa600)",dry:"var(--deep-orange-color, #ff5722)",charge:"var(--success-color, #43a047)",idle:"var(--success-color, #43a047)",pause:"var(--warning-color, #ffa600)",error:"var(--state-vacuum-error-color, var(--error-color, #db4437))",offline:"var(--state-unavailable-color, var(--disabled-color, #bdbdbd))"},D=class extends f{constructor(){super(...arguments);this._e={};this._menu=!1;this._pending={};this._retried=new Set;this._settleTimers={};this._freeze={};this._pausedForPrep=!1}setConfig(C){var H;if(!((H=C==null?void 0:C.entity)!=null&&H.startsWith("vacuum.")))throw new Error("`entity:` fehlt (vacuum.*, z. B. vacuum.saros_20_flow_complete_2)");this._config=C,this._eFrom=void 0}static getStubConfig(C){var H;return{entity:(H=Object.keys(C.states).find(L=>L.startsWith("vacuum.")))!=null?H:"",floor_prep:Object.keys(C.states).find(L=>L.startsWith("input_select.")&&L.includes("stockwerk")&&L.includes("vorbereiten")),floor_back:Object.keys(C.states).find(L=>L.startsWith("input_select.")&&L.includes("stockwerk_status"))}}getCardSize(){return 8}getGridOptions(){return{columns:12,rows:"auto",min_columns:6}}shouldUpdate(C){var L,M;if(C.size>1||!C.has("hass"))return!0;let H=C.get("hass");return!H||!this.hass||!this._config||((L=H.themes)==null?void 0:L.darkMode)!==((M=this.hass.themes)==null?void 0:M.darkMode)||H.entities!==this.hass.entities?!0:[this._config.entity,this._config.floor_prep,this._config.floor_back,this._config.mode_helper,...Object.values(this._e)].some(r=>r&&H.states[r]!==this.hass.states[r])}willUpdate(){var H;this.hass&&this._eFrom!==this.hass.entities&&(this._e=C2(this.hass,this._config),this._eFrom=this.hass.entities);for(let[L,M]of Object.entries(this._pending)){let r=L==="cleaning_mode"?this.kind(this.current(L))===L1(M):this.current(L)===M;L==="cleaning_mode"?r&&this.dropPending(L):r?this._settleTimers[L]||(this._settleTimers[L]=window.setTimeout(()=>this.dropPending(L),2500)):(clearTimeout(this._settleTimers[L]),delete this._settleTimers[L])}this.watchFreeze();let C=(H=this.st("vacuum"))==null?void 0:H.state;C!=="paused"?this._pausedFrom=void 0:this._lastVac&&this._lastVac!=="paused"&&(this._pausedFrom=this._lastVac),C==="paused"&&this.val("prep")===x.done&&(this._pausedForPrep=!0),C!=="paused"&&(this._pausedForPrep=!1),this._lastVac=C,this.fetchLastMop()}dropPending(C){if(clearTimeout(this._settleTimers[C]),delete this._settleTimers[C],this._retried.delete(C),!(C in this._pending))return;let H={...this._pending};delete H[C],this._pending=H}watchFreeze(){var M,r;if(!Object.keys(this._freeze).length)return;let C=this._config.mode_script?(r=(M=this.hass)==null?void 0:M.states[this._config.mode_script])==null?void 0:r.state:void 0,H="cleaning_mode"in this._pending||C==="on",L=`${this.current("fan")}|${this.current("mop_intensity")}`;(H||L!==this._freezeSig)&&(this._freezeSig=L,clearTimeout(this._freezeTimer),this._freezeTimer=void 0),!H&&!this._freezeTimer&&(this._freezeTimer=window.setTimeout(()=>this._freeze={},3e3))}fetchLastMop(){var M,r;let C=this.st("mop_intensity");if(!C||C.state!=="unknown"||!((M=this.hass)!=null&&M.callWS)||this._lastMopFor===C.last_changed)return;this._lastMopFor=C.last_changed;let H=(r=C.attributes.options)!=null?r:[],L=C.last_changed||new Date().toISOString();this.hass.callWS({type:"history/history_during_period",entity_ids:[C.entity_id],minimal_response:!0,no_attributes:!0,start_time:new Date(Date.parse(L)-10*864e5).toISOString(),end_time:L}).then(i=>{var t;this._lastMop=((t=i[C.entity_id])!=null?t:[]).map(A=>A.s).reverse().find(A=>A!=="off"&&H.includes(A))}).catch(()=>{})}disconnectedCallback(){super.disconnectedCallback(),this._menu=!1,this._confirm=void 0}updated(){let C=(H,L)=>{let M=this.renderRoot.querySelector(H);M&&L&&!M.open&&M.showModal()};C("#menu",this._menu),C("#confirm",!!this._confirm)}st(C){var L;let H=C==="vacuum"?this._config.entity:C==="prep"?this._config.floor_prep:C==="helper"?this._config.mode_helper:C==="back"?this._config.floor_back:this._e[C];return H?(L=this.hass)==null?void 0:L.states[H]:void 0}val(C){var L;let H=(L=this.st(C))==null?void 0:L.state;return H==null||f5.includes(H)?void 0:H}numVal(C){var L,M;let H=parseFloat((M=(L=this.st(C))==null?void 0:L.state)!=null?M:"");return isFinite(H)?H:void 0}current(C){var H;return C==="fan"?(H=this.st("vacuum"))==null?void 0:H.attributes.fan_speed:this.val(C)}shown(C){var H,L;return C in this._freeze&&this._freeze[C]!=null&&!(C in this._pending)?this._freeze[C]:(L=(H=this._pending[C])!=null?H:this.current(C))!=null?L:this.stale(C)?this._lastMop:void 0}stale(C){var H;return C==="mop_intensity"&&!this._pending[C]&&this._freeze[C]==null&&((H=this.st(C))==null?void 0:H.state)==="unknown"&&!!this._lastMop}modes(){var L,M,r;let C=(M=(L=this.st("cleaning_mode"))==null?void 0:L.attributes.options)!=null?M:[];if(!C.length)return[];let H=C.find(i=>Y.includes(i));return((r=this._config.modes)!=null?r:k5).map(i=>Y.includes(i)&&H?H:i).filter(i=>C.includes(i)||i==="vac_then_mop")}modeNow(){let C=this._pending.cleaning_mode;return C?L1(C):this.kind(this.current("cleaning_mode"))}kind(C){let H=this.modes(),L=this.val("helper");return(!C||C==="vac_and_mop")&&L&&L!=="vacuum"&&H.includes(L)?L:C?L1(C):H.includes("vac_then_mop")?"vac_then_mop":C}anim(){var r,i,t;let C=(r=this.st("vacuum"))==null?void 0:r.state,H=(i=this.val("status"))!=null?i:"",L=this.modeNow();if(!C||C==="unavailable"||H==="device_offline")return"offline";if(C==="error"||H==="error"||H==="charging_problem")return"error";if(H==="emptying_the_bin")return"empty";if(H==="washing_the_mop"||H==="attaching_the_mop"||H==="detaching_the_mop")return"wash";if(C==="returning"||["returning_home","docking","going_to_wash_the_mop","back_to_dock_washing_duster"].includes(H))return"return";if(H==="mapping")return"map";let M=this.carry();return M?M==="to_dock"?"carry_in":"carry_out":C==="paused"?"pause":C==="cleaning"?H.includes("clean_mop_cleaning")?"cleanmop":H.includes("mopping")?"mop":L==="vac_and_mop"?"cleanmop":L==="mop"?"mop":"clean":this.drying()?"dry":H==="charging"&&((t=this.numVal("battery"))!=null?t:100)<100?"charge":"idle"}carry(){var L,M;let C=(M=(L=this.st("vacuum"))==null?void 0:L.state)!=null?M:"";if(_.includes(C))return;let H=this.val("back");if(H===S.carry&&C!=="docked")return"to_dock";if(H===S.done)return"back";if(this.val("prep")===x.done)return"floor"}drying(){var C;return((C=this.numVal("mop_drying_remaining_time"))!=null?C:0)>0}statusText(){var M,r,i;let C=(M=this.st("vacuum"))==null?void 0:M.state,H=this.val("status");if(!C||C==="unavailable")return"Nicht erreichbar";let L=this.carry();if(L)return{to_dock:"Muss zur Station",back:"Bereit zum Zur\xFCckbringen",floor:"Bereit f\xFCrs andere Stockwerk"}[L];if(this.drying()&&!_.includes(C)&&C!=="paused"&&C!=="error")return"Mopp trocknet";if(this.val("back")===S.running&&!["emptying_the_bin","washing_the_mop","drying"].includes(H!=null?H:""))return"Station arbeitet";if(H==="charging"&&((r=this.numVal("battery"))!=null?r:0)>=100)return"Voll geladen";if(H==="cleaning"||!H&&C==="cleaning"){let t=this.kind(this.current("cleaning_mode"));return t==="vacuum"?"Saugt":t==="mop"?"Wischt":t==="vac_and_mop"?"Saugt & wischt":t==="vac_then_mop"?"Saugt, dann wischt":"Reinigt"}return H?c(H2,H):(i={docked:"In der Station",idle:"Bereit",paused:"Pausiert",returning:"F\xE4hrt zur Station",error:"Fehler"}[C])!=null?i:C}issues(){var i;let C=[],H=(t,A="mdi:alert-circle")=>C.push({level:"error",text:t,icon:A}),L=(i=this.st("vacuum"))==null?void 0:i.state;(!L||L==="unavailable"||this.val("status")==="device_offline")&&H("Roboter nicht erreichbar","mdi:robot-vacuum");let M=this.val("vacuum_error");M&&M!=="none"&&H(c(s1,M),"mdi:robot-vacuum");let r=this.val("dock_error");r&&r!=="ok"&&H(`Station: ${c(u1,r)}`,"mdi:home-import-outline"),this.val("status")==="charging_problem"&&H("Ladeproblem","mdi:alert-circle"),L==="error"&&!C.length&&H("Roboter meldet einen Fehler","mdi:robot-vacuum"),this.val("clean_box_empty")==="on"?H("Frischwassertank leer \u2014 auff\xFCllen","mdi:water"):this.val("water_shortage")==="on"&&H("Wassermangel \u2014 Frischwassertank auff\xFCllen","mdi:water"),this.val("dirty_box_full")==="on"&&H("Schmutzwassertank voll \u2014 leeren","mdi:water");for(let t of this.consumables())t.due&&C.push({level:"warn",text:`${t.name}: ${t.left<=0?"Wartung \xFCberf\xE4llig":"Wartung bald f\xE4llig"}`,icon:t.icon});return C}consumables(){var H;let C=(H=this._config.maintenance_warn)!=null?H:10;return i2.flatMap(L=>{let M=this.numVal(L.key);if(M==null)return[];let r=Math.max(0,Math.min(100,M/L.life*100));return[{...L,left:M,pct:r,due:r<=C,resetId:this._e[L.reset]}]})}call(C,H,L){var M;(M=this.hass)==null||M.callService(C,H,L).catch(r=>{var i;this.dispatchEvent(new CustomEvent("hass-notification",{detail:{message:`Fehler: ${(i=r==null?void 0:r.message)!=null?i:r}`},bubbles:!0,composed:!0}))})}vac(C,H={}){this.call("vacuum",C,{entity_id:this._config.entity,...H})}pick(C,H){var L;if(!(C==="cleaning_mode"?!this._config.mode_script&&this.modeNow()===L1(H):((L=this._pending[C])!=null?L:this.current(C))===H)){if(C==="cleaning_mode")this._freeze={fan:this.shown("fan"),mop_intensity:this.shown("mop_intensity")},this._freezeSig=void 0;else{let M={...this._freeze};delete M[C],this._freeze=M}this._retried.delete(C),this.dropPending(C),this._pending={...this._pending,[C]:H},this.send(C,H),this.armPendingTimer()}}send(C,H){let L=C==="cleaning_mode"?this._config.mode_script:void 0;L?this.call("script","turn_on",{entity_id:L,variables:{modus:Y.includes(H)?"vac_then_mop":H}}):C==="fan"?this.vac("set_fan_speed",{fan_speed:H}):this.call("select","select_option",{entity_id:this._e[C],option:H})}armPendingTimer(){clearTimeout(this._pendingTimer);let C="cleaning_mode"in this._pending&&!!this._config.mode_script;this._pendingTimer=window.setTimeout(()=>{let H=!1;for(let[L,M]of Object.entries(this._pending))L==="cleaning_mode"||this.current(L)===M||this._retried.has(L)||(this._retried.add(L),this.send(L,M),H=!0);H?this.armPendingTimer():(this._pending={},this._retried.clear())},C?45e3:8e3)}setPrep(C){this.call("input_select","select_option",{entity_id:this._config.floor_prep,option:C})}ask(C){this._confirm=C}moreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this._config.entity},bubbles:!0,composed:!0}))}render(){var M;if(!this.hass||!this._config)return d;let C=this.anim(),H=!!((M=this.hass.themes)!=null&&M.darkMode),L=this._config.animations===!1;return m`<div class="card ${H?"dark":""} ${L?"noanim":""}" style="--accent:${this.glow(C)};--rb-accent:${M1[C]}">
      ${this.renderHero(C)}
      ${this.renderStatus()}
      ${this.renderControls()}
      ${this.renderActions()}
    </div>
    ${this.renderMenu()}
    ${this.renderConfirm()}`}glow(C){let H=this.issues();return C==="offline"||C==="error"||H.some(L=>L.level==="error")?M1[C==="offline"?"offline":"error"]:this.val("back")===S.running?b:C==="charge"||C==="idle"?H.length?b5:M1.charge:M1[C]}renderHero(C){var p,n,l,o;let H=this.numVal("battery"),L=this.val("charging")==="on"||this.val("status")==="charging",M=this.issues(),r=M.some(Z=>Z.level==="error")?"error":M.length?"warn":"ok",i={ok:"mdi:check-circle",warn:"mdi:alert",error:"mdi:alert-circle"}[r],t={ok:"Alles in Ordnung",warn:"Wartung f\xE4llig",error:"Problem"}[r],A=(p=this.st("vacuum"))==null?void 0:p.state,a=C==="return"?"ghost":A==="docked"||["charge","empty","wash","carry_in","carry_out"].includes(C)?"in":"none";return m`<div class="hero tint">
      <div class="name">${(o=(l=this._config.name)!=null?l:(n=this.st("vacuum"))==null?void 0:n.attributes.friendly_name)!=null?o:"Saugroboter"}</div>
      <div class="chips">
        ${H!=null?m`<span class="chip bat ${H<=20&&!L?"low":""}" title="Akku">
          ${c1(L5(H,L))}<span>${k(H)} %</span></span>`:d}
        <button class="chip health ${r}" title="${t} — Zustand & Wartung" aria-label="Zustand und Wartung"
          @click=${()=>this._menu=!0}>${v(i)}${M.length>1?m`<span>${M.length}</span>`:d}</button>
      </div>
      <button class="bot-wrap" aria-label="Details" @click=${this.moreInfo}>${r5(C,a)}</button>
    </div>`}renderStatus(){var r,i;let C=(i=(r=this.st("vacuum"))==null?void 0:r.state)!=null?i:"",H=_.includes(C)||C==="paused",L=[],M;if(H){let t=this.val("current_room");t&&L.push(t);let A=this.numVal("cleaning_area");A!=null&&L.push(`${k(A,1)} m\xB2`);let a=this.numVal("cleaning_time");a!=null&&L.push(`${k(a)} min`),M=this.numVal("clean_percent")}else{let t=this.issues().find(p=>p.level==="error");t&&L.push(t.text);let A=this.numVal("mop_drying_remaining_time");A&&A>0&&L.push(`noch ${j(A)}`);let a=g1(this.val("last_clean_end"));!t&&a&&this._config.show_last_clean!==!1&&L.push(`Zuletzt gereinigt ${a}`)}return m`<div class="status">
      <div class="primary">${this.statusText()}</div>
      ${L.length?m`<div class="secondary">${L.join(" \xB7 ")}</div>`:d}
      ${M!=null&&M>0?m`<div class="progress" title="${k(M)} %"><i style="width:${M}%"></i></div>`:d}
    </div>`}renderControls(){var p,n,l,o,Z,s;let C=this.modes(),H=this.modeNow(),L=(n=(p=this.st("vacuum"))==null?void 0:p.state)!=null?n:"",M=_.includes(L)||L==="paused",r=!L||L==="unavailable",i=H!=="mop",t=H!=="vacuum"&&!!this._e.mop_intensity,A=(o=(l=this.st("vacuum"))==null?void 0:l.attributes.fan_speed_list)!=null?o:[],a=(s=(Z=this.st("mop_intensity"))==null?void 0:Z.attributes.options)!=null?s:[];return m`<div class="controls">
      ${C.length?m`<div class="seg" role="radiogroup" aria-label="Reinigungsmodus">
        ${C.map(u=>{var f1,k1,b1;let E=Y.includes(u)?"vac_then_mop":u,W=E===H,A5=u==="vac_then_mop"&&!this._config.mode_script&&!((k1=(f1=this.st("cleaning_mode"))==null?void 0:f1.attributes.options)!=null?k1:[]).includes(u)?()=>W||this.ask({title:"Saugen, dann Wischen",info:!0,ok:"OK",run:()=>{},text:"Diesen Modus kann Home Assistant beim Saros noch nicht einstellen. Bitte in der Roborock-App w\xE4hlen \u2014 die Karte zeigt ihn dann an."}):()=>this.pick("cleaning_mode",u);return m`<button role="radio" aria-checked=${W} class=${W?"on":""}
            ?disabled=${M||r} @click=${A5}>
            <span class="mi">${((b1=L2[E])!=null?b1:["mdi:robot-vacuum"]).map(a5=>v(a5))}</span><span>${c(V2,E)}</span></button>`})}
      </div>`:d}
      ${i&&A.length?this.renderLevels("fan","Saugst\xE4rke","mdi:fan",M2.filter(u=>u!=="max_plus"||H==="vacuum"||this.shown("fan")===u),A,r2,r):d}
      ${t&&a.length?this.renderLevels("mop_intensity","Wasserfluss","mdi:water",e2,a,t2,r):d}
    </div>`}renderLevels(C,H,L,M,r,i,t){let A=M.filter(l=>r.includes(l)),a=this.shown(C),p=A.indexOf(a!=null?a:""),n=this.stale(C);return m`<div class="levels ${n?"stale":""}" title=${n?"Zuletzt bekannter Wert \u2014 Home Assistant meldet gerade keinen":""}>
      <div class="lv-head">${v(L)}<span>${H}</span><b>${a?c(i,a):"\u2013"}${n?m`<small> · zuletzt</small>`:d}</b></div>
      <div class="steps">${A.map((l,o)=>m`<button class=${o<=p?"on":""} ?disabled=${t}
        title=${c(i,l)} aria-label="${H} ${c(i,l)}" @click=${()=>this.pick(C,l)}></button>`)}</div>
    </div>`}renderActions(){var n,l,o,Z;let C=(l=(n=this.st("vacuum"))==null?void 0:n.state)!=null?l:"",H=!C||C==="unavailable",L=this.val("prep"),M=L===x.cancel&&Date.now()-Date.parse((Z=(o=this.st("prep"))==null?void 0:o.last_changed)!=null?Z:"")>6e4,r=L===x.start||L===x.running||L===x.cancel&&!M,i=C==="cleaning",t=this.val("back"),A=(s,u,E,W)=>m`<div class="banner ${s}">${u}<div><b>${E}</b>${W}</div></div>${this.abortAll()}`,a=!_.includes(C);if(a&&(t===S.running||t===S.carry&&C==="docked"))return A("",m`<svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle></svg>`,"Station arbeitet","L\xE4uft automatisch \u2014 danach kommt der Hinweis zum Zur\xFCckbringen.");if(a&&t===S.carry)return A("warn",v("mdi:hand-back-right"),"Zur Station tragen","Roboter von Hand in die Station stellen \u2014 der Vorgang startet dann automatisch.");if(a&&t===S.done)return A("",v("mdi:check-circle"),"Station fertig",m`Roboter an die vorherige Stelle bringen und einfach nur die ${v("mdi:power","inl")}-Taste drücken.`);if(r)return m`<div class="actions">${this.prepButton(L)}</div>`;if(L===x.done&&!_.includes(C))return m`<div class="banner">${v("mdi:check-circle")}<div><b>Vorbereitung fertig</b>
        Roboter ins gewünschte Stockwerk stellen und einfach nur die ${v("mdi:power","inl")}-Taste drücken.</div></div>
        ${this.abortAll()}`;let p;if(i||C==="returning")p=m`
        ${this.btn("mdi:pause","Pausieren",()=>this.vac("pause"),"sec")}
        ${i?this.btn("mdi:stop","Abbrechen",()=>this.ask({title:"Reinigung abbrechen?",text:"Der Roboter beendet die Reinigung und f\xE4hrt zur\xFCck zur Station.",ok:"Abbrechen",danger:!0,run:()=>this.vac("return_to_base")}),"danger"):d}`;else if(C==="paused"){let s=this._pausedForPrep?()=>this.ask({title:"Hier fortsetzen?",text:"Der Roboter wurde f\xFCr ein anderes Stockwerk vorbereitet. Trotzdem hier weiterreinigen?",ok:"Fortsetzen",run:()=>this.vac("start")}):this._pausedFrom==="returning"?()=>this.vac("return_to_base"):()=>this.vac("start");p=m`
        ${this.btn("mdi:play","Fortsetzen",s,"primary")}
        ${this.btn("mdi:stop","Abbrechen",()=>this.ask({title:"Reinigung abbrechen?",text:"Der Roboter beendet die Reinigung und f\xE4hrt zur\xFCck zur Station.",ok:"Abbrechen",danger:!0,run:()=>this.vac("return_to_base")}),"danger")}`}else p=m`
        ${this.btn("mdi:play","Starten",()=>this.vac("start"),"primary",H)}
        ${this._config.floor_prep?this.prepButton(L):d}`;return m`<div class="actions">${p}</div>`}btn(C,H,L,M,r=!1){return m`<button class="btn ${M}" ?disabled=${r} @click=${L}>${v(C)}<span>${H}</span></button>`}abortAll(){return m`<div class="actions">${this.btn("mdi:stop","Reinigung abbrechen",()=>this.ask({title:"Reinigung komplett abbrechen?",text:"Die Reinigung wird beendet, Stockwerk-Wechsel und R\xFCckweg werden zur\xFCckgesetzt. Der Roboter bleibt, wo er ist.",ok:"Abbrechen",danger:!0,run:()=>{this.vac("stop"),this._config.floor_back&&this.val("back")!==S.ok&&this.call("input_select","select_option",{entity_id:this._config.floor_back,option:S.ok}),this.val("prep")===x.done&&this.setPrep(x.cancel)}}),"danger")}</div>`}cancelPrep(){this.ask({title:"Vorbereitung abbrechen?",text:"Die Stockwerk-Vorbereitung wird abgebrochen.",ok:"Abbrechen",danger:!0,run:()=>this.setPrep(x.cancel)})}prepButton(C){let H=m`<svg class="spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle></svg>`,L=()=>this.cancelPrep();switch(C){case x.ready:return m`<button class="btn sec" @click=${()=>this.setPrep(x.start)}>${v("mdi:stairs")}<span>Stockwerk vorbereiten</span></button>`;case x.start:case x.running:return m`<button class="btn sec busy" title="Antippen zum Abbrechen" @click=${L}>
          ${H}<span>Stockwerk wird vorbereitet…</span>${v("mdi:close","end")}</button>`;case x.cancel:return m`<button class="btn sec busy" disabled>${H}<span>Wird abgebrochen…</span></button>`;default:return m`<button class="btn sec" disabled title="Gerade nicht möglich"><span>Stockwerk vorbereiten</span>${v("mdi:lock","end")}</button>`}}close(C){var H;(H=this.renderRoot.querySelector(C))==null||H.close()}renderMenu(){var p,n,l;if(!this._menu)return d;let C=this.issues(),H=o=>this.val(o)==="on",L=(o,Z,s,u="")=>m`<div class="row ${u}"><span class="ic">${v(o)}</span><span class="txt">${Z}</span><span class="val">${s}</span></div>`,M=(o,Z,s)=>m`<span class=${o?"good":"bad"}>${o?Z:s}</span>`,r=this.val("vacuum_error"),i=this.val("dock_error"),t=this.numVal("mop_drying_remaining_time"),A=[this.numVal("total_cleaning_count")!=null?L("mdi:counter","Reinigungen",k(this.numVal("total_cleaning_count"))):d,this.numVal("total_cleaning_area")!=null?L("mdi:ruler-square","Gereinigte Fl\xE4che",`${k(this.numVal("total_cleaning_area"))} m\xB2`):d,this.numVal("total_cleaning_time")!=null?L("mdi:clock-outline","Reinigungszeit",j(this.numVal("total_cleaning_time"))):d,this.val("last_clean_end")?L("mdi:history","Letzte Reinigung",(p=g1(this.val("last_clean_end")))!=null?p:"\u2013"):d],a=this.consumables().some(o=>!o.resetId&&o.key!=="strainer_time_left");return m`<dialog id="menu" class="dlg ${(l=(n=this.hass)==null?void 0:n.themes)!=null&&l.darkMode?"dark":""}"
      @close=${()=>this._menu=!1} @click=${o=>o.target===o.currentTarget&&o.currentTarget.close()}>
      <div class="dlg-in">
        <div class="dlg-head"><span>Zustand & Wartung</span>
          <button class="x" aria-label="Schließen" @click=${()=>this.close("#menu")}>${v("mdi:close")}</button></div>
        <div class="dlg-body">

        ${C.length?C.map(o=>m`<div class="msg ${o.level}">${v(o.level==="error"?"mdi:alert-circle":"mdi:alert")}<span>${o.text}</span></div>`):m`<div class="msg ok">${v("mdi:check-circle")}<span>Alles in Ordnung</span></div>`}

        <h3>Roboter & Station</h3>
        ${this._e.vacuum_error?L("mdi:robot-vacuum","Roboter",M(!r||r==="none","Kein Fehler",c(s1,r))):d}
        ${this._e.dock_error?L("mdi:home-import-outline","Station",M(!i||i==="ok","Kein Fehler",c(u1,i))):d}
        ${this._e.clean_box_empty?L("mdi:water","Frischwassertank",M(!H("clean_box_empty")&&!H("water_shortage"),"OK","Auff\xFCllen")):d}
        ${this._e.dirty_box_full?L("mdi:water","Schmutzwassertank",M(!H("dirty_box_full"),"OK","Leeren")):d}
        ${this._e.water_box_attached?L("mdi:water","Wasserkasten",H("water_box_attached")?"Eingesetzt":"Nicht eingesetzt"):d}
        ${this._e.mop_attached?L("mdi:robot-vacuum","Mopp",H("mop_attached")?"Angebracht":"Abgelegt"):d}
        ${t&&t>0?L("mdi:clock-outline","Mopp trocknet",`noch ${j(t)}`):d}

        <h3>Verschleißteile</h3>
        ${this.consumables().map(o=>m`<div class="row cons ${o.due?"due":""}">
          <span class="ic">${v(o.icon)}</span>
          <span class="txt">${o.name}<small>${o.left<=0?"Wartung \xFCberf\xE4llig":`noch ${j(o.left)}`}${!o.resetId&&o.key==="strainer_time_left"?" \xB7 Zur\xFCcksetzen in der Roborock-App":""}</small>
            <span class="bar"><i style="width:${o.pct}%"></i></span></span>
          <button class="reset" ?disabled=${!o.resetId} title=${o.resetId?"Zur\xFCcksetzen":o.key==="strainer_time_left"?"In der Roborock-App zur\xFCcksetzen":"Reset-Taste in HA deaktiviert"}
            aria-label="${o.name} zurücksetzen" @click=${()=>this.ask({title:`${o.name} zur\xFCcksetzen?`,text:`Nur nach dem Tauschen bzw. Reinigen. Der Z\xE4hler startet dann wieder bei ${o.life} h.`,ok:"Zur\xFCcksetzen",run:()=>this.call("button","press",{entity_id:o.resetId})})}>${v("mdi:restore")}</button>
        </div>`)}
        ${a?m`<div class="note">Zurücksetzen: die „… zurücksetzen“-Tasten des Roboters in HA aktivieren
          (Einstellungen → Geräte → Saros → Entitäten).</div>`:d}

        ${A.some(o=>o!==d)?m`<h3>Statistik</h3>${A}`:d}

        <div class="dlg-foot">
          <button class="btn sec" @click=${()=>this.vac("locate")}>${v("mdi:map-marker-radius")}<span>Roboter finden</span></button>
        </div>
        </div>
      </div>
    </dialog>`}renderConfirm(){var H,L;let C=this._confirm;return C?m`<dialog id="confirm" class="dlg small ${(L=(H=this.hass)==null?void 0:H.themes)!=null&&L.darkMode?"dark":""}" @close=${()=>this._confirm=void 0}
      @click=${M=>M.target===M.currentTarget&&M.currentTarget.close()}>
      <div class="dlg-in pad">
        <div class="dlg-head"><span>${C.title}</span></div>
        <p>${C.text}</p>
        <div class="dlg-btns">
          ${C.info?d:m`<button class="btn sec" @click=${()=>this.close("#confirm")}>Zurück</button>`}
          <button class="btn ${C.danger?"danger":"primary"}" @click=${()=>{this.close("#confirm"),C.run()}}>${C.ok}</button>
        </div>
      </div>
    </dialog>`:d}};D.properties={hass:{attribute:!1},_config:{state:!0},_menu:{state:!0},_confirm:{state:!0},_pending:{state:!0},_lastMop:{state:!0},_freeze:{state:!0}},D.styles=o5;customElements.get("saros-card")||customElements.define("saros-card",D);var r1=window;r1.customCards=r1.customCards||[];r1.customCards.some(e=>e.type==="saros-card")||r1.customCards.push({type:"saros-card",name:"Saros-Karte",description:"Saugroboter steuern: Modus, St\xE4rke, Stockwerk vorbereiten, Wartung",preview:!1});console.info("%c SAROS-CARD %c 1.0.0 (2026-11-02 12:28 UTC) ","background:#009688;color:#fff;border-radius:3px 0 0 3px","background:#555;color:#fff;border-radius:0 3px 3px 0");
