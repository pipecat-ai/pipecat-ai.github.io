# Overview

You've created your Pipecat bot, had a good chat with it locally, and are eager to share it with the world. Let’s explore how to approach deployment.

## Things you'll need

- **Transport service** - Pipecat has existing service for various different [media transport](http://localhost:3000/docs/category/transports) modes, such as WebRTC or WebSockets. If you're not using a third-party service for handling media transport, you'll want to make sure that infrastructure is hosted and ready to receive connections.

- **Deployment target** - You can deploy and run Pipecat bots anywhere that can run Python code - Google Cloud Run, AWS, Fly.io etc. We recommend providers that offer APIs, so you can programmatically spawn new bot agents on-demand. We like [fly.io](fly.io) for its simplicity. 

- **Docker** - Most cloud VMs will expect a containerized app, so worth having Docker installed and setup to run builds. We'll step through creating a `Dockerfile` in this documentation.

### Production-ready bots (for real-world use-cases)

In local development things often work great as you're testing on controlled, stable network conditions. In the real-world, however, your end-users will likely interact with your bot across a variety of different devices and network conditions.

WebSockets are fine for server-to-server communication or for initial development. But for production use, you’ll likely want client-server audio that uses a protocol designed for real-time media transport. (For an explanation of the difference between WebSockets and WebRTC, [see this post](https://www.daily.co/blog/how-to-talk-to-an-llm-with-your-voice/#webrtc).)

If you're targeting scalable, client-server interactions, we recommend you use WebRTC for the best results.


### Supporting models

Most chatbots require very little in the way of system resources, but if you are making use of custom models or require GPU-powered infrastructure, it's important to consider how to pre-cache local resources so that they are not downloaded at runtime. Your bot processes / VMs should aim to launch and connect as quickly as possible, so the user is not left waiting. Designing a pool of idle workers is out of scope for our documentation, but we aim to consider best practices in all of our examples.

Most Pipecat examples make use of Silero VAD, and we recommend including that model as part of your Docker image so it's cached and readily available when your bot runs. The downside of this approach is that it can inflate the size of your container, so you may want to consider making it availabile via a network volume and ensuring your bot knows where to find it.

For Silero, you can read more about how to do this [here](https://pypi.org/project/silero/#:~:text=Models%20are%20downloaded%20on%20demand,downloaded%20to%20a%20cache%20folder). 

```python
# Run at buildtime
torch.hub.load(repo_or_dir='snakers4/silero-vad', model='silero_vad', force_reload=True)
```