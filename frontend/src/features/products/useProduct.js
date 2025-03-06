import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../services/apiProducts";

export function useProduct(id) {
  const { isLoading, data: product } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  return {
    isLoading,
    product,
  };
}
