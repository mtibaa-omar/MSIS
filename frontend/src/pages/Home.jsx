import products from "../data/products";
import Heading from "../ui/Heading";
import Product from "../ui/ProductCard";
import Row from "../ui/Row";

function Home() {
  return (
    <Row>
      <Heading>Products</Heading>
      <div className="">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-8">
          {products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </Row>
  );
}

export default Home;
