import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

export default function Pagination6({ pageNbCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const handlePageChange = (page) => {
    if (page < 1 || page > pageNbCount) return;
    setSearchParams({ ...Object.fromEntries(searchParams), page: page });
  };

  let pagesToShow = [];
  if (pageNbCount <= 3) {
    for (let i = 1; i <= pageNbCount; i++) {
      pagesToShow.push(i);
    }
  } else {
    pagesToShow = [1, 2, 3];
    if (pageNbCount > 3) {
      pagesToShow.push("ellipsis", pageNbCount);
    }
  }

  return (
    <div className="flex justify-end py-10 bg-white border border-gray-200 dark:bg-[#121212] dark:border-[#030712] w-[95%] border-t-0">
      <ul className="flex items-center justify-center gap-1">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`inline-flex items-center justify-center h-10 gap-2 px-4 py-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${
              currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span>
              <IoIosArrowBack />
            </span>
            <span className="max-sm:hidden">Previous</span>
          </button>
        </li>
        {pagesToShow.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <li key={index}>
                <span className="flex items-center justify-center h-10 px-2 text-gray-900 rounded-lg min-w-10 dark:text-white">
                  ...
                </span>
              </li>
            );
          }
          return (
            <li key={index}>
              <button
                onClick={() => handlePageChange(item)}
                className={`flex items-center justify-center h-10 px-2 rounded-lg min-w-10 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${
                  item === currentPage
                    ? "shadow-sm bg-gray-200 dark:bg-gray-800"
                    : ""
                }`}
              >
                {item}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pageNbCount}
            className={`inline-flex items-center justify-center h-10 gap-2 px-4 py-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 ${
              currentPage >= pageNbCount ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="max-sm:hidden">Next</span>
            <span>
              <IoIosArrowForward />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}
