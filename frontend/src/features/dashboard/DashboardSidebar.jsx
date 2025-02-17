import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { TbBrandProducthunt } from "react-icons/tb";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useColorScheme } from "@mui/material";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: ${(props) => (props.$darkMode ? "#fff" : "#4b5563")};
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: ${(props) => (props.$darkMode ? "#fff" : "#1f2937")};
    background-color: ${(props) => (props.$darkMode ? "#09090b" : "#f3f4f6")};
    border-radius: 5px;
  }

  & svg {
    width: 1.8rem;
    height: 2rem;
    color: #9ca3af;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #3b82f6;
  }
`;

function DashboardSidebar({ isSidebarOpen }) {
  const { mode } = useColorScheme();
  return (
    <aside
      className={`fixed top-0 w-64 lg:w-80 h-screen pt-24 z-30 transition-transform ${
        isSidebarOpen ? "translate-x-0 " : "-translate-x-full"
      } bg-white border-x-2  dark:bg-[#121212] dark:border-gray-950 border-gray-100`}
    >
      <nav>
        <NavList>
          <li>
            <StyledNavLink $darkMode={mode === "dark"} to="/dashboard" end>
              <HiOutlineHome /> Dashboard
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink $darkMode={mode === "dark"} to="/dashboard/orders">
              <ShoppingCartIcon /> Orders
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink $darkMode={mode === "dark"} to="/dashboard/category">
              <CategoryIcon /> Category
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              $darkMode={mode === "dark"}
              to="/dashboard/subcategory"
            >
              <AddCircleIcon /> Sub Category
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              $darkMode={mode === "dark"}
              to="/dashboard/upload-product"
            >
              <TbBrandProducthunt />
              Upload Product
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink $darkMode={mode === "dark"} to="/dashboard/product">
              <TbBrandProducthunt />
              Product
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
