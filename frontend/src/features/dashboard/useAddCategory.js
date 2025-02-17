import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory as addCategoryApi } from "../../services/apiCategories";
import { toast } from "react-toastify";

export function useAddCategory() {
  const queryClient = useQueryClient();

  const { isPending: isAddingCategory, mutate: addCategory } = useMutation({
    mutationFn: addCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("Category Added Successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isAddingCategory, addCategory };
}
