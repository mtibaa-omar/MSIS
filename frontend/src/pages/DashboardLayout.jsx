import { Link, Outlet } from "react-router-dom";
import clsx from "clsx";
import styled from "styled-components";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import DashboardSidebar from "../features/dashboard/DashboardSidebar";
import DarkMode from "../ui/DarkMode";
import { useColorScheme } from "@mui/material";

const StyledHeader = styled.header`
  background-color: ${(props) => (props.$darkMode ? "#121212" : "#fff")};
  padding: 1.2rem 4.8rem;
  border-bottom: 2px solid
    ${(props) => (props.$darkMode ? "#030712" : "#f3f4f6")};
  z-index: 51;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: flex-start;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { mode } = useColorScheme();
  const handleClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-100 dark:bg-[#121212]">
      <StyledHeader $darkMode={mode === "dark" ? true : false}>
        <ButtonIcon onClick={handleClick}>
          {!isSidebarOpen ? <MenuIcon /> : <MenuOpenIcon />}
        </ButtonIcon>
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="MSIS logo" className="w-10" />
          <span className="font-bold text-blue-500 uppercase">Msis</span>
        </Link>
        <DarkMode />
      </StyledHeader>
      <div className="flex flex-1 mt-20">
        <DashboardSidebar isSidebarOpen={isSidebarOpen} />
        <main
          className={clsx(
            "flex-1 px-4 sm:px-6 lg:px-8 transition-all duration-300 ",
            "lg:ml-80"
          )}
        >
          <div className="max-w-full py-6 mx-auto min-h-svh sm:max-w-screen-md xl:max-w-screen-xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
