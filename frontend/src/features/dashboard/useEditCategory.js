import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCategory as updateCategoryApi } from "../../services/apiCategories";
import { toast } from "react-toastify";

export function useEditCategory() {
  const queryClient = useQueryClient();

  const { isPending: isEditingCategory, mutate: editCategory } = useMutation({
    mutationFn: updateCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });

      toast.success("Category Edited Successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isEditingCategory, editCategory };
}
