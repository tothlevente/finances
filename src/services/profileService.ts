import { supabase } from "@/supabase/supabaseClient";

/**
 * A constant key used for storing the selected language preference in local storage.
 * This key is used to retrieve and save the user's language setting in the application.
 */
const languageStorageKey = "vite-ui-language";

/**
 * Retrieves the avatar URL for a user profile based on the provided user ID.
 *
 * @param id - The unique identifier of the user whose avatar URL is to be fetched.
 * @returns An object containing:
 * - `data`: The result of the query, which includes the avatar URL if successful.
 * - `error`: Any error that occurred during the query.
 */
export const getAvatar = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("user_id", id);

  return { data, error };
};

/**
 * Updates the avatar for a user profile.
 *
 * @param id - The unique identifier of the user.
 * @param avatar_url - The URL or path to the new avatar image.
 * @returns An object containing the data and error from the upsert operation.
 */
export const updateAvatar = async (id: string, avatar_url: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ user_id: id, avatar_url: avatar_url });

  return { data, error };
};

/**
 * Retrieves the user's language preference.
 *
 * @param {string} id - The unique identifier of the user.
 * @returns {Promise<{ data: { language_code: string }[] | null, error: string | null }>}
 *          An object containing the user's language preference or an error message.
 *          If the user ID is invalid, returns `{ data: null, error: "Invalid user ID" }`.
 *          If the language is found in local storage, returns `{ data: [{ language_code: localLanguage }], error: null }`.
 *          Otherwise, queries the "profiles" table in the database for the user's language.
 */
export const getUserLanguage = async (id: string) => {
  if (!id) {
    return { data: null, error: "Invalid user ID" };
  }

  const localLanguage = localStorage.getItem(languageStorageKey);

  if (localLanguage) {
    return { data: [{ language: localLanguage }], error: null };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("language_code")
    .eq("user_id", id);

  return { data, error };
};

/**
 * Updates the user's preferred language in both local storage and the database.
 *
 * @param id - The unique identifier of the user.
 * @param language - The language code to set as the user's preferred language.
 * @returns An object containing the `data` and `error` properties from the database operation.
 *
 * The function performs the following steps:
 * 1. Stores the provided language code in the browser's local storage using a predefined key.
 * 2. Updates or inserts the user's language preference in the "profiles" table of the database.
 *    - If a record with the same `user_id` exists, it will be updated.
 *    - If no such record exists, a new one will be inserted.
 */
export const updateUserLanguage = async (id: string, language: string) => {
  localStorage.setItem(languageStorageKey, language);

  const { data, error } = await supabase
    .from("profiles")
    .upsert({ user_id: id, language_code: language }, { onConflict: "user_id" });

  return { data, error };
};
