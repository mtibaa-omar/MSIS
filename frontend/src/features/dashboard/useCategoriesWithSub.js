import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesWithSubcategories } from "../../services/apiCategories";

export function useCategoriesWithSub() {
  const { isLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesWithSubcategories,
  });
  return {
    isLoading,
    categories,
  };
}
