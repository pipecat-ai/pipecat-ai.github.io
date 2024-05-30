"use strict";(self.webpackChunkpipecat_docs=self.webpackChunkpipecat_docs||[]).push([[661],{1917:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>n,metadata:()=>a,toc:()=>p});var s=t(4848),i=t(8453);const n={},c="STTService (Speech-To-Text)",a={id:"api-reference/services/stt-service",title:"STTService (Speech-To-Text)",description:"Speech-to-text is primarily provided by Deepgram through the DailyTransport. We recommend setting a few transcription properties in your code:",source:"@site/docs/api-reference/services/stt-service.md",sourceDirName:"api-reference/services",slug:"/api-reference/services/stt-service",permalink:"/docs/api-reference/services/stt-service",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api-reference/services/stt-service.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"LLMService (LLM Completion)",permalink:"/docs/api-reference/services/llm-service"},next:{title:"TTSService (Text-To-Speech)",permalink:"/docs/api-reference/services/tts-service"}},o={},p=[{value:"Local transcription with Whisper",id:"local-transcription-with-whisper",level:2}];function l(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"sttservice-speech-to-text",children:"STTService (Speech-To-Text)"}),"\n",(0,s.jsxs)(r.p,{children:["Speech-to-text is primarily provided by ",(0,s.jsx)(r.a,{href:"https://deepgram.com/",children:"Deepgram"})," through the DailyTransport. We recommend setting a few transcription properties in your code:"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-python",children:'transport.transcription_settings["extra"]["endpointing"] = True\ntransport.transcription_settings["extra"]["punctuate"] = True\n'})}),"\n",(0,s.jsx)(r.p,{children:"These settings enable Deepgram to return transcriptions very quickly, but still include punctuation. This makes it easier to do sentence aggregation or display captions."}),"\n",(0,s.jsxs)(r.p,{children:["Deepgram provides transcription to the Daily call server, which forwards the transcriptions to the clients connected to the call. Pipecat makes those transacriptions available as ",(0,s.jsx)(r.code,{children:"TranscriptionFrame"}),"s in your app. Deepgram determines when it has enough audio data to transcribe a user's speech, so it will return full sentences or phrases. There are some helpful ",(0,s.jsx)(r.a,{href:"utilities",children:"utility services"})," that can ensure you have a complete response from a user before processing their speech."]}),"\n",(0,s.jsx)(r.h2,{id:"local-transcription-with-whisper",children:"Local transcription with Whisper"}),"\n",(0,s.jsxs)(r.p,{children:["The framework also includes a service for running Whisper transcription locally. Take a look at ",(0,s.jsx)(r.a,{href:"https://github.com/daily-co/daily-ai-sdk/blob/9590cc2fbc0d5ad6a784e2a3b743005eb7beeb17/examples/foundational/13-whisper-transcription.py",children:"the whisper example"})," in the framework for more information."]})]})}function h(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>c,x:()=>a});var s=t(6540);const i={},n=s.createContext(i);function c(e){const r=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),s.createElement(n.Provider,{value:r},e.children)}}}]);