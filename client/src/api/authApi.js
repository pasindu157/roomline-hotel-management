import { api } from "../util/axiosConfig.js";
import toast from "react-hot-toast";

//login function
export const login = async (formData, onsuccess) => {
  try {
    const response = await api.post("/login", formData);
    if (response.data.success) {
      toast.success(response.data.success);

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      if (onsuccess) onsuccess();

      return response.data;
    } else {
      toast.error(response.data.errorMsg);
    }
  } catch (error) {
    const errorMsg =
      error.response?.data?.errorMsg || "Login failed.Please try again";
    toast.error(errorMsg);
    console.error("login error", error);
    throw error;
  }
};

//register function
export const register = async (registerData, onsuccess) => {
  try {
    const response = await api.post("/customer/register", registerData);
    if (response.data.success) {
      // toast.success(response.data.success);
      if (onsuccess) onsuccess();
      return response.data;
    }
  } catch (error) {
    const responseData = error?.response?.data;

    if (error.response?.status === 422 && responseData?.validateData) {
      responseData.validateData.forEach((msg) => {
        toast.error(msg);
      });
    } else {
      const errorMsg =
        responseData?.errorMsg || "Registration Failed. Please try again";
      toast.error(errorMsg);
    }
    console.error("login error", error);
    throw error;
  }
};

// const handleLogout = () => {
//   localStorage.removeItem("isLoggedIn");
//   setIsAuthenticated(false);
//   navigate("/login");
// };
