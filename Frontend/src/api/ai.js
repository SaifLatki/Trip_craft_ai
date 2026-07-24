import api from "./axios";

const DEFAULT_BREAKDOWN = {
  accommodation: 0,
  transport: 0,
  food: 0,
  activities: 0,
  total: 0,
};

const buildSlot = (slotData, fallbackText = "") => {
  if (typeof slotData === "string") {
    return {
      activity: slotData || fallbackText || "",
      description: "",
      location: "",
      cost: 0,
    };
  }

  if (slotData && typeof slotData === "object") {
    return {
      activity: slotData.activity ?? slotData.title ?? slotData.name ?? fallbackText ?? "",
      description: slotData.description ?? slotData.details ?? slotData.summary ?? "",
      location: slotData.location ?? slotData.place ?? "",
      cost: Number(slotData.cost ?? slotData.estimatedCost ?? 0) || 0,
    };
  }

  return {
    activity: fallbackText || "",
    description: "",
    location: "",
    cost: 0,
  };
};

const normalizeDay = (day = {}) => {
  const activities = day.activities ?? {};
  const morning = buildSlot(day.morning ?? activities.morning, activities.morning);
  const afternoon = buildSlot(day.afternoon ?? activities.afternoon, activities.afternoon);
  const evening = buildSlot(day.evening ?? activities.evening, activities.evening);

  return {
    ...day,
    day: Number(day.day ?? 1),
    morning,
    afternoon,
    evening,
    tips: day.tips ?? (Array.isArray(day.localFoodSuggestions) ? day.localFoodSuggestions.join(" • ") : ""),
    activities: {
      morning: morning.activity,
      afternoon: afternoon.activity,
      evening: evening.activity,
    },
  };
};

export const normalizeTrip = (payload = {}) => {
  const itinerary = (payload.itinerary ?? payload.generatedPlan ?? []).map(normalizeDay);
  const breakdown = payload.budgetBreakdown ?? {};
  const accommodation = Number(breakdown.accommodation ?? 0);
  const transport = Number(breakdown.transport ?? 0);
  const food = Number(breakdown.food ?? 0);
  const activities = Number(breakdown.activities ?? 0);
  const total = Number(breakdown.total ?? accommodation + transport + food + activities);

  return {
    ...payload,
    destination: payload.destination ?? "",
    days: Number(payload.days ?? itinerary.length ?? 0),
    budget: Number(payload.budget ?? 0),
    travelers: Number(payload.travelers ?? 1),
    interests: Array.isArray(payload.interests) ? payload.interests : [],
    itinerary,
    generatedPlan: itinerary,
    budgetBreakdown: {
      ...DEFAULT_BREAKDOWN,
      ...breakdown,
      accommodation,
      transport,
      food,
      activities,
      total,
    },
    weather: Array.isArray(payload.weather) ? payload.weather : [],
    nearbyAttractions: Array.isArray(payload.nearbyAttractions) ? payload.nearbyAttractions : [],
  };
};

export async function generateTrip(form) {
  const { data } = await api.post("/ai/generate", form);
  return normalizeTrip(data);
}

export async function regenerateTripDay(form, dayNumber) {
  const { data } = await api.post("/ai/regenerate-day", {
    ...form,
    dayNumber,
  });

  return { day: data.day };
}
