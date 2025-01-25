import React from "react";

const Select = React.forwardRef(
  ({ options, onHandle, value, ...props }, ref) => {
    function handleChange(e) {
      onHandle?.(e);
    }
    return (
      <select
        {...props}
        ref={ref}
        value={value}
        onChange={handleChange}
        className="select"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="max-w-48">
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = "Select";
export default Select;
