import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/providers/theme-provider";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <DarkModeSwitch
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            size={30}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>toggle theme</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeSwitcher;
