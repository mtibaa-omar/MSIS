import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useProducts } from "../features/dashboard/useProduct";
import { useNavigate } from "react-router-dom";

function Search({ placeholder = "Search for anything" }) {
  const [search, setSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { products } = useProducts(search);
  const containerRef = useRef(null);

  // Open suggestions when search text is non-empty
  useEffect(() => {
    if (search.trim() !== "") {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/products/search/${encodeURIComponent(search)}`);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <div className="w-full min-w-[200px] lg:min-w-[420px] h-12 lg:h-10 rounded-lg flex items-center bg-gray-100 text-neutral-500 border-2 focus-within:border-blue-400 transition">
          <div className="flex items-center justify-center px-2">
            <button
              type="submit"
              className="flex items-center justify-center h-full p-2"
              aria-label="Search"
            >
              <IoSearch size={22} />
            </button>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder={placeholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full px-2 bg-transparent outline-none text-neutral-700"
              aria-label="Search input"
            />
          </div>
        </div>
      </form>

      {isDropdownOpen && search && products && products.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-1 bg-white dark:bg-[#121212] border dark:border-[#030712] rounded-lg shadow-md top-full">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => {
                navigate(`/product/${product._id}`);
                setIsDropdownOpen(false);
              }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-10 h-10 mr-2 rounded"
              />
              <span className="text-gray-900 dark:text-white">
                {product.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
