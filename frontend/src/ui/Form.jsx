import clsx from "clsx";
import { forwardRef } from "react";

const Form = forwardRef(({ type, children, ...props }, ref) => {
  const formClasses = clsx(
    "overflow-hidden text-sm",
    {
      "p-6 bg-[rgb(55, 65, 81)] border-gray-200 rounded-md text-gray-700 dark:text-white  ":
        type !== "modal",
    },
    {
      "sm:max-w-sm sm:w-3/4 md:max-w-max lg:w-[65rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-[#434343] shadow-xl p-4 rounded-lg dark:bg-[#121212] dark:border-[#434343] text-gray-700 dark:text-white":
        type === "modal",
    }
  );

  return (
    <form className={formClasses} ref={ref} {...props}>
      {children}
    </form>
  );
});

Form.displayName = "Form";

export default Form;
