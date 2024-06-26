# Basic Deployment Pattern


## Project Structure

A Pipecat project will often consist of the following:

- **A bot file**, e.g. `bot.py` - A scoped Pipecat bot, containing all the pipelines that you want to run in order to communicate with an end-user. A bot file may take some command line arguments, such as a transport URL and configuration.
- **A runner**, e.g. `bot_runner.py` — A basic HTTP service that listens for incoming user requests and spawns the relevant bot file in response.

*Please note: you can call these files whatever you like! We use `bot.py` and `bot_runner.py` for simplicity.*

---

## Bot Runner

HTTP service, providing a gateway for spawning bots on-demand:

![Basic pipeline image](assets/deployment-1.png)

The anatomy of a bot runner service is arbitrary and dependant on your use-case, but at very least will have a method that spawns a new bot agent, for example:

```python
import uvicorn

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/start_bot")
async def start_bot(request: Request) -> JSONResponse:
    # ... handle / authenticate the request
    # ... provision the transport session
    
    # Spawn a new bot process
    try:
       #... create a new bot instance
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to start bot: {e}")
            
    # Return the room URL and token to the user
    return JSONResponse({...})

if __name__ == "__main__":
    uvicorn.run(
        "bot_runner:app",
        host="0.0.0.0",
        port=7860
    )

```

Here, we listen for incoming user requests or webhook, hoist the session (such as creating rooms on your transport provider), instantiate a new bot agent and return some JSON to a user.


### Data transport

Your [transport layer](/docs/category/transports) is responsible for sending and receiving media data over the internet.

