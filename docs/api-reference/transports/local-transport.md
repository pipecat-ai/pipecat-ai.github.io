# LocalTransport

You can use the `LocalTransport` to build Daily AI apps that directly access the mic, speaker, and camera devices on your computer. You'll need to install the optional `pyaudio` dependency to use the `LocalTransport`:

```
pip install dailyai[pyaudio]
```

On MacOS, you'll also need to `brew install portaudio` for this to work.

There are several [foundational examples](https://github.com/daily-co/daily-ai-sdk/blob/e22babbae2ef33454158b59831114734adf5f5d8/examples/foundational/03a-image-local.py) in the framework repo that show local transport functionality.
