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
