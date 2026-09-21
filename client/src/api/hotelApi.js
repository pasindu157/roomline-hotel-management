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

    toast.error(errorMsg);
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
