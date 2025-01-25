function Row({ type = "vertical", children }) {
  const rowStyle =
    type === "vertical"
      ? "flex-col gap-4"
      : "justify-between items-center flex-col lg:flex-row gap-2";
  return <div className={`flex ${rowStyle}`}>{children}</div>;
}

export default Row;
