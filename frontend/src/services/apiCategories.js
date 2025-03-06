import axiosInstance from "./axiosInstance";
import apiRoutes from "./apiRoutes";

export const addCategory = async (categoryData) => {
  const response = await axiosInstance({
    ...apiRoutes.createCategory,
    data: categoryData,
  });
  return response;
};

export const editCategory = async (categoryData) => {
  const response = await axiosInstance({
    ...apiRoutes.updateCategory,
    data: categoryData,
  });
  return response;
};

export const deleteCategory = async ({ categoryId }) => {
  const url = apiRoutes.deleteCategory.url.replace(":id", categoryId);
  const response = await axiosInstance({
    method: apiRoutes.deleteCategory.method,
    url,
  });
  return response;
};

export const getCategory = async () => {
  const response = await axiosInstance({
    ...apiRoutes.getCategories,
  });
  return response.data;
};

export const addSubCategory = async (categoryData) => {
  console.log(categoryData);
  const response = await axiosInstance({
    ...apiRoutes.createSubCategory,
    data: categoryData,
  });
  return response;
};

export const getSubCategories = async () => {
  const response = await axiosInstance({
    ...apiRoutes.getSubCategories,
  });
  return response.data;
};
export const fetchCategoriesWithSubcategories = async () => {
  const response = await axiosInstance({
    ...apiRoutes.getCategoriesWithSubCategories,
  });
  return response.data;
};
export const updateSubCategory = async (id, categoryData) => {
  const url = apiRoutes.updateSubCategory.url.replace(":id", id);
  console.log(url);
  console.log(categoryData);
  const response = await axiosInstance({
    ...apiRoutes.updateSubCategory,
    url,
    data: categoryData,
  });
  return response;
};

export const deleteSubCategory = async ({ categoryId }) => {
  const url = apiRoutes.deleteSubCategory.url.replace(":id", categoryId);
  const response = await axiosInstance({
    ...apiRoutes.deleteSubCategory,
    url,
  });
  return response;
};
