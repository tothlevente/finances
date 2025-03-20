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
import { EmailInput } from "../ui/email-input";
import { ROUTES } from "@/types/Routes";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils.ts";
import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {};

  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email and password below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <EmailInput
                    email={email}
                    setEmail={setEmail}
                    autoComplete="email"
                    loading={loading}
                  />
                  <PasswordInput
                    id="current-password"
                    label="Password"
                    password={password}
                    setPassword={setPassword}
                    autoComplete="current-password"
                    loading={loading}
                  />
                  <p className="-mt-3 text-sm text-blue-500">
                    <Link
                      to={loading ? "#" : ROUTES.FORGOT_PASSWORD}
                      className={`text-blue-500 ${
                        loading ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      onClick={(e) => loading && e.preventDefault()}
                    >
                      Forgot your password?
                    </Link>
                  </p>
                  {loading ? (
                    <LoaderButton className="w-full" />
                  ) : (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!email || !password}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="mt-4 text-center justify-center text-sm w-full">
                <p>Don't have an account?</p>
                <p className="text-blue-500">
                  <Link
                    to={loading ? "#" : ROUTES.CREATE_ACCOUNT}
                    className={`text-blue-500 ${
                      loading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={(e) => loading && e.preventDefault()}
                  >
                    Create a free account here
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
