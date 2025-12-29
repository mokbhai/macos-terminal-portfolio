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
  "What awards have you won?",
  "Tell me about Thrombocizer project",
  "What's your career objective?",
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
Role: Full-stack Developer & Software Engineer
Education: BTech Computer Science, LPU (2022-2026) - CGPA 7.8/10

Contact: mokshitjain18@gmail.com
Phone: +91-7000209021
GitHub: github.com/mokbhai
LinkedIn: linkedin.com/in/mokshit-jain
Bio: mokshit-bio.jainparichay.in

Currently: Software Developer Intern at AIRIA (Apr 2025 - Present)
Building AI agents, SaaS applications, and automation tools

Career Objective:
Resourceful Computer Science student and versatile software developer with a passion 
for technology, product innovation, and emotional wellness. Eager to work directly with 
founders to ideate, research, and develop solutions that drive impact.

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
- CGPA: 7.8/10
- I'm based in Bhawani Mandi, Rajasthan, India (326502)
- I'm a Full-stack developer with strong expertise in React, Node.js, and TypeScript
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
to ideate, research, and develop solutions that drive impact. Adept at collaborating with 
cross-functional teams, conducting research, and applying AI, automation, and data-driven 
approaches to solve real-world problems.

Current Experience:
- Software Developer Intern at AIRIA (Apr 2025 - Present, Remote)
  * Worked closely with product and leadership teams to ideate, develop, and deliver AI-powered solutions
  * Managed client communications, coordinated product demos, and ensured smooth client onboarding and feedback integration
  * Currently developing an advanced UI testing tool that automates browser interactions and website testing, leveraging AI-agents automation and LangGraph workflows
  * Led end-to-end development of a fitness application, integrating both AI agents and user-centred design to improve health and workout outcomes
  * Actively participated in sprint reviews and cross-functional collaboration, ensuring a clear understanding of business needs and user experience

Previous Experience:
- Freelancer at Innovation Studio LPU & Ministry of Defence (Nov 2024 - Jan 2025)
  * Collaborating with stakeholders to define requirements and deliver features ahead of schedule
  * Architectured microservices for vehicle validation, checkpoint logging, and e2e monitoring with optimised Prisma PostgreSQL queries
  * Enhanced system security with Permission Management, Role-Based Access Control (RBAC), and secure session management
  * Demo: https://youtu.be/3xswnyAoGAU

- Project Manager & Software Developer at Innovation Studio & Ministry of Defence (Nov 2024 - Jan 2025)
  * Ensured 100% on-time delivery of project milestones
  * Architected vehicle management system processing 10,000+ daily movements across 100+ checkpoints
  * Reduced processing time from 48 hours to 5 minutes (85% efficiency boost)
  * Enhanced security with MFA, session management, and RBAC

- Project Lead & Full Stack Developer at Innovation Studio (June 2024 - Aug 2024)
  * Led team to generate ₹1.5 lakh revenue through registration system and payment integration
  * Increased registration efficiency by 80%, eliminated 15 hours of weekly manual work
  * Developed WhatsApp bot with 90% response accuracy
  * Achieved 100% approval rating from project stakeholders

Notable Projects:
- AutoTube: AI-Powered Text-to-Video Generator
  * Developed pipeline that converts text into YouTube-ready videos, automating content creation process
  * Integrated multilingual support and natural voiceovers using Python, Google Translate, and Edge TTS
  * YouTube Channel: https://www.youtube.com/@mokbhaimj

- Thrombocizer: Assistive Exercise Device
  * Led technical development for a wellness-focused leg movement device for paralysed patients
  * Developed easy-to-use interfaces and real-time monitoring tools, keeping user well-being at the centre of product design

Technical Skills:
- Programming: JavaScript, Python, Node.js, SQL
- AI/Automation: AI Agents, LangGraph, WhatsApp Bots, OpenAI
- Frameworks: Astro.js, Next.js, Nest.js
- DevOps: Git, Docker, AWS EC2, CI/CD
- Databases: MongoDB, PostgreSQL, ChromaDB, Pinecone
- Product & Cross-functional Skills: Product Ideation & Management, Data-driven Decision Making, Agile Methodologies, Communication, Critical Thinking, Teamwork, Stakeholder Management, User-Centric Design

Awards:
- 1st Runner Up, MEDHA Medical Device Hackathon 2024
- Hack IT Sapiens 2.0 Participant

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
