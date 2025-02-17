import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory as deleteCategoryApi } from "../../services/apiCategories";
import { toast } from "react-toastify";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeletingCategory, mutate: deleteCategory } = useMutation(
    {
      mutationFn: deleteCategoryApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["category"] });

        toast.success("Category Deleted Successfully");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  return { isDeletingCategory, deleteCategory };
}
