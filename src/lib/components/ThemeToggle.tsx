import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToggleTheme } from "~/hooks";

export function ThemeToggle() {
  const { toggleTheme } = useToggleTheme();

  return (
    <Button variant="outline" size="icon" type="button" onClick={toggleTheme}>
      <SunIcon className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
