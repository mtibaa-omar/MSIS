import { useQuery } from "@tanstack/react-query";
import { getSubCategories } from "../../services/apiCategories";

export function useSubCategories() {
  const { isLoading: isLoadingSub, data: subCategories } = useQuery({
    queryKey: ["subcategory"],
    queryFn: getSubCategories,
  });

  return {
    isLoadingSub,
    subCategories,
  };
}
