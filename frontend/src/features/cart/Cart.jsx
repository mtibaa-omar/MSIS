import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "./cartSlice";
import EmptyCart from "./EmptyCart";
import { useUser } from "../authentication/useUser";
import Spinner from "../../ui/Spinner";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function Cart() {
  const navigate = useNavigate();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();
  const { isLoading, user } = useUser();
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <Button variation="secondary" onClick={() => navigate(-1)}>
        &larr; Back to menu
      </Button>
      <h2 className="text-xl font-semibold mt-7">Your cart, {user.name}</h2>
      <ul className="mt-3 border-b divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.productId} />
        ))}
      </ul>
      <div className="flex justify-end font-bold">
        {formatCurrency(totalPrice)}DT
      </div>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
