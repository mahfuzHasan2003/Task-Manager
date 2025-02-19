import useAuth from "@/hooks/use-auth";
import { useTheme } from "@/providers/theme-provider";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import UserAvatar from "@/components/my-components/user-avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const { googleSignIn, user, authLoading, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between py-5">
      {/* left side */}
      {/* brand logo */}
      <span className="cursor-pointer font-bold text-xl md:text-2xl">
        <span className="text-primary">Task</span>Manager
      </span>

      {/* right side */}
      <div className="inline-flex items-center gap-2 md:gap-5">
        {/* theme switcher */}
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

        {/* user profile and login logout btn */}
        {user && user?.email ? (
          <span className="inline-flex items-center gap-2 md:gap-5">
            <UserAvatar />
            <Button variant="destructive" onClick={logout}>
              <LogOut /> Log Out
            </Button>
          </span>
        ) : (
          <Button onClick={googleSignIn}>
            <FaGoogle /> Log In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
