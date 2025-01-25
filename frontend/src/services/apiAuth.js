import axios from "axios";

// Base Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
  withCredentials: true,
});
// Fetch user
export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get("/me");

    return response.data.data.user;
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data?.message || error.message
    );
    return null;
  }
};

// Login user
export const login = async ({ email, password }) => {
  const response = await axiosInstance.post("/login", { email, password });
  return response.data;
};
// Signup user
export const signup = async ({ name, email, password }) => {
  const response = await axiosInstance.post("/signup", {
    name,
    email,
    password,
  });
  return response.data;
};
// Forgot Password mail
export const forgot = async (email) => {
  const response = await axiosInstance.post("/forgotPassword", {
    email,
  });
  return response.data;
};
// Update user
export const updateCurrentUser = async (name, avatar) => {
  avatar = "";
  const response = await axiosInstance.patch("/updateMe", { name, avatar });
  return response.data;
};
// Update Password
export const updateCurrentPassword = async ({ password, passwordCurrent }) => {
  console.log({ password, passwordCurrent });
  const response = await axiosInstance.patch("/updateMyPassword", {
    password,
    passwordCurrent,
  });
  console.log("res", response.data);
  return response.data;
};
// Logout user
export const logout = async () => {
  try {
    await axiosInstance.get("/logout");
    console.log("User successfully logged out.");
    window.location.href = "/login";
  } catch (error) {
    console.error(
      "Error logging out:",
      error.response?.data?.message || error.message
    );
  }
};
