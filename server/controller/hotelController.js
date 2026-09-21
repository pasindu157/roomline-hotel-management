import Hotel from "../model/Hotel.js";
import { hotelDetailValidate } from "../validations/hotelDetailValidator.js";

//create hotel
export const createHotel = async (req, res) => {
  try {
    const { name, email, phone, address, description } = req.body;

    const ownerId = req.session.userId;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Cover image is required",
      });
    }

    const coverImage = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const parsedAddress =
      typeof address === "string" ? JSON.parse(address) : address;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign In",
      });
    }

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !parsedAddress?.street?.trim() ||
      !parsedAddress?.city?.trim() ||
      !parsedAddress?.country?.trim() ||
      !parsedAddress?.postalCode?.trim() ||
      !description?.trim() ||
      !coverImage?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const toValidateData = {
      name,
      email,
      phone,
      address: parsedAddress,
      description,
      coverImage,
    };

    const validateResults = hotelDetailValidate(toValidateData);

    if (validateResults.length > 0) {
      console.log("validations error");
      for (let i = 0; i < validateResults.length; i++) {
        console.log(validateResults[i]);
      }
      return res.status(422).json({
        validateData: validateResults,
      });
    }

    const existingHotel = await Hotel.findOne({
      $or: [
        { name },
        { email: email.toLowerCase() },
        { phone },
        { "address.street": parsedAddress.street.trim() },
      ],
    });

    if (existingHotel && existingHotel.status === "active") {
      return res.status(400).json({
        success: false,
        message: "A hotel already exist from this name,email,phone or street",
      });
    }

    const newHotel = await Hotel.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: {
        street: parsedAddress.street,
        city: parsedAddress.city.trim(),
        country: parsedAddress.country,
        postalCode: parsedAddress.postalCode.trim(),
      },
      description,
      coverImage: coverImage.trim(),
      ownerId,
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    //send verification mail
    // sendVerificationMail(newHotel.email).catch((err) => {
    //   console.log("verification email failed", err);
    // });

    return res.status(201).json({
      success: true,
      message: "Hotel registered successfully",
      data: newHotel,
    });
  } catch (error) {
    console.error("Failed to add hotel details", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get all hotels by user id
export const getAllHotelsByUserId = async (req, res) => {
  try {
    const ownerId = req.session.userId;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "please Sign in",
      });
    }

    const hotels = await Hotel.find({ ownerId }).sort({ createdAt: -1 });

    if (hotels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: hotels,
    });
  } catch (error) {
    console.error("Error fetching hotel details", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//update hotel details
export const updateHotelDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session?.userId;

    const {
      name,
      email,
      phone,
      address,
      description,
      coverImage,
      amenities,
      checkInTime,
      checkOutTime,
      status,
      currency,
    } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }

    const toValidateData = {
      name,
      email,
      phone,
      address,
      description,
      coverImage,
    };

    const validateResults = hotelDetailValidate(toValidateData);

    if (validateResults.length > 0) {
      console.log("validations error");
      for (let i = 0; i < validateResults.length; i++) {
        console.log(validateResults[i]);
      }
      return res.status(422).json({
        errorMsg: "check your details",
        validateData: validateResults,
      });
    }

    const hotel = await Hotel.findOne({ _id: id, ownerId: userId });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found or unauthorized",
      });
    }

    if (name) hotel.name = name.trim();
    if (email) hotel.email = email.toLowerCase().trim();
    if (phone) hotel.phone = phone.trim();
    if (description) hotel.description = description.trim();
    if (coverImage) hotel.coverImage = coverImage.trim();
    if (checkInTime) hotel.checkInTime = checkInTime;
    if (checkOutTime) hotel.checkOutTime = checkOutTime;
    if (status) hotel.status = status;
    if (currency) hotel.currency = currency.toUpperCase().trim();

    if (address) {
      if (address.street) hotel.address.street = address.street.trim();
      if (address.city) hotel.address.city = address.city.trim();
      if (address.country) hotel.address.country = address.country.trim();
      if (address.postalCode)
        hotel.address.postalCode = address.postalCode.trim();
    }

    if (Array.isArray(amenities)) {
      hotel.amenities = amenities;
    }

    await hotel.save();

    return res.status(200).json({
      success: true,
      message: "Hotel details updated successfully",
      data: hotel,
    });
  } catch (error) {
    console.error("Error updating hotel details", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//delete hotel
export const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }

    const deletedHotel = await Hotel.findOne({ _id: id, ownerId: userId });

    if (!deletedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    deletedHotel.isActive = false;
    deletedHotel.status = "closed";

    await deletedHotel.save();

    return res.status(200).json({
      success: true,
      data: deletedHotel,
    });
  } catch (error) {
    console.error("Error deleting Hotel", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
