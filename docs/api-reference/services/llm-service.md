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

## Function Calling

Some services, such as OpenAI, support [function calling](https://platform.openai.com/docs/guides/function-calling). You may have heard this or similar approaches also called Retrieval Augmented Generation, or RAG. This enables an LLM to query external services to get more information in response to user input.

A common example case is getting the current weather. At a high level, the process looks like this:

1. As part of the context passed to the LLM, you include a list of functions available to the LLM. In this case, you'd specify a function named `get_current_weather`, which accepts a `location` parameter.
2. The user talks to the LLM as usual, adding `user` and `assistant` messages to the stored context.
3. The user asks a question like "What's the weather going to be in San Diego tomorrow?" The LLM recognizes it needs to use the `get_current_weather` function to answer this question, so instead of returning a response to the user, it returns a `tool_call`, asking to call the `get_current_weather` function with a `location` parameter of `San Diego, CA`.
4. Your app actually calls some kind of `getWeather()` function that talks to an API and gets the weather, and then adds the resulting data to the bot's stored context as a `function_response` message.
5. Your app re-prompts the LLM to generate another completion using the shared context. The LLM sees that the last few messages in the context include a question from the user about the weather, then the generated function call request, then the resulting data. The LLM then generates an actual chat response to the user based on the data returned from the function call.

This flow is fairly complicated, but Pipecat makes it a lot easier to work with by handling the context management and re-prompting for you. You'll still need to define the functions the LLM can use in OpenAI's JSON format. But once you've done that, you can call `register_function` on your `OpenAILLMService` instance to specify a callback for that function. It looks like this:

```python

tools = [
    ChatCompletionToolParam(
        type="function",
        function={
            "name": "get_current_weather",
            "description": "Get the current weather",
            "parameters": {
                (...)
            },
        })]

# (...)

llm = OpenAILLMService(
    api_key=os.getenv("OPENAI_API_KEY"),
    model="gpt-4o")

async def fetch_weather_from_api(llm, args):
    return ({"conditions": "nice", "temperature": "75"})

llm.register_function("get_current_weather", fetch_weather_from_api)
```

The `register_function` function also has a `start_callback` property that accepts a different callback function to call when the LLM first receives a function name. Sometimes it can take a bit of time for the LLM to stream the full function call body back, so this hook is a convenient place to put a small 'ding' sound effect indicating the LLM is 'working', or a short text response like "let me think" that will get converted to speech later. Pipecat ignores anything returned from the `start_callback`. There are several examples of start callbacks in the patient-intake example.

Your callback also receives an `llm` parameter, which is the llm instance inside the running pipeline. You can use that to call `llm.process_frame` to re-prompt it yourself. You can also do other things, like calling `llm.push_frame(AudioRawFrame())` to play a sound effect. (The LLM service will just push that frame to the next processor down the pipeline, but it's the only 'hook' you have into the pipeline from inside the callback.)

By specifying a callback like this, Pipecat will handle everything for you. If the user asks for the weather and the LLM requests to call the `get_current_weather` function, Pipecat will call your callback with the parameters from the LLM, format the return data correctly for the context, and re-prompt the LLM to generate a chat response. You can see this in action in the foundational example `14-function-calling.py`.

### Function callback return types

You can return three types of data from your callback to control how Pipecat behaves.

If you return a `dict` like in the example above, Pipecat will presume it's the data for the requested function call. It will append the function call request and result to the shared context object, and re-prompt the LLM for a chat response. This is almost always what you want. See `foundational/14-function-calling.py` to see this in action.

If you return a `list` containing `dict`s that look like LLM messages array entries (containing `role` and `content` properties), Pipecat will insert those into the shared context _instead_ of the function call and response, and then re-prompt the LLM. This can be useful if you're changing what functions are available to the LLM throughout the conversation. See `patient-intake/bot.py`, specifically the `verify_birthday` function, to see this in use.

Finally, if you return `None` from your callback, Pipecat won't do anything. It won't add anything to the context, and it won't re-prompt for you. You can do some or all of those things inside the callback directly if you want. Take a look at the `save-data` callback in patient-intake to see how this works.

## LLM Context

LLM services do not keep their own history. It's up to you to build your own `messages` object to pass into the LLM service as a `OpenAILLMContextFrame` or `LLMMessagesFrame`. Fortunately, there are other tools in the framework to help with this. Take a look at [the Aggregators section of the Utilities docs](utilities#aggregators) to learn more.
