import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSubCategory as addSubCategoryApi } from "../../services/apiCategories";
import { toast } from "react-toastify";

export function useAddSubCategory() {
  const queryClient = useQueryClient();

  const { isPending: isAddingSubCategory, mutate: addSubCategory } =
    useMutation({
      mutationFn: addSubCategoryApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["subcategory"] });
        toast.success("Sub Category added Successfully");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  return { isAddingSubCategory, addSubCategory };
}
