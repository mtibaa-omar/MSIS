function Button({ children, variation, onClick, ...props }) {
  return (
    <button className={variation} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
