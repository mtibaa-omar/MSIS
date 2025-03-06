const apiRoutes = {
  getUser: { method: "GET", url: `/api/users/me` },
  LOGIN: { method: "POST", url: `/api/users/login` },
  SIGNUP: { method: "POST", url: `/api/users/signup` },
  FORGOT_PASSWORD: { method: "POST", url: `/api/users/forgotPassword` },
  UPDATE_ME: { method: "PATCH", url: `/api/users/updateMe` },
  UPDATE_PASSWORD: { method: "PATCH", url: `/api/users/updateMyPassword` },
  LOGOUT: { method: "GET", url: `/api/users/logout` },
  createCategory: { method: "POST", url: `/api/categories` },
  getCategories: { method: "GET", url: `/api/categories` },
  updateCategory: { method: "PUT", url: `/api/categories/:id` },
  deleteCategory: { method: "DELETE", url: `/api/categories/:id` },
  uploadImage: { method: "POST", url: `/api/file/upload` },
  createSubCategory: {
    method: "POST",
    url: `/api/subcategories`,
  },
  getSubCategories: { method: "GET", url: `/api/subcategories` },
  updateSubCategory: { method: "PUT", url: `/api/subcategories/:id` },
  deleteSubCategory: { method: "DELETE", url: `/api/subcategories/:id` },
  createProduct: {
    method: "POST",
    url: `/api/products`,
  },
  getProducts: {
    method: "GET",
    url: `/api/products`,
  },
  getProduct: {
    method: "GET",
    url: `/api/products/product/:id`,
  },
  getProductsBySubCategory: {
    method: "GET",
    url: `/api/products/:slug`,
  },
  getCategoriesWithSubCategories: {
    method: "GET",
    url: `/api/subcategories/test`,
  },
};

export default apiRoutes;
