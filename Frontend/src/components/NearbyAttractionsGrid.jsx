import { MapPin, Star } from "lucide-react";

export default function NearbyAttractionsGrid({ attractions }) {
  return (
    <div className="card p-6">
      <h3 className="text-lg font-bold text-warm-900 dark:text-warm-50 mb-5">
        Nearby Attractions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {attractions.map((attraction, index) => (
          <div
            key={index}
            className="group rounded-xl overflow-hidden border border-warm-100 dark:border-warm-700 hover:shadow-card-hover transition-all duration-300"
          >
            <div className="relative overflow-hidden h-36">
              <img
                src={attraction.imageUrl}
                alt={attraction.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <span className="absolute bottom-2 left-2 text-xs font-medium text-white bg-black/40 px-2 py-0.5 rounded-full">
                {attraction.type}
              </span>
            </div>

            <div className="p-3">
              <h4 className="font-semibold text-sm text-warm-900 dark:text-warm-100 truncate">
                {attraction.name}
              </h4>

              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1 text-xs text-warm-400">
                  <MapPin className="w-3 h-3" />
                  {attraction.distance}
                </div>

                <div className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-medium text-warm-600 dark:text-warm-300">
                    {attraction.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}