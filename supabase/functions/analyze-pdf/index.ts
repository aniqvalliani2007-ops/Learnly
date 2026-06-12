import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

Deno.serve(async (req) => {
  try {
    const { uploadId } = await req.json();

    // Get PDF text from storage or database
    // For now, this is a placeholder

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content:
            "Please summarize the following PDF content: [PDF content would go here]",
        },
      ],
    });

    return new Response(JSON.stringify({ summary: message.content[0].text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
});
