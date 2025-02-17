import React from "react";
import clsx from "clsx";
const Input = React.forwardRef((props, ref) => {
  const { disabled, ...rest } = props;

  return (
    <input
      className={clsx(
        "mt-3 block w-56 sm:w-96 rounded-lg dark:border-[#2f2f30] border-2 border-gray-200 py-1.5 px-3 text-sm/6",
        "dark:bg-[#232325] dark:text-gray-100 dark:placeholder-gray-400",
        "bg-gray-100 disabled:bg-gray-300 text-gray-800 placeholder-gray-500",
        "focus:outline-none focus:ring-2",
        "dark:focus:ring-offset-gray-900",
        "focus:ring-blue-500 "
      )}
      {...rest}
      ref={ref}
      disabled={disabled}
    />
  );
});

Input.displayName = "Input";

export default Input;
