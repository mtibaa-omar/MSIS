import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useProducts } from "./useProduct";
import Table from "../../ui/Table";
import ProductRow from "./ProductRow";
import { useMediaQuery } from "@mui/material";
import Pagination6 from "../../ui/Pagination6";

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function ProductsTable({ search }) {
  const { products, isLoading, isFetching, pageCounting } = useProducts(search);
  const isMobile = useMediaQuery("(max-width:600px)");

  const tableColumns = isMobile
    ? "0.6fr 1.8fr 1fr"
    : "0.6fr 1.8fr 2.2fr 1fr 1fr 0.5fr";

  if (isFetching || isLoading) return <Spinner />;

  return (
    <>
      {products?.length === 0 ? (
        <Empty>No data to show at the moment</Empty>
      ) : (
        <div>
          <Table columns={tableColumns}>
            <Table.Header role="row">
              <div></div>
              <div>Name</div>
              {!isMobile && <div>Description</div>}
              <div>price</div>
              {!isMobile && <div>discount</div>}
              {!isMobile && <div></div>}
            </Table.Header>
            <Table.Body
              data={products}
              render={(product) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  isMobile={isMobile}
                />
              )}
            />
          </Table>
          <Pagination6 pageNbCount={pageCounting} />
        </div>
      )}
    </>
  );
}

export default ProductsTable;
