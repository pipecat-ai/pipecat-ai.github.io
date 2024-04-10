# TTSService (Text-To-Speech)

## Frame Types

**Input**: `TextFrame`s (Be careful, because TextFrame subclasses can also cause text-to-speech generation!)

**Output**: TTS services yield these frames, in this order:

1. `TTSStartFrame`
2. 0 or more `AudioFrame`s
3. `TTSEndFrame`
4. A `TextFrame` with the original source text.

TTS services _do not_ pass through the original `TextFrame`s. Instead, they yield text frames after generating audio. The exact contents of each `TextFrame` depends on the configuration of the TTS service.

For example, consider a `TTSService` with `aggregate_sentences=True`. The following input:

```
<TextFrame text="This">
<TextFrame text=" is">
<TextFrame text=" sentence">
<TextFrame text=" one.">
<TextFrame text=" This">
<TextFrame text=" is">
<TextFrame text=" the">
<TextFrame text=" second.">
```

Will produce the following frames as output:

```
<TTSStartFrame>
<AudioFrame>
...
<AudioFrame>
<TTSEndFrame>
<TextFrame text="This is sentence one.">
<TTSStartFrame>
<AudioFrame>
...
<AudioFrame>
<TTSEndFrame>
<TextFrame text="This is the second.">
```

## Configuration

Each TTS service initializer takes a slightly different parameter set. Some allow you to specify a model. Most require an API key.

The base TTS service class has one configurable property: `aggregate_sentences`. When this property is set to `True`, the TTS service will collect `TextFrame`s until it sees sentence-ending punctuation: `if self.current_sentence.strip().endswith((".", "?", "!"))`. Then, it will generate audio for the entire sentence.

LLM services can stream responses back as single words (or single tokens). By collecting entire sentences, the TTS services can generate much more natural-sounding speech.