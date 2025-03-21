import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

import { PasswordInput } from "@/components/ui/password-input";
import { validatePassword } from "@/utils/passwordValidation";
import { LoaderButton } from "@/components/ui/loader-button";
import { updatePassword } from "@/services/authService";
import { useSession } from "@/context/SessionContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/Routes";
import { useState } from "react";
import { toast } from "sonner";

interface ChangePasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangePassword = ({ open, onOpenChange }: ChangePasswordProps) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const { session } = useSession();

  const navigate = useNavigate();

  const handleChangeEmail = async () => {
    setLoading(true);

    if (!validatePassword(newPassword, confirmPassword)) {
      setLoading(false);
      return;
    }

    if (session) {
      const { error } = await updatePassword(newPassword);

      if (error) {
        setLoading(false);
        toast.error("An error occurred while updating your password.", {
          description: error.message,
        });
      } else {
        setLoading(false);
        onOpenChange(false);
        navigate(ROUTES.HOME);
        toast.success("Your password has been updated successfully.", {
          description: "Please log in with your new password.",
        });
      }
    } else {
      setLoading(false);
      toast.error("You need to be logged in to change your password.", {
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
          <DialogTitle>Change your password</DialogTitle>
          <DialogDescription>
            Update the password associated with your account. This will be used for
            authentication and account security. Strongly recommend using a unique and secure
            password. You need to verify the new password to complete the process.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <PasswordInput
              id="password"
              label="Current password"
              password={password}
              setPassword={setPassword}
              autoComplete="current-password"
              loading={loading}
            />
          </div>
          <div className="grid gap-2">
            <PasswordInput
              id="new-password"
              label="New password"
              password={newPassword}
              setPassword={setNewPassword}
              autoComplete="new-password"
              loading={loading}
            />
          </div>
          <div className="grid gap-2">
            <PasswordInput
              id="confirm-password"
              label="Confirm new password"
              password={confirmPassword}
              setPassword={setConfirmPassword}
              autoComplete="new-password"
              loading={loading}
            />
          </div>
        </div>
        <DialogFooter>
          {loading ? (
            <LoaderButton />
          ) : (
            <Button
              variant="default"
              onClick={handleChangeEmail}
              disabled={!password || !newPassword || !confirmPassword}
            >
              Change password
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(!open)}
            disabled={loading}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
