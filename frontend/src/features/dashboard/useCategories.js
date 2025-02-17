import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/apiCategories";

export function useCategories() {
  const { isLoading, data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  return {
    isLoading,
    categories,
  };
}
