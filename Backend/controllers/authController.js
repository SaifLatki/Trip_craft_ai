import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { isUsingMemoryFallback, memory } from "../config/db.js";

// @desc Register new user
// @route POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (isUsingMemoryFallback()) {
      const existing = memory.users.find((u) => u.email === email.toLowerCase());
      if (existing) return res.status(400).json({ message: "User already exists" });

      const hashed = await bcrypt.hash(password, 10);
      const user = {
        id: String(memory.nextUserId++),
        name,
        email: email.toLowerCase(),
        password: hashed,
      };
      memory.users.push(user);

      return res.status(201).json({
        user: { id: user.id, name: user.name, email: user.email },
        token: generateToken(user.id),
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({
      user: user.toSafeObject(),
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// @desc Login user
// @route POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (isUsingMemoryFallback()) {
      const user = memory.users.find((u) => u.email === email.toLowerCase());
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ message: "Invalid credentials" });

      return res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token: generateToken(user.id),
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      user: user.toSafeObject(),
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// @desc Get current user
// @route GET /api/auth/me
export const getMe = async (req, res) => {
  res.json({ user: req.user });
};
