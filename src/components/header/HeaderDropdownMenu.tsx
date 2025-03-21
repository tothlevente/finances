import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

import {
  LibraryBigIcon,
  LifeBuoyIcon,
  LogOutIcon,
  SendIcon,
  SettingsIcon,
} from "lucide-react";

import { getAvatar } from "@/services/profileService";
import { useSession } from "@/context/SessionContext";
import { useAvatar } from "@/context/AvatarContext";
import { logout } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { HeaderAvatar } from "./HeaderAvatar";
import { useEffect, useState } from "react";
import { ROUTES } from "@/types/Routes";
import { toast } from "sonner";

export const HeaderDropdownMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false);

  const { avatar, setAvatar } = useAvatar();
  const { session } = useSession();

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetAvatar = async () => {
      if (session) {
        const { data, error } = await getAvatar(session.user.id);

        if (data !== null && data.length > 0) {
          setAvatar(data[0].avatar_url);
        }

        if (error) {
          toast.error("An error occurred while fetching the user's avatar.", {
            description: "Please try again.",
          });
        }
      }
    };

    handleGetAvatar();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
      toast.success("You have been logged out.");
    } catch (error) {
      toast.error("An error occurred while logging out.", {
        description: "Please try again.",
      });
    }
  };

  const handleOpenSettingsMenu = () => {
    setOpenMenu(false);
    setOpenSettingsMenu(!openSettingsMenu);
  };

  const handleCloseSettingsMenu = () => {
    setOpenSettingsMenu(false);
  };

  return (
    <>
      <DropdownMenu
        open={openMenu}
        onOpenChange={setOpenMenu}
      >
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2">
            <HeaderAvatar
              user={{
                email: session?.user.email ?? "",
                avatar: avatar,
              }}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">You logged in as:</span>
              <span className="truncate text-xs">{session?.user.email}</span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleOpenSettingsMenu}>
              <SettingsIcon />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LibraryBigIcon />
              Guidebook
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoyIcon />
              Support
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SendIcon />
              Feedback
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
