import { useState } from "react";
import {
  Sunrise,
  Sun,
  Sunset,
  MapPin,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

const slots = [
  {
    key: "morning",
    label: "Morning",
    Icon: Sunrise,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    key: "afternoon",
    label: "Afternoon",
    Icon: Sun,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    border: "border-orange-200 dark:border-orange-800",
  },
  {
    key: "evening",
    label: "Evening",
    Icon: Sunset,
    color: "text-teal-600",
    bg: "bg-teal-50 dark:bg-teal-900/20",
    border: "border-teal-200 dark:border-teal-800",
  },
];

export default function DayCard({
  day,
  onRegenerate,
  isRegenerating,
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-teal-700 to-teal-600 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {day.day}
            </span>
          </div>

          <h3 className="text-white font-bold text-lg">
            Day {day.day}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRegenerate(day.day);
              }}
              disabled={isRegenerating}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isRegenerating ? "animate-spin" : ""
                }`}
              />
              Regenerate
            </button>
          )}

          <span className="text-white/70 text-xs">
            {expanded ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="p-6 space-y-4">
          {slots.map(
            ({ key, label, Icon, color, bg, border }) => {
              const slot = day[key];

              return (
                <div
                  key={key}
                  className={`${bg} ${border} border rounded-xl p-4`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${color}`} />

                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${color}`}
                    >
                      {label}
                    </span>
                  </div>

                  <h4 className="font-semibold text-warm-900 dark:text-warm-100 mb-1">
                    {slot.activity}
                  </h4>

                  <p className="text-sm text-warm-600 dark:text-warm-400 leading-relaxed">
                    {slot.description}
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-warm-400" />

                    <span className="text-xs text-warm-400">
                      {slot.location}
                    </span>

                    {slot.cost > 0 && (
                      <span className="ml-auto text-xs font-medium text-teal-600 dark:text-teal-400">
                        ₨{slot.cost.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            }
          )}

          {day.tips && (
            <div className="flex items-start gap-2 p-3 bg-sand-50 dark:bg-sand-900/20 border border-sand-200 dark:border-sand-800 rounded-xl">
              <Lightbulb className="w-4 h-4 text-sand-600 dark:text-sand-400 mt-0.5 flex-shrink-0" />

              <p className="text-xs text-warm-600 dark:text-warm-400">
                {day.tips}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}