import Room from "../model/Room.js";

//bulk insert rooms
export const bulkRoomCreate = async (req, res) => {
  try {
    const {
      hotelId,
      roomNumbers,
      floor,
      roomType,
      bedType,
      numberOfBeds,
      adults,
      children,
      pricePerNight,
      amenities,
      description,
    } = req.body;

    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }

    const imageUrls = req.files
      ? req.files.map(
          (file) =>
            `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        )
      : [];

    const parsedRoomNumbers = roomNumbers
      ? roomNumbers
          .split(",")
          .map((num) => num.trim())
          .filter(Boolean)
      : [];

    if (!parsedRoomNumbers.length) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one room number",
      });
    }

    const parsedAmenities = amenities
      ? amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean)
      : [];

    const roomToInsert = parsedRoomNumbers.map((roomNumber) => ({
      hotelId,
      roomNumber: String(roomNumber).trim(),
      floor: Number(floor) || 1,
      roomType,
      bedType,
      numberOfBeds: Number(numberOfBeds) || 1,
      maxOccupancy: {
        adults: Number(adults) || 2,
        children: Number(children) || 0,
      },
      pricePerNight: Number(pricePerNight),
      amenities: parsedAmenities,
      description: description?.trim() || "",
      images: imageUrls,
    }));

    const createRooms = await Room.insertMany(roomToInsert, { ordered: false });

    return res.status(201).json({
      success: true,
      message: `${createRooms.length} rooms created successfully`,
      data: createRooms,
    });
  } catch (error) {
    console.error("Bulk create rooms error : ", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "One or more room numbers already exists in this hotel",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//update room
export const updateRoom = async (req, res) => {
  try {
    const { hotelId, roomIds, ...updates } = req.body;

    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }

    const result = await Room.updateMany(
      { _id: { $in: roomIds }, hotelId },
      { $set: updates },
    );

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} rooms updated successfully`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//delete room
export const deleteRoom = async (req, res) => {
  try {
    const { roomIds, hotelId } = req.body;
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }

    if (!hotelId || !roomIds || !roomIds.length) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID and at least one room ID are required",
      });
    }

    const deleted = await Room.updateMany(
      { _id: { $in: roomIds }, hotelId },
      {
        $set: {
          isActive: false,
        },
      },
    );
    return res.status(200).json({
      success: true,
      message: `${deleted.modifiedCount} rooms deleted successfully`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
//get rooms by hotel id
export const getRoomsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }

    const room = await Room.find({ hotelId, isActive: true }).sort({
      floor: 1,
      roomNumber: 1,
    });

    if (!room) {
      return res.status(404).json({
        sucess: false,
        message: "Room Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "found the room",
      data: room,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
