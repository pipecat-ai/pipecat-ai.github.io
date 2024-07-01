"use strict";(self.webpackChunkpipecat_docs=self.webpackChunkpipecat_docs||[]).push([[421],{648:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>o,toc:()=>d});var r=n(4848),s=n(8453);const i={},c="TTSService (Text-To-Speech)",o={id:"api-reference/services/tts-service",title:"TTSService (Text-To-Speech)",description:"Frame Types",source:"@site/docs/api-reference/services/tts-service.md",sourceDirName:"api-reference/services",slug:"/api-reference/services/tts-service",permalink:"/docs/api-reference/services/tts-service",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api-reference/services/tts-service.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"STTService (Speech-To-Text)",permalink:"/docs/api-reference/services/stt-service"},next:{title:"Utility Services",permalink:"/docs/api-reference/services/utilities"}},a={},d=[{value:"Frame Types",id:"frame-types",level:2},{value:"Configuration",id:"configuration",level:2}];function l(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"ttsservice-text-to-speech",children:"TTSService (Text-To-Speech)"}),"\n",(0,r.jsx)(t.h2,{id:"frame-types",children:"Frame Types"}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Input:"})," ",(0,r.jsx)(t.code,{children:"TextFrame"}),"s (Be careful, because TextFrame subclasses can also cause text-to-speech generation!)"]}),"\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Output:"})," TTS services yield these frames, in this order:"]}),"\n",(0,r.jsxs)(t.ol,{children:["\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:"TTSStartFrame"})}),"\n",(0,r.jsxs)(t.li,{children:["0 or more ",(0,r.jsx)(t.code,{children:"AudioFrame"}),"s"]}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:"TTSEndFrame"})}),"\n",(0,r.jsxs)(t.li,{children:["A ",(0,r.jsx)(t.code,{children:"TextFrame"})," with the original source text."]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["TTS services ",(0,r.jsx)(t.em,{children:"do not"})," pass through the original ",(0,r.jsx)(t.code,{children:"TextFrame"}),"s. Instead, they yield text frames after generating audio. The exact contents of each ",(0,r.jsx)(t.code,{children:"TextFrame"})," depends on the configuration of the TTS service."]}),"\n",(0,r.jsxs)(t.p,{children:["For example, consider a ",(0,r.jsx)(t.code,{children:"TTSService"})," with ",(0,r.jsx)(t.code,{children:"aggregate_sentences=True"}),". The following input:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:'<TextFrame text="This">\n<TextFrame text=" is">\n<TextFrame text=" sentence">\n<TextFrame text=" one.">\n<TextFrame text=" This">\n<TextFrame text=" is">\n<TextFrame text=" the">\n<TextFrame text=" second.">\n'})}),"\n",(0,r.jsx)(t.p,{children:"Will produce the following frames as output:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:'<TTSStartFrame>\n<AudioFrame>\n...\n<AudioFrame>\n<TTSEndFrame>\n<TextFrame text="This is sentence one.">\n<TTSStartFrame>\n<AudioFrame>\n...\n<AudioFrame>\n<TTSEndFrame>\n<TextFrame text="This is the second.">\n'})}),"\n",(0,r.jsx)(t.h2,{id:"configuration",children:"Configuration"}),"\n",(0,r.jsx)(t.p,{children:"Each TTS service initializer takes a slightly different parameter set. Some allow you to specify a model. Most require an API key."}),"\n",(0,r.jsxs)(t.p,{children:["The base TTS service class has one configurable property: ",(0,r.jsx)(t.code,{children:"aggregate_sentences"}),". When this property is set to ",(0,r.jsx)(t.code,{children:"True"}),", the TTS service will collect ",(0,r.jsx)(t.code,{children:"TextFrame"}),"s until it sees sentence-ending punctuation: ",(0,r.jsx)(t.code,{children:'if self.current_sentence.strip().endswith((".", "?", "!"))'}),". Then, it will generate audio for the entire sentence."]}),"\n",(0,r.jsx)(t.p,{children:"LLM services can stream responses back as single words (or single tokens). By collecting entire sentences, the TTS services can generate much more natural-sounding speech."})]})}function h(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>o});var r=n(6540);const s={},i=r.createContext(s);function c(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);