import { generateItinerary, regenerateSingleDay } from "../services/geminiService.js";

const buildFrontendItinerary = (days = []) =>
  days.map((day) => {
    const activities = day.activities ?? {};
    const morningText =
      typeof day.morning === "string"
        ? day.morning
        : day.morning?.activity ?? activities.morning ?? "";
    const afternoonText =
      typeof day.afternoon === "string"
        ? day.afternoon
        : day.afternoon?.activity ?? activities.afternoon ?? "";
    const eveningText =
      typeof day.evening === "string"
        ? day.evening
        : day.evening?.activity ?? activities.evening ?? "";

    return {
      day: day.day,
      morning: {
        activity: morningText,
        description: day.morning?.description ?? "",
        location: day.morning?.location ?? "",
        cost: Number(day.morning?.cost ?? 0) || 0,
      },
      afternoon: {
        activity: afternoonText,
        description: day.afternoon?.description ?? "",
        location: day.afternoon?.location ?? "",
        cost: Number(day.afternoon?.cost ?? 0) || 0,
      },
      evening: {
        activity: eveningText,
        description: day.evening?.description ?? "",
        location: day.evening?.location ?? "",
        cost: Number(day.evening?.cost ?? 0) || 0,
      },
      activities: {
        morning: morningText,
        afternoon: afternoonText,
        evening: eveningText,
      },
      localFoodSuggestions: Array.isArray(day.localFoodSuggestions) ? day.localFoodSuggestions : [],
      estimatedBudget: Number(day.estimatedBudget ?? 0) || 0,
      tips: day.tips ?? (Array.isArray(day.localFoodSuggestions) ? day.localFoodSuggestions.join(" • ") : ""),
    };
  });

// @desc Generate a full AI itinerary (not saved yet)
// @route POST /api/ai/generate
// @access Public (works logged out; save requires auth)
export const generatePlan = async (req, res, next) => {
  try {
    const { destination, days, budget, travelers, interests } = req.body;

    if (!destination || !days || !budget || !travelers) {
      return res.status(400).json({
        message: "destination, days, budget and travelers are required",
      });
    }

    const tripInput = {
      destination,
      days: Number(days),
      budget: Number(budget),
      travelers: Number(travelers),
      interests: Array.isArray(interests) ? interests : [],
    };

    const { parsed, rawText } = await generateItinerary(tripInput);
    const itinerary = buildFrontendItinerary(parsed.days);
    const budgetBreakdown = {
      ...parsed.budgetBreakdown,
      total:
        Number(parsed.budgetBreakdown?.accommodation ?? 0) +
        Number(parsed.budgetBreakdown?.transport ?? 0) +
        Number(parsed.budgetBreakdown?.food ?? 0) +
        Number(parsed.budgetBreakdown?.activities ?? 0),
    };

    res.json({
      destination,
      days: tripInput.days,
      budget: tripInput.budget,
      travelers: tripInput.travelers,
      interests: tripInput.interests,
      generatedPlan: itinerary,
      itinerary,
      budgetBreakdown,
      rawAiText: rawText,
    });
  } catch (err) {
    next(err);
  }
};

// @desc Regenerate a single day of an itinerary
// @route POST /api/ai/regenerate-day
export const regenerateDay = async (req, res, next) => {
  try {
    const { destination, days, budget, travelers, interests, dayNumber } = req.body;

    if (!destination || !days || !budget || !travelers || !dayNumber) {
      return res.status(400).json({
        message: "destination, days, budget, travelers and dayNumber are required",
      });
    }

    const tripInput = {
      destination,
      days: Number(days),
      budget: Number(budget),
      travelers: Number(travelers),
      interests: Array.isArray(interests) ? interests : [],
    };

    const newDay = await regenerateSingleDay(tripInput, Number(dayNumber));
    res.json({ day: newDay });
  } catch (err) {
    next(err);
  }
};
