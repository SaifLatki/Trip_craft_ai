import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    morning: { type: String, default: "" },
    afternoon: { type: String, default: "" },
    evening: { type: String, default: "" },
  },
  { _id: false }
);

const dayPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    activities: { type: activitySchema, default: () => ({}) },
    localFoodSuggestions: [{ type: String }],
    estimatedBudget: { type: Number, default: 0 },
  },
  { _id: false }
);

const budgetBreakdownSchema = new mongoose.Schema(
  {
    accommodation: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    activities: { type: Number, default: 0 },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true, trim: true },
    days: { type: Number, required: true, min: 1 },
    budget: { type: Number, required: true, min: 0 },
    travelers: { type: Number, required: true, min: 1, default: 1 },
    interests: [{ type: String }],
    generatedPlan: [dayPlanSchema],
    budgetBreakdown: { type: budgetBreakdownSchema, default: () => ({}) },
    rawAiText: { type: String, default: "" },
    shareId: { type: String, default: null, unique: true, sparse: true },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
