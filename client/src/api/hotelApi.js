import { api } from "../util/axiosConfig.js";
import toast from "react-hot-toast";

//get all hotels for a user
export const getAllHotels = async () => {
  try {
    const response = await api.get("/hotel/get-all");
    if (response.data.success) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to load data";

    // toast.error(errorMsg);
    console.error("loading data error", error);
    throw error;
  }
};

//delete hotel
export const deleteHotel = async (id) => {
  try {
    const response = await api.put(`/hotel/delete/${id}`);
    if (response.data.success) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to load data";

    toast.error(errorMsg);
    console.error("loading data error", error);
    throw error;
  }
};

//add hotel
export const addHotel = async (formData, onSuccess) => {
  try {
    const response = await api.post("/hotel/create", formData);
    if (response.data.success) {
      toast.success(response.data.message);
      if (onSuccess) onSuccess();
      return response;
    } else {
      return false;
    }
  } catch (error) {
    const responseData = error?.response?.data;

    if (error.response?.status === 422 && responseData?.validateData) {
      responseData.validateData.forEach((msg) => {
        toast.error(msg);
      });
    } else {
      const errorMsg =
        responseData?.message || "Registration Failed. Please try again";
      toast.error(errorMsg);
    }
    console.error("adding hotel error", error);
    throw error;
  }
};
