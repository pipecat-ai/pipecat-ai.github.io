# ImageGenService (Image Generation)

There are several different image generation services available in Pipecat. Fundamentally, they all do the same thing:

**Input:** A `TextFrame` with a description of the image to generate.

**Output:** A `URLImageFrame` containing the URL of the generated image, as well as the raw image data itself, which can be sent to a transport to be displayed to the user.
