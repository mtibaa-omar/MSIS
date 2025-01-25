import React from "react";
import clsx from "clsx";
const Input = React.forwardRef((props, ref) => {
  const { disabled, ...rest } = props;

  return (
    <input
      className={clsx(
        "mt-3 block w-56 sm:w-72 rounded-lg border-none py-1.5 px-3 text-sm/6",
        "dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400",
        "bg-gray-100 text-gray-800 placeholder-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "dark:focus:ring-offset-gray-900",
        "focus:ring-blue-500 focus:ring-offset-white"
      )}
      {...rest}
      ref={ref}
      disabled={disabled}
    />
  );
});

Input.displayName = "Input";

export default Input;
