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
  "Tell me about your IoT projects",
  "What are your full-stack skills?",
  "Tell me about your work at Innovation Studio",
  "What technologies do you use?",
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
Role: Software Developer & IoT Engineer
Education: BTech Computer Science, LPU (2022-2026)

Contact: mokshitjain18@gmail.com
Phone: +91-7000209021
GitHub: github.com/mokbhai
LinkedIn: linkedin.com/in/mokshit-jain
Website: mokshitjain.netlify.app

Ask me anything about my software development, IoT projects, or technical expertise!
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
- GPA: 7.61/10
- I'm based in Punjab, India
- I'm a Software Developer & IoT Engineer specializing in full-stack and IoT development
- Contact: mokshitjain18@gmail.com, +91-7000209021

Experience:
- Developer at Innovation Studio & Ministry of Defense (Nov 2024 - Jan 2025)
  * Built vehicle management system processing 10,000+ daily movements
  * Improved efficiency by 85% through automation
- Project Lead at Innovation Studio (June 2024 - Aug 2024)
  * Led MERN-stack event platform development
  * Generated ₹1.5 lakh revenue through automation

Notable Projects:
- Thrombocizer: IoT control platform managing 10,000+ devices
- Hireza: AI-powered job matching platform with 90% accuracy
- SwiftAid: Emergency response platform with real-time tracking

Achievements:
- 1st place in CipherThon hackathon (Hireza project)
- Finalist in Medha 2024 Hackathon (Thrombocizer)
- Delivered multiple full-stack applications with real-time capabilities

Technical Skills:
- Core: TypeScript, JavaScript, C++, Node.js, Git, Docker
- Frontend: Next.js, React.js, Astro.js, TailwindCSS
- Backend: Nest.js, Express.js, MongoDB, PostgreSQL
- IoT: ESP32, Arduino, ESP8266
- DevOps: Git, Docker, AWS
- Other: Python, C#, Redis, Server Management

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
