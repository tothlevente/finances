import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { LoaderButton } from "../ui/loader-button";
import { EmailInput } from "../ui/email-input";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "@/types/Routes";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { toast } from "sonner";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot password</CardTitle>
              <CardDescription>
                Enter your email below to receive a password reset link.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword}>
                <div className="flex flex-col gap-6">
                  <EmailInput
                    email={email}
                    setEmail={setEmail}
                    autoComplete="email"
                    loading={loading}
                  />
                  {loading ? (
                    <LoaderButton className="w-full" />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!email}
                    >
                      Receive a reset password
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="mt-4 text-center justify-center text-sm w-full">
                <Link
                  to={loading ? "#" : ROUTES.HOME}
                  className={`text-blue-500 ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={(e) => loading && e.preventDefault()}
                >
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
