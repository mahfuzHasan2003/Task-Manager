import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
