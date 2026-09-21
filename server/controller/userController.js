import User from "../model/User.js";

export const fetchUserProfile = async (req, res) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please Sign in",
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Failed to load profile");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
