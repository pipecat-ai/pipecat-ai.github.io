# Dialin with Twilio

## Example project

We have a complete dialin-ready project using Daily as both a transport and PSTN/SIP provider [here](#)TBC. This guide reference the project and steps through the important parts that make dialin work.

## Things you'll need

- An active [Twilio](https://www.twilio.com) developer key.
- One or more Twilio provisioned phone numbers (covered below).
- The Twilio Python client library (`pip install twilio`).

## Getting a phone number

- Visit [console.twilio.com](https://console.twilio.com) and purchase a new phone number (or via the API.)
- Ensure your purchased number supports Voice capabilities
- Ensure your purchased number appears in your 'active numbers' list

## Project setup

You'll need to set two environment variables for your project: `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN`, value for which you can obtain via the Twilio console. 

## Configuring your bot runner

You'll need a HTTP service that can receive incoming call hooks and trigger a new agent session. We discussed the concept of a [bot runner](http://localhost:3000/docs/deploying-your-bot/basic-pattern) in the deployment section, which we'll build on here to add support for incoming phone calls.

Within the `start_bot` method, we'll setup the Twilio client like so:

```python
@app.post("/start_bot", response_class=PlainTextResponse)
async def start_bot (request: Request):
    # Note: unlike Daily, Twilio uses FormData and PlainText responses
    data = None
    try:
        form_data = await request.form()
        data = dict(form_data)
    except Exception:
        pass

    # We'll need to pass through the caller ID to our Pipecat bot
    callId = data.get('CallSid')

    # Create a room and spawn bot
    # ... see below for creating a room
    proc = subprocess.Popen(
        [
            f"python3 -m bot -u {room.url} -t {token} -i {callId} -s {room.config.sip_endpoint}"
        ],
        shell=True,
        bufsize=1,
        cwd=os.path.dirname(os.path.abspath(__file__))
    )

    # We have the room and the SIP URI,
    # but we do not know if the Daily SIP Worker and the Bot have joined the call
    # put the call on hold until the 'on_dialin_ready' fires.
    # The bot will call forward_twilio_call when it ready.
    resp = VoiceResponse()
    resp.play(url="http://com.twilio.sounds.music.s3.amazonaws.com/MARKOVICHAMP-Borghestral.mp3", loop=10)
    return str(resp)
```

### Creating a SIP-enabled room

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

## Setup the Twilio webhook on your phone number

Twilio needs to know where our `start_bot` URL is located as a webhook which it can trigger when a user dials a phone number. You can do this via the Twilio console or via the Twilio API:

![Twilio webhook setup](assets/twilio-webhook-setup.png)

If you want to test locally, you can expose your web method using a service such as [ngrok](https://ngrok.com/).


### A quick test

With the webhook configured, you should now be able to dial your Twilio number and trigger the `start_bot` URL.

Assuming your webhook is configured correctly, we now need to configure our bot to signal to Twilio when it is ready for the call to be forwarded.


## Configuring your Pipecat bot

Let's take a look at `bot_daily.py` and step through the configuration. First, it's setup to receive additional command line parameters which are passed through to the `DailyTransport` object:

```python
from pipecat.transports.services.daily import DailyParams, DailyTransport, DailyDialinSettings

from twilio.twiml.voice_response import Dial, VoiceResponse, Sip
from twilio.rest import Client

twilio_account_sid = os.getenv('TWILIO_ACCOUNT_SID')
twilio_auth_token = os.getenv('TWILIO_AUTH_TOKEN')
twilio = Client(twilio_account_sid, twilio_auth_token)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pipecat Daily Example")
    parser.add_argument("-u", type=str, help="Room URL")
    parser.add_argument("-t", type=str, help="Token")
    parser.add_argument("-i", type=str, help="Call ID")
    parser.add_argument("-s", type=str, help="SIP URI")
    config = parser.parse_args()

    asyncio.run(main(config.u, config.t, config.i, config.d, config.s))

async def main(room_url: str, token: str, callId: str, sipUri: str):
    async with aiohttp.ClientSession() as session:
        diallin_settings = DailyDialinSettings(
            call_id=callId,
            call_domain=None,
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

        @transport.event_handler("on_dialin_ready")
        async def on_dialin_ready(transport, cdata):
            # Update the state of the call to ready and forward it to the sip_uri
            try:
                # The TwiML is updated using Twilio's REST API
                call = twilioclient.calls(call_sid).update(
                    twiml=f'<Response><Dial><Sip>{sip_uri}</Sip></Dial></Response>'\
                )
                # updating the status for our records
                call_data[call_sid]["status"] = "forwarded"
                print(f'call_sid: {call_sid}, caller: {call_data[call_sid]["caller"]}, called: {call_data[call_sid]["called"]}')
                print(f'room_url: {call_data[call_sid]["room_url"]}, sip_uri: {call_data[call_sid]["sip_uri"]}')
            except Exception as e:
                raise Exception(detail=f"Failed to forward call: {str(e)}")
```