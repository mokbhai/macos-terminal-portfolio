import { useState } from "react";
import { BsGithub, BsSpotify, BsTerminal, BsLinkedin } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { VscVscode } from "react-icons/vsc";
import { RiTerminalFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa6";
import { useMotionValue } from "framer-motion";
import { DockIcon } from "./DockIcon";

export default function DesktopDock() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const mouseX = useMotionValue(Infinity);

  const handleEmailClick = () => {
    window.location.href = "mailto:mokshitjain18@gmail.com";
  };

  const handleGithubClick = () => {
    window.open("https://github.com/mokbhai", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/in/mokshit-jain/", "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+917000209021";
  };

  const handleVSCodeClick = () => {
    window.location.href = "vscode:/";
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div className="absolute -top-14 left-1/2 -translate-x-1/2">
      <div className="relative px-3 py-1 bg-[#1d1d1f]/80 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap border border-px border-gray-600">
        {text}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[7px] w-3 h-3 bg-[#1d1d1f]/80 backdrop-blur-sm rotate-45 border-b border-r border-gray-600" />
      </div>
    </div>
  );

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 hidden md:block z-50 font-[Arial] select-none"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <div
        className="
          m-auto mb-2
          flex h-[4rem] items-end
          gap-[6px] px-[10px]
          backdrop-blur-[20px] rounded-[20px]
          shadow-[0_4px_10px_rgba(0,0,0,0.2)]
          bg-black/25
          border border-white/10
          transition-all duration-200
        "
      >
        <div className="flex items-end">
          <DockIcon
            mouseX={mouseX}
            onClick={handleVSCodeClick}
            onMouseEnter={() => setHoveredIcon("vscode")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="w-full h-full bg-white rounded-xl flex items-center justify-center shadow-lg">
              <VscVscode className="w-full h-full p-1 text-blue-500" />
            </div>
            {hoveredIcon === "vscode" && <Tooltip text="Launch VS Code" />}
          </DockIcon>

          {/* Email */}
          <DockIcon
            mouseX={mouseX}
            onClick={handleEmailClick}
            onMouseEnter={() => setHoveredIcon("email")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="w-full h-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg">
              <IoIosMail className="w-full h-full p-1 text-white" />
            </div>
            {hoveredIcon === "email" && <Tooltip text="Email Me" />}
          </DockIcon>

          {/* Github */}
          <DockIcon
            mouseX={mouseX}
            onClick={handleGithubClick}
            onMouseEnter={() => setHoveredIcon("github")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="w-full h-full bg-gradient-to-t from-black to-black/60 rounded-xl flex items-center justify-center shadow-lg">
              <BsGithub className="w-full h-full p-1.5 text-gray-100" />
            </div>
            {hoveredIcon === "github" && <Tooltip text="My GitHub" />}
          </DockIcon>

          {/* LinkedIn */}
          <DockIcon
            mouseX={mouseX}
            onClick={handleLinkedInClick}
            onMouseEnter={() => setHoveredIcon("linkedin")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="w-full h-full bg-gradient-to-t from-[#0077B5] to-[#0077B5]/60 rounded-xl flex items-center justify-center shadow-lg">
              <BsLinkedin className="w-full h-full p-1 text-white" />
            </div>
            {hoveredIcon === "linkedin" && <Tooltip text="My LinkedIn" />}
          </DockIcon>

          {/* Phone */}
          <DockIcon
            mouseX={mouseX}
            onClick={handlePhoneClick}
            onMouseEnter={() => setHoveredIcon("phone")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="w-full h-full bg-gradient-to-t from-green-600 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
              <FaPhone className="w-full h-full p-1.5 text-white" />
            </div>
            {hoveredIcon === "phone" && <Tooltip text="Call Me" />}
          </DockIcon>

          {/* Update divider */}
          <div className="w-px h-14 bg-white/10 mx-2" />

          {/* Terminal */}
          <DockIcon
            mouseX={mouseX}
            onMouseEnter={() => setHoveredIcon("terminal")}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-500 rounded-xl"></div>
              <div className="absolute inset-[2px] rounded-xl bg-black">
                <div className="absolute top-1 left-2">
                  <RiTerminalFill className="w-full h-full p-1 text-white" />
                </div>
              </div>
            </div>
            {hoveredIcon === "terminal" && <Tooltip text="Chat with Me" />}
          </DockIcon>
        </div>
      </div>
    </div>
  );
}
