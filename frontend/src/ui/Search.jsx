import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import AnimatedText from "./AnimatedText";

function Search({ placeholder = "Search for anything" }) {
  const [showInput, setShowInput] = useState(true);

  const toggleSearchMode = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <div className="w-full min-w-[200px] lg:min-w-[420px] h-12 lg:h-10 rounded-lg flex items-center bg-gray-100 text-neutral-500 border-2 focus-within:border-blue-400 transition">
      <div className="flex items-center justify-center px-2">
        {showInput ? (
          <Link
            to="/"
            className="flex items-center justify-center h-full p-2 rounded-full"
            aria-label="Go back"
            onClick={toggleSearchMode}
          >
            <FaArrowLeft size={15} />
          </Link>
        ) : (
          <button
            className="flex items-center justify-center h-full p-2"
            aria-label="Open search input"
            onClick={toggleSearchMode}
          >
            <IoSearch size={22} />
          </button>
        )}
      </div>

      <div className="flex-1">
        {showInput ? (
          <input
            type="text"
            placeholder={placeholder}
            className="w-full h-full px-2 bg-transparent outline-none text-neutral-700"
            aria-label="Search input"
          />
        ) : (
          <div
            className="flex items-center w-full h-full cursor-pointer"
            onClick={toggleSearchMode}
          >
            <AnimatedText text="Search, for milk" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
