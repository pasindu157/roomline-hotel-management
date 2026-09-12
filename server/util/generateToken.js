import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

const verifyToken = (token) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT SECRET is undefined in process.env!");
      return null;
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT Verification failed : ", error.message);
    return null;
  }
};

export default { generateToken, verifyToken };
