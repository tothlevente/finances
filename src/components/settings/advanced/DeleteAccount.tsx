import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

import { deleteUserAllFinances } from "@/services/financeService";
import { deleteAccount, logout } from "@/services/authService";
import { LoaderButton } from "@/components/ui/loader-button";
import { useFinances } from "@/context/FinanceContext";
import { useSession } from "@/context/SessionContext";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/Routes";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteAccountProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteAccount = ({ open, onOpenChange }: DeleteAccountProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { setFinances } = useFinances();
  const { session } = useSession();

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    if (session) {
      const { user } = session;
      const { error } = await deleteUserAllFinances(user.id);

      if (error) {
        setIsLoading(false);
        toast.error(error.message, { description: "Please try again." });
      } else {
        setFinances([]);

        const { error } = await deleteAccount(user.id);

        if (error) {
          setIsLoading(false);
          toast.error(error.message, { description: "Please try again." });
        } else {
          await logout();
          setIsLoading(false);
          onOpenChange(false);
          navigate(ROUTES.HOME);
          toast.success("Your account has been deleted.");
        }
      }
    } else {
      setIsLoading(false);
      toast.error("You need to be logged in to delete your account.", {
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
          <DialogTitle>Are you sure to delete your account?</DialogTitle>
          <DialogDescription>
            This action will permanently delete your account. It is irreversible and cannot
            be recovered. Strongly recommend downloading a backup of your data prior to
            proceeding. Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isLoading ? (
            <LoaderButton />
          ) : (
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
            >
              Delete account
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
