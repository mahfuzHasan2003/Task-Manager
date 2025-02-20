import useAuth from "@/hooks/use-auth";
import UserAvatar from "@/components/my-components/user-avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import ThemeSwitcher from "@/components/my-components/theme-switcher";

const NavBar = () => {
  const { googleSignIn, user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between py-5">
      <span className="cursor-pointer font-bold text-xl md:text-2xl">
        <span className="text-primary">Task</span>Manager
      </span>

      <div className="inline-flex items-center gap-2 md:gap-5">
        <ThemeSwitcher />
        {user ? (
          <span className="inline-flex items-center gap-2 md:gap-5">
            <UserAvatar />
            <Button variant="destructive" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </span>
        ) : (
          <Button onClick={googleSignIn}>
            <FaGoogle className="mr-2 h-4 w-4" /> Log In
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
