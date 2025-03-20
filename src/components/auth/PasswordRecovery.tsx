import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { PasswordInput } from "../ui/password-input";
import { LoaderButton } from "../ui/loader-button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES } from "@/types/Routes";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";
import { toast } from "sonner";

export const PasswordRecovery = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handlePasswordRecovery = async (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Password recovery</CardTitle>
              <CardDescription>Enter your new password below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordRecovery}>
                <div className="flex flex-col gap-6">
                  <PasswordInput
                    id="password"
                    label="Password"
                    password={password}
                    setPassword={setPassword}
                    autoComplete="new-password"
                    loading={loading}
                  />
                  <PasswordInput
                    id="password-again"
                    label="Password again"
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
                    >
                      Reset password
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Link
                to={loading ? "#" : ROUTES.HOME}
                className={`text-blue-500 ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={(e) => loading && e.preventDefault()}
              >
                Remembered your password? Log in here
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
