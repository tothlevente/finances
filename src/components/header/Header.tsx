import { ModeToggle } from "../theme/ModeToggle";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/Routes";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4">
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
      <ModeToggle />
    </header>
  );
};
