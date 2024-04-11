# WebsocketTransport

We recommend using a WebRTC-powered transport like `DailyTransport` if you want to ensure good experiences for real-time audio and (especially) video. But you can use the `WebsocketTransport` for apps where you might already be using a websocket connection for other parts of the app.

The framework repo has [a websocket example](https://github.com/daily-co/daily-ai-sdk/blob/27322108b728adda3708fb59e2ff20e3183efc4e/examples/foundational/websocket-server/sample.py) with an example frontend. The websocket transport uses [protocol buffers](https://protobuf.dev/) to serialize the various frame types and send them over the wire.