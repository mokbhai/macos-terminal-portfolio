import { useState, useEffect, useRef } from "react";
import { TopBarMenu } from "../../data/menu";

export default function MacToolbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label);
  };

  const MenuDropdown = ({ items }: { items: (string | null)[] }) => (
    <div className="absolute top-full left-0 mt-1 bg-[#1d1d1f]/80 backdrop-blur-md rounded-lg shadow-xl border border-gray-700/50 py-1 min-w-[300px]">
      {items.map((item, index) =>
        item === null ? (
          <div key={index} className="h-px bg-gray-700/50 my-1" />
        ) : (
          <button
            key={index}
            className="w-full px-4 py-1 text-left text-sm text-white/90 hover:bg-blue-500"
          >
            {item}
          </button>
        )
      )}
    </div>
  );

  return (
    <div
      ref={menuRef}
      className="fixed top-0 left-0 right-0 h-7 bg-[#1d1d1f]/80 backdrop-blur-md z-50 flex items-center px-4 text-white/90"
    >
      <div className="flex items-center space-x-4">
        {TopBarMenu.map(({ label, children }) => (
          <div key={label} className="relative">
            <button
              onClick={() => handleMenuClick(label)}
              className={`px-2 text-sm hover:bg-white/10 rounded ${
                activeMenu === label ? "bg-white/10" : ""
              }`}
            >
              {label === "icon" ? "🍎" : label}
            </button>
            {activeMenu === label && <MenuDropdown items={children} />}
          </div>
        ))}
      </div>
    </div>
  );
}
