# VisionService (Image Processing and Recognition)

Vision services have two inputs:

1. An image to be analyzed.
2. A prompt to send to the model, such as "Describe this image in one sentence." or "Does this image have any cows in it? Answer only with yes or no."

**Input:** A `VisionImageFrame` containing the image to be described, as well as a `text` property with the prompt to send to the vision model. You can build a `VisionImageFrame` from a `TextFrame` and an `ImageFrame` using the [`VisionImageFrameAggregator`](utilities#visionimageframeaggregator).

**Output:** A `TextFrame` with the description of the image.
