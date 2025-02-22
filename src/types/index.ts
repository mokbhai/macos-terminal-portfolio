export interface MenuItemType {
  label: string;
  children: (string | null)[];
}

export interface DockItemType {
  name: string;
  icon: string;
  type: "iframe" | "link";
  link?: string;
}

export interface WallpaperType {
  name: string;
  url: string;
}

export interface ThemeType {
  name: string;
  thumbnail: string;
  attr: string;
}
