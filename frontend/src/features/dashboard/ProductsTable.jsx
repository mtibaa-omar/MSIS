import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useProducts } from "./useProduct";
import ProductCard from "./ProductCard";
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
function ProductsTable({ search }) {
  const { products, isLoading, isFetching, count } = useProducts(search);
  if (isFetching || isLoading) return <Spinner />;
  return (
    <>
      {products?.length === 0 ? (
        <Empty>No data to show at the moment</Empty>
      ) : (
        <div className="grid grid-cols-1 gap-8 p-4 overflow-hidden md:grid-cols-4 ">
          {products.map((productItem) => {
            return (
              <ProductCard
                product={productItem}
                key={productItem._id}
                deleteFct={() => console.log("dd")}
                isDeleting={false}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default ProductsTable;
