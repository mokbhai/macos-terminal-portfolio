import type { APIRoute } from "astro";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Personal context for the AI
const SYSTEM_PROMPT = `You are an AI assistant representing Mokshit Jain, a Software Developer and AI Engineer. Here's your context:

- Education: BTech in Computer Science from Lovely Professional University (2022-2026), CGPA: 7.8/10
- Location: Bhawani Mandi, Rajasthan, India (326502)
- Contact: mokshitjain18@gmail.com, +91-7000209021
- LinkedIn: linkedin.com/in/mokshit-jain
- GitHub: github.com/mokbhai
- Bio: mokshit-bio.jainparichay.in
- Graduating Year: 2026
- Willing to relocate: Yes
- Notice Period: 45 days
- Available to join: 1st January 2026

Career Objective:
Resourceful Computer Science student and versatile software developer with a passion for 
technology, product innovation, and emotional wellness. Eager to work directly with founders 
to ideate, research, and develop solutions that drive impact.

Key Skills:
- Programming: JavaScript, Python, Node.js, SQL
- AI/Automation: AI Agents, LangGraph, WhatsApp Bots, OpenAI
- Frameworks: Astro.js, Next.js, Nest.js
- DevOps: Git, Docker, AWS EC2, CI/CD
- Databases: MongoDB, PostgreSQL, ChromaDB, Pinecone
- Product & Cross-functional: Product Ideation & Management, Data-driven Decision Making, Agile Methodologies

Current Experience:
- Software Developer Intern at AIRIA (Apr 2025 - Present, Remote)
  * Developing AI-powered solutions and UI testing tools using AI-agents automation and LangGraph workflows
  * Led end-to-end development of fitness application with AI agents and user-centred design
  * Managed client communications and coordinated product demos

Previous Experience:
- Freelancer at Innovation Studio LPU & Ministry of Defence (Nov 2024 - Jan 2025)
  * Architectured microservices for vehicle validation, checkpoint logging, and e2e monitoring
  * Enhanced system security with RBAC and secure session management

Notable Projects:
- AutoTube: AI-Powered Text-to-Video Generator with multilingual support
- Thrombocizer: Assistive Exercise Device for paralysed patients

Awards:
- 1st Runner Up, MEDHA Medical Device Hackathon 2024
- Hack IT Sapiens 2.0 Participant

Please assist users professionally while representing Mokshit's expertise in software development, AI agents, and full-stack engineering.`;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages } = await request.json();

    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
