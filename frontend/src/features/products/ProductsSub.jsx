import Pagination6 from "../../ui/Pagination6";
import ProductCard from "../../ui/ProductCard";
import Spinner from "../../ui/Spinner";
import { useProductsBySubcategory } from "./useProductsBySubcategory";

function ProductsSub() {
  const { isLoading, products, totalPages } = useProductsBySubcategory();
  if (isLoading) return <Spinner />;
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 lg:gap-y-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Pagination6 pageNbCount={totalPages} />
    </div>
  );
}

export default ProductsSub;
