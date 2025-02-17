import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

function ProtectAdmin({ children }) {
  const { isLoading, isAuthenticated, user } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (user?.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center h-screen">
        You dont have permession
      </div>
    );
  }
  if (isAuthenticated && user?.role === "ADMIN") {
    return children;
  }

  return null;
}

export default ProtectAdmin;
