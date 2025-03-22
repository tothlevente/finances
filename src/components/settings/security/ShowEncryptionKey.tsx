import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

import { useSession } from "@/context/SessionContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";

interface ShowEncryptionKeyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ShowEncryptionKey = ({ open, onOpenChange }: ShowEncryptionKeyProps) => {
  const { session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Encryption key</DialogTitle>
          <DialogDescription>
            If you want to downlod your data, you will need your encryption key. If you lose
            this key, you will not be able to access your data. Please store this key in a
            safe place. Do not share this key with anyone. With this key and your courrent
            password, you can decrypt your data. This is your encryption key:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label
                  htmlFor="link"
                  className="sr-only"
                >
                  Link
                </Label>
                <Input
                  id="link"
                  defaultValue={session.user?.id}
                  readOnly
                />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={() => navigator.clipboard.writeText(session.user?.id || "")}
              >
                <span className="sr-only">Copy</span>
                <CopyIcon />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(!open)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
