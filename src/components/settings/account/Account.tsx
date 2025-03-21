import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { MENU_DATA } from "@/constants/menus";
import { Menu } from "@/types/Menu";

interface AccountProps {
  setActiveMenu: (menu: Menu) => void;
}

export const Account = ({ setActiveMenu }: AccountProps) => {
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
                <BreadcrumbPage>Account</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-l font-semibold tracking-tight">
              Account settings
            </p>
            <p className="text-sm text-muted-foreground">
              Manage your account settings, including email and password changes, and your
              profile settings, such as name and avatar. For more information about specific
              settings or download options, click the links below or use a navigation menu.
            </p>
            <div className="flex flex-col items-start m-3">
              {MENU_DATA.map((value, index) => {
                if (index != 0) {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex items-center m-2 p-5"
                        onClick={() => setActiveMenu(value.key as Menu)}
                      >
                        <value.icon />
                      </Button>
                      <span className="text-sm">{value.label}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
