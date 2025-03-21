import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { LanguagePreferences } from "./LanguagePreferences";
import { Button } from "@/components/ui/button";
import { MENU_DATA } from "@/constants/menus";
import { Menu } from "@/types/Menu";

interface LanguageProps {
  setActiveMenu: (menu: Menu) => void;
}

export const Language = ({ setActiveMenu }: LanguageProps) => {
  return (
    <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Language</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <LanguagePreferences />
      </div>
      <div className="mt-auto grid gap-4 p-4 pt-0">
        <Button
          variant="outline"
          className="md:hidden"
          onClick={() => setActiveMenu(MENU_DATA[0].key as Menu)}
        >
          Back to Settings
        </Button>
      </div>
    </main>
  );
};
