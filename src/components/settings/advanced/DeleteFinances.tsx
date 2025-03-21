import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

import { deleteUserAllFinances } from "@/services/financeService";
import { LoaderButton } from "@/components/ui/loader-button";
import { useFinances } from "@/context/FinanceContext";
import { useSession } from "@/context/SessionContext";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteFinancesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteFinances = ({ open, onOpenChange }: DeleteFinancesProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setFinances } = useFinances();
  const { session } = useSession();

  const handleDeleteFinances = async () => {
    setIsLoading(true);

    if (session) {
      const { error } = await deleteUserAllFinances(session.user.id);

      if (error) {
        setIsLoading(false);
        toast.error(error.message, { description: "Please try again." });
      } else {
        setFinances([]);
        setIsLoading(false);
        onOpenChange(false);
        toast.success("All finances have been deleted.");
      }
    } else {
      setIsLoading(false);
      toast.error("You need to be logged in to delete your finances.", {
        description: "Please log in and try again.",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle>Are you sure to delete your all finances?</DialogTitle>
          <DialogDescription>
            This action will permanently delete your all finances. It is irreversible and
            cannot be recovered. Strongly recommend downloading a backup of your finances
            prior to proceeding. Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isLoading ? (
            <LoaderButton />
          ) : (
            <Button
              variant="destructive"
              onClick={handleDeleteFinances}
            >
              Delete all finances
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(!open)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
