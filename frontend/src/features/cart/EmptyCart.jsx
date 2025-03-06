// import LinkButton from "../../ui/LinkButton";

import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-5">
      <Button onClick={() => navigate(-1)}>&larr; Back to menu</Button>

      <p className="font-semibold mt-7">
        Your cart is still empty. Start adding some products :)
      </p>
    </div>
  );
}

export default EmptyCart;
