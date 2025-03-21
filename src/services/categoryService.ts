import { supabase } from "@/supabase/supabaseClient";
import { Category } from "@/types/Category";

/**
 * Retrieves the categories associated with a specific user from the database.
 *
 * @param id - The unique identifier of the user whose categories are to be fetched.
 * @returns An object containing:
 * - `data`: An array of category objects with the following fields:
 *   - `id`: The unique identifier of the category.
 *   - `name`: The name of the category.
 *   - `icon`: The icon associated with the category.
 *   - `color`: The color associated with the category.
 *   - `description`: A description of the category.
 *   - `created_at`: The timestamp when the category was created.
 * - `error`: Any error that occurred during the fetch operation.
 */
export const getUserCategories = async (user_id: string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, icon, color, description, created_at")
    .eq("user_id", user_id);

  return { data, error };
};

/**
 * Retrieves a user-specific category from the "categories" table.
 *
 * @param id - The unique identifier of the category to retrieve.
 * @param user_id - The unique identifier of the user to whom the category belongs.
 * @returns An object containing the retrieved category data or an error, if any.
 */
export const getUserCategory = async (id: string, user_id: string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, icon, color, description, created_at")
    .eq("id", id)
    .eq("user_id", user_id);

  return { data, error };
};

/**
 * Creates a new user category by inserting it into the "categories" table.
 *
 * @param category - The category object to be inserted into the database.
 * @returns An object containing the `data` from the insertion operation or an `error` if the operation fails.
 */
export const createUserCategory = async (category: Category) => {
  const { data, error } = await supabase.from("categories").insert([category]);

  return { data, error };
};

/**
 * Updates a user category in the "categories" table.
 *
 * @param category - The category object containing the updated data.
 *                    Must include the `id` property to identify the record to update.
 * @returns An object containing:
 *          - `data`: The updated category data, if the operation was successful.
 *          - `error`: An error object, if the operation failed.
 */
export const updateUserCategory = async (category: Category) => {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", category.id);

  return { data, error };
};

/**
 * Deletes a user category from the "categories" table in the database.
 *
 * @param category_id - The unique identifier of the category to be deleted.
 * @returns An object containing the `data` and `error` properties:
 * - `data`: The result of the deletion operation, if successful.
 * - `error`: An error object, if the deletion operation fails.
 */
export const deleteUserCategory = async (category_id: string) => {
  const { data, error } = await supabase.from("categories").delete().eq("id", category_id);

  return { data, error };
};

/**
 * Deletes all categories associated with a specific user from the "categories" table.
 *
 * @param user_id - The unique identifier of the user whose categories are to be deleted.
 * @returns An object containing:
 *   - `data`: The data returned from the deletion operation, if successful.
 *   - `error`: An error object, if the operation fails.
 */
export const deleteUserAllCategories = async (user_id: string) => {
  const { data, error } = await supabase.from("categories").delete().eq("user_id", user_id);

  return { data, error };
};
