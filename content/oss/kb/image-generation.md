# Image Generation

`[Live]`

## What image generation lets you do

You can ask Clawless to create images, not just describe them. Type a request like "draw me a red cube on a white background" or "make a watercolor logo of a fox" and the agent generates the picture and shows it right inside the chat, below its reply. No separate tool, no copying prompts into another app.

## Two ways to start

- **Ask in plain language.** Just tell the agent what you want: "generate an image of a cozy reading nook at sunset." The agent recognizes the request and creates the image.
- **Use the Image button.** The chat toolbar has an "Image" button. Clicking it drops a ready-made prompt into your message box with the subject highlighted, so you can type what you want and send. This is a fast way to start when you are not sure how to phrase the request.

The generated image appears inline in the conversation, the same place a shared photo would show. You can keep chatting to refine it ("make it warmer", "now in portrait orientation") and the agent generates a new version.

## What you need first

Image generation runs through an image provider, and that provider needs an API key you have added in Settings. Supported providers:

- **OpenAI** (its latest image model)
- **Google** (its Gemini image model)
- **xAI** (Grok image model)
- **fal** (a range of open image models)

When you add a key for one of these, Clawless automatically picks the best available image model for you. You do not have to choose one by hand.

If you have not added an image-capable key yet, the agent will let you know it needs an image provider configured before it can generate. Adding a key in Settings under API Keys is all it takes.

A note on accounts: a ChatGPT subscription connected through OpenAI sign-in covers chat, but image generation bills through a standard OpenAI API key. If you want to generate images with OpenAI, add an OpenAI API key in Settings.

## What happens to your prompt and the image

Your image request is sent to the provider you configured, the same way any chat message goes to your chat provider. The provider creates the image and sends it back, and Clawless shows it in the conversation. Clawless does not keep a separate copy of generated images outside your conversation. The image is part of that chat, and travels with it.

## Cost

Each image is a paid request on your provider account, priced per image rather than per word. Generating several variations adds up the same way several chat replies would. Your usage dashboard and cost controls apply, so you can keep an eye on spend.

## Good to know

- Image content follows your provider's content rules. If a provider declines a request, that decision comes from the provider, not from Clawless.
- Generation takes a few seconds. The agent shows it is working, then the image appears when it is ready.
- You can ask for a specific style, size, or look in plain language, for example "square", "photorealistic", "transparent background", or "in the style of a vintage poster".
