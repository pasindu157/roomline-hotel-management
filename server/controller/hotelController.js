import Hotel from "../model/Hotel.js";
import { hotelDetailValidate } from "../validations/hotelDetailValidator.js";

//create hotel
export const createHotel = async (req, res) => {
  try {
    const { name, email, phone, address, description, coverImage } = req.body;

    const ownerId = req.session.userId;

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
      !address.street?.trim() ||
      !address.city?.trim() ||
      !address.country?.trim() ||
      !address.postalCode?.trim() ||
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

    const existingHotel = await Hotel.findOne({
      $or: [
        { name },
        { email: email.toLowerCase() },
        { phone },
        { "address.street": address.street.trim() },
      ],
    });

    if (existingHotel) {
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
        street: address.street,
        city: address.city.trim(),
        country: address.country,
        postalCode: address.postalCode.trim(),
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

    await newHotel.save();

    return res.status(201).json({
      success: true,
      message: "Hotel registered successfully",
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

