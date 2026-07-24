import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || "tripcraft-dev-secret-change-me";

  return jwt.sign({ id: userId }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export default generateToken;
