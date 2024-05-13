"use strict";(self.webpackChunkpipecat_docs=self.webpackChunkpipecat_docs||[]).push([[5336],{9262:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>t,metadata:()=>a,toc:()=>u});var r=n(4848),i=n(8453);const t={},o="Pipelines",a={id:"api-reference/pipelines",title:"Pipelines",description:'This class manages a pipe of FrameProcessors, and runs them in sequence. The "source" and "sink" queues are managed by the caller. You can use this class stand-alone to perform specialized processing, or you can use the Transport\'s run_pipeline method to instantiate and run a pipeline with the Transport\'s sink and source queues.',source:"@site/docs/api-reference/pipelines.md",sourceDirName:"api-reference",slug:"/api-reference/pipelines",permalink:"/docs/api-reference/pipelines",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/api-reference/pipelines.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Frame Types",permalink:"/docs/api-reference/frame-types"},next:{title:"Services",permalink:"/docs/category/services"}},c={},u=[{value:"Instance Methods",id:"instance-methods",level:2},{value:"<code>set_source(source: asyncio.Queue[Frame])</code>",id:"set_sourcesource-asyncioqueueframe",level:3},{value:"<code>set_sink(sink: asyncio.Queue[Frame])</code>",id:"set_sinksink-asyncioqueueframe",level:3},{value:"<code>queue_frames(frames: Iterable[Frame] | AsyncIterable[Frame])</code>",id:"queue_framesframes-iterableframe--asynciterableframe",level:3},{value:"<code>run_pipeline()</code>",id:"run_pipeline",level:3}];function l(e){const s={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"pipelines",children:"Pipelines"}),"\n",(0,r.jsx)(s.p,{children:'This class manages a pipe of FrameProcessors, and runs them in sequence. The "source" and "sink" queues are managed by the caller. You can use this class stand-alone to perform specialized processing, or you can use the Transport\'s run_pipeline method to instantiate and run a pipeline with the Transport\'s sink and source queues.'}),"\n",(0,r.jsx)(s.pre,{children:(0,r.jsx)(s.code,{className:"language-python",children:"Pipeline.new(\n    processors: List[FrameProcessor],\n    source: asyncio.Queue | None = None,\n    sink: asyncio.Queue[Frame] | None = None,\n    name: str | None = None,\n)\n"})}),"\n",(0,r.jsx)(s.p,{children:"Arguments:"}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"processors"}),": The list of services (",(0,r.jsx)(s.code,{children:"FrameProcessor"})," objects) that make up the pipeline."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"source"}),": This queue is where the pipeline watches for frames. Any frames pushed into this queue will get dequeued and sent into the first service in the list of ",(0,r.jsx)(s.code,{children:"processors"}),"."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"sink"}),": The destination queue. Any frames yielded by the last service in the list of ",(0,r.jsx)(s.code,{children:"processors"})," get pushed into this queue."]}),"\n",(0,r.jsxs)(s.li,{children:[(0,r.jsx)(s.code,{children:"name"}),": Used for debug logging."]}),"\n"]}),"\n",(0,r.jsx)(s.h2,{id:"instance-methods",children:"Instance Methods"}),"\n",(0,r.jsx)(s.h3,{id:"set_sourcesource-asyncioqueueframe",children:(0,r.jsx)(s.code,{children:"set_source(source: asyncio.Queue[Frame])"})}),"\n",(0,r.jsxs)(s.p,{children:["You can call this method if you need to set the source queue for a pipeline after you create it. (The ",(0,r.jsx)(s.code,{children:"run_pipeline"})," method in the transport uses this.)"]}),"\n",(0,r.jsx)(s.h3,{id:"set_sinksink-asyncioqueueframe",children:(0,r.jsx)(s.code,{children:"set_sink(sink: asyncio.Queue[Frame])"})}),"\n",(0,r.jsxs)(s.p,{children:["You can call this method if you need to set the sink queue for a pipeline after you create it. (The ",(0,r.jsx)(s.code,{children:"run_pipeline"})," method in the transport uses this.)"]}),"\n",(0,r.jsx)(s.h3,{id:"queue_framesframes-iterableframe--asynciterableframe",children:(0,r.jsx)(s.code,{children:"queue_frames(frames: Iterable[Frame] | AsyncIterable[Frame])"})}),"\n",(0,r.jsxs)(s.p,{children:["Use this method to insert frames directly into the source queue of a pipeline. This is commonly used in an ",(0,r.jsx)(s.code,{children:"on_first_other_participant_joined"})," callback to prompt a bot to greet a user, for example."]}),"\n",(0,r.jsx)(s.h3,{id:"run_pipeline",children:(0,r.jsx)(s.code,{children:"run_pipeline()"})}),"\n",(0,r.jsxs)(s.p,{children:["It's often easier to ",(0,r.jsx)(s.a,{href:"transports/daily-transport#transportrun",children:"let the transport handle running your pipeline"}),". But if you need more control over when and how your pipelines execute, you can use this method to run a pipepline, and ",(0,r.jsx)(s.code,{children:"await"})," it in your app code."]})]})}function d(e={}){const{wrapper:s}={...(0,i.R)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,s,n)=>{n.d(s,{R:()=>o,x:()=>a});var r=n(6540);const i={},t=r.createContext(i);function o(e){const s=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function a(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(t.Provider,{value:s},e.children)}}}]);