---
sidebar_position: 4
---

# Building Your Own Services

Once you've built a few simple bots by combining existing services, you'll want to start solving more complex problems, which means building your own services. Fortunately, it's pretty straightforward: You create a subclass of `AIService`, and implement a method called `process_frame`. For example, here's a `TranslationProcessor` service, used in the translation example TKTKTK:

```python
class TranslationProcessor(AIService):
    def __init__(self, language):
        self._language = language

    async def process_frame(self, frame: Frame) -> AsyncGenerator[Frame, None]:
        if isinstance(frame, TextFrame):
            context = [
                {
                    "role": "system",
                    "content": f"You will be provided with a sentence in English, and your task is to translate it into {self._language}.",
                },
                {"role": "user", "content": frame.text},
            ]
            yield LLMMessagesFrame(context)
        else:
            yield frame
```

The `__init__` method allows us to specify what language we want to use when we create an instance of the service.

The `process_frame` method gets called by the pipeline with each frame emitted from the previous service (or the pipeline's input queue if this is the first service in the pipeline). In this case, if the current frame is a `TextFrame`, we're putting the frame's text inside a `context` with instructions for an LLM, and then putting that context inside an `LLMMessagesFrame` that gets sent to the next service in the pipeline. If the current frame is anything other than a `TextFrame`, we pass it along unmodified.

This is an important convention you'll see in almost all services. **If your service receives a frame it doesn't do anything with, you should pass it along unmodified.**

Another important thing to notice is the use of `yield` throughout the method, as well as the return type of the `process_frame` function: `AsyncGenerator[Frame, None]`.

If you're just getting into Python because of all the interesting things happening with AI, you should familiarize yourself with [Python's Generators](https://wiki.python.org/moin/Generators), and more specifically, [async generators and asyncio](https://superfastpython.com/asynchronous-generators-in-python/).

The pipeline actually calls your `process_frame` function with each input frame like this: `async for frame in service.process_frame(frame):`, which means you can take advantage of multiple `yield` statements to create multiple output frames from a single input frame. For example, here's a custom service that enables extremely basic animation by displaying a "talking" image while the bot is talking:

```python
class ImageSyncAggregator(AIService):
    async def process_frame(self, frame: Frame) -> AsyncGenerator[Frame, None]:
        if isinstance(frame, TextFrame):
            yield talking_frame
            yield frame
            yield quiet_frame
        else:
            yield frame
```

When this service receives a `TextFrame`, it yields an `ImageFrame` that contains a character with its mouth open, then it yields the received `TextFrame`, then it yields an `ImageFrame` with the character's mouth closed. Because of the way subsequent services (like TTS) keep frames in order, the end result will be the transport displaying the "talking" image, then playing back the TTS audio, then displaying the "quiet" image. As before, anything that isn't a `TextFrame` gets passed along unmodified.

Eventually, you'll find your bot doing something you don't expect. Let's learn about how to debug Daily AI apps in the next section.
