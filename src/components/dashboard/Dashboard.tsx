import { useFinances } from "@/context/FinanceContext";

export const Dashboard = () => {
  const { finances } = useFinances();

  if (finances.length === 0) {
    return <div className="flex flex-col items-center justify-center h-full"></div>;
  }

  return <div>Dashboard</div>;
};
