import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Eye,
  Trash2,
  Tag,
} from "lucide-react";

const TripCard = ({ trip, onDelete, onView }) => {
  const dateStr = new Date(trip.createdAt).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formatPKR = (v) =>
    v >= 1000000
      ? `₨${(v / 1000000).toFixed(1)}M`
      : `₨${(v / 1000).toFixed(0)}K`;

  return (
    <div className="card p-5 hover:shadow-card-hover transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-warm-900 dark:text-warm-50 text-lg group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
            {trip.destination}
          </h3>

          <p className="text-xs text-warm-400 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3" />
            {dateStr}
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-warm-50 dark:bg-warm-700 rounded-lg">
          <Calendar className="w-4 h-4 text-teal-600 mx-auto mb-1" />
          <p className="text-xs text-warm-500 dark:text-warm-400">Days</p>
          <p className="text-sm font-bold text-warm-800 dark:text-warm-100">
            {trip.days}
          </p>
        </div>

        <div className="text-center p-2 bg-warm-50 dark:bg-warm-700 rounded-lg">
          <Users className="w-4 h-4 text-orange-500 mx-auto mb-1" />
          <p className="text-xs text-warm-500 dark:text-warm-400">
            Travelers
          </p>
          <p className="text-sm font-bold text-warm-800 dark:text-warm-100">
            {trip.travelers}
          </p>
        </div>

        <div className="text-center p-2 bg-warm-50 dark:bg-warm-700 rounded-lg">
          <Wallet className="w-4 h-4 text-amber-500 mx-auto mb-1" />
          <p className="text-xs text-warm-500 dark:text-warm-400">Budget</p>
          <p className="text-sm font-bold text-warm-800 dark:text-warm-100">
            {formatPKR(trip.budget)}
          </p>
        </div>
      </div>

      {/* Interests */}
      {trip.interests.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {trip.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-medium rounded-full"
            >
              <Tag className="w-2.5 h-2.5" />
              {interest}
            </span>
          ))}

          {trip.interests.length > 3 && (
            <span className="text-xs text-warm-400 px-2 py-0.5">
              +{trip.interests.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-warm-100 dark:border-warm-700">
        <button
          onClick={() => onView(trip)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-teal-700 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/30 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </button>

        <Link
          to="/generate"
          state={{ tripData: trip }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(trip.id)}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TripCard;