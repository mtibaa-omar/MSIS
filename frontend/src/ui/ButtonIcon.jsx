function ButtonIcon({ onClick, disabled, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center rounded-full transition duration-200  text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-slate-600 px-2 py-2 md:px-2 md:py-2 font-bold `}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
