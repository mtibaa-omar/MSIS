import { forwardRef } from "react";

const Textarea = forwardRef(({ ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className="w-56 sm:w-96 h-32 p-3 border-2 dark:bg-[#232325] border-gray-300 rounded-md bg-gray-50 shadow-[0_1px_2px_rgba(0, 0, 0, 0.04)] dark:shadow-[0_1px_2px_rgba(0,0,0,0.4)] dark:border-[#2f2f30] focus:outline-none focus:ring-2 dark:focus:ring-offset-gray-900 focus:ring-blue-500"
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
