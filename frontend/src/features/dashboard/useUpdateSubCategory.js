import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSubCategory as updateSubCategoryApi } from "../../services/apiCategories";

export function useUpdateSubCategory() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatingSubCategory, mutate: updateSubCategory } =
    useMutation({
      mutationFn: ({ id, categoryData }) =>
        updateSubCategoryApi(id, categoryData),
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
      },
    });

  return {
    isUpdatingSubCategory,
    updateSubCategory,
  };
}