You will have implemented a transport layer as part of your `bot.py` pipeline. This may be a service that you want to host and include in your deployment, or it may be a third-party service waiting for peers to connect (such as [Daily](https://www.daily.co).)

For this example, we will make use of Daily’s WebRTC transport. This will mean that our `bot_runner.py`  will need to do some configuration when it spawns a new bot:

1. Create and configure a new Daily room for the session to take place in.
2. Issue both the bot and the user an authentication token to join the session.

Whatever you use for your transport layer, you’ll likely need to setup some environmental variables and run some custom code before spawning the agent.


### Best practice for bot files

A good pattern to work to is the assumption that your `bot.py` is an encapsulated entity and does not have any knowledge of the `bot_runner.py`. You should provide the bot everything it needs to operate during instantiation.

Sticking to this approach helps keep things simple and makes it easier to step through debugging (if the bot launched and something goes wrong, you know to look for errors in your bot file.) 

### Showing a web UI

If you’re not using phone numbers to talk to your bot, you may want to serve a user interface. You could optionally serve static files at the root directory of your `bot_runner.py`, but we recommend keeping this separate so you have less to debug later and your container is kept light.

For the purposes of being feature complete in this documentation, we’ll include simple static file serving so that we only need to containerize and deploy a single project.

---

## Example

As a first step, let's create a `bot_runner.py` that:

- Creates an API for users to send requests to
- Launches a bot as a subprocess
- Serves a static web frontend for the user to interact with

A full example of this code can be found in the [examples folder](https://github.com/pipecat-ai/pipecat/tree/main/examples) on the pipecat repo.

### HTTP API

`bot_runner.py`

```python
import os
import argparse
import subprocess
import requests

from pipecat.transports.services.helpers.daily_rest import DailyRESTHelper, DailyRoomObject, DailyRoomProperties, DailyRoomParams

from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from dotenv import load_dotenv
load_dotenv(override=True)


# ------------ Configuration ------------ #

MAX_SESSION_TIME = 5 * 60  # 5 minutes
REQUIRED_ENV_VARS = [
    'DAILY_API_KEY',
    'OPENAI_API_KEY',
    'ELEVENLABS_API_KEY',
    'ELEVENLABS_VOICE_ID']

daily_rest_helper = DailyRESTHelper(
    os.getenv("DAILY_API_KEY", ""),
    os.getenv("DAILY_API_URL", 'https://api.daily.co/v1'))


# ----------------- API ----------------- #

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ----------------- Main ----------------- #


@app.post("/start_bot")
async def start_bot(request: Request) -> JSONResponse:
    try:
        data = await request.json()
        # Is this a webhook creation request?
        if "test" in data:
            return JSONResponse({"test": True})
    except Exception as e:
        pass

    # Use specified room URL, or create a new one if not specified
    room_url = os.getenv("DAILY_SAMPLE_ROOM_URL", "")

    if not room_url:
        params = DailyRoomParams(
            properties=DailyRoomProperties()
        )
        try:
            room: DailyRoomObject = daily_rest_helper.create_room(params=params)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Unable to provision room {e}")
    else:
        # Check passed room URL exists, we should assume that it already has a sip set up
        try:
            room: DailyRoomObject = daily_rest_helper.get_room_from_url(room_url)
        except Exception:
            raise HTTPException(
                status_code=500, detail=f"Room not found: {room_url}")

    # Give the agent a token to join the session
    token = daily_rest_helper.get_token(room.url, MAX_SESSION_TIME)

    if not room or not token:
        raise HTTPException(
            status_code=500, detail=f"Failed to get token for room: {room_url}")

    try:
        subprocess.Popen(
            [f"python3 -m bot -u {room.url} -t {token}"],
            shell=True,
            bufsize=1,
            cwd=os.path.dirname(os.path.abspath(__file__)))
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to start subprocess: {e}")

    # Grab a token for the user to join with
    user_token = daily_rest_helper.get_token(room.url, MAX_SESSION_TIME)

    return JSONResponse({
        "room_url": room.url,
        "token": user_token,
    })

if __name__ == "__main__":
    # Check environment variables
    for env_var in REQUIRED_ENV_VARS:
        if env_var not in os.environ:
            raise Exception(f"Missing environment variable: {env_var}.")

    parser = argparse.ArgumentParser(description="Pipecat Bot Runner")
    parser.add_argument("--host", type=str,
                        default=os.getenv("HOST", "0.0.0.0"), help="Host address")
    parser.add_argument("--port", type=int,
                        default=os.getenv("PORT", 7860), help="Port number")
    parser.add_argument("--reload", action="store_true",
                        default=False, help="Reload code on change")

    config = parser.parse_args()

    try:
        import uvicorn

        uvicorn.run(
            "bot_runner:app",
            host=config.host,
            port=config.port,
            reload=config.reload
        )

    except KeyboardInterrupt:
        print("Pipecat runner shutting down...")

```


### Dockerfile


```shell
FROM python:3.11-bullseye

# Open port 7860 for http service
ENV FAST_API_PORT=7860
EXPOSE 7860

# Install Python dependencies
COPY *.py .
COPY ./requirements.txt requirements.txt
RUN pip3 install --no-cache-dir --upgrade -r requirements.txt

# Install models
RUN python3 install_deps.py

# Start the FastAPI server
CMD python3 bot_runner.py --port ${FAST_API_PORT}
```

The bot runner and bot `requirements.txt`:
```
pipecat-ai[...]
fastapi
uvicorn
requests
python-dotenv
```

And finally, let's create a `.env` file with our service keys

```
DAILY_API_KEY=...
OPENAI_API_KEY=...
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_ID=...
```

### How it works

Right now, this runner is spawning `bot.py` as a subprocess. When spawning the process, we pass through the transport room and token as system arguments to our bot, so it knows where to connect.

Subprocesses serve as a great way to test out your bot in the cloud without too much hassle, but depending on the size of the host machine, it will likely not hold up well under load. 

Whilst some bots are just simple operators between the transport and third-party AI services (such as OpenAI), others have somewhat CPU-intensive operations, such as running and loading VAD models, so you may find you’re only able to scale this to support up to 5-10 concurrent bots.

### Best practices

In an ideal world, we'd recommend containerizing the bot and the bot runner independently to keep the image for the bot to a bare minimum (it very likely doesn't need Node, or the static files etc.) For the sake of simplicity we're just using one container for everything.

### Build and run

We should now have a project that contains the following files:

- `bot.py`
- `bot_runner.py`
- `requirements.txt`
- `.env`
- `Dockerfile`

`docker build ...`

