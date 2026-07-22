import { Wind, Droplets, Thermometer } from "lucide-react";

export default function WeatherWidget({ weather, destination }) {
  return (
    <div className="card p-6 bg-gradient-to-br from-teal-700 to-teal-900 text-white">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-teal-200 text-xs font-medium uppercase tracking-wider mb-1">
            Weather Forecast
          </p>
          <h3 className="text-white font-bold text-lg">{destination}</h3>
          <p className="text-teal-100 text-sm mt-0.5">
            Typical conditions during visit
          </p>
        </div>

        <span className="text-4xl">{weather.icon}</span>
      </div>

      <div className="flex items-end gap-2 mb-4">
        <span className="text-5xl font-light">{weather.temp}</span>
      </div>

      <p className="text-teal-100 font-medium mb-5">
        {weather.condition}
      </p>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <Thermometer className="w-4 h-4 text-teal-200 mx-auto mb-1" />
          <p className="text-xs text-teal-200">Feels Like</p>
          <p className="text-sm font-semibold">{weather.temp}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-3 text-center">
          <Droplets className="w-4 h-4 text-teal-200 mx-auto mb-1" />
          <p className="text-xs text-teal-200">Humidity</p>
          <p className="text-sm font-semibold">{weather.humidity}</p>
        </div>

        <div className="bg-white/10 rounded-xl p-3 text-center">
          <Wind className="w-4 h-4 text-teal-200 mx-auto mb-1" />
          <p className="text-xs text-teal-200">Wind</p>
          <p className="text-sm font-semibold">{weather.wind}</p>
        </div>
      </div>

      <p className="text-xs text-teal-300 mt-4 text-center">
        * Indicative forecast — check closer to travel date
      </p>
    </div>
  );
}