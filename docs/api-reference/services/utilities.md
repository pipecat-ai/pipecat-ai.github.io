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

This service lets you run a set of services in parallel, instead of sequentially. For example, it's used in `05-sync-speech-and-image` in [the framework repo](https://github.com/daily-co/daily-ai-sdk/blob/27322108b728adda3708fb59e2ff20e3183efc4e/examples/foundational/05-sync-speech-and-image.py):

```python
pipeline = Pipeline(
    processors=[
        llm,
        sentence_aggregator,
        ParallelPipeline(
            [[month_prepender, tts], [llm_full_response_aggregator, imagegen]]
        ),
        gated_aggregator,
    ],
)
```

It's important to keep in mind that the parallel pipeline doesn't let frames get 'out of order'; it takes frame A from its source queue and sends it through all of the parallel pipelines at the same time, but it doesn't start processing frame B from its source queue until all of the parallel branches from frame A have completed and yielded frames to the sink queue.

### `GatedAggregator`

For more information on the `GatedAggregator`, take a look at [this example in the framework](https://github.com/daily-co/daily-ai-sdk/blob/e22babbae2ef33454158b59831114734adf5f5d8/examples/foundational/05-sync-speech-and-image.py), as well as [the comments in the source code](https://github.com/daily-co/dailyai/blob/db05a9b29b24d483815b60a3e727fae3f874666d/src/dailyai/pipeline/aggregators.py#L418).

### `VisionImageFrameAggregator`

Use a `VisionImageFrameAggregator` to build a `VisionImageFrame` out of a `TextFrame` and an `ImageFrame`. See [Vision Services](vision-service) for more info.
