import api from "./axios";

const normalizeTrip = (payload = {}) => ({
  ...payload,
  itinerary: payload.generatedPlan ?? payload.itinerary ?? [],
  budgetBreakdown: payload.budgetBreakdown ?? {
    accommodation: 0,
    transport: 0,
    food: 0,
    activities: 0,
    total: 0,
  },
  weather: payload.weather ?? [],
  nearbyAttractions: payload.nearbyAttractions ?? [],
});

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
