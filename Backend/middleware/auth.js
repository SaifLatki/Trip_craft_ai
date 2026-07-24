import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isUsingMemoryFallback, memory } from "../config/db.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const secret = process.env.JWT_SECRET || "tripcraft-dev-secret-change-me";
    const decoded = jwt.verify(token, secret);

    if (isUsingMemoryFallback()) {
      const user = memory.users.find((u) => u.id === decoded.id);
      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = { id: user.id, name: user.name, email: user.email };
    } else {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = user;
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export default protect;
