import { Loader2 } from "lucide-react";
import { Button } from "./button";

interface LoaderButtonProps {
  content?: string;
  className?: string;
}

export const LoaderButton = ({
  content = "Please wait...",
  className,
}: LoaderButtonProps) => {
  return (
    <Button
      disabled
      className={className}
    >
      <Loader2 className="animate-spin" />
      {content}
    </Button>
  );
};
