import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const Breadcrumb6 = () => {
  const { slug } = useParams();
  return (
    <div className="py-10 bg-white dark:bg-[#121212]">
      <div className="container">
        <div className="w-full mb-8">
          <div className="px-4 py-4 border rounded-lg border-light shadow-1 sm:px-6 md:px-8 md:py-5">
            <ul className="flex items-center">
              <li className="flex items-center">
                <Link
                  to="/"
                  className="flex items-center text-base font-medium hover:text-blue-500"
                >
                  <span className="pr-2">
                    <HiOutlineHome size={20} />
                  </span>
                  Home
                </Link>
                <span className="px-3 text-body-color dark:text-white">
                  <MdOutlineKeyboardArrowRight size={25} />
                </span>
              </li>
              <li className="flex items-center">
                <Link
                  to="/"
                  className="text-base font-medium text-body-color hover:text-blue-500"
                >
                  Products
                </Link>
                <span className="px-3 text-body-color dark:text-white">
                  <MdOutlineKeyboardArrowRight size={25} />
                </span>
              </li>
              <li className="text-base font-medium capitalize text-primary">
                {slug}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb6;
