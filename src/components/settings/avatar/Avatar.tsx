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
import { AvatarChange } from "./AvatarChange";
import { Menu } from "@/types/Menu";

interface AvatarProps {
  setActiveMenu: (menu: Menu) => void;
}

export const Avatar = ({ setActiveMenu }: AvatarProps) => {
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
                <BreadcrumbPage>Avatar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-l font-semibold tracking-tight">
              Change your avatar
            </p>
            <p className="text-sm text-muted-foreground">
              Update your avatar to personalize your account. This will be displayed across
              the platform. You can do this with your profile picture using Gravatar. If you
              don't have a Gravatar account, you can select one of these default images.
            </p>
            <AvatarChange />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-sm font-semibold tracking-tight">
              Do you want to create a Gravatar account?
            </p>
            <p className="text-sm text-muted-foreground">
              Gravatar is a service that allows you to create a profile picture that will be
              used across the web. If you don't have a Gravatar account, you can create one
              now. It's free and easy to set up.
            </p>
            <p className="text-sm text-muted-foreground">
              You can create your account at{" "}
              <a
                href="https://en.gravatar.com/"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                https://gravatar.com/
              </a>
            </p>
          </div>
        </div>
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
