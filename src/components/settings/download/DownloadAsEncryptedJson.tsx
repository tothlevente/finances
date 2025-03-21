import { encryptText } from "@/services/cryptoService";
import { useFinances } from "@/context/FinanceContext";
import { useSession } from "@/context/SessionContext";
import { Button } from "@/components/ui/button";
import { FileKey2Icon } from "lucide-react";
import { toast } from "sonner";
import { Finance } from "@/types/Finance";
import { downloadFinanceAsJson } from "@/services/downloadService";

export const DownloadAsEncryptedJson = () => {
  const { finances } = useFinances();
  const { session } = useSession();

  const handleDownload = () => {
    if (session) {
      const userId = session.user.id;

      finances.forEach((finance: Finance) => {
        finance.name = encryptText(finance.name, userId);
        finance.date = encryptText(finance.date, userId);
        finance.amount = encryptText(finance.amount.toString(), userId);
        finance.categories_id = finance.categories_id.map((id) => encryptText(id, userId));
        finance.color = encryptText(finance.color, userId);
        finance.description = encryptText(finance.description, userId);
        finance.updated_at = encryptText(finance.updated_at, userId);
        finance.created_at = encryptText(finance.created_at, userId);
      });

      downloadFinanceAsJson(finances);
    } else {
      toast.error("You must be logged in to download finances.", {
        description: "Please login to download finances.",
      });
    }
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-2 w-fit">
        <p className="scroll-m-20 text-l font-semibold tracking-tight">
          Download finances as encrypted JSON file
        </p>
        <p className="text-sm text-muted-foreground">
          Decryption is required for importing into alternative note management platforms.
          This format offers secure data transfer while maintaining compatibility. The file
          will contain all your finances in an encrypted JSON format.
        </p>
      </div>
      <div className="flex items-center gap-2 m-2">
        <Button
          size="icon"
          variant="outline"
          disabled={finances.length === 0}
          onClick={() => handleDownload()}
        >
          <FileKey2Icon />
        </Button>
      </div>
    </div>
  );
};
