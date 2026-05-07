# Attachments

`[Shipping with launch]`

> This feature is being built right now and will be in your hands at production launch. The paperclip icon in the chat input does nothing in pre-release builds; that changes for GA.

## What attachments will let you do

You will be able to share files with the agent the same way you share text. Drop a file onto the chat input or click the paperclip and pick one. The file appears as a chip above the input, and when you send your message the agent has access to the file's content.

Supported file types at launch:

- **Screenshots and images** (PNG, JPG, WEBP, GIF). The agent can see what is in the image and answer questions about it.
- **PDFs.** The agent reads the text content. Useful for "summarize this document" or "find the section about X".
- **Word documents** (DOCX). Same as PDFs, but for Word files you receive from collaborators.
- **Spreadsheets** (XLSX, CSV). The agent can scan tabular data and answer questions like "what is the average of column B".
- **Plain text and Markdown** (TXT, MD). Common for notes, briefs, and writing drafts.

## How attachments will work

You attach by either of:

- **Dragging a file onto the chat input.** The cursor area highlights to show it accepts the drop.
- **Clicking the paperclip icon** to the left of the input. A native file picker opens.

Once attached, the file shows as a chip above the input with its name, size, and a small remove button. You can attach more than one file before sending.

When you send, the agent receives both your text and the file content together. The reply uses both.

## Screenshots and images

Images stay out of the main chat flow so the conversation stays lightweight, even when you are sharing a large screenshot. The agent still sees the image content and uses it to answer.

If the agent quotes back something from the image (say, the text in a diagram), it will show up in the chat as normal text or markdown. If the agent generates an image based on what it saw, that image renders inline in the response.

## Costs

Image and document attachments use more tokens than plain text, because the AI provider has to process the file content alongside your message. The cost is added to the message normally and shows up in the Usage dashboard. If you have a CostGuard budget set, the cost counts toward your monthly cap.

## When attachments will not work

A few cases the agent cannot handle today even with attachments:

- **Encrypted PDFs.** If the file is password-protected, you will see a clear error.
- **Scanned PDFs that are images of pages.** The agent can read text-layer PDFs reliably; image-only PDFs require optical character recognition, which is on the roadmap but not in the launch set.
- **Files larger than the model's context window.** A 200-page PDF will not fit into a single message. The agent will warn you and suggest sending the document in chunks.

## Privacy

Attachments are sent to the AI provider you have selected, just like your text messages. They are not uploaded to any Clawless server. If you do not want a particular file leaving your computer, do not attach it.

## Common questions

**Can I attach a folder?** Not directly. For a folder of files, point the Local Helper agent at the folder; it can read and summarize across files without you attaching each one. See [agents-and-overview.md](agents-and-overview.md).

**Can I attach a file in one message and ask follow-up questions in later messages?** Yes. Once an attachment is in the conversation, the agent has it for the rest of that session. You do not need to re-attach it.

**Can the agent generate or edit a Word document or PDF for me?** It can produce the text content, but the launch set does not include "save this to a Word file on disk". You can copy the result and paste it into the document yourself. We are looking at file-write export as a post-launch addition.
