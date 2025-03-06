function Button({
  children,
  variation = "primary",
  onClick,
  className,
  ...props
}) {
  const base =
    "px-5 py-2.5 me-2 mb-2 text-sm font-medium text-center transition border rounded-lg focus:ring focus:outline-none focus:ring-offset-2";

  const styles = {
    primary: `${base} text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none dark:focus:ring-blue-800`,
    reset: `${base} block text-gray-900 border border-gray-200 hover:border-red-600 hover:bg-red-600 hover:text-white dark:text-white dark:border-gray-700`,
    danger: `${base} border-red-600 bg-red-600 hover:bg-red-800 text-white`,
    round:
      "w-8 h-8 px-2 py-1 md:px-2 md:py-1 text-white text-sm bg-blue-600 font-bold rounded-full",
    secondary: `${base} text-black border border-gray-200 hover:bg-blue-600 hover:text-white dark:text-white dark:border-gray-700`,
  };

  return (
    <button
      className={`${styles[variation]} ${className || ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
