import React, { useState } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Eye,
  Gauge,
} from "lucide-react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "d27d9f2778b2289735526dd91209e6f5";

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  const getWeatherIcon = (main) => {
    switch (main?.toLowerCase()) {
      case "rain":
        return <CloudRain className="w-20 h-20 text-blue-400" />;
      case "clouds":
        return <Cloud className="w-20 h-20 text-gray-400" />;
      case "clear":
        return <Sun className="w-20 h-20 text-yellow-400" />;
      default:
        return <Cloud className="w-20 h-20 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Weather API
          </h1>

          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city name..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
              />
              <button
                onClick={fetchWeather}
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition disabled:bg-gray-400 font-medium"
              >
                {loading ? "Loading..." : "Search"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {weather && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {weather.name}, {weather.sys.country}
                </h2>
                <div className="flex justify-center mb-4">
                  {getWeatherIcon(weather.weather[0].main)}
                </div>
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {Math.round(weather.main.temp)}°C
                </div>
                <p className="text-xl text-gray-600 capitalize">
                  {weather.weather[0].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Humidity</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.main.humidity}%
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Wind Speed</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.wind.speed} m/s
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Gauge className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Pressure</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {weather.main.pressure} hPa
                  </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">Visibility</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {(weather.visibility / 1000).toFixed(1)} km
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-100 to-blue-100 rounded-xl p-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Feels Like</p>
                    <p className="text-xl font-bold text-gray-800">
                      {Math.round(weather.main.feels_like)}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Min Temp</p>
                    <p className="text-xl font-bold text-gray-800">
                      {Math.round(weather.main.temp_min)}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Max Temp</p>
                    <p className="text-xl font-bold text-gray-800">
                      {Math.round(weather.main.temp_max)}°C
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
