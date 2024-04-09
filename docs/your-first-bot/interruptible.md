---
sidebar_position: 3
---

# The Interruptible Version

In order to make this truly interactive, we need to add the ability to interrupt the bot. There's a method in the transport for that. Here's what the end of our app looks like now:

```python
        async def run_conversation():
            messages = [
                {
                    "role": "system",
                    "content": "You are a helpful LLM in a WebRTC call. Your goal is to demonstrate your capabilities in a succinct way. Your output will be converted to audio. Respond to what the user said in a creative and helpful way.",
                },
            ]

            await transport.run_interruptible_pipeline(
                pipeline,
                post_processor=LLMResponseAggregator(messages),
                pre_processor=UserResponseAggregator(messages),
            )

        await asyncio.gather(transport.run(), run_conversation())
```

You can see the full version in `examples/foundational/07-interruptible.py`. Instead of passing the pipeline into the transport, you'll need to run it as a separate coroutine, and use `asyncio.gather` to wait for both of them.

You'll need to set `enable_vad=True` when you initialize your transport object. When you do that, the transport will run Voice Activity Detection (VAD) on incoming audio in a separate thread. When it detects that the user has started speaking, it will emit a `UserStartedSpeakingFrame`. The `run_interruptible_pipeline` method runs your pipeline in an `asyncio.task` while watching for those frames. When it receives a `UserStartedSpeakingFrame`, it cancels the currently running task and empties its receive queue, which basically stops everything. Then, the function starts a new `asyncio.task` with your pipeline again.

To move beyond this example, you'll want to start implementing your own custom pipeline services. We'll see how to do that in the next section.
