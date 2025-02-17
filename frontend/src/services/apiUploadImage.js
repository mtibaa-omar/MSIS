import apiRoutes from "./apiRoutes";
import axiosInstance from "./axiosInstance";

const uploadImageApi = async (imagesData) => {
  try {
    const response = await axiosInstance({
      ...apiRoutes.uploadImage,
      data: imagesData,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export default uploadImageApi;
