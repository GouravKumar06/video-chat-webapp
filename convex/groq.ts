// convex/groq.ts
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

const apiKey = process.env.GROQ_API_KEY;

export const chat = action({
  args: {
    messageBody: v.string(),
    conversation: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    if (!apiKey) throw new Error("Missing GROQ_API_KEY");

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // or mixtral-8x7b-32768
        messages: [
          {
            role: "system",
            content: "You are a terse bot in a group chat responding to questions with 1-sentence answers",
          },
          {
            role: "user",
            content: args.messageBody,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const messageContent = data.choices?.[0]?.message?.content ?? "No response from Groq";

    await ctx.runMutation(api.messages.sendChatGPTMessage, {
      content: messageContent,
      conversation: args.conversation,
      messageType: "text",
    });
  },
});
