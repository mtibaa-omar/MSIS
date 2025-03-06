import { useCategoriesWithSub } from "../features/dashboard/useCategoriesWithSub";
import Navbar from "../ui/Navbar";
import ScrollVelocity from "../ui/ScrollVelocity";
import { useMediaQuery } from "@mui/material";

function Home() {
  const { isLoading, categories } = useCategoriesWithSub();
  const isMobile = useMediaQuery("(max-width:768px)");

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (!categories || categories.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary-100 dark:bg-[#121212] overflow-x-hidden">
      <header>
        <Navbar />
      </header>

      <div className="absolute left-0 right-0 overflow-hidden top-1/2">
        <ScrollVelocity
          texts={[
            "🛍️ MSIS Exciting news!",
            "Online shopping is now available. Shop now! 🛒",
          ]}
          velocity={100}
          className="custom-scroll-text"
          style={{ width: "100vw" }}
        />
      </div>
    </div>
  );
}

export default Home;
