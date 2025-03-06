import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteItem({ productId }) {
  const dispatch = useDispatch();
  return (
    <Button
      variation="reset"
      className="text-white bg-red-600 outline-none focus:ring-1 focus:ring-red-900"
      onClick={() => dispatch(deleteItem(productId))}
    >
      Delete
    </Button>
  );
}

export default DeleteItem;
