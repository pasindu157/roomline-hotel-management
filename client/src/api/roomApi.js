import { api } from "../util/axiosConfig.js";
import { toast } from "react-hot-toast";

export const getRoomsByHotelId = async (hotel) => {
  const hotelId = hotel?._id || hotel;
  if (!hotelId) return null;
  try {
    const response = await api.get(`/room/get-by-hotel-id/${hotelId}`);
    if (response.data.success) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    const errorMsg = error.response?.data?.message || "Error loading rooms";
    toast.error(errorMsg);
  }
};

export const addRoom = async (formData, onSuccess) => {
  try {
    const response = await api.post("/room/bulk-create", formData);
    if (response.data.success) {
      if (onSuccess) onSuccess();
      toast.success(response.data.message);
    }
  } catch (error) {
    console.error(error);
    const errorMsg = error.response?.data?.message || "Error inserting rooms";
    toast.error(errorMsg);
  }
};
