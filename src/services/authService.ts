import { supabase } from "@/supabase/supabaseClient";

/**
 * Signs in a user with the provided email and password.
 *
 * @param email - The email address of the user.
 * @param password - The password of the user.
 * @returns An object containing the user data and any error that occurred during sign-in.
 */
export const signInWithEmailAndPassword = async (email: string, password: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { user, error };
};

/**
 * Creates a new user account with the provided email and password.
 *
 * @param email - The email address of the new user.
 * @param password - The password for the new user account.
 * @returns An object containing an error if the sign-up process fails.
 */
export const createAccount = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { error };
};

/**
 * Updates the email address of the currently authenticated user.
 *
 * @param email - The new email address to update to.
 * @returns An object containing an error property, which will be populated if there was an issue updating the email.
 */
export const updateEmail = async (email: string) => {
  const { error } = await supabase.auth.updateUser({ email });

  return { error };
};

/**
 * Sends a password reset email to the specified email address.
 *
 * @param {string} email - The email address to send the password reset email to.
 * @returns {Promise<{ data: any; error: any }>} An object containing the response data and any error that occurred.
 */
export const sendPasswordResetEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  return { data, error };
};

/**
 * Updates the user's password.
 *
 * @param password - The new password to set for the user.
 * @returns An object containing an error if the update fails.
 */
export const updatePassword = async (password: string) => {
  const { error } = await supabase.auth.updateUser({ password: password });

  return { error };
};

/**
 * Logs out the current user by signing them out of the Supabase authentication.
 *
 * @returns {Promise<void>} A promise that resolves when the user has been signed out.
 */
export const logout = async () => {
  await supabase.auth.signOut();
};

/**
 * Marks a user account as deleted in the database.
 *
 * @param userId - The unique identifier of the user whose account is to be deleted.
 * @returns An object containing an error property if the operation fails.
 */
export const deleteAccount = async (userId: string) => {
  const { error } = await supabase
    .from("profiles")
    .update({ is_deleted: true })
    .eq("user_id", userId);

  return { error };
};
