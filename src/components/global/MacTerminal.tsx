import { useState, useEffect, useRef } from "react";
import { FaRegFolderClosed } from "react-icons/fa6";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatHistory = {
  messages: Message[];
  input: string;
};

// Update placeholder messages to be more relevant to your background
const PLACEHOLDER_MESSAGES = [
  "Type your question...",
  "Tell me about your work at AIRIA",
  "What's the Run Application you built?",
  "Tell me about your AI agents projects",
  "How did you automate testing?",
  "What's your experience with vehicle management systems?",
  "Tell me about AutoTube project",
];

export default function MacTerminal() {
  const [chatHistory, setChatHistory] = useState<ChatHistory>({
    messages: [],
    input: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const [placeholder, setPlaceholder] = useState("");
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentMessage = PLACEHOLDER_MESSAGES[currentPlaceholderIndex];

    const animatePlaceholder = () => {
      if (isDeleting) {
        if (placeholder.length === 0) {
          setIsDeleting(false);
          setCurrentPlaceholderIndex(
            (prev) => (prev + 1) % PLACEHOLDER_MESSAGES.length
          );
          timeout = setTimeout(animatePlaceholder, 400);
        } else {
          setPlaceholder((prev) => prev.slice(0, -1));
          timeout = setTimeout(animatePlaceholder, 80);
        }
      } else {
        if (placeholder.length === currentMessage.length) {
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        } else {
          setPlaceholder(currentMessage.slice(0, placeholder.length + 1));
          timeout = setTimeout(animatePlaceholder, 120);
        }
      }
    };

    timeout = setTimeout(animatePlaceholder, 100);

    return () => clearTimeout(timeout);
  }, [placeholder, isDeleting, currentPlaceholderIndex]);

  // Update welcome message with your information
  const welcomeMessage = `Welcome to My Portfolio

Name: Mokshit Jain
Role: Full-stack Developer
Education: BTech Computer Science, LPU (2022-2026) - CGPA 7.7/10

Contact: mokshitjain18@gmail.com
Phone: +91-7000209021
GitHub: github.com/mokbhai
LinkedIn: linkedin.com/in/mokshit-jain

Currently: Software Developer at AIRIA (Apr 2025 - Present)
Building AI agents, SaaS applications, and automation tools

Ask me anything about my software development, AI agents, or technical expertise!
`;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Update system prompt with your personal information
  const systemPrompt = `IMPORTANT: You ARE Mokshit Jain himself. You must always speak in first-person ("I", "my", "me"). Never refer to "Mokshit" in third-person.
CURRENT DATE: ${formattedDate} - Always use this exact date when discussing the current date/year.

Core details about me:
- I'm a BTech Computer Science student at Lovely Professional University (2022-2026)
- CGPA: 7.7/10
- I'm based in India
- I'm a Full-stack developer with strong expertise in React, Node.js, and TypeScript
- Contact: mokshitjain18@gmail.com, +91-7000209021

Current Experience:
- Software Developer at AIRIA (Apr 2025 - Present)
  * Leading end-to-end development of Run Application (React frontend, Node.js backend, AI agents)
  * Built intelligent agents for fitness, running, and nutrition management with contextual user tracking
  * Helping users improve running performance by 10-20% on average
  * Automated API regression testing using GitHub CI/CD
  * Automated UI testing using Custom AI Agents, Chrome extensions and Playwright scripts
  * Reduced manual QA effort by 80%

Previous Experience:
- Project Manager & Software Developer at Innovation Studio & Ministry of Defence (Nov 2024 - Jan 2025)
  * Ensured 100% on-time delivery of project milestones
  * Architected vehicle management system processing 10,000+ daily movements across 100+ checkpoints
  * Reduced processing time from 48 hours to 5 minutes (85% efficiency boost)
  * Enhanced security with MFA, session management, and RBAC
  * Demo: https://youtu.be/3xswnyAoGAU

- Project Lead & Full Stack Developer at Innovation Studio (June 2024 - Aug 2024)
  * Led team to generate ₹1.5 lakh revenue through registration system and payment integration
  * Increased registration efficiency by 80%, eliminated 15 hours of weekly manual work
  * Developed WhatsApp bot with 90% response accuracy
  * Achieved 100% approval rating from project stakeholders

Notable Projects:
- AutoTube: AI-Powered Text-to-Video Content Generator (Mar 2024)
  * Automated content generation pipeline converting text to YouTube-ready videos
  * Reduced manual content creation time by 80%
  * Multi-language support using Google Translate
  * Microsoft Edge TTS integration for natural voice synthesis
  * FFmpeg for automated video assembly
  * Example: https://www.youtube.com/@mokbhaimj

- Thrombocizer: Exercising the Legs for Paralysed Patients (Sep 2024 - Nov 2024)
  * Real-time exercise hardware prototype for patients using ESP32
  * User-friendly web interface with Node.js and Websockets
  * 3D Design: https://youtu.be/9ZLigz-kPJo

Technical Skills:
- Languages: JavaScript, Python, TypeScript
- Full-stack: Node.js, Nest.js, React.js, Next.js, TailwindCSS
- Databases: MongoDB, SQL, Redis, PostgreSQL
- DevOps: Git, Docker, AWS EC2
- Product Management: Strategic Thinking, User-Centric Design, Agile Methodologies
- Soft Skills: Teamwork, Leadership, Time Management, Adaptability, Critical Thinking

Response rules:
1. ALWAYS use first-person (I, me, my)
2. Never say "Mokshit" or refer to myself in third-person
3. Keep responses concise and professional
4. Use markdown formatting when appropriate
5. Maintain a friendly, conversational tone

If a question is unrelated to my work or portfolio, say: "That's outside my area of expertise. Feel free to email me at mokshitjain18@gmail.com or call me at +91-7000209021."`;

  useEffect(() => {
    setChatHistory((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { role: "assistant", content: welcomeMessage },
      ],
    }));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory.messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatHistory((prev) => ({ ...prev, input: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = chatHistory.input.trim();

    if (!userInput) return;

    setChatHistory((prev) => ({
      messages: [...prev.messages, { role: "user", content: userInput }],
      input: "",
    }));

    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...chatHistory.messages,
            { role: "user", content: userInput },
          ],
        }),
      });
      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      setChatHistory((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "assistant", content: data.content },
        ],
      }));
    } catch (error) {
      setChatHistory((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            role: "assistant",
            content:
              "I'm having trouble processing that. Please email me at mokshitjain18@gmail.com",
          },
        ],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-black/75 w-full md:w-[800px] h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg mx-4 sm:mx-0">
      <div className="bg-gray-800 h-6 flex items-center space-x-2 px-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm text-gray-300 flex-grow text-center font-semibold flex items-center justify-center gap-2">
          <FaRegFolderClosed size={14} className="text-gray-300" />
          <span className="hidden sm:inline">mokshitjain.netlify.app</span>
          <span className="sm:hidden">Terminal</span>⸺ zsh
        </span>
      </div>
      <div className="p-2 md:p-4 text-gray-200 font-mono text-xs md:text-sm h-[calc(400px-1.5rem)] md:h-[calc(600px-1.5rem)] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {chatHistory.messages.map((msg, index) => (
            <div key={index} className="mb-2">
              {msg.role === "user" ? (
                <div className="flex items-start space-x-2">
                  <span className="text-green-400">{">"}</span>
                  <pre className="whitespace-pre-wrap break-words max-w-[calc(100vw-4rem)] md:max-w-full">
                    {msg.content}
                  </pre>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap break-words max-w-[calc(100vw-4rem)] md:max-w-full">
                  {msg.content}
                </pre>
              )}
            </div>
          ))}
          {isTyping && <div className="animate-pulse">...</div>}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="mt-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <span className="whitespace-nowrap text-xs md:text-sm">
              mokshit@portfolio %
            </span>
            <input
              type="text"
              value={chatHistory.input}
              onChange={handleInputChange}
              className="w-full sm:flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-xs md:text-sm"
              placeholder={placeholder}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
