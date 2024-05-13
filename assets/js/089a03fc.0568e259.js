"use strict";(self.webpackChunkpipecat_docs=self.webpackChunkpipecat_docs||[]).push([[7631],{7543:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var r=n(4848),i=n(8453);const o={sidebar_position:3},s="The Interruptible Version",a={id:"understanding-bots/interruptible",title:"The Interruptible Version",description:"In order to make this truly interactive, we need to add the ability to interrupt the bot. There's a method in the transport for that. Here's what the end of our app looks like now:",source:"@site/docs/understanding-bots/interruptible.md",sourceDirName:"understanding-bots",slug:"/understanding-bots/interruptible",permalink:"/docs/understanding-bots/interruptible",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/understanding-bots/interruptible.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"From Theory to Practice: A Simplified Bot",permalink:"/docs/understanding-bots/from-theory-to-practice"},next:{title:"Building Your Own Services",permalink:"/docs/understanding-bots/custom-services"}},c={},d=[];function u(e){const t={code:"code",h1:"h1",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"the-interruptible-version",children:"The Interruptible Version"}),"\n",(0,r.jsx)(t.p,{children:"In order to make this truly interactive, we need to add the ability to interrupt the bot. There's a method in the transport for that. Here's what the end of our app looks like now:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-python",children:'        async def run_conversation():\n            messages = [\n                {\n                    "role": "system",\n                    "content": "You are a helpful LLM in a WebRTC call. Your goal is to demonstrate your capabilities in a succinct way. Your output will be converted to audio. Respond to what the user said in a creative and helpful way.",\n                },\n            ]\n\n            await transport.run_interruptible_pipeline(\n                pipeline,\n                post_processor=LLMResponseAggregator(messages),\n                pre_processor=UserResponseAggregator(messages),\n            )\n\n        await asyncio.gather(transport.run(), run_conversation())\n'})}),"\n",(0,r.jsxs)(t.p,{children:["You can see the full version in ",(0,r.jsx)(t.code,{children:"examples/foundational/07-interruptible.py"}),". Instead of passing the pipeline into the transport, you'll need to run it as a separate coroutine, and use ",(0,r.jsx)(t.code,{children:"asyncio.gather"})," to wait for both of them."]}),"\n",(0,r.jsxs)(t.p,{children:["You'll need to set ",(0,r.jsx)(t.code,{children:"enable_vad=True"})," when you initialize your transport object. When you do that, the transport will run Voice Activity Detection (VAD) on incoming audio in a separate thread. When it detects that the user has started speaking, it will emit a ",(0,r.jsx)(t.code,{children:"UserStartedSpeakingFrame"}),". The ",(0,r.jsx)(t.code,{children:"run_interruptible_pipeline"})," method runs your pipeline in an ",(0,r.jsx)(t.code,{children:"asyncio.task"})," while watching for those frames. When it receives a ",(0,r.jsx)(t.code,{children:"UserStartedSpeakingFrame"}),", it cancels the currently running task and empties its receive queue, which basically stops everything. Then, the function starts a new ",(0,r.jsx)(t.code,{children:"asyncio.task"})," with your pipeline again."]}),"\n",(0,r.jsx)(t.p,{children:"To move beyond this example, you'll want to start implementing your own custom pipeline services. We'll see how to do that in the next section."})]})}function l(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>a});var r=n(6540);const i={},o=r.createContext(i);function s(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);