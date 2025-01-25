import { Link } from "react-router-dom";
import slugify from "slugify";

function Product({ product }) {
  const { name, image, price } = product;
  const link = slugify(name, {
    lower: true,
    strict: true,
    replacement: "-",
  });

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-800">
      <Link to={link}>
        <img className="p-8 rounded-t-lg" src={image} alt="product image" />
      </Link>
      <div className="px-5 pb-5">
        <Link to={link}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {price} DT
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default Product;
