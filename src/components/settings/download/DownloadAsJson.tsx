import { downloadFinanceAsJson } from "@/services/downloadService";
import { useFinances } from "@/context/FinanceContext";
import { Button } from "@/components/ui/button";
import { FileJson2Icon } from "lucide-react";

export const DownloadAsJson = () => {
  const { finances } = useFinances();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-2 w-fit">
        <p className="scroll-m-20 text-l font-semibold tracking-tight">
          Download finances as JSON file
        </p>
        <p className="text-sm text-muted-foreground">
          This format facilitates seamless data import into alternative finances management
          applications. The file will contain all your finances in a structured JSON format.
        </p>
      </div>
      <div className="flex items-center gap-2 m-2">
        <Button
          size="icon"
          variant="outline"
          disabled={finances.length === 0}
          onClick={() => downloadFinanceAsJson(finances)}
        >
          <FileJson2Icon />
        </Button>
      </div>
    </div>
  );
};
