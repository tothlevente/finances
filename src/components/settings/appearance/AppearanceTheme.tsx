import { ModeToggle } from "@/components/theme/ModeToggle";

export const AppearanceTheme = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-col gap-2 w-fit">
        <p className="scroll-m-20 text-l font-semibold tracking-tight">
          Change to light or dark mode
        </p>
        <p className="text-sm text-muted-foreground">
          Customize your display by selecting light or dark mode, or enable the application
          to synchronize with your system's theme. This will change the theme of the
          application interface. This will not affect the theme of finances or categories
          you've already created. These settings are also available within the application
          header.
        </p>
      </div>
      <div className="flex items-center gap-2 m-3">
        <ModeToggle />
      </div>
    </div>
  );
};
