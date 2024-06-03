# Overview

You can dialin to your Pipecat bots, and have them dialout too, across both PSTN and SIP. The technical implementation will depend on your chosen transport and phone number vendor; each will likely have their own methods and events to consider.

As we covered in deployment, Pipecat supports multiple different types of transport: local, websockets, webrtc etc. Given the end-user will very likely be using a mobile device with varying network conditions, we strongly recommend using a WebRTC transport for production-ready experiences. Another advantage of using a WebRTC provider is that they will very likely abstract some of the complexity for handling PSTN and SIP, such as forwarding calls etc.

**Please note: you can configure your Pipecat bots to handle multiple vendors, so you can, for example, use both Daily and Twilio as phone number vendors concurrently.**

## What are PSTN and SIP? What are the differences?

PSTN is an abbreviation for traditional phone networks, consisting of the physical phone lines, cables and transmission links. One of the main differences to consider between these two forms of telephony is PSTN operates on a one user per line basis while SIP can have multiple users per line. 

Depending on your use-case, you may or may not want to have a single phone number that routes users to a specific bot session, something we'll cover in the following guides.

