import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCategoriesWithSub } from "../features/dashboard/useCategoriesWithSub";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import Button from "./Button";
import { useUser } from "../features/authentication/useUser";

function MobileNavbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { isLoading, categories } = useCategoriesWithSub();
  const { isAuthenticated } = useUser();

  const navigate = useNavigate();
  return (
    <Dialog
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      className="lg:hidden"
    >
      <div className="fixed inset-0 z-10 " />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto dark:bg-[#121212] sm:max-w-sm bg-white sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between bg-primary-200 dark:bg-[#121212] px-6 py-6 border-b dark:border-[#030712]">
          <a href="#" className="-m-1.5 p-1.5 ">
            <span className="sr-only">Your Company</span>
            <img alt="" src="logo.png" className="w-auto h-16" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-black dark:text-white"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="flow-root px-6 py-6 mt-6">
          <div className="-my-6 divide-y-2 divide-[#030712]">
            <div className="py-6 space-y-2">
              {!isLoading &&
                categories.map((category) => (
                  <Disclosure as="div" className="-mx-3" key={category._id}>
                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-black dark:text-gray-100 dark:hover:bg-[#09090b]">
                      {category.name}
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="size-5 flex-none group-data-[open]:rotate-180"
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <DisclosureButton
                          key={subcategory._id}
                          as={Link}
                          to={`products/${slugify(subcategory.name, { lower: true })}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 pl-6 pr-3 font-semibold rounded-lg dark:text-gray-50 text-sm/7 hover:bg-gray-700 dark:hover:bg-[#09090b]"
                        >
                          {subcategory.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ))}
            </div>
            {!isAuthenticated && (
              <div className="py-6">
                <Button
                  onClick={() => navigate("/login")}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold dark:text-white hover:bg-gray-50 dark:hover:bg-[#09090b]"
                >
                  Log in
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default MobileNavbar;
