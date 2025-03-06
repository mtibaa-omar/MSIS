import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useProduct } from "./useProduct";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import DeleteItem from "../cart/DeleteItem";

function ProductDetails() {
  const { id } = useParams();
  const { product, isLoading, isError } = useProduct(id);
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading product details.</div>;
  if (!product) return <div>Product not found.</div>;

  const { name, price: unitPrice, stock: quantity } = product;
  const soldOut = quantity === 0;

  function handleAddToCart() {
    const newItem = {
      productId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/2">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full rounded-lg shadow-md"
          />
          {product.images.length > 1 && (
            <div className="flex mt-4 space-x-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index}`}
                  className="object-cover w-20 h-20 rounded cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

          <p className="mb-6 text-gray-600 dark:text-gray-100">
            {product.description}
          </p>
          {!soldOut ? (
            <p className="block text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(unitPrice)} DT
            </p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                productId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem productId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
