function Stat({
  icon,
  title,
  value,
  color = "text-white",
  bgColor = "bg-gray-600",
}) {
  return (
    <div className="border border-[#030712] rounded-md p-4 grid grid-cols-[6.4rem_1fr] gap-x-4 gap-y-1 min-w-[18rem]">
      <div
        className={`row-span-2 aspect-square rounded-full flex items-center justify-center w-16 ${bgColor}`}
      >
        <div className={color}>{icon}</div>
      </div>
      <h5 className="self-end font-semibold tracking-wide text-gray-400 uppercase text-md">
        {title}
      </h5>
      <p className="text-2xl font-medium leading-none text-gray-300">{value}</p>
    </div>
  );
}

export default Stat;
