import { Loader2Icon } from "lucide-react";

interface LoaderProps {
  context?: string;
}

export const LoaderAnimateSpin = ({ context = "Loading..." }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 mt-[20%]">
      <Loader2Icon className="animate-spin" />
      <p>{context}</p>
    </div>
  );
};
