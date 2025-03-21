import { createContext, useContext, useState } from "react";
import { Category } from "@/types/Category";

interface CategoryContextProps {
  category: Category[];
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const CategoryContext = createContext<CategoryContextProps>({
  category: [],
  setCategory: () => {},
});

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [category, setCategory] = useState<Category[]>([]);

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error("useCategory must be used within an CategoryProvider");
  }

  return context;
};
