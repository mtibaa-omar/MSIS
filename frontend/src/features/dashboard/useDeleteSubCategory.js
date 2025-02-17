import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubCategory as deleteSubCategoryApi } from "../../services/apiCategories";
import { toast } from "react-toastify";

export function useDeleteSubCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingSubCategory, mutate: deleteSubCategory } =
    useMutation({
      mutationFn: deleteSubCategoryApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["subcategory"] });

        toast.success("Category Deleted Successfully");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  return { isDeletingSubCategory, deleteSubCategory };
}
