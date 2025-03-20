import { toast } from "sonner";

export const validatePassword = (password: string, passwordAgain: string): boolean => {
  if (password !== passwordAgain) {
    toast.error("Passwords do not match.", { description: "Please try again." });
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters long.", {
      description: "Please try again.",
    });
    return false;
  }

  if (password.length > 100) {
    toast.error("Password must be less than 100 characters long.", {
      description: "Please try again.",
    });
    return false;
  }

  return true;
};
