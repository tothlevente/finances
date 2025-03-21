import {
  UserIcon,
  GlobeIcon,
  ImageIcon,
  ShieldIcon,
  SettingsIcon,
  DownloadIcon,
  PaintbrushIcon,
  SwatchBookIcon,
} from "lucide-react";

/**
 * An array of menu items used in the application.
 * Each menu item contains a key, label, and icon.
 *
 * @constant
 * @type {Array<{ key: string, label: string, icon: React.ComponentType }>}
 *
 * @property {string} key - The unique identifier for the menu item.
 * @property {string} label - The display name of the menu item.
 * @property {React.ComponentType} icon - The icon component associated with the menu item.
 */
export const MENU_DATA = [
  { key: "account", label: "Account", icon: UserIcon },
  { key: "avatar", label: "Avatar", icon: ImageIcon },
  { key: "appearance", label: "Appearance", icon: PaintbrushIcon },
  { key: "categories", label: "Categories", icon: SwatchBookIcon },
  { key: "language", label: "Language and localization", icon: GlobeIcon },
  { key: "download", label: "Download", icon: DownloadIcon },
  { key: "security", label: "Security", icon: ShieldIcon },
  { key: "advanced", label: "Advanced", icon: SettingsIcon },
];
