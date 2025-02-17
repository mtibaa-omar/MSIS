import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useProducts(search) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get("SortBy") || "name-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // const shouldFetch = search?.length >= 3;
  const { isLoading, isFetching, data, error } = useQuery({
    queryKey: ["products", search, sortBy, page],
    queryFn: getProducts,
  });
  const products = data?.data?.data ?? [];

  const count = data?.data?.totalCount ?? 0;

  const PageCounting = Math.ceil(count / PAGE_SIZE);

  if (page < PageCounting)
    queryClient.prefetchQuery({
      queryKey: ["products", search, sortBy, page + 1],
      queryFn: () => getProducts({ search, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["products", search, sortBy, page - 1],
      queryFn: () => getProducts({ search, sortBy, page: page - 1 }),
    });
  return { products, isLoading, isFetching, count, error };
}
