"use strict";(self.webpackChunkpipecat_docs=self.webpackChunkpipecat_docs||[]).push([[849],{6164:e=>{e.exports=JSON.parse('{"version":{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Getting Started","href":"/docs/intro","docId":"intro","unlisted":false},{"type":"category","label":"Understanding Bots","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"The Architecture of Pipecat","href":"/docs/understanding-bots/dailyai-architecture","docId":"understanding-bots/dailyai-architecture","unlisted":false},{"type":"link","label":"From Theory to Practice: A Simplified Bot","href":"/docs/understanding-bots/from-theory-to-practice","docId":"understanding-bots/from-theory-to-practice","unlisted":false},{"type":"link","label":"The Interruptible Version","href":"/docs/understanding-bots/interruptible","docId":"understanding-bots/interruptible","unlisted":false},{"type":"link","label":"Building Your Own Services","href":"/docs/understanding-bots/custom-services","docId":"understanding-bots/custom-services","unlisted":false},{"type":"link","label":"Debugging Pipecat apps","href":"/docs/understanding-bots/debugging","docId":"understanding-bots/debugging","unlisted":false},{"type":"link","label":"Learning Through Examples","href":"/docs/understanding-bots/foundational-examples","docId":"understanding-bots/foundational-examples","unlisted":false}],"href":"/docs/category/understanding-bots"},{"type":"category","label":"Deploying Bots","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Overview","href":"/docs/deploying-your-bot/overview","docId":"deploying-your-bot/overview","unlisted":false},{"type":"link","label":"Basic Deployment Pattern","href":"/docs/deploying-your-bot/basic-pattern","docId":"deploying-your-bot/basic-pattern","unlisted":false},{"type":"link","label":"Deploying with Fly.io","href":"/docs/deploying-your-bot/fly","docId":"deploying-your-bot/fly","unlisted":false}],"href":"/docs/category/deploying-bots"},{"type":"category","label":"Advanced Topics","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Custom Pipelines","href":"/docs/advanced-topics/custom-pipelines","docId":"advanced-topics/custom-pipelines","unlisted":false},{"type":"link","label":"VAD, Interruptions, and Bot Responsiveness","href":"/docs/advanced-topics/vad-interruptible","docId":"advanced-topics/vad-interruptible","unlisted":false}],"href":"/docs/category/advanced-topics"},{"type":"category","label":"API Reference","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Frame Types","href":"/docs/api-reference/frame-types","docId":"api-reference/frame-types","unlisted":false},{"type":"link","label":"Pipelines","href":"/docs/api-reference/pipelines","docId":"api-reference/pipelines","unlisted":false},{"type":"category","label":"Services","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"ImageGenService (Image Generation)","href":"/docs/api-reference/services/image-gen-service","docId":"api-reference/services/image-gen-service","unlisted":false},{"type":"link","label":"LLMService (LLM Completion)","href":"/docs/api-reference/services/llm-service","docId":"api-reference/services/llm-service","unlisted":false},{"type":"link","label":"STTService (Speech-To-Text)","href":"/docs/api-reference/services/stt-service","docId":"api-reference/services/stt-service","unlisted":false},{"type":"link","label":"TTSService (Text-To-Speech)","href":"/docs/api-reference/services/tts-service","docId":"api-reference/services/tts-service","unlisted":false},{"type":"link","label":"Utility Services","href":"/docs/api-reference/services/utilities","docId":"api-reference/services/utilities","unlisted":false},{"type":"link","label":"VisionService (Image Processing and Recognition)","href":"/docs/api-reference/services/vision-service","docId":"api-reference/services/vision-service","unlisted":false}],"href":"/docs/category/services"},{"type":"category","label":"Transports","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"DailyTransport","href":"/docs/api-reference/transports/daily-transport","docId":"api-reference/transports/daily-transport","unlisted":false},{"type":"link","label":"LocalTransport","href":"/docs/api-reference/transports/local-transport","docId":"api-reference/transports/local-transport","unlisted":false},{"type":"link","label":"WebsocketTransport","href":"/docs/api-reference/transports/websocket-transport","docId":"api-reference/transports/websocket-transport","unlisted":false}],"href":"/docs/category/transports"}],"href":"/docs/category/api-reference"},{"type":"link","label":"Supported Services","href":"/docs/supported-services","docId":"supported-services","unlisted":false}]},"docs":{"advanced-topics/custom-pipelines":{"id":"advanced-topics/custom-pipelines","title":"Custom Pipelines","description":"If you\'re trying to implement custom logic in your bot, your first instinct will probably be to create an AIService subclass and override the process_frame method. This is the right thing to do most of the time, and you\'ll see it throughout the framework examples.","sidebar":"tutorialSidebar"},"advanced-topics/vad-interruptible":{"id":"advanced-topics/vad-interruptible","title":"VAD, Interruptions, and Bot Responsiveness","description":"","sidebar":"tutorialSidebar"},"api-reference/frame-types":{"id":"api-reference/frame-types","title":"Frame Types","description":"There are a variety of different kinds of frames used in the SDK. Rather than document them here, it\'s worth looking at frames.py in the framework itself, since it contains good docstrings describing each one.","sidebar":"tutorialSidebar"},"api-reference/pipelines":{"id":"api-reference/pipelines","title":"Pipelines","description":"This class manages a pipe of FrameProcessors, and runs them in sequence. The \\"source\\" and \\"sink\\" queues are managed by the caller. You can use this class stand-alone to perform specialized processing, or you can use the Transport\'s run_pipeline method to instantiate and run a pipeline with the Transport\'s sink and source queues.","sidebar":"tutorialSidebar"},"api-reference/services/image-gen-service":{"id":"api-reference/services/image-gen-service","title":"ImageGenService (Image Generation)","description":"There are several different image generation services available in Pipecat. Fundamentally, they all do the same thing:","sidebar":"tutorialSidebar"},"api-reference/services/llm-service":{"id":"api-reference/services/llm-service","title":"LLMService (LLM Completion)","description":"Frame Types","sidebar":"tutorialSidebar"},"api-reference/services/stt-service":{"id":"api-reference/services/stt-service","title":"STTService (Speech-To-Text)","description":"Speech-to-text is primarily provided by Deepgram through the DailyTransport. We recommend setting a few transcription properties in your code:","sidebar":"tutorialSidebar"},"api-reference/services/tts-service":{"id":"api-reference/services/tts-service","title":"TTSService (Text-To-Speech)","description":"Frame Types","sidebar":"tutorialSidebar"},"api-reference/services/utilities":{"id":"api-reference/services/utilities","title":"Utility Services","description":"In addition to the various AI services available in Pipecat, there are a handful of utility service classes that help you build your app.","sidebar":"tutorialSidebar"},"api-reference/services/vision-service":{"id":"api-reference/services/vision-service","title":"VisionService (Image Processing and Recognition)","description":"Vision services have two inputs:","sidebar":"tutorialSidebar"},"api-reference/transports/daily-transport":{"id":"api-reference/transports/daily-transport","title":"DailyTransport","description":"The DailyTransport is a full-featured transport that enables you to join Pipecat bots to Daily WebRTC video calls. It\'s built on top of daily-python, and it gives you access to a lot of advanced features\u2014but it\'s also a great way to simply use WebRTC as the media backbone for building real-time bot interactions.","sidebar":"tutorialSidebar"},"api-reference/transports/local-transport":{"id":"api-reference/transports/local-transport","title":"LocalTransport","description":"You can use the LocalTransport to build Pipecat apps that directly access the mic, speaker, and camera devices on your computer. You\'ll need to install the optional pyaudio dependency to use the LocalTransport:","sidebar":"tutorialSidebar"},"api-reference/transports/websocket-transport":{"id":"api-reference/transports/websocket-transport","title":"WebsocketTransport","description":"We recommend using a WebRTC-powered transport like DailyTransport if you want to ensure good experiences for real-time audio and (especially) video. But you can use the WebsocketTransport for apps where you might already be using a websocket connection for other parts of the app.","sidebar":"tutorialSidebar"},"deploying-your-bot/basic-pattern":{"id":"deploying-your-bot/basic-pattern","title":"Basic Deployment Pattern","description":"Project Structure","sidebar":"tutorialSidebar"},"deploying-your-bot/fly":{"id":"deploying-your-bot/fly","title":"Deploying with Fly.io","description":"Project setup","sidebar":"tutorialSidebar"},"deploying-your-bot/overview":{"id":"deploying-your-bot/overview","title":"Overview","description":"You\'ve created your Pipecat bot, had a good chat with it locally, and are eager to share it with the world. Let\u2019s explore how to approach deployment.","sidebar":"tutorialSidebar"},"intro":{"id":"intro","title":"Getting Started","description":"Let\'s start by getting Pipecat installed and running your first example app.","sidebar":"tutorialSidebar"},"supported-services":{"id":"supported-services","title":"Supported Services","description":"Pipecat supports many different third-party services that host Large Language Models (LLMs), text-to-speech (TTS), and speech-to-text (STT) services, as well as image diffusion/generation and image recognition/vision.","sidebar":"tutorialSidebar"},"understanding-bots/custom-services":{"id":"understanding-bots/custom-services","title":"Building Your Own Services","description":"Once you\'ve built a few simple bots by combining existing services, you\'ll want to start solving more complex problems, which means building your own services. Fortunately, it\'s pretty straightforward","sidebar":"tutorialSidebar"},"understanding-bots/dailyai-architecture":{"id":"understanding-bots/dailyai-architecture","title":"The Architecture of Pipecat","description":"pipecat is a framework for building real-time, multimodal AI apps. \\"Multimodal\\" means you can use any combination of audio, video, images, and/or text in your interactions. And \\"real-time\\" means that things are happening quickly enough that it feels conversational\u2014a \\"back-and-forth\\" with a bot, not submitting a query and waiting for results.","sidebar":"tutorialSidebar"},"understanding-bots/debugging":{"id":"understanding-bots/debugging","title":"Debugging Pipecat apps","description":"Debug logging","sidebar":"tutorialSidebar"},"understanding-bots/foundational-examples":{"id":"understanding-bots/foundational-examples","title":"Learning Through Examples","description":"","sidebar":"tutorialSidebar"},"understanding-bots/from-theory-to-practice":{"id":"understanding-bots/from-theory-to-practice","title":"From Theory to Practice: A Simplified Bot","description":"Let\'s create a pipeline for a basic chatbot to see how it all works. Here\'s a lightly modified version of examples/foundational/06-listen-and-respond.py:","sidebar":"tutorialSidebar"},"understanding-bots/interruptible":{"id":"understanding-bots/interruptible","title":"The Interruptible Version","description":"In order to make this truly interactive, we need to add the ability to interrupt the bot. There\'s a method in the transport for that. Here\'s what the end of our app looks like now:","sidebar":"tutorialSidebar"}}}}')}}]);