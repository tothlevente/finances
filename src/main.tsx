import { CategoryProvider } from "./context/CategoryContext";
import { FinancesProvider } from "./context/FinanceContext";
import { SessionProvider } from "./context/SessionContext";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App";

import "./css/index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionProvider>
      <CategoryProvider>
        <FinancesProvider>
          <App />
        </FinancesProvider>
      </CategoryProvider>
    </SessionProvider>
  </StrictMode>
);
