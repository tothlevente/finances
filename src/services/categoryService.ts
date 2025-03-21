import { supabase } from "@/supabase/supabaseClient";
import { Category } from "@/types/Category";

export const getUserCategories = async (id: string) => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, icon, color, description, created_at")
    .eq("user_id", id);

  return { data, error };
};

export const createCategory = async (category: Category) => {
  const { data, error } = await supabase.from("categories").insert([category]);

  return { data, error };
};

export const updateCategory = async (category: Category) => {
  const { data, error } = await supabase
    .from("categories")
    .update(category)
    .eq("id", category.id);

  return { data, error };
};

export const deleteCategory = async (category_id: string) => {
  const { data, error } = await supabase.from("categories").delete().eq("id", category_id);

  return { data, error };
};

export const deleteAllCategories = async (user_id: string) => {
  const { data, error } = await supabase.from("categories").delete().eq("user_id", user_id);

  return { data, error };
};
