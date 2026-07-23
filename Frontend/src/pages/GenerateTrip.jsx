import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Plane,
  Loader2,
  Download,
  BookMarked,
  RefreshCw,
  MapPin,
  Calendar,
  Users,
  Wallet,
  CheckCircle,
  Sparkles,
  Info,
} from "lucide-react";

import { generateTrip } from "@/api/ai";
import { useTrips } from "@/context/TripsContext";

import DayCard from "@/components/DayCard";
import BudgetBreakdownCard from "@/components/BudgetBreakdownCard";
import WeatherWidget from "@/components/WeatherWidget";
import NearbyAttractionsGrid from "@/components/NearbyAttractionsGrid";

import {
  SkeletonDayCard,
  SkeletonBudgetCard,
  SkeletonAttractionCard,
} from "@/components/SkeletonLoader";

const INTERESTS = [
  "Adventure",
  "Food",
  "Nature",
  "Shopping",
  "Historical Places",
  "Photography",
  "Nightlife",
  "Family Friendly",
];

const defaultForm = {
  destination: "",
  days: 3,
  budget: 50000,
  travelers: 2,
  interests: [],
};

const GenerateTrip = () => {
  const location = useLocation();
  const { saveTrip } = useTrips();

  const [form, setForm] = useState(() => {
    const state = location.state || {};

    if (state.tripData) {
      const t = state.tripData;

      return {
        destination: t.destination,
        days: t.days,
        budget: t.budget,
        travelers: t.travelers,
        interests: t.interests,
      };
    }

    if (state.destination) {
      return {
        ...defaultForm,
        destination: state.destination,
      };
    }

    return defaultForm;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);
  const [regeneratingDay, setRegeneratingDay] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const state = location.state || {};

    if (state.tripData) {
      setResult(state.tripData);
    }
  }, [location.state]);

  const validate = () => {
    const e = {};

    if (!form.destination.trim()) {
      e.destination = "Destination is required.";
    }

    if (form.days < 1 || form.days > 30) {
      e.days = "Days must be between 1 and 30.";
    }

    if (form.budget < 1000) {
      e.budget = "Budget must be at least ₨1,000.";
    }

    if (form.travelers < 1) {
      e.travelers = "At least 1 traveler required.";
    }

    if (form.interests.length === 0) {
      e.interests = "Select at least one interest.";
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setResult(null);
    setSaved(false);

    try {
      const data = await generateTrip(form);

      setResult(data);

      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInterestToggle = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSave = () => {
    if (!result) return;

    saveTrip(result);
    setSaved(true);
  };

  const handleRegenerate = async (dayNum) => {
    if (!result) return;

    setRegeneratingDay(dayNum);

    try {
      const freshTrip = await generateTrip(form);

      const freshDay = freshTrip.itinerary.find(
        (day) => day.day === dayNum
      );

      if (freshDay) {
        setResult((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            itinerary: prev.itinerary.map((day) =>
              day.day === dayNum ? freshDay : day
            ),
          };
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRegeneratingDay(null);
    }
  };

  const handleDownload = () => {
    if (!result) return;

    const lines = [
      `TripCraft AI — ${result.destination} Itinerary`,
      `Duration: ${result.days} days | Budget: ₨${result.budget.toLocaleString()} | Travelers: ${result.travelers}`,
      "",
    ];

    result.itinerary.forEach((day) => {
      lines.push(`--- Day ${day.day} ---`);
      lines.push(
        `Morning: ${day.morning.activity} @ ${day.morning.location}`
      );
      lines.push(`  ${day.morning.description}`);

      lines.push(
        `Afternoon: ${day.afternoon.activity} @ ${day.afternoon.location}`
      );
      lines.push(`  ${day.afternoon.description}`);

      lines.push(
        `Evening: ${day.evening.activity} @ ${day.evening.location}`
      );
      lines.push(`  ${day.evening.description}`);

      if (day.tips) {
        lines.push(`Tip: ${day.tips}`);
      }

      lines.push("");
    });

    lines.push("--- Budget Breakdown ---");
    lines.push(
      `Accommodation: ₨${result.budgetBreakdown.accommodation.toLocaleString()}`
    );
    lines.push(
      `Transport: ₨${result.budgetBreakdown.transport.toLocaleString()}`
    );
    lines.push(
      `Food: ₨${result.budgetBreakdown.food.toLocaleString()}`
    );
    lines.push(
      `Activities: ₨${result.budgetBreakdown.activities.toLocaleString()}`
    );
    lines.push(
      `Total: ₨${result.budgetBreakdown.total.toLocaleString()}`
    );

    const blob = new Blob([lines.join("\n")], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${result.destination.replace(
      /\s+/g,
      "_"
    )}_itinerary.txt`;

    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-warm-50 dark:bg-warm-950">
      {/* Header */}
      <div className="bg-hero text-orange-400 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
         
          <h1 className="text-4xl font-extrabold mb-3">
            Plan Your Perfect Trip
          </h1>

          <p className="text-teal-200 max-w-lg mx-auto">
            Fill in your preferences and let AI craft a personalized
            day-by-day itinerary for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ===== PART 2 STARTS FROM HERE ===== */}

        {/* ================= FORM ================= */}

<form
  onSubmit={handleSubmit}
  className="card p-6 lg:p-8 mb-10"
>
  <h2 className="text-xl font-bold text-warm-900 dark:text-warm-50 mb-6 flex items-center gap-2">
    <MapPin className="w-5 h-5 text-teal-600" />
    Trip Details
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

    {/* Destination */}
    <div className="sm:col-span-2">
      <label className="label">Destination</label>

      <div className="relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <MapPin className="w-5 h-5 text-gray-500" />
        </span>

        <input
          type="text"
          placeholder="e.g. Lahore, Hunza, Swat Valley"
          value={form.destination}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              destination: e.target.value,
            }))
          }
          className={`input-field pl-12 ${
            errors.destination
              ? "border-red-400 focus:ring-red-400"
              : ""
          }`}
        />
      </div>

      {errors.destination && (
        <p className="text-xs text-red-500 mt-1">
          {errors.destination}
        </p>
      )}
    </div>

    {/* Days */}
    <div>
      <label className="label">Days</label>

      <div className="relative">
        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />

        <input
          type="number"
          min={1}
          max={30}
          value={form.days}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              days: parseInt(e.target.value) || 1,
            }))
          }
          className={`input-field pl-10 ${
            errors.days ? "border-red-400" : ""
          }`}
        />
      </div>

      {errors.days && (
        <p className="text-xs text-red-500 mt-1">
          {errors.days}
        </p>
      )}
    </div>

    {/* Travelers */}
    <div>
      <label className="label">Travelers</label>

      <div className="relative">
        <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />

        <input
          type="number"
          min={1}
          max={50}
          value={form.travelers}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              travelers: parseInt(e.target.value) || 1,
            }))
          }
          className={`input-field pl-10 ${
            errors.travelers ? "border-red-400" : ""
          }`}
        />
      </div>

      {errors.travelers && (
        <p className="text-xs text-red-500 mt-1">
          {errors.travelers}
        </p>
      )}
    </div>

    {/* Budget */}
    <div className="sm:col-span-2 lg:col-span-2">
      <label className="label">
        Total Budget (PKR)
      </label>

      <div className="relative">
    {/* Rs Label */}
    <span className="absolute left-80 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
      Rs
    </span>

    {/* Input */}
    <input
      type="number"
      min={1000}
      step={1000}
      value={form.budget}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          budget: parseInt(e.target.value) || 0,
        }))
      }
      className="input-field pl-10"
    />

    {/* Wallet Icon */}
    <Wallet className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
  </div>

        {errors.budget && (
          <p className="text-xs text-red-500 mt-1">
            {errors.budget}
          </p>
        )}
      </div>
    </div>

    {/* Interests */}

    <div>
      <label className="label mb-2">
        Interests
      </label>

      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((interest) => {
          const active =
            form.interests.includes(interest);

          return (
            <button
              key={interest}
              type="button"
              onClick={() =>
                handleInterestToggle(interest)
              }
              className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                active
                  ? "bg-teal-700 border-teal-700 text-black shadow-sm"
                  : "bg-teal dark:bg-warm-800 border-warm-200 dark:border-warm-600 text-warm-600 dark:text-warm-300 hover:border-teal-400 dark:hover:border-teal-600"
              }`}
            >
              {active && (
                <CheckCircle className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              )}

              {interest}
            </button>
          );
        })}
      </div>

      {errors.interests && (
        <p className="text-xs text-red-500 mt-2">
          {errors.interests}
        </p>
      )}
    </div>

  {/* Info */}

  <div className="flex items-center gap-2 mt-4 p-3 bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800 rounded-xl">
    <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />

    <p className="text-xs text-teal-700 dark:text-teal-300">
      Demo mode: AI generates a realistic mock
      itinerary. Connect a backend at{" "}
      <code className="font-mono bg-teal-100 dark:bg-teal-900/50 px-1 rounded">
        localhost:5000/api
      </code>{" "}
      for live AI generation.
    </p>
  </div>

  {/* Submit */}

  <div className="mt-6">
    <button
      type="submit"
      disabled={isLoading}
      className="btn-primary text-base px-8 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Generating Plan...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5" />
          Generate Plan
        </>
      )}
    </button>
  </div>
