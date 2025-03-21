import { getUserLanguage, updateUserLanguage } from "@/services/profileService";
import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSession } from "./SessionContext";

interface LanguageContextProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "",
  setLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>("en");

  const { i18n } = useTranslation();
  const { session } = useSession();

  useEffect(() => {
    const fetchLanguage = async () => {
      if (!session?.user.id) {
        return;
      }

      const { data, error } = await getUserLanguage(session.user.id);

      if (error) {
        console.error("Error fetching user language:", error);
        return;
      }

      setLanguage(data?.[0]?.language_code || "en");
    };

    if (session) {
      fetchLanguage();
    }
  }, [session]);

  useEffect(() => {
    if (!session?.user.id) {
      return;
    }

    if (language) {
      updateUserLanguage(session.user.id, language);
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
};
