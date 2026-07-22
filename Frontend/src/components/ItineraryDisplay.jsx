import { Sunrise, Sun, Sunset, UtensilsCrossed, RefreshCw } from "lucide-react";

export default function ItineraryDisplay({ plan, onRegenerateDay, regeneratingDay }) {
  if (!plan?.length) return null;

  return (
    <div className="space-y-5">
      {plan.map((day) => (
        <div key={day.day} className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Day {day.day}</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-teal-700 dark:text-sand-300 font-medium">
                Est. PKR {Number(day.estimatedBudget || 0).toLocaleString()}
              </span>
              {onRegenerateDay && (
                <button
                  onClick={() => onRegenerateDay(day.day)}
                  disabled={regeneratingDay === day.day}
                  className="text-xs flex items-center gap-1 text-teal-700 dark:text-sand-300 hover:underline disabled:opacity-50"
                >
                  <RefreshCw size={14} className={regeneratingDay === day.day ? "animate-spin" : ""} />
                  Regenerate Day
                </button>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-sand-50 dark:bg-teal-950 rounded-xl p-3">
              <div className="flex items-center gap-2 font-medium mb-1 text-sand-500">
                <Sunrise size={16} /> Morning
              </div>
              <p>{day.activities?.morning}</p>
            </div>
            <div className="bg-sand-50 dark:bg-teal-950 rounded-xl p-3">
              <div className="flex items-center gap-2 font-medium mb-1 text-teal-600">
                <Sun size={16} /> Afternoon
              </div>
              <p>{day.activities?.afternoon}</p>
            </div>
            <div className="bg-sand-50 dark:bg-teal-950 rounded-xl p-3">
              <div className="flex items-center gap-2 font-medium mb-1 text-teal-800 dark:text-sand-200">
                <Sunset size={16} /> Evening
              </div>
              <p>{day.activities?.evening}</p>
            </div>
          </div>

          {day.localFoodSuggestions?.length > 0 && (
            <div className="flex items-center gap-2 mt-3 text-sm text-teal-700 dark:text-sand-300">
              <UtensilsCrossed size={14} />
              <span>{day.localFoodSuggestions.join(" · ")}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
