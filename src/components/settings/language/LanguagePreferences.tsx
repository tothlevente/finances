import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

import { CircleDotIcon, CircleIcon, LanguagesIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGES } from "@/constants/languages";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const LanguagePreferences = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-2 w-fit">
        <p className="scroll-m-20 text-l font-semibold tracking-tight">
          Set your language preference
        </p>
        <p className="text-sm text-muted-foreground">
          Set your language preference using the selector below. You can select from the
          currently available languages. This will change the language of the application.
          This will not affect the language of finances you've already created. This will
          only affect the language of the application interface.
        </p>
      </div>
      <div className="flex items-center gap-2 m-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
            >
              <LanguagesIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-46">
            {LANGUAGES.map((value, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => setLanguage(value.code)}
              >
                {language === value.code ? <CircleDotIcon /> : <CircleIcon />}
                {t(`${value.label}Language`)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
