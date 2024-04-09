---
sidebar_position: 1
---

# The Architecture of Daily AI

`dailyai` is a framework for building real-time, multimodal AI apps. "Multimodal" means you can use any combination of audio, video, images, and/or text in your interactions. And "real-time" means that things are happening quickly enough that it feels conversational—a "back-and-forth" with a bot, not submitting a query and waiting for results.

One of the best demonstrations of this idea is Storybot, an example app where a bot and a user work together to create an illustrated storybook based on the user's ideas. Here's a video of Storybot in action:

(storybot video)

If we didn't care about making this feel like it was happening in real time, we could use this algorithm:

1. Ask the user for a story idea by having them type it in a text box.
2. Submit the story idea to an LLM, and wait for the LLM to complete an entire story.
3. Separate the story into some number of "pages".
4. Send the text of each page to an AI image generator, and wait for all the image generations to complete.
5. Send the text of the story (separated by pages) to an AI text-to-speech service.
6. Combine the generated audio and image from each page to create a small video.
7. Stitch the videos together to generate the story.
8. Show the video to the user, and then ask for their input for the next part of the story.

(linear workflow image)

To do this in real time, we still need to do all the same things, but we need to change the order in which they happen. If you've used ChatGPT, you've seen the way it updates one word at a time, almost like a human typing really fast. The API can return completions in the same way—it's called a "streaming response".

Instead of waiting for the entire LLM response, we can watch the text come in a word at a time. As soon as we have the words for the first page, we can start generating the image and speech for that page. Meanwhile, we can keep accumulating LLM response text until we have the text for the second page, then start image generation and text-to-speech for that page, and so on.

We can start playing back the first page's audio and image for the user as soon as it's done generating. And as long as we can generate the media for the next page before the first page finishes playback, it will feel totally seamless.

The diagram for this approach looks like this:

(pipeline image)

This structure is sometimes called a _data processing pipeline_, or just 'pipeline' for short. It's a fundamental part of how `dailyai` apps work. Here's a diagram showing the architecture of `dailyai` apps:

(architecture diagram)

There are four important terms in that diagram to define.

A **frame** is a container for different data types. They're the fundamental unit of data that moves through a `dailyai` app. There are frame types for text data, images, and audio. But there are many others, like LLM context frames, sprite animation frames, transcription frames, and more.

A **service** receives a frame, and emits zero or more frames as a result. For example, a text-to-speech service will receive text frames and emit audio frames. An LLM service will receive an LLM context frame (with a list of `user` and `assistant` messages) and return a bunch of text frames. A "logger" service might receive any type of frame, log it to the console, and then emit that same frame. One important convention to keep in mind for later: _services should just pass along frames that they don't do anything with._

A **pipeline**, then, connects services together to move frames between them. Most pipelines are fairly simple and linear: `LLM -> TTS` for example. But the pipeline also enables some pretty complex workflows, like generating audio and images in parallel, but ensuring the resulting frames stay together.

The **transport** is what connects the pipeline to the bot's I/O. We sometimes call it 'the gateway to the real world'. The transport can receive transcribed user speech, or webcam frames, or other types of input, and send that input into the pipeline as different frame types. Likewise, the output of the pipeline connects to the transport so that audio, video, and/or image frames turn into pictures that the user sees and audio that they hear.

Let's see how these concepts map to actual bot code in the next section.
