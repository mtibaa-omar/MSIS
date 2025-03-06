import { useParams } from "react-router-dom";
import { useProducts } from "../features/dashboard/useProduct";
import ProductCard from "../ui/ProductCard";
import Spinner from "../ui/Spinner";

function ProductsSearch() {
  const { query } = useParams();
  console.log({ query });
  const { products, isLoading, isFetching } = useProducts(query);
  if (isLoading || isFetching) return <Spinner />;
  return (
    <>
      <div className="text-3xl font-bold capitalize">{query}</div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 lg:gap-y-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductsSearch;
