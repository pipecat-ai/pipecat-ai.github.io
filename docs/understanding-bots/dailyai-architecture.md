---
sidebar_position: 1
---

# The Architecture of Pipecat

`pipecat` is a framework for building real-time, multimodal AI apps. "Multimodal" means you can use any combination of audio, video, images, and/or text in your interactions. And "real-time" means that things are happening quickly enough that it feels conversational—a "back-and-forth" with a bot, not submitting a query and waiting for results.

To understand this, let's look at an example of talking to an LLM-powered chatbot. Here's a video of a conversation with the `chatbot` example app:

(storybot video)

The flow of the interactions is pretty straightforward:

1. The bot says something.
2. The user says something.
3. The bot says something.
4. The user says something.

Reapeat until the user gets bored.

Let's look at those interactions from the bot's perspective. Every time the user says something, the bot needs to do several things to say something back:

1. Transcribe and collect all of the user's speech until they stop talking.
2. Add whatever the user said into a `context` object.
3. Send the entire context to an LLM.
4. Collect the full response from the LLM (and add it to the saved context as well).
5. "Speak" the LLM's response as audio data using a text-to-speech service
6. Play the audio so the user can hear it

To do this in real time, we still need to do all the same things, but we need to change the order in which they happen. If you've used ChatGPT, you've seen the way it updates one word at a time, almost like a human typing really fast. The API can return completions in the same way—it's called a "streaming response".

Instead of waiting for the entire LLM response, we can watch the text come in a word at a time. As soon as we have the words for the first sentence of the bot's response, we can start generating the speech for that sentence. Meanwhile, we can keep accumulating LLM response text until we have the text for the second sentence, then start text-to-speech for that page, and so on.

We can start playing back the first stentence's audio for the user as soon as it's done generating. And as long as we can generate the audio for the next sentence before the first sentence finishes playback, it will feel totally seamless.

The diagram for this approach looks like this:

<div style={{textAlign: 'center'}}>

![Basic pipeline image](assets/basic-pipeline.svg)

</div>

This structure is sometimes called a _data processing pipeline_, or just 'pipeline' for short. It's a fundamental part of how `pipecat` apps work. Here's a diagram showing the architecture of `pipecat` apps:

<div style={{textAlign: 'center'}}>

![Pipecat Architecture](assets/pipecat-architecture.svg)

</div>

There are four important terms in that diagram to define.

A **frame** is a container for different data types. They're the fundamental unit of data that moves through a `pipecat` app. There are frame types for text data, images, and audio. But there are many others, like LLM context frames, sprite animation frames, transcription frames, and more.

A **service** processes the stream of frames moving through the pipeline in some way. A service takes each frame that comes in to its input and decides whether to pass it along to the next service, modify it in some way, or consume it and possibly generate some other kind of output frame(s). For example, a text-to-speech service only cares about text frames; it will forward along all other frames, but it will consume text frames, generate speech, and emit that speech as audio frames. An LLM service will consume an LLM context frame (with a list of `user` and `assistant` messages) and emit a bunch of text frames. A "logger" service might forward along all types of frames, but log them to the console as it forwards them. One important convention to reiterate: _services should just pass along frames that they don't do anything with._

A **pipeline**, then, connects services together to move frames between them. Most pipelines are fairly simple and linear: `LLM -> TTS` for example. But the pipeline also enables some pretty complex workflows, like generating audio and images in parallel, but ensuring the resulting frames stay together.

The **transport** is what connects the pipeline to the bot's I/O. We sometimes call it 'the gateway to the real world'. The transport can receive transcribed user speech, or webcam frames, or other types of input, and send that input into the pipeline as different frame types. Likewise, the output of the pipeline connects to the transport so that audio, video, and/or image frames turn into pictures that the user sees and audio that they hear.

Let's see how these concepts map to actual bot code in the next section.
