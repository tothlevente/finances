import { Category } from "./Category";

export interface Finance {
  id: string;
  name: string;
  date: string;
  amount: number;
  category: Category;
  is_paid: boolean;
  is_recurring: boolean;
  is_expected: boolean;
  color: string;
  description: string;
  created_at: string;
  updated_at: string;
}
