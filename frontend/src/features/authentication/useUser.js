import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../services/apiAuth";
import { useLocation } from "react-router-dom";

export function useUser() {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !isLoginPage,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role,
  };
}
