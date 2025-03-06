import { useQuery } from "@tanstack/react-query";
import { getProductsBySubCategory } from "../../services/apiProducts";
import { useParams, useSearchParams } from "react-router-dom";

export function useProductsBySubcategory() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const { isLoading, data: productsData } = useQuery({
    queryKey: ["products", slug, page],
    queryFn: () => getProductsBySubCategory(slug, page),
  });
  return {
    isLoading,
    products: productsData?.data,
    totalPages: productsData?.totalPages,
  };
}
