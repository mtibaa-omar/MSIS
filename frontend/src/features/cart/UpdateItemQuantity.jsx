import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ productId, currentQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        variation="round"
        onClick={() => dispatch(decreaseItemQuantity(productId))}
      >
        -
      </Button>
      <span className="font-bold">{currentQuantity}</span>
      <Button
        variation="round"
        onClick={() => dispatch(increaseItemQuantity(productId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
