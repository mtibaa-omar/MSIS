import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import clsx from "clsx";

function AppLayout() {
  const location = useLocation();

  const routesWithSidebar = ["/", "/profile"];
  const showSidebar = routesWithSidebar.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-primary-100 dark:bg-dark-primary-100">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && <Sidebar />}
        <main
          className={clsx(
            "flex-1 px-4 sm:px-6 lg:px-8 transition-all duration-300 ",
            showSidebar ? "lg:ml-96" : "lg:pl-24"
          )}
        >
          <div className="max-w-full py-6 mx-auto sm:max-w-screen-md xl:max-w-screen-xl ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
