import { FaBoxOpen, FaUsers } from "react-icons/fa";
import { useProducts } from "../features/dashboard/useProduct";
import Stat from "../ui/Stat";

function DashboardHome() {
  const { count } = useProducts("");
  return (
    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 2xl:grid-cols-3 xl:gap-8">
      <Stat
        icon={<FaBoxOpen size={28} />}
        title="Total Products"
        value={count}
        color="text-blue-600"
        bgColor="bg-blue-100"
      />
    </div>
  );
}

export default DashboardHome;
