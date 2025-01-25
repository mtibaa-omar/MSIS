import { FaBars } from "react-icons/fa";
import { useState } from "react";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed z-40 p-2 text-white rounded-md bg-inherit top-1/2 left-4 lg:hidden"
      >
        <FaBars size={20} />
      </button>

      <aside
        className={`fixed top-0 w-64 lg:w-96 h-screen pt-24 z-30 transition-transform ${
          isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
        } bg-primary-200 border-x lg:translate-x-0 dark:bg-dark-primary-200 dark:border-gray-900 border-gray-100`}
      ></aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
