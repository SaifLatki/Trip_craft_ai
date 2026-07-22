import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookMarked,
  Plane,
  Search,
  X,
} from "lucide-react";

import { useTrips } from "@/context/TripsContext";
import TripCard from "@/components/TripCard";
import TripDetailModal from "@/components/TripDetailModal";

export default function SavedTrips() {
  const { trips, deleteTrip } = useTrips();

  const [search, setSearch] = useState("");
  const [viewTrip, setViewTrip] = useState(null);

  const filtered = trips.filter((trip) =>
    trip.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <BookMarked className="w-5 h-5 text-orange-400" />
            </div>

            <h1 className="text-3xl font-extrabold">
              Saved Trips
            </h1>
          </div>

          <p className="text-teal-100 ml-14">
            {trips.length === 0
              ? "Your saved itineraries will appear here."
              : `${trips.length} itiner${
                  trips.length === 1 ? "y" : "aries"
                } saved`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search */}
        {trips.length > 0 && (
          <div className="relative max-w-xs mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="input-field pl-10 pr-8"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-warm-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {trips.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-warm-100 dark:bg-warm-800 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <Plane className="w-10 h-10 text-warm-300 dark:text-warm-600" />
            </div>

            <h3 className="text-xl font-bold text-warm-900 dark:text-warm-50 mb-2">
              No saved trips yet
            </h3>

            <p className="text-warm-500 dark:text-warm-400 mb-8 max-w-sm mx-auto">
              Generate your first AI-powered itinerary and save it here for
              easy access.
            </p>

            <Link to="/generate" className="btn-primary">
              <Plane className="w-4 h-4" />
              Plan Your First Trip
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          /* No Search Results */
          <div className="text-center py-16">
            <p className="text-warm-500 dark:text-warm-400">
              No trips matching "{search}"
            </p>
          </div>
        ) : (
          /* Trip Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={deleteTrip}
                onView={(tripData) => setViewTrip(tripData)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trip Details Modal */}
      {viewTrip && (
        <TripDetailModal
          trip={viewTrip}
          onClose={() => setViewTrip(null)}
        />
      )}
    </div>
  );
}