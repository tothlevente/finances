import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DownloadAsEncryptedJson } from "./DownloadAsEncryptedJson";
import { useFinances } from "@/context/FinanceContext";
import { DownloadAsJson } from "./DownloadAsJson";
import { Button } from "@/components/ui/button";
import { MENU_DATA } from "@/constants/menus";
import { Menu } from "@/types/Menu";
import { AlertCircleIcon } from "lucide-react";

interface DownloadProps {
  setActiveMenu: (menu: Menu) => void;
}

export const Download = ({ setActiveMenu }: DownloadProps) => {
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
                <BreadcrumbPage>Download</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          {finances.length === 0 && (
            <Alert>
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>No finances available</AlertTitle>
              <AlertDescription>
                You need to add at least one finance to download your data.
              </AlertDescription>
            </Alert>
          )}
        </p>
        <DownloadAsJson />
        <hr />
        <DownloadAsEncryptedJson />
        <div className="w-1/5" />
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
