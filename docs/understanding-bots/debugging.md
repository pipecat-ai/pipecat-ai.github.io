---
sidebar_position: 5
---

# Debugging Daily AI apps

Getting your app to work correctly is usually an exercise in visualizing the flow of frames through your pipeline. The framework has some helpful logging for that. If you call `logger.setLevel(logging.DEBUG)` in your app, you'll see an indented display of each frame as it's "between" each service.

