# Utility Services

In addition to the various AI services available in Daily AI, there are a handful of utility service classes that help you build your app.

## Aggregators

These should all be imported from `dailyai.pipeline.aggregators`.

### `LLMUserResponseAggregator` and `LLMAssistantResponseAggregator`

These services are the best way to take a conversation between a user and a bot and save it to a [list of messages](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) that can be used for LLM completions. Both service initializers take a `messages` object, which you should create in your app and pass to both services, like this:

```python
messages = []
user_aggregator = LLMUserResponseAggregator(messages, transport._my_participant_id)
bot_aggregator = LLMAssistantResponseAggregator(messages, transport._my_participant_id)
```

Each service listens for a start frame, one or more text frames, and an end frame.

LLMUserResponseAggregator:

- Start: `UserStartedSpeakingFrame`
- Text: `TranscriptionFrame`
- End: `UserStoppedSpeakingFrame`

(Note: This uses VAD to generate the started and stopped speaking frames.)

LLMAssistantResponseAggregator:

- Start: `LLMResponseStartFrame`
- Text: `TextFrame
- End: `LLMResponseEndFrame`

You can see this in action in [the chatbot example app](https://github.com/daily-co/dailyai-examples/blob/b8823527065d4086f9a98f8008cc51d64f3ce969/chatbot/bot.py).

### `UserResponseAggregator`

If you want to accumulate user speech between 'started' and 'stopped' talking events, but you don't want to store that in a `messages` list for an LLM, you can use a `UserResponseAggregator`. This will accumulate all `TranscriptionFrame`s received between a `UserStartedSpeakingFrame` and a `UserStoppedSpeakingFrame`, then emit them as a single `TextFrame`.

### `LLMFullResponseAggregator`

The same as the `UserResponseAggregator`, but, you know, for the LLM.

### `SentenceAggregator`

This uses an approach similar to the approach used by text-to-speech services: It will accumulate `TextFrame`s until it sees one with sentence-ending punctuation, then emit all of the accumulated text as one frame. So, for example:

```
<TextFrame text="Hello, it's">
<TextFrame text=" nice to meet">
<TextFrame text=" you.">
```

Becomes a single TextFrame containing the text `"Hello, it's nice to meet you."`

### `StatelessTextTransformer`

This service transforms the text of any `TextFrame`s it sees. For example, this instance:

```python
aggregator = StatelessTextTransformer(lambda x: x.upper())
```

Would receive `<TextFrame text="Hello!">` and emit `<TextFrame text="HELLO!">`.

## Advanced Aggregators

These services enable some complex pipeline architectures.

### `ParallelPipeline`

tktktk

### `GatedAggregator`

tktktk

### `VisionImageFrameAggregator`

tktktk
