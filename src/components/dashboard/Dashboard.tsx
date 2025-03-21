import { useFinances } from "@/context/FinanceContext";

export const Dashboard = () => {
  const { finances } = useFinances();

  if (finances.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg font-semibold">
          No finances added yet. Add a new finance to get started.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          You can add a new finance by clicking on the "Add finance" button in the sidebar.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-2">
          Once you've added a finance, it will appear here on the dashboard.
        </p>
      </div>
    );
  }

  return <div>Dashboard</div>;
};
