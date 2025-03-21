import { supabase } from "@/supabase/supabaseClient";
import { decryptText } from "./cryptoService";

/**
 * Retrieves the financial records of a user from the "finance" table.
 *
 * @param id - The unique identifier of the user whose financial records are to be fetched.
 * @returns An object containing:
 * - `data`: The retrieved financial records, or `null` if an error occurred.
 * - `error`: An error object if the query failed, or `null` if the query was successful.
 *
 * The selected fields from the "finance" table include:
 * - `id`: The unique identifier of the financial record.
 * - `name`: The name of the financial record.
 * - `description`: A description of the financial record.
 * - `date`: The date associated with the financial record.
 * - `amount`: The monetary amount of the financial record.
 * - `is_paid`: A boolean indicating whether the financial record has been paid.
 * - `is_recurring`: A boolean indicating whether the financial record is recurring.
 * - `is_expected`: A boolean indicating whether the financial record is expected.
 * - `categories_id`: The identifier of the category associated with the financial record.
 * - `updated_at`: The timestamp of the last update to the financial record.
 * - `created_at`: The timestamp of when the financial record was created.
 */
export const getUserFinance = async (id: string) => {
  const { data, error } = await supabase
    .from("finance")
    .select(
      "id, name, description, date, amount, is_paid, is_recurring, is_expected, categories_id, updated_at, created_at"
    )
    .eq("user_id", id);

  if (data) {
    data.forEach((record: any) => {
      record.name = decryptText(record.name, id);
      record.amount = parseFloat(decryptText(record.amount.toString(), id));
      record.description = decryptText(record.description, id);
    });
  }

  return { data, error };
};
