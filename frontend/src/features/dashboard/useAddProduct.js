import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addProduct as addProductApi } from "../../services/apiProducts";

export function useAddProduct() {
  const queryClient = useQueryClient();

  const { isPending: isAddingProduct, mutate: addProduct } = useMutation({
    mutationFn: addProductApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product Added Successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAddingProduct, addProduct };
}
