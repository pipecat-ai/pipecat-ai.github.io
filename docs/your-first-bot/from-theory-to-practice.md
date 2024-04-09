---
sidebar_position: 2
---

# From Theory to Practice: A Simplified Bot

Let's create a pipeline for a basic chatbot to see how it all works. Here's a lightly modified version of `examples/foundational/06-listen-and-respond.py`:

```python
async def main(room_url: str, token):
    async with aiohttp.ClientSession() as session:
        messages = [
            {
                "role": "system",
                "content": "You are a helpful LLM in a WebRTC call. Your goal is to demonstrate your capabilities in a succinct way. Your output will be converted to audio. Respond to what the user said in a creative and helpful way.",
            },
        ]

		transport = DailyTransport(...)

        tts = ElevenLabsTTSService(...)
        llm = OpenAILLMService(...)

        tma_in = LLMUserContextAggregator(messages, ...)
        tma_out = LLMAssistantContextAggregator(messages, ...)

        pipeline = Pipeline(
            processors=[
                tma_in,
                llm,
                tts,
                tma_out,
            ],
        )

        @transport.event_handler("on_first_other_participant_joined")
        async def on_first_other_participant_joined(transport):
            # Kick off the conversation.
            messages.append(
                {"role": "system", "content": "Please introduce yourself to the user."})
            await pipeline.queue_frames([LLMMessagesFrame(messages)])

		(...)
        await transport.run(pipeline)
```

We start by creating a `messages` object, which will be shared by a few different services.

Next, we create a `DailyTransport` object. If you go to the example file, you can see the full list of all the things we're configuring about the transport. The `DailyTransport` uses Daily's WebRTC-powered infrastructure as the media transport layer.

Then, we instantiate some services that we'll use in our pipeline. There are a bunch of different services you can use, and services of the same type are usually interchangeable. For example, we could easily swap out `ElevenLabsTTSService` for `DeepgramTTSService` if we wanted to use Deepgram's Aura voice engine instead. Or we could use Mistral running on Groq by changing out `OpenAILLMService`.

Next are two other important services provided by the framework itself. `LLMUserContextAggregator` grabs user input (in the form of `TranscriptionFrame`s), appends it to the shared `messages` object as a `user` entry, and then emits `LLMMessageFrame`s for the LLM service to use. Likewise, `LLMAssistantContextAggregator` captures the `TextFrame`s created by the LLM service to add an `assistant` entry to the `messages` object.

Then we define the `pipeline` that will run in this app. It's composed of:

- `tma_in`, which receives `TranscriptionFrame`s from the transport when the user speaks, and emits `LLMMessagesFrame`s
- `llm`, which receives `LLMMessagesFrame`s, runs a chat completion on OpenAI, and emits the streaming result as a series of `TextFrame`s
- `tts`, which receives the `TextFrame`s and accumulates them until it has at least a complete sentence, then runs text-to-speech and emits `AudioFrame`s with the spoken audio. `tts` also emits a `TextFrame` with the text of any audio it speaks.
- `tma_out`, which receives the `TextFrame`s from the `tts` service and appends them to the `messages` object. `tma_out` also passes along the `AudioFrame`s from `tts` so they exit the pipeline and get sent to the transport, which then plays back the audio in the Daily call.

We'll come back to `on_first_other_participant_joined`. The last line, `await transport.run(pipeline)`, is what makes the whole thing work.

Under the hood, a `pipeline` object has a `run(input_queue, output_queue)` method. The pipeline pulls frames out of the `input_queue` and sends them to the first service in the pipeline. Whatever comes out of the last service in the pipeline gets put into the `output_queue`. `transport.run(pipeline)` is just shorthand for `pipeline.run(input_queue=transport.output, output_queue=transport.input`, along with code for running the transport itself. `pipeline.run` watches for an `EndFrame` from the transport to know when to exit.

Once everything is running, `on_first_other_participant_joined()` is what actually starts the conversation. The transport provides a decorator, `@transport.event_handler("on_first_other_participant_joined")`, that does what it says: Runs a function when a participant other than the bot itself joins the Daily room. In this case, we're constructing our own `LLMMessagesFrame` and passing it directly into the pipeline by calling `pipeline.queue_frames()`. The first service in the pipeline (`tma_in`) doesn't know what to do with an `LLMMessagesFrame` , so it passes it along to the `llm` service... which will generate a friendly greeting from the bot.

Next, we'll see how to implement one of the most important things for making a bot feel interactive: Interruption.
