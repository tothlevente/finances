import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

import { LoaderButton } from "@/components/ui/loader-button";
import { EmailInput } from "@/components/ui/email-input";
import { useSession } from "@/context/SessionContext";
import { updateEmail } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/types/Routes";
import { useState } from "react";
import { toast } from "sonner";

interface ChangeEmailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangeEmail = ({ open, onOpenChange }: ChangeEmailProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useSession();

  const navigate = useNavigate();

  const handleChangeEmail = async () => {
    setIsLoading(true);

    if (session) {
      const { error } = await updateEmail(email);

      if (error) {
        setIsLoading(false);
        toast.error("An error occurred while updating your email address.", {
          description: error.message,
        });
      } else {
        setIsLoading(false);
        onOpenChange(false);
        navigate(ROUTES.HOME);
        toast.success("Your email address has been updated successfully.", {
          description:
            "A verification email has been sent to the new email address. Please click the link to confirm, and then log in.",
        });
      }
    } else {
      setIsLoading(false);
      toast.error("You need to be logged in to change your email address.", {
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
          <DialogTitle>Change your email address</DialogTitle>
          <DialogDescription>
            Update the email address associated with your account. This will be used for
            account recovery and security notifications. Strongly recommend using a unique
            and secure email address. You need to verify the new email address to complete
            the process. A verification email will be sent to the new email address.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <EmailInput
              email={email}
              setEmail={setEmail}
              loading={isLoading}
              placeholder="Enter your new email address"
            />
          </div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <LoaderButton />
          ) : (
            <Button
              variant="default"
              onClick={handleChangeEmail}
              disabled={!email}
            >
              Change email
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
