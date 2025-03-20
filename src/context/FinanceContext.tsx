import { createContext, useContext, useState } from "react";
import { Finance } from "@/types/Finance";

interface FinancesContextType {
  finances: Finance[];
  setFinances: React.Dispatch<React.SetStateAction<Finance[]>>;
}

const FinancesContext = createContext<FinancesContextType | undefined>(undefined);

export const FinancesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [finances, setFinances] = useState<Finance[]>([]);

  return (
    <FinancesContext.Provider value={{ finances, setFinances }}>
      {children}
    </FinancesContext.Provider>
  );
};

export const useFinances = (): FinancesContextType => {
  const context = useContext(FinancesContext);

  if (!context) {
    throw new Error("useFinances must be used within a FinancesProvider");
  }
  return context;
};
