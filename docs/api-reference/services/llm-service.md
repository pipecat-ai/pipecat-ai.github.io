# LLMService (LLM Completion)

## Frame Types

**Input:** `LLMMessagesFrame`, or `OpenAILLMContextFrame` for OpenAI-compatible LLM services

**Output:** LLM services yield these frames in this order for chat completions:

1. `LLMResponseStartFrame`
2. `TextFrame`s. Some services (like GPT-4) stream responses one word (token) at a time. Others, like Groq, will include the entire response in a single TextFrame.
3. `LLMResponseEndFrame`

If the LLM is completing a function call instead of a chat response, it will yield these frames:

1. `LLMResponseStartFrame`
2. `LLMFunctionStartFrame` with the name of the function being called
3. A single `LLMFunctionCallFrame` with the function name and arguments. Even if the service itself streams responses, the LLMService will aggregate them all together and yield a single `LLMFunctionCallFrame`.
4. `LLMResponseEndFrame`

## Configuration

Each LLM service initializer takes a slightly different parameter set. Some allow you to specify a model. Most require an API key.

Some services, such as OpenAI, support [function calling](https://platform.openai.com/docs/guides/function-calling). Those service will accept `tools` and `tool_choice` in their initializers. Take a look at the `patient-intake` example for a good look at function calling.

## LLM Context

LLM services do not keep their own history. It's up to you to build your own `messages` object to pass into the LLM service as a `OpenAILLMContextFrame` or `LLMMessagesFrame`. Fortunately, there are other tools in the framework to help with this. Take a look at [the Aggregators section of the Utilities docs](utilities#aggregators) to learn more.
