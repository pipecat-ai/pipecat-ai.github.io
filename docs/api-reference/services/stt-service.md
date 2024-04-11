# STTService (Speech-To-Text)

Speech-to-text is primarily provided by [Deepgram](https://deepgram.com/) through the DailyTransport. We recommend setting a few transcription properties in your code:

```python
transport.transcription_settings["extra"]["endpointing"] = True
transport.transcription_settings["extra"]["punctuate"] = True
```

These settings enable Deepgram to return transcriptions very quickly, but still include punctuation. This makes it easier to do sentence aggregation or display captions.

Deepgram provides transcription to the Daily call server, which forwards the transcriptions to the clients connected to the call. Daily AI makes those transacriptions available as `TranscriptionFrame`s in your app. Deepgram determines when it has enough audio data to transcribe a user's speech, so it will return full sentences or phrases. There are some helpful [utility services](utilities) that can ensure you have a complete response from a user before processing their speech.

## Local transcription with Whisper

The framework also includes a service for running Whisper transcription locally. Take a look at [the whisper example](https://github.com/daily-co/daily-ai-sdk/blob/9590cc2fbc0d5ad6a784e2a3b743005eb7beeb17/examples/foundational/13-whisper-transcription.py) in the framework for more information.
