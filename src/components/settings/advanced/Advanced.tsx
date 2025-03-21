import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Trash2Icon, UserRoundXIcon } from "lucide-react";
import { useFinances } from "@/context/FinanceContext";
import { DeleteFinances } from "./DeleteFinances";
import { Button } from "@/components/ui/button";
import { DeleteAccount } from "./DeleteAccount";
import { MENU_DATA } from "@/constants/menus";
import { Menu } from "@/types/Menu";
import { useState } from "react";

interface AdvancedProps {
  setActiveMenu: (menu: Menu) => void;
}

export const Advanced = ({ setActiveMenu }: AdvancedProps) => {
  const [showDeleteFinances, setShowDeleteFinances] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const { finances } = useFinances();

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
                <BreadcrumbPage>Advanced</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-l font-semibold tracking-tight">
              Delete all finances
            </p>
            <p className="text-sm text-muted-foreground">
              Deleting all finances will result in the loss of all finance data. This action
              cannot be undone. Strongly recommend downloading a backup of your notes prior
              to proceeding.
            </p>
          </div>
          <div className="flex items-center gap-2 m-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowDeleteFinances(true)}
              disabled={finances.length === 0}
            >
              <Trash2Icon />
            </Button>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-l font-semibold tracking-tight">
              Delete your account
            </p>
            <p className="text-sm text-muted-foreground">
              Deleting your account will result in the loss of all account data and prevent
              login with the same email address for 14 days. To re-register during this time,
              please contact support. Strongly recommend downloading a backup of your notes
              prior to proceeding.
            </p>
          </div>
          <div className="flex items-center gap-2 m-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowDeleteAccount(true)}
            >
              <UserRoundXIcon />
            </Button>
          </div>
        </div>
      </div>

      {showDeleteFinances && (
        <DeleteFinances
          open={showDeleteFinances}
          onOpenChange={() => setShowDeleteFinances(!showDeleteFinances)}
        />
      )}

      {showDeleteAccount && (
        <DeleteAccount
          open={showDeleteAccount}
          onOpenChange={() => setShowDeleteAccount(!showDeleteAccount)}
        />
      )}

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
