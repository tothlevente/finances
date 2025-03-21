import {
  GlobeIcon,
  ImageIcon,
  PaintbrushIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
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
  { key: "security", label: "Security", icon: ShieldIcon },
  { key: "appearance", label: "Appearance", icon: PaintbrushIcon },
  { key: "language", label: "Language", icon: GlobeIcon },
  { key: "advanced", label: "Advanced", icon: SettingsIcon },
];
