import fetch from "node-fetch";

const SYSTEM_PROMPT = `You are an expert travel planner specializing in trips within Pakistan and worldwide.
Generate a detailed travel itinerary based on the user's destination, budget, interests, and number of travel days.

Rules:
- Stay within the given budget (in PKR unless another currency is stated).
- Suggest realistic travel times between locations.
- Recommend local foods for each day.
- Avoid repeating attractions across days.
- Include morning, afternoon, and evening activities for every day.
- Weight activities toward the user's selected interests.
- End each day with an estimated budget for that day (in PKR, numeric only).
- Also provide an overall budget breakdown across four categories: accommodation, transport, food, activities. These four numbers must sum to approximately the total budget.

Respond ONLY with valid JSON (no markdown, no code fences, no commentary) matching exactly this shape:

{
  "days": [
    {
      "day": 1,
      "activities": { "morning": "string", "afternoon": "string", "evening": "string" },
      "localFoodSuggestions": ["string"],
      "estimatedBudget": 0
    }
  ],
  "budgetBreakdown": {
    "accommodation": 0,
    "transport": 0,
    "food": 0,
    "activities": 0
  }
}`;

function buildUserPrompt({ destination, days, budget, travelers, interests }) {
  return `Destination: ${destination}
Number of days: ${days}
Total budget: PKR ${budget}
Number of travelers: ${travelers}
Interests: ${interests?.length ? interests.join(", ") : "general sightseeing"}

Generate the itinerary now, following the JSON schema and rules exactly.`;
}

function extractJson(text) {
  // Strip markdown code fences if the model added them anyway
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("AI response did not contain JSON");
  return JSON.parse(cleaned.slice(start, end + 1));
}

// Deterministic fallback so the app still works end-to-end without an API key
function mockItinerary({ destination, days, budget, travelers, interests }) {
  const perDayBudget = Math.round(budget / days);
  const interestList = interests?.length ? interests : ["Sightseeing"];

  const dayPlans = Array.from({ length: Number(days) }, (_, i) => ({
    day: i + 1,
    activities: {
      morning: `Explore a top ${interestList[0]} spot in ${destination} and grab a local breakfast.`,
      afternoon: `Visit a popular attraction near ${destination}, focused on ${interestList[i % interestList.length]}.`,
      evening: `Relax at a scenic viewpoint in ${destination} and try a local dinner spot.`,
    },
    localFoodSuggestions: ["Local specialty dish", "Regional tea or drink"],
    estimatedBudget: perDayBudget,
  }));

  return {
    days: dayPlans,
    budgetBreakdown: {
      accommodation: Math.round(budget * 0.35),
      transport: Math.round(budget * 0.25),
      food: Math.round(budget * 0.2),
      activities: Math.round(budget * 0.2),
    },
  };
}

export async function generateItinerary(tripInput) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("GEMINI_API_KEY not set — returning mock itinerary.");
    return { parsed: mockItinerary(tripInput), rawText: "(mock — no API key configured)" };
  }

  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${SYSTEM_PROMPT}\n\n${buildUserPrompt(tripInput)}` }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 4096,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const parsed = extractJson(rawText);
    return { parsed, rawText };
  } catch (err) {
    console.error("Failed to parse Gemini response, falling back to mock:", err.message);
    return { parsed: mockItinerary(tripInput), rawText };
  }
}

export async function regenerateSingleDay(tripInput, dayNumber) {
  const full = await generateItinerary(tripInput);
  const replacement = full.parsed.days.find((d) => d.day === dayNumber) || full.parsed.days[0];
  return { ...replacement, day: dayNumber };
}
