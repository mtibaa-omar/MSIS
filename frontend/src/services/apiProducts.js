import apiRoutes from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const addProduct = async (productData) => {
  const response = await axiosInstance({
    ...apiRoutes.createProduct,
    data: productData,
  });
  return response;
};

export const getProducts = async ({ search = "", sortBy, page = 1 }) => {
  const productData = {
    page,
    limit: 10,
    search,
    sortBy: sortBy?.field ? `${sortBy.field}-${sortBy.direction}` : undefined,
  };

  const response = await axiosInstance({
    ...apiRoutes.getProducts,
    params: productData,
  });
  return response;
};
export const getProductsBySubCategory = async (slug, page = 1) => {
  const limit = 12;
  const url = apiRoutes.getProductsBySubCategory.url.replace(":slug", slug);
  const response = await axiosInstance({
    ...apiRoutes.getProductsBySubCategory,
    url,
    params: { page, limit },
  });
  return response.data;
};

export const getProduct = async (query) => {
  const url = apiRoutes.getProduct.url.replace(":id", query);
  const response = await axiosInstance({
    ...apiRoutes.getProduct,
    url,
  });
  return response.data.data;
};
