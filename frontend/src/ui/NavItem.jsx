import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import slugify from "slugify";

function NavItem({ field, products }) {
  return (
    <Popover className="z-10">
      <PopoverButton className="flex items-center font-semibold text-gray-900 dark:text-[#D1D5DB] gap-x-1 dark:hover:text-gray-400 ">
        {field}
        <ChevronDownIcon aria-hidden="true" className="w-5 h-5 text-gray-400" />
      </PopoverButton>

      <PopoverPanel
        className="absolute z-10 w-screen mt-5 overflow-hidden transform -translate-x-1/2 bg-white border-2 border-[#030712] shadow-lg max-w-[500px] left-1/2 rounded-xl dark:bg-[#121212]"
        modal="false"
      >
        <div className="p-6">
          <div
            key={products.name}
            className={`flex-1 basis-[calc(100%/3-16px)]  space-y-3 
              }`}
          >
            <h3 className="text-base font-semibold text-gray-900 uppercase dark:text-gray-50">
              {products.name}
            </h3>
            <div className="flex flex-col">
              {products?.subcategories?.map((item, subIndex) => {
                const slug = slugify(item.name, { lower: true });

                return (
                  <Link
                    key={subIndex}
                    to={`products/${slug}`}
                    className="text-sm text-gray-700 dark:text-gray-100 hover:underline"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}

export default NavItem;
