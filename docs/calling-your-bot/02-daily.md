# Dialin with Daily

## Example project

We have a complete dialin-ready project using Daily as both a transport and PSTN/SIP provider [here](#) Note: TBC

## Things you'll need

- An active [Daily](daily.co) developer key.
- One or more Daily provisioned number (covered below).

### Do I need to provision my phone numbers through Daily?

You can use Daily solely as a transport if you prefer. This is particularly useful if you already have Twilio-provisioned numbers and workflows. In that case, you can configure Twilio to send some or all of your calls to your Pipecat agents. More details on using Twilio with Daily as a transport can be found [here](#TBC).

If you’re starting from scratch, using everything on one platform offers some convenience. By provisioning your phone numbers through Daily and using Daily as the transport layer, you won’t need to worry about initial call routing, for example.

**The following guide assumes Daily for both WebRTC Transport and as a phone vendor.**

## Configuring your domain

TBC

## Purchasing a phone number

TBC

## Configuring your bot runner

You'll need a HTTP service that can receive incoming call hooks and trigger a new agent session. We discussed the concept of a [bot runner](http://localhost:3000/docs/deploying-your-bot/basic-pattern) in the deployment section, which we'll build on here to add support for dialin.

Within the `start_bot` method, we'll need to grab both `callId` and `callDomain` from the incoming web request:

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
    room: DailyRoomObject = daily_rest_helper.create_room(
        params=params)
except Exception as e:
    raise HTTPException(
        status_code=500,
        detail=f"Unable to provision room {e}")
```