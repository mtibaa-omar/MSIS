function Button({
  children,
  variation = "primary",
  onClick,
  className,
  ...props
}) {
  return (
    <button
      className={`${variation} ${className || ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
