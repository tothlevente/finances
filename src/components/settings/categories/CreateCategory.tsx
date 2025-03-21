import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";

import { LoaderButton } from "@/components/ui/loader-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmailInput } from "@/components/ui/email-input";
import { useCategory } from "@/context/CategoryContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CreateCategoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateCategory = ({ open, onOpenChange }: CreateCategoryProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { category, setCategory } = useCategory();

  const handleCreateCategory = async () => {};

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2"></div>
        </div>
        <DialogFooter>
          {isLoading ? (
            <LoaderButton />
          ) : (
            <Button
              variant="default"
              onClick={handleCreateCategory}
            >
              Create category
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
