import { useEffect } from "react";
import { X, MapPin, Calendar, Users, Wallet } from "lucide-react";
import DayCard from "./DayCard";
import BudgetBreakdownCard from "./BudgetBreakdownCard";
import WeatherWidget from "./WeatherWidget";

function formatPKR(v) {
  return v >= 1000000
    ? `₨${(v / 1000000).toFixed(1)}M`
    : `₨${(v / 1000).toFixed(0)}K`;
}

export default function TripDetailModal({ trip, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-warm-900 rounded-3xl shadow-2xl w-full max-w-4xl my-4 overflow-hidden">
        {/* Header */}
        <div className="bg-hero text-white px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">
                {trip.destination}
              </h2>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-teal-100">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {trip.days} Days
                </span>

                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {trip.travelers} Travelers
                </span>

                <span className="flex items-center gap-1">
                  <Wallet className="w-4 h-4" />
                  {formatPKR(trip.budget)}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Pakistan
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-5">
              <WeatherWidget
                weather={trip.weather}
                destination={trip.destination}
              />

              <BudgetBreakdownCard
                breakdown={trip.budgetBreakdown}
              />
            </div>

            <div className="lg:col-span-2 space-y-4">
              {trip.itinerary.map((day) => (
                <DayCard key={day.day} day={day} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}