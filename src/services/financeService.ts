import { supabase } from "@/supabase/supabaseClient";
import { decryptText } from "./cryptoService";
import { Finance } from "@/types/Finance";

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
    .from("finances")
    .select(
      "id, name, date, amount, categories_id, is_paid, is_recurring, is_expected, color, description, created_at, updated_at"
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

export const createUserFinance = async (id: string, finance: Finance) => {
  const { data, error } = await supabase.from("finances").insert([
    {
      user_id: id,
      name: finance.name,
      date: finance.date,
      amount: finance.amount,
      categories_id: finance.categories_id,
      is_paid: finance.is_paid,
      is_recurring: finance.is_recurring,
      is_expected: finance.is_expected,
      color: finance.color,
      description: finance.description,
    },
  ]);

  return { data, error };
};

export const updateUserFinance = async (id: string, finance: Finance) => {
  const { data, error } = await supabase
    .from("finances")
    .update({
      name: finance.name,
      date: finance.date,
      amount: finance.amount,
      categories_id: finance.categories_id,
      is_paid: finance.is_paid,
      is_recurring: finance.is_recurring,
      is_expected: finance.is_expected,
      color: finance.color,
      description: finance.description,
    })
    .eq("id", finance.id)
    .eq("user_id", id);

  return { data, error };
};

export const deleteUserFinance = async (id: string, financeId: string) => {
  const { data, error } = await supabase
    .from("finances")
    .delete()
    .eq("id", financeId)
    .eq("user_id", id);

  return { data, error };
};

export const deleteUserAllFinances = async (id: string) => {
  const { data, error } = await supabase.from("finances").delete().eq("user_id", id);

  return { data, error };
};
