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
        } bg-primary-200 border-x-2 lg:translate-x-0 dark:bg-[#121212] dark:border-[#030712] border-gray-100`}
      >
        <h1 className="p-4 text-2xl font-bold">Filtrer</h1>
      </aside>

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
