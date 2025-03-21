import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { LoaderAnimateSpin } from "./components/ui/loader-animate-spin";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { CreateAccount } from "./components/auth/CreateAccount";
import { Dashboard } from "./components/dashboard/Dashboard";
import { getUserFinance } from "./services/financeService";
import { useFinances } from "./context/FinanceContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useSession } from "./context/SessionContext";
import { supabase } from "./supabase/supabaseClient";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Login } from "./components/auth/Login";
import { useEffect, useState } from "react";
import { Finance } from "./types/Finance";
import { ROUTES } from "./types/Routes";
import { toast } from "sonner";

export const App = () => {
  const [passwordRecovery, setPasswordRecovery] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { finances, setFinances } = useFinances();
  const { session, setSession } = useSession();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event == "PASSWORD_RECOVERY") {
        setPasswordRecovery(true);
      }
    });
  }, [session]);

  useEffect(() => {
    const fetchFinances = async () => {
      setLoading(true);

      if (session) {
        const { user } = session;
        const { data, error } = await getUserFinance(user.id);

        if (error) {
          toast.error(error.message, { description: "Please try again." });
          setLoading(false);
        } else {
          setFinances(data as Finance[]);
          setLoading(false);
        }
      } else {
        toast.error("You must be logged in to view your notes.", {
          description: "Please log in to view your notes.",
        });
        setLoading(false);
      }
    };

    if (session) {
      fetchFinances();
    }
  }, [session, setFinances]);

  return (
    <Router>
      <ThemeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme"
      >
        <div className="site-wrapper">
          <Header />
          <div className="wrapper">
            <Routes>
              {/* prettier-ignore */}
              <Route path={ROUTES.HOME} element={session ? <Navigate replace to={ROUTES.DASHBOARD} /> : <Login />} />
              {/* prettier-ignore */}
              <Route path={ROUTES.CREATE_ACCOUNT} element={session ? <Navigate replace to={ROUTES.DASHBOARD} /> : <CreateAccount />} />
              {/* prettier-ignore */}
              <Route path={ROUTES.FORGOT_PASSWORD} element={session ? <Navigate replace to={ROUTES.DASHBOARD} /> : <ForgotPassword />} />
              {/* prettier-ignore */}
              <Route path={ROUTES.PASSWORD_RECOVERY} element={passwordRecovery ? <Navigate replace to={ROUTES.FORGOT_PASSWORD} /> : <Navigate replace to={ROUTES.HOME} />} />
              {/* prettier-ignore */}
              <Route path={ROUTES.DASHBOARD} element={session ? (loading ? <LoaderAnimateSpin /> : <Dashboard />) : <Navigate replace to={ROUTES.HOME} />} />
            </Routes>
          </div>
          <Footer />
          <Toaster richColors />
        </div>
      </ThemeProvider>
    </Router>
  );
};
