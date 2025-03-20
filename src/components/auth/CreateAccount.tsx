import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { validatePassword } from "@/utils/passwordValidation";
import { createAccount } from "@/services/authService";
import { PasswordInput } from "../ui/password-input";
import { LoaderButton } from "../ui/loader-button";
import { EmailInput } from "../ui/email-input";
import { Link } from "react-router-dom";
import { ROUTES } from "@/types/Routes";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { toast } from "sonner";

export const CreateAccount = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword(password, passwordAgain)) {
      setLoading(false);
      return;
    }

    const { error } = await createAccount(email, password);

    if (error) {
      toast.error(error.message, { description: "Please try again." });
      setLoading(false);
      return;
    }

    toast.success("Account created successfully.", {
      description: "You can now login to your account.",
    });
    setLoading(false);
  };

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create account</CardTitle>
              <CardDescription>
                Enter your email, password and password again below to create your free
                account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAccount}>
                <div className="flex flex-col gap-6">
                  <EmailInput
                    email={email}
                    setEmail={setEmail}
                    autoComplete="email"
                    loading={loading}
                  />
                  <PasswordInput
                    id="password"
                    label="Enter your password"
                    password={password}
                    setPassword={setPassword}
                    autoComplete="new-password"
                    loading={loading}
                  />
                  <PasswordInput
                    id="password-again"
                    label="Enter your password again"
                    password={passwordAgain}
                    setPassword={setPasswordAgain}
                    autoComplete="new-password"
                    loading={loading}
                  />
                  {loading ? (
                    <LoaderButton className="w-full" />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!email || !password || !passwordAgain}
                    >
                      Create account
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="mt-4 text-center justify-center text-sm w-full">
                <p>Already have an account?</p>
                <p className="text-blue-500">
                  <Link
                    to={loading ? "#" : ROUTES.HOME}
                    className={`text-blue-500 ${
                      loading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={(e) => loading && e.preventDefault()}
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
