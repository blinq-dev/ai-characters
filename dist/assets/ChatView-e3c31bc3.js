var Le=Object.defineProperty;var Ee=(a,i,e)=>i in a?Le(a,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[i]=e;var m=(a,i,e)=>(Ee(a,typeof i!="symbol"?i+"":i,e),e);import{q as Me,s as Te,f as u,v as Re,x as Ne,y as Oe,r as p,z as k,A as Ve,a as he,m as pe,u as te,o as _,c as C,B as j,b as o,h as I,i as ge,n as Z,C as E,D as M,F as q,E as Pe,G as H,H as Ie,I as ae,t as R,k as X,J as De,K as Ae,l as Be,g as We}from"./index-62a06c97.js";import{u as me,C as N}from"./chat-8fe1c923.js";function fe(a){return Me()?(Te(a),!0):!1}function Q(a){return typeof a=="function"?a():u(a)}const ve=typeof window<"u",se=()=>{},ee=Ue();function Ue(){var a;return ve&&((a=window==null?void 0:window.navigator)==null?void 0:a.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent)}const le={mounted:"mounted",updated:"updated",unmounted:"unmounted"};function $e(...a){if(a.length!==1)return Re(...a);const i=a[0];return typeof i=="function"?Ne(Oe(()=>({get:i,set:se}))):p(i)}function A(a){var i;const e=Q(a);return(i=e==null?void 0:e.$el)!=null?i:e}const be=ve?window:void 0;function K(...a){let i,e,s,t;if(typeof a[0]=="string"||Array.isArray(a[0])?([e,s,t]=a,i=be):[i,e,s,t]=a,!i)return se;Array.isArray(e)||(e=[e]),Array.isArray(s)||(s=[s]);const r=[],d=()=>{r.forEach(b=>b()),r.length=0},h=(b,L,g,f)=>(b.addEventListener(L,g,f),()=>b.removeEventListener(L,g,f)),v=k(()=>[A(i),Q(t)],([b,L])=>{d(),b&&r.push(...e.flatMap(g=>s.map(f=>h(b,g,f,L))))},{immediate:!0,flush:"post"}),S=()=>{v(),d()};return fe(S),S}let ue=!1;function ce(a,i,e={}){const{window:s=be,ignore:t=[],capture:r=!0,detectIframe:d=!1}=e;if(!s)return;ee&&!ue&&(ue=!0,Array.from(s.document.body.children).forEach(g=>g.addEventListener("click",se)));let h=!0;const v=g=>t.some(f=>{if(typeof f=="string")return Array.from(s.document.querySelectorAll(f)).some(y=>y===g.target||g.composedPath().includes(y));{const y=A(f);return y&&(g.target===y||g.composedPath().includes(y))}}),b=[K(s,"click",g=>{const f=A(a);if(!(!f||f===g.target||g.composedPath().includes(f))){if(g.detail===0&&(h=!v(g)),!h){h=!0;return}i(g)}},{passive:!0,capture:r}),K(s,"pointerdown",g=>{const f=A(a);f&&(h=!g.composedPath().includes(f)&&!v(g))},{passive:!0}),d&&K(s,"blur",g=>{setTimeout(()=>{var f;const y=A(a);((f=s.document.activeElement)==null?void 0:f.tagName)==="IFRAME"&&!(y!=null&&y.contains(s.document.activeElement))&&i(g)},0)})].filter(Boolean);return()=>b.forEach(g=>g())}const Fe={[le.mounted](a,i){const e=!i.modifiers.bubble;if(typeof i.value=="function")a.__onClickOutside_stop=ce(a,i.value,{capture:e});else{const[s,t]=i.value;a.__onClickOutside_stop=ce(a,s,Object.assign({capture:e},t))}},[le.unmounted](a){a.__onClickOutside_stop()}};function we(a){const i=window.getComputedStyle(a);if(i.overflowX==="scroll"||i.overflowY==="scroll"||i.overflowX==="auto"&&a.clientWidth<a.scrollWidth||i.overflowY==="auto"&&a.clientHeight<a.scrollHeight)return!0;{const e=a.parentNode;return!e||e.tagName==="BODY"?!1:we(e)}}function ze(a){const i=a||window.event,e=i.target;return we(e)?!1:i.touches.length>1?!0:(i.preventDefault&&i.preventDefault(),!1)}function Ge(a,i=!1){const e=p(i);let s=null,t;k($e(a),h=>{if(h){const v=h;t=v.style.overflow,e.value&&(v.style.overflow="hidden")}},{immediate:!0});const r=()=>{const h=Q(a);!h||e.value||(ee&&(s=K(h,"touchmove",v=>{ze(v)},{passive:!1})),h.style.overflow="hidden",e.value=!0)},d=()=>{const h=Q(a);!h||!e.value||(ee&&(s==null||s()),h.style.overflow=t,e.value=!1)};return fe(d),Ve({get(){return e.value},set(h){h?r():d()}})}function He(){let a=!1;const i=p(!1);return(e,s)=>{if(i.value=s.value,a)return;a=!0;const t=Ge(e,s.value);k(i,r=>t.value=r)}}He();const je={class:"absolute w-full px-3 items-center -mt-10 uppercase left-0 text-white bold text-sm flex gap-3 opacity-0 hover:opacity-100 transition"},qe={key:0},Ke=["innerHTML"],Qe=["innerHTML"],Je={key:1,class:"fixed flex flex-col z-50 top-0 bottom-24 left-0 right-0 backdrop-brightness-90 backdrop-blur-3xl rounded-2xl text-white/80 p-5 m-10"},Ye={class:"overflow-scroll grow"},Xe=he({__name:"ChatBubble",props:{message:{},showUser:{type:Boolean}},setup(a){const i=a,e=me(),s=pe(),t=te(),r=p(!1);let d="";const h=()=>{r.value=!1,i.message.setContentWeirdBug(d)},v=()=>{r.value=!0,d=i.message.getContentWeirdBug()},S=()=>{e.saveMessages(s.selectedCharacter.botSlug),r.value=!1},b=()=>{e.deleteMessage(i.message),e.saveMessages(s.selectedCharacter.botSlug),r.value=!1};return(L,g)=>(_(),C(q,null,[u(i).message.role!="system"?(_(),C("div",{key:0,class:j(["flex flex-col w-10/12 md:w-3/4 lg:w-2/3 xl:w-5/12",{"self-end rounded-br-none":u(i).message.side=="right","self-start rounded-bl-none":u(i).message.side=="left"}])},[o("div",{class:j(["relative backdrop-blur-xl p-3 rounded-2xl text-white bg-[#434851]",{"mr-1 md:mr-8 ":u(i).message.side=="right","ml-1 md:ml-8  ":u(i).message.side=="left","rounded-br-none":u(i).showUser&&u(i).message.side=="right","rounded-bl-none":u(i).showUser&&u(i).message.side=="left"}]),style:{}},[o("div",je,[u(i).message.isCheckpoint()?(_(),C("span",qe,"Checkpoint")):I("",!0),o("button",{onClick:v,class:"uppercase opacity-20 hover:opacity-100"},"Edit"),o("button",{onClick:b,class:"uppercase opacity-20 hover:opacity-100"},"Delete")]),o("span",{class:"markdown",innerHTML:u(i).message.getHtmlContent()},null,8,Ke)],2),L.showUser?(_(),C("div",{key:0,class:j(["text-white mb-4",{"self-end":u(i).message.side=="right"}])},[o("div",{class:"w-16 h-16 mt-3 rounded-3xl flex items-center justify-center",style:Z({backgroundColor:u(i).message.side==="left"?"#a8d2fc":u(s).selectedCharacter.color})},[o("div",{class:"",innerHTML:u(ge)(u(i).message.side==="left"?u(t).avatar:u(s).selectedCharacter.avatar)},null,8,Qe)],4)],2)):I("",!0)],2)):I("",!0),r.value?E((_(),C("div",Je,[o("div",Ye,[E(o("textarea",{class:"w-full h-full bg-transparent","onUpdate:modelValue":g[0]||(g[0]=f=>u(i).message.content=f)},null,512),[[M,u(i).message.content]])]),o("div",{class:"flex gap-2 mt-4 shrink-0"},[o("button",{onClick:S,class:"backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg p-2"},"Save"),o("button",{onClick:b,class:"backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg p-2"},"Delete message"),o("button",{onClick:h,class:"backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg p-2"},"Dismiss")])])),[[u(Fe),h]]):I("",!0)],64))}});class ie{constructor(){m(this,"callbacks",[])}on(i,e){this.callbacks.push({callback:e,event:i})}off(i,e){this.callbacks=this.callbacks.filter(s=>s.event!==i||e&&s.callback!==e)}once(i,e){const s=t=>{e(t),this.off(i,s)};return this.on(i,s),s}trigger(i,e){this.callbacks.filter(s=>s.event===i).forEach(s=>s.callback(e))}}class Ze extends ie{constructor(e="en-US"){super();m(this,"recognition");m(this,"status");m(this,"transcript");m(this,"interimTranscript");m(this,"isListening",p(!1));m(this,"startWord",p("start nu"));m(this,"stopWord",p("stop nu"));m(this,"autoRestart",p(!0));m(this,"isStopping",!1);m(this,"timeout",1e3);m(this,"debounced",null);try{this.recognition=new webkitSpeechRecognition}catch{this.recognition=new SpeechRecognition}this.recognition.lang=e,this.status=p("initializing"),this.transcript=p(""),this.interimTranscript=p(""),this.recognition.onstart=this.onStart.bind(this),this.recognition.onresult=this.onResult.bind(this),this.recognition.onerror=this.onError.bind(this),this.recognition.onend=this.onEnd.bind(this),this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.lang=e}setLanguage(e){this.recognition.lang=e}onStart(){this.status.value="started"}startListen(){if(this.isListening.value=!0,console.log("Status",this.status.value),this.status.value!=="started")try{this.start(),this.status.value="started"}catch{this.status.value="error"}}stopListen(){this.isListening.value=!1,this.isStopping=!0,this.stop(),this.interimTranscript.value=""}toggleListen(){this.isListen()?this.stopListen():this.startListen()}isListen(){return this.isListening.value}onResult(e){if(this.status.value="result",this.isStopping){this.transcriptDone();return}this.interimTranscript.value="";for(let s=e.resultIndex;s<e.results.length;++s){let t=e.results[s][0].transcript;t.toLowerCase().includes(this.startWord.value)&&this.startListen(),this.isListen()&&(t=t.replace(new RegExp(`.*${this.startWord.value}`,"gi"),""),t=t.replace(new RegExp(`${this.stopWord.value}.*`,"gi"),""),this.interimTranscript.value+=t)}if(this.isListen()){if(this.interimTranscript.value.toLowerCase().includes(this.stopWord.value)){this.transcriptDone(),this.stopListen();return}this.debounced!==null&&clearTimeout(this.debounced),this.debounced=setTimeout(()=>{this.isListen()&&this.transcriptDone()},this.timeout)}}transcriptDone(){var s;this.isStopping=!0,(s=this.recognition)==null||s.stop();let e=this.interimTranscript.value;e=e.replace(new RegExp(`.*${this.startWord.value}`,"gi"),""),e=e.replace(new RegExp(`${this.stopWord.value}.*`,"gi"),""),e&&this.trigger("transcript",e),this.interimTranscript.value=""}onError(e){this.status.value="error",console.log(e)}onEnd(){this.status.value="stopped",this.isStopping=!1,this.autoRestart&&setTimeout(()=>{this.start()},1),this.trigger("ended",null)}async start(){var e;if(this.status.value!=="started")try{(e=this.recognition)==null||e.start()}catch(s){console.error(s)}}stop(){var e;this.isStopping=!0,this.autoRestart=!1,this.once("ended",()=>{this.autoRestart=!0,this.isStopping=!1}),this.status.value==="started"&&((e=this.recognition)==null||e.stop())}}var Se={};(function(a){var i=function(e,s){if(!(this instanceof i))return new i(e,s);this.INITIALIZING=-1,this.CONNECTING=0,this.OPEN=1,this.CLOSED=2,this.url=e,s=s||{},this.headers=s.headers||{},this.payload=s.payload!==void 0?s.payload:"",this.method=s.method||this.payload&&"POST"||"GET",this.withCredentials=!!s.withCredentials,this.FIELD_SEPARATOR=":",this.listeners={},this.xhr=null,this.readyState=this.INITIALIZING,this.progress=0,this.chunk="",this.addEventListener=function(t,r){this.listeners[t]===void 0&&(this.listeners[t]=[]),this.listeners[t].indexOf(r)===-1&&this.listeners[t].push(r)},this.removeEventListener=function(t,r){if(this.listeners[t]!==void 0){var d=[];this.listeners[t].forEach(function(h){h!==r&&d.push(h)}),d.length===0?delete this.listeners[t]:this.listeners[t]=d}},this.dispatchEvent=function(t){if(!t)return!0;t.source=this;var r="on"+t.type;return this.hasOwnProperty(r)&&(this[r].call(this,t),t.defaultPrevented)?!1:this.listeners[t.type]?this.listeners[t.type].every(function(d){return d(t),!t.defaultPrevented}):!0},this._setReadyState=function(t){var r=new CustomEvent("readystatechange");r.readyState=t,this.readyState=t,this.dispatchEvent(r)},this._onStreamFailure=function(t){var r=new CustomEvent("error");r.data=t.currentTarget.response,this.dispatchEvent(r),this.close()},this._onStreamAbort=function(t){this.dispatchEvent(new CustomEvent("abort")),this.close()},this._onStreamProgress=function(t){if(this.xhr){if(this.xhr.status!==200){this._onStreamFailure(t);return}this.readyState==this.CONNECTING&&(this.dispatchEvent(new CustomEvent("open")),this._setReadyState(this.OPEN));var r=this.xhr.responseText.substring(this.progress);this.progress+=r.length,r.split(/(\r\n|\r|\n){2}/g).forEach(function(d){d.trim().length===0?(this.dispatchEvent(this._parseEventChunk(this.chunk.trim())),this.chunk=""):this.chunk+=d}.bind(this))}},this._onStreamLoaded=function(t){this._onStreamProgress(t),this.dispatchEvent(this._parseEventChunk(this.chunk)),this.chunk=""},this._parseEventChunk=function(t){if(!t||t.length===0)return null;var r={id:null,retry:null,data:"",event:"message"};t.split(/\n|\r\n|\r/).forEach(function(h){h=h.trimRight();var v=h.indexOf(this.FIELD_SEPARATOR);if(!(v<=0)){var S=h.substring(0,v);if(S in r){var b=h.substring(v+1).trimLeft();S==="data"?r[S]+=b:r[S]=b}}}.bind(this));var d=new CustomEvent(r.event);return d.data=r.data,d.id=r.id,d},this._checkStreamClosed=function(){this.xhr&&this.xhr.readyState===XMLHttpRequest.DONE&&this._setReadyState(this.CLOSED)},this.stream=function(){this._setReadyState(this.CONNECTING),this.xhr=new XMLHttpRequest,this.xhr.addEventListener("progress",this._onStreamProgress.bind(this)),this.xhr.addEventListener("load",this._onStreamLoaded.bind(this)),this.xhr.addEventListener("readystatechange",this._checkStreamClosed.bind(this)),this.xhr.addEventListener("error",this._onStreamFailure.bind(this)),this.xhr.addEventListener("abort",this._onStreamAbort.bind(this)),this.xhr.open(this.method,this.url);for(var t in this.headers)this.xhr.setRequestHeader(t,this.headers[t]);this.xhr.withCredentials=this.withCredentials,this.xhr.send(this.payload)},this.close=function(){this.readyState!==this.CLOSED&&(this.xhr.abort(),this.xhr=null,this._setReadyState(this.CLOSED))}};a.SSE=i})(Se);class de extends ie{constructor(){super();m(this,"status");m(this,"result");m(this,"chatbot","");m(this,"model","gpt-3.5-turbo");m(this,"config",{model:"gpt-3.5-turbo",temperature:1,messages:[],stream:!0});this.status=p("initializing"),this.result=p("")}async complete(e){let s=te();if(!s.apiKey&&(s.apiKey=prompt("Please enter your OpenAI API key",s.apiKey??""),s.saveSettings(),!s.apiKey))return;let t=new Se.SSE("https://api.openai.com/v1/chat/completions",{headers:{"Content-Type":"application/json",Authorization:"Bearer "+s.apiKey},method:"POST",payload:JSON.stringify({...this.config,...e??{},stream:!0})});t.addEventListener("message",async r=>{if(r.data==="[DONE]"){t.close(),this.trigger("done",this.result.value),this.result.value="";return}var d=JSON.parse(r.data);let h=d.choices[0].delta.content??"";this.result.value+=h,this.trigger("progress",{result:this.result.value,partial:h})}),t.stream(),t.onerror=r=>{let d=JSON.parse(r.data);d.error.code=="invalid_api_key"&&(s.apiKey=prompt("Please enter your OpenAI API key",s.apiKey??""),s.saveSettings()),d.error.code=="context_length_exceeded"&&s.model!=s.largeModel?(s.model=s.largeModel,console.log("Switching to large model"),this.complete({...e,model:s.largeModel})):alert("Error: "+r.data)}}}class et extends ie{constructor(e="en-US"){super();m(this,"provider");m(this,"status");m(this,"voiceList",p([]));m(this,"selectedVoice",p(""));m(this,"language","en-US");m(this,"pitch",1);m(this,"rate",1);m(this,"queue",[]);m(this,"isSpeakingQueue",p(!1));m(this,"partialBuffer","");m(this,"partialTimeout",null);this.provider=window.speechSynthesis,this.status=p("started"),this.language=e,this.populateVoiceList(),this.provider.onvoiceschanged=this.populateVoiceList.bind(this),k(this.selectedVoice,()=>{console.log("Selected voice changed",this.selectedVoice.value),window.localStorage.setItem("selectedVoice",this.selectedVoice.value)})}setLanguage(e){this.language=e,this.populateVoiceList()}populateVoiceList(){if(this.provider!==null&&(this.voiceList.value=this.provider.getVoices(),this.voiceList.value.unshift({default:!1,lang:"",localService:!1,name:"Disabled",voiceURI:""}),this.voiceList.value.length>0)){this.selectedVoice.value=this.voiceList.value[0].name;const e=window.localStorage.getItem("selectedVoice");if(e!==null){const s=this.voiceList.value.find(t=>t.name===e);s!==void 0&&(this.selectedVoice.value=s.name)}}}getSelectedVoice(){return this.voiceList.value.find(e=>e.name===this.selectedVoice.value)}async speak(e){return new Promise((s,t)=>{if(this.provider===null)return t("SpeechSynthesis not supported");if((this.getSelectedVoice()??this.voiceList.value[0]).name==="Disabled")return t("Voice is disabled");const d=new SpeechSynthesisUtterance(e);d.voice=this.getSelectedVoice()??this.voiceList.value[0],d.pitch=this.pitch,d.rate=this.rate,d.onend=s,d.onerror=t,this.provider.speak(d)})}async speakQueue(){this.queue.length===0&&(console.log("hij is klaar"),this.trigger("done",null));const e=this.queue.shift();if(e!==void 0){try{this.isSpeakingQueue.value=!0,await this.speak(e),this.isSpeakingQueue.value=!1}catch(s){this.isSpeakingQueue.value=!1,console.error(s)}this.speakQueue()}}async queueSpeak(e){e.trim()!==""&&(this.queue.push(e),!this.isSpeakingQueue.value&&(this.trigger("start",null),await this.speakQueue()))}async queueSpeakPartials(e){this.partialBuffer+=e;let s=[".","!","?",",","..."];for(let t=0;t<s.length;t++){const r=s[t];if(this.partialBuffer.includes(r)){const d=this.partialBuffer.split(r),h=d[0]+r;this.partialBuffer=d.slice(1).join(r),this.queueSpeak(h);break}}this.partialTimeout!==null&&window.clearTimeout(this.partialTimeout),this.partialTimeout=window.setTimeout(()=>{this.queueSpeak(this.partialBuffer),this.partialBuffer=""},1e3)}cancel(){this.provider!==null&&this.provider.cancel()}pause(){this.provider!==null&&this.provider.pause()}resume(){this.provider!==null&&this.provider.resume()}}const tt={class:"h-screen bg-[#2e333d]"},st={key:0,class:"fixed flex-grow-0 z-20 top-0 left-0 right-0 flex gap-2 text-white p-4 md:p-6 overflow-auto"},it=o("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"})],-1),ot=[it],nt={class:"whitespace-nowrap backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2"},rt={key:1,class:"fixed z-50 top-0 left-0 right-0 bottom-0 overflow-scroll backdrop-brightness-90 backdrop-blur-3xl text-white/80 p-5"},at={class:"flex flex-col gap-2"},lt={class:"flex"},ut=o("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1),ct=[ut],dt={class:"grid grid-cols-12 gap-4"},ht=["innerHTML"],pt={class:"flex col-span-6 flex-col gap-2"},gt=o("span",null,"Bot name:",-1),mt={class:"flex col-span-6 flex-col gap-2"},ft=o("span",null,"Description:",-1),vt={class:"flex col-span-6 flex-col gap-2"},bt=o("span",null,"Color:",-1),wt={class:"flex gap-3 flex-row"},St=["onClick"],kt={class:"flex col-span-6 flex-col gap-2"},yt=o("span",null,"Temperature:",-1),xt={class:"flex col-span-6 flex-col gap-2"},_t=o("span",null,"Max tokens:",-1),Ct={class:"flex col-span-12 flex-col gap-2"},Lt=o("span",null,"Welcome message:",-1),Et={class:"flex col-span-12 flex-col gap-2"},Mt=o("span",null,"Random subject:",-1),Tt={class:"flex col-span-12 flex-col gap-2"},Rt=o("span",null,"System prompt:",-1),Nt={class:"flex col-span-12 flex-col gap-2"},Ot=o("span",null,"Summarize prompt:",-1),Vt={class:"flex col-span-12 flex-col gap-2"},Pt=o("span",null,"Speaking Voices: ",-1),It=["value"],Dt={class:"col-span-6"},At={class:"col-span-6"},Bt={class:"col-span-6"},Wt={class:"col-span-6"},Ut={class:"flex flex-col h-full"},$t={class:"relative flex grow-0 shrink-0 px-4 md:px-6 flex-col bg-white/5"},Ft=["placeholder","onKeydown"],zt=o("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"w-6 h-6"},[o("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"})],-1),Gt=[zt],Kt=he({__name:"ChatView",setup(a){const i=p(""),e=p(),s=p(),t=me(),r=pe(),d=te(),h=new Ze("nl-NL"),v=new de,S=new et("nl"),b=new de,L=p(""),g=p(""),f=p(""),y=p(""),B=p(""),W=p(""),U=p(1),$=p(250),F=p(""),z=p(""),G=p("");let l=null;Pe(async()=>{let w=H.currentRoute.value.params.slug;if(w&&(w=Array.isArray(w)?w[0]:w,r.selectCharactersFromSlug(w)),l=r.selectedCharacter,l==null)return H.push({name:"characters"});g.value=l.botSlug,L.value=l.botName,f.value=l.systemPrompt,y.value=l.summarizePrompt,B.value=l.description,W.value=l.color,U.value=l.temperature,$.value=l.maxTokens,F.value=l.welcomeMessage,z.value=l.randomSubject,G.value=l.avatar,k(g,(n,c)=>{n!=c&&(l.botSlug=n,r.saveSelectedCharacter(),H.push({name:"chatWithCharacter",params:{slug:l.botSlug}}))}),k(L,(n,c)=>{l.botName=n,r.saveSelectedCharacter()}),k(f,n=>{l.systemPrompt=n,r.saveSelectedCharacter()}),k(W,n=>{l.color=n,r.saveSelectedCharacter()}),k(y,n=>{l.summarizePrompt=n,r.saveSelectedCharacter()}),k(B,n=>{l.description=n,r.saveSelectedCharacter()}),k(U,n=>{l.temperature=n,r.saveSelectedCharacter()}),k($,n=>{l.maxTokens=n,r.saveSelectedCharacter()}),k(F,n=>{l.welcomeMessage=n,r.saveSelectedCharacter()}),k(z,n=>{l.randomSubject=n,r.saveSelectedCharacter()}),k(G,n=>{l.avatar=n,r.saveSelectedCharacter()}),h.on("transcript",async n=>{i.value=n,await ne()}),t.loadMessagesFromLocalStorage(l.botSlug),setTimeout(()=>{O(),l!=null&&l.welcomeMessage&&_e(l==null?void 0:l.welcomeMessage.replace("[name]",d.myName),1,.5,1e3)},10)});async function ke(){h.toggleListen()}function O(){e.value&&(e.value.scrollTop=e.value.scrollHeight)}function ye(){G.value=Be()}function xe(){O(),l.botName;let w=t.addMessage(new N("","SUMMARY","assistant")),n=l.systemPrompt,c=t.chatLogSinceCheckpoint;console.log(c),b.complete({messages:[new N(n,l.botName,"system").toGptMessage(),new N("Conversatie log: "+c,l.botName,"assistant").toGptMessage(),new N(l.summarizePrompt,l.botName,"assistant").toGptMessage()],model:d.model,stream:!0}),b.on("progress",({result:x,partial:V})=>{w.setContentWeirdBug(x),O()}),b.once("done",x=>{w.setContentWeirdBug(x),b.off("progress"),O(),ae(()=>{O(),t.saveMessages(l.botSlug)})})}function _e(w="",n=.5,c=.5,x=1e4){var re;let V=l.botName,D=d.myName,T=Math.random()>1-n,J=Math.random()>1-c;if(T){if(console.log("Preparing surpise message"),J){let Y=Ie(["Telescope","Pineapple","Fusion","Blueprint","Courage","Sapphire","Notebook","Curiosity","Dream","Echelon","Rainbow","Library","Lighthouse","Harmonica","Quantum","Elephant","Windmill","Camouflage","Zephyr","Kaleidoscope","Discover","Flamingo","Lavender","Symphony","Nebula","Rhythm","Echo","Iridescent","Pirate","Voyage","Whisper","Silver","Rejuvenate","Sanctuary","Solitude","Lemonade","Illusion","Momentum","Flicker","Sunset","Gravity","Chimera","Butterfly","Silhouette","Frost","Radiance","Enigma","Journey","Astronaut","Galaxy"]);w+=(re=l==null?void 0:l.randomSubject)==null?void 0:re.replace("[subject]",Y),console.log(w)}setTimeout(()=>{let P=t.messagesSinceCheckpoint.filter(Y=>!Y.isCheckpoint()).slice(-2);i.value.trim().length===0&&(P.length==2&&P[0].name===D&&P[1].name===V||P.length==1&&P[0].name===D||P.length==0)&&oe(w)},x)}}function oe(w=""){let n=l.botName,c=d.myName,x=new N(l.systemPrompt+". Dit gesprek is met "+c,n,"system").toGptMessage(),V=w?new N(w,n,"system").toGptMessage():null,D=t.addMessage(new N("",n,"assistant"));console.log(l.systemPrompt),v.complete({messages:[x,...t.messagesSinceCheckpoint.map(T=>T.toGptMessage()),V].filter(T=>T),temperature:l==null?void 0:l.temperature,max_tokens:l==null?void 0:l.maxTokens,model:d.model,stream:!0}),v.on("progress",({result:T,partial:J})=>{D.content.value=T,O(),S.queueSpeakPartials(J)}),h.stopListen(),S.once("done",()=>{h.startListen()}),v.once("done",T=>{console.log(t.chatLogSinceCheckpoint),D.content.value=T,v.off("progress"),t.saveMessages(l.botSlug)})}async function ne(){t.addMessage(new N(i.value,d.myName,"user")),i.value="",oe(),ae(()=>{O()})}async function Ce(w){w.shiftKey||(await ne(),w.preventDefault())}return(w,n)=>(_(),C("div",tt,[u(t).overlayIsShown?I("",!0):(_(),C("div",st,[o("button",{onClick:n[0]||(n[0]=c=>u(H).push({name:"characters"})),class:"whitespace-nowrap backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2"},ot),o("button",{onClick:n[1]||(n[1]=c=>u(t).toggleOverlay()),class:"whitespace-nowrap backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2"},"Settings"),o("button",{onClick:xe,class:"whitespace-nowrap backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2"},"Summarize"),o("button",{onClick:n[2]||(n[2]=c=>{var x;return u(t).clearMessages((x=u(l))==null?void 0:x.botSlug)}),class:"whitespace-nowrap backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2"},"Clear messages"),o("button",{onClick:n[3]||(n[3]=c=>u(r).deleteCharacter(u(l))),class:"whitespace-nowrap backdrop-brightness-50 backdrop-blur-xl text-white rounded-lg px-3 py-2"},"Delete"),o("button",nt," Est tokens: "+R(u(t).estimatedTokenCount),1)])),u(t).overlayIsShown?(_(),C("div",rt,[o("div",at,[o("div",lt,[o("button",{onClick:n[4]||(n[4]=c=>u(t).toggleOverlay()),class:"bg-black/50 backdrop-blur-xl ml-auto text-white rounded-full w-10 p-2"},ct)]),o("div",dt,[o("div",{class:"flex col-span-12 flex-col gap-2 items-center mb-4 pt-10 -m-10 -mt-20",style:Z({backgroundColor:W.value})},[o("button",{onClick:n[5]||(n[5]=c=>ye()),class:"w-48 h-48 rounded-3xl",innerHTML:u(ge)(G.value)},null,8,ht)],4),o("div",pt,[gt,E(o("input",{"onUpdate:modelValue":n[6]||(n[6]=c=>L.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,L.value]])]),o("div",mt,[ft,E(o("input",{"onUpdate:modelValue":n[7]||(n[7]=c=>B.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,B.value]])]),o("div",vt,[bt,o("div",wt,[(_(!0),C(q,null,X(u(d).availableColors,c=>(_(),C("div",{onClick:x=>W.value=c,style:Z({backgroundColor:c}),class:"w-10 h-10 cursor-pointer rounded-full"},null,12,St))),256))])]),o("div",kt,[yt,E(o("input",{type:"number",step:"0.1",min:"0",max:"1","onUpdate:modelValue":n[8]||(n[8]=c=>U.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,U.value]])]),o("div",xt,[_t,E(o("input",{type:"number",step:"1",min:"0",max:"5000","onUpdate:modelValue":n[9]||(n[9]=c=>$.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,$.value]])]),o("div",Ct,[Lt,E(o("input",{"onUpdate:modelValue":n[10]||(n[10]=c=>F.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,F.value]])]),o("div",Et,[Mt,E(o("input",{"onUpdate:modelValue":n[11]||(n[11]=c=>z.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,z.value]])]),o("div",Tt,[Rt,E(o("textarea",{rows:"5","onUpdate:modelValue":n[12]||(n[12]=c=>f.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,f.value]])]),o("div",Nt,[Ot,E(o("textarea",{rows:"5","onUpdate:modelValue":n[13]||(n[13]=c=>y.value=c),class:"border-transparent rounded-lg p-3 bg-black/40"},null,512),[[M,y.value]])]),o("div",Vt,[Pt,E(o("select",{"onUpdate:modelValue":n[14]||(n[14]=c=>u(S).selectedVoice.value=c),class:"text-white/90 border-transparent rounded-lg p-2 bg-black/40"},[(_(!0),C(q,null,X(u(S).voiceList.value,c=>(_(),C("option",{value:c.name},R(c.name)+" - "+R(c.lang),9,It))),256))],512),[[De,u(S).selectedVoice.value]])]),o("div",Dt,"Speech Recognition Status: "+R(u(h).status),1),o("div",At,"Listening: "+R(u(h).isListening),1),o("div",Bt,"Speaking: "+R(u(S).status),1),o("div",Wt,"Speaking Queue: "+R(u(S).queue.length)+" / "+R(u(S).isSpeakingQueue),1)])])])):I("",!0),o("div",Ut,[o("div",{ref_key:"scroller",ref:e,class:"flex grow overflow-y-auto pt-32"},[o("div",{ref_key:"scrolled",ref:s,class:"flex w-full h-auto gap-2 flex-col m-4 md:m-6 !mt-auto"},[(_(!0),C(q,null,X(u(t).messages,(c,x)=>{var V;return _(),We(Xe,{"show-user":((V=u(t).messagesSinceCheckpoint[x+1])==null?void 0:V.name)!==c.name||typeof u(t).messagesSinceCheckpoint[x+1]>"u",key:c.id,message:c},null,8,["show-user","message"])}),128))],512)],512),o("div",$t,[E(o("textarea",{placeholder:u(h).interimTranscript.value?u(h).interimTranscript.value:"Your message",onKeydown:Ae(Ce,["enter"]),rows:"4",class:"py-4 text-lg resize-none focus:outline-none bg-transparent rounded-lg text-white","onUpdate:modelValue":n[15]||(n[15]=c=>i.value=c)},null,40,Ft),[[M,i.value]]),o("button",{class:j(["mr-4 md:mr-6 backdrop-blur-xl transition-all cursor-pointer hover:scale-105 absolute flex items-center justify-center right-0 top-4 w-10 h-10 rounded-full",{"backdrop-brightness-0 text-white !scale-100":u(h).isListening.value,"backdrop-brightness-90 text-white/40":!u(h).isListening.value}]),onClick:n[16]||(n[16]=c=>ke())},Gt,2)])])]))}});export{Kt as default};