import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../features/cart/cartSlice";
import Button from "./Button";
import UpdateItemQuantity from "../features/cart/UpdateItemQuantity";
import DeleteItem from "../features/cart/DeleteItem";

function ProductCard({ product }) {
  const { _id: id, name, images, price: unitPrice, quantity } = product;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;
  const dispatch = useDispatch();
  const soldOut = quantity === 0;

  const link = `/product/${id}`;
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
    <div className="w-full max-w-sm bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-[#121212] dark:border-[#030712]">
      <Link to={link}>
        <img
          className={`p-8 rounded-t-lg ${soldOut ? "opacity-70 grayscale" : ""}`}
          src={images[0]}
          alt="product image"
        />
      </Link>
      <div className="px-5 pb-5">
        <Link to={link}>
          <h5 className="h-16 overflow-hidden text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <div className="">
          {!soldOut ? (
            <p className="block text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(unitPrice)} DT
            </p>
          ) : (
            <p className="font-medium uppercase text-stone-500">Sold out</p>
          )}
          <div className="">
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
    </div>
  );
}

export default ProductCard;
