import crypto from "crypto";
import Trip from "../models/Trip.js";
import { isUsingMemoryFallback, memory } from "../config/db.js";

// @desc Save a generated trip
// @route POST /api/trips
export const createTrip = async (req, res, next) => {
  try {
    const {
      destination,
      days,
      budget,
      travelers,
      interests,
      generatedPlan,
      budgetBreakdown,
      rawAiText,
    } = req.body;

    if (!destination || !days || !budget || !travelers || !generatedPlan) {
      return res.status(400).json({ message: "Missing required trip fields" });
    }

    if (isUsingMemoryFallback()) {
      const trip = {
        id: String(memory.nextTripId++),
        user: req.user.id,
        destination,
        days,
        budget,
        travelers,
        interests: interests || [],
        generatedPlan,
        budgetBreakdown: budgetBreakdown || {},
        rawAiText: rawAiText || "",
        shareId: null,
        createdAt: new Date().toISOString(),
      };
      memory.trips.push(trip);
      return res.status(201).json({ trip });
    }

    const trip = await Trip.create({
      user: req.user._id,
      destination,
      days,
      budget,
      travelers,
      interests,
      generatedPlan,
      budgetBreakdown,
      rawAiText,
    });

    res.status(201).json({ trip });
  } catch (err) {
    next(err);
  }
};

// @desc Get all trips for logged-in user
// @route GET /api/trips
export const getMyTrips = async (req, res, next) => {
  try {
    if (isUsingMemoryFallback()) {
      const trips = memory.trips
        .filter((t) => t.user === req.user.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json({ trips });
    }

    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ trips });
  } catch (err) {
    next(err);
  }
};

// @desc Get single trip by id (owner only)
// @route GET /api/trips/:id
export const getTripById = async (req, res, next) => {
  try {
    if (isUsingMemoryFallback()) {
      const trip = memory.trips.find((t) => t.id === req.params.id && t.user === req.user.id);
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      return res.json({ trip });
    }

    const trip = await Trip.findOne({ _id: req.params.id, user: req.user._id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ trip });
  } catch (err) {
    next(err);
  }
};

// @desc Update a trip (e.g. after regenerating a day, or editing budget)
// @route PUT /api/trips/:id
export const updateTrip = async (req, res, next) => {
  try {
    if (isUsingMemoryFallback()) {
      const idx = memory.trips.findIndex(
        (t) => t.id === req.params.id && t.user === req.user.id
      );
      if (idx === -1) return res.status(404).json({ message: "Trip not found" });
      memory.trips[idx] = { ...memory.trips[idx], ...req.body };
      return res.json({ trip: memory.trips[idx] });
    }

    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ trip });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a trip
// @route DELETE /api/trips/:id
export const deleteTrip = async (req, res, next) => {
  try {
    if (isUsingMemoryFallback()) {
      const idx = memory.trips.findIndex(
        (t) => t.id === req.params.id && t.user === req.user.id
      );
      if (idx === -1) return res.status(404).json({ message: "Trip not found" });
      memory.trips.splice(idx, 1);
      return res.json({ message: "Trip deleted" });
    }

    const trip = await Trip.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted" });
  } catch (err) {
    next(err);
  }
};

// @desc Generate a public share link for a trip
// @route POST /api/trips/:id/share
export const shareTrip = async (req, res, next) => {
  try {
    const shareId = crypto.randomBytes(6).toString("hex");

    if (isUsingMemoryFallback()) {
      const idx = memory.trips.findIndex(
        (t) => t.id === req.params.id && t.user === req.user.id
      );
      if (idx === -1) return res.status(404).json({ message: "Trip not found" });
      memory.trips[idx].shareId = shareId;
      return res.json({ shareId });
    }

    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { shareId },
      { new: true }
    );
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json({ shareId });
  } catch (err) {
    next(err);
  }
};

// @desc Get a shared trip publicly by shareId (no auth)
// @route GET /api/trips/shared/:shareId
export const getSharedTrip = async (req, res, next) => {
  try {
    if (isUsingMemoryFallback()) {
      const trip = memory.trips.find((t) => t.shareId === req.params.shareId);
      if (!trip) return res.status(404).json({ message: "Shared trip not found" });
      return res.json({ trip });
    }

    const trip = await Trip.findOne({ shareId: req.params.shareId });
    if (!trip) return res.status(404).json({ message: "Shared trip not found" });
    res.json({ trip });
  } catch (err) {
    next(err);
  }
};
