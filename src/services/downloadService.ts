import { Finance } from "@/types/Finance";

/**
 * Downloads an array of finance objects as a JSON file.
 *
 * @param value - An array of `Finance` objects to be downloaded.
 *
 * The function sanitizes the input array by extracting specific properties
 * from each `Finance` object, converts the sanitized data to a JSON string,
 * and triggers a download of the JSON file. The file is named with a
 * timestamp to ensure uniqueness.
 *
 * The following properties are included in the sanitized output:
 * - `id`
 * - `name`
 * - `amount`
 * - `date`
 * - `categories_id`
 * - `color`
 * - `description`
 * - `created_at`
 * - `updated_at`
 *
 * The function creates a temporary anchor element to initiate the download
 * and revokes the object URL after the download is triggered to free up
 * resources.
 */
export const downloadFinanceAsJson = (value: Finance[]): void => {
  const sanitizedFinances = value.map((finance) => ({
    id: finance.id,
    name: finance.name,
    amount: finance.amount,
    date: finance.date,
    categories_id: finance.categories_id,
    color: finance.color,
    description: finance.description,
    created_at: finance.created_at,
    updated_at: finance.updated_at,
  }));

  const json = JSON.stringify(sanitizedFinances, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = `finances_${Date.now()}.json`;
  a.click();

  URL.revokeObjectURL(url);
};
