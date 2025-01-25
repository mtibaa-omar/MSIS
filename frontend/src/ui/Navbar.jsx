import { useState } from "react";
import { PopoverGroup } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import NavItem from "./NavItem";
import MobileNavbar from "./MobileNavbar";
import DarkMode from "./DarkMode";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Search from "./Search";
import UserAvatar from "../features/authentication/userAvatar";
import { HiMiniArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import { useUser } from "../features/authentication/useUser";
import { allCategories } from "../data/allCategories";
import { styled } from "@mui/material";
import Badge, { badgeClasses } from "@mui/material/Badge";

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
export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { isAuthenticated } = useUser();

  return (
    <header
      className={`${
        mobileMenuOpen ? "z-0" : "z-50"
      } sticky top-0 bg-primary-200 dark:bg-dark-primary-200 border-b border-gray-100 dark:border-gray-900`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-1 mx-auto max-w-[1500px] lg:px-8 lg:pb-2"
      >
        <div className="flex">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MSIS</span>
            <img alt="" src="logo.png" className="w-auto h-20" />
          </a>
        </div>
        <div className="flex items-center justify-between w-full lg:flex-col">
          <div className="mx-auto sm:block sm:mb-2">
            <Search />
          </div>
          <div>
            <div className="flex mr-4 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-8" />
              </button>
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12 ">
              {allCategories.map((category) => (
                <NavItem
                  field={category.category}
                  products={category.data}
                  key={category.category}
                />
              ))}
            </PopoverGroup>
          </div>
        </div>
        <div className="items-center hidden gap-2 lg:flex ">
          <DarkMode />

          {!isAuthenticated ? (
            <Button variation="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <div className="flex flex-row gap-1">
              <UserAvatar />
              <ButtonIcon>
                <HiOutlineShoppingCart size={25} />
                <CartBadge
                  badgeContent={2}
                  color="primary"
                  overlap="circular"
                />
              </ButtonIcon>
              <ButtonIcon onClick={() => navigate("/account")}>
                <HiOutlineUser size={25} />
              </ButtonIcon>
              <ButtonIcon onClick={logout}>
                <HiMiniArrowRightOnRectangle size={25} />
              </ButtonIcon>
            </div>
          )}
        </div>
      </nav>
      <MobileNavbar
        products={products}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
    </header>
  );
}
