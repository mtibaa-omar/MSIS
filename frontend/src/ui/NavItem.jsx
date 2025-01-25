import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function NavItem({ field, products }) {
  return (
    <Popover className="z-10">
      <PopoverButton className="flex items-center font-semibold text-gray-900 dark:text-[#D1D5DB] gap-x-1 dark:hover:text-gray-400 ">
        {field}
        <ChevronDownIcon aria-hidden="true" className="w-5 h-5 text-gray-400" />
      </PopoverButton>

      <PopoverPanel
        className="absolute z-10 w-screen mt-3 overflow-hidden transform -translate-x-1/2 bg-white border border-[#2B3040] shadow-lg max-w-[1300px] left-1/2 rounded-xl dark:bg-primary-100"
        modal="false"
      >
        <div className="flex flex-wrap gap-6 p-6">
          {products.map((category, index) => (
            <div
              key={index}
              className={`flex-1 basis-[calc(100%/3-16px)] max-w-[calc(100%/3-16px)] space-y-3 
              }`}
            >
              <h3 className="text-base font-semibold text-gray-900 uppercase dark:text-white">
                {category.category}
              </h3>
              <ul className="space-y-1">
                {category.items.map((item, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
                  >
                    <a href="#">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
}

export default NavItem;
