import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Appearance } from "./appearance/Appearance";
import { Download } from "./download/Download";
import { Security } from "./security/Security";
import { Language } from "./language/Language";
import { Advanced } from "./advanced/Advanced";
import { MENU_DATA } from "@/constants/menus";
import { Account } from "./account/Account";
import { Avatar } from "./avatar/Avatar";
import { Menu } from "@/types/Menu";
import { useState } from "react";

interface SettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Settings = ({ open, onOpenChange }: SettingsProps) => {
  const [activeMenu, setActiveMenu] = useState<Menu>("account");

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your preferences. Adjust appearance, select your preferred language, manage
          download preferences, and access advanced settings for profile and data control.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar
            collapsible="none"
            className="hidden md:flex"
          >
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {MENU_DATA.map(
                      (item) =>
                        item.icon && (
                          <SidebarMenuItem key={item.key}>
                            <SidebarMenuButton asChild>
                              <button
                                onClick={() => setActiveMenu(item.key as Menu)}
                                className="flex items-center"
                              >
                                <item.icon />
                                <span>{item.label}</span>
                              </button>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                    )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 p-4">
            {activeMenu === "account" && <Account setActiveMenu={setActiveMenu} />}
            {activeMenu === "avatar" && <Avatar setActiveMenu={setActiveMenu} />}
            {activeMenu === "security" && <Security setActiveMenu={setActiveMenu} />}
            {activeMenu === "appearance" && <Appearance setActiveMenu={setActiveMenu} />}
            {activeMenu === "language" && <Language setActiveMenu={setActiveMenu} />}
            {activeMenu === "download" && <Download setActiveMenu={setActiveMenu} />}
            {activeMenu === "advanced" && <Advanced setActiveMenu={setActiveMenu} />}
          </main>
        </SidebarProvider>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
