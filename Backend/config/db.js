import mongoose from "mongoose";

let usingMemoryFallback = false;
const memoryStore = {
  users: [],
  trips: [],
  nextUserId: 1,
  nextTripId: 1,
};

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(
      `MongoDB connection failed (${err.message}). Falling back to in-memory store. Data will NOT persist across restarts.`
    );
    usingMemoryFallback = true;
  }
};

export const isUsingMemoryFallback = () => usingMemoryFallback;
export const memory = memoryStore;
export default connectDB;
