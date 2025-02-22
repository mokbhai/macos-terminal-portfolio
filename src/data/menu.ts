import {
  type DockItemType,
  type MenuItemType,
  type ThemeType,
  type WallpaperType,
} from "../types/index";
// Terminal;
// Shell;
// Edit;
// View;
// Window;
// Help;
export const TopBarMenu: MenuItemType[] = [
  {
    label: `icon`,
    children: [
      "About This Mac",
      null,
      "System Preference...",
      "App Store...",
      null,
      "Recent Items",
      null,
      "Force Quit",
      null,
      "Sleep",
      "Restart...",
      "Shut Down...",
      null,
      "Lock Screen",
      "Log out",
    ],
  },
  {
    label: "Terminal",
    children: [
      "About Terminal",
      null,
      "Settings...",
      "Secure Keyboard Entry",
      "Services",
      null,
      "Hide Terminal",
      "Hide Others",
      "Show All",
      null,
      "Quit Terminal",
    ],
  },
  {
    label: "Shell",
    children: [
      "New Window",
      "New Tab",
      "New Command...",
      "New Remote Connection...",
      "Open...",
      null,
      "Close Window",
      null,
      "Use Settings as Default",
      "Export Settings...",
      null,
      "Export Text As...",
      "Export Selected Text As...",
      null,
      "Show Inspector",
      "Edit Title",
      "Edit Background Color",
      null,
      "Reset",
      "Hard Reset",
      null,
      "Print Selection...",
      "Print...",
    ],
  },
  {
    label: "Edit",
    children: [
      "Undo",
      "Redo",
      null,
      "Cut",
      "Copy",
      "Copy Special",
      null,
      "Paste",
      "Paste Escaped Text",
      null,
      "Paste Selection",
      "Select All",
      "Select Between Marks",
      null,
      "Marks",
      "Bookmarks",
      "Navigate",
      null,
      "Clear to Previous Mark",
      "Clear to Previous Bookmark",
      "Clear to Start",
      null,
      "Clear Scrollback",
      "Clear Screen",
      null,
      "Find",
      null,
      "Show Colors",
      "Use Option as Meta Key",
      "Num Lock",
      null,
      "Writing Tools",
      "AutoFill",
      null,
      "Start Dictation",
      "Emoji & Symbols",
    ],
  },
  {
    label: "View",
    children: [
      "Show All Tabs",
      "Show Tab Bar",
      "Hide Marks",
      null,
      "Show Alternate Screen",
      "Hide Alternate Screen",
      null,
      "Allow Mouse Reporting",
      null,
      "Split Pane",
      "Close Split Pane",
      null,
      "Default Font Size",
      "Bigger",
      "Smaller",
      null,
      "Scroll to Top",
      "Scroll to Bottom",
      null,
      "Page Up",
      "Page Down",
      null,
      "Line Up",
      "Line Down",
      null,
      "Enter Full Screen",
    ],
  },
  {
    label: "Window",
    children: [
      "Minimize",
      "Zoom",
      "Fill",
      "Center",
      null,
      "Move & Resize",
      "Full Screen Tile",
      null,
      "Remove Window from Set",
      "Cycle Through Windows",
      null,
      "Open Window Group",
      "Save Windows as Group...",
      null,
      "Show Previous Tab",
      "Show Next Tab",
      "Move Tab to New Window",
      "Merge All Windows",
      null,
      "Return to Default Size",
      null,
      "Bring All to Front",
    ],
  },
  {
    label: "Help",
    children: [
      null,
      "Terminal Help",
      null,
      "Open man Page for Selection",
      "Search man Page Index for Selection",
    ],
  },
];

export const DockApp: DockItemType[] = [
  {
    name: "Finder",
    icon: "/dock/finder.png",
    type: "iframe",
  },
  {
    name: "Calendar",
    icon: "/dock/calendar.png",
    type: "iframe",
  },
  {
    name: "Vscode",
    icon: "/dock/vscode.png",
    type: "iframe",
  },
  {
    name: "Kindle",
    icon: "/dock/kindle.png",
    type: "iframe",
  },
  {
    name: "Message",
    icon: "/dock/message.png",
    type: "iframe",
  },
  {
    name: "Mail",
    icon: "/dock/mail.png",
    type: "iframe",
  },
  {
    name: "Photos",
    icon: "/dock/photos.png",
    type: "iframe",
  },
  {
    name: "Notion",
    icon: "/dock/notion.png",
    type: "iframe",
  },
  {
    name: "Setting",
    icon: "/dock/setting.png",
    type: "iframe",
  },
  {
    name: "Appstore",
    icon: "/dock/app-store.png",
    type: "iframe",
  },
  {
    name: "Caculator",
    icon: "/dock/caculator.png",
    type: "iframe",
  },
  {
    name: "Instagram",
    icon: "/dock/instagram.png",
    type: "link",
    link: "https://www.instagram.com/aaryarajgorr/",
  },
  {
    name: "Github",
    icon: "/dock/github.png",
    type: "link",
    link: "https://github.com/aarxa",
  },
];

export const wallpapers: WallpaperType[] = [
  {
    name: "Big Sur Light",
    url: "/wallpaper/bigsur-light.jpg",
  },
  {
    name: "Big Sur Dark",
    url: "/wallpaper/bigsur-dark.jpeg",
  },
  {
    name: "Catalina",
    url: "/wallpaper/catalina.jpeg",
  },

  {
    name: "Mojave",
    url: "/wallpaper/mojave.jpeg",
  },

  {
    name: "Sierra",
    url: "/wallpaper/sierra.jpg",
  },
  {
    name: "Yosemite",
    url: "/wallpaper/yosemite.jpg",
  },
];

export const themes: ThemeType[] = [
  {
    name: "Auto",
    thumbnail: "/theme/auto.png",
    attr: "",
  },
  {
    name: "Light",
    thumbnail: "/theme/light.png",
    attr: "light",
  },
  {
    name: "Dark",
    thumbnail: "/theme/dark.png",
    attr: "dark",
  },
];

export const darkBackgroundColor = "rgba(0, 0, 0, 0.4)";
export const lightBackgroundColor = "rgba(255, 255, 255, 0.2)";
export const darkBorderColor = "rgba(255, 255, 255, 0.3)";
export const lightBorderColor = "rgba(227, 227, 227, 0.3)";
export const darkTextColor = "white";
export const lightTextColor = "#1c1c1d";
