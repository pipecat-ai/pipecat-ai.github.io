# Dialin with Daily

## Example project

We have a complete dialin-ready project using Daily as both a transport and PSTN/SIP provider [here](#)TBC. This guide reference the project and steps through the important parts that make dialin work.

## Things you'll need

- An active [Daily](daily.co) developer key.
- One or more Daily provisioned phone numbers (covered below).

### Do I need to provision my phone numbers through Daily?

You can use Daily solely as a transport if you prefer. This is particularly useful if you already have Twilio-provisioned numbers and workflows. In that case, you can configure Twilio to send some or all of your calls to your Pipecat agents. More details on using Twilio with Daily as a transport can be found [here](#TBC).

If you’re starting from scratch, using everything on one platform offers some convenience. By provisioning your phone numbers through Daily and using Daily as the transport layer, you won’t need to worry about initial call routing, for example.

**The following guide assumes use of Daily for both WebRTC transport and as a phone vendor.**

## How it works

TBC: Image to go here

When a user dials a Daily provisioned number, 


## Configuring your domain

TBC

## Purchasing a phone number

TBC

## Configuring your bot runner

You'll need a HTTP service that can receive incoming call hooks and trigger a new agent session. We discussed the concept of a [bot runner](http://localhost:3000/docs/deploying-your-bot/basic-pattern) in the deployment section, which we'll build on here to add support for incoming phone calls.

Within the `start_bot` method, we'll need to grab both `callId` and `callDomain` from the incoming web request that is trigger by Daily when someone dials our number:

```python
  # Get the dial-in properties from the request
    try:
        data = await request.json()
        callId = data.get("callId")
        callDomain = data.get("callDomain")
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Missing properties 'callId' or 'callDomain'")
```

#### Pointing Daily to this URL

Daily needs our `start_bot` URL as a webhook it can trigger when a user dials a phone number. Here is an example:

```shell
curl --location 'https://api.daily.co/v1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer [DAILY API TOKEN HERE]' \
--data '{
    "properties": {
        "pinless_dialin": {
            "phone_number": "[DAILY PROVISIONED NUMBER HERE]",
            "room_creation_api": "[BOT RUNNER URL]/start_bot"
        }
    }
}'
```

If you want to test locally, you can expose your web method using a service such as [ngrok](https://ngrok.com/).

Please refer to the REST documentation [here](TBC)


### Creating a new SIP-enabled room

We'll need to configure the room to be setup to receive SIP connections. `daily-helpers.py` is already setup to support this, so we just need to pass through new SIP parameters as part of room creation:

```python
params = DailyRoomParams(
    properties=DailyRoomProperties(
        sip=DailyRoomSipParams(
            display_name = "sip-dialin"
            video = False
            sip_mode = "dial-in"
            num_endpoints = 1
        )
    )
)
try:
    room: DailyRoomObject = daily_rest_helper.create_room(params=params)
except Exception as e:
    raise HTTPException(
        status_code=500,
        detail=f"Unable to provision room {e}")
print (f"Daily room returned {room.url} {room.config.sip_endpoint}")
```

Your Daily room object will include a `sipUriEndpoint`, which we'll need to pass to the Pipecat agent, alongside the `callId` and `callDomain`. For simplicity, our agents are spawned as subprocesses of the bot runner, so we'll pass these through as command line arguments:

```python
proc = subprocess.Popen(
    [
        f"python3 -m bot -u {room.url} -t {token} -i {callId} -d {callDomain} -s {room.config.sip_endpoint}"
    ],
    shell=True,
    bufsize=1,
    cwd=os.path.dirname(os.path.abspath(__file__))
)
```

That's all the configuration we need in our `bot_runner.py`.

## Configuring your Pipecat bot

Let's take a look at `bot_daily.py` and step through the configuration. First, it's setup to receive additional command line parameters which are passed through to the `DailyTransport` object:

```python
from pipecat.transports.services.daily import DailyParams, DailyTransport, DailyDialinSettings

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pipecat Daily Example")
    parser.add_argument("-u", type=str, help="Room URL")
    parser.add_argument("-t", type=str, help="Token")
    parser.add_argument("-i", type=str, help="Call ID")
    parser.add_argument("-d", type=str, help="Call Domain")
    parser.add_argument("-s", type=str, help="SIP URI")
    config = parser.parse_args()

    asyncio.run(main(config.u, config.t, config.i, config.d, config.s))

async def main(room_url: str, token: str, callId: str, callDomain: str, sipUri: str):
    async with aiohttp.ClientSession() as session:
        diallin_settings = DailyDialinSettings(
            call_id=callId,
            call_domain=callDomain,
            sip_uri=sipUri
        )

        transport = DailyTransport(
            room_url,
            token,
            "Chatbot",
            DailyParams(
                api_url=daily_api_path,
                api_key=daily_api_key,
                dialin_settings=diallin_settings,
                audio_in_enabled=True,
                audio_out_enabled=True,
                camera_out_enabled=False,
                vad_enabled=True,
                vad_analyzer=SileroVADAnalyzer(),
                transcription_enabled=True,
            )
        )

        # ... your bot code
```

Optionally, we can listen and react to the `on_dialin_ready` event, which indicates that the SIP worker and is ready to be forwarded. This would stop any hold music and connect the end-user to our Pipecat bot.

```python
@transport.event_handler("on_dialin_ready")
async def on_dialin_ready(transport, cdata):
    print(f"on_dialin_ready", cdata)

```

Since we're using Daily as a phone vendor, this method is handled internally and we don't need to do anything. It can, however, be useful to override this default behaviour if you want to configure your bot in a certain way as soon as the call is ready. Typically, however, initial setup is done in the `on_first_participant_joined` event after the user has joined the session.

## Further customization

To further customize the experience, such as changing hold music or adding entry pins, please refer to Daily's documentation here: TBC