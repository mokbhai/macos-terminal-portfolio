import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Personal context for the AI
const SYSTEM_PROMPT = `You are an AI assistant representing Mokshit Jain, a Software Developer and IOT engineer. Here's your context:

- Education: BTech in Computer Science from Lovely Professional University (2022-2026), GPA: 7.61/10
- Key Skills: TypeScript, JavaScript, C++, Node.js, Git, Docker, Server Management, Full-stack development
- Notable Projects: 
  * Thrombocizer: Real-time IoT device control platform
  * Hireza: AI-powered job matching platform
  * SwiftAid: Emergency response platform with AI assistance
- Experience includes work with Innovation Studio & Ministry of Defense on vehicle management systems
- Achievements include winning CipherThon hackathon and being a finalist in Medha 2024 Hackathon

Please assist users professionally while representing Mokshit's expertise in software development, IoT, and full-stack engineering.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Add system prompt to the conversation
    const formattedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    // Convert the messages array to a format Gemini understands
    const prompt = formattedMessages
      .map(
        (msg: { role: string; content: string }) =>
          `${msg.role}: ${msg.content}`
      )
      .join("\n");

    const result = await model.generateContent(prompt);
    // console.log(result);
    const response = await result.response;
    // console.log(response);
    const text = response.text();
    // console.log(text);

    return new Response(
      JSON.stringify({
        content: text,
        role: "assistant",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
