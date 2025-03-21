import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { KeyRoundIcon, LockKeyholeIcon, MailIcon } from "lucide-react";
import { ShowEncryptionKey } from "./ShowEncryptionKey";
import { useSession } from "@/context/SessionContext";
import { ChangePassword } from "./ChangePassword";
import { Button } from "@/components/ui/button";
import { MENU_DATA } from "@/constants/menus";
import { ChangeEmail } from "./ChangeEmail";
import { Menu } from "@/types/Menu";
import { useState } from "react";

interface SecurityProps {
  setActiveMenu: (menu: Menu) => void;
}

export const Security = ({ setActiveMenu }: SecurityProps) => {
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEncryptionKey, setShowEncryptionKey] = useState(false);

  const { session } = useSession();

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
                <BreadcrumbPage>Security</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-l font-semibold tracking-tight">
              Change your email address
            </p>
            <p className="text-sm text-muted-foreground">
              Update the email address associated with your account. This will be used for
              account recovery and security notifications.
            </p>
            <p className="text-sm text-muted-foreground">
              Current email: <span className="font-semibold">{session?.user.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 m-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowChangeEmail(true)}
            >
              <MailIcon />
            </Button>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-l font-semibold tracking-tight">
              Change your password
            </p>
            <p className="text-sm text-muted-foreground">
              Update the password associated with your account. This will be used for
              authentication and account security. Strongly recommend using a unique and
              secure password.
            </p>
          </div>
          <div className="flex items-center gap-2 m-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowChangePassword(true)}
            >
              <KeyRoundIcon />
            </Button>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2 w-fit">
            <p className="scroll-m-20 text-l font-semibold tracking-tight">
              Show your encryption key
            </p>
            <p className="text-sm text-muted-foreground">
              If you want to downlod your data, you will need your encryption key. If you
              lose this key, you will not be able to access your data. Please store this key
              in a safe place. Do not share this key with anyone.
            </p>
          </div>
          <div className="flex items-center gap-2 m-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowEncryptionKey(true)}
            >
              <LockKeyholeIcon />
            </Button>
          </div>
        </div>
      </div>

      {showChangeEmail && (
        <ChangeEmail
          open={showChangeEmail}
          onOpenChange={() => setShowChangeEmail(!showChangeEmail)}
        />
      )}

      {showChangePassword && (
        <ChangePassword
          open={showChangePassword}
          onOpenChange={() => setShowChangePassword(!showChangePassword)}
        />
      )}

      {showEncryptionKey && (
        <ShowEncryptionKey
          open={showEncryptionKey}
          onOpenChange={() => setShowEncryptionKey(!showEncryptionKey)}
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
