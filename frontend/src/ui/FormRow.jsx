function FormRow({ label, error, children }) {
  return (
    <div
      className={`space-y-2 lg:space-y-0 flex flex-col
    lg:grid lg:items-center lg:gap-6 lg:grid-cols-[24rem_1fr_1.2fr] 
    py-3 first:pt-0 last:pb-0 
    [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[#2B3040]
    [&:has(button)]:flex [&:has(button)]:flex-row [&:has(button)]:justify-end [&:has(button)]:gap-3
    xl:[&:has(.datepicker)]:grid xl:[&:has(.datepicker)]:items-center xl:[&:has(.datepicker)]:gap-6 xl:[&:has(.datepicker)]:grid-cols-[24rem_1fr_1.2fr] 
  `}
    >
      <label
        htmlFor={children.props?.id}
        className="text-2xl font-bold capitalize lg:pl-8 font-robotoMono"
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="block font-bold text-red-500 text-md">{error}</span>
      )}
    </div>
  );
}

export default FormRow;
