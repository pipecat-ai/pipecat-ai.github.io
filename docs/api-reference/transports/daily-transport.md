# DailyTransport

The `DailyTransport` is a full-featured transport that enables you to join DailyAI bots to Daily WebRTC video calls. It's built on top of [daily-python](https://docs.daily.co/reference/daily-python), and it gives you access to a lot of advanced features—but it's also a great way to simply use WebRTC as the media backbone for building real-time bot interactions.

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

The `DailyTransport` can use the VAD support built into the WebRTC library with no additional dependencies. However, we recommend installing the optional `silero` dependency if your platform supports it. This is an AI VAD library powered by Torch, and it's generally a bit better at distinguising talking from background noise. Daily AI will automatically use Silero VAD if you've installed the dependencies.

## Event Handlers

`add_event_handler`

`participant_joined`
`first_other_participant_joined`
`participant_left`
`transcription_message`
`app_message`

Other transcription events

## transport.run() and run_pipeline()

## run_interruptible_pipeline

## Other Instance Methods

In order to keep the documentation a bit more readable, some of the functionality described here actually comes from a `BaseTransport` class.

`send_app_message`
`dialout`
`start_recording`

`say`
`stop`
`stop_when_done`
`interrupt`

## Frame Behaviors
