# Custom Pipelines

If you're trying to implement custom logic in your bot, your first instinct will probably be to create an `AIService` subclass and override the `process_frame` method. This is the right thing to do most of the time, and you'll see it throughout the framework examples.

But `process_frame` depends on receiving an input frame in order to generate output frames. What if you need to be able to generate output that doesn't necessarily correspond to an input? For example, what if you're connecting to a remote server with a websocket and receiving events, and you want your bot to be able to announce when it receives an event?

In that case, you'll need to build a custom pipeline. You can do that by creating a subclass of `CustomPipeline`, and overriding the `run_pipeline` function. That function will have access to `self.source` and `self.sink` objects, which are the source and sink queues for the pipeline.

For example, here's a simple custom pipeline that passes through any frames it receives, but also emits frames from a custom_function:

```python
class MyPipeline(CustomPipeline):
    def run_pipeline(self):
        t1 = asyncio.create_task(self.passthrough())
        t2 = asyncio.create_task(self.custom_function())
        await asyncio.gather(t1, t2)

    def passthrough(self):
        while True:
            frame = await self.source.get()
            await self.sink.put(frame)

    def custom_function(self):
        async with EventGenerator() as event:
            frame = TextFrame(event.text)
            await self.sink.put(frame)
```

You can use an instance of your custom pipeline anywhere you'd use a standard pipeline—either connecting it directly to the transport, or connecting it to other pipelines.
