import { HeaderDropdownMenu } from "./HeaderDropdownMenu";
import { AvatarProvider } from "@/context/AvatarContext";
import { useSession } from "@/context/SessionContext";
import { ModeToggle } from "../theme/ModeToggle";
import { useNavigate } from "react-router-dom";
import { CirclePlusIcon } from "lucide-react";
import { ROUTES } from "@/types/Routes";
import { Button } from "../ui/button";

export const Header = () => {
  const { session } = useSession();

  const navigate = useNavigate();

  return (
    <AvatarProvider>
      <header className="flex items-center justify-between p-3 pb-5">
        <div
          className="flex gap-1.5 "
          onClick={() => navigate(ROUTES.DASHBOARD)}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/favicon.svg"
            alt="Logo"
            className="h-7"
          />
          <h3 className="scroll-m-20 text-2xl font-extrabold tracking-tight">Finances</h3>
        </div>
        <div className="flex flex-col-reverse items-center justify-center gap-1.5 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-2">
            <div className="flex flex-row gap-2">
              {session && (
                <div className="flex flex-row items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(ROUTES.DASHBOARD)}
                  >
                    <CirclePlusIcon />
                  </Button>
                </div>
              )}
              <ModeToggle />
            </div>
          </div>
          {session && <HeaderDropdownMenu />}
        </div>
      </header>
    </AvatarProvider>
  );
};
