---
sidebar_position: 2
---

# Getting Started

Let's start by getting Daily AI installed and running your first example app.

## Accounts you'll need (or want)

While you can use Daily AI without them, there are a few third-party services you'll probably want to use with Daily AI. We recommend these to start, since they're easy to sign up and get started for free or low cost:

- [Daily.co](https://dashboard.daily.co/u/signup) for your transport layer. Daily uses WebRTC to exchange real-time audio and video between the bot and the user.
- [OpenAI](https://platform.openai.com/signup) gets you ChatGPT for an LLM, and DALL-E for image generation.
- [Eleven Labs](https://elevenlabs.io/sign-up) or [Deepgram](https://console.deepgram.com/signup) for text-to-speech.

## Installing the module

To start, we recommend using a virtual environment, or `venv`, inside a new directory:

```bash
mkdir dailyai-test
cd dailyai-test
python3 -m venv env
source env/bin/activate
```

The `dailyai` Python module has a lot of optional dependencies, including some pretty big AI libraries. The module uses a lot of optional dependencies to allow you to only install what you need. For example, to install `dailyai` along with support for the services above, run this command (or add it to your `requirements.txt`):

```bash
pip install dailyai[daily,openai]
```

In order to use local audio on MacOS, you'll need to do one more thing:

```bash
brew install portaudio
```

:::tip[No Dependencies Required]

Some services, like Eleven Labs and Deepgram, just use built-in Python functionality for REST requests, so they don't have anything extra to install.

:::

You can always install other dependencies later. For the full list, look for the `[project.optional-dependencies]` section in [pyproject.toml](https://github.com/daily-co/dailyai/blob/main/pyproject.toml).

## Preparing your environment

Now that you've got the module installed, you'll need to set some environment variables for the example app to use. For this next part, we'll presume you're using the ["Say One Thing"](https://github.com/daily-co/dailyai/blob/main/examples/foundational/01-say-one-thing.py) example app with its default services.

Start by heading over to [dashboard.daily.co/rooms](https://dashboard.daily.co/rooms) and creating a new room. You can leave everything as-is in the room creation screen, or change anything you want. (Emoji reactions and advanced chat are fun.) Make note of the name of the room you created, as well as your account domain; you'll need it in the form `https://YOURDOMAIN.daily.co/YOURROOM` in the following steps.

While you're there, stop by [dashboard.daily.co/developers](https://dashboard.daily.co/developers) and copy your API key.

Next, head over to [Eleven Labs](https://elevenlabs.io/app/voice-lab) and find a voice you want to use. Make note of the Voice ID, and get your API key from your user avatar on the bottom left.

## Running your first example

Download the ["Say One Thing"](https://github.com/daily-co/dailyai/raw/main/examples/foundational/01-say-one-thing.py) example file from the [`dailyai` repo](https://github.com/daily-co/dailyai/blob/main/examples/foundational/01-say-one-thing.py), and save it to a new folder somewhere. In that same folder, create a file named `.env`, and add values for the following environment variables:

```
DAILY_SAMPLE_ROOM_URL=https://YOURDOMAIN.daily.co/YOURROOM # with the real domain and room name, of course
DAILY_API_KEY=7df3...
ELEVENLABS_API_KEY=aeb1...
ELEVENLABS_VOICE_ID=ErXw...
```

Open your Daily room URL in a browser tab. Once you've joined the room, run the example:

```bash
python 01-say-one-thing.py
```

If all goes well, you should see another participant join the room, greet you by name, and disconnect.

Next, we'll talk about the architecture of Daily AI bots, so you can build your own!
