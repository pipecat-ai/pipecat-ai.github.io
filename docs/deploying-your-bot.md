# Deploying Your Bot

Once you have a working bot that you can run with a command like `python bot.py`, you'll need to solve two problems to make it available to the world:

1. Figure out how to run it when people want to talk to it.
2. Run it somewhere other than your own computer.

## Step 1: A bot server

You're almost certainly going to need a web server to run your bots. The examples include a [simple web server](https://github.com/daily-co/dailyai-examples/blob/main/chatbot/server.py) that shows how you might do this.

The `chatbot` example is a simple bot that uses `DailyTransport` and [Daily Prebuilt](https://www.daily.co/products/prebuilt-video-call-app/) as the front-end. If you run `python server.py` and then open `http://localhost:7860` in a web browser, the server will:

1. Create a new, randomly-named Daily room and access token using Daily's API
2. Run `bot.py` in a subprocess and connect the bot to that new room
3. Return the Daily Room URL as a redirect, so your browser joins that same room

The bot subprocess exits when you leave the room, or after a predetermined amount of time (`duration_minutes` in DailyTransport).

The [Storytelling Chatbot](https://github.com/daily-co/dailyai-examples/tree/main/storytelling-chatbot) example has a good example of a more complex webserver. That example has a custom frontend. The server is serving the frontend, as well as a few API endpoints for creating Daily rooms, starting bots, and monitoring overall performance.

## Step 2: A host somewhere

The easiest way to package and deploy your app is Docker. Depending on the specific AI services you're using, you may have some heavy and/or platform-specific dependencies that will need to be installed alongside your app. The examples include a simple Dockerfile that you can use as a starting point.

As far as hosting platforms go, you'll need to be mindful of the power of your VM compared to what you're trying to do in your bot. If you're mostly using third-party services through their APIs, you can definitely run on small, CPU-only VMs, and you can probably run many concurrent bots on a single server before needing to worry about horizontal scaling. But if you're trying to run local AI services, you'll need to pick instances that have access to some GPU power.

This is where [fly.io](https://fly.io) presents an interesting option with their new GPU instances. There's an [example server](tktktk) hidden in the framework repo that uses the Fly API to spin up bot instances on separate machines instead of using subprocesses on the same machine. That means you can run a single, small webserver, but spin up new GPU instances on demand for running bots when users want to use them.
