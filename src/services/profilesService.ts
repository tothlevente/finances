import { supabase } from "@/supabase/supabaseClient";

/**
 * A constant key used for storing the selected language preference in local storage.
 * This key is used to retrieve and save the user's language setting in the application.
 */
const languageStorageKey = "vite-ui-language";

export const getAvatar = async (id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("user_id", id);

  return { data, error };
};

export const updateAvatar = async (id: string, avatar_url: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ user_id: id, avatar_url: avatar_url });

  return { data, error };
};

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

export const updateUserLanguage = async (id: string, language: string) => {
  localStorage.setItem(languageStorageKey, language);

  const { data, error } = await supabase
    .from("profiles")
    .upsert({ user_id: id, language_code: language }, { onConflict: "user_id" });

  return { data, error };
};
