import apiRoutes from "./apiRoutes";
import axiosInstance from "./axiosInstance";

export const addProduct = async (productData) => {
  console.log(productData);
  const response = await axiosInstance({
    ...apiRoutes.createProduct,
    data: productData,
  });
  return response;
};

export const getProducts = async () => {
  const productData = { page: 1, limit: 10, search: "" };
  console.log(productData);
  const response = await axiosInstance({
    ...apiRoutes.getProducts,
    params: productData,
  });
  return response;
};
