# DailyTransport

The `DailyTransport` is a full-featured transport that enables you to join Pipecat bots to Daily WebRTC video calls. It's built on top of [daily-python](https://docs.daily.co/reference/daily-python), and it gives you access to a lot of advanced features—but it's also a great way to simply use WebRTC as the media backbone for building real-time bot interactions.

## DailyTransport.new()

```python
DailyTransport.new(
    room_url: str,
    token: str | None,
    bot_name: str,
    min_others_count: int = 1,
    start_transcription: bool = False,
    **kwargs
)
```

Positional arguments (but it's probably better to call them by name):

- `room_url`: The Daily room URL to connect to. It looks like `https://YOURDOMAIN.daily.co/YOURROOM`.
- `token`: You'll usually want to connect the bot to the room with owner privileges. If so, you can Daily's REST API to [create a meeting token](https://docs.daily.co/reference/rest-api/meeting-tokens), and include that token string here.
- `bot_name`: You'll see the bot's name if you use Daily Prebuilt, for example.
- `min_others_count`: After someone else joins, when the number of other participants in the room drops back below this number, the bot will exit. set this to 0 disable the bot automatically leaving the room.
- `start_transcription`: If you want to receive `TranscriptionFrame`s, you'll need to set this to True. **This requires an owner token to be included in the `token` property.**

Other available keyword arguments:

- `vad_enabled`: Whether or not to use Voice Activity Detection (VAD). If `True`, the transport will emit `UserStartedSpeaking` and `UserStoppedSpeaking` frames. VAD is also necessary for interruptions support. Defaults to `False`.
- `vad_start_s`: The amount of time a user needs to speak before the transport emits a `UserStartedSpeaking` frame. Defaults to `0.2`, or 200ms.
- `vad_stop_s`: The amount of time a user needs to stop speaking and remain silent before the transport emits a `UserStoppedSpeaking` frame. Defaults to `0.8`, or 800ms. This value represents a good middle ground: It's short enough that conversation feels responsive, but long enough that Deepgram can usually return all the transcriptions before the `UserStoppedSpeaking` frame is emitted.

### A bit more about VAD

The `DailyTransport` can use the VAD support built into the WebRTC library with no additional dependencies. However, we recommend installing the optional `silero` dependency if your platform supports it. This is an AI VAD library powered by Torch, and it's generally a bit better at distinguising talking from background noise. Pipecat will automatically use Silero VAD if you've installed the dependencies.

## Event Handlers

`add_event_handler`

`participant_joined`
`first_other_participant_joined`
`participant_left`
`transcription_message`
`app_message`

Other transcription events

## Send and receive behavior

### transport.run()

`transport.run(pipeline: Pipeline | None = None, override_pipeline_source_queue=True)`

This method runs the transport. For the `DailyTransport`, that includes joining the Daily room and setting up audio/video send and receive, depending on what you've configured.

This method also accepts a `pipeline` argument. If you include a pipeline, the transport will run and manage that [Pipeline](../pipelines) for you. That includes connecting the pipeline's source and sink to the transport's send and receive queues. It will also start and stop your pipeline when the transport starts and stops.

Your app will almost always include some form of `await transport.run()`, usually `await transport.run(pipeline)`.

### transport.run_pipeline()

```python
async def run_pipeline(pipeline: Pipeline, override_pipeline_source_queue=True):
```

This method connects the pipeline's source and sink to the transport's send and receive queues, but it doesn't manage the pipeline's lifecycle. You'll need to `await transport.run_pipeline(pipeline)` separately from `await transport.run()`.

The `override_pipeline_source_queue` property is used for a few things internally.

### transport.run_interruptible_pipeline()

```python
transport.run_interruptible_pipeline(
    pipeline: Pipeline,
    pre_processor: FrameProcessor | None = None,
    post_processor: FrameProcessor | None = None,
)
```

This method runs the pipeline connected to the transport's queues, but it runs it inside a cancelable `asyncio.task()`. If the transport detects that the user starts speaking (which generates a `UserStartedSpeaking` frame), the transport will cancel the currently executing `asyncio.task()`, empty all the frames in the transport's send queue, and start a new task.

The end result of this is that you can run the pipeline, and anytime the user speaks, the bot will stop what it's doing and start listening to the user.

Typically, you'll want to create your pipeline such that it expects to receive and accumulate `TranscriptionFrame`s from the user, and start generating a response as soon as it receives a `UserStoppedSpeakingFrame`.

This method also accepts two optional services as `pre_processor` and `post_processor`. As it turns out, `pre_processor` doesn't do anything special, so you can probably ignore it.

But `post_processor` is a bit different. As the transport runs, it consumes the frames coming out of the pipeline: Displaying `ImageFrame`s as video, playing `AudioFrame`s as audio, etc. But when running an interruptible pipeline, the transport will send each frame through the `post_processor` _after_ it finishes doing whatever it's supposed to with that frame. More specifically, each `AudioFrame` goes to the `post_processor` _after it has been successfully played_.

If the pipeline gets interrupted, the contents of the transport's output queue get dumped, so none of those frames go through the `post_processor`.

By convention, immediately after sending `AudioFrame`s with generated speech, [text-to-speech services](../services/tts-service) send a `TextFrame` with the text of that speech through the pipeline. So if you put an `LLMContextAggregator` in the `post_processor` of an interruptible pipeline, you can ensure that the bot's context will only contain sentences _it actually said to the user_. If a bot generates an 8-sentence response, but the user interrupts the bot in the middle of the 4th sentence, the context will only contain the first three sentences.

This method does not manage the pipeline lifecycle. You'll still need to do something like:

```python
asyncio.gather(transport.run(), transport.run_interruptible_pipeline(pipeline))
```

## Instance Methods

(In order to keep the documentation a bit more readable, some of the functionality described here actually comes from a `BaseTransport` class.)

### `send_app_message`

Calls daily-python's [`send_app_message`](https://reference-python.daily.co/api_reference.html#daily.CallClient.send_app_message) function.

### `dialout`

Calls [`start_dialout`](https://reference-python.daily.co/api_reference.html#daily.CallClient.start_dialout) in daily-python, which can be used to call SIP or PSTN phone numbers. See the [Daily docs](https://docs.daily.co/guides/products/dial-in-dial-out#main) for more information.

### `start_recording`

Starts a recording of the Daily room. See the [Daily docs](https://docs.daily.co/reference/rest-api/rooms/recordings/start) for more information.

### `say`

This is a convenience method for generating text-to-speech from a given sentence. It bypasses any running pipelines and just sends the sound directly to the transport.

### `stop` and `stop_when_done`

Functions for stopping a running transport. You probably don't need to call these directly; instead, sending an `EndFrame` though your pipeline should stop everything.

## Frame Behaviors

Here's a list of different kinds of frames, and how the `DailyTransport` handles them:

- `AudioFrame`: The transport will break the audio data into ~0.5s chunks and play them using `daily-python`. The audio playback is synchronous in the transport's thread, which means that if the transport's queue contains several `AudioFrame`s followed by an `ImageFrame`, the `ImageFrame` won't get handled until _playback of_ the `AudioFrame`s is completed.
- `ImageFrame`: When the transport receives an `ImageFrame`, it will display that image in the bot's webcam video inside the Daily call. That image will stay set and appear on screen until another `ImageFrame` is received.
- `SpriteFrame`: These frames contain a sequence of images. When the transport receives a `SpriteFrame`, it will loop those frames in the bot's webcam video at the configured frame rate of the transport until it receives another `SpriteFrame` or `ImageFrame`.
- `UserImageRequestFrame`: If the transport's `video_rendering_enabled` property is set to `True`, when it receives a `UserImageRequestFrame`, it will grab a frame from one or all participants' cameras and put those frames into the pipeline as `UserImageFrame`s
- `SendAppMessageFrame`: If a `DailyTransport` receives this frame, it will use `send_app_message()` from daily-python to send a message to other call participants.
