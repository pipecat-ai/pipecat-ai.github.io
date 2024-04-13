---
sidebar_position: 5
---

# Debugging Daily AI apps

## Debug logging

Getting your app to work correctly is usually an exercise in visualizing the flow of frames through your pipeline. The framework has some helpful logging for that. If you call `logger.setLevel(logging.DEBUG)` in your app, you'll see an indented display of each frame as it's "between" each service.

## The `FrameLogger` service

It can also be helpful to see the flow of frames at a specific point in the pipeline. You can create one or `FrameLogger` services and insert them in the pipeline to log frames as they pass through. For example, in `06-listen-and-respond`:

```python
fl = FrameLogger("Inner")
fl2 = FrameLogger("Outer")
# (...)
pipeline = Pipeline(
    processors=[
        fl,
        tma_in,
        llm,
        fl2,
        tts,
        tma_out,
    ],
)
```

Produces output like:

```
Inner: InterimTranscriptionFrame, text: 'Greetings to Mac' participantId: 153014c4-a117-4782-a636-804c6d2f1f22, timestamp: 2024-04-13T16:17:04.074Z
(...)
Outer: LLMResponseEndFrame
```
