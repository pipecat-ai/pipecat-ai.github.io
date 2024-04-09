# Pipelines

This class manages a pipe of FrameProcessors, and runs them in sequence. The "source" and "sink" queues are managed by the caller. You can use this class stand-alone to perform specialized processing, or you can use the Transport's run_pipeline method to instantiate and run a pipeline with the Transport's sink and source queues.

```python
Pipeline.new(
    processors: List[FrameProcessor],
    source: asyncio.Queue | None = None,
    sink: asyncio.Queue[Frame] | None = None,
    name: str | None = None,
)
```

Arguments:

- `processors`: The list of services (`FrameProcessor` objects) that make up the pipeline.
- `source`: This queue is where the pipeline watches for frames. Any frames pushed into this queue will get dequeued and sent into the first service in the list of `processors`.
- `sink`: The destination queue. Any frames yielded by the last service in the list of `processors` get pushed into this queue.
- `name`: Used for debug logging.

## Instance Methods

### `set_source(source: asyncio.Queue[Frame])`

You can call this method if you need to set the source queue for a pipeline after you create it. (The `run_pipeline` method in the transport uses this.)

### `set_sink(sink: asyncio.Queue[Frame])`

You can call this method if you need to set the sink queue for a pipeline after you create it. (The `run_pipeline` method in the transport uses this.)

### `queue_frames(frames: Iterable[Frame] | AsyncIterable[Frame])`

Use this method to insert frames directly into the source queue of a pipeline. This is commonly used in an `on_first_other_participant_joined` callback to prompt a bot to greet a user, for example.

### `run_pipeline()`

It's often easier to let the transport handle running your pipeline. But if you need more control over when and how your pipelines execute, you can use this method to run a pipepline, and `await` it in your app code.
