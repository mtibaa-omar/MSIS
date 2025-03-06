import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import NavItem from "./NavItem";
import MobileNavbar from "./MobileNavbar";
import DarkMode from "./DarkMode";
import Button from "./Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Search from "./Search";
import { HiMiniArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import { styled } from "@mui/material";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { useCategoriesWithSub } from "../features/dashboard/useCategoriesWithSub";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import { getTotalProducts } from "../features/cart/cartSlice";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useMediaQuery } from "@mui/material";
// import UserAvatar from "../features/authentication/UserAvatar.jsx";

const products = [
  {
    name: "Analytics",
    href: "#",
  },
];

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isAuthenticated, isAdmin } = useUser();
  const { isLoading, categories } = useCategoriesWithSub();
  const productsQuantity = useSelector(getTotalProducts);
  const isCreating = pathname === "/signup" || pathname === "/login";
  if (isLoading)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner />
      </div>
    );

  return (
    <header
      className={`sticky top-0 pb-2 bg-primary-200 ${isCreating ? "dark:bg-[#1f2937]" : "dark:bg-[#121212]"} border-b-2 border-gray-100 dark:border-[#030712] ${
        mobileMenuOpen ? "z-50" : "z-40"
      }`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-4 mx-auto max-w-[1500px] lg:px-8 lg:pb-2"
      >
        <div className="flex items-center">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MSIS</span>
            <img alt="Logo" src="/logo.png" className="w-auto h-16 lg:h-20" />
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1 lg:flex-col">
          {!isMobile && (
            <div className="mb-2">
              <Search />
            </div>
          )}
          <div className="hidden lg:flex lg:gap-x-12">
            {categories?.map((category) => (
              <NavItem
                key={category.name}
                field={category.name}
                products={category}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DarkMode />
          {!isAuthenticated ? (
            <Button variation="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <div className="flex items-center gap-1 xl:gap-2">
              {/* <UserAvatar /> */}
              <ButtonIcon onClick={() => navigate("/cart")}>
                <HiOutlineShoppingCart size={25} />
                <CartBadge
                  badgeContent={productsQuantity}
                  color="primary"
                  overlap="circular"
                />
              </ButtonIcon>
              {isAdmin && (
                <ButtonIcon onClick={() => navigate("/dashboard")}>
                  <MdOutlineAdminPanelSettings size={25} />
                </ButtonIcon>
              )}
              <ButtonIcon onClick={() => navigate("/account")}>
                <HiOutlineUser size={25} />
              </ButtonIcon>
              <ButtonIcon onClick={logout}>
                <HiMiniArrowRightOnRectangle size={25} />
              </ButtonIcon>
            </div>
          )}
          {isMobile && (
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="w-8 h-8" />
              </button>
            </div>
          )}
        </div>
      </nav>
      {isMobile && (
        <MobileNavbar
          products={products}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}
      {!isCreating && isMobile && (
        <div className="px-12 -mt-2">
          <Search />
        </div>
      )}
    </header>
  );
}