</form>

{/* ===== Part 2B starts next ===== */}
{/* ================= LOADING ================= */}

{isLoading && (
  <div className="space-y-6" id="results">
    <div className="text-center py-6">
      <div className="inline-flex items-center gap-3 bg-white dark:bg-warm-800 rounded-2xl px-6 py-4 shadow-card">
        <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />

        <div>
          <p className="font-semibold text-warm-900 dark:text-warm-50">
            AI is crafting your itinerary...
          </p>

          <p className="text-xs text-warm-400 mt-0.5">
            Personalizing for your interests & budget
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      <div className="lg:col-span-1 space-y-5">
        <SkeletonBudgetCard />
      </div>

      <div className="lg:col-span-2 space-y-4">
        {Array.from({
          length: form.days > 3 ? 3 : form.days,
        }).map((_, index) => (
          <SkeletonDayCard key={index} />
        ))}
      </div>

    </div>

    <div className="card p-6">
      <div className="skeleton h-6 w-40 rounded mb-5" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonAttractionCard key={index} />
        ))}
      </div>
    </div>
  </div>
)}

{/* ================= RESULTS ================= */}

{result && !isLoading && (
  <div className="space-y-6" id="results">

    {/* Header */}

    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 card bg-gradient-to-r from-teal-700 to-teal-800 text-white">

      <div>
        <div className="flex items-center gap-2 mb-1">
          <Plane className="w-5 h-5 text-orange-400" />

          <h2 className="text-xl font-bold">
            {result.destination} Itinerary
          </h2>
        </div>

        <p className="text-teal-100 text-sm">
          {result.days} days · {result.travelers} traveler
          {result.travelers > 1 ? "s" : ""} · ₨
          {result.budget.toLocaleString()} budget
        </p>
      </div>

      <div className="flex flex-wrap gap-2">

        <button
          onClick={handleSave}
          disabled={saved}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
            saved
              ? "bg-green-500 text-white cursor-default"
              : "bg-white/20 hover:bg-white/30 text-white"
          }`}
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <BookMarked className="w-4 h-4" />
              Save Trip
            </>
          )}
        </button>

        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all"
        >
          <Download className="w-4 h-4" />
          Download
        </button>

        <button
          onClick={() =>
            handleSubmit({
              preventDefault: () => {},
            })
          }
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate
        </button>

      </div>
    </div>

    {/* Content */}

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Sidebar */}

      <div className="lg:col-span-1 space-y-5">

        <WeatherWidget
          weather={result.weather}
          destination={result.destination}
        />

        <BudgetBreakdownCard
          breakdown={result.budgetBreakdown}
        />

      </div>

      {/* Itinerary */}

      <div className="lg:col-span-2 space-y-4">

        {result.itinerary.map((day) => (
          <DayCard
            key={day.day}
            day={day}
            onRegenerate={handleRegenerate}
            isRegenerating={
              regeneratingDay === day.day
            }
          />
        ))}

      </div>

    </div>

    {/* Attractions */}

    <NearbyAttractionsGrid
      attractions={result.nearbyAttractions}
    />

  </div>
)}

</div>
</div>
);

};

export default GenerateTrip;